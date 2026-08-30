/**
 * Single source of truth for site-wide SEO constants.
 *
 * IMPORTANT: SITE_URL must match the canonical host exactly (with www, no
 * trailing slash). Every canonical URL, sitemap entry, JSON-LD `url` and
 * og:url is derived from it, so changing it here changes it everywhere.
 */

export const SITE_URL = 'https://www.winrise.org';

export const SITE_NAME = 'WINRISE';
export const LEGAL_NAME = 'Winrise Counselling and Wellness Solutions Ltd';
export const ORG_NAME = 'Winrise Counselling & Wellness';

/**
 * Where the site-wide Donate call to action points.
 *
 * TEMPORARY: this is a personal Eversend handle, not a WINRISE organisation
 * account. Swap it for the organisation's own donation page when that exists —
 * changing this one line updates every Donate button on the site.
 */
export const DONATE_URL = 'https://eversend.me/marc1705';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/winrise-og.png`;
export const LOGO_URL = `${SITE_URL}/images/winrise.png`;

export const CONTACT = {
  telephone: '+256-772-360-111',
  email: 'info@winrise.org',
  addressLocality: 'Kampala',
  addressRegion: 'Central Region',
  addressCountry: 'UG',
};

/** Robots directive that lets Google use full snippets and large image previews. */
export const ROBOTS_INDEX =
  'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
export const ROBOTS_NOINDEX = 'noindex, nofollow';

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = '/') {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return clean === '/' ? `${SITE_URL}/` : `${SITE_URL}${clean}`;
}
