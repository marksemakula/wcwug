#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from the same route list the prerenderer uses,
 * so the sitemap can never list a URL that has no page (or miss one that does).
 *
 * Run before `vite build` — public/ is copied into dist/ by Vite.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const SITE_URL = 'https://www.winrise.org';

const staticRoutes = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'src/prerender/staticRoutes.json'), 'utf8')
);

// Read the team slugs straight out of the data module rather than duplicating
// them, using a light parse so this script stays dependency-free.
const teamSource = fs.readFileSync(path.join(ROOT, 'src/data/team.js'), 'utf8');
const teamSlugs = [...teamSource.matchAll(/^\s*slug:\s*'([^']+)'/gm)].map((match) => match[1]);

const PRIORITY = {
  '/': { priority: '1.0', changefreq: 'weekly' },
  '/services': { priority: '0.9', changefreq: 'weekly' },
  '/resources': { priority: '0.9', changefreq: 'weekly' },
  '/resources/mental-health-organizations-uganda': { priority: '0.9', changefreq: 'monthly' },
  '/about': { priority: '0.8', changefreq: 'monthly' },
  '/team': { priority: '0.8', changefreq: 'monthly' },
  '/contact': { priority: '0.8', changefreq: 'monthly' },
};

const lastmod = new Date().toISOString();

const routes = [
  ...staticRoutes.map((route) => route.path),
  ...teamSlugs.map((slug) => `/team/${slug}`),
];

const urls = routes
  .map((route) => {
    const { priority = '0.7', changefreq = 'monthly' } = PRIORITY[route] ?? {};
    const loc = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].join('\n');
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outPath = path.join(ROOT, 'public/sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');
console.log(`✔ sitemap.xml written with ${routes.length} URLs`);
