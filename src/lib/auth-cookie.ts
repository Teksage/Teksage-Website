import { STORAGE_KEYS } from "@/lib/constants";
import { WEB_AUTH_COOKIE_MAX_AGE_SEC } from "@/lib/constants/auth-http";

export function setAuthCookie(token: string): void {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(token);
  document.cookie = `${STORAGE_KEYS.authToken}=${value}; Path=/; Max-Age=${WEB_AUTH_COOKIE_MAX_AGE_SEC}; SameSite=Lax`;
}

export function clearAuthCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${STORAGE_KEYS.authToken}=; Path=/; Max-Age=0`;
}
