import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronRight, FaHome } from 'react-icons/fa';
import { getTeamMember } from '../data/team';

/**
 * Visual breadcrumb trail only.
 *
 * The BreadcrumbList JSON-LD used to be emitted here as well, which meant every
 * inner page shipped two competing descriptions of its breadcrumbs (this one in
 * the body, plus microdata attributes on the same markup). Structured data now
 * lives in one place — src/seo/pageMeta.js, rendered into <head> — so Google
 * reads a single, consistent trail.
 */

const PAGE_NAMES = {
  '/services': 'Services',
  '/about': 'About Us',
  '/resources': 'Resources',
  '/contact': 'Contact',
  '/team': 'Our Team',
};

const Breadcrumb = () => {
  const location = useLocation();

  const buildBreadcrumbs = () => {
    const segments = location.pathname.split('/').filter(Boolean);
    const crumbs = [{ path: '/', name: 'Home', isLast: segments.length === 0 }];

    segments.forEach((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      const member = segments[0] === 'team' && index === 1 ? getTeamMember(segment) : null;

      const name =
        member?.displayName ??
        PAGE_NAMES[path] ??
        decodeURIComponent(segment)
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (character) => character.toUpperCase());

      crumbs.push({ path, name, isLast: index === segments.length - 1 });
    });

    return crumbs;
  };

  if (location.pathname === '/') return null;

  const breadcrumbs = buildBreadcrumbs();

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center py-3 text-sm font-urbanist">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.path} className="flex items-center">
              {index > 0 && (
                <FaChevronRight className="mx-2 text-gray-400" size={10} aria-hidden="true" />
              )}

              {crumb.isLast ? (
                <span className="text-primary font-medium" aria-current="page">
                  {index === 0 && <FaHome className="inline mr-1" size={14} aria-hidden="true" />}
                  {crumb.name}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center"
                  title={`Go to ${crumb.name}`}
                >
                  {index === 0 && <FaHome className="inline mr-1" size={14} aria-hidden="true" />}
                  <span>{crumb.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
