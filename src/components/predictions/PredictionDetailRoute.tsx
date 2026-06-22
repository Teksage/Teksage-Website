"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { Button, buttonVariants } from "@/components/ui/button";
import { DailyPredictionBody } from "@/components/predictions/DailyPredictionBody";
import { WeeklyPredictionBody } from "@/components/predictions/WeeklyPredictionBody";
import { YearlyPredictionBody } from "@/components/predictions/YearlyPredictionBody";
import { LifePredictionBody } from "@/components/predictions/LifePredictionBody";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { useAuthStore } from "@/store/auth.store";
import { fetchPredictionDetail, isPredictionError } from "@/lib/services/predictions";
import { PREDICTION_DETAIL_SCREEN } from "@/lib/constants/prediction-detail-screen";
import { PAGE_SHELL, ROUTES } from "@/lib/constants";
import { LoginPromptButton } from "@/components/common/LoginPromptButton";
import { PredictionPremiumGate } from "@/components/predictions/PredictionPremiumGate";
import { PredictionProfilePrompt } from "@/components/predictions/PredictionProfilePrompt";
import { isPredictionProfileIncompleteMessage } from "@/lib/prediction-request-error";
import { cn } from "@/lib/utils";
import type { PredictionDetailKind, PredictionDetailViewModel } from "@/types/prediction-detail";

const TITLES: Record<PredictionDetailKind, string> = {
  daily: "Daily Prediction",
  weekly: "Weekly Prediction",
  yearly: "Yearly Prediction",
  life: "Life Prediction",
};

function redirectForKind(k: PredictionDetailKind) {
  switch (k) {
    case "daily":
      return ROUTES.predictionsDaily;
    case "weekly":
      return ROUTES.predictionsWeekly;
    case "yearly":
      return ROUTES.predictionsYearly;
    case "life":
      return ROUTES.predictionsLife;
  }
}

function usesFlutterShell(kind: PredictionDetailKind, loading: boolean, err: string | null, vm: PredictionDetailViewModel | null) {
  if (!vm && !loading && !err) return kind === "yearly" || kind === "life";
  if (loading || err) return false;
  if (kind === "daily" && vm?.kind === "daily") return true;
  if (kind === "weekly" && vm?.kind === "weekly") return true;
  if (kind === "yearly" || kind === "life") return true;
  return false;
}

export function PredictionDetailRoute({ kind }: { kind: PredictionDetailKind }) {
  const PD = useI18nConstants(PREDICTION_DETAIL_SCREEN);
  const router = useRouter();
  const { t, version: languageVersion } = useAppLanguage();
  const { isAuthenticated } = useAuthStore();
  const [vm, setVm] = useState<PredictionDetailViewModel | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const title = t(TITLES[kind]);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (kind === "yearly" || kind === "life") {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setErr(null);
    fetchPredictionDetail(kind)
      .then((res) => {
        if (cancelled) return;
        if (isPredictionError(res)) {
          setErr(res.message);
          setVm(null);
        } else {
          setVm(res);
          setErr(null);
        }
      })
      .catch(() => {
        if (!cancelled) setErr("Request failed");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [kind, isAuthenticated, languageVersion]);

  if (!isAuthenticated) {
    return (
      <div className={cn(PAGE_SHELL.column, PAGE_SHELL.root, "bg-[var(--color-brand-bg)]")}>
        <AppHeader title={title} showBack onBackClick={() => router.back()} />
        <div className="mx-auto max-w-lg px-5 py-10 text-center">
          <p className="font-semibold text-[var(--color-brand-black)]">
            {PD.loginTitle}
          </p>
          <p className="mt-2 text-sm text-neutral-600">
            {PD.loginDescription}
          </p>
          <LoginPromptButton
            returnPath={redirectForKind(kind)}
            redirectHomeOnClose
            className={cn(buttonVariants(), "mt-6 inline-flex rounded-full")}
          >
            {PD.loginCta}
          </LoginPromptButton>
        </div>
      </div>
    );
  }

  const flutterShell = usesFlutterShell(kind, loading, err, vm);

  if (kind === "yearly") {
    return (
      <PredictionPremiumGate onBack={() => router.back()}>
        <div className={cn(PAGE_SHELL.column, PAGE_SHELL.flutterFullBleed, "w-full min-w-0")}>
          <YearlyPredictionBody onBackClick={() => router.back()} />
        </div>
      </PredictionPremiumGate>
    );
  }
  if (kind === "life") {
    return (
      <PredictionPremiumGate onBack={() => router.back()}>
        <div className={cn(PAGE_SHELL.column, PAGE_SHELL.flutterFullBleed, "w-full min-w-0")}>
          <LifePredictionBody onBackClick={() => router.back()} />
        </div>
      </PredictionPremiumGate>
    );
  }

  const flutterFullBleedShell =
    flutterShell &&
    cn(
      PAGE_SHELL.flutterFullBleed,
      "flex min-h-0 flex-1 flex-col lg:h-full lg:min-h-0"
    );

  return (
    <div
      className={cn(
        PAGE_SHELL.column,
        kind === "weekly" || kind === "daily" ? "h-full min-h-0" : PAGE_SHELL.root,
        "w-full bg-[var(--color-brand-bg)]",
        flutterFullBleedShell
      )}
    >
      <AppHeader
        title={title}
        showBack
        onBackClick={() => router.back()}
        className={flutterShell ? "hidden" : undefined}
      />
      <div
        className={cn(
          flutterFullBleedShell ??
            (flutterShell
              ? PAGE_SHELL.flutterFullBleed
              : "mx-auto w-full max-w-lg px-4 py-6 lg:max-w-3xl")
        )}
      >
        {err && isPredictionProfileIncompleteMessage(err) ? (
          <PredictionProfilePrompt />
        ) : err ? (
          <div className="text-center">
            <p className="font-semibold text-[var(--color-brand-error)]">{err}</p>
            <Button type="button" className="mt-4 rounded-full" onClick={() => window.location.reload()}>
              {PD.tryAgainCta}
            </Button>
          </div>
        ) : vm?.kind === "daily" ? (
          <DailyPredictionBody data={vm} pageTitle={title} onBackClick={() => router.back()} />
        ) : vm?.kind === "weekly" ? (
          <WeeklyPredictionBody data={vm} onBackClick={() => router.back()} />
        ) : (
          <p className="text-center text-neutral-600">{PD.emptyDescription}</p>
        )}
      </div>
      <LoadingOverlay open={loading} />
    </div>
  );
}
