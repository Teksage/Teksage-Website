"use client";

import { Suspense, useEffect, useState } from "react";
import { AppHeader } from "@/components/common/AppHeader";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
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
import { EphemerisTable } from "@/components/horoscope/full/EphemerisTable";
import { useFullHoroscope } from "@/hooks/useFullHoroscope";
import { useHydratedLoggedIn } from "@/hooks/useHydratedLoggedIn";
import { useWebEmbed } from "@/hooks/useWebEmbed";
import { syncAuthStoreFromSession } from "@/lib/auth-user-type";
import { buildLoginRedirectPath } from "@/lib/login-redirect";
import { cn } from "@/lib/utils";
import {
  HOROSCOPE_SCREEN,
  HOROSCOPE_LAYOUT,
  MAIN_TAB_VIEWPORT_BACKDROP,
  PAGE_SHELL,
  ROUTES,
} from "@/lib/constants";
import type { FullHoroscopeTab } from "@/types";

/** Full Horoscope — guests → login, then back here with their chart data. */
function FullHoroscopePageInner() {
  const H = HOROSCOPE_SCREEN;
  const state = useFullHoroscope();
  const embed = useWebEmbed();
  const { ready, loggedIn } = useHydratedLoggedIn();
  const [activeTab, setActiveTab] = useState<FullHoroscopeTab>("charts");

  useEffect(() => {
    if (!ready) return;
    syncAuthStoreFromSession();
    if (!loggedIn) {
      window.location.assign(buildLoginRedirectPath(ROUTES.horoscopeFull));
    }
  }, [ready, loggedIn]);

  if (!ready || !loggedIn) {
    return (
      <div className={cn(PAGE_SHELL.column, PAGE_SHELL.root)}>
        <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.horoscopeMint} />
        <LoadingOverlay open />
      </div>
    );
  }

  return (
    <div className={cn(PAGE_SHELL.column, PAGE_SHELL.root)}>
      <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.horoscopeMint} />
      {embed ? null : (
        <AppHeader
          title={H.fullHoroscopeTitle}
          showBack
          className={PAGE_SHELL.contentLayer}
        />
      )}

      <div className={cn(PAGE_SHELL.contentLayer, HOROSCOPE_LAYOUT.fullPage)}>
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
        {activeTab === "ephemeris" && <EphemerisTable />}
      </div>

      <LoadingOverlay open={Boolean(state.isAnyLoading)} />
    </div>
  );
}

export function FullHoroscopePage() {
  return (
    <Suspense fallback={null}>
      <FullHoroscopePageInner />
    </Suspense>
  );
}
