"use client";

import { useI18nConstants } from "@/hooks/useT";
import { AppHeader } from "@/components/common/AppHeader";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { EmptyState } from "@/components/common/EmptyState";
import { LoginPromptButton } from "@/components/common/LoginPromptButton";
import { PredictionProfilePrompt } from "@/components/predictions/PredictionProfilePrompt";
import { MuhurthaFormView } from "@/components/muhurtha/MuhurthaFormView";
import { MuhurthaViewportBackdrop } from "@/components/muhurtha/MuhurthaViewportBackdrop";
import { MuhurthaPremiumGate } from "@/components/muhurtha/MuhurthaPremiumGate";
import { buttonVariants } from "@/components/ui/button";
import { useMuhurthaAccess } from "@/hooks/useMuhurthaAccess";
import { useMuhurthaForm } from "@/hooks/useMuhurthaForm";
import { MAIN_TAB_VIEWPORT_BACKDROP, MUHURTHA_SCREEN, PAGE_SHELL, ROUTES } from "@/lib/constants";
import type { MuhurthaEventType } from "@/types/muhurtha";
import { cn } from "@/lib/utils";

export function MuhurthaFormPage() {
  const M = useI18nConstants(MUHURTHA_SCREEN);
  const { isAuthenticated, isPremium, hasProfile } = useMuhurthaAccess();
  const {
    event,
    setEvent,
    startDate,
    setStartDate,
    location,
    locationFull,
    locationError,
    onLocationChange,
    submit,
  } = useMuhurthaForm();

  const showPremiumGate = isAuthenticated && !isPremium;
  const showProfileGate = isAuthenticated && isPremium && !hasProfile;
  const showForm = isAuthenticated && isPremium && hasProfile;

  return (
    <div
      className={cn(
        PAGE_SHELL.column,
        showPremiumGate
          ? "relative flex min-h-dvh flex-col"
          : cn(PAGE_SHELL.root, showForm ? "flex min-h-dvh flex-col" : "flex flex-col")
      )}
    >
      {showForm ? (
        <MuhurthaViewportBackdrop />
      ) : !showPremiumGate ? (
        <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.brandGray} />
      ) : null}

      {!showForm ? (
        <AppHeader title={M.headerTitle} showNotification className={PAGE_SHELL.contentLayer} />
      ) : null}

      <div
        className={cn(
          PAGE_SHELL.contentLayer,
          showForm && "flex min-h-0 flex-1 flex-col",
          showPremiumGate && "flex min-h-0 flex-1 flex-col p-0"
        )}
      >
        {!isAuthenticated ? (
          <EmptyState
            title={M.loginTitle}
            description={M.loginDescription}
            action={
              <LoginPromptButton
                returnPath={ROUTES.eventPlanner}
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
        ) : showForm ? (
          <MuhurthaFormView
            event={event}
            startDate={startDate}
            location={location}
            locationFull={locationFull}
            locationError={locationError}
            onEventChange={(v) => setEvent(v as MuhurthaEventType)}
            onStartDateChange={setStartDate}
            onLocationChange={onLocationChange}
            onSubmit={submit}
          />
        ) : null}
      </div>
    </div>
  );
}
