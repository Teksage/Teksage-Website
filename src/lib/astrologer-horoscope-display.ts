import type { AstroHoroscope } from "@/types/astrologer-portal";

const CHART_KEYS = new Set([
  "rasi_chart",
  "navamsa_chart",
  "dasa_bukti_image",
]);

const SKIP_KEYS = new Set([
  ...CHART_KEYS,
  "rasi_chart_label",
  "navamsa_chart_label",
  "horoscope_data",
]);

export function horoscopeChartHtml(
  horoscope: AstroHoroscope,
  key: "rasi_chart" | "navamsa_chart"
): string | null {
  const raw = horoscope[key];
  if (typeof raw !== "string" || !raw.trim()) return null;
  return raw;
}

export function horoscopeChartLabel(
  horoscope: AstroHoroscope,
  key: "rasi_chart" | "navamsa_chart"
): string | undefined {
  const labelKey =
    key === "rasi_chart" ? "rasi_chart_label" : "navamsa_chart_label";
  const raw = horoscope[labelKey];
  return typeof raw === "string" && raw.trim() ? raw : undefined;
}

export function horoscopeTextFields(
  horoscope: AstroHoroscope
): Array<{ key: string; label: string; value: string }> {
  const ordered: Array<{ key: string; label: string }> = [
    { key: "lagna", label: "Lagna" },
    { key: "rashi", label: "Rashi" },
    { key: "nakshatra", label: "Nakshatra" },
    { key: "date_of_birth", label: "Date of birth" },
    { key: "time_of_birth", label: "Time of birth" },
    { key: "place_of_birth", label: "Place of birth" },
    { key: "current_dasa", label: "Current Dasa" },
  ];

  const seen = new Set<string>();
  const rows: Array<{ key: string; label: string; value: string }> = [];

  for (const { key, label } of ordered) {
    const value = formatHoroscopeValue(horoscope[key]);
    if (!value) continue;
    rows.push({ key, label, value });
    seen.add(key);
  }

  for (const [key, raw] of Object.entries(horoscope)) {
    if (seen.has(key) || SKIP_KEYS.has(key)) continue;
    if (typeof raw === "object" && raw !== null) continue;
    const value = formatHoroscopeValue(raw);
    if (!value || value.startsWith("<")) continue;
    rows.push({
      key,
      label: key.replace(/_/g, " "),
      value,
    });
  }

  return rows;
}

function formatHoroscopeValue(raw: unknown): string | null {
  if (raw === null || raw === undefined) return null;
  const text = String(raw).trim();
  return text.length > 0 ? text : null;
}

/** True when the API returned displayable horoscope fields (not just an empty object). */
export function hasAstrologerMeetingHoroscope(
  horoscope: AstroHoroscope | null | undefined
): boolean {
  if (!horoscope) return false;
  return (
    horoscopeTextFields(horoscope).length > 0 ||
    horoscopeChartHtml(horoscope, "rasi_chart") != null ||
    horoscopeChartHtml(horoscope, "navamsa_chart") != null
  );
}
