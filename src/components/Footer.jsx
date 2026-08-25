import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaApple, FaGooglePlay } from 'react-icons/fa';
import logo from '../logo.png';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white" role="contentinfo" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/images/winrise.png"
                alt="Winrise Counselling & Wellness Logo"
                width="256"
                height="173"
                className="h-10 w-auto brightness-0 invert"
              />
              <div className="flex flex-col">
                <span className="font-urbanist font-bold text-xl">Winrise</span>
                <span className="font-urbanist text-sm text-gray-300">Counselling & Wellness</span>
              </div>
            </div>
            <p className="text-gray-300 font-urbanist text-sm leading-relaxed">
              Empowering minds and transforming lives through professional counselling and wellness services across Uganda.
            </p>
            <div className="flex space-x-4" role="navigation" aria-label="Social media links">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                aria-label="Follow Winrise on Facebook"
                title="Follow us on Facebook"
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                <FaFacebook size={20} aria-hidden="true" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                aria-label="Follow Winrise on Twitter"
                title="Follow us on Twitter"
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                <FaTwitter size={20} aria-hidden="true" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                aria-label="Follow Winrise on Instagram"
                title="Follow us on Instagram"
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                <FaInstagram size={20} aria-hidden="true" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://linkedin.com/company/winrise"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Winrise on LinkedIn"
                title="Connect with us on LinkedIn"
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                <FaLinkedin size={20} aria-hidden="true" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-urbanist font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2" role="navigation" aria-label="Footer Navigation">
              <li>
                <Link 
                  to="/services" 
                  title="Our Professional Counselling and Wellness Services"
                  aria-label="Explore our counselling and wellness services"
                  className="text-gray-300 hover:text-primary transition-colors duration-300 font-urbanist text-sm"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  title="About Winrise Counselling & Wellness"
                  aria-label="Learn about our mission, values, and team"
                  className="text-gray-300 hover:text-primary transition-colors duration-300 font-urbanist text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  title="Meet the Winrise Counselling & Wellness Team"
                  aria-label="Meet the Winrise leadership team"
                  className="text-gray-300 hover:text-primary transition-colors duration-300 font-urbanist text-sm"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link 
                  to="/resources" 
                  title="Mental Health Resources and Articles"
                  aria-label="Browse mental health resources and educational content"
                  className="text-gray-300 hover:text-primary transition-colors duration-300 font-urbanist text-sm"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  title="Contact Us to Book a Session"
                  aria-label="Get in touch or book a counselling session"
                  className="text-gray-300 hover:text-primary transition-colors duration-300 font-urbanist text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-urbanist font-semibold text-lg">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary" size={16} />
                <span className="text-gray-300 font-urbanist text-sm">+256 772 360 111 | +256 701 360 111</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary" size={16} />
                <span className="text-gray-300 font-urbanist text-sm">info@winrise.org</span>
              </div>
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary mt-1" size={16} />
                <span className="text-gray-300 font-urbanist text-sm">
                  Plot 215, Kisaasi - Bukoto Road<br />
                  P.O. Box 189152
                  Kampala, Uganda
                </span>
              </div>
            </div>
          </div>

          {/* App Download */}
          <div className="space-y-4">
            <h3 className="font-urbanist font-semibold text-lg">Get the App</h3>
            <p className="text-gray-300 font-urbanist text-sm">
              Access mental health support anytime, anywhere with our mobile app.
            </p>
            <div className="space-y-3">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="flex items-center space-x-3 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <FaApple className="text-white" size={20} />
                <div>
                  <div className="font-urbanist text-xs text-gray-300">Download on the</div>
                  <div className="font-urbanist text-sm font-medium">App Store</div>
                </div>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="flex items-center space-x-3 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <FaGooglePlay className="text-white" size={20} />
                <div>
                  <div className="font-urbanist text-xs text-gray-300">Get it on</div>
                  <div className="font-urbanist text-sm font-medium">Google Play</div>
                </div>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 font-urbanist text-sm">
            © 2026 Winrise Counselling and Wellness LLC. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link 
              to="#" 
              title="Winrise Privacy Policy"
              aria-label="Read our privacy policy"
              className="text-gray-300 hover:text-primary transition-colors duration-300 font-urbanist text-sm"
            >
              Privacy Policy
            </Link>
            <Link 
              to="#" 
              title="Winrise Terms of Service"
              aria-label="Read our terms of service"
              className="text-gray-300 hover:text-primary transition-colors duration-300 font-urbanist text-sm"
            >
              Terms of Service
            </Link>
            <a
              href="https://www.inzozi.co"
              target="_blank"
              rel="noopener noreferrer"
              title="Powered by Inzozi"
              className="flex items-center space-x-2 opacity-80 hover:opacity-100 transition-opacity duration-300"
            >
              <span className="text-gray-300 font-urbanist text-sm">Powered by</span>
              <img
                src={logo}
                alt="Inzozi Logo"
                className="h-10 w-auto brightness-0 invert"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;