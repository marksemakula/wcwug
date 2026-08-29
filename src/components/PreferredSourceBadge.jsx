import React from 'react';
import { FaStar, FaExternalLinkAlt } from 'react-icons/fa';
import { SITE_URL, SITE_NAME } from '../seo/siteConfig';

/**
 * "Add us as a preferred source on Google" badge.
 *
 * Google's preferred-sources feature lets a signed-in searcher nominate sites
 * they want to see more of in Top Stories. Picking a source is entirely the
 * reader's action — this is a link that opens Google's own preferences dialog
 * with winrise.org pre-filled.
 *
 * ── What this is NOT ────────────────────────────────────────────────────────
 * It is not a ranking factor. Nothing here changes how Google ranks the site
 * for anyone who has not personally opted in, and the effect for those who do
 * is confined to Top Stories. See the note in the commit / handover doc.
 *
 * ── Why a plain link and not Google's script ────────────────────────────────
 * Google also ships an official button:
 *
 *   <script async src="https://news.google.com/swg/js/v1/publisher.js"></script>
 *   <div google-add-preferred-source-btn></div>
 *
 * That renders Google's own branded button, but it costs a third-party script
 * on every page it appears on, and news.google.com is not in the site's
 * Content-Security-Policy — it would be blocked and fail silently until
 * `script-src` is widened. The deeplink below is the same destination with no
 * script, no extra request, and no CSP change. Swap it if you specifically
 * want Google's branded button, and add news.google.com to script-src.
 *
 * Reference: https://developers.google.com/search/docs/appearance/preferred-sources
 */

// Google identifies a source at domain level, so this is the canonical host
// with the protocol stripped — derived from SITE_URL so it cannot drift.
const SOURCE_HOST = SITE_URL.replace(/^https?:\/\//, '');
const PREFERRED_SOURCE_URL = `https://www.google.com/preferences/source?q=${encodeURIComponent(
  SOURCE_HOST
)}`;

/**
 * @param {'inline'|'card'} variant  'card' for a standalone block, 'inline' for a quiet link.
 */
const PreferredSourceBadge = ({ variant = 'card', className = '' }) => {
  if (variant === 'inline') {
    return (
      <a
        href={PREFERRED_SOURCE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 font-open-sans text-sm text-gray-600 hover:text-primary transition-colors ${className}`}
      >
        <FaStar size={12} aria-hidden="true" />
        Make {SITE_NAME} a preferred source on Google
        <FaExternalLinkAlt size={10} aria-hidden="true" />
      </a>
    );
  }

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-gray-200 bg-accent px-6 py-5 ${className}`}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
        <FaStar className="text-primary" size={20} aria-hidden="true" />
      </div>

      <div className="flex-1">
        <p className="font-urbanist font-semibold text-text">
          Follow {SITE_NAME} on Google
        </p>
        <p className="font-open-sans text-sm text-gray-600 mt-1">
          Choose us as a preferred source and our mental health articles will show up more
          often in your Google results.
        </p>
      </div>

      <a
        href={PREFERRED_SOURCE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 flex-shrink-0 bg-primary hover:bg-primary-dark text-white font-open-sans font-medium rounded-lg px-5 py-2.5 transition-colors"
      >
        Add as preferred source
        <FaExternalLinkAlt size={11} aria-hidden="true" />
      </a>
    </div>
  );
};

export default PreferredSourceBadge;
