import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaUsers, FaLaptop, FaGraduationCap, FaHandsHelping, FaLeaf, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Services = () => {
  const [activeTab, setActiveTab] = useState('individuals');
  const [expandedService, setExpandedService] = useState(null);

  const tabs = [
    { id: 'individuals', label: 'Individuals & Families', icon: FaHeart },
    { id: 'corporate', label: 'Corporate & Workplace', icon: FaUsers },
    { id: 'educational', label: 'Educational Institutions', icon: FaGraduationCap },
    { id: 'community', label: 'Community & NGOs', icon: FaHandsHelping }
  ];

  const services = {
    individuals: [
      {
        title: 'Individual Counselling & Therapy',
        description: 'Professional one-on-one therapy sessions for anxiety, depression, trauma, and personal growth.',
        features: [
          'Cognitive Behavioral Therapy (CBT)',
          'Trauma-informed care',
          'Anxiety and depression management',
          'Stress management techniques',
          'Personal development coaching'
        ],
        duration: '50-60 minutes per session',
        price: 'From UGX 80,000 per session'
      },
      {
        title: 'Couples & Family Therapy',
        description: 'Strengthen relationships and improve family dynamics through guided therapy sessions.',
        features: [
          'Premarital counselling',
          'Marriage and relationship therapy',
          'Family conflict resolution',
          'Parenting support',
          'Communication skills training'
        ],
        duration: '60-90 minutes per session',
        price: 'From UGX 120,000 per session'
      },
      {
        title: 'Trauma & Recovery Support',
        description: 'Specialized care for survivors of trauma, abuse, and life-changing events.',
        features: [
          'PTSD treatment',
          'Grief and loss counselling',
          'Gender-based violence recovery',
          'Childhood trauma therapy',
          'Crisis intervention'
        ],
        duration: '60 minutes per session',
        price: 'From UGX 100,000 per session'
      },
      {
        title: 'Online Counselling',
        description: 'Convenient telehealth sessions accessible from anywhere with internet connection.',
        features: [
          'Video call sessions',
          'Secure messaging platform',
          'Flexible scheduling',
          'Digital wellness tools',
          'Mobile app access'
        ],
        duration: '50 minutes per session',
        price: 'From UGX 60,000 per session'
      }
    ],
    corporate: [
      {
        title: 'Employee Assistance Programs (EAPs)',
        description: 'Comprehensive mental health support for your workforce to improve productivity and well-being.',
        features: [
          '24/7 counselling hotline',
          'On-site therapy sessions',
          'Stress management workshops',
          'Mental health first aid training',
          'Crisis intervention services'
        ],
        duration: 'Customized packages',
        price: 'From UGX 50,000 per employee/year'
      },
      {
        title: 'Workplace Wellness Programs',
        description: 'Proactive mental health initiatives to create psychologically safe work environments.',
        features: [
          'Mental health awareness campaigns',
          'Burnout prevention programs',
          'Leadership mental health training',
          'Workplace stress audits',
          'Wellness policy development'
        ],
        duration: 'Ongoing programs',
        price: 'Custom pricing based on company size'
      },
      {
        title: 'Team Building & Conflict Resolution',
        description: 'Improve team dynamics and resolve workplace conflicts through professional mediation.',
        features: [
          'Team building workshops',
          'Conflict mediation services',
          'Communication skills training',
          'Leadership development',
          'Organizational psychology consulting'
        ],
        duration: 'Half-day to multi-day programs',
        price: 'From UGX 500,000 per workshop'
      }
    ],
    educational: [
      {
        title: 'Student Counselling Services',
        description: 'Mental health support tailored for students from primary school through university.',
        features: [
          'Individual student counselling',
          'Academic stress management',
          'Peer relationship support',
          'Career guidance counselling',
          'Mental health screening'
        ],
        duration: '30-45 minutes per session',
        price: 'From UGX 40,000 per session'
      },
      {
        title: 'Teacher & Staff Training',
        description: 'Equip educators with mental health awareness and intervention skills.',
        features: [
          'Mental health first aid certification',
          'Trauma-informed teaching practices',
          'Recognizing student distress signs',
          'Classroom management strategies',
          'Self-care for educators'
        ],
        duration: '1-3 day training programs',
        price: 'From UGX 300,000 per training'
      },
      {
        title: 'School-Wide Mental Health Programs',
        description: 'Comprehensive mental health initiatives for entire educational institutions.',
        features: [
          'Mental health policy development',
          'Peer support programs',
          'Parent education workshops',
          'Crisis response planning',
          'Mental health curriculum integration'
        ],
        duration: 'Semester or year-long programs',
        price: 'Custom pricing based on school size'
      }
    ],
    community: [
      {
        title: 'Community Mental Health Outreach',
        description: 'Bringing mental health services directly to underserved communities.',
        features: [
          'Mobile counselling units',
          'Community health worker training',
          'Local language therapy sessions',
          'Cultural adaptation of services',
          'Community mental health education'
        ],
        duration: 'Ongoing community programs',
        price: 'Funded programs - Free to participants'
      },
      {
        title: 'NGO Partnership Programs',
        description: 'Collaborative mental health integration with existing NGO services.',
        features: [
          'Staff mental health training',
          'Beneficiary psychosocial support',
          'Program impact assessment',
          'Capacity building workshops',
          'Mental health advocacy'
        ],
        duration: 'Project-based partnerships',
        price: 'Negotiated partnership rates'
      },
      {
        title: 'Faith-Based Counselling',
        description: 'Culturally sensitive mental health support integrated with spiritual care.',
        features: [
          'Pastoral care training',
          'Congregation mental health workshops',
          'Spiritual counselling integration',
          'Religious leader collaboration',
          'Faith-based healing approaches'
        ],
        duration: 'Flexible program duration',
        price: 'Community-based pricing'
      }
    ]
  };

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
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive mental health and wellness solutions designed to meet the unique needs of individuals, families, organizations, and communities across Uganda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Navigation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-12 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-open-sans font-medium transition-all duration-300 border-b-2 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-primary'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Services Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {services[activeTab].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-urbanist font-semibold text-2xl text-text mb-3">
                        {service.title}
                      </h3>
                      <p className="font-open-sans text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setExpandedService(expandedService === index ? null : index)}
                      className="ml-4 text-primary hover:text-primary-dark transition-colors duration-300"
                    >
                      {expandedService === index ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="font-open-sans font-medium text-gray-700">Duration:</span>
                      <span className="text-gray-600">{service.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-open-sans font-medium text-gray-700">Price:</span>
                      <span className="text-primary font-medium">{service.price}</span>
                    </div>
                  </div>

                  {expandedService === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200 pt-6"
                    >
                      <h4 className="font-urbanist font-semibold text-lg text-text mb-4">
                        What's Included:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                            <span className="font-open-sans text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-urbanist font-bold text-4xl text-text mb-6">
              Additional <span className="text-primary">Wellness Services</span>
            </h2>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto">
              Complementary services to support your complete mental health and wellness journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FaLeaf,
                title: 'Wellness Retreats',
                description: 'Immersive wellness experiences combining therapy, mindfulness, and nature.',
                features: ['Weekend retreats', 'Group therapy sessions', 'Mindfulness training', 'Nature therapy']
              },
              {
                icon: FaLaptop,
                title: 'Digital Wellness Tools',
                description: 'Mobile app and online resources for continuous mental health support.',
                features: ['Mood tracking', 'Meditation guides', 'Therapy exercises', 'Progress monitoring']
              },
              {
                icon: FaUsers,
                title: 'Support Groups',
                description: 'Peer-led support groups for various mental health conditions and life situations.',
                features: ['Depression support', 'Anxiety groups', 'Grief counseling', 'Addiction recovery']
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <service.icon className="text-primary" size={32} />
                </div>
                <h3 className="font-urbanist font-semibold text-xl text-text mb-4">
                  {service.title}
                </h3>
                <p className="font-open-sans text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="font-open-sans text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-urbanist font-bold text-4xl md:text-5xl text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="font-open-sans text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Contact us today to discuss your mental health and wellness needs. Our team is here to help you find the right services for your situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                className="bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-full font-open-sans font-semibold text-lg transition-colors duration-300"
              >
                Book a Consultation
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+256123456789"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-full font-open-sans font-semibold text-lg transition-colors duration-300 border border-white/30"
              >
                Call Us Now
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;