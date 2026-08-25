/**
 * Pure HTML helpers for the prerenderer — no React, no JSX.
 *
 * Kept separate from render.jsx so they can be imported and exercised directly
 * by scripts/check-seo.mjs without booting React, which is what makes the
 * head-tag and template-injection logic testable.
 */

import { getPageMeta } from '../seo/pageMeta.js';
import { ORG_NAME } from '../seo/siteConfig.js';

export const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * Framer Motion serialises its `initial` state as inline styles during SSR, so
 * a freshly prerendered page arrives with `opacity:0` and translate offsets on
 * most sections. A browser running JS animates them in immediately, but a
 * crawler that runs no JS (Bing, and every link-preview bot) would receive a
 * page whose content is technically invisible.
 *
 * Neutralising those two properties in the static output makes the no-JS
 * rendering correct. The client re-mounts and animates exactly as before.
 */
export function neutralizeInitialAnimationStyles(html) {
  return html.replace(/style="([^"]*)"/g, (match, styleValue) => {
    if (!/opacity\s*:\s*0(?!\.)|transform\s*:/.test(styleValue)) return match;

    const cleaned = styleValue
      .split(';')
      .map((declaration) => declaration.trim())
      .filter(Boolean)
      .filter((declaration) => {
        const [property, value = ''] = declaration.split(':').map((part) => part.trim());
        if (property === 'opacity' && parseFloat(value) === 0) return false;
        // Drop only the enter-animation transforms, not any authored transform.
        if (property === 'transform' && /translate|scale|rotate/.test(value)) return false;
        return true;
      })
      .join('; ');

    return cleaned ? `style="${cleaned}"` : '';
  });
}

/** Build the <head> markup for a route from its page metadata. */
export function buildHeadHtml(path) {
  const meta = getPageMeta(path);

  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="robots" content="${escapeHtml(meta.robots)}" />`,
    `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:type" content="${escapeHtml(meta.ogType)}" />`,
    `<meta property="og:url" content="${escapeHtml(meta.canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(meta.ogImage)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(ORG_NAME)}" />`,
    `<meta property="og:locale" content="en_UG" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(meta.ogImage)}" />`,
  ];

  if (meta.structuredData?.length) {
    const graph = {
      '@context': 'https://schema.org',
      '@graph': meta.structuredData.map(({ '@context': _ignored, ...rest }) => rest),
    };
    // `<` is escaped so a stray value can never close the script tag early.
    const json = JSON.stringify(graph).replace(/</g, '\\u003c');
    tags.push(`<script type="application/ld+json" data-seo="managed">${json}</script>`);
  }

  return tags.join('\n    ');
}

/**
 * Strip the shell's placeholder head tags before injecting the per-route ones,
 * so the final document never carries two titles or two JSON-LD blocks.
 */
const DEFAULT_HEAD_PATTERNS = [
  /<title>[\s\S]*?<\/title>/i,
  /<meta\s+name="description"[\s\S]*?>/i,
  /<meta\s+name="robots"[\s\S]*?>/i,
  /<link\s+rel="canonical"[^>]*>/i,
  /<meta\s+property="og:[^"]*"[\s\S]*?>/gi,
  /<meta\s+name="twitter:[^"]*"[\s\S]*?>/gi,
  /<script\s+type="application\/ld\+json"[\s\S]*?<\/script>/gi,
];

/** Pure function: splice rendered head + body into the built index.html. */
export function injectIntoTemplate(template, { headHtml, bodyHtml }) {
  let html = template;
  for (const pattern of DEFAULT_HEAD_PATTERNS) html = html.replace(pattern, '');
  html = html.replace('</head>', `    ${headHtml}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
  return html;
}
