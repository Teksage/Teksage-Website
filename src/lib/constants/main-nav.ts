import { DASHBOARD_ASSETS } from "./assets";
import { ROUTES } from "./routes";

/** Primary app tabs — shared by mobile bottom nav and desktop rail. */
export const MAIN_NAV_ITEMS = [
  {
    href: ROUTES.home,
    label: "Home",
    iconOn: DASHBOARD_ASSETS.navHomeOn,
    iconOff: DASHBOARD_ASSETS.navHomeOff,
  },
  {
    href: ROUTES.panchang,
    label: "Panchang",
    iconOn: DASHBOARD_ASSETS.navPanchangOn,
    iconOff: DASHBOARD_ASSETS.navPanchangOff,
  },
  {
    href: ROUTES.horoscope,
    label: "Horoscope",
    iconOn: DASHBOARD_ASSETS.navHoroscopeOn,
    iconOff: DASHBOARD_ASSETS.navHoroscopeOff,
  },
  {
    href: ROUTES.settings,
    label: "Settings",
    iconOn: DASHBOARD_ASSETS.navSettingsOn,
    iconOff: DASHBOARD_ASSETS.navSettingsOff,
  },
] as const;
