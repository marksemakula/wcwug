import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaUsers, FaLaptop, FaGraduationCap, FaArrowRight, FaCalendarAlt, FaMapMarkerAlt, FaQuoteLeft } from 'react-icons/fa';
import EventModal from '../components/EventModal';
import SEO from '../components/SEO';
import bg1 from '@/images/hero-community.webp';
import bg2 from '@/images/hero-landscape.webp';
import bg3 from '@/images/hero-calm.webp';
import bg4 from '@/images/hero-support.webp';

const Home = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const backgroundImages = [bg1, bg2, bg3, bg4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const services = [
    {
      icon: FaHeart,
      title: 'Individual Counselling',
      description: 'Professional therapy for anxiety, depression, trauma, and personal growth.',
      link: '/services'
    },
    {
      icon: FaUsers,
      title: 'Corporate Wellness',
      description: 'Employee assistance programs and workplace mental health solutions.',
      link: '/services'
    },
    {
      icon: FaLaptop,
      title: 'Online Therapy',
      description: 'Convenient telehealth sessions accessible from anywhere.',
      link: '/services'
    },
    {
      icon: FaGraduationCap,
      title: 'Educational Programs',
      description: 'Mental health training and workshops for schools and organizations.',
      link: '/services'
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Concious Parenting Pathway',
      date: '2025-12-10',
      time: '10:00 AM',
      location: 'Kampala Community Center',
      description: 'Join us for interactive sessions on understanding / harmonizing and managing parenting approaches.',
      audience: 'General Public',
      price: 'Free'
    },
    {
      id: 2,
      title: 'The Cultural Whisperer Program',
      date: '2026-04-22',
      time: '2:00 PM',
      location: 'Serena Hotel, Kampala',
      description: 'Cultivating Harmonious Productive and Culturally Intelligent Workspaces.',
      audience: 'Corporate',
      price: 'UGX 100,000'
    },
    {
      id: 3,
      title: 'The Authentic Living Journey',
      date: '2025-10-11',
      time: '9:00 AM',
      location: 'Makerere University',
      description: 'Recovering your original self to live a life of Peace, Purpose, reliability and Consistency.',
      audience: 'Youth',
      price: 'UGX 50,000'
    }
  ];

  // Each quote is attributed to a director; `slug` links the card to that
  // person's profile page so the homepage passes crawl equity to all four.
  const testimonials = [
    {
      slug: 'dr-kyosaba-winfred-biribonwa',
      name: 'Dr. Kyosaba Winfred Biribonwa - PhD',
      role: 'Founding Partner & Executive Director',
      content: 'Winrise aims to transform your institutional culture; Handle change, live happier, focused and be more productive.',
      image: '/images/dr-kyosaba-winfred-biribonwa.webp'
    },
    {
      slug: 'joan-claire-kabikuru',
      name: 'Joan Claire Kabikuru',
      role: 'Head of Finance & Administration, Director',
      content: 'Ensuring operational excellence and financial sustainability to support our mission of transforming mental health services.',
      image: '/images/joan-claire-kabikuru.webp'
    },
    {
      slug: 'richard-asiimwe-kacururu',
      name: 'Richard Asiimwe Kacururu',
      role: 'Travel Specialist, Partner & Director',
      content: 'Wholesome Travel, Retreat & Mentorship programs are tailored to deliver healing, more confident and at peace steady minds.',
      image: '/images/richard-asiimwe-kacururu.webp'
    },
    {
      slug: 'emilly-karine-ajuna',
      name: 'Emilly Karine Ajuna',
      role: 'Corporate Wellness Lead & Director',
      content: 'Our workplace physical & mental health balanced programs significantly improve employee\' emotional well-being.',
      image: '/images/emilly-karine-ajuna.webp'
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO path="/" />

      {/* Hero Section with Image Carousel */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-primary/20 to-primary/10 overflow-hidden">
        {/* Background Images */}
        {backgroundImages.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${index === currentBgIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `url(${bg})`,
              backgroundBlendMode: 'overlay'
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBgIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentBgIndex ? 'bg-primary w-6' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
        >
          <h1 className="font-urbanist font-bold text-5xl md:text-7xl mb-6 leading-tight">
            Empowering Minds.<br />
            <span className="text-primary">Transforming Lives.</span>
          </h1>
          <p className="font-urbanist text-xl md:text-2xl mb-8 opacity-90">
            Professional mental health and wellness services that inspire healing, resilience, and personal transformation across Uganda.
          </p>
          <div className="flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-urbanist font-semibold text-lg transition-colors duration-300 inline-flex items-center space-x-2"
              >
                <span>Book a Session</span>
                <FaArrowRight />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services Preview */}
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
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="font-urbanist text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive mental health and wellness solutions tailored to individuals, families, and organizations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <service.icon className="text-primary" size={32} />
                </div>
                <h3 className="font-urbanist font-semibold text-xl text-text mb-4">
                  {service.title}
                </h3>
                <p className="font-urbanist text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <Link
                  to={service.link}
                  className="text-primary hover:text-primary-dark font-urbanist font-medium inline-flex items-center space-x-2 transition-colors duration-300"
                >
                  <span>Learn More</span>
                  <FaArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Listing Section */}
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
              Our <span className="text-primary">Product Listing</span>
            </h2>
            <p className="font-urbanist text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our range of products designed to promote mental health awareness and well-being.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-2 text-primary mb-4">
                  <FaCalendarAlt size={16} />
                  <span className="font-urbanist font-medium text-sm">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <h3 className="font-urbanist font-semibold text-xl text-text mb-3">
                  {event.title}
                </h3>
                <p className="font-urbanist text-gray-600 mb-4 leading-relaxed">
                  {event.description}
                </p>
                <div className="flex items-center space-x-2 text-gray-500 mb-2">
                  <FaMapMarkerAlt size={14} />
                  <span className="font-urbanist text-sm">{event.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-urbanist font-medium text-primary">
                    {event.price}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedEvent(event)}
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full font-urbanist font-medium text-sm transition-colors duration-300"
                  >
                    Register
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Commitment Section */}
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
              Our <span className="text-primary">Team Commitment</span>
            </h2>
            <p className="font-ubuntu text-xl text-gray-600 max-w-3xl mx-auto">
              Meet our dedicated team and their commitment to transforming lives through mental health and wellness.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex"
                style={{ minHeight: '220px' }}
              >
                {/* Image slice — left side */}
                <div className="w-2/5 flex-shrink-0 relative">
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.name}, ${testimonial.role} at WINRISE Counselling & Wellness`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>

                {/* Text — right side */}
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <FaQuoteLeft className="text-primary mb-3" size={20} />
                  <p className="italic text-gray-600 mb-5 leading-relaxed text-sm" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                    "{testimonial.content}"
                  </p>
                  <div>
                    <h4 className="font-ubuntu font-semibold text-text text-sm">
                      <Link
                        to={`/team/${testimonial.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {testimonial.name}
                      </Link>
                    </h4>
                    <p className="font-ubuntu text-xs text-primary mt-1">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
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
              Ready to Start Your Journey?
            </h2>
            <p className="font-urbanist text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Take the first step towards better mental health and well-being. Our professional team is here to support you every step of the way.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-full font-urbanist font-semibold text-lg transition-colors duration-300 inline-flex items-center space-x-2"
              >
                <span>Get Started Today</span>
                <FaArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default Home;