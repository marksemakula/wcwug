#!/usr/bin/env node
/**
 * Environment-aware robots.txt.
 *
 * Vercel gives every branch and every commit its own preview URL. Those preview
 * deployments serve the same pages as production, so if they are indexable they
 * compete with winrise.org for its own content. This overwrites dist/robots.txt
 * with a blanket Disallow on anything that is not the production deployment,
 * and leaves the real robots.txt untouched in production.
 *
 * Run AFTER `vite build` (it edits dist/, not public/).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, '../dist');
const target = path.join(DIST, 'robots.txt');

const isProduction =
  process.env.VERCEL_ENV === 'production' ||
  // Local `npm run build` with no Vercel env present: assume production output.
  process.env.VERCEL_ENV === undefined;

if (!fs.existsSync(DIST)) {
  console.warn('⚠ dist/ not found — skipping robots.txt step.');
  process.exit(0);
}

if (isProduction) {
  console.log('✔ robots.txt: production ruleset kept');
} else {
  fs.writeFileSync(
    target,
    ['# Preview deployment — not for indexing.', 'User-agent: *', 'Disallow: /', ''].join('\n'),
    'utf8'
  );
  console.log(`✔ robots.txt: preview deployment (${process.env.VERCEL_ENV}) set to Disallow: /`);
}
