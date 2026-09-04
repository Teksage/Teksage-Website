/** Column layouts — Astrosoft EnumSet ordinal order for each tab. */

import { HOROSCOPE_SCREEN } from "@/lib/constants";
import type { ShadbalaCol } from "@/lib/shadbala-consts";

const H = HOROSCOPE_SCREEN;
const STD = "000.00" as const;
const RES = "00.0" as const;
const RUPA = "0.0" as const;

/** Planet · Res · Sthana · Dig · Kala · Drik · Chesta · Nais · Shad · Rupa · Bala% · Rank · Ishta · Kashta */
export const SHADBALA_MAIN_COLS: ShadbalaCol[] = [
  { key: "planet", label: H.colPlanet, tone: "label" },
  { key: "residential", label: H.colResidential, format: RES },
  { key: "sthana", label: H.colSthana, format: STD },
  { key: "dig", label: H.colDig, format: STD },
  { key: "kala", label: H.colKala, format: STD },
  { key: "drik", label: H.colDrik, format: STD },
  { key: "chesta", label: H.colChesta, format: STD },
  { key: "naisargika", label: H.colNaisargika, format: STD },
  { key: "shadbala", label: H.colShadbala, format: STD, tone: "red" },
  { key: "rupa", label: H.colRupa, format: RUPA, tone: "red" },
  { key: "balaPercent", label: H.colBalaPercent, format: STD, tone: "red" },
  { key: "rankLabel", label: H.colRank, tone: "rank" },
  { key: "ishta", label: H.colIshta, format: STD, tone: "green" },
  { key: "kashta", label: H.colKashta, format: STD },
];

/** Ochcha · Sapta · Oja · Kendra · Drek · Sthana */
export const SHADBALA_STHANA_COLS: ShadbalaCol[] = [
  { key: "planet", label: H.colPlanet, tone: "label" },
  { key: "ochcha", label: H.colOchcha, format: STD },
  { key: "saptavargaja", label: H.colSaptavargaja, format: STD },
  { key: "ojaYugma", label: H.colOjaYugma, format: STD },
  { key: "kendra", label: H.colKendra, format: STD },
  { key: "drekkana", label: H.colDrekkana, format: STD },
  { key: "sthana", label: H.colSthana, format: STD, tone: "red" },
];

/** Paksha · Tri · Abda · Masa · Vara · Hora · Nat · Ayana · Yuddha · Kala (Astrosoft enum order) */
export const SHADBALA_KALA_COLS: ShadbalaCol[] = [
  { key: "planet", label: H.colPlanet, tone: "label" },
  { key: "paksha", label: H.colPaksha, format: STD },
  { key: "tribhaga", label: H.colTribhaga, format: STD },
  { key: "abda", label: H.colAbda, format: STD },
  { key: "masa", label: H.colMasa, format: STD },
  { key: "vara", label: H.colVara, format: STD },
  { key: "hora", label: H.colHora, format: STD },
  { key: "natonnata", label: H.colNatonnata, format: STD },
  { key: "ayana", label: H.colAyana, format: STD },
  { key: "yuddha", label: H.colYuddha, format: STD },
  { key: "kala", label: H.colKala, format: STD, tone: "red" },
];
