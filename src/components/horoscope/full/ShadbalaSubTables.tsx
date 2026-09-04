/**
 * Sthana + Kala detail tables for Shadbala section (Astrosoft columns).
 */
"use client";

import { cn } from "@/lib/utils";
import { HOROSCOPE_SHADBALA } from "@/lib/constants/horoscope-shadbala";
import type { ShadbalaRow } from "@/lib/format-shadbala";
import {
  ShadbalaDataTable,
  SHAD_LABEL,
  SHAD_RED,
  shadCell,
} from "@/components/horoscope/full/ShadbalaTableChrome";

const S = HOROSCOPE_SHADBALA;

const STHANA_HEADERS = [
  S.colPlanet,
  S.colOchcha,
  S.colSaptavargaja,
  S.colOjaYugma,
  S.colKendra,
  S.colDrekkana,
  S.colSthanaTotal,
];

const KALA_HEADERS = [
  S.colPlanet,
  S.colAbda,
  S.colMasa,
  S.colVara,
  S.colHora,
  S.colPaksha,
  S.colTribhaga,
  S.colNatonnata,
  S.colAyana,
  S.colYuddha,
  S.colKalaTotal,
];

export function ShadbalaSthanaTable({ rows }: { rows: ShadbalaRow[] }) {
  const data = rows.filter((r) => !r.partial);
  return (
    <ShadbalaDataTable
      headers={STHANA_HEADERS}
      rows={data}
      renderCells={(r) => [
        <span key="p" className={SHAD_LABEL}>{r.planet}</span>,
        shadCell(r.ochcha, false),
        shadCell(r.saptavargaja, false),
        shadCell(r.ojaYugma, false),
        shadCell(r.kendra, false),
        shadCell(r.drekkana, false),
        <span key="t" className={SHAD_RED}>{shadCell(r.sthana, false)}</span>,
      ]}
    />
  );
}

export function ShadbalaKalaTable({ rows }: { rows: ShadbalaRow[] }) {
  const data = rows.filter((r) => !r.partial);
  return (
    <ShadbalaDataTable
      headers={KALA_HEADERS}
      rows={data}
      renderCells={(r) => [
        <span key="p" className={SHAD_LABEL}>{r.planet}</span>,
        shadCell(r.abda, false),
        shadCell(r.masa, false),
        shadCell(r.vara, false),
        shadCell(r.hora, false),
        shadCell(r.paksha, false),
        shadCell(r.tribhaga, false),
        shadCell(r.natonnata, false),
        shadCell(r.ayana, false),
        shadCell(r.yuddha, false),
        <span key="t" className={cn(SHAD_RED)}>{shadCell(r.kala, false)}</span>,
      ]}
    />
  );
}
