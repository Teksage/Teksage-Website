/**
 * Google Places (New) autocomplete — mirrors Flutter `lib/config/googlePlaces.dart`.
 * Flutter embeds this key for all builds; web prefers `GOOGLE_PLACES_API_KEY` in `.env.local`
 * and falls back to this value when unset (same dev experience as the mobile app).
 */
export const GOOGLE_PLACES_FLUTTER_DEV_KEY =
  "AIzaSyCqGDeZwwRolG4uHw6N5R5ECEkAwepRuMo" as const;

export const GOOGLE_PLACES_AUTOCOMPLETE_URL =
  "https://places.googleapis.com/v1/places:autocomplete" as const;
