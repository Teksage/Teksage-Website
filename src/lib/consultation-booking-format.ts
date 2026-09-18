/** Booking date/time labels — mirrors Flutter `userBookingDetailspage.dart`. */

export function formatConsultationBookingDate(
  iso: string,
  locale = "en-IN"
): string {
  return new Date(iso).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatConsultationBookingTimeRange(
  start: string,
  end: string,
  locale = "en-IN"
): string {
  const opts = { hour: "numeric", minute: "2-digit", hour12: true } as const;
  const a = new Date(start).toLocaleTimeString(locale, opts);
  const b = new Date(end).toLocaleTimeString(locale, opts);
  return `${a} - ${b}`;
}

export function formatProfileDateOfBirth(
  iso?: string | null,
  locale = "en-IN"
): string {
  if (!iso?.trim()) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
}

export function formatProfileTimeOfBirth(
  tob?: string | null,
  locale = "en-IN"
): string {
  if (!tob?.trim()) return "—";
  const match = tob.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/);
  if (!match) return tob;
  const h = Number(match[1]);
  const m = Number(match[2]);
  const s = match[3] ? Number(match[3]) : 0;
  const d = new Date();
  d.setHours(h, m, s, 0);
  return d.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export function formatFeeSlash(amount: number, currency: string): string {
  const isUsd = currency === "USD";
  const unit = isUsd ? "$" : "₹";
  const value = isUsd ? amount.toFixed(2) : Math.round(amount);
  return `${unit} ${value}/-`;
}
