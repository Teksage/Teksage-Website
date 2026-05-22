import { STORAGE_KEYS } from "@/lib/constants";
import { clearAuthCookie } from "@/lib/auth-cookie";
import { ROUTES } from "@/lib/constants/routes";
import { useAuthStore } from "@/store/auth.store";

const AUTH_LOCAL_STORAGE_KEYS = [
  STORAGE_KEYS.authToken,
  STORAGE_KEYS.refreshToken,
  STORAGE_KEYS.userId,
  STORAGE_KEYS.userProfile,
] as const;

/** Clears auth tokens, cookie, and persisted Zustand session (keeps language & other prefs). */
export function clearAuthSession(): void {
  if (typeof window === "undefined") return;
  AUTH_LOCAL_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  clearAuthCookie();
  useAuthStore.getState().clearAuth();
}

export function hasClientAuthToken(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(localStorage.getItem(STORAGE_KEYS.authToken)?.trim());
}

/** True when the browser has a token for API calls (source of truth for "logged in"). */
export function isClientLoggedIn(): boolean {
  return hasClientAuthToken();
}

/** After session loss on a protected URL, return to home. */
export function redirectHomeFromProtectedIfNeeded(): void {
  if (typeof window === "undefined") return;
  const path = window.location.pathname;
  if (path === ROUTES.home || path.startsWith(`${ROUTES.home}/`)) return;
  if (path === ROUTES.login || path.startsWith(`${ROUTES.login}/`)) return;
  window.location.replace(ROUTES.home);
}
