import { HOME_DASHBOARD_SIDEBAR_ASSETS } from "@/lib/constants/home-dashboard-sidebar";
import { ROUTES } from "@/lib/constants/routes";

/** Book consultation — customers (`user_type` === `customer`). */
export const DESKTOP_SIDEBAR_BOOK_LINK = {
  href: ROUTES.consultation,
  labelKey: "bookConsultation" as const,
  icon: HOME_DASHBOARD_SIDEBAR_ASSETS.bookConsultation,
} as const;

/** Astrologer portal — replaces book link when `user_type` is not `customer`. */
export const DESKTOP_SIDEBAR_ASTROLOGER_PORTAL_LINK = {
  href: ROUTES.astrologer,
  labelKey: "astrologerPortal" as const,
  icon: HOME_DASHBOARD_SIDEBAR_ASSETS.astrologerPortal,
} as const;

export const DESKTOP_SIDEBAR_DAILY_PREDICTION_LINK = {
  href: ROUTES.predictionsDaily,
  icon: HOME_DASHBOARD_SIDEBAR_ASSETS.dailyPredictions,
} as const;

export const DESKTOP_SIDEBAR_WEEKLY_PREDICTION_LINK = {
  href: ROUTES.predictionsWeekly,
  icon: HOME_DASHBOARD_SIDEBAR_ASSETS.weeklyPredictions,
} as const;

/** Love compatibility — formerly marriage match making. */
export const DESKTOP_SIDEBAR_LOVE_COMPATIBILITY_LINK = {
  href: ROUTES.matchmaking,
  icon: HOME_DASHBOARD_SIDEBAR_ASSETS.loveCompatibility,
} as const;

export const DESKTOP_SIDEBAR_NOTIFICATIONS_LINK = {
  href: ROUTES.notifications,
  icon: HOME_DASHBOARD_SIDEBAR_ASSETS.notification,
} as const;

export const DESKTOP_SIDEBAR_WHATSAPP_LINK = {
  href: ROUTES.whatsappUpdates,
  icon: HOME_DASHBOARD_SIDEBAR_ASSETS.whatsapp,
} as const;

export const DESKTOP_SIDEBAR_PANCHANG_LINK = {
  href: ROUTES.panchang,
  icon: HOME_DASHBOARD_SIDEBAR_ASSETS.panchang,
} as const;

export const DESKTOP_SIDEBAR_MUHURTHA_LINK = {
  href: ROUTES.muhurtha,
  icon: HOME_DASHBOARD_SIDEBAR_ASSETS.muhurtha,
} as const;

export const DESKTOP_SIDEBAR_SETTINGS_LINK = {
  href: ROUTES.settings,
  icon: HOME_DASHBOARD_SIDEBAR_ASSETS.settings,
} as const;

export const DESKTOP_SIDEBAR_GETTING_STARTED_LINK = {
  href: ROUTES.gettingStarted,
  icon: HOME_DASHBOARD_SIDEBAR_ASSETS.gettingStarted,
} as const;

export const DESKTOP_SIDEBAR_AI_CHAT_HREF = ROUTES.home;
