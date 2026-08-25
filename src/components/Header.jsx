import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation items with descriptive titles and anchor text for better SEO
  const navItems = [
    { 
      path: '/', 
      label: 'Home',
      title: 'Winrise Counselling & Wellness Homepage',
      ariaLabel: 'Go to Home page'
    },
    { 
      path: '/services', 
      label: 'Services',
      title: 'Our Professional Counselling and Wellness Services',
      ariaLabel: 'View our counselling and wellness services'
    },
    { 
      path: '/about', 
      label: 'About Us',
      title: 'About Winrise Counselling & Wellness',
      ariaLabel: 'Learn about our mission and team'
    },
    {
      path: '/team',
      label: 'Our Team',
      title: 'Meet the Winrise Counselling & Wellness Team',
      ariaLabel: 'Go to Our Team page'
    },
    { 
      path: '/resources', 
      label: 'Resources',
      title: 'Mental Health Resources and Articles',
      ariaLabel: 'Browse mental health resources and articles'
    },
    { 
      path: '/contact', 
      label: 'Contact',
      title: 'Contact Us to Book a Session',
      ariaLabel: 'Contact us or book a consultation'
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-lg sticky top-0 z-50"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3"
            title="Winrise Counselling & Wellness - Home"
            aria-label="Winrise Counselling & Wellness - Return to homepage"
          >
            <img
              src="/images/winrise.png"
              alt="Winrise Counselling & Wellness Logo"
              width="256"
              height="173"
              className="h-12 w-auto"
            />
            <div className="flex flex-col">
              <span className="font-urbanist font-bold text-xl text-text">Winrise</span>
              <span className="font-urbanist text-xs text-gray-600">Counselling & Wellness</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav 
            className="hidden md:flex space-x-8" 
            aria-label="Main Navigation"
            role="navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                title={item.title}
                aria-label={item.ariaLabel}
                aria-current={isActive(item.path) ? 'page' : undefined}
                className={`font-urbanist font-medium transition-colors duration-300 hover:text-primary ${
                  isActive(item.path) ? 'text-primary border-b-2 border-primary' : 'text-text'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block"
          >
            <Link
              to="/contact"
              title="Book a Counselling Session with Winrise"
              aria-label="Book a counselling session - Schedule your appointment"
              className="bg-primary text-white px-6 py-2 rounded-full font-urbanist font-medium hover:bg-primary-dark transition-colors duration-300"
            >
              Book a Session
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-text hover:text-primary transition-colors duration-300"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMenuOpen ? <FaTimes size={24} aria-hidden="true" /> : <FaBars size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200 py-4"
            id="mobile-navigation"
          >
            <nav 
              className="flex flex-col space-y-4"
              aria-label="Mobile Navigation"
              role="navigation"
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  title={item.title}
                  aria-label={item.ariaLabel}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                  className={`font-urbanist font-medium transition-colors duration-300 hover:text-primary ${
                    isActive(item.path) ? 'text-primary' : 'text-text'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                title="Book a Counselling Session with Winrise"
                aria-label="Book a counselling session - Schedule your appointment"
                className="bg-primary text-white px-6 py-2 rounded-full font-urbanist font-medium hover:bg-primary-dark transition-colors duration-300 text-center"
              >
                Book a Session
              </Link>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;