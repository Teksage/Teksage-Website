"use client";

import { useState } from "react";
import { AppHeader } from "@/components/common/AppHeader";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { buttonVariants } from "@/components/ui/button";
import { LoginPromptButton } from "@/components/common/LoginPromptButton";
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
import { cn } from "@/lib/utils";
import {
  HOROSCOPE_SCREEN,
  HOROSCOPE_LAYOUT,
  MAIN_TAB_VIEWPORT_BACKDROP,
  PAGE_SHELL,
  ROUTES,
} from "@/lib/constants";
import type { FullHoroscopeTab } from "@/types";

/** Full Horoscope page — all AstroSoft sections behind auth gate. */
export function FullHoroscopePage() {
  const H = HOROSCOPE_SCREEN;
  const state = useFullHoroscope();
  const [activeTab, setActiveTab] = useState<FullHoroscopeTab>("charts");

  return (
    <div className={cn(PAGE_SHELL.column, PAGE_SHELL.root)}>
      <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.horoscopeMint} />
      <AppHeader
        title={H.fullHoroscopeTitle}
        showBack
        className={PAGE_SHELL.contentLayer}
      />

      {!state.isAuthenticated ? (
        <div className={PAGE_SHELL.contentLayer}>
          <EmptyState
            title={H.loginTitle}
            description={H.loginDescription}
            action={
              <LoginPromptButton
                returnPath={ROUTES.horoscopeFull}
                redirectHomeOnClose
                className={cn(buttonVariants(), "rounded-full")}
              >
                {H.loginCta}
              </LoginPromptButton>
            }
          />
        </div>
      ) : (
        <div
          className={cn(
            PAGE_SHELL.contentLayer,
            HOROSCOPE_LAYOUT.fullPage
          )}
        >
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
          {activeTab === "bhava" && (
            <BhavaTable section={state.bhavaPosition} />
          )}
          {activeTab === "shadbala" && (
            <ShadbalaTable section={state.shadbala} />
          )}
          {activeTab === "lagna" && (
            <SpecialLagnaTable section={state.specialLagna} />
          )}
          {activeTab === "ephemeris" && <EphemerisTable />}
        </div>
      )}

      <LoadingOverlay
        open={Boolean(state.isAuthenticated && state.isAnyLoading)}
      />
    </div>
  );
}
