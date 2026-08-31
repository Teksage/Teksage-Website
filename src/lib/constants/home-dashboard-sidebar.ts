import { DASHBOARD_ASSETS } from "@/lib/constants/assets";
import { ROUTES } from "@/lib/constants/routes";

/** Desktop home dashboard left rail — design ref sidebar. */
export const HOME_DASHBOARD_SIDEBAR = {
  hello: "Hello",
  helloGuest: "there",
  aiChatLine1: "24/7",
  aiChatLine2: "Astro AI Chat",
  bookConsultation: "Book Consultation",
  /** Astrologer desktop sidebar — mirrors mobile home `My Profile` → `/astrologer`. */
  astrologerPortal: "My Profile",
  otherPredictions: "Other Predictions",
  dailyPredictions: "Daily Predictions",
  weeklyPredictions: "Weekly Predictions",
  yearlyPredictions: "Yearly Predictions",
  lifePredictions: "Life Predictions",
  loveCompatibility: "Love Compatibility",
  panchangam: "Panchang",
  eventPlanner: "Event Planner (Muhurtha)",
  horoscope: "Horoscope",
  subscriptions: "Subscriptions",
  unlockPremium: "Unlock Premium",
  unlockPremiumHint: "Get advanced insights & personalized guidance",
  premiumBadge: "PREMIUM",
  upgradeNow: "Upgrade Now",
} as const;

export const HOME_DASHBOARD_SIDEBAR_ASSETS = {
  aiChatIcon: DASHBOARD_ASSETS.chatBotLogo,
  bookConsultation: DASHBOARD_ASSETS.sidebarCalendar,
  astrologerPortal: DASHBOARD_ASSETS.sidebarProfile,
  dailyPredictions: DASHBOARD_ASSETS.sidebarFolder,
  weeklyPredictions: DASHBOARD_ASSETS.sidebarWeekly,
  otherPredictions: DASHBOARD_ASSETS.sidebarFolder,
  loveCompatibility: DASHBOARD_ASSETS.sidebarMarriage,
  panchang: DASHBOARD_ASSETS.navPanchangOff,
  eventPlanner: DASHBOARD_ASSETS.sidebarMuhurtha,
  horoscope: DASHBOARD_ASSETS.navHoroscopeOff,
  subscriptions: DASHBOARD_ASSETS.sidebarPremiumCrown,
  premiumCrown: DASHBOARD_ASSETS.sidebarPremiumCrown,
  predictionsChevron: DASHBOARD_ASSETS.sidebarChevronDown,
} as const;

export const HOME_DASHBOARD_OTHER_PREDICTION_LINKS = [
  { href: ROUTES.predictionsYearly, label: HOME_DASHBOARD_SIDEBAR.yearlyPredictions },
  { href: ROUTES.predictionsLife, label: HOME_DASHBOARD_SIDEBAR.lifePredictions },
  { href: ROUTES.horoscope, label: HOME_DASHBOARD_SIDEBAR.horoscope },
] as const;

/** Indented predictions submenu — aligns with sidebar icon + label. */
export const HOME_DASHBOARD_PREDICTIONS_SUBMENU_INDENT = "pl-11" as const;
