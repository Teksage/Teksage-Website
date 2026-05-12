import { STORAGE_KEYS } from "@/lib/constants";

const MAX_AGE_SEC = 60 * 60 * 24 * 7;

export function setAuthCookie(token: string): void {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(token);
  document.cookie = `${STORAGE_KEYS.authToken}=${value}; Path=/; Max-Age=${MAX_AGE_SEC}; SameSite=Lax`;
}

export function clearAuthCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${STORAGE_KEYS.authToken}=; Path=/; Max-Age=0`;
}
