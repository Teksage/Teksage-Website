import { http } from "./http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type {
  PredictionDetailKind,
  PredictionDetailViewModel,
} from "@/types/prediction-detail";
import { cautiousFromWeeklyDetail } from "@/lib/daily-prediction-cautious";
import {
  parsePredictionApiBody,
  toPredictionViewModel,
  isPredictionError,
  PREDICTION_PARSE_EMPTY,
  type PredictionDetailError,
} from "@/lib/prediction-api-parse";
import type { DailyPredictionDetail } from "@/types/prediction-detail";
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
  if (kind !== "daily") {
    return fetchPredictionRaw(kind, false);
  }
  return fetchDailyPredictionDetail();
}

async function fetchDailyPredictionDetail(): Promise<
  DailyPredictionDetail | PredictionDetailError
> {
  const [daily, weekly] = await Promise.all([
    fetchPredictionRaw("daily", false),
    fetchPredictionRaw("weekly", false),
  ]);

  if (isPredictionError(daily)) return daily;
  if (daily.kind !== "daily") {
    return { message: "Unexpected prediction format" };
  }

  let cautious = daily.cautious;
  if (
    !cautious &&
    !isPredictionError(weekly) &&
    weekly.kind === "weekly"
  ) {
    cautious = cautiousFromWeeklyDetail(weekly);
  }

  return cautious ? { ...daily, cautious } : daily;
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
 * `GET …/yearly?generate=false` — mirrors Flutter `getYearlyPrediction()`:
 * show detail when cached data exists, otherwise landing (Generate).
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
  const vm = toPredictionViewModel("yearly", parsed.data, parsed.predictionId);
  if (isPredictionError(vm)) {
    if (vm.message === PREDICTION_PARSE_EMPTY) {
      return { ready: "landing" };
    }
    return { ready: "error", message: vm.message };
  }
  if (vm.kind !== "yearly" || !hasYearlyPredictionContent(vm)) {
    return { ready: "landing" };
  }
  return { ready: "detail", data: vm };
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
 * `GET …/life?generate=false` — mirrors Flutter `getLifePrediction()`:
 * show detail when cached data exists, otherwise landing (Generate).
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
  const vm = toPredictionViewModel("life", parsed.data, parsed.predictionId);
  if (isPredictionError(vm)) {
    if (vm.message === PREDICTION_PARSE_EMPTY) {
      return { ready: "landing" };
    }
    return { ready: "error", message: vm.message };
  }
  if (!hasLifePredictionContent(vm)) {
    return { ready: "landing" };
  }
  return { ready: "detail", data: vm };
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
