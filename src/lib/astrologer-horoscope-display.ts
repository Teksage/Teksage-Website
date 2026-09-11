import type { AstroHoroscope } from "@/types/astrologer-portal";

const SKIP_KEYS = new Set([
  "rasi_chart",
  "navamsa_chart",
  "dasa_bukti_image",
  "rasi_chart_label",
  "navamsa_chart_label",
  "horoscope_data",
]);

const LONG_TEXT_KEYS = new Set([
  "horoscope_details",
  "horoscope_detail",
  "dasa_bukti",
  "dasa_bukti_details",
  "dasa_bukti_detail",
]);

const FACT_ORDER: Array<{ key: string; label: string }> = [
  { key: "lagna", label: "Lagna" },
  { key: "rashi", label: "Rashi" },
  { key: "nakshatra", label: "Nakshatra" },
  { key: "date_of_birth", label: "Date of birth" },
  { key: "time_of_birth", label: "Time of birth" },
  { key: "place_of_birth", label: "Place of birth" },
  { key: "current_dasa", label: "Current Dasa" },
  { key: "horoscope_id", label: "Horoscope ID" },
];

export type MeetingHoroscopeField = {
  key: string;
  label: string;
  value: string;
  kind: "fact" | "narrative";
};

function titleCaseLabel(key: string): string {
  return key
    .replace(/_/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function formatHoroscopeValue(raw: unknown): string | null {
  if (raw === null || raw === undefined) return null;
  const text = String(raw).trim();
  return text.length > 0 ? text : null;
}

function isNarrativeKey(key: string, value: string): boolean {
  if (LONG_TEXT_KEYS.has(key)) return true;
  return value.length > 160;
}

/** Split dense dasa/bukti paragraphs into readable period lines. */
export function splitDasaBuktiPeriods(value: string): string[] {
  const trimmed = value.trim();
  if (!trimmed) return [];
  const chunks = trimmed.split(
    /(?=\b(?:Sun|Moon|Mars|Mercury|Jupiter|Venus|Saturn|Rahu|Ketu)\s*\([^)]*\)\s+dasa\b)/i
  );
  const lines = chunks.map((c) => c.trim()).filter(Boolean);
  return lines.length > 1 ? lines : [trimmed];
}

export function horoscopeTextFields(
  horoscope: AstroHoroscope
): MeetingHoroscopeField[] {
  const seen = new Set<string>();
  const rows: MeetingHoroscopeField[] = [];

  for (const { key, label } of FACT_ORDER) {
    const value = formatHoroscopeValue(horoscope[key]);
    if (!value) continue;
    rows.push({
      key,
      label,
      value,
      kind: isNarrativeKey(key, value) ? "narrative" : "fact",
    });
    seen.add(key);
  }

  for (const [key, raw] of Object.entries(horoscope)) {
    if (seen.has(key) || SKIP_KEYS.has(key)) continue;
    if (typeof raw === "object" && raw !== null) continue;
    const value = formatHoroscopeValue(raw);
    if (!value || value.startsWith("<")) continue;
    rows.push({
      key,
      label: titleCaseLabel(key),
      value,
      kind: isNarrativeKey(key, value) ? "narrative" : "fact",
    });
  }

  return rows;
}

/** True when the API returned displayable text fields (charts live under Full Horoscope). */
export function hasAstrologerMeetingHoroscope(
  horoscope: AstroHoroscope | null | undefined
): boolean {
  if (!horoscope) return false;
  return horoscopeTextFields(horoscope).length > 0;
}
