"use client";

import { cn } from "@/lib/utils";
import {
  ASHTA_BOX_SIGNS,
  highlightedCell,
} from "@/lib/ashta-varga-chart";
import type { SignBindus } from "@/types";

interface Props {
  title: string;
  bindus: SignBindus;
  /** Planet sign number 1–12 — highlights that house like Astrosoft. */
  planetPos?: number | null;
  className?: string;
}

const CELL =
  "flex items-center justify-center border border-[color-mix(in_srgb,var(--color-brand-primary)_35%,transparent)] bg-white text-sm font-semibold text-[var(--color-brand-panchang)]";
const HIGHLIGHT =
  "bg-[color-mix(in_srgb,var(--color-brand-primary)_18%,white)] text-[var(--color-brand-primary)]";

/**
 * South-Indian 4×4 bindu chart — mirrors Astrosoft Ashtavarga chart layout.
 * Cells 1–5, center, 6–12 follow astrochart/ashtaVargaTable.js ordering.
 */
export function AshtaVargaBinduChart({ title, bindus, planetPos, className }: Props) {
  const activeCell = highlightedCell(planetPos);

  /** Grid slots 1–13 where slot 6 is the center title. */
  const slots: { kind: "center" } | { kind: "house"; boxIndex: number; cellIndex: number }[] = [];
  for (let i = 1; i <= 13; i++) {
    if (i === 6) {
      slots.push({ kind: "center" });
    } else {
      const boxIndex = i < 6 ? i : i - 1;
      slots.push({ kind: "house", boxIndex, cellIndex: i });
    }
  }

  return (
    <div className={cn("flex min-w-0 flex-col gap-1", className)}>
      <div
        className="grid aspect-square w-full max-w-[17rem] grid-cols-4 grid-rows-4 gap-0.5 self-center rounded-lg border border-[color-mix(in_srgb,var(--color-brand-primary)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-brand-primary)_6%,white)] p-0.5 sm:max-w-none"
        aria-label={title}
      >
        {slots.map((slot) => {
          if (slot.kind === "center") {
            return (
              <div
                key="center"
                className={cn(
                  CELL,
                  "col-span-2 row-span-2 px-1 text-center text-xs font-bold leading-snug text-[var(--color-brand-primary)] sm:text-sm"
                )}
              >
                {title}
              </div>
            );
          }
          const sign = ASHTA_BOX_SIGNS[slot.boxIndex - 1];
          const value = bindus[sign] ?? 0;
          const isActive = activeCell === slot.cellIndex;
          return (
            <div key={sign} className={cn(CELL, isActive && HIGHLIGHT)}>
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
