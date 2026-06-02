"use client";

import { useEffect, useState } from "react";
import { useT } from "@/hooks/useT";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { YearlyPredictionLandingLayout } from "@/components/predictions/YearlyPredictionLandingLayout";
import { YearlyPredictionLayout } from "@/components/predictions/YearlyPredictionLayout";
import { YearlyPredictionShell } from "@/components/predictions/YearlyPredictionShell";
import {
  fetchYearlyPredictionInitial,
  generateYearlyPrediction,
} from "@/lib/services/predictions";
import type { YearlyPredictionDetail } from "@/types/prediction-yearly";

type YearlyView = "loading" | "landing" | "detail";

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

  return (
    <>
      <YearlyPredictionShell>
        {err ? (
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
