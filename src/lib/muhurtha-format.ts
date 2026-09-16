/** Format Event Planner window strings and status labels from API payloads. */

export function formatMuhurthaWindow(window: string): string {
  const parts = window.split(/\s+To\s+/i);
  if (parts.length !== 2) return window;
  return `${parts[0].trim()} – ${parts[1].trim()}`;
}

export function formatMuhurthaDateRange(
  start: string,
  end: string,
  locale: string
): string {
  const formatDate = (value: string) =>
    new Date(`${value}T12:00:00`).toLocaleDateString(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  return `${formatDate(start)} – ${formatDate(end)}`;
}

export function formatMuhurthaDisplayDate(
  isoDate: string,
  fallback: string,
  locale: string
): string {
  const date = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return fallback;
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatMuhurthaWindows(day: {
  windows?: string[];
  window?: string;
}): string[] {
  if (day.windows?.length) {
    return day.windows.map(formatMuhurthaWindow);
  }
  if (day.window) {
    return day.window.split(/,\s*/).map(formatMuhurthaWindow);
  }
  return [];
}

export function muhurthaRatingTone(
  rating: string
): "veryGood" | "good" | "average" | "default" {
  const key = rating.trim().toLowerCase();
  if (key === "very good") return "veryGood";
  if (key === "good") return "good";
  if (key === "average") return "average";
  return "default";
}

/** Plain status line: emoji dot + black label (no “Suitable” / no chip colors). */
export function formatMuhurthaStatusLabel(args: {
  suitable: boolean;
  rating?: string;
  labels: {
    veryGood: string;
    good: string;
    average: string;
    notSuitable: string;
  };
}): string {
  if (!args.suitable) return `🔴 ${args.labels.notSuitable}`;
  const tone = muhurthaRatingTone(args.rating ?? "");
  if (tone === "average") return `🟠 ${args.labels.average}`;
  if (tone === "good") return `🟡 ${args.labels.good}`;
  return `🟢 ${args.labels.veryGood}`;
}

export function formatMuhurthaMoreReasons(
  extraCount: number,
  moreLabel: string
): string {
  if (extraCount <= 0) return "";
  return `+${extraCount} ${moreLabel}`;
}
