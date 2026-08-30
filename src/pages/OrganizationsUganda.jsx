import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaExternalLinkAlt, FaClock, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import SEO from '../components/SEO';
import { organizations, furtherDirectories, crisisOrganizations } from '../data/organizations';

/**
 * A directory of mental health organizations in Uganda.
 *
 * Why this page exists, so nobody "optimises" it in the wrong direction later:
 * the query "Uganda mental health organizations" is plural and list-shaped.
 * Google answers it with directories and listicles, not with any single
 * provider's homepage. The only page that can compete is a genuinely useful
 * list — which means it has to include other organisations, name them fairly,
 * and put the people who need help first. Winrise appears in alphabetical
 * order with the same fields as everyone else. Promoting ourselves up this
 * list would make it thin content and cost the ranking it exists to win.
 */

const telHref = (number) => `tel:${number.replace(/[^0-9+]/g, '')}`;

const OrganizationsUganda = () => (
  <div className="min-h-screen bg-white">
    <SEO path="/resources/mental-health-organizations-uganda" />

    {/* Hero */}
    <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-14 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-urbanist font-bold text-4xl md:text-5xl text-text mb-5">
            Mental Health Organizations in Uganda
          </h1>
          <p className="font-open-sans text-lg text-gray-700 leading-relaxed">
            Hospitals, NGOs, helplines and private practices offering mental health support in
            Uganda — what each one does, where they work, and how to reach them.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Crisis block, deliberately first. Someone arriving here in distress
        should not have to scroll past a directory to find a phone number. */}
    <section className="py-10 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 md:p-8">
          <h2 className="font-urbanist font-bold text-xl text-text mb-2">
            If you need help now
          </h2>
          <p className="font-open-sans text-sm text-gray-700 mb-6">
            These lines are answered by trained staff. If someone is in immediate physical
            danger, go to the nearest hospital emergency department.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {crisisOrganizations.map((org) => (
              <div key={org.slug} className="bg-white rounded-xl p-5 border border-gray-200">
                <p className="font-urbanist font-semibold text-text mb-1">{org.name}</p>
                <a
                  href={telHref(org.tollFree || org.phone)}
                  className="font-open-sans font-bold text-2xl text-primary hover:text-primary-dark inline-flex items-center gap-2 transition-colors"
                >
                  <FaPhoneAlt size={16} aria-hidden="true" />
                  {org.tollFree || org.phone}
                </a>
                {org.tollFree && (
                  <p className="font-open-sans text-xs text-gray-500 mt-1">Toll free</p>
                )}
                {org.hours && (
                  <p className="font-open-sans text-sm text-gray-600 mt-2">{org.hours}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* The directory */}
    <section className="py-10 pb-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-urbanist font-bold text-2xl md:text-3xl text-text mb-3">
          The organizations
        </h2>
        <p className="font-open-sans text-gray-600 mb-10">
          Listed alphabetically. Winrise Counselling &amp; Wellness publishes this page and is
          listed here on the same terms as everyone else.
        </p>

        <div className="divide-y divide-gray-200 border-t border-gray-200">
          {organizations.map((org, index) => (
            <motion.article
              key={org.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: Math.min(index, 4) * 0.05 }}
              viewport={{ once: true }}
              className="py-7"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                <h3 className="font-urbanist font-semibold text-xl text-text">{org.name}</h3>
                <span className="font-open-sans text-xs uppercase tracking-wider text-gray-500">
                  {org.type}
                </span>
                {org.isPublisher && (
                  <span className="font-open-sans text-xs uppercase tracking-wider text-primary border border-primary/40 rounded px-2 py-0.5">
                    Publisher of this page
                  </span>
                )}
              </div>

              <p className="font-open-sans text-gray-700 leading-relaxed mb-4">{org.summary}</p>

              <dl className="flex flex-wrap gap-x-8 gap-y-2 font-open-sans text-sm text-gray-600 mb-4">
                {org.location && (
                  <div className="flex items-start gap-2">
                    <dt className="sr-only">Location</dt>
                    <FaMapMarkerAlt
                      className="text-primary flex-shrink-0 mt-1"
                      size={13}
                      aria-hidden="true"
                    />
                    <dd>{org.location}</dd>
                  </div>
                )}
                {org.hours && (
                  <div className="flex items-start gap-2">
                    <dt className="sr-only">Hours</dt>
                    <FaClock
                      className="text-primary flex-shrink-0 mt-1"
                      size={13}
                      aria-hidden="true"
                    />
                    <dd>{org.hours}</dd>
                  </div>
                )}
              </dl>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {(org.tollFree || org.phone) && (
                  <a
                    href={telHref(org.tollFree || org.phone)}
                    className="font-open-sans font-medium text-sm text-primary hover:text-primary-dark inline-flex items-center gap-2 transition-colors"
                  >
                    <FaPhoneAlt size={12} aria-hidden="true" />
                    {org.tollFree || org.phone}
                    {org.tollFree && <span className="text-gray-500 font-normal">(toll free)</span>}
                  </a>
                )}

                <a
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-open-sans font-medium text-sm text-primary hover:text-primary-dark inline-flex items-center gap-2 transition-colors"
                >
                  Official website
                  <FaExternalLinkAlt size={10} aria-hidden="true" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Further directories */}
        <div className="mt-14 rounded-2xl bg-accent p-6 md:p-8">
          <h2 className="font-urbanist font-bold text-xl text-text mb-4">
            Looking for something not listed here?
          </h2>
          <ul className="space-y-4">
            {furtherDirectories.map((directory) => (
              <li key={directory.url}>
                <a
                  href={directory.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-urbanist font-semibold text-primary hover:text-primary-dark inline-flex items-center gap-2 transition-colors"
                >
                  {directory.name}
                  <FaExternalLinkAlt size={10} aria-hidden="true" />
                </a>
                <p className="font-open-sans text-sm text-gray-600 mt-1">{directory.summary}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Provenance. Says plainly where the details came from and when — which
            is what makes a directory trustworthy, and is exactly the kind of
            signal Google's quality raters look for on health pages. */}
        <div className="mt-10 border-t border-gray-200 pt-6">
          <h2 className="font-urbanist font-semibold text-base text-text mb-2">
            About this list
          </h2>
          <p className="font-open-sans text-sm text-gray-600 leading-relaxed mb-3">
            Details were taken from each organisation&apos;s own website or a recognised helpline
            registry and last checked in August 2026. Phone numbers are only shown where we could
            verify them at source; where we could not, the entry links to the organisation&apos;s
            official site instead, which will always be more current than this page.
          </p>
          <p className="font-open-sans text-sm text-gray-600 leading-relaxed">
            Know an organisation that should be here, or spotted something out of date?{' '}
            <Link to="/contact" className="text-primary hover:text-primary-dark underline">
              Tell us
            </Link>{' '}
            and we will check it.
          </p>
        </div>
      </div>
    </section>

    {/* Winrise CTA, at the end rather than the top, for the same reason the
        crisis block is first: the page has to serve the search before it
        serves the publisher. */}
    <section className="py-14 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-urbanist font-bold text-2xl md:text-3xl text-white mb-4">
          Looking for private counselling in Uganda?
        </h2>
        <p className="font-open-sans text-white/90 mb-8 max-w-2xl mx-auto">
          Winrise offers individual therapy, family and couples counselling, online sessions and
          corporate wellness programmes from Kampala, serving all regions of Uganda.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-white text-primary font-open-sans font-semibold rounded-lg px-6 py-3 hover:bg-gray-100 transition-colors"
          >
            Our services <FaArrowRight size={14} aria-hidden="true" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-white text-white font-open-sans font-semibold rounded-lg px-6 py-3 hover:bg-white/10 transition-colors"
          >
            Book a session
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default OrganizationsUganda;
