import { DASHBOARD_ASSETS } from "./assets";

/** Primary app tabs — shared by mobile bottom nav and desktop rail. */
export const MAIN_NAV_ITEMS = [
  {
    href: "/home",
    label: "Home",
    iconOn: DASHBOARD_ASSETS.navHomeOn,
    iconOff: DASHBOARD_ASSETS.navHomeOff,
  },
  {
    href: "/panchang",
    label: "Panchang",
    iconOn: DASHBOARD_ASSETS.navPanchangOn,
    iconOff: DASHBOARD_ASSETS.navPanchangOff,
  },
  {
    href: "/horoscope",
    label: "Horoscope",
    iconOn: DASHBOARD_ASSETS.navHoroscopeOn,
    iconOff: DASHBOARD_ASSETS.navHoroscopeOff,
  },
  {
    href: "/settings",
    label: "Settings",
    iconOn: DASHBOARD_ASSETS.navSettingsOn,
    iconOff: DASHBOARD_ASSETS.navSettingsOff,
  },
] as const;
