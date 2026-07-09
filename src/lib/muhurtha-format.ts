/** Format Event Planner window strings from API payloads. */

export function formatMuhurthaWindow(window: string): string {
  const parts = window.split(/\s+To\s+/i);
  if (parts.length !== 2) return window;
  return `${parts[0].trim()} – ${parts[1].trim()}`;
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
