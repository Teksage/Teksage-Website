import { HOME_DASHBOARD_SIDEBAR_ASSETS } from "@/lib/constants/home-dashboard-sidebar";
import { ROUTES } from "@/lib/constants/routes";

/** Book consultation — directly under AI chat highlight. */
export const DESKTOP_SIDEBAR_BOOK_LINK = {
  href: ROUTES.consultation,
  labelKey: "bookConsultation" as const,
  icon: HOME_DASHBOARD_SIDEBAR_ASSETS.bookConsultation,
} as const;

/** Marriage match making — after predictions submenu. */
export const DESKTOP_SIDEBAR_MARRIAGE_LINK = {
  href: ROUTES.matchmaking,
  labelKey: "marriageMatchMaking" as const,
  icon: HOME_DASHBOARD_SIDEBAR_ASSETS.marriage,
} as const;

/** Panchang, horoscope, settings — below primary dashboard actions. */
export const DESKTOP_SIDEBAR_UTILITY_LINKS = [
  {
    href: ROUTES.panchang,
    labelKey: "panchang" as const,
    icon: HOME_DASHBOARD_SIDEBAR_ASSETS.panchang,
  },
  {
    href: ROUTES.horoscope,
    labelKey: "horoscope" as const,
    icon: HOME_DASHBOARD_SIDEBAR_ASSETS.horoscope,
  },
  {
    href: ROUTES.settings,
    labelKey: "settings" as const,
    icon: HOME_DASHBOARD_SIDEBAR_ASSETS.settings,
  },
] as const;

export const DESKTOP_SIDEBAR_AI_CHAT_HREF = ROUTES.home;
