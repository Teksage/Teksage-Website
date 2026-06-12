"use client";

import { useEffect, useState } from "react";
import { useT } from "@/hooks/useT";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { PredictionProfilePrompt } from "@/components/predictions/PredictionProfilePrompt";
import { LifePredictionLandingLayout } from "@/components/predictions/LifePredictionLandingLayout";
import { LifePredictionLayout } from "@/components/predictions/LifePredictionLayout";
import { LifePredictionShell } from "@/components/predictions/LifePredictionShell";
import { isPredictionProfileIncompleteMessage } from "@/lib/prediction-request-error";
import {
  fetchLifePredictionInitial,
  generateLifePrediction,
} from "@/lib/services/predictions";
import type { StructuredPredictionDetail } from "@/types/prediction-detail";

type LifeView = "loading" | "landing" | "detail" | "profile";

export function LifePredictionBody({ onBackClick }: { onBackClick: () => void }) {
  const { languageVersion } = useT();
  const [view, setView] = useState<LifeView>("loading");
  const [data, setData] = useState<StructuredPredictionDetail | null>(null);
  const [generating, setGenerating] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    fetchLifePredictionInitial(controller.signal)
      .then((result) => {
        if (cancelled) return;
        if (result.ready === "profile_incomplete") {
          setView("profile");
          return;
        }
        if (result.ready === "error") {
          if (isPredictionProfileIncompleteMessage(result.message)) {
            setView("profile");
            return;
          }
          setErr(result.message);
          setView("landing");
          return;
        }
        if (result.ready === "detail") {
          setData(result.data);
          setView("detail");
          return;
        }
        setErr(null);
        setView("landing");
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setErr(e instanceof Error ? e.message : "Request failed");
        setView("landing");
      });
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [languageVersion]);

  async function runGenerate() {
    setGenerating(true);
    setErr(null);
    const result = await generateLifePrediction();
    setGenerating(false);

    if (result.ready === "profile_incomplete") {
      setView("profile");
      return;
    }
    if (result.ready === "error") {
      if (isPredictionProfileIncompleteMessage(result.message)) {
        setView("profile");
        return;
      }
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
      <LifePredictionShell>
        <LifePredictionLayout data={data} onBackClick={onBackClick} />
      </LifePredictionShell>
    );
  }

  if (view === "profile") {
    return (
      <LifePredictionShell>
        <PredictionProfilePrompt className="relative z-10 min-h-[70vh]" />
      </LifePredictionShell>
    );
  }

  return (
    <>
      <LifePredictionShell>
        {err && !isPredictionProfileIncompleteMessage(err) ? (
          <p className="absolute inset-x-0 top-16 z-30 px-5 text-center text-sm text-[var(--color-brand-error)]">
            {err}
          </p>
        ) : null}
        <LifePredictionLandingLayout
          onBackClick={onBackClick}
          onGenerate={() => void runGenerate()}
          generating={generating}
        />
      </LifePredictionShell>
      <LoadingOverlay open={view === "loading"} />
    </>
  );
}
