/** Booking date/time labels — mirrors Flutter `userBookingDetailspage.dart`. */

export function formatConsultationBookingDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatConsultationBookingTimeRange(start: string, end: string): string {
  const opts = { hour: "numeric", minute: "2-digit", hour12: true } as const;
  const a = new Date(start).toLocaleTimeString("en-IN", opts);
  const b = new Date(end).toLocaleTimeString("en-IN", opts);
  return `${a} - ${b}`;
}

export function formatProfileDateOfBirth(iso?: string | null): string {
  if (!iso?.trim()) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function formatProfileTimeOfBirth(tob?: string | null): string {
  if (!tob?.trim()) return "—";
  const match = tob.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/);
  if (!match) return tob;
  const h = Number(match[1]);
  const m = Number(match[2]);
  const s = match[3] ? Number(match[3]) : 0;
  const d = new Date();
  d.setHours(h, m, s, 0);
  return d.toLocaleTimeString("en-IN", {
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
