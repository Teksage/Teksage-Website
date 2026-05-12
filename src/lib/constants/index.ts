// Central barrel export for all constants
export * from "./colors";
export * from "./typography";
export * from "./api";
export * from "./assets";

// App-wide string/number constants
export const APP_NAME = "teksage";
export const APP_TAGLINE = "Your Astrology & Predictions Platform";

// Navigation tab indices (mirrors Flutter BottomNavController)
export const NAV_TAB = {
  home: 0,
  panchang: 1,
  horoscope: 2,
  settings: 3,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  authToken: "teksage_auth_token",
  refreshToken: "teksage_refresh_token",
  userId: "teksage_user_id",
  userProfile: "teksage_user_profile",
  language: "teksage_language",
} as const;

// Pagination
export const PAGE_SIZE = 10;

// OTP
export const OTP_LENGTH = 6;
export const OTP_EXPIRY_SECONDS = 120;
