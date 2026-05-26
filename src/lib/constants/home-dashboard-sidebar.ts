import { DASHBOARD_ASSETS } from "@/lib/constants/assets";
import { ROUTES } from "@/lib/constants/routes";

/** Desktop home dashboard left rail — design ref sidebar. */
export const HOME_DASHBOARD_SIDEBAR = {
  aiChatLine1: "24x7 AI Voice",
  aiChatLine2: "Astro Chat",
  bookConsultationLine1: "Book Astrologer",
  bookConsultationLine2: "Consultation",
  /** Astrologer desktop sidebar — mirrors mobile home `My Profile` → `/astrologer`. */
  astrologerPortal: "My Profile",
  predictions: "Predictions",
  dailyPredictions: "Daily Predictions",
  weeklyPredictions: "Weekly Predictions",
  yearlyPredictions: "Yearly Predictions",
  lifePredictions: "Life Predictions",
  marriageLine1: "Marriage",
  marriageLine2: "Match Making",
  notifications: "Notifications",
  panchang: "Panchang",
  horoscope: "Horoscope",
  settings: "Settings",
  unlockPremium: "Unlock Premium",
  unlockPremiumHint: "Get advanced insights and personalized guidance",
  upgradeNow: "Upgrade Now",
  chatLoginTitle: "Sign in to chat",
  chatLoginHint: "Log in to use AI Voice Astro Chat on your dashboard.",
  chatLoginCta: "Log in",
} as const;

export const HOME_DASHBOARD_SIDEBAR_ASSETS = {
  aiChatIcon: DASHBOARD_ASSETS.chatBotLogo,
  bookConsultation: DASHBOARD_ASSETS.sidebarCalendar,
  astrologerPortal: DASHBOARD_ASSETS.sidebarProfile,
  predictions: DASHBOARD_ASSETS.sidebarFolder,
  marriage: DASHBOARD_ASSETS.sidebarMarriage,
  notification: DASHBOARD_ASSETS.sidebarNotification,
  panchang: DASHBOARD_ASSETS.navPanchangOff,
  horoscope: DASHBOARD_ASSETS.navHoroscopeOff,
  settings: DASHBOARD_ASSETS.navSettingsOff,
  premiumCrown: DASHBOARD_ASSETS.sidebarPremiumCrown,
  predictionsChevron: DASHBOARD_ASSETS.sidebarChevronDown,
} as const;

export const HOME_DASHBOARD_PREDICTION_LINKS = [
  { href: ROUTES.predictionsDaily, label: HOME_DASHBOARD_SIDEBAR.dailyPredictions },
  { href: ROUTES.predictionsWeekly, label: HOME_DASHBOARD_SIDEBAR.weeklyPredictions },
  { href: ROUTES.predictionsYearly, label: HOME_DASHBOARD_SIDEBAR.yearlyPredictions },
  { href: ROUTES.predictionsLife, label: HOME_DASHBOARD_SIDEBAR.lifePredictions },
] as const;

/** Indented predictions submenu — aligns with sidebar icon + label. */
export const HOME_DASHBOARD_PREDICTIONS_SUBMENU_INDENT = "pl-[3.25rem]" as const;
