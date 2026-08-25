#!/usr/bin/env node
/**
 * Post-build prerenderer — run AFTER `vite build`.
 *
 * For every route in the manifest it renders the real React tree to HTML and
 * writes dist/<route>/index.html with the content and head tags baked in. The
 * result: Googlebot's first fetch, Bing, and every link-preview bot (WhatsApp,
 * LinkedIn, Facebook, X, Slack) all receive a page with actual content and a
 * title/description/image specific to that URL, instead of an empty
 * <div id="root"></div> shell that is identical on every route.
 *
 * A failure on one route logs a warning and moves on — the SPA fallback still
 * serves that route client-side, so a single bad page never fails the deploy.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const TEMPLATE_PATH = path.join(DIST, 'index.html');

function writeRoute(html, routePath) {
  const relative =
    routePath === '/' ? 'index.html' : path.join(routePath.replace(/^\//, ''), 'index.html');
  const outPath = path.join(DIST, relative);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
}

async function main() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error('✖ dist/index.html not found — run `vite build` first.');
    process.exit(1);
  }
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

  // Middleware mode only so Vite will transform and SSR-load our JSX modules
  // (resolving the @ alias, CSS imports and import.meta.env for us).
  // mode: 'production' matters — createServer defaults to development, which
  // would make import.meta.env.PROD false during the render.
  // hmr:false + watch:null stop a file watcher from keeping Node alive.
  const vite = await createServer({
    mode: 'production',
    server: { middlewareMode: true, hmr: false, watch: null },
    optimizeDeps: { noDiscovery: true },
    appType: 'custom',
    logLevel: 'warn',
  });

  let written = 0;
  let skipped = 0;

  try {
    const { prerenderRoutes } = await vite.ssrLoadModule('/src/prerender/routes.jsx');
    const { renderRoute, injectIntoTemplate } = await vite.ssrLoadModule(
      '/src/prerender/render.jsx'
    );

    for (const route of prerenderRoutes) {
      try {
        const { bodyHtml, headHtml } = await renderRoute({ path: route.path });

        if (!bodyHtml || bodyHtml.length < 200) {
          throw new Error(`rendered body suspiciously small (${bodyHtml?.length ?? 0} chars)`);
        }

        writeRoute(injectIntoTemplate(template, { headHtml, bodyHtml }), route.path);
        written += 1;
      } catch (error) {
        skipped += 1;
        console.warn(`⚠ prerender skipped ${route.path}: ${error.message}`);
      }
    }
  } finally {
    await vite.close();
  }

  console.log(`✔ prerendered ${written} routes${skipped ? ` (${skipped} skipped)` : ''}`);

  if (written === 0) {
    console.error('✖ no routes prerendered — the SEO fix did not apply.');
    process.exit(1);
  }
}

main()
  // Force a clean exit: esbuild/worker handles can otherwise hang the build.
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('✖ prerender failed:', error);
    process.exit(1);
  });
