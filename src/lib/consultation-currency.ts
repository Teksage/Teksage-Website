import {
  CONSULTATION_FOREIGN_COUNTRY_CODES,
  CONSULTATION_FOREIGN_LOCATION_HINTS,
  CONSULTATION_INDIA_TIMEZONES,
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
  if (loc === "india" || loc === "in") return true;
  if (loc.includes("india")) return true;
  return false;
}

function isForeignLocationText(location: string): boolean {
  const loc = location.trim().toLowerCase();
  if (CONSULTATION_FOREIGN_LOCATION_HINTS.some((hint) => loc.includes(hint))) {
    return true;
  }
  // Last comma segment often is the country ("Timmins, ON, Canada" / "... CA")
  const parts = loc.split(",").map((part) => part.trim()).filter(Boolean);
  const countryPart = parts.length > 1 ? parts[parts.length - 1] : "";
  if (!countryPart) return false;
  if (countryPart === "ca" || countryPart === "us" || countryPart === "usa") {
    return true;
  }
  return CONSULTATION_FOREIGN_LOCATION_HINTS.some((hint) =>
    countryPart.includes(hint)
  );
}

function isIndiaTimezone(timezone?: string | null): boolean {
  const tz = timezone?.trim();
  return Boolean(
    tz && (CONSULTATION_INDIA_TIMEZONES as readonly string[]).includes(tz)
  );
}

/**
 * INR vs USD — mirrors Flutter `CurrencyService.getCurrency` (IN → INR).
 * Profile `preferred_location` wins over phone country code (explicit user choice).
 */
export function consultationCurrencyForLocation(
  preferredLocation?: string | null,
  context?: ConsultationCurrencyContext
): ConsultationCurrency {
  const loc = preferredLocation?.trim() ?? "";
  if (loc) {
    if (isIndiaLocationText(loc)) return "INR";
    if (isForeignLocationText(loc)) return "USD";
  }

  const code = normalizeCountryCode(context?.countryCode);
  if (code === DEFAULT_COUNTRY_CODE_NUMERIC) return "INR";
  if (
    code &&
    (CONSULTATION_FOREIGN_COUNTRY_CODES as readonly string[]).includes(code)
  ) {
    return "USD";
  }

  // Profile timezone (from preferred_location) beats the browser clock —
  // a Canada resident browsing from India should still see USD.
  if (isIndiaTimezone(context?.timezone)) return "INR";
  if (context?.timezone?.trim() && !isIndiaTimezone(context.timezone)) {
    return "USD";
  }

  if (code && code !== DEFAULT_COUNTRY_CODE_NUMERIC) return "USD";

  if (isIndiaTimezone(context?.browserTimezone)) return "INR";

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
