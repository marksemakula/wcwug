/**
 * Shared plumbing for the form-to-email endpoints.
 *
 * The leading underscore on this directory matters: Vercel turns every file
 * under /api into its own serverless function, EXCEPT paths beginning with an
 * underscore. `api/_lib/mail.js` is therefore a shared module, not a route.
 *
 * SMTP credentials are read from environment variables and never prefixed with
 * VITE_ — anything with that prefix is inlined into the client bundle by Vite
 * and would be public. These stay server-side only.
 */

import nodemailer from 'nodemailer';

/** Every form on the site notifies this address. */
export const RECIPIENT = 'info@winrise.org';

/** Read and parse a JSON request body from a Vercel Node function. */
export function readJsonBody(req) {
  // Vercel sometimes parses the body for us; if it did, use it.
  if (req.body && typeof req.body === 'object') return Promise.resolve(req.body);

  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      // Refuse anything absurd rather than buffering it into memory.
      if (raw.length > 100000) reject(new Error('Payload too large'));
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

/** True when the mailbox credentials are actually configured. */
export function isMailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    // Port 465 is implicit TLS; 587 upgrades via STARTTLS.
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value) {
  return typeof value === 'string' && EMAIL_PATTERN.test(value.trim());
}

/**
 * Strip CR/LF out of anything that ends up in a header (subject, reply-to).
 * Without this, a newline in a submitted name lets someone inject extra
 * headers — the classic email header-injection hole in contact forms.
 */
export function headerSafe(value = '', maxLength = 200) {
  return String(value).replace(/[\r\n]+/g, ' ').trim().slice(0, maxLength);
}

/** Trim and cap a free-text value before it goes into the email body. */
export function clean(value = '', maxLength = 5000) {
  return String(value ?? '').trim().slice(0, maxLength);
}

/**
 * Render "Label: value" lines, skipping empties so the email stays readable.
 * @param {[string, string][]} pairs
 */
export function formatLines(pairs) {
  return pairs
    .filter(([, value]) => clean(value) !== '')
    .map(([label, value]) => `${label}: ${clean(value)}`)
    .join('\n');
}

/** Escape untrusted text before interpolating it into the HTML email body. */
export function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Simple HTML version of the same label/value pairs. */
export function formatHtml({ heading, pairs, footer }) {
  const rows = pairs
    .filter(([, value]) => clean(value) !== '')
    .map(
      ([label, value]) =>
        `<tr>
           <td style="padding:6px 16px 6px 0;color:#56685C;font:14px/1.5 Arial,sans-serif;vertical-align:top;white-space:nowrap;">${escapeHtml(
             label
           )}</td>
           <td style="padding:6px 0;color:#16211B;font:14px/1.5 Arial,sans-serif;">${escapeHtml(
             clean(value)
           ).replace(/\n/g, '<br>')}</td>
         </tr>`
    )
    .join('');

  return `<div style="max-width:640px;margin:0 auto;padding:24px;">
  <h2 style="margin:0 0 4px;font:600 20px/1.3 Arial,sans-serif;color:#16211B;">${escapeHtml(
    heading
  )}</h2>
  <p style="margin:0 0 20px;font:14px/1.5 Arial,sans-serif;color:#7C8C81;">Submitted via winrise.org</p>
  <table style="border-collapse:collapse;width:100%;">${rows}</table>
  ${
    footer
      ? `<p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #D5DFD2;font:13px/1.5 Arial,sans-serif;color:#7C8C81;">${escapeHtml(
          footer
        )}</p>`
      : ''
  }
</div>`;
}

/**
 * Shared guard rails for a form endpoint. Returns null when the request is fine,
 * or a {status, message} object describing why it was rejected.
 */
export function rejectRequest(req, fields, requiredFields) {
  if (req.method !== 'POST') {
    return { status: 405, message: 'Method not allowed' };
  }

  // Honeypot: a hidden field no human ever fills in. Bots fill everything.
  // Report success so the bot does not learn it was caught, but send nothing.
  if (clean(fields.company_website) !== '') {
    return { status: 200, message: null, silentlyDrop: true };
  }

  const missing = requiredFields.filter((field) => clean(fields[field]) === '');
  if (missing.length > 0) {
    return { status: 400, message: `Missing required field: ${missing.join(', ')}` };
  }

  if (fields.email !== undefined && !isValidEmail(fields.email)) {
    return { status: 400, message: 'Please enter a valid email address.' };
  }

  if (!isMailConfigured()) {
    console.error('SMTP env vars are missing — cannot send form email.');
    return { status: 503, message: 'Email sending is not configured on the server yet.' };
  }

  return null;
}
