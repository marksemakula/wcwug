#!/usr/bin/env node
/**
 * Static SEO self-check. Runs without a build, so it can be used in CI or
 * before a deploy to catch the mistakes that silently cost rankings:
 * duplicate titles, over-long titles/descriptions, relative URLs in JSON-LD,
 * @id references that point at nothing, and sitemap/route drift.
 *
 *   node scripts/check-seo.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPageMeta, indexableRoutes } from '../src/seo/pageMeta.js';
import { SITE_URL } from '../src/seo/siteConfig.js';
import { buildHeadHtml, injectIntoTemplate } from '../src/prerender/head.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const failures = [];
const warnings = [];

const fail = (message) => failures.push(message);
const warn = (message) => warnings.push(message);

const routes = indexableRoutes.map((route) => route.path);

// ── 1. Titles and descriptions ───────────────────────────────────────────────
const seenTitles = new Map();
const seenDescriptions = new Map();
const seenCanonicals = new Set();

for (const route of routes) {
  const meta = getPageMeta(route);

  if (!meta.title) fail(`${route}: missing title`);
  if (!meta.description) fail(`${route}: missing description`);

  if (meta.title.length > 60) {
    warn(`${route}: title is ${meta.title.length} chars (target ≤60) — "${meta.title}"`);
  }
  if (meta.description.length < 120 || meta.description.length > 165) {
    warn(
      `${route}: description is ${meta.description.length} chars (target 150–160)`
    );
  }

  if (seenTitles.has(meta.title)) {
    fail(`${route}: duplicate title, also used by ${seenTitles.get(meta.title)}`);
  }
  seenTitles.set(meta.title, route);

  if (seenDescriptions.has(meta.description)) {
    fail(
      `${route}: duplicate description, also used by ${seenDescriptions.get(meta.description)}`
    );
  }
  seenDescriptions.set(meta.description, route);

  if (!meta.canonical.startsWith(SITE_URL)) {
    fail(`${route}: canonical "${meta.canonical}" is not on ${SITE_URL}`);
  }
  if (seenCanonicals.has(meta.canonical)) fail(`${route}: duplicate canonical`);
  seenCanonicals.add(meta.canonical);

  if (!/^https:\/\//.test(meta.ogImage)) {
    fail(`${route}: og:image "${meta.ogImage}" must be an absolute https URL`);
  }
}

// ── 2. Structured data ───────────────────────────────────────────────────────
for (const route of routes) {
  const { structuredData } = getPageMeta(route);
  if (!structuredData?.length) {
    fail(`${route}: no structured data`);
    continue;
  }

  const graph = {
    '@context': 'https://schema.org',
    '@graph': structuredData.map(({ '@context': _c, ...rest }) => rest),
  };

  // Must be serialisable, and must survive a round trip.
  let serialised;
  try {
    serialised = JSON.stringify(graph);
    JSON.parse(serialised);
  } catch (error) {
    fail(`${route}: JSON-LD is not serialisable — ${error.message}`);
    continue;
  }

  const declaredIds = new Set(graph['@graph'].map((node) => node['@id']).filter(Boolean));

  // Every {"@id": "..."} reference should resolve to a node declared on the
  // same page, otherwise Google sees a dangling pointer.
  const referencedIds = [...serialised.matchAll(/\{"@id":"([^"]+)"\}/g)].map((m) => m[1]);
  for (const id of referencedIds) {
    if (!declaredIds.has(id)) {
      fail(`${route}: JSON-LD references @id "${id}" which is not declared on this page`);
    }
  }

  // No relative URLs anywhere in the graph.
  for (const [, value] of Object.entries(flatten(graph))) {
    if (typeof value !== 'string') continue;
    if (/^\/(?!\/)/.test(value)) {
      fail(`${route}: JSON-LD contains a relative URL "${value}" — must be absolute`);
    }
  }

  // BreadcrumbList: the last item must NOT carry `item`.
  const breadcrumb = graph['@graph'].find((node) => node['@type'] === 'BreadcrumbList');
  if (breadcrumb) {
    const last = breadcrumb.itemListElement[breadcrumb.itemListElement.length - 1];
    if (last.item) fail(`${route}: BreadcrumbList final item should omit "item"`);
    breadcrumb.itemListElement.forEach((entry, index) => {
      if (entry.position !== index + 1) fail(`${route}: BreadcrumbList position out of order`);
    });
  }
}

// ── 3. Person pages specifically ─────────────────────────────────────────────
const personRoutes = routes.filter((route) => route.startsWith('/team/'));
if (personRoutes.length === 0) fail('no /team/<slug> profile routes found');

for (const route of personRoutes) {
  const { structuredData, title } = getPageMeta(route);
  const person = structuredData.find((node) => node['@type'] === 'Person');
  const profile = structuredData.find((node) => node['@type'] === 'ProfilePage');

  if (!person) fail(`${route}: no Person schema`);
  if (!profile) fail(`${route}: no ProfilePage schema`);
  if (person && !person.worksFor) fail(`${route}: Person is not linked to the Organization`);
  if (person && !title.includes(person.name.split(' ')[1] ?? person.name)) {
    warn(`${route}: title may not lead with the person's name — "${title}"`);
  }
  if (person && (!person.sameAs || person.sameAs.length === 0)) {
    warn(
      `${route}: Person has an empty sameAs. This is the strongest signal for ranking a ` +
        `name query — add real profile URLs in src/data/team.js.`
    );
  }
}

// ── 4. Sitemap parity ────────────────────────────────────────────────────────
const sitemapPath = path.join(ROOT, 'public/sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  fail('public/sitemap.xml is missing — run `npm run sitemap`');
} else {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const expected = routes.map((route) => (route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`));

  for (const url of expected) {
    if (!locs.includes(url)) fail(`sitemap is missing ${url}`);
  }
  for (const url of locs) {
    if (!expected.includes(url)) fail(`sitemap lists ${url}, which is not an indexable route`);
  }
}

// ── 5. Head HTML + template injection ────────────────────────────────────────
// Renders the exact <head> a crawler will receive and splices it into the real
// index.html shell, so shell/route tag collisions are caught before a build.
{
  const template = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

  for (const route of routes) {
    const headHtml = buildHeadHtml(route);
    const html = injectIntoTemplate(template, {
      headHtml,
      bodyHtml: '<main><h1>body</h1></main>',
    });

    const count = (pattern) => (html.match(pattern) ?? []).length;

    if (count(/<title>/gi) !== 1) fail(`${route}: ${count(/<title>/gi)} <title> tags in output`);
    if (count(/<meta\s+name="description"/gi) !== 1) {
      fail(`${route}: ${count(/<meta\s+name="description"/gi)} description tags in output`);
    }
    if (count(/<link\s+rel="canonical"/gi) !== 1) {
      fail(`${route}: ${count(/<link\s+rel="canonical"/gi)} canonical tags in output`);
    }
    if (count(/<meta\s+property="og:title"/gi) !== 1) {
      fail(`${route}: duplicate og:title in output`);
    }
    if (count(/application\/ld\+json/gi) !== 1) {
      fail(`${route}: ${count(/application\/ld\+json/gi)} JSON-LD blocks in output`);
    }
    if (html.includes('<div id="root"></div>')) {
      fail(`${route}: body was not injected — the root div is still empty`);
    }

    // The JSON-LD embedded in the document must still parse.
    const jsonLd = html.match(
      /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/
    );
    if (!jsonLd) {
      fail(`${route}: no JSON-LD in the rendered document`);
    } else {
      try {
        JSON.parse(jsonLd[1].replace(/\\u003c/g, '<'));
      } catch (error) {
        fail(`${route}: embedded JSON-LD does not parse — ${error.message}`);
      }
    }

    // The title in the document must be this route's title.
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);
    const expected = getPageMeta(route).title.replace(/&/g, '&amp;');
    if (titleMatch && titleMatch[1] !== expected) {
      fail(`${route}: rendered title "${titleMatch[1]}" ≠ expected "${expected}"`);
    }
  }
}

// ── 6. Static files ──────────────────────────────────────────────────────────
for (const file of ['public/robots.txt', 'public/llms.txt']) {
  if (!fs.existsSync(path.join(ROOT, file))) fail(`${file} is missing`);
}
const robots = fs.readFileSync(path.join(ROOT, 'public/robots.txt'), 'utf8');
if (!robots.includes(`${SITE_URL}/sitemap.xml`)) {
  fail('robots.txt does not reference the absolute sitemap URL');
}

// ── Report ───────────────────────────────────────────────────────────────────
function flatten(value, prefix = '', out = {}) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => flatten(entry, `${prefix}[${index}]`, out));
  } else if (value && typeof value === 'object') {
    for (const [key, entry] of Object.entries(value)) {
      flatten(entry, prefix ? `${prefix}.${key}` : key, out);
    }
  } else {
    out[prefix] = value;
  }
  return out;
}

console.log(`\nChecked ${routes.length} indexable routes.\n`);

if (warnings.length) {
  console.log('Warnings:');
  warnings.forEach((message) => console.log(`  ⚠ ${message}`));
  console.log('');
}

if (failures.length) {
  console.log('Failures:');
  failures.forEach((message) => console.log(`  ✖ ${message}`));
  console.log('');
  process.exit(1);
}

console.log('✔ All SEO checks passed.\n');
