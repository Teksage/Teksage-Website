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
  return <WeeklyPredictionLayout data={data} onBackClick={onBackClick} />;
}
