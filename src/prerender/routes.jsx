/**
 * The prerender route manifest — the list of URLs that get written to disk as
 * real HTML after `vite build`.
 *
 * Static paths come from staticRoutes.json, which the sitemap generator also
 * reads, so the sitemap and the prerendered pages cannot drift apart. Person
 * profile routes are expanded from src/data/team.js for the same reason: add a
 * director there and they get a page, a sitemap entry and schema automatically.
 */

import staticRoutes from './staticRoutes.json';
import { team } from '../data/team.js';

export const prerenderRoutes = [
  ...staticRoutes.map((route) => ({ path: route.path })),
  ...team.map((member) => ({ path: `/team/${member.slug}` })),
];

export default prerenderRoutes;
