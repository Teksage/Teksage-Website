// Backend API — path segments only (no host). Base URL comes from `.env.local`
// via `getPublicApiBaseUrl()` in `@/lib/env` (used by `src/lib/services/http.ts`).

export const API_ENDPOINTS = {
  // Auth — paths match FastAPI `api/endpoints/auth.py` + `routers.py` (`/api` + `/auth` prefix)
  login: "/api/auth/login",
  loginWithMobile: "/api/auth/login/mobile",
  /** `POST` body: `LoginSchema` — `email` and/or `mobile_number` + `country_code` */
  sendOtp: "/api/auth/otp/request",
  /** `POST` body: `VerifyOTPSchema` — `email` or `mobile_number` + `country_code`, `otp` */
  verifyOtp: "/api/auth/otp/login-verify",
  refreshToken: "/api/auth/refresh",
  logout: "/api/auth/logout",

  // User / Profile
  profile: "/api/user/profile",
  updateProfile: "/api/user/profile/update",
  deleteAccount: "/api/user/delete",

  // Home / Dashboard
  dashboard: "/api/home/dashboard",
  notifications: "/api/notifications",

  // Predictions
  dailyPrediction: "/api/prediction/daily",
  weeklyPrediction: "/api/prediction/weekly",
  yearlyPrediction: "/api/prediction/yearly",
  lifePrediction: "/api/prediction/life",

  // Panchang
  panchang: "/api/panchang",

  // Horoscope
  horoscope: "/api/horoscope",

  // Match Making
  matchMaking: "/api/matchmaking",
  matchMakingDetails: "/api/matchmaking/details",

  // Chat
  chat: "/api/chat",
  chatHistory: "/api/chat/history",

  // Consultation
  consultationList: "/api/consultation/astrologers",
  consultationBook: "/api/consultation/book",
  consultationHistory: "/api/consultation/history",

  // Subscription
  subscriptionPlans: "/api/subscription/plans",
  subscriptionStatus: "/api/subscription/status",
  subscriptionPurchase: "/api/subscription/purchase",
} as const;

export type ApiEndpointKey = keyof typeof API_ENDPOINTS;
