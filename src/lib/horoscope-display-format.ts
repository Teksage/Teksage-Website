/** DOB / TOB display — mirrors Flutter `horoscopePage.dart` (`DateFormat` MMM dd, yyyy + 12h time). */

export function formatHoroscopeDob(raw?: string): string {
  const s = raw?.trim();
  if (!s) return "";
  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) {
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
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
