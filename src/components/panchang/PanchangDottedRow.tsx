import { cn } from "@/lib/utils";
import type { PanchangDottedRowProps } from "@/types";

export function PanchangDottedRow({
  label,
  value,
  isLast,
}: PanchangDottedRowProps) {
  if (!value?.trim()) return null;
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-3 border-dashed border-[var(--color-panchang-row-divider)] py-3 text-sm",
        !isLast && "border-b"
      )}
    >
      <span className="w-1/3 shrink-0 font-semibold text-[var(--color-brand-panchang)]">
        {label}
      </span>
      <span className="min-w-0 flex-1 whitespace-pre-line text-right font-medium leading-snug text-[var(--color-brand-black)]">
        {value}
      </span>
    </div>
  );
}
