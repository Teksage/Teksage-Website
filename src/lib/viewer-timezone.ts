import { CONSULTATION_INDIA_TIMEZONES } from "@/lib/constants/consultation-currency";

/** Same usability rules as consultation currency timezone checks. */
export function normalizeViewerTimezone(timezone?: string | null): string | undefined {
  const raw = timezone?.trim();
  if (!raw) return undefined;
  if (raw === "Asia/Calcutta") return "Asia/Kolkata";
  if (raw.toUpperCase() === "UTC") return undefined;
  return raw;
}

/** Profile IANA zone when usable; otherwise undefined → browser/device local. */
export function resolveViewerTimezone(profileTimezone?: string | null): string | undefined {
  return normalizeViewerTimezone(profileTimezone);
}

/** India zones (and missing zone) use the consultation “times shown in IST” hint. */
export function isIndiaDisplayTimezone(timezone?: string | null): boolean {
  const tz = normalizeViewerTimezone(timezone);
  if (!tz) return true;
  return (CONSULTATION_INDIA_TIMEZONES as readonly string[]).includes(tz)
    || tz === "Asia/Kolkata";
}
