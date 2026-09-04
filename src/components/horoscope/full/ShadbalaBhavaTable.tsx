/** Bhava Bala table for Shadbala inner tab. */
"use client";

import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN } from "@/lib/constants";
import { buildBhavaBalaRows } from "@/lib/format-bhava-bala";
import type { ShadbalaPayload } from "@/types";

const TH =
  "bg-[var(--color-brand-panchang)] px-0.5 py-2 text-center text-[9px] font-bold uppercase leading-tight tracking-wide text-white sm:px-1 sm:text-[10px]";
const TD =
  "px-0.5 py-2 text-center text-[9px] tabular-nums text-[var(--color-brand-black)] sm:px-1 sm:text-[10px]";
const TR =
  "border-b border-[color-mix(in_srgb,var(--color-brand-primary)_12%,transparent)] last:border-0";
const TABLE =
  "w-full table-fixed border-collapse overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--color-brand-primary)_25%,transparent)] bg-white shadow-sm";
const PLACEHOLDER = "py-8 text-center text-xs text-black/40";
const RED = "font-semibold text-[var(--color-brand-error)]";
const RANK = "font-bold text-[var(--color-brand-ios)]";
const LABEL =
  "pl-2 text-left font-semibold text-[var(--color-brand-panchang)] sm:pl-3";
const HOUSE_TH = cn(TH, "pl-2 text-left sm:pl-3");

export function ShadbalaBhavaTable({ payload }: { payload: ShadbalaPayload }) {
  const rows = buildBhavaBalaRows(payload);
  if (!rows.length) {
    return <p className={PLACEHOLDER}>{HOROSCOPE_SCREEN.shadbalaBhavaUnavailable}</p>;
  }
  return (
    <table className={TABLE}>
      <thead>
        <tr>
          <th className={HOUSE_TH}>{HOROSCOPE_SCREEN.colHouse}</th>
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
