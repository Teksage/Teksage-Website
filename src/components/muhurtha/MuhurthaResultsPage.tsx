"use client";

import { useI18nConstants } from "@/hooks/useT";
import { AppHeader } from "@/components/common/AppHeader";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { LoginPromptButton } from "@/components/common/LoginPromptButton";
import { PredictionProfilePrompt } from "@/components/predictions/PredictionProfilePrompt";
import { MuhurthaResultsView } from "@/components/muhurtha/MuhurthaResultsView";
import { MuhurthaViewportBackdrop } from "@/components/muhurtha/MuhurthaViewportBackdrop";
import { MuhurthaPremiumGate } from "@/components/muhurtha/MuhurthaPremiumGate";
import { Button, buttonVariants } from "@/components/ui/button";
import { useMuhurthaAccess } from "@/hooks/useMuhurthaAccess";
import { useMuhurthaResults } from "@/hooks/useMuhurthaResults";
import { MAIN_TAB_VIEWPORT_BACKDROP, MUHURTHA_LAYOUT, MUHURTHA_SCREEN, PAGE_SHELL, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MuhurthaResultsPage() {
  const M = useI18nConstants(MUHURTHA_SCREEN);
  const L = MUHURTHA_LAYOUT;
  const { isAuthenticated, isPremium, hasProfile } = useMuhurthaAccess();
  const { data, isLoading, error, retry } = useMuhurthaResults();

  const showPremiumGate = isAuthenticated && !isPremium;
  const showProfileGate = isAuthenticated && isPremium && !hasProfile;
  const showResults = isAuthenticated && isPremium && hasProfile;

  return (
    <div
      className={cn(
        PAGE_SHELL.column,
        showPremiumGate
          ? "relative flex min-h-dvh flex-col"
          : cn(PAGE_SHELL.root, showResults ? "flex min-h-dvh flex-col" : "flex flex-col")
      )}
    >
      {showResults ? (
        <MuhurthaViewportBackdrop />
      ) : !showPremiumGate ? (
        <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.brandGray} />
      ) : null}

      {!showResults ? (
        <AppHeader title={M.headerTitle} showNotification className={PAGE_SHELL.contentLayer} />
      ) : null}

      <div
        className={cn(
          PAGE_SHELL.contentLayer,
          showResults && "flex min-h-0 flex-1 flex-col",
          showPremiumGate && "flex min-h-0 flex-1 flex-col p-0"
        )}
      >
        {!isAuthenticated ? (
          <EmptyState
            title={M.loginTitle}
            description={M.loginDescription}
            action={
              <LoginPromptButton
                returnPath={ROUTES.eventPlannerResults}
                redirectHomeOnClose
                className={cn(buttonVariants(), "rounded-full")}
              >
                {M.loginCta}
              </LoginPromptButton>
            }
          />
        ) : showPremiumGate ? (
          <MuhurthaPremiumGate />
        ) : showProfileGate ? (
          <PredictionProfilePrompt />
        ) : error && !isLoading ? (
          <EmptyState
            title={M.loadErrorTitle}
            description={error}
            action={
              <Button type="button" className={L.submitCta} onClick={retry}>
                {M.tryAgainCta}
              </Button>
            }
          />
        ) : data?.result ? (
          <MuhurthaResultsView result={data.result} />
        ) : null}
      </div>

      <LoadingOverlay open={Boolean(showResults && isLoading)} />
    </div>
  );
}
