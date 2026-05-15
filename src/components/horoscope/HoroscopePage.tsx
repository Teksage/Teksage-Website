"use client";

import Link from "next/link";
import { useState } from "react";
import { AppHeader } from "@/components/common/AppHeader";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { EmptyState } from "@/components/common/EmptyState";
import { Loader } from "@/components/common/Loader";
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
import { buildLoginRedirectPath } from "@/lib/login-redirect";
import type { HoroscopeChartVariant } from "@/types";

/** Mirrors Flutter `HoroscopePage` (login gate + `horoscopePage.dart` split shell + charts). */
export function HoroscopePage() {
  const { isAuthenticated, data, isLoading, error, profileIncomplete, reload } =
    useHoroscope();
  const [chartVariant, setChartVariant] = useState<HoroscopeChartVariant>("south");

  const H = HOROSCOPE_SCREEN;
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
                <Link
                  href={buildLoginRedirectPath(ROUTES.horoscope)}
                  className={cn(buttonVariants(), "rounded-full")}
                >
                  {H.loginCta}
                </Link>
              }
            />
          ) : isLoading ? (
            <div className={PAGE_SHELL.loadingCenter}>
              <Loader variant="dots" size="lg" />
            </div>
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
    </div>
  );
}
