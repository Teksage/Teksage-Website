import type {
  YearlyPlanetDetails,
  YearlyPlanetTransits,
  YearlyPredictionDetail,
} from "@/types/prediction-yearly";

function asRecord(v: unknown): Record<string, unknown> | null {
  if (v != null && typeof v === "object" && !Array.isArray(v)) {
    return v as Record<string, unknown>;
  }
  return null;
}

function parsePlanetDetails(raw: unknown): YearlyPlanetDetails {
  const o = asRecord(raw) ?? {};
  const before = asRecord(o.before_dasa_change) ?? {};
  const after = asRecord(o.after_dasa_change) ?? {};
  return {
    year: String(o.change_year ?? ""),
    endMonth: String(before["end-month"] ?? ""),
    startMonth: String(after["start-month"] ?? ""),
    beforeDetails: String(before.details ?? ""),
    afterDetails: String(after.details ?? ""),
  };
}

function parsePlanetTransits(raw: unknown): YearlyPlanetTransits {
  const o = asRecord(raw) ?? {};
  return {
    jupiter: parsePlanetDetails(o.jupiter),
    saturn: parsePlanetDetails(o.saturn),
    rahu: parsePlanetDetails(o.rahu),
    ketu: parsePlanetDetails(o.ketu),
    currentDasa: parsePlanetDetails(o.current_dasa),
  };
}

export function parseYearlyPredictionDetail(
  rec: Record<string, unknown>,
  predictionId: number | null
): YearlyPredictionDetail {
  const predictionRec = asRecord(rec.prediction) ?? {};
  const remediesRec = asRecord(rec.remedies) ?? {};
  return {
    kind: "yearly",
    general: String(rec.general ?? ""),
    planetTransits: parsePlanetTransits(rec.planet_transits),
    prediction: {
      career: String(predictionRec.career ?? ""),
      finance: String(predictionRec.finance ?? ""),
      health: String(predictionRec.health ?? ""),
      relationship: String(predictionRec.relationship ?? ""),
    },
    remedies: {
      chanting: String(remediesRec.chanting ?? ""),
      puja: String(remediesRec.puja ?? ""),
      charity: String(remediesRec.charity ?? ""),
    },
    predictionId,
  };
}

export function hasYearlyPredictionContent(data: YearlyPredictionDetail): boolean {
  return Boolean(data.general.trim());
}
