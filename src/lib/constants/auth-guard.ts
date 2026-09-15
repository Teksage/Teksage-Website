import { ROUTES } from "@/lib/constants/routes";

/** Settings sub-routes that stay public without a session. */
const SETTINGS_PUBLIC_SECTIONS = new Set([
  "language",
  "terms",
  "privacy",
  "faq",
]);

const AUTH_PATH_PREFIXES = [
  ROUTES.chat,
  ROUTES.consultation,
  ROUTES.predictions,
  ROUTES.matchmaking,
  ROUTES.profile,
  ROUTES.panchang,
  ROUTES.eventPlanner,
  ROUTES.horoscope,
  ROUTES.notifications,
  ROUTES.whatsappUpdates,
  ROUTES.settingsSubscriptions,
  ROUTES.askAstrologerLanguages,
  ROUTES.astrologer,
] as const;

function settingsSectionRequiresAuth(pathname: string): boolean {
  if (!pathname.startsWith(`${ROUTES.settings}/`)) return false;
  const section = pathname.slice(`${ROUTES.settings}/`.length).split("/")[0];
  if (!section) return false;
  return !SETTINGS_PUBLIC_SECTIONS.has(section);
}

/** Cookie name for web session — keep in sync with `STORAGE_KEYS.authToken`. */
export const AUTH_TOKEN_COOKIE = "teksage_auth_token" as const;

/** True when middleware / server should require `teksage_auth_token` cookie. */
export function pathRequiresAuth(pathname: string): boolean {
  if (pathname === ROUTES.profile) return true;
  if (settingsSectionRequiresAuth(pathname)) return true;
  return AUTH_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

/** Full Horoscope — guests must log in, then return here. */
export function isFullHoroscopePath(pathname: string): boolean {
  return (
    pathname === ROUTES.horoscopeFull ||
    pathname.startsWith(`${ROUTES.horoscopeFull}/`)
  );
}
