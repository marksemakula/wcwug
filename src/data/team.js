/**
 * Team directory — the single source of truth for every place a person appears:
 * the About page cards, the Home page cards, the /team hub, each /team/<slug>
 * profile page, the sitemap, and the Person JSON-LD.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * `sameAs` is the most important field for getting a person to rank for their
 * own name. It tells Google "this Person entity is the same entity as these
 * already-known profiles", which is how a name query gets disambiguated and how
 * a knowledge panel is eventually assembled.
 *
 * Add every profile that genuinely belongs to the person and that they control
 * or are named on — LinkedIn, X/Twitter, Facebook, Instagram, ResearchGate,
 * ORCID, a university staff page, a professional association listing, an
 * author page, a conference speaker page.
 *
 * Leave the array empty rather than guessing. A wrong sameAs actively harms
 * entity resolution: it merges the person with someone else.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const team = [
  {
    slug: 'dr-kyosaba-winfred-biribonwa',
    name: 'Dr. Kyosaba Winfred Biribonwa',
    // Rendered on cards; keeps the post-nominal without polluting `name`,
    // which schema.org expects to be the plain personal name.
    displayName: 'Dr. Kyosaba Winfred Biribonwa - PhD',
    honorificPrefix: 'Dr.',
    honorificSuffix: 'PhD',
    jobTitle: 'Founding Partner & Executive Director',
    image: '/images/dr-kyosaba-winfred-biribonwa.webp',
    bio: 'Licensed psychologist with 35+ years of experience in rehabilitation counselling and community mental health.',
    longBio: [
      'Dr. Kyosaba Winfred Biribonwa is the Founding Partner and Executive Director of Winrise Counselling and Wellness Solutions Ltd, a Ugandan mental health and wellness company based in Kampala.',
      'A licensed psychologist, she has spent more than 35 years in rehabilitation counselling and community mental health, working with individuals, families and organisations across Uganda. Her practice combines clinical psychology with a community-development approach, focusing on making mental health support culturally relevant and reachable outside major urban centres.',
      'At Winrise she leads clinical standards and the organisation’s strategy to widen access to counselling across all regions of Uganda, including the training of wellness professionals and community facilitators.',
    ],
    knowsAbout: [
      'Clinical Psychology',
      'Rehabilitation Counselling',
      'Community Mental Health',
      'Trauma-Informed Care',
      'Psychotherapy',
    ],
    credentials: [
      'PhD, Psychology',
      'Licensed Psychologist',
      'Member, Uganda Counselling Association (UCA)',
    ],
    // ↓ Paste real profile URLs here. See the note at the top of this file.
    sameAs: [],
  },
  {
    slug: 'joan-claire-kabikuru',
    name: 'Joan Claire Kabikuru',
    displayName: 'Joan Claire Kabikuru',
    honorificPrefix: '',
    honorificSuffix: '',
    jobTitle: 'Head of Finance & Administration, Director',
    image: '/images/joan-claire-kabikuru.webp',
    bio: 'Financial expert ensuring operational excellence and sustainable growth for our mental health initiatives.',
    longBio: [
      'Joan Claire Kabikuru is Head of Finance & Administration and a Director of Winrise Counselling and Wellness Solutions Ltd in Kampala, Uganda.',
      'She leads the financial and administrative side of the organisation — budgeting, compliance, and the operational systems that let a growing counselling practice stay affordable for the people it serves. Her work underpins Winrise’s commitment to keeping mental health services accessible rather than premium-priced.',
      'She oversees the company’s compliance with the Uganda Registration Services Bureau (URSB) and Uganda Revenue Authority (URA), and manages the financial planning behind Winrise’s expansion into new regions.',
    ],
    knowsAbout: [
      'Financial Management',
      'Nonprofit Administration',
      'Organisational Governance',
      'Operations Management',
    ],
    credentials: ['Finance & Administration Leadership'],
    sameAs: [],
  },
  {
    slug: 'richard-asiimwe-kacururu',
    name: 'Richard Asiimwe Kacururu',
    displayName: 'Richard Asiimwe Kacururu',
    honorificPrefix: '',
    honorificSuffix: '',
    jobTitle: 'Travel Specialist, Partner & Director',
    image: '/images/richard-asiimwe-kacururu.webp',
    bio: 'Passionate advocate for mental health awareness with extensive experience in community engagement, travel and support program development.',
    longBio: [
      'Richard Asiimwe Kacururu is a Partner and Director at Winrise Counselling and Wellness Solutions Ltd, and a travel specialist based in Kampala, Uganda.',
      'He is an advocate for mental health awareness with extensive experience in community engagement and in developing support programmes. His work connects Winrise to communities outside Kampala, building the partnerships with schools, NGOs and companies that carry counselling services into new districts.',
      'He leads Winrise’s community outreach and partnership development, including the organisation’s goal of working with schools, NGOs and companies across Uganda.',
    ],
    knowsAbout: [
      'Community Engagement',
      'Mental Health Advocacy',
      'Programme Development',
      'Partnership Development',
      'Travel and Wellness Retreats',
    ],
    credentials: ['Community Programme Development'],
    sameAs: [],
  },
  {
    slug: 'emilly-karine-ajuna',
    name: 'Emilly Karine Ajuna',
    displayName: 'Emilly Karine Ajuna',
    honorificPrefix: '',
    honorificSuffix: '',
    jobTitle: 'Head of Programs & Director',
    image: '/images/emilly-karine-ajuna.webp',
    bio: 'Banker & career coach, supporting & ardent advocate of safeguarding in the workplace, including mental health and employee assistance programs.',
    longBio: [
      'Emilly Karine Ajuna is the Head of Programs and a Director at Winrise Counselling and Wellness Solutions Ltd in Kampala, Uganda.',
      'A banker and career coach, she is an advocate for workplace safeguarding — mental health provision, employee assistance programmes, and the practical structures that make a workplace safe to speak up in. She brings a corporate-sector perspective to counselling, which shapes how Winrise designs wellness programmes for Ugandan employers.',
      'She leads Winrise\'s programs offering, working with companies on employee assistance programmes, workplace stress, and staff mental health training.',
    ],
    knowsAbout: [
      'Corporate Wellness',
      'Employee Assistance Programmes',
      'Career Coaching',
      'Workplace Safeguarding',
      'Workplace Mental Health',
    ],
    credentials: ['Career Coach', 'Banking & Corporate Wellness'],
    sameAs: [],
  },
];

/** Look a member up by slug. Returns undefined for an unknown slug. */
export function getTeamMember(slug) {
  return team.find((member) => member.slug === slug);
}

/** Every profile route, used by the sitemap generator and the prerenderer. */
export const teamRoutes = team.map((member) => `/team/${member.slug}`);
