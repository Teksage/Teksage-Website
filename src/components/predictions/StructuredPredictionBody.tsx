"use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
import { PREDICTION_DETAIL_SCREEN } from "@/lib/constants/prediction-detail-screen";
// import { downloadPredictionPdf } from "@/lib/services/predictions";
// import { DOWNLOAD_FILENAMES } from "@/lib/constants/downloads";
import type { PredictionDetailKind, StructuredPredictionDetail } from "@/types/prediction-detail";

export function StructuredPredictionBody({
  data,
  shareKind,
}: {
  data: StructuredPredictionDetail;
  shareKind: Exclude<PredictionDetailKind, "daily" | "weekly">;
}) {
  void shareKind;
  // Download PDF — disabled for now; re-enable when share flow is ready.
  // const [busy, setBusy] = useState(false);
  // const pid = data.predictionId;

  if (!data.sections.length) {
    return (
      <p className="text-center text-neutral-600">
        {PREDICTION_DETAIL_SCREEN.emptyDescription}
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
      {/* Download PDF — disabled for now; re-enable when share flow is ready.
      {pid != null ? (
        <Button type="button" className="rounded-full" disabled={busy} onClick={() => void onPdf()}>
          {busy ? "…" : PREDICTION_DETAIL_SCREEN.downloadPdfCta}
        </Button>
      ) : null}
      */}
    </div>
  );
}
