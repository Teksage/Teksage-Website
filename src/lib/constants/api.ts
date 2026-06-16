// Backend API — path segments only (no host). Base URL from `.env.local`
// via `getPublicApiBaseUrl()` in `@/lib/env` (used by `http.ts`).
// Contract: FastAPI `app.include_router(api_router, prefix="/api")` +
// `api/routers.py` (see repo `Teksage-backend-latest`).

export const API_ENDPOINTS = {
  // --- Auth (OTP) — `api/endpoints/auth.py`, mount `/auth` ---
  /** `POST` — `LoginSchema`: email and/or mobile_number + country_code */
  // Keep OTP request path without trailing slash.
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
  /**
   * Web (same-origin): `app/api/auth/register-token` route handler → FastAPI.
   * Direct FastAPI calls must use `registerTokenFastApi` (trailing slash).
   */
  registerToken: "/api/auth/register-token",
  /** FastAPI `auth.py` route — trailing slash required; do not change for mobile parity. */
  registerTokenFastApi: "/api/auth/register-token/",
  updateAppLanguage: "/api/auth/update-app-language",
  deleteAccountRequest: "/api/auth/delete/request",
  deleteAccountConfirm: "/api/auth/delete/confirm",

  // --- Notifications — `api/endpoints/notification.py` ---
  notifications: "/api/notifications",
  notificationsUpdateStatus: "/api/notifications/update-status",

  // --- WhatsApp (Gupshup) — `api/endpoints/whatsapp.py` ---
  whatsappConsentStatus: "/api/whatsapp/consent/status",
  whatsappConsentRequest: "/api/whatsapp/consent/request",
  whatsappConsentRevoke: "/api/whatsapp/consent/revoke",

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

  // --- AI chat — `main.py` registers `/chat`; router also exposes `/api/chat` (same handler) ---
  /** WebSocket path — matches Flutter `ApiEndpoint.chatUrl` (`ws://<host>/chat`). */
  chatWebSocket: "/chat",
  downloadChatPdf: "/api/download-chat-pdf",
  transcribeAudio: "/api/transcribe-audio",

  // --- Chat history — `chat_history.py` at API root ---
  chatHistory: "/api/chat-history",
  chatHistoryDownload: "/api/chat-history/download",

  // --- Payment — `payment.py`, mount `/payment` ---
  paymentVerify: "/api/payment/verify-payment/",
  paymentSubscribe: "/api/payment/subscribe",
  /** `POST` — Razorpay subscription (auto-renew); body `plan_id`, `currency`. */
  paymentSubscribeAuto: "/api/payment/subscribe-auto",
  /** `POST` — verify Razorpay subscription payment signature. */
  paymentVerifyAutoPay: "/api/payment/verify-auto-payment/",
  /** `POST` — cancel active auto-renew subscription. */
  paymentCancelAutoPay: "/api/payment/cancel-auto-pay",
  paymentApplyCoupon: "/api/payment/apply-coupon",
  paymentIosSubscription: "/api/payment/ios-subscription",

  // --- Plans — `admin/subscriptions.py`; public list GET ---
  /** Public list GET — no trailing slash (Vercel strips `/` before rewrite; backend route requires `/`). */
  serviceCatalogs: "/api/admin/service-catalogs",

  // --- Share PDF — `share_predictions.py` ---
  shareDaily: "/api/share/daily",
  shareWeekly: "/api/share/weekly",
  shareYearly: "/api/share/yearly",
  shareLife: "/api/share/life",
  sharePanchang: "/api/share/panchang",
  shareMatchMaking: "/api/share/match_making",

  // --- Chat prompts — `chat_prompts.py` ---
  /** `GET` — list prompts | `POST` — create prompt */
  chatPrompts: "/api/chat-prompts/",
  /** `PUT` — toggle prompt active/inactive */
  chatPromptsStatus: "/api/chat-prompts/status",

  // --- FAQ — `faq.py`, mount `/faq` ---
  faq: "/api/faq/",

  // --- Countries — `country.py` ---
  countries: "/api/countries",

  // --- Ask Astrologer — `ask_astrologer.py`, mount `/ask-astrologer` ---
  askAstrologerPricing: "/api/ask-astrologer/pricing",
  askAstrologerCreate: "/api/ask-astrologer/create",
  askAstrologerVerify: "/api/ask-astrologer/verify",
  askAstrologerRequests: "/api/ask-astrologer/requests",
  /** Most recent answered request pending the answer-ready popup. */
  askAstrologerPendingAnswerPopup: "/api/ask-astrologer/pending-answer-popup",
  /** Append `/{request_id}/acknowledge-answer-ready` — mark popup as seen. */
  askAstrologerAcknowledgeAnswerReady: "/api/ask-astrologer",
  /** Append `/{request_id}` — single request detail for the logged-in customer. */
  askAstrologerRequest: "/api/ask-astrologer",

  // --- Astrologer portal: Ask requests ---
  astrologerAskRequests: "/api/astrologer/ask-requests",
} as const;

export type ApiEndpointKey = keyof typeof API_ENDPOINTS;
