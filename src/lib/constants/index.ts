// Central barrel export for all constants
export * from "./colors";
export * from "./typography";
export * from "./api";
export * from "./assets";
export * from "./home-dashboard";
export * from "./home-layout";
export * from "./main-nav";
export * from "./home-dashboard-sidebar";
export * from "./desktop-sidebar-nav";
export * from "./settings-screen";
export * from "./routes";
export * from "./default-region";
export * from "./default-profile";
export * from "./downloads";
export * from "./loader-ui";
export * from "./brand-login-logo";
export * from "./validation-patterns";
export * from "./panchang-screen";
export * from "./horoscope-screen";
export * from "./prediction-circle-nav";
export * from "./login-email-form";
export * from "./login-mobile-form";
export * from "./login-screen";
export * from "./otp-verify-screen";
export * from "./prediction-detail-screen";
export * from "./prediction-assets";
export * from "./prediction-screen-copy";
export * from "./weekly-prediction-layout";
export * from "./yearly-prediction-screen";
export * from "./match-making-screen";
export * from "./page-shell";
export * from "./prediction-desktop-layout";
export * from "./chat-screen";
export * from "./chat-assets";

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
