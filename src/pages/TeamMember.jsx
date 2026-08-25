import React from 'react';
import { Link, useParams } from 'react-router';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaArrowRight, FaLinkedin, FaGlobe } from 'react-icons/fa';
import SEO from '../components/SEO';
import NotFound from './NotFound';
import { team, getTeamMember } from '../data/team';
import { ORG_NAME } from '../seo/siteConfig';

/**
 * A person's profile page.
 *
 * This page exists so that a search for the person's name has something on
 * winrise.org to return: a URL that is about exactly one person, carries their
 * name in the <title>, H1 and first sentence, and is marked up as a ProfilePage
 * wrapping a Person entity tied to the Winrise Organization. The head tags and
 * JSON-LD are supplied by <SEO> from src/seo/pageMeta.js.
 */
const TeamMember = () => {
  const { slug } = useParams();
  const member = getTeamMember(slug);

  if (!member) return <NotFound />;

  const others = team.filter((person) => person.slug !== member.slug);

  return (
    <div className="min-h-screen bg-white">
      <SEO path={`/team/${member.slug}`} />

      {/* Hero — name first, because that is the query this page answers */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <img
                src={member.image}
                alt={`${member.displayName}, ${member.jobTitle} at ${ORG_NAME} in Kampala, Uganda`}
                width="480"
                height="600"
                loading="eager"
                className="rounded-2xl shadow-lg w-full max-w-sm mx-auto object-cover object-top aspect-[4/5]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <h1 className="font-urbanist font-bold text-4xl md:text-5xl text-text mb-3">
                {member.displayName}
              </h1>
              <p className="font-open-sans font-medium text-primary text-lg md:text-xl mb-6">
                {member.jobTitle},{' '}
                <Link to="/" className="underline hover:text-primary-dark">
                  {ORG_NAME}
                </Link>
              </p>
              <p className="font-open-sans text-lg text-gray-700 leading-relaxed">{member.bio}</p>

              {member.sameAs.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {member.sameAs.map((url) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-open-sans text-gray-700 hover:border-primary hover:text-primary transition-colors"
                    >
                      {url.includes('linkedin.com') ? <FaLinkedin /> : <FaGlobe />}
                      {url.includes('linkedin.com') ? 'LinkedIn' : 'Profile'}
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-urbanist font-bold text-3xl text-text mb-8">
            About {member.name}
          </h2>
          <div className="space-y-6">
            {member.longBio.map((paragraph, index) => (
              <p
                key={index}
                className="font-open-sans text-gray-600 leading-relaxed text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise + credentials */}
      <section className="py-16 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-urbanist font-bold text-2xl text-text mb-6">
                Areas of Expertise
              </h2>
              <ul className="space-y-3">
                {member.knowsAbout.map((topic) => (
                  <li key={topic} className="flex items-start gap-3">
                    <FaCheckCircle
                      className="text-primary flex-shrink-0 mt-1"
                      size={18}
                      aria-hidden="true"
                    />
                    <span className="font-open-sans text-gray-700">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-urbanist font-bold text-2xl text-text mb-6">
                Credentials & Affiliations
              </h2>
              <ul className="space-y-3">
                {member.credentials.map((credential) => (
                  <li key={credential} className="flex items-start gap-3">
                    <FaCheckCircle
                      className="text-primary flex-shrink-0 mt-1"
                      size={18}
                      aria-hidden="true"
                    />
                    <span className="font-open-sans text-gray-700">{credential}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Internal links — these are how crawl equity reaches the service pages */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-urbanist font-bold text-3xl text-text mb-4">
            Work with {member.name.split(' ').slice(-1)[0]} and the WINRISE team
          </h2>
          <p className="font-open-sans text-gray-600 mb-8 max-w-2xl mx-auto">
            {ORG_NAME} provides counselling, therapy and corporate wellness services across
            Uganda.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-primary text-white font-open-sans font-medium rounded-lg px-6 py-3 hover:bg-primary-dark transition-colors"
            >
              View our services <FaArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-primary text-primary font-open-sans font-medium rounded-lg px-6 py-3 hover:bg-primary/5 transition-colors"
            >
              Book a session
            </Link>
          </div>
        </div>
      </section>

      {/* Sibling profiles — internal linking between the four Person entities */}
      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-urbanist font-bold text-2xl text-text mb-8 text-center">
            More of the WINRISE team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {others.map((person) => (
              <Link
                key={person.slug}
                to={`/team/${person.slug}`}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative w-full" style={{ paddingTop: '70%' }}>
                  <img
                    src={person.image}
                    alt={`${person.displayName}, ${person.jobTitle} at ${ORG_NAME}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-urbanist font-semibold text-base text-text mb-1 leading-snug">
                    {person.displayName}
                  </h3>
                  <p className="font-open-sans text-primary text-sm">{person.jobTitle}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/team"
              className="font-open-sans text-primary hover:text-primary-dark underline"
            >
              See the full WINRISE leadership team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamMember;
