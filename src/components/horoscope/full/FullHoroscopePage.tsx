"use client";

import { useState } from "react";
import Link from "next/link";
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
import { MoreSection } from "@/components/horoscope/full/MoreSection";
import { useFullHoroscope } from "@/hooks/useFullHoroscope";
import { cn } from "@/lib/utils";
import {
  HOROSCOPE_SCREEN,
  MAIN_TAB_VIEWPORT_BACKDROP,
  PAGE_SHELL,
  ROUTES,
} from "@/lib/constants";
import type { FullHoroscopeTab } from "@/components/horoscope/full/FullHoroscopeTabs";

/** Full Horoscope page — all AstroSoft sections behind auth gate. */
export function FullHoroscopePage() {
  const H = HOROSCOPE_SCREEN;
  const state = useFullHoroscope();
  const [activeTab, setActiveTab] = useState<FullHoroscopeTab>("charts");

  const showContent = state.isAuthenticated;

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
            "mx-auto flex w-full max-w-md flex-col gap-4 px-4 pb-8 pt-4 lg:max-w-4xl lg:px-8"
          )}
        >
          <FullHoroscopeTabs active={activeTab} onChange={setActiveTab} />

          {activeTab === "charts" && (
            <DivisionalChartsSection section={state.charts} />
          )}
          {activeTab === "dasa" && (
            <DasaTableSection section={state.dasa} />
          )}
          {activeTab === "ashtavarga" && (
            <AshtaVargaSection section={state.ashtaVarga} />
          )}
          {activeTab === "more" && (
            <MoreSection
              specialLagna={state.specialLagna}
              shadbala={state.shadbala}
              bhavaPosition={state.bhavaPosition}
              planetaryPosition={state.planetaryPosition}
            />
          )}
        </div>
      )}

      <LoadingOverlay open={Boolean(showContent && state.isAnyLoading)} />
    </div>
  );
}
