"use client";

import { useI18nConstants } from "@/hooks/useT";
import { AppHeader } from "@/components/common/AppHeader";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { LoginPromptButton } from "@/components/common/LoginPromptButton";
import { PredictionProfilePrompt } from "@/components/predictions/PredictionProfilePrompt";
import { MuhurthaFormView } from "@/components/muhurtha/MuhurthaFormView";
import { MuhurthaPremiumGate } from "@/components/muhurtha/MuhurthaPremiumGate";
import { MuhurthaResultsView } from "@/components/muhurtha/MuhurthaResultsView";
import { Button, buttonVariants } from "@/components/ui/button";
import { useMuhurtha } from "@/hooks/useMuhurtha";
import {
  MAIN_TAB_VIEWPORT_BACKDROP,
  MUHURTHA_SCREEN,
  PAGE_SHELL,
  ROUTES,
} from "@/lib/constants";
import type { MuhurthaEventType } from "@/types/muhurtha";
import { cn } from "@/lib/utils";

export function MuhurthaPage() {
  const M = useI18nConstants(MUHURTHA_SCREEN);
  const {
    isAuthenticated,
    isPremium,
    hasProfile,
    event,
    setEvent,
    startDate,
    setStartDate,
    data,
    isLoading,
    error,
    search,
    resetResults,
    location,
    locationFull,
    locationError,
    onLocationChange,
  } = useMuhurtha();

  const showResults = Boolean(data?.result);
  const showPremiumGate = isAuthenticated && !isPremium;
  const showProfileGate = isAuthenticated && isPremium && !hasProfile;
  const showForm =
    isAuthenticated && isPremium && hasProfile && !showResults && !isLoading;
  const showPersonalizedShell = showResults;

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

      <AppHeader
        title={M.headerTitle}
        showNotification
        className={PAGE_SHELL.contentLayer}
      />

      <div
        className={cn(
          PAGE_SHELL.contentLayer,
          showPremiumGate && "flex min-h-0 flex-1 flex-col p-0"
        )}
      >
        {!isAuthenticated ? (
          <EmptyState
            title={M.loginTitle}
            description={M.loginDescription}
            action={
              <LoginPromptButton
                returnPath={ROUTES.muhurtha}
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
        ) : showResults && data ? (
          <MuhurthaResultsView result={data.result} onBack={resetResults} />
        ) : error && !isLoading ? (
          <EmptyState
            title={M.loadErrorTitle}
            description={error}
            action={
              <Button type="button" onClick={() => search()} className="rounded-full">
                {M.tryAgainCta}
              </Button>
            }
          />
        ) : showForm ? (
          <MuhurthaFormView
            event={event}
            startDate={startDate}
            location={location}
            locationFull={locationFull}
            locationError={locationError}
            busy={isLoading}
            error={error}
            onEventChange={(v) => setEvent(v as MuhurthaEventType)}
            onStartDateChange={setStartDate}
            onLocationChange={onLocationChange}
            onSubmit={() => search()}
          />
        ) : null}
      </div>

      <LoadingOverlay open={Boolean(isAuthenticated && isPremium && hasProfile && isLoading)} />
    </div>
  );
}
