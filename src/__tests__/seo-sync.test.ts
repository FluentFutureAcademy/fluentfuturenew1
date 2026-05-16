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

function extractCanonicalPaths(): string[] {
  const files = walk(join(ROOT, 'src'))
    .filter((f) => /\.(tsx?|jsx?)$/.test(f))
    .filter((f) => !f.includes('__tests__') && !/\.(test|spec)\./.test(f));
  const paths = new Set<string>();
  for (const file of files) {
    const src = readFileSync(file, 'utf8');
    // static string canonicalPath: '/foo'
    for (const m of src.matchAll(/canonicalPath:\s*['"]([^'"`]+)['"]/g)) {
      paths.add(m[1]);
    }
  }
  return [...paths];
}

const robots = readFileSync(join(ROOT, 'public/robots.txt'), 'utf8');
const sitemap = readFileSync(join(ROOT, 'public/sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const canonicalPaths = extractCanonicalPaths();

describe('robots.txt is in sync', () => {
  it('points Sitemap directive at the canonical domain', () => {
    expect(robots).toMatch(new RegExp(`Sitemap:\\s*${SITE}/sitemap\\.xml`));
  });

  it('allows crawling by default', () => {
    expect(robots).toMatch(/User-agent:\s*\*[\s\S]*?Allow:\s*\//);
  });

  it('does not Disallow any canonical (public) path', () => {
    const disallows = [...robots.matchAll(/Disallow:\s*(\S+)/g)]
      .map((m) => m[1])
      .filter((p) => p && p !== '');
    for (const path of canonicalPaths) {
      if (path === '/404') continue;
      for (const dis of disallows) {
        expect(
          path.startsWith(dis),
          `robots.txt Disallow "${dis}" blocks canonical path "${path}"`,
        ).toBe(false);
      }
    }
  });
});

describe('canonical URLs ↔ sitemap.xml are in sync', () => {
  it('every static canonicalPath appears in sitemap.xml', () => {
    const missing = canonicalPaths
      .filter((p) => p !== '/404')
      .filter((p) => !sitemapUrls.includes(`${SITE}${p}`));
    expect(missing, `Missing from sitemap.xml: ${missing.join(', ')}`).toEqual([]);
  });

  it('every sitemap URL uses the canonical domain', () => {
    const wrongDomain = sitemapUrls.filter((u) => !u.startsWith(`${SITE}/`) && u !== `${SITE}`);
    expect(wrongDomain, `Off-domain URLs: ${wrongDomain.join(', ')}`).toEqual([]);
  });

  it('sitemap URLs have no trailing slash (except root)', () => {
    const bad = sitemapUrls.filter((u) => u !== `${SITE}/` && u.endsWith('/'));
    expect(bad, `Trailing slash: ${bad.join(', ')}`).toEqual([]);
  });
});
