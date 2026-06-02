import { PANCHANG_SECTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { PanchangTimingRowsCardProps } from "@/types";

export function PanchangTimingRowsCard({ rows, className }: PanchangTimingRowsCardProps) {
  const n = rows.length;
  if (!n) return null;

  return (
    <div className={cn(PANCHANG_SECTIONS.card, className)}>
      {rows.map((row, i) => (
        <div key={row.key}>
          <div className="flex items-start justify-between gap-3 py-2.5 text-sm">
            <span className="w-1/3 shrink-0 font-semibold text-[var(--color-brand-panchang)]">
              {row.label}
            </span>
            <span className="min-w-0 flex-1 whitespace-pre-line text-right font-medium leading-snug text-[var(--color-brand-black)]">
              {row.value}
            </span>
          </div>
          {i < n - 1 ? (
            <div
              className="border-b border-dashed border-[var(--color-panchang-row-divider)]"
              aria-hidden
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
