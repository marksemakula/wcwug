/**
 * Directory of mental health organizations in Uganda.
 *
 * ── Editorial rules for this file ───────────────────────────────────────────
 * People reach this page looking for help, sometimes urgently. A wrong phone
 * number here is worse than no phone number, so:
 *
 *   1. A `phone` is only ever filled in when it was read off the
 *      organisation's OWN site or a recognised helpline registry. Every entry
 *      records where it came from in `sourceUrl` and when, in `verified`.
 *   2. If a number cannot be verified, leave `phone` empty. The entry still
 *      links to the organisation's official site, which is always current.
 *   3. Entries are alphabetical. Winrise sits in that order like everyone
 *      else — no special placement. A directory that promotes its publisher
 *      is thin content, and readers see through it.
 *   4. Re-check the crisis numbers periodically. `verified` is there so a
 *      stale entry is obvious.
 * ────────────────────────────────────────────────────────────────────────────
 */

export const organizations = [
  {
    slug: 'butabika-national-referral-mental-hospital',
    name: 'Butabika National Referral Mental Hospital',
    type: 'Government hospital',
    summary:
      "Uganda's national referral hospital for mental health, and the country's main provider of inpatient psychiatric care. Runs outpatient clinics, a child and adolescent unit, and alcohol and drug rehabilitation.",
    location: 'Plot 2, Kirombe–Butabika Road, P.O. Box 7017, Kampala',
    phone: '+256 414 504 375',
    tollFree: '0800 211 306',
    hours: 'Open 24 hours, every day',
    url: 'https://www.butabikahospital.go.ug/',
    sourceUrl: 'https://www.butabikahospital.go.ug/',
    verified: '2026-08',
    crisis: true,
  },
  {
    slug: 'mental-health-uganda',
    name: 'Mental Health Uganda (MHU)',
    type: 'National membership NGO',
    summary:
      'A membership organisation of people with lived experience of mental illness, working across Uganda on advocacy, community support groups and public awareness. Operates a national toll-free helpline.',
    location: 'Kampala, with branches across Uganda',
    phone: '',
    tollFree: '0800 21 21 21',
    hours: 'Helpline: Monday to Friday, 8:30am – 5:00pm',
    url: 'https://mhu.ug/',
    sourceUrl: 'https://findahelpline.com/organizations/mental-health-uganda-toll-free',
    verified: '2026-08',
    crisis: true,
  },
  {
    slug: 'mindverse-uganda',
    name: 'Mindverse Uganda',
    type: 'Youth mental health initiative',
    summary:
      'Works on mental health awareness and psychosocial support for young people in Uganda, with a focus on reaching students and youth through community and digital channels.',
    location: 'Uganda',
    phone: '',
    tollFree: '',
    hours: '',
    url: 'https://www.mhinnovation.net/organisations/mindverse-uganda',
    sourceUrl: 'https://www.mhinnovation.net/organisations/mindverse-uganda',
    verified: '2026-08',
    crisis: false,
  },
  {
    slug: 'strongminds-uganda',
    name: 'StrongMinds Uganda',
    type: 'International NGO',
    summary:
      'Delivers group interpersonal psychotherapy for depression, free of charge, largely to women and adolescents. One of the largest providers of depression treatment in Uganda by number of people reached.',
    location: 'Kampala and multiple districts across Uganda',
    phone: '',
    tollFree: '',
    hours: '',
    url: 'https://strongminds.org/uganda/',
    sourceUrl: 'https://strongminds.org/uganda/',
    verified: '2026-08',
    crisis: false,
  },
  {
    slug: 'tpo-uganda',
    name: 'TPO Uganda (Transcultural Psychosocial Organization)',
    type: 'National NGO',
    summary:
      'Provides community-based mental health and psychosocial support, with long-standing work in trauma care, child protection and services for refugees and post-conflict communities.',
    location: 'Kampala, with field offices across Uganda',
    phone: '',
    tollFree: '',
    hours: '',
    url: 'https://tpoug.org/',
    sourceUrl: 'https://tpoug.org/',
    verified: '2026-08',
    crisis: false,
  },
  {
    slug: 'winrise-counselling-and-wellness',
    name: 'Winrise Counselling & Wellness',
    type: 'Private counselling practice',
    summary:
      'Private counselling and wellness practice offering individual therapy, family and couples counselling, online therapy, and corporate wellness and employee assistance programmes.',
    location: 'Kampala, serving all regions of Uganda',
    phone: '+256 772 360 111',
    tollFree: '',
    hours: '',
    url: 'https://www.winrise.org/',
    sourceUrl: 'https://www.winrise.org/',
    verified: '2026-08',
    crisis: false,
    isPublisher: true,
  },
];

/** Further directories, for readers who need something not listed above. */
export const furtherDirectories = [
  {
    name: 'Find A Helpline — Uganda',
    summary: 'Free, verified crisis helplines for Uganda, filterable by what you are going through.',
    url: 'https://findahelpline.com/countries/ug',
  },
  {
    name: 'Mental Health Innovation Network',
    summary:
      'A global database of mental health organisations and projects, searchable by country.',
    url: 'https://www.mhinnovation.net/organisations',
  },
];

export const crisisOrganizations = organizations.filter((org) => org.crisis);
