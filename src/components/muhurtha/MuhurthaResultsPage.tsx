"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useRouter } from "next/navigation";
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
import { writeAskAstrologerFlow } from "@/lib/ask-astrologer-session";
import { MAIN_TAB_VIEWPORT_BACKDROP, MUHURTHA_LAYOUT, MUHURTHA_SCREEN, PAGE_SHELL, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MuhurthaResultsPage() {
  const M = useI18nConstants(MUHURTHA_SCREEN);
  const L = MUHURTHA_LAYOUT;
  const router = useRouter();
  const { isAuthenticated, isPremium, hasProfile, isHydratingProfile } =
    useMuhurthaAccess();
  const { data, isLoading, error, retry } = useMuhurthaResults();

  function handleAskAstrologer() {
    if (!data?.result) return;
    const r = data.result;
    const dateRange = r.start_date && r.end_date
      ? `${r.start_date} to ${r.end_date}`
      : r.start_date ?? "";
    writeAskAstrologerFlow({
      user_question: `Event Planner: ${r.event} — ${dateRange} — ${r.location}`,
      ai_response: "",
      muhurtha_result: r,
    });
    router.push(ROUTES.askAstrologerLanguages);
  }

  const showPremiumGate = isAuthenticated && !isPremium;
  const showProfileGate =
    isAuthenticated && isPremium && !hasProfile && !isHydratingProfile;
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
            title={
              error === M.startDateOutOfRange
                ? M.startDateOutOfRange
                : M.loadErrorTitle
            }
            description={
              error === M.startDateOutOfRange ? undefined : error
            }
            action={
              <Button
                type="button"
                className={L.submitCta}
                onClick={() => {
                  if (error === M.startDateOutOfRange) {
                    router.push(ROUTES.eventPlanner);
                    return;
                  }
                  retry();
                }}
              >
                {error === M.startDateOutOfRange
                  ? M.backToFormCta
                  : M.tryAgainCta}
              </Button>
            }
          />
        ) : data?.result ? (
          <MuhurthaResultsView result={data.result} onAskAstrologer={handleAskAstrologer} />
        ) : null}
      </div>

      <LoadingOverlay
        open={Boolean(
          (isAuthenticated && isHydratingProfile) || (showResults && isLoading)
        )}
      />
    </div>
  );
}
