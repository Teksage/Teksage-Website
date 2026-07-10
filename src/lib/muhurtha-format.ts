/** Format Event Planner window strings from API payloads. */

export function formatMuhurthaWindow(window: string): string {
  const parts = window.split(/\s+To\s+/i);
  if (parts.length !== 2) return window;
  return `${parts[0].trim()} – ${parts[1].trim()}`;
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

export function muhurthaStatusBadgeClass(
  rating: string | undefined,
  layout: {
    statusSuitable: string;
    statusSuitableVeryGood: string;
    statusSuitableGood: string;
    statusSuitableAverage: string;
  }
): string {
  const tone = muhurthaRatingTone(rating ?? "");
  if (tone === "veryGood") return layout.statusSuitableVeryGood;
  if (tone === "good") return layout.statusSuitableGood;
  if (tone === "average") return layout.statusSuitableAverage;
  return layout.statusSuitable;
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

export function formatMuhurthaMoreReasons(extraCount: number): string {
  if (extraCount <= 0) return "";
  return `+${extraCount} more`;
}
