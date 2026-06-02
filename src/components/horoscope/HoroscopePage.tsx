"use client";

import { useI18nConstants } from "@/hooks/useT";
import Link from "next/link";
import { useState } from "react";
import { AppHeader } from "@/components/common/AppHeader";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { Button, buttonVariants } from "@/components/ui/button";
import { HoroscopeLoadedView } from "@/components/horoscope/HoroscopeLoadedView";
import { useHoroscope } from "@/hooks/useHoroscope";
import { cn } from "@/lib/utils";
import {
  HOROSCOPE_SCREEN,
  MAIN_TAB_VIEWPORT_BACKDROP,
  PAGE_SHELL,
  ROUTES,
} from "@/lib/constants";
import { LoginPromptButton } from "@/components/common/LoginPromptButton";
import type { HoroscopeChartVariant } from "@/types";

/** Mirrors Flutter `HoroscopePage` (login gate + `horoscopePage.dart` split shell + charts). */
export function HoroscopePage() {
  const H = useI18nConstants(HOROSCOPE_SCREEN);
  const { isAuthenticated, data, isLoading, error, profileIncomplete, reload } =
    useHoroscope();
  const [chartVariant, setChartVariant] = useState<HoroscopeChartVariant>("south");

  const showChartShell =
    isAuthenticated && Boolean(data) && !isLoading && !error && !profileIncomplete;

  return (
    <div className={cn(PAGE_SHELL.column, PAGE_SHELL.root)}>
      {!showChartShell ? (
        <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.horoscopeMint} />
      ) : null}
      {!showChartShell ? (
        <AppHeader
          title={H.headerTitle}
          showNotification
          className={PAGE_SHELL.contentLayer}
        />
      ) : null}

      {showChartShell && data ? (
        <HoroscopeLoadedView
          data={data}
          chartVariant={chartVariant}
          onChartVariantChange={setChartVariant}
        />
      ) : (
        <div className={PAGE_SHELL.contentLayer}>
          {!isAuthenticated ? (
            <EmptyState
              title={H.loginTitle}
              description={H.loginDescription}
              action={
                <LoginPromptButton
                  returnPath={ROUTES.horoscope}
                  redirectHomeOnClose
                  className={cn(buttonVariants(), "rounded-full")}
                >
                  {H.loginCta}
                </LoginPromptButton>
              }
            />
          ) : profileIncomplete ? (
            <EmptyState
              title={H.profileIncompleteTitle}
              description={H.profileIncompleteDescription}
              action={
                <Link href={ROUTES.profile} className={cn(buttonVariants(), "rounded-full")}>
                  {H.profileCta}
                </Link>
              }
            />
          ) : error ? (
            <EmptyState
              title={H.loadErrorTitle}
              description={error}
              action={
                <Button type="button" onClick={() => reload()} className="rounded-full">
                  {H.tryAgainCta}
                </Button>
              }
            />
          ) : null}
        </div>
      )}
      <LoadingOverlay open={Boolean(isAuthenticated && isLoading)} />
    </div>
  );
}
