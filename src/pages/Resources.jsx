import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaDownload, FaBookOpen, FaSearch, FaFilter, FaClock, FaEye,
  FaShare, FaTimes, FaWhatsapp, FaTwitter, FaFacebook, FaEnvelope, FaLink, FaCheck, FaExpand
} from 'react-icons/fa';
import SEO from '../components/SEO';
import PreferredSourceBadge from '../components/PreferredSourceBadge';

/* ─────────────────────────────────────────────
   Share Menu (per-tile dropdown)
───────────────────────────────────────────── */
const ShareMenu = ({ resource }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef(null);

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const text = `Check out this mental health resource: ${resource.title}`;

  const shareLinks = [
    {
      label: 'WhatsApp',
      icon: <FaWhatsapp size={15} />,
      color: '#25D366',
      href: `https://wa.me/?text=${encodeURIComponent(text + ' ' + pageUrl)}`,
    },
    {
      label: 'Twitter / X',
      icon: <FaTwitter size={15} />,
      color: '#1DA1F2',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(pageUrl)}`,
    },
    {
      label: 'Facebook',
      icon: <FaFacebook size={15} />,
      color: '#1877F2',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(text)}`,
    },
    {
      label: 'Email',
      icon: <FaEnvelope size={15} />,
      color: '#EA4335',
      href: `mailto:?subject=${encodeURIComponent(resource.title)}&body=${encodeURIComponent(text + '\n\n' + pageUrl)}`,
    },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
        title="Share"
        className="flex items-center space-x-1 text-gray-400 hover:text-primary transition-colors duration-200"
      >
        <FaShare size={14} />
        <span className="font-open-sans font-medium text-sm">Share</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full mb-2 right-0 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-50 w-44"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-open-sans text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">Share via</p>
            {shareLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 group"
              >
                <span style={{ color: s.color }}>{s.icon}</span>
                <span className="font-open-sans text-sm text-gray-700 group-hover:text-gray-900">{s.label}</span>
              </a>
            ))}
            <button
              onClick={copyLink}
              className="w-full flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 group"
            >
              {copied ? <FaCheck size={15} className="text-green-500" /> : <FaLink size={15} className="text-gray-500" />}
              <span className="font-open-sans text-sm text-gray-700 group-hover:text-gray-900">
                {copied ? 'Copied!' : 'Copy link'}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Preview Modal
───────────────────────────────────────────── */
const PreviewModal = ({ resource, onClose }) => {
  // Trap scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const isPdf = resource.downloadable && resource.downloadUrl?.toLowerCase().endsWith('.pdf');
  const encodedPdfUrl = isPdf ? encodeURI(resource.downloadUrl) : null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onClose}
        />

        {/* Panel */}
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
          style={{ width: '90vw', maxWidth: 960, height: '88vh' }}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
            <div className="flex-1 min-w-0 pr-4">
              <span className="inline-block bg-primary/10 text-primary text-xs font-open-sans font-semibold px-2 py-0.5 rounded-full mb-1">
                {resource.type}
              </span>
              <h2 className="font-urbanist font-bold text-xl text-text truncate">{resource.title}</h2>
              <p className="font-open-sans text-sm text-gray-500 mt-0.5">{resource.description}</p>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              {resource.downloadable && resource.downloadUrl && (
                <a
                  href={resource.downloadUrl}
                  download
                  className="flex items-center space-x-1.5 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-open-sans font-medium text-sm transition-colors duration-200"
                >
                  <FaDownload size={13} />
                  <span>Download</span>
                </a>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-800"
                aria-label="Close preview"
              >
                <FaTimes size={18} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-hidden bg-gray-50">
            {isPdf ? (
              <object
                data={encodedPdfUrl}
                type="application/pdf"
                className="w-full h-full border-0"
                aria-label={resource.title}
              >
                <embed
                  src={encodedPdfUrl}
                  type="application/pdf"
                  className="w-full h-full border-0"
                />
                {/* Fallback for browsers that block inline PDFs */}
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <p className="font-open-sans text-gray-600 mb-4">Your browser cannot display this PDF inline.</p>
                  <a
                    href={encodedPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-open-sans font-medium transition-colors duration-200"
                  >
                    <FaDownload size={14} />
                    <span>Open PDF in new tab</span>
                  </a>
                </div>
              </object>
            ) : (
              /* Non-PDF: rich info card */
              <div className="h-full flex flex-col items-center justify-center p-8">
                <div className="max-w-lg w-full text-center">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-56 object-cover rounded-xl mb-6 shadow-lg"
                  />
                  <div className="flex justify-center space-x-6 text-sm text-gray-500 mb-4">
                    <span className="flex items-center space-x-1"><FaClock size={13} /><span>{resource.readTime}</span></span>
                    <span className="flex items-center space-x-1"><FaEye size={13} /><span>{resource.views} views</span></span>
                  </div>
                  <p className="font-open-sans text-gray-600 leading-relaxed">{resource.description}</p>
                  <p className="mt-6 font-open-sans text-sm text-gray-400 italic">
                    Full content coming soon. Check back or subscribe to our newsletter.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ─────────────────────────────────────────────
   Resource Card (shared between Featured & All)
───────────────────────────────────────────── */
const ResourceCard = ({ resource, index, featured = false }) => {
  const [preview, setPreview] = useState(false);

  return (
    <>
      <motion.div
        key={resource.id}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
        onClick={() => setPreview(true)}
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={resource.image}
            alt={resource.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Hover overlay hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-sm font-open-sans font-medium flex items-center space-x-1.5">
              <FaExpand size={12} />
              <span>Preview</span>
            </span>
          </div>
          {featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-open-sans font-medium">
                Featured
              </span>
            </div>
          )}
          <div className="absolute top-4 right-4">
            <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-open-sans font-medium">
              {resource.type}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <h3 className="font-urbanist font-semibold text-xl text-text mb-2 group-hover:text-primary transition-colors duration-200">
            {resource.title}
          </h3>
          <p className="font-open-sans text-gray-600 mb-4 leading-relaxed text-sm">
            {resource.description}
          </p>

          {/* Footer row */}
          <div className="flex items-center justify-between">
            {/* Meta */}
            <div className="flex items-center space-x-3 text-xs text-gray-400">
              <span className="flex items-center space-x-1"><FaClock size={12} /><span>{resource.readTime}</span></span>
              <span className="flex items-center space-x-1"><FaEye size={12} /><span>{resource.views}</span></span>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3" onClick={(e) => e.stopPropagation()}>
              <ShareMenu resource={resource} />
              {resource.downloadable && resource.downloadUrl ? (
                <a
                  href={resource.downloadUrl}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  <FaDownload size={13} />
                  <span className="font-open-sans font-medium text-sm">Download</span>
                </a>
              ) : (
                <button
                  onClick={(e) => { e.stopPropagation(); setPreview(true); }}
                  className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  <FaBookOpen size={13} />
                  <span className="font-open-sans font-medium text-sm">Read More</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {preview && <PreviewModal resource={resource} onClose={() => setPreview(false)} />}
    </>
  );
};

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'articles', label: 'Articles' },
    { id: 'guides', label: 'Guides' },
    { id: 'videos', label: 'Videos' },
    { id: 'podcasts', label: 'Podcasts' }
  ];

  const resources = [
    {
      id: 1,
      title: 'Managing Anxiety in the Workplace',
      category: 'articles',
      type: 'Article',
      description: 'Practical strategies for dealing with workplace anxiety and stress management techniques.',
      readTime: '8 min read',
      views: '2.5k',
      image: '/images/workplacestress.webp',
      featured: true
    },
    {
      id: 2,
      title: 'Complete Guide to Mental Health First Aid',
      category: 'guides',
      type: 'PDF Guide',
      description: 'Comprehensive guide on how to provide initial support to someone experiencing mental health problems.',
      readTime: '25 min read',
      views: '4.1k',
      image: '/images/firstaid.webp',
      downloadable: true,
      downloadUrl: '/Mental-Health_First-Aid_Guide(Uganda_Context)_The_ALGEE_5-Step_Protocol_Explained-Dr.Kyosaba_Winfred_Biribonwa-PhD.pdf',
      featured: true
    },
    {
      id: 3,
      title: 'Understanding Depression: Signs and Support',
      category: 'videos',
      type: 'Video',
      description: 'Educational video explaining depression symptoms and how to support loved ones.',
      readTime: '15 min watch',
      views: '8.3k',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop'
    },
    {
      id: 4,
      title: 'Mindfulness and Meditation Techniques',
      category: 'podcasts',
      type: 'Podcast',
      description: 'Audio guide to mindfulness practices and meditation techniques for daily stress relief.',
      readTime: '22 min listen',
      views: '3.2k',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop'
    },
    {
      id: 5,
      title: 'Building Resilience in Children',
      category: 'articles',
      type: 'Article',
      description: 'How parents and teachers can help children develop emotional resilience and coping skills.',
      readTime: '12 min read',
      views: '1.8k',
      image: '/images/resilienceinchildren.webp'
    },
    {
      id: 6,
      title: 'Workplace Mental Health Policy Template',
      category: 'guides',
      type: 'PDF Template',
      description: 'Ready-to-use template for creating comprehensive workplace mental health policies.',
      readTime: '10 min read',
      views: '5.7k',
      image: '/images/workspace.webp',
      downloadable: true
    },
    {
      id: 7,
      title: 'Coping with Grief and Loss',
      category: 'videos',
      type: 'Video Series',
      description: 'Multi-part video series on understanding and processing grief in healthy ways.',
      readTime: '45 min watch',
      views: '6.9k',
      image: '/images/grief.webp'
    },
    {
      id: 8,
      title: 'Mental Health Conversations',
      category: 'podcasts',
      type: 'Podcast Series',
      description: 'Weekly podcast featuring mental health professionals discussing various topics.',
      readTime: '30 min listen',
      views: '12.1k',
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=250&fit=crop'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <div className="min-h-screen bg-white">
      <SEO path="/resources" />

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
              Mental Health <span className="text-primary">Resources</span>
            </h1>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Access our comprehensive library of mental health resources, including articles, guides, videos, and podcasts to support your wellness journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Preferred source on Google */}
      <section className="pt-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <PreferredSourceBadge />
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" size={16} />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-open-sans font-medium transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      {activeCategory === 'all' && (
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
                Featured <span className="text-primary">Resources</span>
              </h2>
              <p className="font-open-sans text-xl text-gray-600">
                Our most popular and impactful mental health resources.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredResources.map((resource, index) => (
                <ResourceCard key={resource.id} resource={resource} index={index} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-urbanist font-bold text-4xl text-text mb-4">
              {activeCategory === 'all' ? 'All Resources' : categories.find(c => c.id === activeCategory)?.label}
            </h2>
            <p className="font-open-sans text-xl text-gray-600">
              {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <ResourceCard key={resource.id} resource={resource} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-urbanist font-bold text-4xl text-white mb-6">
              Stay Updated with New Resources
            </h2>
            <p className="font-open-sans text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Subscribe to our newsletter to receive the latest mental health resources, tips, and updates directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary transition-all duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white hover:bg-gray-100 text-primary px-8 py-3 rounded-full font-open-sans font-semibold transition-colors duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Resources;