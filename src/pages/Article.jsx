import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaArrowRight, FaExternalLinkAlt, FaRegCalendarAlt, FaRegClock, FaNewspaper } from 'react-icons/fa';
import SEO from '../components/SEO';
import ShareBar from '../components/ShareBar';
import NotFound from './NotFound';
import { getArticle, articlePath, readingMinutes, formatArticleDate } from '../data/articles';
import { getTeamMember } from '../data/team';
import { ORG_NAME, absoluteUrl } from '../seo/siteConfig';

/**
 * One article under Resources → Articles, at /resources/<slug>.
 *
 * Content comes from src/data/articles.js; the head tags (including the link
 * preview image) and the Article JSON-LD come from src/seo/pageMeta.js, so this
 * component only lays the page out.
 */

const Block = ({ block }) => {
  if (block.type === 'h2') {
    return (
      <h2 className="font-urbanist font-bold text-2xl md:text-[1.7rem] text-text pt-6 leading-snug">
        {block.text}
      </h2>
    );
  }

  if (block.type === 'highlight') {
    return (
      <aside className="my-4 border-l-4 border-primary bg-primary/5 rounded-r-2xl px-6 py-6 md:px-8">
        <p className="font-urbanist text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">
          Key insight
        </p>
        <p className="times-italic text-[1.35rem] md:text-2xl leading-snug text-text">
          {block.text}
        </p>
      </aside>
    );
  }

  return <p className="font-open-sans text-[1.075rem] leading-[1.8] text-gray-700">{block.text}</p>;
};

const Article = ({ slug }) => {
  const article = getArticle(slug);
  if (!article) return <NotFound />;

  const path = articlePath(article);
  const url = absoluteUrl(path);
  const person = article.personSlug ? getTeamMember(article.personSlug) : null;
  const minutes = readingMinutes(article);
  const published = formatArticleDate(article.datePublished);
  const { source } = article;

  const shareText = `${article.title}: ${article.standfirst.split('. ')[0]}.`;

  return (
    <div className="min-h-screen bg-white">
      <SEO path={path} />

      <article>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <header className="bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7"
              >
                <p className="inline-flex items-center gap-2 bg-white/80 border border-primary/20 text-primary rounded-full px-4 py-1.5 mb-6 font-urbanist font-bold text-xs uppercase tracking-[0.16em]">
                  <FaNewspaper size={12} aria-hidden="true" />
                  {article.kicker}
                </p>

                <h1 className="font-urbanist font-bold text-4xl md:text-5xl lg:text-[3.4rem] text-text leading-[1.08] mb-6">
                  {article.title}
                </h1>

                <p className="font-urbanist text-lg md:text-xl text-gray-700 leading-relaxed mb-7">
                  {article.standfirst}
                </p>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-urbanist text-sm text-gray-600 mb-7">
                  <span className="font-semibold text-text">{article.author}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <FaRegCalendarAlt size={13} aria-hidden="true" />
                    <time dateTime={article.datePublished}>{published}</time>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FaRegClock size={13} aria-hidden="true" />
                    {minutes} min read
                  </span>
                </div>

                <ShareBar url={url} title={article.title} text={shareText} label="Share" />
              </motion.div>

              <motion.figure
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-5"
              >
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  width="1200"
                  height="750"
                  loading="eager"
                  className="w-full rounded-3xl shadow-xl object-cover aspect-[4/3] object-top"
                />
                {article.imageCredit && (
                  <figcaption className="mt-3 font-urbanist text-xs text-gray-500 text-right">
                    {article.imageCredit}
                  </figcaption>
                )}
              </motion.figure>
            </div>
          </div>
        </header>

        {/* ── Body ─────────────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Where the story first appeared — up front, so the original is
              credited and one click away before anyone reads our summary. */}
          {source && (
            <section
              aria-labelledby="coverage-heading"
              className="rounded-2xl border border-gray-200 bg-accent p-6 md:p-7 mb-12"
            >
              <h2
                id="coverage-heading"
                className="font-urbanist font-bold text-xs uppercase tracking-[0.18em] text-primary mb-4"
              >
                Coverage at a glance
              </h2>
              <p className="times-italic text-xl md:text-2xl text-text leading-snug mb-5">
                “{source.headline}”
              </p>
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-urbanist text-sm mb-6">
                <div>
                  <dt className="text-gray-500">Publication</dt>
                  <dd className="font-semibold text-text">
                    {source.publication}
                    {source.section ? `, ${source.section}` : ''}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Published</dt>
                  <dd className="font-semibold text-text">{source.dateLabel}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Writer</dt>
                  <dd className="font-semibold text-text">{source.author}</dd>
                </div>
              </dl>
              <a
                href={source.url}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-urbanist font-semibold rounded-lg px-5 py-3 transition-colors"
              >
                Read the full story on the Daily Monitor
                <FaExternalLinkAlt size={12} aria-hidden="true" />
              </a>
            </section>
          )}

          <div className="space-y-6">
            {article.body.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </div>

          {source && (
            <p className="mt-10">
              <a
                href={source.url}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 font-urbanist font-semibold text-primary hover:text-primary-dark underline underline-offset-4"
              >
                Read “{source.headline}” on monitor.co.ug
                <FaExternalLinkAlt size={11} aria-hidden="true" />
              </a>
            </p>
          )}

          {/* Share, again, at the point a reader has finished. */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <ShareBar url={url} title={article.title} text={shareText} />
          </div>

          {/* The person the article is about → their profile page. */}
          {person && (
            <Link
              to={`/team/${person.slug}`}
              className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-2xl border border-gray-200 p-5 md:p-6 hover:border-primary transition-colors group"
            >
              <img
                src={person.image}
                alt={`${person.displayName}, ${person.jobTitle} at ${ORG_NAME}`}
                width="96"
                height="96"
                loading="lazy"
                className="w-20 h-20 rounded-full object-cover object-top flex-shrink-0"
              />
              <div className="flex-1">
                <p className="font-urbanist text-xs font-bold uppercase tracking-[0.16em] text-gray-500 mb-1">
                  Featured in this article
                </p>
                <p className="font-urbanist font-bold text-lg text-text group-hover:text-primary transition-colors">
                  {person.displayName}
                </p>
                <p className="font-open-sans text-sm text-gray-600 mt-1">
                  {person.jobTitle}, {ORG_NAME}. {person.bio}
                </p>
              </div>
              <span className="font-urbanist font-semibold text-sm text-primary inline-flex items-center gap-2 flex-shrink-0">
                View profile <FaArrowRight size={12} aria-hidden="true" />
              </span>
            </Link>
          )}

          {source && (
            <p className="mt-10 font-open-sans text-xs text-gray-500 leading-relaxed">
              This article is WINRISE’s own summary of, and reflection on, coverage first published
              by the {source.publication} on {source.dateLabel}. The original article and its
              photography remain the property of the {source.publication}. Please refer to the{' '}
              <a
                href={source.url}
                target="_blank"
                rel="noopener"
                className="underline hover:text-primary"
              >
                original feature
              </a>{' '}
              for the full text.
            </p>
          )}

          <p className="mt-6">
            <Link
              to="/resources?category=articles"
              className="font-urbanist font-semibold text-sm text-primary hover:text-primary-dark"
            >
              ← More articles in Resources
            </Link>
          </p>
        </div>
      </article>

      {/* ── Call to action ─────────────────────────────────────────────── */}
      <section className="py-14 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-urbanist font-bold text-2xl md:text-3xl text-white mb-4">
            Support that starts with the whole person
          </h2>
          <p className="font-open-sans text-white/90 mb-8 max-w-2xl mx-auto">
            WINRISE offers individual therapy, family and couples counselling, and wellness
            programmes for schools and employers, from Kampala to every region of Uganda.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary font-open-sans font-semibold rounded-lg px-6 py-3 hover:bg-gray-100 transition-colors"
            >
              Book a session <FaArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border border-white text-white font-open-sans font-semibold rounded-lg px-6 py-3 hover:bg-white/10 transition-colors"
            >
              Our services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Article;
