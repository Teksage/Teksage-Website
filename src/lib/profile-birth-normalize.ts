/** Normalize profile birth fields for API — mirrors Flutter `DateFormat` conversions. */

/** City label from stored full location — mirrors Flutter `extractCityName`. */
export function extractCityFromLocation(location: string): string {
  const trimmed = location.trim();
  if (!trimmed) return "";
  return trimmed.split(",")[0]?.trim() ?? trimmed;
}

export function normalizeProfileDateForApi(value: string): string {  const t = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(t)) return t;
  const ddMmYyyy = /^(\d{2})-(\d{2})-(\d{4})$/.exec(t);
  if (ddMmYyyy) return `${ddMmYyyy[3]}-${ddMmYyyy[2]}-${ddMmYyyy[1]}`;
  return t;
}

export function normalizeProfileTimeForApi(value: string): string {
  const t = value.trim();
  const ampm = /^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)$/i.exec(t);
  if (ampm) {
    let hour = Number.parseInt(ampm[1], 10);
    const minute = ampm[2];
    const second = ampm[3] ?? "00";
    const meridiem = ampm[4].toUpperCase();
    if (meridiem === "PM" && hour < 12) hour += 12;
    if (meridiem === "AM" && hour === 12) hour = 0;
    return `${String(hour).padStart(2, "0")}:${minute}:${second}`;
  }
  if (/^\d{2}:\d{2}$/.test(t)) return `${t}:00`;
  return t;
}
