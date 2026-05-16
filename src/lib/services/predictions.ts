import { http } from "./http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type {
  PredictionDetailKind,
  PredictionDetailViewModel,
} from "@/types/prediction-detail";
import {
  parsePredictionApiBody,
  toPredictionViewModel,
  isPredictionError,
  PREDICTION_PARSE_EMPTY,
  type PredictionDetailError,
} from "@/lib/prediction-api-parse";
import {
  LIFE_LANDING_SCREEN,
  YEARLY_LANDING_SCREEN,
} from "@/lib/constants/prediction-screen-copy";
import { hasYearlyPredictionContent } from "@/lib/prediction-yearly-parse";
import type { StructuredPredictionDetail, YearlyPredictionDetail } from "@/types/prediction-detail";

function endpointForKind(kind: PredictionDetailKind): string {
  switch (kind) {
    case "daily":
      return API_ENDPOINTS.dailyPrediction;
    case "weekly":
      return API_ENDPOINTS.weeklyPrediction;
    case "yearly":
      return API_ENDPOINTS.yearlyPrediction;
    case "life":
      return API_ENDPOINTS.lifePrediction;
  }
}

async function fetchPredictionRaw(
  kind: PredictionDetailKind,
  generate: boolean
): Promise<PredictionDetailViewModel | PredictionDetailError> {
  const path =
    kind === "yearly" || kind === "life"
      ? `${endpointForKind(kind)}?generate=${generate}`
      : endpointForKind(kind);

  const { data: body } = await http.get<unknown>(path);
  const parsed = parsePredictionApiBody(body);
  if ("message" in parsed) return parsed;

  return toPredictionViewModel(kind, parsed.data, parsed.predictionId);
}

export async function fetchPredictionDetail(
  kind: PredictionDetailKind
): Promise<PredictionDetailViewModel | PredictionDetailError> {
  return fetchPredictionRaw(kind, false);
}

export async function generatePredictionDetail(
  kind: "yearly" | "life"
): Promise<PredictionDetailViewModel | PredictionDetailError> {
  return fetchPredictionRaw(kind, true);
}

export type YearlyInitialResult =
  | { ready: "landing" }
  | { ready: "detail"; data: YearlyPredictionDetail }
  | { ready: "error"; message: string };

/**
 * `GET …/yearly?generate=false` — always show the landing UI (Generate button).
 * The API may return a cached prediction; we do not open the detail view until
 * the user taps Generate (`generate=true`).
 */
export async function fetchYearlyPredictionInitial(
  signal?: AbortSignal
): Promise<YearlyInitialResult> {
  const { data: body } = await http.get<unknown>(
    `${API_ENDPOINTS.yearlyPrediction}?generate=false`,
    { signal }
  );
  const parsed = parsePredictionApiBody(body);
  if ("message" in parsed) {
    return { ready: "error", message: parsed.message };
  }
  return { ready: "landing" };
}

/** `GET …/yearly?generate=true` — create/regenerate then show detail. */
export async function generateYearlyPrediction(): Promise<YearlyInitialResult> {
  const res = await fetchPredictionRaw("yearly", true);
  if (isPredictionError(res)) {
    return { ready: "error", message: res.message };
  }
  if (res.kind !== "yearly" || !hasYearlyPredictionContent(res)) {
    return { ready: "error", message: YEARLY_LANDING_SCREEN.generateError };
  }
  return { ready: "detail", data: res };
}

export type LifeInitialResult =
  | { ready: "landing" }
  | { ready: "detail"; data: StructuredPredictionDetail }
  | { ready: "error"; message: string };

function hasLifePredictionContent(
  res: PredictionDetailViewModel
): res is StructuredPredictionDetail {
  return res.kind === "life" && res.sections.length > 0;
}

/**
 * `GET …/life?generate=false` — always show the landing UI (Generate button).
 * Cached predictions are ignored until the user taps Generate.
 */
export async function fetchLifePredictionInitial(
  signal?: AbortSignal
): Promise<LifeInitialResult> {
  const { data: body } = await http.get<unknown>(
    `${API_ENDPOINTS.lifePrediction}?generate=false`,
    { signal }
  );
  const parsed = parsePredictionApiBody(body);
  if ("message" in parsed) {
    return { ready: "error", message: parsed.message };
  }
  return { ready: "landing" };
}

/** `GET …/life?generate=true` — create/regenerate then show detail. */
export async function generateLifePrediction(): Promise<LifeInitialResult> {
  const res = await fetchPredictionRaw("life", true);
  if (isPredictionError(res)) {
    return { ready: "error", message: res.message };
  }
  if (!hasLifePredictionContent(res)) {
    return { ready: "error", message: LIFE_LANDING_SCREEN.generateError };
  }
  return { ready: "detail", data: res };
}

export async function downloadPredictionPdf(args: {
  kind: "daily" | "weekly" | "yearly" | "life";
  predictionId: number;
  filename: string;
}): Promise<void> {
  const path =
    args.kind === "daily"
      ? API_ENDPOINTS.shareDaily
      : args.kind === "weekly"
        ? API_ENDPOINTS.shareWeekly
        : args.kind === "yearly"
          ? API_ENDPOINTS.shareYearly
          : API_ENDPOINTS.shareLife;

  const { data } = await http.post<Blob>(
    path,
    { prediction_id: args.predictionId },
    { responseType: "blob" }
  );

  const url = URL.createObjectURL(data);
  const a = document.createElement("a");
  a.href = url;
  a.download = args.filename;
  a.click();
  URL.revokeObjectURL(url);
}

export { isPredictionError };
export type { PredictionDetailViewModel } from "@/types/prediction-detail";
export type { PredictionDetailError } from "@/lib/prediction-api-parse";
