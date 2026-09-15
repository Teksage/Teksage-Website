"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { FullHoroscopePanels } from "@/components/horoscope/full/FullHoroscopePanels";
import { SettingsPageHeader } from "@/components/settings/SettingsPageHeader";
import { useFullHoroscope } from "@/hooks/useFullHoroscope";
import { useHydratedLoggedIn } from "@/hooks/useHydratedLoggedIn";
import { useI18nConstants } from "@/hooks/useT";
import { useWebEmbed } from "@/hooks/useWebEmbed";
import { syncAuthStoreFromSession } from "@/lib/auth-user-type";
import { buildLoginRedirectPath } from "@/lib/login-redirect";
import { cn } from "@/lib/utils";
import {
  HOROSCOPE_LAYOUT,
  HOROSCOPE_SCREEN,
  MAIN_TAB_VIEWPORT_BACKDROP,
  PAGE_SHELL,
  ROUTES,
} from "@/lib/constants";

/** Full Horoscope — guests → login, then back here with their chart data. */
function FullHoroscopePageInner() {
  const H = useI18nConstants(HOROSCOPE_SCREEN);
  const router = useRouter();
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
      <div className={PAGE_SHELL.contentLayer}>
        {embed ? null : (
          <SettingsPageHeader
            title={H.fullHoroscopeTitle}
            subtitle={H.fullHoroscopeSubtitle}
            backLabel={H.fullHoroscopeBack}
            onBack={() => router.push(ROUTES.horoscope)}
            className={HOROSCOPE_LAYOUT.fullPageHeader}
          />
        )}
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
