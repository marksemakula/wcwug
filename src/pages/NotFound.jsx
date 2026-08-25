import React from 'react';
import { Link, useLocation } from 'react-router';
import SEO from '../components/SEO';

/**
 * Unknown URLs get a real page carrying `noindex, follow` rather than an empty
 * shell — that stops soft-404s from accumulating in Search Console's "Crawled –
 * currently not indexed" bucket, while still letting crawlers follow the links
 * back into the site.
 */
const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-[60vh] bg-white flex items-center">
      <SEO path={location.pathname} />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="font-urbanist font-bold text-6xl text-primary mb-4">404</p>
        <h1 className="font-urbanist font-bold text-3xl md:text-4xl text-text mb-4">
          We couldn&apos;t find that page
        </h1>
        <p className="font-open-sans text-gray-600 mb-10">
          The page may have moved or the link may be out of date. Here is where to go next.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="bg-primary text-white font-open-sans font-medium rounded-lg px-6 py-3 hover:bg-primary-dark transition-colors"
          >
            Go to homepage
          </Link>
          <Link
            to="/services"
            className="border border-primary text-primary font-open-sans font-medium rounded-lg px-6 py-3 hover:bg-primary/5 transition-colors"
          >
            Our services
          </Link>
          <Link
            to="/contact"
            className="border border-primary text-primary font-open-sans font-medium rounded-lg px-6 py-3 hover:bg-primary/5 transition-colors"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
