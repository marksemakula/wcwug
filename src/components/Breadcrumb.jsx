import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronRight, FaHome } from 'react-icons/fa';

const Breadcrumb = () => {
  const location = useLocation();
  
  // Define page titles and descriptions for structured data
  const pageInfo = {
    '/': { name: 'Home', description: 'Winrise Counselling & Wellness Homepage' },
    '/services': { name: 'Services', description: 'Professional Counselling and Wellness Services' },
    '/about': { name: 'About Us', description: 'About Winrise Counselling & Wellness' },
    '/resources': { name: 'Resources', description: 'Mental Health Resources and Articles' },
    '/contact': { name: 'Contact', description: 'Contact Us to Book a Session' },
  };

  // Build breadcrumb items based on current path
  const buildBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    
    const breadcrumbs = [
      { path: '/', name: 'Home', isLast: pathnames.length === 0 }
    ];

    pathnames.forEach((segment, index) => {
      const path = `/${pathnames.slice(0, index + 1).join('/')}`;
      const info = pageInfo[path] || { name: segment.charAt(0).toUpperCase() + segment.slice(1) };
      breadcrumbs.push({
        path,
        name: info.name,
        isLast: index === pathnames.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = buildBreadcrumbs();

  // Generate BreadcrumbList structured data
  const generateStructuredData = () => {
    const baseUrl = 'https://winrise.org';
    
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': crumb.name,
        'item': `${baseUrl}${crumb.path === '/' ? '' : crumb.path}`
      }))
    };
  };

  // Don't show breadcrumbs on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <>
      {/* BreadcrumbList Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
      />
      
      {/* Visual Breadcrumb Navigation */}
      <nav 
        aria-label="Breadcrumb Navigation" 
        className="bg-gray-50 border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol 
            className="flex items-center py-3 text-sm font-urbanist"
            itemScope 
            itemType="https://schema.org/BreadcrumbList"
          >
            {breadcrumbs.map((crumb, index) => (
              <li 
                key={crumb.path}
                className="flex items-center"
                itemProp="itemListElement" 
                itemScope 
                itemType="https://schema.org/ListItem"
              >
                {index > 0 && (
                  <FaChevronRight 
                    className="mx-2 text-gray-400" 
                    size={10} 
                    aria-hidden="true"
                  />
                )}
                
                {crumb.isLast ? (
                  <span 
                    className="text-primary font-medium"
                    itemProp="name"
                    aria-current="page"
                  >
                    {index === 0 && <FaHome className="inline mr-1" size={14} aria-hidden="true" />}
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    to={crumb.path}
                    className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center"
                    itemProp="item"
                    title={`Go to ${crumb.name}`}
                  >
                    {index === 0 && <FaHome className="inline mr-1" size={14} aria-hidden="true" />}
                    <span itemProp="name">{crumb.name}</span>
                  </Link>
                )}
                <meta itemProp="position" content={index + 1} />
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumb;
