"use client";

import { useState } from "react";
import { AshtaVargaBinduChart } from "@/components/horoscope/full/AshtaVargaBinduChart";
import { ASHTA_PLANET_TAB_ORDER, sumBindus } from "@/lib/ashta-varga-chart";
import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN, HOROSCOPE_LAYOUT } from "@/lib/constants";
import type { AshtaVargaPayload, FullHoroscopeSection } from "@/types";

interface Props {
  section: FullHoroscopeSection<AshtaVargaPayload>;
  className?: string;
}

/** Astrosoft-style Ashtavarga — planet tabs + 3 bindu charts + gunahara. */
export function AshtaVargaSection({ section, className }: Props) {
  const data = section.data;
  const tabs = data
    ? ASHTA_PLANET_TAB_ORDER.filter((p) => Boolean(data[p]))
    : [];
  const [selected, setSelected] = useState("");
  const activePlanet = selected || tabs[0] || "";
  const planetData = data?.[activePlanet];
  const isSarva = activePlanet === "SarvaAshtavarga";

  if (section.isLoading) {
    return <p className="py-10 text-center text-sm text-black/50">{HOROSCOPE_SCREEN.loadingLabel}</p>;
  }
  if (section.error || !data || !tabs.length) {
    return <p className="py-10 text-center text-sm text-red-500">{section.error ?? HOROSCOPE_SCREEN.errorLoadLabel}</p>;
  }
  if (!planetData) {
    return <p className="py-10 text-center text-sm text-red-500">{HOROSCOPE_SCREEN.errorLoadLabel}</p>;
  }

  const total = sumBindus(planetData.ashtavarga);
  const rasiGuna = planetData.rasiGuna ?? 0;
  const grahaGuna = planetData.grahaGuna ?? 0;
  const suthdha = rasiGuna + grahaGuna;
  const tabLabel = (p: string) =>
    p === "SarvaAshtavarga" ? HOROSCOPE_SCREEN.ashtaTabSarva : p;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div role="tablist" className={HOROSCOPE_LAYOUT.pillTabListScroll}>
        {tabs.map((p) => {
          const active = p === activePlanet;
          return (
            <button
              key={p}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelected(p)}
              className={cn(
                HOROSCOPE_LAYOUT.pillTabScroll,
                active
                  ? HOROSCOPE_LAYOUT.pillTabActive
                  : HOROSCOPE_LAYOUT.pillTabIdle
              )}
            >
              {tabLabel(p)}
            </button>
          );
        })}
      </div>

      {/* Three charts: stack on mobile, 3-col on sm+ */}
      <div className="mx-auto grid w-full max-w-sm grid-cols-1 gap-4 sm:max-w-none sm:grid-cols-3 sm:gap-3">
        <AshtaVargaBinduChart
          title={`${tabLabel(activePlanet)} ( ${total} )`}
          bindus={planetData.ashtavarga}
          planetPos={isSarva ? null : planetData.planetPos}
        />
        <AshtaVargaBinduChart
          title={HOROSCOPE_SCREEN.ashtaChartTrikona}
          bindus={planetData.trikonaReduced}
        />
        <AshtaVargaBinduChart
          title={HOROSCOPE_SCREEN.ashtaChartEkathipathya}
          bindus={planetData.ekathipathiyaReduced}
        />
      </div>

      {/* Gunahara summary — hidden for Sarva like Astrosoft */}
      {!isSarva && (
        <div className="mx-auto w-full max-w-sm rounded-xl border border-[color-mix(in_srgb,var(--color-brand-primary)_20%,transparent)] bg-white px-4 py-3 shadow-sm">
          <div className="flex flex-col gap-1.5 text-sm">
            <div className="flex justify-between gap-4">
              <span className="font-semibold text-[var(--color-brand-panchang)]">
                {HOROSCOPE_SCREEN.ashtaRasiGunahara}
              </span>
              <span className="font-bold text-[var(--color-brand-primary)]">{rasiGuna}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="font-semibold text-[var(--color-brand-panchang)]">
                {HOROSCOPE_SCREEN.ashtaGrahaGunahara}
              </span>
              <span className="font-bold text-[var(--color-brand-primary)]">{grahaGuna}</span>
            </div>
            <div className="flex justify-between gap-4 border-t border-[color-mix(in_srgb,var(--color-brand-primary)_12%,transparent)] pt-1.5">
              <span className="font-semibold text-[var(--color-brand-panchang)]">
                {HOROSCOPE_SCREEN.ashtaSuthdhaBindus}
              </span>
              <span className="font-bold text-[var(--color-brand-primary)]">{suthdha}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
