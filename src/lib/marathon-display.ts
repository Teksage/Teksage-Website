import { resolveViewerTimezone } from "@/lib/viewer-timezone";

export function marathonRupee(amount: number): string {
  const whole = Number.isInteger(amount);
  const text = amount.toLocaleString("en-IN", {
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  });
  return `₹${text}`;
}

export function marathonListOffer(fee: string, compareAt: number) {
  const live = Number(fee);
  const price = Number.isFinite(live) ? live : 0;
  const showCompare = compareAt > price && price > 0;
  return {
    liveLabel: marathonRupee(price),
    compareLabel: marathonRupee(compareAt),
    saveLabel: marathonRupee(compareAt - price),
    showCompare,
  };
}

export function marathonFeeLabel(fee: string, usd?: string | null) {
  const inr = Number(fee);
  const inrText = Number.isFinite(inr) ? `₹${inr.toFixed(2)}` : `₹${fee}`;
  if (usd == null || usd === "") return inrText;
  const dollars = Number(usd);
  const usdText = Number.isFinite(dollars) ? `$${dollars.toFixed(2)}` : `$${usd}`;
  return `${inrText} – ${usdText}`;
}

export function marathonProfileReady(profile: {
  firstName?: string | null;
  dateOfBirth?: string | null;
  timeOfBirth?: string | null;
  placeOfBirth?: string | null;
  email?: string | null;
}) {
  return Boolean(
    profile.firstName
    && profile.dateOfBirth
    && profile.timeOfBirth
    && profile.placeOfBirth
    && profile.email?.trim()
  );
}

const INR_CGST_PCT = 9;
const INR_SGST_PCT = 9;

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export type MarathonFeeParts = {
  base: number;
  cgst: number;
  sgst: number;
  total: number;
  cgstPct: number;
  sgstPct: number;
};

/** Event fee is pre-tax. INR adds 9% CGST and 9% SGST, same as a single query. */
export function marathonFeeAdded(fee: string | number, currency: string): MarathonFeeParts {
  const base = round2(Number(fee) || 0);
  if ((currency || "INR").toUpperCase() !== "INR") {
    return { base, cgst: 0, sgst: 0, total: base, cgstPct: 0, sgstPct: 0 };
  }
  const cgst = round2((base * INR_CGST_PCT) / 100);
  const sgst = round2((base * INR_SGST_PCT) / 100);
  return { base, cgst, sgst, total: round2(base + cgst + sgst), cgstPct: INR_CGST_PCT, sgstPct: INR_SGST_PCT };
}

/** Split a collected total that already includes GST. */
export function marathonFeeIncluded(paid: string | number, currency: string): MarathonFeeParts {
  const total = round2(Number(paid) || 0);
  if ((currency || "INR").toUpperCase() !== "INR") {
    return { base: total, cgst: 0, sgst: 0, total, cgstPct: 0, sgstPct: 0 };
  }
  const base = round2(total / (1 + (INR_CGST_PCT + INR_SGST_PCT) / 100));
  const gst = round2(total - base);
  const cgst = round2(gst / 2);
  const sgst = round2(gst - cgst);
  return { base, cgst, sgst, total, cgstPct: INR_CGST_PCT, sgstPct: INR_SGST_PCT };
}

export function marathonPaidLabel(fee: string, currency: string) {
  const amount = Number(fee);
  const text = Number.isFinite(amount) ? amount.toFixed(2) : fee;
  return currency === "USD" ? `$${text}` : `₹${text}`;
}

/**
 * Format Expert Hours times for the viewer.
 * Same rules as 30-min consultation: profile timezone from Current Location,
 * else browser local.
 */
export function marathonDateParts(iso: string, zone?: string | null, locale = "en-US") {
  const date = new Date(iso);
  const tz = resolveViewerTimezone(zone);
  const withZone = tz ? ({ timeZone: tz } as const) : undefined;
  const month = new Intl.DateTimeFormat(locale, { month: "short", ...withZone }).format(date);
  const day = new Intl.DateTimeFormat(locale, { day: "numeric", ...withZone }).format(date);
  const time = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    ...withZone,
  }).format(date);
  const weekday = new Intl.DateTimeFormat(locale, { weekday: "long", ...withZone }).format(date);
  return { month, day, time, weekday };
}

/** "Sun, 1 Nov 2026" for the AstroConnect Pro popup. */
export function marathonPopupDate(iso: string, zone?: string | null, locale = "en-US") {
  const date = new Date(iso);
  const tz = resolveViewerTimezone(zone);
  const withZone = tz ? ({ timeZone: tz } as const) : undefined;
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    ...withZone,
  }).format(date);
}

/** "Sun, 23 Aug" for the time-slot heading. */
export function marathonShortDay(iso: string, zone?: string | null, locale = "en-US") {
  const date = new Date(iso);
  const tz = resolveViewerTimezone(zone);
  const withZone = tz ? ({ timeZone: tz } as const) : undefined;
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    ...withZone,
  }).format(date);
}

export function marathonBookedSlotIds(
  event: { id: number; slots: { id: number; starts_at: string }[] } | null,
  rows: { marathon_id: number; slot_id: number; starts_at: string }[],
) {
  return rows.flatMap((row) => {
    if (event && Number(row.marathon_id) !== Number(event.id)) return [];
    const id = Number(row.slot_id);
    if (Number.isFinite(id) && id > 0) return [id];
    const start = new Date(row.starts_at).getTime();
    const match = event?.slots.find((item) => new Date(item.starts_at).getTime() === start);
    return match ? [Number(match.id)] : [];
  });
}

export function marathonOpenSlotCount(event: {
  booking_open: boolean;
  admin_ended?: boolean;
  slots: { seats_left: number }[];
}) {
  if (!event.booking_open || event.admin_ended) return 0;
  return event.slots.reduce((sum, slot) => sum + Math.max(0, Number(slot.seats_left) || 0), 0);
}

export function marathonSlotMinutes(start: string, end: string) {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  if (!Number.isFinite(ms) || ms <= 0) return 0;
  return Math.round(ms / 60000);
}

/** Display line for the payment review, from the birth draft already collected. */
export function marathonBornLine(dob: string, tob: string, place: string, locale: string) {
  const day = (dob || "").slice(0, 10);
  const parsed = new Date(`${day}T12:00:00`);
  const dateText = !day || Number.isNaN(parsed.getTime())
    ? ""
    : new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" }).format(parsed);
  const match = /^(\d{1,2}):(\d{2})/.exec(tob || "");
  let timeText = "";
  if (match) {
    const hour = Number(match[1]);
    const suffix = hour >= 12 ? "PM" : "AM";
    const h12 = hour % 12 || 12;
    timeText = `${h12}:${match[2]} ${suffix}`;
  }
  const when = [dateText, timeText].filter(Boolean).join(", ");
  return [when, place].filter(Boolean).join(" · ");
}

/** Strip legacy "(IST)" from stored titles. */
export function marathonDisplayName(name: string | null | undefined): string {
  const cleaned = (name || "").trim();
  if (!cleaned) return "";
  return cleaned.replace(/\s*\(IST\)\s*$/i, "").trim();
}

/** Same style as consultation: local clock times, no zone suffix. */
export function marathonTimeRange(startTime: string, endTime: string): string {
  return `${startTime} – ${endTime}`;
}
