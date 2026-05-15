"use client";

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
  const { isAuthenticated, isPremium, data, isLoading, error, reload } = usePanchang();

  const showPersonalizedShell =
    isAuthenticated && isPremium && Boolean(data) && !isLoading && !error;

  return (
    <div className={cn(PAGE_SHELL.column, PAGE_SHELL.root)}>
      {!showPersonalizedShell ? (
        <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.brandGray} />
      ) : null}
      {!showPersonalizedShell ? (
        <AppHeader
          title={PANCHANG_SCREEN.headerTitle}
          showNotification
          className={PAGE_SHELL.contentLayer}
        />
      ) : null}

      {showPersonalizedShell && data ? (
        <PanchangDetailView panchang={data.panchang} />
      ) : (
        <div className={PAGE_SHELL.contentLayer}>
          {!isAuthenticated ? (
            <EmptyState
              title={PANCHANG_SCREEN.loginTitle}
              description={PANCHANG_SCREEN.loginDescription}
              action={
                <Link
                  href={buildLoginRedirectPath(ROUTES.panchang)}
                  className={cn(buttonVariants(), "rounded-full")}
                >
                  {PANCHANG_SCREEN.loginCta}
                </Link>
              }
            />
          ) : !isPremium ? (
            <PanchangPremiumGate />
          ) : isLoading ? (
            <div className={PAGE_SHELL.loadingCenter}>
              <Loader variant="dots" size="lg" />
            </div>
          ) : error ? (
            <EmptyState
              title={PANCHANG_SCREEN.loadErrorTitle}
              description={error}
              action={
                <Button type="button" onClick={() => reload()} className="rounded-full">
                  {PANCHANG_SCREEN.tryAgainCta}
                </Button>
              }
            />
          ) : null}
        </div>
      )}
    </div>
  );
}
