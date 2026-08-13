export type PredictionDetailKind = "daily" | "weekly" | "yearly" | "life";

export interface DailyPredictionDetail {
  kind: "daily";
  career: string[];
  relationship: string[];
  wealth: string[];
  health: string[];
  quote?: string;
  tharaBala?: string;
  chandraBala?: string;
  /** Weekly `short_prediction` for today (e.g. Comfort & Joy). */
  cautious?: string;
  cautiousIsPositiveDay?: boolean;
  careerScore?: number;
  relationshipScore?: number;
  wealthScore?: number;
  healthScore?: number;
  predictionId: number | null;
}

export interface DailyPredictionBodyProps {
  data: DailyPredictionDetail;
  pageTitle: string;
  onBackClick: () => void;
}

export interface WeeklyDayPrediction {
  day: string;
  shortPrediction: string;
  longPrediction: string;
  isPositiveDay?: boolean;
  tharaBala?: number;
  chandraBala?: number;
}

export interface WeeklyPredictionDetail {
  kind: "weekly";
  days: WeeklyDayPrediction[];
  predictionId: number | null;
}

export interface StructuredPredictionDetail {
  kind: "life";
  sections: { title: string; content: string }[];
  predictionId: number | null;
}

import type { YearlyPredictionDetail } from "@/types/prediction-yearly";

export type { YearlyPredictionDetail } from "@/types/prediction-yearly";

export type PredictionDetailViewModel =
  | DailyPredictionDetail
  | WeeklyPredictionDetail
  | YearlyPredictionDetail
  | StructuredPredictionDetail;

export interface PredictionDetailError {
  message: string;
}
