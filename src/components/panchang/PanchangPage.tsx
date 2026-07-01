"use client";

import { useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import { AppHeader } from "@/components/common/AppHeader";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  MAIN_TAB_VIEWPORT_BACKDROP,
  PAGE_SHELL,
  PANCHANG_SCREEN,
  ROUTES,
} from "@/lib/constants";
import { LoginPromptButton } from "@/components/common/LoginPromptButton";
import { PanchangPremiumGate } from "@/components/panchang/PanchangPremiumGate";
import { PanchangDetailView } from "@/components/panchang/PanchangDetailView";
import { usePanchang } from "@/hooks/usePanchang";

/** Mirrors Flutter `PanchangPage` + `PanchangSubscriptionCheckPage` (premium gate). */
export function PanchangPage() {
  const P = useI18nConstants(PANCHANG_SCREEN);
  const { isAuthenticated, isPremium, data, isLoading, error, reload, sharePdf, selectedDate, setSelectedDate } =
    usePanchang();
  const [pdfBusy, setPdfBusy] = useState(false);

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
        <PanchangDetailView
          panchang={data.panchang}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          pdfBusy={pdfBusy}
          onDownloadPdf={() => {
            setPdfBusy(true);
            void sharePdf().finally(() => setPdfBusy(false));
          }}
        />
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
                <LoginPromptButton
                  returnPath={ROUTES.panchang}
                  redirectHomeOnClose
                  className={cn(buttonVariants(), "rounded-full")}
                >
                  {P.loginCta}
                </LoginPromptButton>
              }
            />
          ) : showPremiumGate ? (
            <PanchangPremiumGate />
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
      <LoadingOverlay
        open={Boolean(isAuthenticated && !showPremiumGate && isLoading)}
      />
    </div>
  );
}
