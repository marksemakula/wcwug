import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaApple, FaGooglePlay } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1749648547185-winrise.png"
                alt="Winrise Logo"
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
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                <FaFacebook size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                <FaTwitter size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                <FaInstagram size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                <FaLinkedin size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-urbanist font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary transition-colors duration-300 font-urbanist text-sm">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary transition-colors duration-300 font-urbanist text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-300 hover:text-primary transition-colors duration-300 font-urbanist text-sm">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary transition-colors duration-300 font-urbanist text-sm">
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
            © 2025 Winrise Counselling and Wellness LLC. All rights reserved. Powered by Inzozi
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-gray-300 hover:text-primary transition-colors duration-300 font-urbanist text-sm">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-300 hover:text-primary transition-colors duration-300 font-urbanist text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;