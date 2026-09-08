"use client";

import { Suspense, useEffect } from "react";
import { AppHeader } from "@/components/common/AppHeader";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { FullHoroscopePanels } from "@/components/horoscope/full/FullHoroscopePanels";
import { useFullHoroscope } from "@/hooks/useFullHoroscope";
import { useHydratedLoggedIn } from "@/hooks/useHydratedLoggedIn";
import { useWebEmbed } from "@/hooks/useWebEmbed";
import { syncAuthStoreFromSession } from "@/lib/auth-user-type";
import { buildLoginRedirectPath } from "@/lib/login-redirect";
import { cn } from "@/lib/utils";
import {
  HOROSCOPE_SCREEN,
  MAIN_TAB_VIEWPORT_BACKDROP,
  PAGE_SHELL,
  ROUTES,
} from "@/lib/constants";

/** Full Horoscope — guests → login, then back here with their chart data. */
function FullHoroscopePageInner() {
  const H = HOROSCOPE_SCREEN;
  const state = useFullHoroscope();
  const embed = useWebEmbed();
  const { ready, loggedIn } = useHydratedLoggedIn();

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
      <div className={PAGE_SHELL.contentLayer}>
        <FullHoroscopePanels state={state} />
      </div>
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
