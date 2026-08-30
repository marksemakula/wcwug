/**
 * Date helpers shared by the event card, the event poster and the
 * registration modal.
 */

/**
 * Parse a 'YYYY-MM-DD' event date as a LOCAL date.
 *
 * `new Date('2025-12-10')` is parsed as UTC midnight, so anywhere west of
 * Greenwich it renders as the 9th. Kampala is UTC+3 so this never showed up
 * locally, but it was wrong for every visitor in the Americas — and it was
 * wrong in three separate places, which is why it lives here now.
 *
 * @param {string} iso an ISO calendar date, 'YYYY-MM-DD'
 * @returns {Date} midnight local time on that calendar day
 */
export function eventDate(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * How an event's timing should be described.
 *
 * Some programmes run continuously rather than on a published date — they
 * carry a `schedule` ('Monthly') instead of a `date`. Everything that shows
 * "when" reads this, so a rolling event can never fall through to a formatted
 * `undefined`.
 *
 * @returns {{ rolling: boolean, label: string }}
 */
export function eventTiming(event) {
  if (!event.date) {
    return { rolling: true, label: event.schedule || 'Rolling intake' };
  }
  return {
    rolling: false,
    label: eventDate(event.date).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  };
}
