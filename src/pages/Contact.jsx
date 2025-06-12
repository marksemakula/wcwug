import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    serviceType: '',
    message: '',
    preferredContact: 'email'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      serviceType: '',
      message: '',
      preferredContact: 'email'
    });
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Phone',
      details: ['+256 772 360 111', '+256 701 360 111'],
      description: 'Call us during business hours'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: ['support@winrise.org', 'winriseug@gmail.com'],
      description: 'We respond within 24 hours'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      details: ['Plot 12, Kampala Road', 'Kampala, Uganda'],
      description: 'Visit our main office'
    },
    {
      icon: FaClock,
      title: 'Business Hours',
      details: ['Mon - Fri: 8:00 AM - 6:00 PM', 'Sat: 9:00 AM - 4:00 PM'],
      description: 'Emergency support available 24/7'
    }
  ];

  const serviceTypes = [
    'Individual Counselling',
    'Couples Therapy',
    'Family Therapy',
    'Corporate Wellness',
    'Online Counselling',
    'Group Therapy',
    'Training & Workshops',
    'Other'
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
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to start your mental health journey? Contact us today to schedule a consultation or learn more about our services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-urbanist font-bold text-3xl text-text mb-6">
                Send us a Message
              </h2>
              <p className="font-open-sans text-gray-600 mb-8 leading-relaxed">
                Fill out the form below and we'll get back to you as soon as possible. All information is kept confidential.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-open-sans font-medium text-text mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block font-open-sans font-medium text-text mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-open-sans font-medium text-text mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block font-open-sans font-medium text-text mb-2">
                      Service Interest
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select a service</option>
                      {serviceTypes.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-open-sans font-medium text-text mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="Brief subject of your inquiry"
                  />
                </div>

                <div>
                  <label className="block font-open-sans font-medium text-text mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="Tell us more about how we can help you..."
                  />
                </div>

                <div>
                  <label className="block font-open-sans font-medium text-text mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleChange}
                        className="mr-2 text-primary focus:ring-primary"
                      />
                      <span className="font-open-sans text-gray-700">Email</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleChange}
                        className="mr-2 text-primary focus:ring-primary"
                      />
                      <span className="font-open-sans text-gray-700">Phone</span>
                    </label>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-open-sans font-semibold text-lg transition-colors duration-300"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-urbanist font-bold text-3xl text-text mb-6">
                  Contact Information
                </h2>
                <p className="font-open-sans text-gray-600 mb-8 leading-relaxed">
                  We're here to help and answer any questions you might have. We look forward to hearing from you.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-accent rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <info.icon className="text-primary" size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-urbanist font-semibold text-xl text-text mb-2">
                          {info.title}
                        </h3>
                        <div className="space-y-1 mb-2">
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="font-open-sans text-gray-700">
                              {detail}
                            </p>
                          ))}
                        </div>
                        <p className="font-open-sans text-sm text-gray-500">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media */}
              <div className="bg-accent rounded-2xl p-6">
                <h3 className="font-urbanist font-semibold text-xl text-text mb-4">
                  Follow Us
                </h3>
                <p className="font-open-sans text-gray-600 mb-4">
                  Stay connected with us on social media for updates and mental health tips.
                </p>
                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <FaFacebook size={18} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <FaTwitter size={18} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <FaInstagram size={18} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <FaLinkedin size={18} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-urbanist font-bold text-4xl text-text mb-4">
              Visit Our <span className="text-primary">Office</span>
            </h2>
            <p className="font-open-sans text-xl text-gray-600">
              Located in the heart of Kampala, we're easily accessible by public transport.
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center mb-6">
              <div className="text-center">
                <FaMapMarkerAlt className="text-primary mx-auto mb-4" size={48} />
                <h3 className="font-urbanist font-semibold text-xl text-text mb-2">
                  Interactive Map
                </h3>
                <p className="font-open-sans text-gray-600">
                  Plot 12, Kampala Road, Kampala, Uganda
                </p>
                <p className="font-open-sans text-sm text-gray-500 mt-2">
                  Map direction to the K-safaris co-shared office in Kisasi will be shown here
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-urbanist font-semibold text-lg text-text mb-2">
                  Public Transport
                </h4>
                <p className="font-open-sans text-gray-600 text-sm">
                  Multiple bus routes and taxi stages nearby
                </p>
              </div>
              <div>
                <h4 className="font-urbanist font-semibold text-lg text-text mb-2">
                  Parking
                </h4>
                <p className="font-open-sans text-gray-600 text-sm">
                  Free parking available for clients
                </p>
              </div>
              <div>
                <h4 className="font-urbanist font-semibold text-lg text-text mb-2">
                  Accessibility
                </h4>
                <p className="font-open-sans text-gray-600 text-sm">
                  Wheelchair accessible with elevator access
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-urbanist font-bold text-4xl text-white mb-6">
              Need Immediate Support?
            </h2>
            <p className="font-open-sans text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              If you're experiencing a mental health crisis, don't wait. Our emergency support team is available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+256701360111"
                className="bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-full font-open-sans font-semibold text-lg transition-colors duration-300 inline-flex items-center justify-center space-x-2"
              >
                <FaPhone />
                <span>Call Emergency Line</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="sms:+256772360111"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-full font-open-sans font-semibold text-lg transition-colors duration-300 border border-white/30"
              >
                Crisis Text Line
              </motion.a>
            </div>
            <p className="font-open-sans text-white/80 text-sm mt-6">
              For life-threatening emergencies, please call 999 or go to your nearest hospital
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;