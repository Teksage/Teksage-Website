"use client";

import { useI18nConstants } from "@/hooks/useT";
import { PREDICTION_DETAIL_SCREEN } from "@/lib/constants/prediction-detail-screen";
import type { PredictionDetailKind, StructuredPredictionDetail } from "@/types/prediction-detail";

export function StructuredPredictionBody({
  data,
  shareKind,
}: {
  data: StructuredPredictionDetail;
  shareKind: Exclude<PredictionDetailKind, "daily" | "weekly">;
}) {
  const PD = useI18nConstants(PREDICTION_DETAIL_SCREEN);
  void shareKind;

  if (!data.sections.length) {
    return (
      <p className="text-center text-neutral-600">
        {PD.emptyDescription}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {data.sections.map((s) => (
        <section
          key={s.title}
          className="rounded-2xl border border-black/[0.06] bg-white p-4 shadow-sm"
        >
          <h2 className="text-sm font-bold text-[var(--color-brand-panchang)]">{s.title}</h2>
          <pre className="mt-2 whitespace-pre-wrap font-sans text-sm text-neutral-800">
            {s.content}
          </pre>
        </section>
      ))}
    </div>
  );
}
