import {
  CONSULTATION_INDIA_TIMEZONES,
  FOREIGN_LOCATION_HINTS,
  INDIA_LOCATION_HINTS,
} from "@/lib/constants/consultation-currency";
import { DEFAULT_COUNTRY_CODE_NUMERIC } from "@/lib/constants/default-region";

export type ConsultationCurrency = "INR" | "USD";

export type ConsultationCurrencyContext = {
  countryCode?: string | null;
  /** Prefer profile/API timezone over the browser clock. */
  timezone?: string | null;
  browserTimezone?: string | null;
};

function normalizeCountryCode(countryCode?: string | null): string {
  return (countryCode ?? "").replace(/\D/g, "");
}

function isIndiaLocationText(location: string): boolean {
  const loc = location.trim().toLowerCase();
  if (!loc) return false;
  if (loc === "india" || loc === "in" || loc === "ind") return true;
  return INDIA_LOCATION_HINTS.some((hint) => loc.includes(hint));
}

function isForeignLocationText(location: string): boolean {
  const loc = location.trim().toLowerCase();
  if (!loc) return false;
  return FOREIGN_LOCATION_HINTS.some((hint) => loc.includes(hint));
}

function isIndiaTimezone(timezone?: string | null): boolean {
  const tz = timezone?.trim();
  return Boolean(
    tz && (CONSULTATION_INDIA_TIMEZONES as readonly string[]).includes(tz)
  );
}

function isUsableTimezone(timezone?: string | null): boolean {
  const tz = timezone?.trim();
  return Boolean(tz && tz.toUpperCase() !== "UTC");
}

/**
 * Currency resolution:
 * 1. Explicit foreign location text (e.g. 'USA', 'Dubai') -> USD
 * 2. Explicit India location text (e.g. 'Dindigul', 'Chennai', 'India') -> INR
 * 3. Indian dial code (+91) -> INR
 * 4. Explicit foreign dial code (e.g. +1, +44) -> USD
 * 5. Indian timezone (Asia/Kolkata, Asia/Calcutta, IST) -> INR
 * 6. Non-empty location not recognized as foreign -> INR
 * 7. Foreign timezone without Indian location/code -> USD
 * 8. Default fallback -> INR
 */
export function consultationCurrencyForLocation(
  preferredLocation?: string | null,
  context?: ConsultationCurrencyContext
): ConsultationCurrency {
  const loc = preferredLocation?.trim() ?? "";
  if (loc) {
    if (isForeignLocationText(loc)) return "USD";
    if (isIndiaLocationText(loc)) return "INR";
  }

  // 1. Check Indian dial code
  const code = normalizeCountryCode(context?.countryCode);
  if (code === DEFAULT_COUNTRY_CODE_NUMERIC) return "INR";

  // 2. Check foreign dial code
  if (code && code !== DEFAULT_COUNTRY_CODE_NUMERIC) return "USD";

  // 3. Check Indian timezones (from user profile or browser)
  if (isIndiaTimezone(context?.timezone)) return "INR";
  if (isIndiaTimezone(context?.browserTimezone)) return "INR";

  // 4. Any custom location not flagged as foreign defaults to INR
  if (loc && !isForeignLocationText(loc)) return "INR";

  // 5. Explicit foreign timezone (only if no Indian hints present)
  if (isUsableTimezone(context?.timezone) && !isIndiaTimezone(context?.timezone)) {
    return "USD";
  }
  if (
    isUsableTimezone(context?.browserTimezone) &&
    !isIndiaTimezone(context?.browserTimezone)
  ) {
    return "USD";
  }

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
  const code = assertConsultationCurrency(currency);
  if (code === "INR") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);
}

/** Normalize order/API currency before Razorpay — never pass null/empty. */
export function assertConsultationCurrency(
  value: string | null | undefined,
  fallback: ConsultationCurrency = "INR"
): ConsultationCurrency {
  const normalized = (value ?? "").trim().toUpperCase();
  if (normalized === "INR" || normalized === "USD") return normalized;
  return fallback;
}
