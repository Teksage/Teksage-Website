import { PARTNER_REFERRAL_STORAGE_KEY } from "@/lib/constants/partner-referral";
import { LOGIN_REDIRECT_QUERY } from "@/lib/constants/routes";

export function savePartnerRefCode(code: string): void {
  const normalized = code.trim().toUpperCase();
  if (!normalized || typeof window === "undefined") return;
  localStorage.setItem(PARTNER_REFERRAL_STORAGE_KEY, normalized);
}

export function readPartnerRefCode(): string | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(PARTNER_REFERRAL_STORAGE_KEY);
  return value?.trim().toUpperCase() || null;
}

export function clearPartnerRefCode(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PARTNER_REFERRAL_STORAGE_KEY);
}

/** Capture `?ref=` once on client and store for Profile autofill. */
export function capturePartnerRefFromSearch(search: string): void {
  const params = new URLSearchParams(
    search.startsWith("?") ? search.slice(1) : search
  );
  const ref = params.get("ref");
  if (ref) savePartnerRefCode(ref);
}

/**
 * Capture from the live URL: top-level `?ref=` or nested inside
 * `/login?redirect=/home?ref=CODE`.
 */
export function capturePartnerRefFromLocation(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const direct = params.get("ref");
  if (direct) {
    savePartnerRefCode(direct);
    return;
  }

  const redirectRaw = params.get(LOGIN_REDIRECT_QUERY);
  if (!redirectRaw) return;
  try {
    const decoded = decodeURIComponent(redirectRaw.trim());
    const q = decoded.indexOf("?");
    if (q < 0) return;
    const nested = new URLSearchParams(decoded.slice(q + 1));
    const nestedRef = nested.get("ref");
    if (nestedRef) savePartnerRefCode(nestedRef);
  } catch {
    /* ignore malformed redirect */
  }
}
