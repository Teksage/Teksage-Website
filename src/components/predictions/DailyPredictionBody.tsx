"use client";

import { DailyPredictionDesktopLayout } from "@/components/predictions/DailyPredictionDesktopLayout";
import type { DailyPredictionBodyProps } from "@/types/prediction-detail";

export function DailyPredictionBody({
  data,
  pageTitle,
  onBackClick,
}: DailyPredictionBodyProps) {
  return (
    <div className="w-full min-w-0">
      <DailyPredictionDesktopLayout
        data={data}
        pageTitle={pageTitle}
        onBackClick={onBackClick}
      />
    </div>
  );
}
