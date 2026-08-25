import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers, FaTag } from 'react-icons/fa';

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  organization: '',
  dietaryRequirements: '',
  // Honeypot — hidden from people, filled in by bots, dropped by the server.
  company_website: ''
};

const EventModal = ({ event, onClose }) => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setStatus('submitting');

    try {
      const response = await fetch('/api/event-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          // Send the event details, not just its id — the notification email
          // has to be actionable without looking anything up.
          eventTitle: event.title,
          eventDate: event.date,
          eventTime: event.time,
          eventLocation: event.location,
          eventPrice: event.price
        })
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Registration failed');
      }

      setStatus('success');
      setFormData(EMPTY_FORM);
    } catch (error) {
      setStatus('idle');
      setErrorMsg(
        error.message === 'Failed to fetch'
          ? 'We could not reach the server. Please check your connection and try again.'
          : `${error.message} You can also email info@winrise.org to register.`
      );
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="font-urbanist font-bold text-2xl text-text">
              Register for Event
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* Event Details */}
          <div className="bg-accent rounded-xl p-6 mb-8">
            <h3 className="font-urbanist font-semibold text-xl text-text mb-4">
              {event.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <FaCalendarAlt className="text-primary" />
                <span className="font-urbanist">
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FaClock className="text-primary" />
                <span className="font-urbanist">{event.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FaMapMarkerAlt className="text-primary" />
                <span className="font-urbanist">{event.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FaUsers className="text-primary" />
                <span className="font-urbanist">{event.audience}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FaTag className="text-primary" />
                <span className="font-urbanist font-medium">{event.price}</span>
              </div>
            </div>
            <p className="text-gray-600 font-urbanist mt-4 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-urbanist font-medium text-text mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 font-urbanist"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block font-urbanist font-medium text-text mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 font-urbanist"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-urbanist font-medium text-text mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 font-urbanist"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block font-urbanist font-medium text-text mb-2">
                  Organization (Optional)
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 font-urbanist"
                  placeholder="Enter your organization"
                />
              </div>
            </div>

            <div>
              <label className="block font-urbanist font-medium text-text mb-2">
                Special Requirements (Optional)
              </label>
              <textarea
                name="dietaryRequirements"
                value={formData.dietaryRequirements}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 font-urbanist"
                placeholder="Any dietary requirements or accessibility needs?"
              />
            </div>

            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                overflow: 'hidden',
                clip: 'rect(0 0 0 0)',
                whiteSpace: 'nowrap'
              }}
            >
              <label htmlFor="event_company_website">Do not fill this in</label>
              <input
                id="event_company_website"
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.company_website}
                onChange={handleChange}
              />
            </div>

            {status === 'success' && (
              <div
                role="status"
                className="rounded-lg border border-primary/30 bg-primary/5 px-5 py-4"
              >
                <p className="font-urbanist font-semibold text-primary-dark mb-1">
                  You&apos;re registered
                </p>
                <p className="font-open-sans text-sm text-gray-700">
                  We&apos;ve sent your details to the WINRISE team and will confirm by email.
                </p>
              </div>
            )}

            {errorMsg && (
              <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-5 py-4">
                <p className="font-open-sans text-sm text-red-800">{errorMsg}</p>
              </div>
            )}

            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-urbanist font-medium transition-colors duration-300"
              >
                {status === 'success' ? 'Close' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className="flex-1 bg-primary hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-urbanist font-medium transition-colors duration-300"
              >
                {status === 'submitting' ? 'Sending…' : status === 'success' ? 'Registered' : 'Register Now'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventModal;