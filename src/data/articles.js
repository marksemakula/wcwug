/**
 * Articles published under Resources → Articles.
 *
 * The single source of truth for every place an article appears: its own page
 * at /resources/<slug>, its card on the Resources page, the "In the press"
 * block on a team member's profile, the sitemap, the prerendered <head> and
 * the Article JSON-LD. Add an entry here and all of those follow.
 *
 * ── Writing about press coverage ────────────────────────────────────────────
 * When an article responds to someone else's journalism (a newspaper feature,
 * a broadcast), summarise it in our own words and link to the original via
 * `source`. Do not paste the original text or a scan of the printed page —
 * the copyright belongs to the publisher, and the link is what sends readers
 * to the full story.
 *
 * Body blocks:
 *   { type: 'p',  text }        a paragraph
 *   { type: 'h2', text }        a section heading
 *   { type: 'highlight', text } a pull-out key point (our words, not a quote)
 * ────────────────────────────────────────────────────────────────────────────
 */

export const articles = [
  {
    slug: 'kyosaba-classroom-to-counselling',
    // Shown on the page and the Resources card.
    title: 'From the Classroom to the Counselling Room',
    // Used in the breadcrumb, where space is short.
    shortTitle: 'From the Classroom to the Counselling Room',
    kicker: 'In the Press · Daily Monitor',
    standfirst:
      'The Daily Monitor has profiled our Founding Partner and Executive Director, Dr Kyosaba Winfred Biribonwa, tracing a career that began in a primary school classroom and has been shaped throughout by one conviction: look past the behaviour to the person behind it.',
    // <head> copy. Title ≤60 characters, description 150–160.
    seoTitle: 'Dr Kyosaba in the Daily Monitor: Classroom to Counselling',
    seoDescription:
      'The Daily Monitor profiles WINRISE founder Dr Kyosaba Winfred Biribonwa, from a Grade III classroom to doctoral research on young adults and counselling.',
    // ISO 8601 with the Kampala offset, so the date is unambiguous everywhere.
    datePublished: '2026-10-28T09:00:00+03:00',
    dateModified: '2026-10-28T09:00:00+03:00',
    author: 'WINRISE Editorial Team',
    section: 'In the Press',
    category: 'articles',
    type: 'Article',
    featured: true,
    // The team member the article is about — links the page to their profile
    // and puts the article on that profile under "In the press".
    personSlug: 'dr-kyosaba-winfred-biribonwa',
    image: '/images/articles/kyosaba-classroom-to-counselling.webp',
    imageJpg: '/images/articles/kyosaba-classroom-to-counselling.jpg',
    imageAlt:
      'Dr Kyosaba Winfred Biribonwa, Founding Partner and Executive Director of WINRISE Counselling & Wellness',
    // The photograph is the one the Daily Monitor ran with the feature.
    imageCredit: 'Photograph as published in the Daily Monitor, 28 October 2026',
    // 1200×630 JPEG built for link previews. JPEG rather than WebP because
    // WhatsApp, LinkedIn and older Facebook scrapers still drop WebP previews.
    ogImage: '/images/articles/kyosaba-classroom-to-counselling-og.jpg',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt:
      'From the classroom to the counselling room: Dr Kyosaba Winfred Biribonwa, as featured in the Daily Monitor',
    keywords: [
      'Dr Kyosaba Winfred Biribonwa',
      'Daily Monitor',
      'counselling in Uganda',
      'young adults',
      'person-centred counselling',
      'disability inclusion',
      'Kyambogo University',
    ],
    source: {
      publication: 'Daily Monitor',
      publicationUrl: 'https://www.monitor.co.ug/',
      section: 'dmXtra Career',
      headline: 'Kyosaba’s long road from classroom to counselling',
      author: 'Joan Salmon',
      datePublished: '2026-10-28',
      dateLabel: 'Wednesday, 28 October 2026',
      url: 'https://www.monitor.co.ug/uganda/lifestyle/reviews-profiles/kyosaba-s-long-road-from-classroom-to-counselling-5647708',
    },
    body: [
      {
        type: 'p',
        text: 'We are delighted to share that the Daily Monitor has featured Dr Kyosaba Winfred Biribonwa, Founding Partner and Executive Director of WINRISE Counselling & Wellness, in its dmXtra Career pages. Written by Joan Salmon and published on Wednesday, 28 October 2026, the profile follows her journey from Grade III teacher to doctoral researcher, and examines the conviction that has guided every stage of it: that meaningful change begins with understanding the person, not merely correcting the behaviour.',
      },
      {
        type: 'p',
        text: 'For those of us who work alongside her, the piece captures something very familiar. Below, we set out its principal themes and reflect on what they mean for the way WINRISE serves individuals, families and institutions across Uganda. The full article is available on the Daily Monitor website.',
      },
      { type: 'h2', text: 'It began in a primary school classroom' },
      {
        type: 'p',
        text: 'Dr Kyosaba’s professional life started not in a clinic but at the front of a classroom. Trained as a Grade III teacher, she had originally intended to spend her entire career teaching. What she observed, however, was that every child arrived carrying far more than a school bag: personal circumstances, differing abilities, and hopes and burdens that shaped how ready they were to learn.',
      },
      {
        type: 'p',
        text: 'Some pupils needed encouragement, reassurance and patience before any lesson could take hold. That realisation reframed teaching for her as something far larger than completing the syllabus or preparing children for examinations, and it established a habit she has kept ever since: looking beyond a child’s conduct to the child behind the uniform.',
      },
      { type: 'h2', text: 'When colleagues and learners began to seek her out' },
      {
        type: 'p',
        text: 'Over time, colleagues and pupils alike began bringing her concerns that had little to do with academic work, among them personal difficulties, relationships, family circumstances and emotional strain. Recognising that these needs called for more than goodwill, she pursued formal training, completing a Bachelor’s degree in Guidance and Counselling at Kyambogo University in 2007.',
      },
      {
        type: 'p',
        text: 'Her subsequent practice took her to Hope Clinic in Lukuli, and into roles as a tutorial assistant at Kyambogo University and Nsamizi Training Institute of Social Development. Across these settings she developed a particular interest in young adults, whose difficulties are frequently dismissed as indiscipline, irresponsibility or stubbornness when anxiety, family pressures, social expectations or an unmet need for belonging may in fact lie beneath them.',
      },
      { type: 'h2', text: 'Inclusion as a matter of dignity' },
      {
        type: 'p',
        text: 'The profile also highlights her long-standing commitment to disability inclusion. Her Master’s research at Uganda Christian University examined how people with visual and hearing impairments access HIV/AIDS information at Mildmay Centre, work that deepened her conviction that health information must be accessible to everyone it is meant to reach. She later took part in community-based participatory research with Sightsavers on economic empowerment for young people with disabilities in rural Uganda.',
      },
      {
        type: 'p',
        text: 'At Kyambogo, working with a student with a hearing impairment prompted her to think more deeply about communication, accessibility and the everyday experience of university life. Her conclusion is that genuine inclusion extends well beyond physical access, encompassing emotional wellbeing, relationships, communication barriers and a real sense of belonging and participation.',
      },
      { type: 'h2', text: 'Why knowing the risks is not enough' },
      {
        type: 'p',
        text: 'As a university counsellor, Dr Kyosaba regularly met students who understood the risks attached to sexual activity, including unplanned pregnancy and sexually transmitted infections such as HIV, yet still acted against that knowledge. The gap between knowing and doing became the subject of her doctoral research at Mbarara University of Science and Technology (MUST), titled “Locus of Control, Sex Motives and Risky Sexual Behaviours among Young Adults in Ugandan Universities”, from which she is now preparing to graduate.',
      },
      {
        type: 'p',
        text: 'The research has reinforced a principle she applies in everyday practice: information on its own seldom changes behaviour. Young people respond better when they are given room to understand why they make the choices they do, to reflect on the pressures around them, and to build the confidence to act on their own values. She also makes the case that universities should treat student wellbeing as an integral part of the educational experience, mindful of the social, economic, relational and institutional circumstances that can limit a young person’s choices.',
      },
      {
        type: 'highlight',
        text: 'Lasting change rarely comes from lecturing. It comes from helping people understand their own motives, recognise the pressures around them and choose in line with their values.',
      },
      { type: 'h2', text: 'Listening as a method' },
      {
        type: 'p',
        text: 'Her practice draws on Carl Rogers’ person-centred approach, which holds that every person has inherent worth and potential, including when their decisions have led to harm. In her account, this does not mean avoiding difficult conversations; it means conducting them with dignity, compassion and a clear focus on constructive change. Counselling, as she describes it, is less about supplying answers than about helping a person discover strengths and possibilities they had not previously recognised.',
      },
      { type: 'h2', text: 'What this means for WINRISE' },
      {
        type: 'p',
        text: 'These convictions run through the way WINRISE works. Whether we are supporting an individual, a family, a school or an employer, our starting point is the whole person: their circumstances, their relationships and the pressures that shape their decisions. It is why we place equal weight on attentive listening, on evidence-informed practice, and on making support accessible and culturally relevant across every region of Uganda.',
      },
      {
        type: 'p',
        text: 'Looking ahead, Dr Kyosaba hopes to keep encouraging educators to recognise the whole person behind every learner, counsellors to value evidence-informed practice, and young people to make choices that support their wellbeing and aspirations. It is an ambition the entire WINRISE team shares, and we are immensely proud to see her journey recognised in the national press.',
      },
      {
        type: 'p',
        text: 'We extend our sincere thanks to Joan Salmon and the Daily Monitor for telling this story with such care, and we warmly encourage readers to read the complete feature on the Daily Monitor website.',
      },
    ],
  },
];

/** Look an article up by slug. Returns undefined for an unknown slug. */
export function getArticle(slug) {
  return articles.find((article) => article.slug === slug);
}

/** The page path for an article. */
export const articlePath = (article) => `/resources/${article.slug}`;

/** Articles about a given team member, newest first. */
export function articlesAbout(personSlug) {
  return articles
    .filter((article) => article.personSlug === personSlug)
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

/** Rough reading time in minutes, from the body copy. */
export function readingMinutes(article) {
  const words = [article.standfirst, ...article.body.map((block) => block.text)]
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** '28 October 2026' — British order, Kampala calendar day. */
export function formatArticleDate(iso) {
  const [year, month, day] = iso.slice(0, 10).split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
