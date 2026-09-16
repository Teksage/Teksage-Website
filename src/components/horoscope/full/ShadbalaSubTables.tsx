/**
 * Sthana + Kala detail tables for Shadbala section (Astrosoft columns).
 */
"use client";

import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN } from "@/lib/constants";
import { useI18nConstants } from "@/hooks/useT";
import type { ShadbalaRow } from "@/lib/format-shadbala";
import {
  ShadbalaDataTable,
  SHAD_LABEL,
  SHAD_RED,
  shadCell,
} from "@/components/horoscope/full/ShadbalaTableChrome";

export function ShadbalaSthanaTable({ rows }: { rows: ShadbalaRow[] }) {
  const H = useI18nConstants(HOROSCOPE_SCREEN);
  const data = rows.filter((r) => !r.partial);
  return (
    <ShadbalaDataTable
      headers={[
        H.colPlanet,
        H.colOchcha,
        H.colSaptavargaja,
        H.colOjaYugma,
        H.colKendra,
        H.colDrekkana,
        H.colSthanaTotal,
      ]}
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
  const H = useI18nConstants(HOROSCOPE_SCREEN);
  const data = rows.filter((r) => !r.partial);
  return (
    <ShadbalaDataTable
      headers={[
        H.colPlanet,
        H.colAbda,
        H.colMasa,
        H.colVara,
        H.colHora,
        H.colPaksha,
        H.colTribhaga,
        H.colNatonnata,
        H.colAyana,
        H.colYuddha,
        H.colKalaTotal,
      ]}
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
