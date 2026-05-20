"use client";

import { useI18nConstants } from "@/hooks/useT";
import { MATCH_MAKING_SCREEN } from "@/lib/constants/match-making-screen";
import type { MatchMakingKutaRow } from "@/types/match-making";

export function MatchMakingKutaTable({ kutas }: { kutas: MatchMakingKutaRow[] }) {
  const MM = useI18nConstants(MATCH_MAKING_SCREEN);
  return (
    <section className="overflow-hidden rounded-2xl bg-white">
      <div className="grid grid-cols-[2fr_1fr_1fr] items-center rounded-t-2xl bg-[var(--color-match-head)] px-5 py-3 text-base font-semibold text-[var(--color-match-button-text)]">
        <span>{MM.kutaColumn}</span>
        <span className="text-center">{MM.gainedColumn}</span>
        <span className="text-center">{MM.maxColumn}</span>
      </div>
      <ul className="px-5 py-4">
        {kutas.map((row, i) => (
          <li
            key={`${row.kuta}-${i}`}
            className="grid grid-cols-[2fr_1fr_1fr] items-center py-2 text-base text-[var(--color-brand-black)]"
          >
            <span className="font-medium">{row.kuta}</span>
            <span className="text-center">{row.gained ?? "—"}</span>
            <span className="text-center">{row.max ?? "—"}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
