import { cn } from "@/lib/utils";

/** Shared Full Horoscope data-table chrome. */
export const FH_TABLE = {
  th: "bg-[var(--color-brand-panchang)] px-2 py-3 text-center text-[10px] font-bold uppercase tracking-wide text-white sm:px-3 sm:text-xs",
  td: "px-2 py-3 text-center text-[10px] text-[var(--color-brand-black)] sm:px-3 sm:text-xs",
  tr: "border-b border-[color-mix(in_srgb,var(--color-brand-primary)_12%,transparent)] last:border-0",
  table:
    "w-full min-w-[20rem] border-collapse overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--color-brand-primary)_25%,transparent)] bg-white shadow-sm",
  labelCol: "font-semibold text-[var(--color-brand-panchang)]",
  placeholder: "py-8 text-center text-xs text-black/40",
  stickyTd: "sticky left-0 z-[1] bg-white",
  highlightMoon: "text-[var(--color-horoscope-moon)]",
  highlightAsc: "text-[var(--color-horoscope-asc)]",
  highlightRetro: "text-[var(--color-horoscope-retro)]",
} as const;

export const FH_TABLE_STICKY_TH = cn(FH_TABLE.th, "sticky left-0 z-[2]");

export function planetaryHighlightClass(
  highlight: "moon" | "asc" | "retro" | null
): string | false {
  if (highlight === "moon") return FH_TABLE.highlightMoon;
  if (highlight === "asc") return FH_TABLE.highlightAsc;
  if (highlight === "retro") return FH_TABLE.highlightRetro;
  return false;
}
