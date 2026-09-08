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

/** Ashtavarga workspace — planet chips + bindu charts (distinct from Dasa tabs). */
export function AshtaVargaSection({ section, className }: Props) {
  const data = section.data;
  const tabs = data
    ? ASHTA_PLANET_TAB_ORDER.filter((p) => Boolean(data[p]))
    : [];
  const [selected, setSelected] = useState("");
  const activePlanet = selected || tabs[0] || "";
  const planetData = data?.[activePlanet];
  const isSarva = activePlanet === "SarvaAshtavarga";
  const L = HOROSCOPE_LAYOUT;

  if (section.isLoading) {
    return (
      <p className="py-10 text-center text-sm text-black/50">
        {HOROSCOPE_SCREEN.loadingLabel}
      </p>
    );
  }
  if (section.error || !data || !tabs.length) {
    return (
      <p className="py-10 text-center text-sm text-red-500">
        {section.error ?? HOROSCOPE_SCREEN.errorLoadLabel}
      </p>
    );
  }
  if (!planetData) {
    return (
      <p className="py-10 text-center text-sm text-red-500">
        {HOROSCOPE_SCREEN.errorLoadLabel}
      </p>
    );
  }

  const total = sumBindus(planetData.ashtavarga);
  const rasiGuna = planetData.rasiGuna ?? 0;
  const grahaGuna = planetData.grahaGuna ?? 0;
  const suthdha = rasiGuna + grahaGuna;
  const tabLabel = (p: string) =>
    p === "SarvaAshtavarga" ? HOROSCOPE_SCREEN.ashtaTabSarva : p;

  return (
    <div className={cn(L.ashtaRoot, className)}>
      <div className={L.ashtaStage}>
        <header className={L.ashtaHeader}>
          <div>
            <p className={L.ashtaHeaderEyebrow}>
              {HOROSCOPE_SCREEN.ashtaSectionEyebrow}
            </p>
            <h2 className={L.ashtaHeaderTitle}>{HOROSCOPE_SCREEN.tabAshtavarga}</h2>
          </div>
          <div className="space-y-1.5">
            <p className={L.ashtaPlanetLabel}>
              {HOROSCOPE_SCREEN.ashtaPlanetPickerLabel}
            </p>
            <div role="tablist" className={L.ashtaPlanetRail}>
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
                      L.ashtaPlanetChip,
                      active ? L.ashtaPlanetChipActive : L.ashtaPlanetChipIdle
                    )}
                  >
                    {tabLabel(p)}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        <div className={L.ashtaChartsGrid}>
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

        {!isSarva ? (
          <div className={L.ashtaGunahara}>
            <div className={L.ashtaGunaharaItem}>
              <span className={L.ashtaGunaharaLabel}>
                {HOROSCOPE_SCREEN.ashtaRasiGunahara}
              </span>
              <span className={L.ashtaGunaharaValue}>{rasiGuna}</span>
            </div>
            <div className={L.ashtaGunaharaItem}>
              <span className={L.ashtaGunaharaLabel}>
                {HOROSCOPE_SCREEN.ashtaGrahaGunahara}
              </span>
              <span className={L.ashtaGunaharaValue}>{grahaGuna}</span>
            </div>
            <div className={L.ashtaGunaharaItem}>
              <span className={L.ashtaGunaharaLabel}>
                {HOROSCOPE_SCREEN.ashtaSuthdhaBindus}
              </span>
              <span className={L.ashtaGunaharaValue}>{suthdha}</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
