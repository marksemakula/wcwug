import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { team } from '../data/team';
import { ORG_NAME } from '../seo/siteConfig';

/**
 * The /team hub. It gives every profile page an internal link from a single
 * indexable page, which is how crawlers discover all four in one hop, and it
 * gives the four Person entities one page where they are declared together.
 */
const Team = () => (
  <div className="min-h-screen bg-white">
    <SEO path="/team" />

    <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="font-urbanist font-bold text-5xl md:text-6xl text-text mb-6">
            Our <span className="text-primary">Team</span>
          </h1>
          <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The directors and specialists behind {ORG_NAME} — experienced professionals
            delivering mental health and wellness services across Uganda.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.article
              key={member.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <Link to={`/team/${member.slug}`} className="flex flex-col flex-1">
                <div className="relative w-full" style={{ paddingTop: '70%' }}>
                  <img
                    src={member.image}
                    alt={`${member.displayName}, ${member.jobTitle} at ${ORG_NAME} in Kampala, Uganda`}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="font-urbanist font-semibold text-base text-text mb-1 leading-snug">
                    {member.displayName}
                  </h2>
                  <p className="font-open-sans font-medium text-primary text-sm mb-3">
                    {member.jobTitle}
                  </p>
                  <p className="font-open-sans text-gray-600 text-sm leading-relaxed flex-1">
                    {member.bio}
                  </p>
                  <span className="font-open-sans text-primary text-sm mt-4 underline">
                    Read full profile
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 bg-accent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-urbanist font-bold text-3xl text-text mb-4">
          Ready to talk to someone?
        </h2>
        <p className="font-open-sans text-gray-600 mb-8">
          Book a counselling session or ask us about corporate wellness programmes.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-primary text-white font-open-sans font-medium rounded-lg px-8 py-3 hover:bg-primary-dark transition-colors"
        >
          Contact WINRISE
        </Link>
      </div>
    </section>
  </div>
);

export default Team;
