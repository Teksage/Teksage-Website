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
  settingsChangeContact: "/settings/change-contact",
  settingsSubscriptions: "/settings/subscriptions",
  settingsSubscriptionPayment: "/settings/subscriptions/payment",
  gettingStarted: "/getting-started",
  profile: "/profile",
  login: "/login",
  welcome: "/welcome",
  onboarding: "/onboarding",
  notifications: "/notifications",
  whatsappUpdates: "/whatsapp-updates",
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
  astrologerChatPrompts: "/astrologer/chat-prompts",
  predictions: "/predictions",
  predictionsDaily: "/predictions/daily",
  predictionsWeekly: "/predictions/weekly",
  predictionsYearly: "/predictions/yearly",
  predictionsLife: "/predictions/life",
  matchmaking: "/matchmaking",
  matchmakingDetails: "/matchmaking/details",
  muhurtha: "/muhurtha",

  // Ask Astrologer flow
  askAstrologerLanguages: "/ask-astrologer/languages",
  askAstrologerCheckout: "/ask-astrologer/checkout",
  askAstrologerWhatsappConsent: "/ask-astrologer/whatsapp-consent",
  askAstrologerConfirmation: "/ask-astrologer/confirmation",

  // Astrologer portal — Ask requests
  astrologerAskRequests: "/astrologer/ask-requests",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

const ASK_ASTROLOGER_FLOW_PATHS = [
  ROUTES.askAstrologerLanguages,
  ROUTES.askAstrologerCheckout,
  ROUTES.askAstrologerWhatsappConsent,
  ROUTES.askAstrologerConfirmation,
] as const;

/** True while the customer is in the Ask Astrologer purchase / consent flow. */
export function isAskAstrologerFlowPath(pathname: string): boolean {
  return ASK_ASTROLOGER_FLOW_PATHS.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export function isPredictionsPath(pathname: string): boolean {
  return (
    pathname === ROUTES.predictions || pathname.startsWith(`${ROUTES.predictions}/`)
  );
}

/** Query key used by `SettingsMenu` and login return navigation. */
export const LOGIN_REDIRECT_QUERY = "redirect" as const;
