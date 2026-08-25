/**
 * The single source of truth for every route's <head>.
 *
 * Both the runtime <SEO> component and the build-time prerenderer read from
 * this one function, which is what guarantees the HTML a crawler receives and
 * the HTML a browser ends up with cannot drift apart.
 *
 * Title target: 50–60 characters. Description target: 150–160 characters.
 */

import { ORG_NAME, DEFAULT_OG_IMAGE, ROBOTS_INDEX, absoluteUrl } from './siteConfig.js';
import { team, getTeamMember } from '../data/team.js';
import {
  organizationSchema,
  websiteSchema,
  breadcrumbSchema,
  personSchema,
  personStub,
  profilePageSchema,
  teamListSchema,
  webPageSchema,
} from './schema.js';

const staticPages = {
  '/': {
    title: 'WINRISE — Mental Health & Counselling in Uganda',
    description:
      'Professional mental health and wellness services in Uganda. Individual therapy, family counselling, corporate wellness programmes and community support from WINRISE.',
    crumbs: [{ name: 'Home' }],
  },
  '/services': {
    title: 'Mental Health Services in Uganda | WINRISE',
    description:
      'Explore WINRISE counselling services in Uganda: individual therapy, family and couples counselling, corporate wellness, and community support programmes.',
    crumbs: [{ name: 'Home', path: '/' }, { name: 'Services' }],
  },
  '/about': {
    title: 'About WINRISE Counselling & Wellness, Uganda',
    description:
      "Learn about WINRISE's mission, values and leadership team delivering accessible mental health and wellness services across Uganda since our founding in Kampala.",
    crumbs: [{ name: 'Home', path: '/' }, { name: 'About Us' }],
  },
  '/resources': {
    title: 'Mental Health Resources & Guides | WINRISE',
    description:
      'Browse WINRISE mental health resources: articles, downloadable guides, videos and podcasts covering workplace stress, grief, resilience and personal wellbeing.',
    crumbs: [{ name: 'Home', path: '/' }, { name: 'Resources' }],
  },
  '/contact': {
    title: 'Contact WINRISE | Book a Counselling Session',
    description:
      'Contact WINRISE Counselling & Wellness in Kampala to book a therapy session, ask a question, or request corporate and community mental health support in Uganda.',
    crumbs: [{ name: 'Home', path: '/' }, { name: 'Contact' }],
  },
  '/team': {
    title: 'Our Team | WINRISE Counselling & Wellness',
    description:
      'Meet the WINRISE leadership team: Dr. Kyosaba Winfred Biribonwa, Joan Claire Kabikuru, Richard Asiimwe Kacururu and Emilly Karine Ajuna, directors of WINRISE Uganda.',
    crumbs: [{ name: 'Home', path: '/' }, { name: 'Our Team' }],
  },
};

/**
 * Per-person head data. The full name leads the title because these pages exist
 * to answer a search for that person's name.
 */
const personMeta = {
  'dr-kyosaba-winfred-biribonwa': {
    title: 'Dr. Kyosaba Winfred Biribonwa — Psychologist',
    description:
      'Dr. Kyosaba Winfred Biribonwa, PhD is a licensed psychologist and Founding Partner & Executive Director of WINRISE Counselling & Wellness in Kampala, Uganda.',
  },
  'joan-claire-kabikuru': {
    title: 'Joan Claire Kabikuru — Director, WINRISE',
    description:
      'Joan Claire Kabikuru is Head of Finance & Administration and a Director of WINRISE Counselling & Wellness, the mental health company based in Kampala, Uganda.',
  },
  'richard-asiimwe-kacururu': {
    title: 'Richard Asiimwe Kacururu — Director, WINRISE',
    description:
      'Richard Asiimwe Kacururu is a Partner, Director and travel specialist at WINRISE Counselling & Wellness, Kampala — leading community engagement across Uganda.',
  },
  'emilly-karine-ajuna': {
    title: 'Emilly Karine Ajuna — Corporate Wellness Lead',
    description:
      'Emilly Karine Ajuna is Corporate Wellness Lead and a Director at WINRISE Counselling & Wellness, Kampala — banker, career coach and workplace safeguarding advocate.',
  },
};

/** Schemas that belong on every single page. */
function globalSchemas() {
  return [organizationSchema(), websiteSchema()];
}

/**
 * Organization.employee / .founder reference each director by @id, so every
 * page must declare those Person nodes or the references dangle. Pages that
 * already carry a full Person entity keep it; the rest get a stub.
 */
function withPersonReferences(schemas) {
  const declared = new Set(
    schemas.filter((node) => node['@type'] === 'Person').map((node) => node['@id'])
  );
  const stubs = team
    .map(personStub)
    .filter((stub) => !declared.has(stub['@id']));
  return [...schemas, ...stubs];
}

/**
 * Resolve the full head payload for a route.
 * @param {string} path e.g. '/about' or '/team/joan-claire-kabikuru'
 * @returns {{title,description,canonical,ogImage,ogType,robots,structuredData}}
 */
export function getPageMeta(path = '/') {
  const clean = path === '' ? '/' : path.replace(/\/+$/, '') || '/';

  // ── Person profile pages ────────────────────────────────────────────────
  const personMatch = clean.match(/^\/team\/([^/]+)$/);
  if (personMatch) {
    const member = getTeamMember(personMatch[1]);
    if (member) {
      const meta = personMeta[member.slug];
      return {
        title: meta.title,
        description: meta.description,
        canonical: absoluteUrl(clean),
        // JPEG, not the WebP used on the page: several link-preview scrapers
        // (LinkedIn, WhatsApp, older Facebook) still fail to render a WebP
        // og:image and fall back to no image at all.
        ogImage: absoluteUrl(member.image.replace(/\.webp$/, '.jpg')),
        ogType: 'profile',
        robots: ROBOTS_INDEX,
        structuredData: withPersonReferences([
          ...globalSchemas(),
          profilePageSchema(member),
          personSchema(member),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Our Team', path: '/team' },
            { name: member.displayName },
          ]),
        ]),
      };
    }
  }

  // ── Static pages ────────────────────────────────────────────────────────
  const page = staticPages[clean];
  if (!page) {
    return {
      title: `Page not found | ${ORG_NAME}`,
      description: 'The page you are looking for could not be found on winrise.org.',
      canonical: absoluteUrl(clean),
      ogImage: DEFAULT_OG_IMAGE,
      ogType: 'website',
      robots: 'noindex, follow',
      structuredData: withPersonReferences(globalSchemas()),
    };
  }

  const structuredData = [
    ...globalSchemas(),
    webPageSchema({ path: clean, title: page.title, description: page.description }),
  ];

  // The homepage has no breadcrumb trail; every inner page does.
  if (clean !== '/') {
    structuredData.push(breadcrumbSchema(page.crumbs));
  }

  // The team hub lists the people; the About page also introduces them, so both
  // carry the Person entities. Declaring a Person on more than one page is fine
  // — the shared @id tells Google it is one entity, not several.
  if (clean === '/team') {
    structuredData.push(teamListSchema(), ...team.map(personSchema));
  }
  if (clean === '/about') {
    structuredData.push(...team.map(personSchema));
  }

  return {
    title: page.title,
    description: page.description,
    canonical: absoluteUrl(clean),
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: ROBOTS_INDEX,
    structuredData: withPersonReferences(structuredData),
  };
}

/** Every indexable route, in sitemap order. Shared with the sitemap generator. */
export const indexableRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/services', changefreq: 'weekly', priority: '0.9' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/team', changefreq: 'monthly', priority: '0.8' },
  ...team.map((member) => ({
    path: `/team/${member.slug}`,
    changefreq: 'monthly',
    priority: '0.7',
  })),
  { path: '/resources', changefreq: 'weekly', priority: '0.9' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
];
