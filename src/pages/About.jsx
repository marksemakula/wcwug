import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaHandsHelping, FaShieldAlt, FaUserCheck, FaBullseye, FaUsers } from 'react-icons/fa';

const About = () => {
  const values = [
    {
      icon: FaHeart,
      title: 'Compassion',
      description: 'We approach every client with empathy, understanding, and genuine care for their well-being.'
    },
    {
      icon: FaUserCheck,
      title: 'Professionalism',
      description: 'We maintain the highest standards of professional practice and continuous learning.'
    },
    {
      icon: FaHandsHelping,
      title: 'Respect',
      description: 'We honor the dignity, diversity, and unique experiences of every individual we serve.'
    },
    {
      icon: FaShieldAlt,
      title: 'Confidentiality',
      description: 'We protect client privacy and maintain strict confidentiality in all our services.'
    },
    {
      icon: FaBullseye,
      title: 'Empowerment',
      description: 'We help clients develop the skills and confidence to manage their mental health independently.'
    },
    {
      icon: FaUsers,
      title: 'Accessibility',
      description: 'We strive to make mental health services available and affordable to all Ugandans.'
    }
  ];

  const objectives = [
    'Expand to all regions of Uganda within five years',
    'Launch a mobile mental health app and helpline',
    'Train 100+ wellness professionals and community facilitators by 2027',
    'Partner with at least 20 schools, 15 NGOs, and 30 companies by December 2026',
    'Launch a wellness centre with integrated mental, nutritional, and physical therapy services'
  ];

  const team = [
  {
    name: 'Kyosaba Winfred Biribonwa',
    role: 'Founding Partner & Director',
    image: './images/kyosaba.jpg', // or .png, .webp, etc.
    bio: 'Licensed psychologist with 15+ years of experience in trauma therapy and community mental health.'
  },
  {
    name: 'Richard Asiimwe Kacururu',
    role: 'Partner & Director',
    image: './images/richard.jpg',
    bio: 'Passionate advocate for mental health awareness with extensive experience in community engagement, travel and support program development.'
  },
  {
    name: 'Emily Atujuna',
    role: 'Corporate Wellness Director',
    image: './images/emily.jpg',
    bio: 'Banker & career coach, supporting & ardent advocate of safeguarding in the workplace, including mental health and employee assistance programs.'
  }
];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-urbanist font-bold text-5xl md:text-6xl text-text mb-6">
              About <span className="text-primary">Win & Rise</span>
            </h1>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dedicated to empowering minds and transforming lives through professional mental health and wellness services across Uganda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-urbanist font-bold text-4xl text-text mb-6">
                Our <span className="text-primary">Story</span>
              </h2>
              <p className="font-open-sans text-gray-600 leading-relaxed mb-6">
                Rise and Win Counselling and Wellness Solutions Ltd is a Uganda-based mental health and wellness company that provides holistic services aimed at helping individuals, families, and organisations achieve emotional, psychological, and social well-being.
              </p>
              <p className="font-open-sans text-gray-600 leading-relaxed mb-6">
                With a strong foundation in professional counselling and a passion for community transformation, we are positioned to bridge the gap in mental health access across Uganda through innovative, affordable, and culturally relevant solutions.
              </p>
              <p className="font-open-sans text-gray-600 leading-relaxed">
                We are duly registered with the Uganda Registration Services Bureau (URSB) and operate in compliance with national health and professional standards.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop"
                alt="Mental health counseling session"
                className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FaBullseye className="text-primary" size={32} />
              </div>
              <h3 className="font-urbanist font-bold text-2xl text-text mb-4">Our Vision</h3>
              <p className="font-open-sans text-gray-600 leading-relaxed">
                To be Uganda's leading provider of holistic counselling and wellness services that inspire healing, resilience, and personal transformation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FaHeart className="text-primary" size={32} />
              </div>
              <h3 className="font-urbanist font-bold text-2xl text-text mb-4">Our Mission</h3>
              <p className="font-open-sans text-gray-600 leading-relaxed">
                To deliver accessible, high-quality counselling and wellness solutions that empower individuals, families, and communities across Uganda to achieve mental, emotional, and social well-being.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-urbanist font-bold text-4xl md:text-5xl text-text mb-6">
              Our Core <span className="text-primary">Values</span>
            </h2>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto">
              These values guide everything we do and shape how we serve our clients and communities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <value.icon className="text-primary" size={32} />
                </div>
                <h3 className="font-urbanist font-semibold text-xl text-text mb-4">
                  {value.title}
                </h3>
                <p className="font-open-sans text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Objectives */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-urbanist font-bold text-4xl md:text-5xl text-text mb-6">
              Strategic <span className="text-primary">Objectives</span>
            </h2>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto">
              Our roadmap for expanding mental health access and impact across Uganda.
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="space-y-6">
              {objectives.map((objective, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="font-open-sans text-gray-700 leading-relaxed text-lg">
                    {objective}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-urbanist font-bold text-4xl md:text-5xl text-text mb-6">
              Meet Our <span className="text-primary">Team</span>
            </h2>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to your mental health and well-being.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-6"
                />
                <h3 className="font-urbanist font-semibold text-xl text-text mb-2">
                  {member.name}
                </h3>
                <p className="font-open-sans font-medium text-primary mb-4">
                  {member.role}
                </p>
                <p className="font-open-sans text-gray-600 leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Compliance */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-urbanist font-bold text-4xl text-white mb-6">
              Legal Structure & Compliance
            </h2>
            <p className="font-open-sans text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              We operate with full legal compliance and professional standards.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'Uganda Registration Services Bureau (URSB)',
                'Uganda Revenue Authority (URA)',
                'Ministry of Health (Mental Health Division)',
                'Uganda Counselling Association (UCA)'
              ].map((compliance, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
                >
                  <p className="font-open-sans text-white text-sm">
                    {compliance}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;