"use client";

import { WeeklyPredictionLayout } from "@/components/predictions/WeeklyPredictionLayout";
import type { WeeklyPredictionDetail } from "@/types/prediction-detail";

export function WeeklyPredictionBody({
  data,
  onBackClick,
}: {
  data: WeeklyPredictionDetail;
  onBackClick: () => void;
}) {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <WeeklyPredictionLayout data={data} onBackClick={onBackClick} />
    </div>
  );
}
