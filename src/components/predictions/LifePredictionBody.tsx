"use client";

import { useEffect, useState } from "react";
import { Loader } from "@/components/common/Loader";
import { LifePredictionLandingLayout } from "@/components/predictions/LifePredictionLandingLayout";
import { LifePredictionLayout } from "@/components/predictions/LifePredictionLayout";
import { LifePredictionShell } from "@/components/predictions/LifePredictionShell";
import {
  fetchLifePredictionInitial,
  generateLifePrediction,
} from "@/lib/services/predictions";
import type { StructuredPredictionDetail } from "@/types/prediction-detail";

type LifeView = "loading" | "landing" | "detail";

export function LifePredictionBody({ onBackClick }: { onBackClick: () => void }) {
  const [view, setView] = useState<LifeView>("loading");
  const [data, setData] = useState<StructuredPredictionDetail | null>(null);
  const [generating, setGenerating] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchLifePredictionInitial(controller.signal)
      .then((result) => {
        if (result.ready === "error") {
          setErr(result.message);
        }
        setView("landing");
      })
      .catch((e: unknown) => {
        if (controller.signal.aborted) return;
        setErr(e instanceof Error ? e.message : "Request failed");
        setView("landing");
      });
    return () => controller.abort();
  }, []);

  async function runGenerate() {
    setGenerating(true);
    setErr(null);
    const result = await generateLifePrediction();
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

  if (view === "loading") {
    return (
      <LifePredictionShell className="flex h-dvh items-center justify-center">
        <Loader variant="dots" size="lg" />
      </LifePredictionShell>
    );
  }

  if (view === "detail" && data) {
    return (
      <LifePredictionShell>
        <LifePredictionLayout data={data} onBackClick={onBackClick} />
      </LifePredictionShell>
    );
  }

  return (
    <LifePredictionShell>
      {err ? (
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
  );
}
