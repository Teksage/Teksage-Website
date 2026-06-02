/** 12-hour display for segment end times — mirrors Flutter `convertTo12HourFormat` in `panchangPage.dart`. */

export function to12HourDisplay(time: string | undefined): string {
  const raw = time?.trim();
  if (!raw) return "";
  const parts = raw.split(":");
  if (parts.length < 2) return raw;
  const h = Number.parseInt(parts[0] ?? "", 10) % 24;
  const m = Number.parseInt(parts[1] ?? "", 10);
  if (Number.isNaN(h) || Number.isNaN(m)) return raw;
  const dt = new Date(2024, 0, 1, h, m);
  return dt.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function shortWeekdayLabel(engWeekday?: string, weekday?: string): string {
  const src = engWeekday?.trim() || weekday?.trim();
  if (!src) return "";
  if (src.length <= 3) return src;
  return src.slice(0, 3);
}
