import { useEffect } from 'react';

const SITE_URL = 'https://www.winrise.org';
const DEFAULT_OG_IMAGE = 'https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1749648547185-winrise.png';

const upsertMetaTag = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const upsertCanonical = (href) => {
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }

  canonical.setAttribute('href', href);
};

const SEO = ({ title, description, path = '/', robots = 'index, follow' }) => {
  useEffect(() => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const canonicalUrl = `${SITE_URL}${cleanPath === '/' ? '/' : cleanPath}`;

    document.title = title;

    upsertMetaTag('meta[name="description"]', {
      name: 'description',
      content: description,
    });

    upsertMetaTag('meta[name="robots"]', {
      name: 'robots',
      content: robots,
    });

    upsertMetaTag('meta[property="og:title"]', {
      property: 'og:title',
      content: title,
    });

    upsertMetaTag('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    });

    upsertMetaTag('meta[property="og:type"]', {
      property: 'og:type',
      content: 'website',
    });

    upsertMetaTag('meta[property="og:url"]', {
      property: 'og:url',
      content: canonicalUrl,
    });

    upsertMetaTag('meta[property="og:image"]', {
      property: 'og:image',
      content: DEFAULT_OG_IMAGE,
    });

    upsertMetaTag('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    });

    upsertMetaTag('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: title,
    });

    upsertMetaTag('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    });

    upsertMetaTag('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: DEFAULT_OG_IMAGE,
    });

    upsertCanonical(canonicalUrl);
  }, [title, description, path, robots]);

  return null;
};

export default SEO;