import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaBookOpen, FaVideo, FaPodcast, FaSearch, FaFilter, FaClock, FaEye } from 'react-icons/fa';

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
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=250&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
      downloadable: true,
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
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=250&fit=crop'
    },
    {
      id: 6,
      title: 'Workplace Mental Health Policy Template',
      category: 'guides',
      type: 'PDF Template',
      description: 'Ready-to-use template for creating comprehensive workplace mental health policies.',
      readTime: '10 min read',
      views: '5.7k',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop'
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
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-open-sans font-medium">
                        Featured
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-open-sans font-medium">
                        {resource.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-urbanist font-semibold text-xl text-text mb-3">
                      {resource.title}
                    </h3>
                    <p className="font-open-sans text-gray-600 mb-4 leading-relaxed">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <FaClock size={14} />
                          <span>{resource.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaEye size={14} />
                          <span>{resource.views}</span>
                        </div>
                      </div>
                      {resource.downloadable && (
                        <button className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors duration-300">
                          <FaDownload size={14} />
                          <span className="font-open-sans font-medium text-sm">Download</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
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
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-open-sans font-medium">
                      {resource.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-urbanist font-semibold text-xl text-text mb-3">
                    {resource.title}
                  </h3>
                  <p className="font-open-sans text-gray-600 mb-4 leading-relaxed">
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <FaClock size={14} />
                        <span>{resource.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaEye size={14} />
                        <span>{resource.views}</span>
                      </div>
                    </div>
                    {resource.downloadable ? (
                      <button className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors duration-300">
                        <FaDownload size={14} />
                        <span className="font-open-sans font-medium text-sm">Download</span>
                      </button>
                    ) : (
                      <button className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors duration-300">
                        <FaBookOpen size={14} />
                        <span className="font-open-sans font-medium text-sm">Read More</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
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