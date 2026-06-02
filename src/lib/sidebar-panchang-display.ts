import type { PanchangDetail } from "@/types";

/** Compact auspicious slots for sidebar (comma-separated). */
export function formatSidebarAuspiciousTime(
  auspiciousTime: PanchangDetail["auspiciousTime"]
): string | undefined {
  const slots = filterAuspiciousSlots(auspiciousTime);
  if (!slots.length) return undefined;
  return slots.join(", ");
}

export function filterAuspiciousSlots(
  auspiciousTime: PanchangDetail["auspiciousTime"]
): string[] {
  return auspiciousTime?.filter((t) => t?.trim()) ?? [];
}
