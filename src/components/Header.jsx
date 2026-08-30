import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaHeart } from 'react-icons/fa';
import { DONATE_URL } from '../seo/siteConfig';

/**
 * Routes whose first section is a dark, full-bleed image the header can sit on.
 *
 * Only the homepage qualifies. Every other page opens on
 * `bg-gradient-to-r from-primary/10 to-primary/5` — a near-white wash — so a
 * transparent bar with white links there would be invisible. This is a list
 * rather than a flag because getting it wrong is silent: nothing errors, the
 * navigation simply disappears.
 */
const OVERLAY_ROUTES = ['/'];

/** How far down the page the bar takes on its white background. */
const SOLID_AFTER = 24;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const overlays = OVERLAY_ROUTES.includes(location.pathname);

  /**
   * Kept out of render so the build-time prerenderer never touches `window`.
   *
   * Effects do not run during renderToString, so the static HTML is emitted
   * with scrolled=false — which is the transparent state on the homepage and
   * the white one everywhere else. That is what a visitor landing at the top of
   * the page should see, so there is no flash on hydration; the listener's
   * first call only matters when the browser restores a mid-page position.
   */
  useEffect(() => {
    if (!overlays) {
      setScrolled(false);
      return undefined;
    }
    const onScroll = () => setScrolled(window.scrollY > SOLID_AFTER);
    onScroll(); // the page can load already scrolled — restored position, or an anchor
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [overlays]);

  // The open mobile panel is white, so the bar above it has to be white too —
  // otherwise the panel hangs off a transparent strip.
  const solid = !overlays || scrolled || isMenuOpen;

  // Navigation items with descriptive titles and anchor text for better SEO
  const navItems = [
    {
      path: '/',
      label: 'Home',
      title: 'Winrise Counselling & Wellness Homepage',
      ariaLabel: 'Go to Home page'
    },
    {
      path: '/services',
      label: 'Services',
      title: 'Our Professional Counselling and Wellness Services',
      ariaLabel: 'View our counselling and wellness services'
    },
    {
      path: '/about',
      label: 'About Us',
      title: 'About Winrise Counselling & Wellness',
      ariaLabel: 'Learn about our mission and team'
    },
    {
      path: '/team',
      label: 'Our Team',
      title: 'Meet the Winrise Counselling & Wellness Team',
      ariaLabel: 'Go to Our Team page'
    },
    {
      path: '/resources',
      label: 'Resources',
      title: 'Mental Health Resources and Articles',
      ariaLabel: 'Browse mental health resources and articles'
    },
    {
      path: '/contact',
      label: 'Contact',
      title: 'Contact Us to Book a Session',
      ariaLabel: 'Contact us or book a consultation'
    },
  ];

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    [
      'font-urbanist font-bold transition-colors duration-300',
      solid
        ? isActive(path)
          ? 'text-primary border-b-2 border-primary'
          : 'text-text hover:text-primary'
        : isActive(path)
        ? 'text-white border-b-2 border-white'
        : 'text-white/85 hover:text-white',
    ].join(' ');

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={[
        'z-50 transition-colors duration-300 motion-reduce:transition-none',
        // On an overlay route the bar is fixed the whole time, not sticky. If it
        // switched between the two on scroll the page would jump by the bar's
        // height at the moment it changed.
        overlays ? 'fixed inset-x-0 top-0' : 'sticky top-0',
        solid ? 'bg-white shadow-lg' : 'bg-transparent',
      ].join(' ')}
      role="banner"
    >
      {/*
        The scrim. Without it this does not work: hero-landscape.webp opens on a
        near-white sky, and white links over it measure 2.1:1 against the hero's
        own black/30 — unreadable, and it rotates back every 20 seconds so the
        menu would fade in and out of legibility.

        It is taller than the bar and fades to nothing well below it, so there is
        no seam where it ends. At the line the links sit on it puts white at
        7.3:1; at the bar's lower edge, 5.9:1. Both measured against a pure white
        pixel, which is the worst the photographs contain.
      */}
      {!solid && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[220px]
                     bg-gradient-to-b from-black/60 via-black/40 to-transparent"
        />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* items-stretch, and the vertical padding moves onto the children.
            That is what lets the Donate slab fill the bar top to bottom while
            the lock-up and the links keep their breathing room — and it works
            in both states, since the bar's height is still set by the tallest
            child (81px logo + 32px padding transparent, 48 + 32 solid). */}
        <div className="flex justify-between items-stretch">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 py-4"
            title="Winrise Counselling & Wellness - Home"
            aria-label="Winrise Counselling & Wellness - Return to homepage"
          >
            <img
              src="/images/winrise.png"
              alt="Winrise Counselling & Wellness Logo"
              width="256"
              height="173"
              className={`w-auto transition-all duration-300 motion-reduce:transition-none ${
                solid ? 'h-12' : 'h-[81px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]'
              }`}
            />
            <div className="flex flex-col">
              <span
                className={`font-urbanist font-bold text-xl transition-colors duration-300
                            motion-reduce:transition-none ${solid ? 'text-text' : 'text-white'}`}
              >
                Winrise
              </span>
              <span
                className={`font-urbanist text-xs transition-colors duration-300
                            motion-reduce:transition-none ${
                              solid ? 'text-gray-600' : 'text-white/85'
                            }`}
              >
                Counselling &amp; Wellness
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {/* lg, not md. Six items plus the lock-up plus the Donate button do
              not fit in the 704px the bar has at 768px — the wordmark was
              already being squeezed there before the items went bold. Below
              1024px this is the hamburger's job. Spacing tightens one step at
              lg so 1024px itself still has room to spare. */}
          <nav
            className="hidden lg:flex items-center space-x-6 xl:space-x-8 py-4"
            aria-label="Main Navigation"
            role="navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                title={item.title}
                aria-label={item.ariaLabel}
                aria-current={isActive(item.path) ? 'page' : undefined}
                className={linkClass(item.path)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/*
            Donate — a full-height slab, not a pill.

            It fills the bar top to bottom in both states, which is what the
            row's items-stretch is for. The old whileHover scale is gone:
            scaling a shape flush to the bar's edges pulls it away from them,
            which is the one thing this shape exists to do. Colour carries the
            hover instead.

            It stays flush to the TOP and comes off the bottom instead, which
            is how the sketch had it — a slab hanging from the bar rather than
            one floating in it. The margin is what sets the height: a stretched
            flex item stretches to the row height minus its own margins, so
            mb-6 leaves 89px of the transparent bar's 113 and 56px of the
            scrolled bar's 80.
          */}
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Donate to Winrise Counselling & Wellness"
            aria-label="Donate to Winrise - opens in a new tab"
            className="hidden lg:flex items-center justify-center gap-2 px-6 mb-6 whitespace-nowrap
                       bg-primary hover:bg-primary-dark text-white
                       font-urbanist font-bold transition-colors duration-300"
          >
            <FaHeart size={14} aria-hidden="true" />
            Donate
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden py-4 transition-colors duration-300 motion-reduce:transition-none ${
              solid ? 'text-text hover:text-primary' : 'text-white hover:text-white/80'
            }`}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMenuOpen ? <FaTimes size={24} aria-hidden="true" /> : <FaBars size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200 py-4"
            id="mobile-navigation"
          >
            <nav
              className="flex flex-col space-y-4"
              aria-label="Mobile Navigation"
              role="navigation"
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  title={item.title}
                  aria-label={item.ariaLabel}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                  className={`font-urbanist font-bold transition-colors duration-300 hover:text-primary ${isActive(item.path) ? 'text-primary' : 'text-text'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                title="Donate to Winrise Counselling & Wellness"
                aria-label="Donate to Winrise - opens in a new tab"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-2 rounded-full font-urbanist font-medium hover:bg-primary-dark transition-colors duration-300 text-center"
              >
                <FaHeart size={14} aria-hidden="true" />
                Donate
              </a>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
