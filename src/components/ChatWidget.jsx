import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * Floating chat launcher for the Winrise Companion.
 *
 * The chat itself lives at chat.winrise.org and is framed here rather than
 * reimplemented, so there is exactly one copy of the conversation logic and
 * the crisis-safety layer. A fix there reaches this widget on its next deploy.
 *
 * The iframe is mounted on first open and then kept mounted, so switching
 * between the compact and expanded views never reloads the conversation.
 */

const CHAT_ORIGIN = import.meta.env?.VITE_CHAT_ORIGIN || 'https://chat.winrise.org';
const CHAT_SRC = `${CHAT_ORIGIN}/embed`;

/* Speech bubble drawn from scratch in the Winrise palette — charcoal outline,
   green dots. Not derived from any other product's mark. */
function ChatBubbleIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 4.5h20a2.5 2.5 0 0 1 2.5 2.5v13a2.5 2.5 0 0 1-2.5 2.5H14.8l-5.1 4.6a.9.9 0 0 1-1.5-.67V22.5H6A2.5 2.5 0 0 1 3.5 20V7A2.5 2.5 0 0 1 6 4.5Z"
        fill="currentColor"
      />
      <circle cx="11" cy="13.5" r="2" fill="#94CC43" />
      <circle cx="16" cy="13.5" r="2" fill="#94CC43" />
      <circle cx="21" cy="13.5" r="2" fill="#94CC43" />
    </svg>
  );
}

function Icon({ path, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d={path} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PATH = {
  close: 'M6 6l12 12M18 6L6 18',
  expand: 'M4 14v6h6M20 10V4h-6M20 4l-7 7M4 20l7-7',
  collapse: 'M10 4v6H4M14 20v-6h6M14 14l7 7M10 10L3 3',
  reset: 'M3 12a9 9 0 1 0 3-6.7M3 4v5h5',
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const iframeRef = useRef(null);
  const panelRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const openChat = useCallback(() => {
    setEverOpened(true);
    setOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setOpen(false);
    setExpanded(false);
  }, []);

  // Esc steps back one level: expanded -> compact -> closed.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (expanded) setExpanded(false);
      else closeChat();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, expanded, closeChat]);

  // Stop the page behind scrolling while the expanded overlay is up.
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    if (!(open && expanded)) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, expanded]);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  // "Chat with our AI" links elsewhere on the site open the panel in place
  // rather than navigating away. Calling preventDefault tells the link we
  // handled it, so it does not also follow its href.
  useEffect(() => {
    const onOpenRequest = (e) => {
      e.preventDefault();
      openChat();
    };
    window.addEventListener('winrise:open-chat', onOpenRequest);
    return () => window.removeEventListener('winrise:open-chat', onOpenRequest);
  }, [openChat]);

  const resetChat = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'winrise-chat:clear' }, CHAT_ORIGIN);
  }, []);

  const spring = reduceMotion
    ? { duration: 0 }
    : { type: 'spring', stiffness: 380, damping: 32 };

  return (
    <>
      {/* backdrop, expanded view only */}
      <AnimatePresence>
        {open && expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={() => setExpanded(false)}
            className="fixed inset-0 z-[998] bg-secondary/40 backdrop-blur-[2px]"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* panel — kept mounted after first open so the conversation survives */}
      {everOpened && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal={expanded ? 'true' : undefined}
          aria-label="Chat with the Winrise Companion"
          tabIndex={-1}
          initial={false}
          animate={{
            opacity: open ? 1 : 0,
            y: open ? 0 : 16,
            scale: open ? 1 : 0.97,
          }}
          transition={spring}
          className={[
            'fixed z-[999] flex flex-col overflow-hidden bg-white shadow-2xl outline-none',
            'ring-1 ring-black/5',
            open ? '' : 'pointer-events-none invisible',
            expanded
              ? 'inset-3 rounded-2xl sm:inset-6 lg:inset-y-10 lg:left-1/2 lg:right-auto lg:h-[min(84vh,780px)] lg:w-[min(92vw,860px)] lg:-translate-x-1/2'
              : 'inset-x-3 bottom-3 top-3 rounded-2xl sm:inset-auto sm:bottom-24 sm:right-5 sm:top-auto sm:h-[min(72vh,580px)] sm:w-[380px]',
          ].join(' ')}
        >
          {/* header */}
          <div className="flex items-center gap-2.5 border-b border-gray-100 bg-secondary px-3.5 py-2.5 text-white">
            <img
              src="/images/winrise.png"
              alt=""
              aria-hidden="true"
              width={30}
              height={30}
              className="h-[30px] w-[30px] shrink-0 rounded-full bg-white object-contain p-0.5"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold leading-tight">Winrise Companion</p>
              <p className="truncate text-[11px] leading-tight text-white/70">
                Confidential · usually replies instantly
              </p>
            </div>

            <button
              type="button"
              onClick={resetChat}
              title="Start a new conversation"
              aria-label="Start a new conversation"
              className="rounded-lg p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Icon path={PATH.reset} className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              title={expanded ? 'Shrink' : 'Open full view'}
              aria-label={expanded ? 'Shrink chat' : 'Open full view'}
              className="hidden rounded-lg p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:block"
            >
              <Icon path={expanded ? PATH.collapse : PATH.expand} className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={closeChat}
              title="Close chat"
              aria-label="Close chat"
              className="rounded-lg p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Icon path={PATH.close} className="h-4 w-4" />
            </button>
          </div>

          {/* chat */}
          <div className="relative flex-1 bg-[#f6f8f5]">
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center gap-1.5">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-2 w-2 animate-bounce rounded-full bg-primary/50"
                    style={{ animationDelay: `${d * 0.14}s` }}
                  />
                ))}
                <span className="sr-only">Loading chat</span>
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={CHAT_SRC}
              title="Winrise Companion chat"
              onLoad={() => setLoaded(true)}
              className="h-full w-full border-0"
              allow="clipboard-write"
            />
          </div>
        </motion.div>
      )}

      {/* launcher */}
      <motion.button
        type="button"
        onClick={() => (open ? closeChat() : openChat())}
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Chat with the Winrise Companion'}
        whileHover={reduceMotion ? undefined : { scale: 1.05 }}
        whileTap={reduceMotion ? undefined : { scale: 0.95 }}
        className={[
          'fixed bottom-5 right-5 z-[1000] flex h-14 w-14 items-center justify-center rounded-full',
          'bg-secondary text-white shadow-lg shadow-secondary/25 transition-colors',
          'hover:bg-[#2c3843] focus-visible:outline focus-visible:outline-2',
          'focus-visible:outline-offset-2 focus-visible:outline-primary',
          // On mobile the panel is near-fullscreen, so the launcher would sit
          // on top of its footer. The panel has its own close button.
          open ? 'hidden sm:flex' : 'flex',
        ].join(' ')}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: reduceMotion ? 0 : 0.15 }}
            >
              <Icon path={PATH.close} className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: reduceMotion ? 0 : 0.15 }}
            >
              <ChatBubbleIcon className="h-7 w-7" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
