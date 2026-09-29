/** DOB / TOB display — mirrors Flutter `horoscopePage.dart` (`DateFormat` MMM dd, yyyy + 12h time). */

import { format } from "date-fns";
import { parseProfileDobIsoToDate } from "@/lib/profile-birth-date-format";

const HOROSCOPE_DOB_PATTERN = "MMM dd, yyyy";

/** Local calendar day. `new Date("1998-01-15")` is UTC midnight and shifts a day west of UTC. */
export function formatHoroscopeDob(raw?: string): string {
  const s = raw?.trim();
  if (!s) return "";
  const calendar = parseProfileDobIsoToDate(s);
  if (calendar) return format(calendar, HOROSCOPE_DOB_PATTERN);
  const fallback = new Date(s);
  if (!Number.isNaN(fallback.getTime()) && !/^\d{4}-\d{2}-\d{2}/.test(s)) {
    return format(fallback, HOROSCOPE_DOB_PATTERN);
  }
  return s;
}

export function formatHoroscopeTimeOfBirth(raw?: string): string {
  const s = raw?.trim();
  if (!s) return "";
  const parts = s.split(":");
  if (parts.length < 2) return s;
  const h = Number.parseInt(parts[0] ?? "", 10) % 24;
  const m = Number.parseInt(parts[1] ?? "", 10);
  const sec = parts.length >= 3 ? Number.parseInt(parts[2] ?? "0", 10) : 0;
  if (Number.isNaN(h) || Number.isNaN(m)) return s;
  const dt = new Date(2024, 0, 1, h, m, Number.isNaN(sec) ? 0 : sec);
  return dt.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}
