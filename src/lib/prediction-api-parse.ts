import { mapPredictionApiStringError } from "@/lib/prediction-request-error";
import { resolvePredictionPositiveDay } from "@/lib/prediction-day-status";
import { parseYearlyPredictionDetail } from "@/lib/prediction-yearly-parse";
import type {
  DailyPredictionDetail,
  PredictionDetailKind,
  PredictionDetailViewModel,
  StructuredPredictionDetail,
  WeeklyDayPrediction,
  WeeklyPredictionDetail,
} from "@/types/prediction-detail";
import type { MatchMakingExisting, MatchMakingResult } from "@/types/match-making";

export type PredictionDetailError = { message: string };

/** Returned when API `data` is null — yearly/life landing, not a user-facing error. */
export const PREDICTION_PARSE_EMPTY = "No prediction data";

function asRecord(v: unknown): Record<string, unknown> | null {
  if (v != null && typeof v === "object" && !Array.isArray(v)) {
    return v as Record<string, unknown>;
  }
  return null;
}

function stringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => String(x)).filter(Boolean);
}

function titleCaseDay(key: string): string {
  if (!key) return key;
  return key.charAt(0).toUpperCase() + key.slice(1);
}

export function parsePredictionApiBody(
  raw: unknown
): { predictionId: number | null; data: unknown } | PredictionDetailError {
  if (raw == null || typeof raw !== "object") {
    return { message: "Invalid response" };
  }
  const o = raw as Record<string, unknown>;
  const predictionId =
    typeof o.prediction_id === "number" ? o.prediction_id : null;
  const data = o.data;
  if (typeof data === "string") {
    return { message: mapPredictionApiStringError(data) };
  }
  return { predictionId, data };
}

export function toPredictionViewModel(
  kind: PredictionDetailKind,
  data: unknown,
  predictionId: number | null
): PredictionDetailViewModel | PredictionDetailError {
  if (data == null) {
    return { message: PREDICTION_PARSE_EMPTY };
  }
  const rec = asRecord(data);
  if (!rec) {
    return { message: "Unexpected prediction format" };
  }

  if (kind === "daily") {
    const d: DailyPredictionDetail = {
      kind: "daily",
      career: stringArray(rec.career),
      relationship: stringArray(rec.relationship),
      wealth: stringArray(rec.wealth),
      health: stringArray(rec.health),
      quote: rec.quote != null ? String(rec.quote) : undefined,
      tharaBala:
        rec.thara_bala != null ? String(rec.thara_bala) : undefined,
      chandraBala:
        rec.chandra_bala != null ? String(rec.chandra_bala) : undefined,
      predictionId,
    };
    return d;
  }

  if (kind === "weekly") {
    const days: WeeklyDayPrediction[] = [];
    for (const [dayKey, val] of Object.entries(rec)) {
      const dayRec = asRecord(val);
      if (!dayRec) continue;
      const tharaBala =
        typeof dayRec.thara_bala === "number"
          ? dayRec.thara_bala
          : undefined;
      days.push({
        day: titleCaseDay(dayKey),
        shortPrediction: String(dayRec.short_prediction ?? ""),
        longPrediction: String(dayRec.long_prediction ?? ""),
        isPositiveDay: resolvePredictionPositiveDay({
          isPositiveDay: dayRec.is_positive_day,
          tharaBala,
        }),
        tharaBala,
        chandraBala:
          typeof dayRec.chandra_bala === "number"
            ? dayRec.chandra_bala
            : undefined,
      });
    }
    return { kind: "weekly", days, predictionId } satisfies WeeklyPredictionDetail;
  }

  const sections: { title: string; content: string }[] = [];
  const pushSection = (title: string, val: unknown) => {
    if (val == null) return;
    if (typeof val === "string") {
      if (val.trim()) sections.push({ title, content: val });
      return;
    }
    sections.push({ title, content: JSON.stringify(val, null, 2) });
  };

  if (kind === "yearly") {
    return parseYearlyPredictionDetail(rec, predictionId);
  }

  {
    pushSection("General", rec.general);
    pushSection("Career", rec.career);
    pushSection("Relationship", rec.relationship);
    pushSection("Wealth", rec.wealth);
    pushSection("Health", rec.health);
    pushSection("Current time period", rec.current_time_period);
  }

  return {
    kind: "life",
    sections,
    predictionId,
  } satisfies StructuredPredictionDetail;
}

export function isPredictionError(
  v: PredictionDetailViewModel | PredictionDetailError
): v is PredictionDetailError {
  return "message" in v;
}

function asMatchResult(raw: unknown): MatchMakingResult {
  const r = asRecord(raw);
  if (!r) return {};
  const kutasRaw = r.kutas;
  const kutas = Array.isArray(kutasRaw)
    ? kutasRaw.map((row) => {
        const o = asRecord(row);
        return o
          ? {
              kuta: o.kuta != null ? String(o.kuta) : undefined,
              max: typeof o.max === "number" ? o.max : undefined,
              gained: typeof o.gained === "number" ? o.gained : undefined,
              details: o.details != null ? String(o.details) : undefined,
              present: typeof o.present === "boolean" ? o.present : undefined,
            }
          : {};
      })
    : undefined;
  return {
    general_details:
      r.general_details != null ? String(r.general_details) : undefined,
    kutas,
    gained: typeof r.gained === "number" ? r.gained : undefined,
    max_score: typeof r.max_score === "number" ? r.max_score : undefined,
  };
}

export function parseCompatibilityGet(
  raw: unknown
): { existing: MatchMakingExisting | null; rawMatchId: number | null } {
  if (raw == null || typeof raw !== "object") {
    return { existing: null, rawMatchId: null };
  }
  const o = raw as Record<string, unknown>;
  const rawMatchId =
    typeof o.match_making_id === "number" ? o.match_making_id : null;
  const row = o.data;
  if (row == null || typeof row !== "object") {
    return { existing: null, rawMatchId };
  }
  const m = row as Record<string, unknown>;
  let resultRaw: unknown = m.compatibility_result;
  if (typeof resultRaw === "string") {
    try {
      resultRaw = JSON.parse(resultRaw) as unknown;
    } catch {
      resultRaw = {};
    }
  }
  const existing: MatchMakingExisting = {
    matchMakingId: typeof m.id === "number" ? m.id : rawMatchId ?? 0,
    boyName: String(m.boy_name ?? ""),
    girlName: String(m.girl_name ?? ""),
    boyRashi: String(m.boy_rashi ?? ""),
    boyNakshatra: String(m.boy_nakshatra ?? ""),
    girlRashi: String(m.girl_rashi ?? ""),
    girlNakshatra: String(m.girl_nakshatra ?? ""),
    result: asMatchResult(resultRaw),
  };
  return { existing, rawMatchId };
}

export function parseCompatibilityPost(
  raw: unknown
): { result: MatchMakingResult; matchMakingId: number } | null {
  if (raw == null || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const id = typeof o.match_making_id === "number" ? o.match_making_id : null;
  if (id == null) return null;
  return { result: asMatchResult(o.data), matchMakingId: id };
}
