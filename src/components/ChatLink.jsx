import React from 'react';

/**
 * "Chat with our AI" link.
 *
 * A real anchor to chat.winrise.org, so it works in the prerendered HTML,
 * is crawlable, and survives JS failing to load. When the ChatWidget is
 * mounted it intercepts the click and opens the panel in place instead —
 * the visitor keeps their place on the page.
 *
 * Modified clicks (ctrl/cmd/middle) fall through to the browser so
 * "open in new tab" still behaves as expected.
 */

export const CHAT_URL = import.meta.env?.VITE_CHAT_ORIGIN || 'https://chat.winrise.org';

export function openChatPanel() {
  if (typeof window === 'undefined') return false;
  const event = new CustomEvent('winrise:open-chat', { cancelable: true });
  window.dispatchEvent(event);
  // ChatWidget calls preventDefault() to say "I handled it".
  return event.defaultPrevented;
}

function BubbleIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M6 4.5h20a2.5 2.5 0 0 1 2.5 2.5v13a2.5 2.5 0 0 1-2.5 2.5H14.8l-5.1 4.6a.9.9 0 0 1-1.5-.67V22.5H6A2.5 2.5 0 0 1 3.5 20V7A2.5 2.5 0 0 1 6 4.5Z"
        fill="currentColor"
      />
      <circle cx="11" cy="13.5" r="2" fill="#fff" />
      <circle cx="16" cy="13.5" r="2" fill="#fff" />
      <circle cx="21" cy="13.5" r="2" fill="#fff" />
    </svg>
  );
}

export default function ChatLink({ className = '', children = 'Chat with our AI' }) {
  const onClick = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    if (openChatPanel()) e.preventDefault();
  };

  return (
    <a
      href={CHAT_URL}
      onClick={onClick}
      className={
        className ||
        'inline-flex items-center gap-1.5 font-josefin font-medium text-sm text-secondary hover:text-primary transition-colors'
      }
    >
      <BubbleIcon />
      {children}
    </a>
  );
}
