import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaEnvelope } from 'react-icons/fa';
import SEO from '../components/SEO';
import { CONTACT } from '../seo/siteConfig';

/**
 * Mark Semakula — independent consultant profile.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * This page is UNLINKED, not hidden. Nothing in the header, footer, /team hub
 * or any other page points at it, so a visitor browsing winrise.org will never
 * arrive here. But anyone who opens the URL sees the whole thing, exactly as a
 * crawler does.
 *
 * That distinction is the entire point. Serving content to Googlebot that a
 * visitor cannot see — text at opacity 0, positioned off-screen, behind
 * display:none, or a body that renders nothing while the head carries the
 * claims — is cloaking, and it is one of the few things Google penalises at the
 * SITE level rather than the page level. It would put every ranking the rest of
 * this site has been built for at risk, including the four director profiles.
 *
 * An unlinked page carries no such risk: it is discovered through the sitemap,
 * which is a legitimate discovery channel, and it is honest — what Google
 * indexes is what a person reads.
 *
 * The cost of being unlinked is real though: no internal links means no
 * internal PageRank, so this will rank less well than a page the site points
 * at. One contextual link would fix that whenever it is wanted.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const EXPERTISE = [
  'Digital Health Strategy & Transformation',
  'Health Informatics & ICT Policy',
  'Health Systems Strengthening',
  'Digital Health Maturity Assessment & Roadmap Development',
  'Data-Driven Decision Making in Public Health',
  'eHealth Implementation & Adoption',
  'Health Technology for Low-Resource Settings',
  'Strategic Advisory for Governments & Development Partners',
];

const AFFILIATIONS = [
  'Researcher, Makerere University',
  'Contributor, Ministry of Health, Uganda',
  'Published Author, PLOS Digital Health & other peer-reviewed journals',
  'Collaborator, Harvard Dataverse',
  'Member, Global Digital Health Research Networks',
];

const ABOUT = [
  'Mark Semakula is a Digital Health Strategy Consultant with deep expertise in health information systems, ICT policy development, and the application of digital technologies to improve health outcomes across Africa. With a background spanning health informatics research, policy formulation, and strategic advisory, he has worked with Uganda’s Ministry of Health, Makerere University, and international research collaborations to advance the digital health agenda.',
  'His work focuses on bridging the gap between technology and health systems — helping governments, development partners, and healthcare organisations design actionable roadmaps for digital health transformation. He has contributed to peer-reviewed research on digital health, including studies on natural language processing in healthcare communication and public health quantitative methods capacity-building in sub-Saharan Africa.',
  'Mark’s practice combines technical expertise in health informatics with a strategic, systems-level approach to digital health — ensuring that technology investments are aligned with clinical needs, equity goals, and sustainable health system strengthening. He is particularly passionate about making digital health solutions culturally relevant and accessible in underserved communities, drawing on his extensive experience working across Uganda and the East African region.',
];

const MarkSemakula = () => (
  <div className="min-h-screen bg-white">
    <SEO path="/mark-semakula" />

    {/* Hero — the name leads, because the name is the query this page answers */}
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
              src="/images/marc1705.png"
              alt="Mark Semakula, Digital Health Strategy Consultant based in Uganda"
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
              Mark Semakula
            </h1>
            <p className="font-urbanist font-medium text-primary text-lg md:text-xl mb-6">
              Digital Health Strategy Consultant
            </p>
            <p className="font-urbanist text-lg text-gray-700 leading-relaxed">
              Mark Semakula is a Digital Health Strategy Consultant with extensive experience at
              the intersection of health informatics, ICT policy, and digital transformation in
              low- and middle-income countries. Based in Uganda, he has worked with government
              institutions, research networks, and international partners to design and implement
              digital health strategies that strengthen health systems and expand access to
              quality care.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* About */}
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-rule font-urbanist font-bold text-3xl md:text-4xl text-text mb-8">
          About <span className="text-primary">Mark Semakula</span>
        </h2>
        {ABOUT.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className="font-urbanist text-lg text-gray-700 leading-relaxed mb-6 last:mb-0"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>

    {/* Expertise and affiliations */}
    <section className="py-16 md:py-20 bg-accent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="heading-rule font-urbanist font-bold text-2xl md:text-3xl text-text mb-8">
            Areas of <span className="text-primary">Expertise</span>
          </h2>
          <ul className="space-y-3 list-none m-0 p-0">
            {EXPERTISE.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <FaCheckCircle
                  className="mt-1.5 flex-none text-primary"
                  size={14}
                  aria-hidden="true"
                />
                <span className="font-urbanist text-gray-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="heading-rule font-urbanist font-bold text-2xl md:text-3xl text-text mb-8">
            Credentials &amp; <span className="text-primary">Affiliations</span>
          </h2>
          <ul className="space-y-3 list-none m-0 p-0">
            {AFFILIATIONS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <FaCheckCircle
                  className="mt-1.5 flex-none text-primary"
                  size={14}
                  aria-hidden="true"
                />
                <span className="font-urbanist text-gray-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    {/* Engagement */}
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-rule font-urbanist font-bold text-3xl md:text-4xl text-text mb-8">
          Work with <span className="text-primary">Mark Semakula</span>
        </h2>
        <p className="font-urbanist text-lg text-gray-700 leading-relaxed mb-8">
          Mark Semakula provides strategic advisory and consultancy services to governments,
          healthcare organisations, development partners, and technology firms seeking to design
          and implement impactful digital health strategies. His services include digital health
          maturity assessments, ICT policy development, strategic roadmap design, and technical
          advisory for health technology investments. He works with clients across Uganda, East
          Africa, and beyond to build sustainable digital health ecosystems that improve health
          outcomes and strengthen health systems.
        </p>
        <a
          href={`mailto:${CONTACT.email}`}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-7 py-3 rounded-full font-urbanist font-medium transition-colors duration-300"
        >
          <FaEnvelope size={15} aria-hidden="true" />
          Enquire about an engagement
        </a>
      </div>
    </section>
  </div>
);

export default MarkSemakula;
