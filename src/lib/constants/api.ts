// Backend API — path segments only (no host). Base URL from `.env.local`
// via `getPublicApiBaseUrl()` in `@/lib/env` (used by `http.ts`).
// Contract: FastAPI `app.include_router(api_router, prefix="/api")` +
// `api/routers.py` (see repo `Teksage-backend-latest`).

export const API_ENDPOINTS = {
  // --- Auth (OTP) — `api/endpoints/auth.py`, mount `/auth` ---
  /** `POST` — `LoginSchema`: email and/or mobile_number + country_code */
  sendOtp: "/api/auth/otp/request",
  /** `POST` — `VerifyOTPSchema` + OTP */
  verifyOtp: "/api/auth/otp/login-verify",
  /** Authenticated — send OTP (`LoginSchema`). */
  sendAuthenticatedOtp: "/api/auth/otp/send-authenticated",
  /** Authenticated — verify OTP; query `update` per backend. */
  verifyAuthenticatedOtp: "/api/auth/otp/verify",
  refreshToken: "/api/auth/refresh",
  logout: "/api/auth/logout",
  /** `GET` — sync timezone from preferred location (see OpenAPI). */
  timezoneUpdate: "/api/auth/timezone/update",
  /** `GET` / `PUT` — chat history retention flag */
  maintainHistory: "/api/auth/maintain_history",

  // --- Profile — `api/endpoints/profile.py`, same `/auth` prefix ---
  profile: "/api/auth/profile",
  updateProfile: "/api/auth/update-profile",
  /** `GET` — user horoscope payload */
  horoscope: "/api/auth/horoscope",
  /** `POST` — rashi/nakshatra resolution */
  rashiNakshatra: "/api/auth/rashi-nakshatra",
  support: "/api/auth/support",
  notifyUpdate: "/api/auth/notify-update",
  registerToken: "/api/auth/register-token/",
  updateAppLanguage: "/api/auth/update-app-language",
  deleteAccountRequest: "/api/auth/delete/request",
  deleteAccountConfirm: "/api/auth/delete/confirm",

  // --- Notifications — `api/endpoints/notification.py` ---
  notifications: "/api/notifications",
  notificationsUpdateStatus: "/api/notifications/update-status",

  // --- Predictions — `api/endpoints/predictions.py`, mount `/prediction` ---
  dailyPrediction: "/api/prediction/daily",
  weeklyPrediction: "/api/prediction/weekly",
  yearlyPrediction: "/api/prediction/yearly",
  lifePrediction: "/api/prediction/life",
  panchang: "/api/prediction/panchang",
  relatedQueries: "/api/prediction/related_queries",
  /** `GET` | `POST` — match-making compatibility */
  matchMakingCompatibility: "/api/prediction/compatibility",

  // --- Horoscope PDF — `chat_history.py` at API root ---
  horoscopeDownload: "/api/horoscope/download",

  // --- Astrologer / consultation — `astrologer.py`, `events.py` ---
  astrologerFilter: "/api/astrologer/filter",
  /** Append `/{user_id}` — backend matches `Astrologer.user_id`, not PK `astrologer_id`. */
  astrologerDetail: "/api/astrologer/astrologer",
  astrologerRashi: "/api/astrologer/rashi",
  astrologerNakshatra: "/api/astrologer/nakshatra",
  astrologerSlots: "/api/astrologer/slots",
  astrologerSlotsCreate: "/api/astrologer/slots/create",
  astrologerBook: "/api/astrologer/book",
  astrologerQuestions: "/api/astrologer/questions",
  astroEvents: "/api/astrologer/events",

  // --- AI chat — `chat.py`; WebSocket handler (Flutter may use root `/chat`) ---
  /** WebSocket URL: `ws(s)://<host>/api/chat` */
  chatWebSocket: "/api/chat",
  downloadChatPdf: "/api/download-chat-pdf",
  transcribeAudio: "/api/transcribe-audio",

  // --- Chat history — `chat_history.py` at API root ---
  chatHistory: "/api/chat-history",
  chatHistoryDownload: "/api/chat-history/download",

  // --- Payment — `payment.py`, mount `/payment` ---
  paymentVerify: "/api/payment/verify-payment/",
  paymentSubscribe: "/api/payment/subscribe",
  paymentApplyCoupon: "/api/payment/apply-coupon",
  paymentIosSubscription: "/api/payment/ios-subscription",

  // --- Plans — `admin/subscriptions.py`; public list GET ---
  serviceCatalogs: "/api/admin/service-catalogs/",

  // --- Share PDF — `share_predictions.py` ---
  shareDaily: "/api/share/daily",
  shareWeekly: "/api/share/weekly",
  shareYearly: "/api/share/yearly",
  shareLife: "/api/share/life",
  sharePanchang: "/api/share/panchang",
  shareMatchMaking: "/api/share/match_making",

  // --- FAQ — `faq.py`, mount `/faq` ---
  faq: "/api/faq/",

  // --- Countries — `country.py` ---
  countries: "/api/countries",
} as const;

export type ApiEndpointKey = keyof typeof API_ENDPOINTS;
