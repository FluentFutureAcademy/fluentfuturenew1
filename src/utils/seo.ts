const SITE_NAME = 'Fluent Future Academy';
const SITE_URL = 'https://fluentfutureacademy.org';
const DEFAULT_DESCRIPTION = 'Professional Interpreter and ESL training led by Hanane Benalia, MBA.';
const DEFAULT_OG_IMAGE = 'https://storage.googleapis.com/gpt-engineer-file-uploads/Ok2ODyYYGUTl0AmqGpcSC09SUuR2/social-images/social-1777721622244-fluent_future_academy_logo.webp';

type SEOOptions = {
  title?: string;
  fullTitle?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
  twitterHandle?: string;
};

const ensureMeta = (selector: string, attr: 'name' | 'property', key: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  return el;
};

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  const el = ensureMeta(`meta[${attr}="${key}"]`, attr, key);
  el.setAttribute('content', content);
};

const setLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const setJsonLd = (data: Record<string, unknown> | Record<string, unknown>[]) => {
  let el = document.head.querySelector<HTMLScriptElement>('script[type="application/ld+json"][data-managed="seo"]');
  if (!el) {
    el = document.createElement('script');
    el.setAttribute('type', 'application/ld+json');
    el.setAttribute('data-managed', 'seo');
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
};

const removeJsonLd = () => {
  const el = document.head.querySelector('script[type="application/ld+json"][data-managed="seo"]');
  if (el) el.remove();
};

export const setSEO = ({
  title,
  fullTitle,
  description,
  canonicalPath,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  jsonLd,
  noindex = false,
  twitterHandle = '@futureflue90426',
}: SEOOptions) => {
  const finalTitle = fullTitle ?? (title ? `${title} | ${SITE_NAME}` : SITE_NAME);
  document.title = finalTitle;

  const finalDesc = description ?? DEFAULT_DESCRIPTION;
  setMeta('name', 'description', finalDesc);
  setMeta('name', 'viewport', 'width=device-width, initial-scale=1.0');
  setMeta('name', 'charset', 'UTF-8');
  setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
  setMeta('name', 'language', 'English');
  setMeta('name', 'author', SITE_NAME);

  const url = canonicalPath
    ? `${SITE_URL}${canonicalPath}`
    : SITE_URL + window.location.pathname;
  setLink('canonical', url);

  // Open Graph
  setMeta('property', 'og:title', finalTitle);
  setMeta('property', 'og:description', finalDesc);
  setMeta('property', 'og:type', ogType);
  setMeta('property', 'og:site_name', SITE_NAME);
  setMeta('property', 'og:url', url);
  setMeta('property', 'og:image', ogImage);
  setMeta('property', 'og:image:width', '1200');
  setMeta('property', 'og:image:height', '630');

  // Twitter Card
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', finalTitle);
  setMeta('name', 'twitter:description', finalDesc);
  setMeta('name', 'twitter:image', ogImage);
  setMeta('name', 'twitter:creator', twitterHandle);
  setMeta('name', 'twitter:site', twitterHandle);

  if (jsonLd) {
    setJsonLd(jsonLd);
  } else {
    removeJsonLd();
  }
};

export const updatePageTitle = (pageTitle: string) => {
  document.title = `${SITE_NAME} | ${pageTitle}`;
};

export const updateMetaDescription = (description?: string) => {
  setMeta('name', 'description', description || DEFAULT_DESCRIPTION);
};
