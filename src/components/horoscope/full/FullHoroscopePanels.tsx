"use client";

import { useState } from "react";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { FullHoroscopeTabs } from "@/components/horoscope/full/FullHoroscopeTabs";
import { DivisionalChartsSection } from "@/components/horoscope/full/DivisionalChartsSection";
import { DasaTableSection } from "@/components/horoscope/full/DasaTableSection";
import { AshtaVargaSection } from "@/components/horoscope/full/AshtaVargaSection";
import {
  PlanetsTable,
  BhavaTable,
  SpecialLagnaTable,
} from "@/components/horoscope/full/MoreSectionTables";
import { ShadbalaTable } from "@/components/horoscope/full/ShadbalaTable";
import { EventEphemerisTable } from "@/components/horoscope/full/EventEphemerisTable";
import { EphemerisTable } from "@/components/horoscope/full/EphemerisTable";
import type { FullHoroscopeState } from "@/hooks/useFullHoroscope";
import { HOROSCOPE_LAYOUT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { FullHoroscopeTab } from "@/types";

type FullHoroscopePanelsProps = {
  state: FullHoroscopeState;
  /** When set, ephemeris uses consultation customer birth place. */
  eventId?: string;
  className?: string;
};

/** Shared Full Horoscope tab body — current user or consultation event. */
export function FullHoroscopePanels({
  state,
  eventId,
  className,
}: FullHoroscopePanelsProps) {
  const [activeTab, setActiveTab] = useState<FullHoroscopeTab>("charts");

  return (
    <div className={cn(HOROSCOPE_LAYOUT.fullPage, className)}>
      <FullHoroscopeTabs active={activeTab} onChange={setActiveTab} />

      {activeTab === "charts" && (
        <DivisionalChartsSection section={state.charts} />
      )}
      {activeTab === "dasa" && <DasaTableSection section={state.dasa} />}
      {activeTab === "ashtavarga" && (
        <AshtaVargaSection section={state.ashtaVarga} />
      )}
      {activeTab === "planets" && (
        <PlanetsTable section={state.planetaryPosition} />
      )}
      {activeTab === "bhava" && <BhavaTable section={state.bhavaPosition} />}
      {activeTab === "shadbala" && <ShadbalaTable section={state.shadbala} />}
      {activeTab === "lagna" && (
        <SpecialLagnaTable section={state.specialLagna} />
      )}
      {activeTab === "ephemeris" &&
        (eventId ? <EventEphemerisTable eventId={eventId} /> : <EphemerisTable />)}

      <LoadingOverlay open={Boolean(state.isAnyLoading)} />
    </div>
  );
}
