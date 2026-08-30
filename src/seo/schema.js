/**
 * JSON-LD builders. Every function returns a plain object with no `@context`
 * except the top-level helpers — `buildGraph()` adds a single `@context` and
 * wraps everything in one `@graph` block, which is cleaner than emitting a
 * separate <script> tag per schema.
 *
 * Rules enforced here:
 *   - every `url`, `image` and `logo` is an absolute https URL
 *   - `@id` values give each entity a stable identity so they can reference
 *     each other inside the graph (this is what lets Google connect a Person
 *     to the Organization they work for)
 *   - the last BreadcrumbList item has no `item`, per Google's spec
 */

import {
  SITE_URL,
  SITE_NAME,
  ORG_NAME,
  LEGAL_NAME,
  LOGO_URL,
  CONTACT,
  absoluteUrl,
} from './siteConfig.js';
import { team } from '../data/team.js';
import { organizations } from '../data/organizations.js';

/** Stable @id anchors, so entities can cross-reference instead of duplicating. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const personId = (slug) => `${SITE_URL}/team/${slug}#person`;

/** Wrap a list of schema objects into one @graph block. */
export function buildGraph(schemas) {
  const list = (Array.isArray(schemas) ? schemas : [schemas]).filter(Boolean);
  if (list.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@graph': list.map(({ '@context': _ignored, ...rest }) => rest),
  };
}

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: ORG_NAME,
    legalName: LEGAL_NAME,
    alternateName: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
    },
    image: LOGO_URL,
    description:
      'Winrise Counselling & Wellness provides professional mental health services in Uganda: individual therapy, family and couples counselling, corporate wellness programmes, and community mental health support.',
    telephone: CONTACT.telephone,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: CONTACT.addressLocality,
      addressRegion: CONTACT.addressRegion,
      addressCountry: CONTACT.addressCountry,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Uganda',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT.telephone,
      contactType: 'customer service',
      areaServed: 'UG',
      availableLanguage: ['English'],
      url: `${SITE_URL}/contact`,
    },
    // Ties every director to the organisation inside Google's knowledge graph.
    // This is half of the person↔org link; the other half is `worksFor` on each
    // Person, below.
    employee: team.map((member) => ({ '@id': personId(member.slug) })),
    founder: { '@id': personId('dr-kyosaba-winfred-biribonwa') },
    knowsAbout: [
      'Mental Health',
      'Counselling',
      'Psychotherapy',
      'Corporate Wellness',
      'Community Mental Health',
    ],
    // Fill these in with real, owned profiles — the same disambiguation logic
    // that applies to a Person applies to the Organization.
    sameAs: [],
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: ORG_NAME,
    alternateName: SITE_NAME,
    url: `${SITE_URL}/`,
    description: 'Empowering Minds, Transforming Lives',
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
  };
}

/**
 * @param {{name: string, path?: string}[]} crumbs
 * The final crumb must omit `path` — Google expects no `item` on the current page.
 */
export function breadcrumbSchema(crumbs) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      ...(crumb.path ? { item: absoluteUrl(crumb.path) } : {}),
    })),
  };
}

/**
 * A minimal Person node — enough for a `{"@id": …}` reference elsewhere in the
 * graph to resolve to something real.
 *
 * Organization.employee and Organization.founder point at the four directors on
 * every page. Without a stub, those pointers dangle on pages that do not carry
 * the full Person entity, which a validator flags and which tells Google
 * nothing. With it, every page reinforces the same fact — these four people
 * belong to this organisation, and each has a URL on winrise.org.
 *
 * Where a full personSchema() is also present, the two nodes share an @id and
 * are merged by the consumer, so nothing is duplicated.
 */
export function personStub(member) {
  return {
    '@type': 'Person',
    '@id': personId(member.slug),
    name: member.name,
    url: absoluteUrl(`/team/${member.slug}`),
  };
}

/** The Person entity for one team member. */
export function personSchema(member) {
  return {
    '@type': 'Person',
    '@id': personId(member.slug),
    name: member.name,
    ...(member.honorificPrefix ? { honorificPrefix: member.honorificPrefix } : {}),
    ...(member.honorificSuffix ? { honorificSuffix: member.honorificSuffix } : {}),
    jobTitle: member.jobTitle,
    description: member.bio,
    image: absoluteUrl(member.image),
    url: absoluteUrl(`/team/${member.slug}`),
    worksFor: { '@id': ORG_ID },
    affiliation: { '@id': ORG_ID },
    nationality: { '@type': 'Country', name: 'Uganda' },
    workLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: CONTACT.addressLocality,
        addressCountry: CONTACT.addressCountry,
      },
    },
    knowsAbout: member.knowsAbout,
    ...(member.credentials?.length
      ? {
          hasCredential: member.credentials.map((credential) => ({
            '@type': 'EducationalOccupationalCredential',
            name: credential,
          })),
        }
      : {}),
    sameAs: member.sameAs ?? [],
  };
}

/** ProfilePage wrapper — the page type Google expects for a person's bio page. */
export function profilePageSchema(member) {
  return {
    '@type': 'ProfilePage',
    '@id': `${absoluteUrl(`/team/${member.slug}`)}#profilepage`,
    url: absoluteUrl(`/team/${member.slug}`),
    name: `${member.displayName} — ${member.jobTitle} at ${ORG_NAME}`,
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: { '@id': personId(member.slug) },
  };
}

/** An ItemList of all the directors, used on the /team hub page. */
export function teamListSchema() {
  return {
    '@type': 'ItemList',
    name: `${ORG_NAME} leadership team`,
    itemListElement: team.map((member, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/team/${member.slug}`),
      name: member.displayName,
    })),
  };
}

/** Generic WebPage node so every page has a typed identity in the graph. */
export function webPageSchema({ path, title, description }) {
  return {
    '@type': 'WebPage',
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en',
  };
}

/**
 * The directory page's ItemList. Each entry is a full Organization node rather
 * than a bare reference — these are third-party organisations that exist
 * nowhere else in the graph, so a {"@id"} pointer would dangle.
 */
export function organizationDirectorySchema(path) {
  return {
    '@type': 'ItemList',
    '@id': `${absoluteUrl(path)}#directory`,
    name: 'Mental health organizations in Uganda',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: organizations.length,
    itemListElement: organizations.map((org, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Organization',
        name: org.name,
        description: org.summary,
        url: org.url,
        ...(org.tollFree || org.phone ? { telephone: org.tollFree || org.phone } : {}),
        ...(org.location
          ? {
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Kampala',
                addressCountry: 'UG',
              },
            }
          : {}),
        areaServed: { '@type': 'Country', name: 'Uganda' },
      },
    })),
  };
}
