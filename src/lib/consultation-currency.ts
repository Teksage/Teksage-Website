import { CONSULTATION_INDIA_TIMEZONES } from "@/lib/constants/consultation-currency";
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
  return loc.includes("india");
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
 * INR only for India. Any other preferred location is USD.
 * Fallbacks: profile timezone (not UTC), then phone dial code, then browser TZ.
 */
export function consultationCurrencyForLocation(
  preferredLocation?: string | null,
  context?: ConsultationCurrencyContext
): ConsultationCurrency {
  const loc = preferredLocation?.trim() ?? "";
  if (loc) {
    return isIndiaLocationText(loc) ? "INR" : "USD";
  }

  if (isUsableTimezone(context?.timezone)) {
    return isIndiaTimezone(context?.timezone) ? "INR" : "USD";
  }

  const code = normalizeCountryCode(context?.countryCode);
  if (code === DEFAULT_COUNTRY_CODE_NUMERIC) return "INR";
  if (code) return "USD";

  if (isIndiaTimezone(context?.browserTimezone)) return "INR";
  if (isUsableTimezone(context?.browserTimezone)) return "USD";

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
