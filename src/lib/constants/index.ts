// Central barrel export for all constants
export * from "./colors";
export * from "./typography";
export * from "./api";
export * from "./assets";
export * from "./home-dashboard";
export * from "./home-dashboard-ui";
export * from "./home-panchang-timing-ui";
export * from "./home-layout";
export * from "./main-nav";
export * from "./nav-ui";
export * from "./home-dashboard-sidebar";
export * from "./desktop-sidebar-nav";
export * from "./desktop-sidebar-panchang";
export * from "./consultation-home";
export * from "./consultation-screen";
export * from "./consultation-languages";
export * from "./consultation-listing";
export * from "./consultation-detail";
export * from "./consultation-slots";
export * from "./consultation-checkout";
export * from "./consultation-booking";
export * from "./consultation-currency";
export * from "./consultation-routes";
export * from "./getting-started";
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
export * from "./horoscope-chart-frame";
export * from "./prediction-circle-nav";
export * from "./login-email-form";
export * from "./login-mobile-form";
export * from "./login-screen";
export * from "./otp-verify-screen";
export * from "./prediction-premium-gate";
export * from "./prediction-detail-screen";
export * from "./prediction-share";
export * from "./prediction-assets";
export * from "./prediction-screen-copy";
export * from "./weekly-prediction-layout";
export * from "./weekly-prediction-card-ui";
export * from "./yearly-prediction-screen";
export * from "./yearly-prediction-card-ui";
export * from "./yearly-prediction-detail-layout";
export * from "./life-prediction-detail-layout";
export * from "./match-making-screen";
export * from "./match-making-layout";
export * from "./muhurtha-screen";
export * from "./muhurtha-layout";
export * from "./muhurtha-date";
export * from "./page-shell";
export * from "./prediction-desktop-layout";
export * from "./chat-screen";
export * from "./chat-assets";
export * from "./notifications-screen";
export * from "./settings-change-contact";
export * from "./auth-http";
export * from "./feature-discovery";
export * from "./welcome-onboarding";

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
  /** Zustand persist — user, token, isAuthenticated */
  authStore: "teksage-auth-store",
  language: "teksage_language",
  consultationDraft: "teksage_consultation_draft",
  consultationSummary: "teksage_consultation_summary",
  subscriptionCheckout: "teksage_subscription_checkout",
} as const;

/** Deprecated auth keys — migrated to `STORAGE_KEYS.authStore`; cleared on logout. */
export const LEGACY_AUTH_STORAGE_KEYS = {
  userId: "teksage_user_id",
  userProfile: "teksage_user_profile",
} as const;

// Pagination
export const PAGE_SIZE = 10;

// OTP
export const OTP_LENGTH = 6;
export const OTP_EXPIRY_SECONDS = 120;
