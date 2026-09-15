/** Bhava Bala table for Shadbala inner tab. */
"use client";

import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN } from "@/lib/constants";
import type { BhavaBalaRow } from "@/lib/format-bhava-bala";

const TH =
  "bg-[var(--color-brand-panchang)] px-1 py-3 text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-white sm:px-2 sm:text-xs";
const TD =
  "px-1 py-3 text-center text-[10px] tabular-nums text-[var(--color-brand-black)] sm:px-2 sm:text-xs";
const TR =
  "border-b border-[color-mix(in_srgb,var(--color-brand-primary)_12%,transparent)] last:border-0";
const TABLE =
  "w-full table-fixed border-collapse overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--color-brand-primary)_25%,transparent)] bg-white shadow-sm";
const PLACEHOLDER = "py-8 text-center text-xs text-black/40";
const RED = "font-semibold text-[var(--color-brand-error)]";
const RANK = "font-bold text-[var(--color-brand-ios)]";
const LABEL = "font-semibold text-[var(--color-brand-panchang)]";

export function ShadbalaBhavaTable({ rows }: { rows: BhavaBalaRow[] }) {
  if (!rows.length) {
    return <p className={PLACEHOLDER}>{HOROSCOPE_SCREEN.shadbalaBhavaUnavailable}</p>;
  }
  return (
    <table className={TABLE}>
      <thead>
        <tr>
          <th className={TH}>{HOROSCOPE_SCREEN.colHouse}</th>
          <th className={TH}>{HOROSCOPE_SCREEN.colBhava}</th>
          <th className={TH}>{HOROSCOPE_SCREEN.colBhavaAdhipathi}</th>
          <th className={TH}>{HOROSCOPE_SCREEN.colBhavaDig}</th>
          <th className={TH}>{HOROSCOPE_SCREEN.colBhavaDrishti}</th>
          <th className={TH}>{HOROSCOPE_SCREEN.colBhavaBala}</th>
          <th className={TH}>{HOROSCOPE_SCREEN.colRupa}</th>
          <th className={TH}>{HOROSCOPE_SCREEN.colRank}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.house} className={TR}>
            <td className={cn(TD, LABEL)}>{r.houseLabel}</td>
            <td className={TD}>{r.bhava}</td>
            <td className={TD}>{r.bhavaAdhipathi}</td>
            <td className={TD}>{r.bhavaDig}</td>
            <td className={TD}>{r.bhavaDrishti}</td>
            <td className={cn(TD, RED)}>{r.bhavaBala}</td>
            <td className={cn(TD, RED)}>{r.rupa}</td>
            <td className={cn(TD, RANK)}>{r.rankLabel}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
