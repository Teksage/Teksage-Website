/** Shared constants for planetary position display (Astrosoft-aligned). */

export const PLANET_ORDER = [
  "Sun",
  "Moon",
  "Mars",
  "Mercury",
  "Jupiter",
  "Venus",
  "Saturn",
  "Rahu",
  "Ketu",
  "Ascendant",
] as const;

/** Astrosoft `Rasi.values()` order — index = floor(longitude / 30). */
export const RASI_BY_INDEX = [
  "Mesha",
  "Vrishabha",
  "Mithuna",
  "Kataka",
  "Simha",
  "Kanya",
  "Thula",
  "Vrichika",
  "Dhanus",
  "Makara",
  "Kumbha",
  "Meena",
] as const;

export const KARAKA_PLANETS = [
  "Sun",
  "Moon",
  "Mars",
  "Mercury",
  "Jupiter",
  "Venus",
  "Saturn",
] as const;

export const KARAKA_NAMES = [
  "AtmaKaraka",
  "AmatyaKaraka",
  "BhratruKaraka",
  "MatruKaraka",
  "PuthraKaraka",
  "GnatiKaraka",
  "DaraKaraka",
] as const;

/** English / symbol → Astrosoft Sanskrit rasi names. */
export const RASI_TO_SANSKRIT: Record<string, string> = {
  Aries: "Mesha",
  Mesha: "Mesha",
  Ari: "Mesha",
  Taurus: "Vrishabha",
  Vrishabha: "Vrishabha",
  Tau: "Vrishabha",
  Gemini: "Mithuna",
  Mithuna: "Mithuna",
  Gem: "Mithuna",
  Cancer: "Kataka",
  Kataka: "Kataka",
  Can: "Kataka",
  Leo: "Simha",
  Simha: "Simha",
  Virgo: "Kanya",
  Kanya: "Kanya",
  Vir: "Kanya",
  Libra: "Thula",
  Thula: "Thula",
  Lib: "Thula",
  Scorpio: "Vrichika",
  Vrichika: "Vrichika",
  Sco: "Vrichika",
  Sagittarius: "Dhanus",
  Dhanus: "Dhanus",
  Sag: "Dhanus",
  Capricorn: "Makara",
  Makara: "Makara",
  Cap: "Makara",
  Aquarius: "Kumbha",
  Kumbha: "Kumbha",
  Aqu: "Kumbha",
  Pisces: "Meena",
  Meena: "Meena",
  Pis: "Meena",
};
