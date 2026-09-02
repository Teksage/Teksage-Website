"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN } from "@/lib/constants";
import type { AshtaVargaPayload, SignName, FullHoroscopeSection } from "@/types";

const SIGN_ORDER: SignName[] = [
  "Mesha", "Vrishabha", "Mithuna", "Kataka",
  "Simha", "Kanya", "Thula", "Vrichika",
  "Dhanus", "Makara", "Kumbha", "Meena",
];

const SIGN_ABBR: Record<SignName, string> = {
  Mesha: "Ari", Vrishabha: "Tau", Mithuna: "Gem", Kataka: "Can",
  Simha: "Leo", Kanya: "Vir", Thula: "Lib", Vrichika: "Sco",
  Dhanus: "Sag", Makara: "Cap", Kumbha: "Aqu", Meena: "Pis",
};

interface Props {
  section: FullHoroscopeSection<AshtaVargaPayload>;
  className?: string;
}

function getStrength(bindu: number): string {
  if (bindu >= 6) return "text-[var(--color-brand-primary)] font-bold";
  if (bindu <= 2) return "text-red-500 font-semibold";
  return "";
}

/** Planet bindu grid + Rasi/Graha Guna — adapted from astrochart/ashtaVargaTable.js. */
export function AshtaVargaSection({ section, className }: Props) {
  const data = section.data;
  const planets = data ? Object.keys(data) : [];
  const [selected, setSelected] = useState<string>("");

  const activePlanet = selected || planets[0] || "";
  const planetData = data?.[activePlanet];

  if (section.isLoading) {
    return <p className="py-10 text-center text-sm text-black/50">{HOROSCOPE_SCREEN.loadingLabel}</p>;
  }
  if (section.error || !data || !planets.length) {
    return <p className="py-10 text-center text-sm text-red-500">{section.error ?? HOROSCOPE_SCREEN.errorLoadLabel}</p>;
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Planet selector */}
      <select
        value={activePlanet}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full rounded-xl border border-[color-mix(in_srgb,var(--color-brand-primary)_40%,transparent)] bg-white px-3 py-2 text-sm font-semibold text-[var(--color-brand-black)] shadow-sm focus:outline-none"
        aria-label="Select planet"
      >
        {planets.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      {planetData && (
        <>
          {/* Summary row */}
          <div className="flex gap-3 text-xs font-semibold">
            <span className="rounded-full border border-[color-mix(in_srgb,var(--color-brand-primary)_40%,transparent)] px-3 py-1 text-[var(--color-brand-panchang)]">
              Rasi Guna: {planetData.rasiGuna}
            </span>
            <span className="rounded-full border border-[color-mix(in_srgb,var(--color-brand-primary)_40%,transparent)] px-3 py-1 text-[var(--color-brand-panchang)]">
              Graha Guna: {planetData.grahaGuna}
            </span>
          </div>

          {/* Bindu grid */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--color-brand-primary)_25%,transparent)] bg-white shadow-sm">
              <thead>
                <tr>
                  {SIGN_ORDER.map((s) => (
                    <th key={s} className="bg-[var(--color-brand-panchang)] px-2 py-2 text-center text-xs font-bold text-white">
                      {SIGN_ABBR[s]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {SIGN_ORDER.map((s) => {
                    const bindu = planetData.ashtavarga?.[s] ?? 0;
                    return (
                      <td key={s} className={cn("px-2 py-2 text-center text-sm", getStrength(bindu))}>
                        {bindu}
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-t border-[color-mix(in_srgb,var(--color-brand-primary)_15%,transparent)] bg-[color-mix(in_srgb,var(--color-brand-primary)_4%,white)]">
                  {SIGN_ORDER.map((s) => (
                    <td key={s} className="px-2 py-1.5 text-center text-xs text-black/50">
                      {planetData.trikonaReduced?.[s] ?? 0}↓
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-black/40">Row 1: Ashtavarga bindus · Row 2: Trikona-reduced</p>
        </>
      )}
    </div>
  );
}
