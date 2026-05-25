/**
 * In-app path segments — single source for links and redirects.
 * Nav labels/icons stay in `main-nav.ts`; hrefs must match these values.
 */

export const ROUTES = {
  root: "/",
  home: "/home",
  panchang: "/panchang",
  horoscope: "/horoscope",
  settings: "/settings",
  settingsSubscriptions: "/settings/subscriptions",
  settingsSubscriptionPayment: "/settings/subscriptions/payment",
  profile: "/profile",
  login: "/login",
  notifications: "/notifications",
  chat: "/chat",
  consultation: "/consultation",
  consultationLanguage: "/consultation/language",
  consultationAstrologers: "/consultation/astrologers",
  consultationSummary: "/consultation/summary",
  /** Astrologer-facing hub (logged-in astrologer) — redirects to /astrologer. */
  consultationAstrologer: "/consultation/astrologer",
  /** Astrologer portal root — dashboard with Meetings + Availability cards. */
  astrologer: "/astrologer",
  astrologerMeetings: "/astrologer/meetings",
  astrologerAvailability: "/astrologer/availability",
  predictions: "/predictions",
  predictionsDaily: "/predictions/daily",
  predictionsWeekly: "/predictions/weekly",
  predictionsYearly: "/predictions/yearly",
  predictionsLife: "/predictions/life",
  matchmaking: "/matchmaking",
  matchmakingDetails: "/matchmaking/details",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

/** Query key used by `SettingsMenu` and login return navigation. */
export const LOGIN_REDIRECT_QUERY = "redirect" as const;
