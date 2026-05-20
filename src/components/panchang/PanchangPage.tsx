"use client";

import { useI18nConstants } from "@/hooks/useT";
import Link from "next/link";
import { AppHeader } from "@/components/common/AppHeader";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { EmptyState } from "@/components/common/EmptyState";
import { Loader } from "@/components/common/Loader";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  MAIN_TAB_VIEWPORT_BACKDROP,
  PAGE_SHELL,
  PANCHANG_SCREEN,
  ROUTES,
} from "@/lib/constants";
import { buildLoginRedirectPath } from "@/lib/login-redirect";
import { PanchangPremiumGate } from "@/components/panchang/PanchangPremiumGate";
import { PanchangDetailView } from "@/components/panchang/PanchangDetailView";
import { usePanchang } from "@/hooks/usePanchang";

/** Mirrors Flutter `PanchangPage` + `PanchangSubscriptionCheckPage` (premium gate). */
export function PanchangPage() {
  const P = useI18nConstants(PANCHANG_SCREEN);
  const { isAuthenticated, isPremium, data, isLoading, error, reload } = usePanchang();

  const showPersonalizedShell =
    isAuthenticated && isPremium && Boolean(data) && !isLoading && !error;
  const showPremiumGate = isAuthenticated && !isPremium;

  return (
    <div
      className={cn(
        PAGE_SHELL.column,
        showPremiumGate
          ? "relative flex min-h-dvh flex-col"
          : cn(PAGE_SHELL.root, !showPersonalizedShell && "flex flex-col")
      )}
    >
      {!showPersonalizedShell && !showPremiumGate ? (
        <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.brandGray} />
      ) : null}
      {!showPersonalizedShell ? (
        <AppHeader
          title={P.headerTitle}
          showNotification
          className={PAGE_SHELL.contentLayer}
        />
      ) : null}

      {showPersonalizedShell && data ? (
        <PanchangDetailView panchang={data.panchang} />
      ) : (
        <div
          className={cn(
            PAGE_SHELL.contentLayer,
            showPremiumGate && "flex min-h-0 flex-1 flex-col p-0"
          )}
        >
          {!isAuthenticated ? (
            <EmptyState
              title={P.loginTitle}
              description={P.loginDescription}
              action={
                <Link
                  href={buildLoginRedirectPath(ROUTES.panchang)}
                  className={cn(buttonVariants(), "rounded-full")}
                >
                  {P.loginCta}
                </Link>
              }
            />
          ) : showPremiumGate ? (
            <PanchangPremiumGate />
          ) : isLoading ? (
            <div className={PAGE_SHELL.loadingCenter}>
              <Loader variant="dots" size="lg" />
            </div>
          ) : error ? (
            <EmptyState
              title={P.loadErrorTitle}
              description={error}
              action={
                <Button type="button" onClick={() => reload()} className="rounded-full">
                  {P.tryAgainCta}
                </Button>
              }
            />
          ) : null}
        </div>
      )}
    </div>
  );
}
