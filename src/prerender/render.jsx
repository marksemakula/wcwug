/**
 * Build-time rendering: turn one route into real HTML.
 *
 *   renderRoute()        — React → body HTML + head HTML for a single path
 *   injectIntoTemplate() — splice that into the built dist/index.html shell
 *                          (re-exported from ./head.js)
 *
 * There is deliberately no react-helmet-async here. The head is built directly
 * from getPageMeta(), the same function the runtime <SEO> component reads, so
 * the static HTML and the client-rendered head are generated from one source
 * and cannot disagree. It also means the project gains no new dependency.
 *
 * The pure string helpers live in ./head.js so they can be unit-tested without
 * booting React — see scripts/check-seo.mjs.
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { AppShell } from '../App.jsx';
import { buildHeadHtml, neutralizeInitialAnimationStyles } from './head.js';

export { buildHeadHtml, injectIntoTemplate } from './head.js';

/** Render one route to body + head HTML. */
export async function renderRoute({ path }) {
  const bodyHtml = renderToString(
    <MemoryRouter initialEntries={[path]}>
      <AppShell />
    </MemoryRouter>
  );

  return {
    bodyHtml: neutralizeInitialAnimationStyles(bodyHtml),
    headHtml: buildHeadHtml(path),
  };
}
