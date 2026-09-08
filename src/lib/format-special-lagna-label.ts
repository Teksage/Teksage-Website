/** Title-case Special Lagna API keys for display (horaLagna → Hora Lagna). */

const SPECIAL_LAGNA_LABELS: Record<string, string> = {
  mandi: "Mandi",
  horaLagna: "Hora Lagna",
  dhanaLagna: "Dhana Lagna",
  arudhaLagna: "Arudha Lagna",
  lagna: "Lagna",
};

function titleCaseWords(value: string): string {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function formatSpecialLagnaLabel(key: string): string {
  if (SPECIAL_LAGNA_LABELS[key]) return SPECIAL_LAGNA_LABELS[key];
  const spaced = key.replace(/([A-Z])/g, " $1").trim();
  return titleCaseWords(spaced);
}
