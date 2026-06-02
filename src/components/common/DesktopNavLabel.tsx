import { cn } from "@/lib/utils";
import type { DesktopNavLabelLines } from "@/types/ui/desktop-nav";

export function DesktopNavLabel({
  label,
  labelLines,
  active,
}: {
  label?: string;
  labelLines?: DesktopNavLabelLines;
  active?: boolean;
}) {
  if (labelLines) {
    const lineClass = active
      ? "text-sm font-semibold text-[var(--color-brand-primary)]"
      : "text-sm font-medium text-black";

    return (
      <span className="flex min-w-0 flex-1 flex-col leading-snug">
        <span className={lineClass}>{labelLines.primary}</span>
        {labelLines.secondary ? <span className={lineClass}>{labelLines.secondary}</span> : null}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "flex-1 text-sm leading-snug",
        active ? "font-semibold text-[var(--color-brand-primary)]" : "font-medium text-black"
      )}
    >
      {label}
    </span>
  );
}
