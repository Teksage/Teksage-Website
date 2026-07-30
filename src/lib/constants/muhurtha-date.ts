/** Muhurtha start-date picker constraints. */

export const MUHURTHA_DATE = {
  /** Max days ahead user may pick as scan start (from today). */
  maxStartDaysAhead: 30,
  pickDateAria: "Pick Muhurtha start date",
  /** Shown when start date is past or beyond `maxStartDaysAhead` (also API 400 detail). */
  startDateOutOfRange: "Choose a date within the next 30 days.",
} as const;
