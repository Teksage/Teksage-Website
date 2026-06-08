"use client";

import { useEffect, useState } from "react";
import { useT } from "@/hooks/useT";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { PredictionProfilePrompt } from "@/components/predictions/PredictionProfilePrompt";
import { YearlyPredictionLandingLayout } from "@/components/predictions/YearlyPredictionLandingLayout";
import { YearlyPredictionLayout } from "@/components/predictions/YearlyPredictionLayout";
import { YearlyPredictionShell } from "@/components/predictions/YearlyPredictionShell";
import { isPredictionProfileIncompleteMessage } from "@/lib/prediction-request-error";
import { YEARLY_PREDICTION_ASSETS } from "@/lib/constants/prediction-assets";
import {
  fetchYearlyPredictionInitial,
  generateYearlyPrediction,
} from "@/lib/services/predictions";
import type { YearlyPredictionDetail } from "@/types/prediction-yearly";

type YearlyView = "loading" | "landing" | "detail" | "profile";

export function YearlyPredictionBody({ onBackClick }: { onBackClick: () => void }) {
  const { languageVersion } = useT();
  const [view, setView] = useState<YearlyView>("loading");
  const [data, setData] = useState<YearlyPredictionDetail | null>(null);
  const [generating, setGenerating] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchYearlyPredictionInitial(controller.signal)
      .then((result) => {
        if (result.ready === "profile_incomplete") {
          setView("profile");
          return;
        }
        if (result.ready === "error") {
          setErr(result.message);
          setView("landing");
          return;
        }
        if (result.ready === "detail") {
          setData(result.data);
          setView("detail");
          return;
        }
        setView("landing");
      })
      .catch((e: unknown) => {
        if (controller.signal.aborted) return;
        setErr(e instanceof Error ? e.message : "Request failed");
        setView("landing");
      });
    return () => controller.abort();
  }, [languageVersion]);

  async function runGenerate() {
    setGenerating(true);
    setErr(null);
    const result = await generateYearlyPrediction();
    setGenerating(false);

    if (result.ready === "profile_incomplete") {
      setView("profile");
      return;
    }
    if (result.ready === "error") {
      setErr(result.message);
      return;
    }
    if (result.ready === "detail") {
      setData(result.data);
      setView("detail");
    }
  }

  if (view === "detail" && data) {
    return (
      <YearlyPredictionShell>
        <YearlyPredictionLayout
          data={data}
          onBackClick={onBackClick}
          onRegenerate={() => void runGenerate()}
          regenerating={generating}
        />
      </YearlyPredictionShell>
    );
  }

  if (view === "profile") {
    return (
      <YearlyPredictionShell>
        <button
          type="button"
          onClick={onBackClick}
          className="absolute left-5 top-[var(--yearly-landing-back-top)] z-20 p-2"
          aria-label="Go back"
        >
          <img
            src={YEARLY_PREDICTION_ASSETS.appBarBack}
            alt=""
            className="h-5 w-5 brightness-0"
          />
        </button>
        <PredictionProfilePrompt className="relative z-10 min-h-[70vh] text-white [&_h3]:text-white [&_p]:text-white/90" />
      </YearlyPredictionShell>
    );
  }

  return (
    <>
      <YearlyPredictionShell>
        {err && !isPredictionProfileIncompleteMessage(err) ? (
          <p className="absolute inset-x-0 top-16 z-30 px-5 text-center text-sm text-[var(--color-brand-error)]">
            {err}
          </p>
        ) : null}
        <YearlyPredictionLandingLayout
          onBackClick={onBackClick}
          onGenerate={() => void runGenerate()}
          generating={generating}
        />
      </YearlyPredictionShell>
      <LoadingOverlay open={view === "loading"} />
    </>
  );
}
