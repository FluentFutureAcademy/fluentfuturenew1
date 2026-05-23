import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const SITE = 'https://fluentfutureacademy.org';
const ROOT = process.cwd();

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

type CanonicalEntry = { path: string; file: string };

function extractCanonicalPaths(): CanonicalEntry[] {
  const files = walk(join(ROOT, 'src'))
    .filter((f) => /\.(tsx?|jsx?)$/.test(f))
    .filter((f) => !f.includes('__tests__') && !/\.(test|spec)\./.test(f));
  const entries: CanonicalEntry[] = [];
  for (const file of files) {
    const src = readFileSync(file, 'utf8');
    for (const m of src.matchAll(/canonicalPath:\s*['"]([^'"`]+)['"]/g)) {
      entries.push({ path: m[1], file: file.replace(ROOT + '/', '') });
    }
  }
  return entries;
}

type RobotsRule = { directive: 'Allow' | 'Disallow'; value: string; line: number };

function parseRobots(text: string): RobotsRule[] {
  const rules: RobotsRule[] = [];
  text.split('\n').forEach((raw, i) => {
    const m = raw.match(/^\s*(Allow|Disallow):\s*(\S*)\s*$/);
    if (m) rules.push({ directive: m[1] as 'Allow' | 'Disallow', value: m[2], line: i + 1 });
  });
  return rules;
}

function diff(label: string, items: string[]): string {
  if (items.length === 0) return '';
  return `\n\n--- ${label} ---\n` + items.map((s) => `  - ${s}`).join('\n');
}

const robots = readFileSync(join(ROOT, 'public/robots.txt'), 'utf8');
const sitemap = readFileSync(join(ROOT, 'public/sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const canonicalEntries = extractCanonicalPaths();
const canonicalPaths = [...new Set(canonicalEntries.map((e) => e.path))];
const robotsRules = parseRobots(robots);

describe('robots.txt is in sync', () => {
  it('points Sitemap directive at the canonical domain', () => {
    const re = new RegExp(`Sitemap:\\s*${SITE}/sitemap\\.xml`);
    const found = robots.match(/Sitemap:\s*(\S+)/)?.[1];
    expect(
      re.test(robots),
      `Sitemap directive mismatch.${diff('expected', [`${SITE}/sitemap.xml`])}${diff('found', [found ?? '(none)'])}`,
    ).toBe(true);
  });

  it('allows crawling by default', () => {
    const ok = /User-agent:\s*\*[\s\S]*?Allow:\s*\//.test(robots);
    expect(ok, 'Missing "User-agent: *" + "Allow: /" block in robots.txt').toBe(true);
  });

  it('does not Disallow any canonical (public) path', () => {
    const disallows = robotsRules.filter((r) => r.directive === 'Disallow' && r.value);
    const violations: string[] = [];
    for (const { path } of canonicalEntries) {
      if (path === '/404') continue;
      for (const rule of disallows) {
        if (path.startsWith(rule.value)) {
          violations.push(
            `canonical "${path}" blocked by "Disallow: ${rule.value}" (robots.txt line ${rule.line})`,
          );
        }
      }
    }
    expect(violations, `Robots rules conflict with canonical URLs:${diff('violations', violations)}`).toEqual([]);
  });
});

describe('canonical URLs ↔ sitemap.xml are in sync', () => {
  it('every static canonicalPath appears in sitemap.xml', () => {
    const missing = canonicalEntries
      .filter((e) => e.path !== '/404')
      .filter((e) => !sitemapUrls.includes(`${SITE}${e.path}`))
      .map((e) => `${e.path}  (declared in ${e.file})`);
    const extra = sitemapUrls
      .filter((u) => u.startsWith(`${SITE}`))
      .map((u) => u.replace(SITE, ''))
      .filter((p) => p && p !== '/' && !canonicalPaths.includes(p));
    expect(
      missing,
      `Sitemap drift detected.${diff('missing from sitemap.xml', missing)}${diff('in sitemap.xml but no canonicalPath', extra)}`,
    ).toEqual([]);
  });

  it('every sitemap URL uses the canonical domain', () => {
    const wrongDomain = sitemapUrls.filter((u) => !u.startsWith(`${SITE}/`) && u !== `${SITE}`);
    expect(
      wrongDomain,
      `Sitemap contains off-domain URLs (expected base: ${SITE}):${diff('off-domain', wrongDomain)}`,
    ).toEqual([]);
  });

  it('sitemap URLs have no trailing slash (except root)', () => {
    const bad = sitemapUrls.filter((u) => u !== `${SITE}/` && u.endsWith('/'));
    expect(bad, `Sitemap URLs have trailing slashes:${diff('trailing slash', bad)}`).toEqual([]);
  });
});
