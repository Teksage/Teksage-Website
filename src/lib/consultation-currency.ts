import {
  CONSULTATION_FOREIGN_LOCATION_HINTS,
  CONSULTATION_INDIA_TIMEZONES,
} from "@/lib/constants/consultation-currency";
import { DEFAULT_COUNTRY_CODE_NUMERIC } from "@/lib/constants/default-region";

export type ConsultationCurrency = "INR" | "USD";

export type ConsultationCurrencyContext = {
  countryCode?: string | null;
  timezone?: string | null;
};

function normalizeCountryCode(countryCode?: string | null): string {
  return (countryCode ?? "").replace(/\D/g, "");
}

function isIndiaLocationText(location: string): boolean {
  const loc = location.trim().toLowerCase();
  if (!loc) return false;
  if (loc === "india" || loc === "in") return true;
  if (loc.includes("india")) return true;
  return false;
}

function isForeignLocationText(location: string): boolean {
  const loc = location.trim().toLowerCase();
  return CONSULTATION_FOREIGN_LOCATION_HINTS.some((hint) => loc.includes(hint));
}

/**
 * INR vs USD — mirrors Flutter `CurrencyService.getCurrency` (IN → INR).
 * Defaults to INR (India-first); only USD when clearly outside India.
 */
export function consultationCurrencyForLocation(
  preferredLocation?: string | null,
  context?: ConsultationCurrencyContext
): ConsultationCurrency {
  const code = normalizeCountryCode(context?.countryCode);
  if (code === DEFAULT_COUNTRY_CODE_NUMERIC) return "INR";

  const tz = context?.timezone?.trim();
  if (tz && (CONSULTATION_INDIA_TIMEZONES as readonly string[]).includes(tz)) {
    return "INR";
  }

  const loc = preferredLocation?.trim() ?? "";
  if (!loc) return "INR";
  if (isIndiaLocationText(loc)) return "INR";
  if (isForeignLocationText(loc)) return "USD";

  return "INR";
}

export function consultationFeeForAstrologer(
  astrologer: {
    local_consulting_fee?: number;
    foreign_consulting_fee?: number;
  },
  currency: ConsultationCurrency
): number {
  if (currency === "INR") {
    return astrologer.local_consulting_fee ?? 0;
  }
  return astrologer.foreign_consulting_fee ?? 0;
}

export function formatConsultationFee(amount: number, currency: string): string {
  if (currency === "INR") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 2,
  }).format(amount);
}
