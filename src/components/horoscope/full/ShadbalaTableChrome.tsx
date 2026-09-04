import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { formatShadbalaNum, type ShadbalaRow } from "@/lib/format-shadbala";

export const SHAD_TH =
  "bg-[var(--color-brand-panchang)] px-2 py-2 text-center text-[10px] font-bold uppercase tracking-wide text-white sm:text-xs";
export const SHAD_TD =
  "px-2 py-2 text-center text-[10px] tabular-nums text-[var(--color-brand-black)] sm:text-xs";
export const SHAD_TR =
  "border-b border-[color-mix(in_srgb,var(--color-brand-primary)_12%,transparent)] last:border-0";
export const SHAD_TABLE =
  "w-full border-collapse overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--color-brand-primary)_25%,transparent)] bg-white shadow-sm";
export const SHAD_RED = "font-semibold text-[var(--color-brand-error)]";
export const SHAD_GREEN = "font-semibold text-[var(--color-brand-primary)]";
export const SHAD_RANK = "font-bold text-[var(--color-brand-ios)]";
export const SHAD_LABEL = "text-left font-semibold text-[var(--color-brand-panchang)]";

export function shadCell(
  value: number | null,
  blank: boolean,
  digits = 2
): string {
  if (blank) return "";
  return formatShadbalaNum(value, digits);
}

export function ShadbalaDataTable({
  headers,
  rows,
  renderCells,
}: {
  headers: string[];
  rows: ShadbalaRow[];
  renderCells: (row: ShadbalaRow) => ReactNode[];
}) {
  return (
    <div className="w-full min-w-0 overflow-x-auto">
      <table className={SHAD_TABLE}>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} className={cn(SHAD_TH, "whitespace-nowrap")}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.planet} className={SHAD_TR}>
              {renderCells(row).map((cell, i) => (
                <td key={`${row.planet}-${i}`} className={SHAD_TD}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
