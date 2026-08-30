/**
 * POST /api/event-registration
 *
 * Emails an event/workshop registration to info@winrise.org, including which
 * event was booked so the notification is actionable on its own.
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
    res.status(400).json({ success: false, message: 'Could not read your registration.' });
    return;
  }

  const rejection = rejectRequest(req, fields, ['name', 'email', 'phone', 'eventTitle']);
  if (rejection) {
    if (rejection.silentlyDrop) {
      res.status(200).json({ success: true });
      return;
    }
    res.status(rejection.status).json({ success: false, message: rejection.message });
    return;
  }

  // formatLines/formatHtml drop empty values, so a rolling programme simply
  // has no Date or Time line — it carries a Schedule instead.
  const pairs = [
    ['Event', fields.eventTitle],
    ['Schedule', fields.eventSchedule],
    ['Date', fields.eventDate],
    ['Time', fields.eventTime],
    ['Location', fields.eventLocation],
    ['Price', fields.eventPrice],
    ['—', ''],
    ['Name', fields.name],
    ['Email', fields.email],
    ['Phone', fields.phone],
    ['Organization', fields.organization],
    ['Dietary / accessibility needs', fields.dietaryRequirements],
  ];

  const text = [
    'EVENT REGISTRATION',
    '──────────────────',
    formatLines(pairs),
    '',
    `Received: ${new Date().toUTCString()}`,
  ].join('\n');

  try {
    await createTransporter().sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: RECIPIENT,
      replyTo: headerSafe(fields.email),
      subject: `Event registration: ${headerSafe(fields.eventTitle, 120)} — ${headerSafe(
        fields.name,
        60
      )}`,
      text,
      html: formatHtml({
        heading: `Registration for ${clean(fields.eventTitle, 120)}`,
        pairs,
        footer:
          clean(fields.eventRolling) === 'yes'
            ? `Rolling programme — no date was published, so reply with the next date, time and venue for ${clean(
                fields.name,
                60
              )} to RSVP. Replying to this email reaches them directly.`
            : `Reply directly to this email to reach ${clean(fields.name, 60)}.`,
      }),
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to send event registration email:', error);
    res.status(502).json({ success: false, message: 'Failed to send your registration.' });
  }
}
