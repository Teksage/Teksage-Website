import { API_ENDPOINTS } from "@/lib/constants/api";
import {
  YEARLY_2027_PROMO_STORAGE_KEY,
  YEARLY_2027_PROMO_STORAGE_KEY_LEGACY,
} from "@/lib/constants/yearly-2027-promo";
import { HTTP_TIMEOUTS } from "@/lib/constants/http-timeouts";
import { http } from "@/lib/services/http";
import type {
  Yearly2027PromoStatus,
  Yearly2027Scores,
} from "@/types/yearly-2027-promo";

type ApiScores = {
  career?: number;
  relationship?: number;
  finance?: number;
  health?: number;
};

type ApiStatus = {
  show_banner?: boolean;
  show_sheet?: boolean;
  hidden_today?: boolean;
  scores?: ApiScores | null;
  is_premium?: boolean;
  has_yearly?: boolean;
  generating?: boolean;
};

function parseScores(raw: ApiScores | null | undefined): Yearly2027Scores | null {
  if (!raw) return null;
  const career = Number(raw.career);
  const relationship = Number(raw.relationship);
  const finance = Number(raw.finance);
  const health = Number(raw.health);
  const vals = [career, relationship, finance, health];
  if (vals.some((n) => !Number.isFinite(n) || n < 1 || n > 5)) return null;
  return { career, relationship, finance, health };
}

function mapStatus(raw: ApiStatus): Yearly2027PromoStatus {
  return {
    showBanner: Boolean(raw.show_banner),
    showSheet: Boolean(raw.show_sheet),
    hiddenToday: Boolean(raw.hidden_today),
    scores: parseScores(raw.scores),
    isPremium: Boolean(raw.is_premium),
    hasYearly: Boolean(raw.has_yearly),
    generating: Boolean(raw.generating),
  };
}

export async function fetchYearly2027PromoStatus(
  ensure = true
): Promise<Yearly2027PromoStatus> {
  const { data } = await http.get<ApiStatus>(
    `${API_ENDPOINTS.yearly2027PromoStatus}?ensure=${ensure ? "true" : "false"}`,
    { timeout: HTTP_TIMEOUTS.prediction }
  );
  return mapStatus(data ?? {});
}

export async function dismissYearly2027Promo(): Promise<Yearly2027PromoStatus> {
  const { data } = await http.post<ApiStatus>(
    API_ENDPOINTS.yearly2027PromoDismiss,
    {}
  );
  return mapStatus(data ?? {});
}

export function readPromoHiddenLocal(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const current = window.localStorage.getItem(YEARLY_2027_PROMO_STORAGE_KEY);
    if (current) return current;
    const legacy = window.localStorage.getItem(YEARLY_2027_PROMO_STORAGE_KEY_LEGACY);
    if (legacy) {
      window.localStorage.setItem(YEARLY_2027_PROMO_STORAGE_KEY, legacy);
      window.localStorage.removeItem(YEARLY_2027_PROMO_STORAGE_KEY_LEGACY);
      return legacy;
    }
    return null;
  } catch {
    return null;
  }
}

export function writePromoHiddenLocal(isoDate: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(YEARLY_2027_PROMO_STORAGE_KEY, isoDate);
    window.localStorage.removeItem(YEARLY_2027_PROMO_STORAGE_KEY_LEGACY);
  } catch {
    /* ignore quota */
  }
}

export function clearPromoHiddenLocal(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(YEARLY_2027_PROMO_STORAGE_KEY);
    window.localStorage.removeItem(YEARLY_2027_PROMO_STORAGE_KEY_LEGACY);
  } catch {
    /* ignore */
  }
}

export function localTodayIso(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
