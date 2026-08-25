/**
 * POST /api/contact
 *
 * Emails a Contact-page enquiry to info@winrise.org.
 * The sender's address becomes replyTo, so staff can reply straight from the
 * notification without copying it out by hand.
 */

import {
  RECIPIENT,
  readJsonBody,
  createTransporter,
  rejectRequest,
  formatLines,
  formatHtml,
  headerSafe,
  clean,
} from './_lib/mail.js';

export default async function handler(req, res) {
  let fields;
  try {
    fields = await readJsonBody(req);
  } catch {
    res.status(400).json({ success: false, message: 'Could not read your submission.' });
    return;
  }

  const rejection = rejectRequest(req, fields, ['name', 'email', 'subject', 'message']);
  if (rejection) {
    // A honeypot hit looks like success to the bot but sends nothing.
    if (rejection.silentlyDrop) {
      res.status(200).json({ success: true });
      return;
    }
    res.status(rejection.status).json({ success: false, message: rejection.message });
    return;
  }

  const pairs = [
    ['Name', fields.name],
    ['Email', fields.email],
    ['Phone', fields.phone],
    ['Service of interest', fields.serviceType],
    ['Preferred contact', fields.preferredContact],
    ['Subject', fields.subject],
    ['Message', fields.message],
  ];

  const text = [
    'WEBSITE CONTACT ENQUIRY',
    '───────────────────────',
    formatLines(pairs),
    '',
    `Received: ${new Date().toUTCString()}`,
  ].join('\n');

  try {
    await createTransporter().sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: RECIPIENT,
      replyTo: headerSafe(fields.email),
      subject: `Website enquiry: ${headerSafe(fields.subject, 120)} — ${headerSafe(
        fields.name,
        60
      )}`,
      text,
      html: formatHtml({
        heading: 'New contact enquiry',
        pairs,
        footer: `Reply directly to this email to reach ${clean(fields.name, 60)}.`,
      }),
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to send contact email:', error);
    res.status(502).json({ success: false, message: 'Failed to send your message.' });
  }
}
