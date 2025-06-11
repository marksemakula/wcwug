import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/resources', label: 'Resources' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1749648547185-winrise.png"
              alt="Winrise Logo"
              className="h-12 w-auto"
            />
            <div className="flex flex-col">
              <span className="font-urbanist font-bold text-xl text-text">Winrise</span>
              <span className="font-urbanist text-xs text-gray-600">Counselling & Wellness</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
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
              className="bg-primary text-white px-6 py-2 rounded-full font-urbanist font-medium hover:bg-primary-dark transition-colors duration-300"
            >
              Book a Session
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-text hover:text-primary transition-colors duration-300"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200 py-4"
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
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