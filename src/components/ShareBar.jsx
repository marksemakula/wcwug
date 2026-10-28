import React, { useEffect, useState } from 'react';
import { FaWhatsapp, FaFacebookF, FaLinkedinIn, FaEnvelope, FaLink, FaCheck, FaShareAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

/**
 * Share buttons for a single page.
 *
 * Every link is built from the page's canonical URL rather than
 * window.location, so the prerendered HTML already carries working share links
 * and a copied link never picks up a tracking parameter or #fragment. The
 * preview card that WhatsApp, LinkedIn, Facebook and X show comes from the
 * og:/twitter: tags in the page head (src/seo/pageMeta.js), not from here.
 *
 * The device's own share sheet (navigator.share) is offered only once the
 * component has mounted and the browser supports it — mainly phones — so the
 * static HTML never shows a button that does nothing.
 */
const ShareBar = ({ url, title, text, label = 'Share this article', className = '' }) => {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  const message = text || title;

  const links = [
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      href: `https://wa.me/?text=${encodeURIComponent(`${message}\n${url}`)}`,
      hover: 'hover:bg-[#25D366] hover:border-[#25D366]',
    },
    {
      name: 'Facebook',
      icon: FaFacebookF,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      hover: 'hover:bg-[#1877F2] hover:border-[#1877F2]',
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedinIn,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      hover: 'hover:bg-[#0A66C2] hover:border-[#0A66C2]',
    },
    {
      name: 'X',
      icon: FaXTwitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      hover: 'hover:bg-black hover:border-black',
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${message}\n\n${url}`)}`,
      hover: 'hover:bg-secondary hover:border-secondary',
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Older browsers and some in-app webviews block the async clipboard API.
      const field = document.createElement('textarea');
      field.value = url;
      field.setAttribute('readonly', '');
      field.style.position = 'absolute';
      field.style.left = '-9999px';
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      field.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nativeShare = () => {
    navigator.share({ title, text: message, url }).catch(() => {});
  };

  const buttonClass =
    'inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-600 ' +
    'hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {label && (
        <span className="font-urbanist font-semibold text-sm text-gray-700 mr-1">{label}</span>
      )}

      <ul className="flex flex-wrap items-center gap-2" aria-label={label || 'Share'}>
        {links.map(({ name, icon: Icon, href, hover }) => (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={`Share on ${name}`}
              aria-label={`Share on ${name} (opens in a new tab)`}
              className={`${buttonClass} ${hover}`}
            >
              <Icon size={16} aria-hidden="true" />
            </a>
          </li>
        ))}

        <li>
          <button
            type="button"
            onClick={copyLink}
            title="Copy link"
            aria-label={copied ? 'Link copied' : 'Copy link to this article'}
            className={`${buttonClass} hover:bg-primary hover:border-primary`}
          >
            {copied ? (
              <FaCheck size={15} className="text-primary" aria-hidden="true" />
            ) : (
              <FaLink size={15} aria-hidden="true" />
            )}
          </button>
        </li>

        {canNativeShare && (
          <li>
            <button
              type="button"
              onClick={nativeShare}
              title="More sharing options"
              aria-label="More sharing options"
              className={`${buttonClass} hover:bg-primary hover:border-primary`}
            >
              <FaShareAlt size={15} aria-hidden="true" />
            </button>
          </li>
        )}
      </ul>

      <span role="status" aria-live="polite" className="font-urbanist text-sm text-primary min-w-[5rem]">
        {copied ? 'Link copied' : ''}
      </span>
    </div>
  );
};

export default ShareBar;
