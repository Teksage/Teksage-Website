/** Substrings that indicate a non-India `preferred_location` (lowercase match). */
export const CONSULTATION_FOREIGN_LOCATION_HINTS = [
  "united states",
  "usa",
  "u.s.a",
  "united kingdom",
  "uk",
  "canada",
  "australia",
  "singapore",
  "uae",
  "dubai",
  "europe",
] as const;

/** IANA zones treated as India for consultation pricing. */
export const CONSULTATION_INDIA_TIMEZONES = ["Asia/Kolkata", "Asia/Calcutta"] as const;
