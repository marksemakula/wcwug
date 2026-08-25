import { useEffect } from 'react';
import { getPageMeta } from '../seo/pageMeta';
import { ORG_NAME } from '../seo/siteConfig';

/**
 * Applies a route's head tags on the client.
 *
 * The prerenderer (scripts/prerender.mjs) bakes exactly the same tags into the
 * static HTML at build time, so a crawler that runs no JavaScript already sees
 * the correct title, description, canonical, social tags and JSON-LD. This
 * component then re-applies them during client-side navigation, when no new
 * document is fetched and the baked head would otherwise go stale.
 *
 * Everything it writes is marked `data-seo="managed"` so it can be swept and
 * rewritten on each route change instead of accumulating.
 */

const MANAGED = 'data-seo';
const MANAGED_VALUE = 'managed';

const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  element.setAttribute(MANAGED, MANAGED_VALUE);
};

const upsertLink = (rel, href) => {
  let link = document.head.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

/**
 * Replace every managed JSON-LD block with one @graph script.
 * Removing first matters: without it the prerendered block and the client block
 * would both be present, and Google would read the page's schema twice.
 */
const applyStructuredData = (structuredData) => {
  document.head
    .querySelectorAll(`script[type="application/ld+json"][${MANAGED}="${MANAGED_VALUE}"]`)
    .forEach((node) => node.remove());

  if (!structuredData || structuredData.length === 0) return;

  const graph = {
    '@context': 'https://schema.org',
    '@graph': structuredData.map(({ '@context': _ignored, ...rest }) => rest),
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute(MANAGED, MANAGED_VALUE);
  script.textContent = JSON.stringify(graph);
  document.head.appendChild(script);
};

const SEO = ({ path = '/', title: titleOverride, description: descriptionOverride }) => {
  useEffect(() => {
    const meta = getPageMeta(path);
    const title = titleOverride ?? meta.title;
    const description = descriptionOverride ?? meta.description;

    document.title = title;

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: meta.robots });

    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: meta.ogType });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: meta.canonical });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: meta.ogImage });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: ORG_NAME });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_UG' });

    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: meta.ogImage });

    upsertLink('canonical', meta.canonical);
    applyStructuredData(meta.structuredData);
  }, [path, titleOverride, descriptionOverride]);

  return null;
};

export default SEO;
