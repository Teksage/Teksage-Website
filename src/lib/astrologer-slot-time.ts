/** Slot time helpers — mirrors Flutter `formatSlotRange` / `normalizeSlotTime`. */

/** `2026-05-25T12:30:00+05:30` → `12:30` (no timezone conversion). */
export function extractTimeFromIso(iso: string): string {
  try {
    const timePart = iso.split("T")[1] ?? iso;
    const parts = timePart.split(":");
    return `${parts[0]}:${parts[1]}`;
  } catch {
    return "00:00";
  }
}

export function slotRangeFromIso(startIso: string, endIso: string): string {
  return `${extractTimeFromIso(startIso)} - ${extractTimeFromIso(endIso)}`;
}
