/** Vedic rasi names — mirrors backend `SIGN_SANSKRIT` / AstroSoft labels (Kumbha, Makara, …). */

export const RASHI_SANSKRIT_BY_ENGLISH = {
  Aries: "Mesha",
  Taurus: "Rishabha",
  Gemini: "Mithuna",
  Cancer: "Kataka",
  Leo: "Simha",
  Virgo: "Kanya",
  Libra: "Thula",
  Scorpio: "Vrichika",
  Sagittarius: "Dhanus",
  Capricorn: "Makara",
  Aquarius: "Kumbha",
  Pisces: "Meena",
} as const;

const ENGLISH_BY_SANSKRIT = Object.fromEntries(
  Object.entries(RASHI_SANSKRIT_BY_ENGLISH).map(([en, sk]) => [sk.toLowerCase(), en])
) as Record<string, string>;

export function toEnglishRashi(value: string): string {
  const t = value.trim();
  if (!t) return "";
  const direct = ENGLISH_BY_SANSKRIT[t.toLowerCase()];
  if (direct) return direct;
  const paren = /\(([^)]+)\)\s*$/.exec(t);
  if (paren) {
    const inner = paren[1].trim();
    if (inner in RASHI_SANSKRIT_BY_ENGLISH) return inner;
  }
  if (t in RASHI_SANSKRIT_BY_ENGLISH) return t;
  return t;
}

/** Profile birth section — show Sanskrit rasi names like AstroSoft (Kumbha, not Aquarius). */
export function formatProfileRashiDisplay(value: string): string {
  const english = toEnglishRashi(value);
  return (
    RASHI_SANSKRIT_BY_ENGLISH[english as keyof typeof RASHI_SANSKRIT_BY_ENGLISH] ??
    value.trim()
  );
}

export function formatProfileNakshatraDisplay(
  nakshatra: string,
  pada?: number | null
): string {
  const nak = nakshatra.trim();
  if (!nak) return "";
  if (typeof pada === "number" && pada >= 1 && pada <= 4) {
    return `${nak} - ${pada}`;
  }
  return nak;
}
