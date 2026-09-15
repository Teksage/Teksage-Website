"use client";

import { cn } from "@/lib/utils";
import { formatShadbalaCell } from "@/lib/format-shadbala";
import type { ShadbalaCol, ShadbalaRow } from "@/lib/shadbala-consts";

const TH =
  "bg-[var(--color-brand-panchang)] px-1 py-3 text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-white sm:px-2 sm:text-xs";
const TD =
  "px-1 py-3 text-center text-[10px] tabular-nums text-[var(--color-brand-black)] sm:px-2 sm:text-xs";
const TR =
  "border-b border-[color-mix(in_srgb,var(--color-brand-primary)_12%,transparent)] last:border-0";
const TABLE =
  "w-full min-w-[36rem] table-fixed border-collapse overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--color-brand-primary)_25%,transparent)] bg-white shadow-sm sm:min-w-0";

function toneClass(tone: ShadbalaCol["tone"]): string {
  if (tone === "red") return "font-semibold text-[var(--color-brand-error)]";
  if (tone === "green") return "font-semibold text-[var(--color-brand-primary)]";
  if (tone === "rank") return "font-bold text-[var(--color-brand-ios)]";
  if (tone === "label") {
    return "text-center font-semibold text-[var(--color-brand-panchang)]";
  }
  return "";
}

export function ShadbalaPlanetGrid({
  rows,
  cols,
}: {
  rows: ShadbalaRow[];
  cols: ShadbalaCol[];
}) {
  return (
    <table className={TABLE}>
      <thead>
        <tr>
          {cols.map((c) => (
            <th key={String(c.key)} className={TH}>
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.planet} className={TR}>
            {cols.map((c) => (
              <td key={String(c.key)} className={cn(TD, toneClass(c.tone))}>
                {formatShadbalaCell(r, c.key, c.format ?? "000.00")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
