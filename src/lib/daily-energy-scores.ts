/** Map Thara (1–9) / Chandra (1–12) into 0–5 category scores when AI scores are absent. */

function parseBala(value: unknown, fallback: number): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value.trim());
    if (Number.isFinite(n)) return n;
  }
  return fallback;
}

function clampHalfStar(value: number): number {
  const clamped = Math.max(0, Math.min(5, value));
  return Math.round(clamped * 2) / 2;
}

export function parseDailyCategoryScore(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return clampHalfStar(value);
  }
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value.trim());
    if (Number.isFinite(n)) return clampHalfStar(n);
  }
  return undefined;
}

export type DailyEnergyScores = {
  career: number;
  relationship: number;
  wealth: number;
  health: number;
};

/**
 * Deterministic fallback when cached daily predictions predate `*_score` fields.
 * Aligns with prompt guidance: higher Thara/Chandra lifts scores; Chandra 8 lowers health/rel.
 */
export function deriveDailyEnergyScores(
  tharaBala?: string | number | null,
  chandraBala?: string | number | null
): DailyEnergyScores {
  const t = Math.max(1, Math.min(9, parseBala(tharaBala, 5)));
  const c = Math.max(1, Math.min(12, parseBala(chandraBala, 6)));
  const ti = Math.round(t);
  const ci = Math.round(c);

  const base = 1.5 + ((t - 1) * 3) / 8;
  const chandraMod =
    ([1, 3, 6, 7].includes(ci) ? 0.5 : 0) +
    ([2, 4, 5].includes(ci) ? -0.5 : 0) +
    (ci === 8 ? -1 : 0);

  const careerAdj = [6, 8, 9].includes(ti)
    ? 0.75
    : [1, 3, 5, 7].includes(ti)
      ? -0.5
      : 0.25;
  const wealthAdj = [2, 4].includes(ti)
    ? 0.75
    : [1, 3, 7].includes(ti)
      ? -0.25
      : 0.25;
  const healthAdj = [1, 3, 7].includes(ti)
    ? -1
    : [6, 9].includes(ti)
      ? 0.5
      : 0;
  const relAdj = [1, 3, 6].includes(ci) ? 0.5 : ci === 8 ? -0.75 : 0;

  return {
    career: clampHalfStar(base + careerAdj + chandraMod * 0.3),
    relationship: clampHalfStar(base + relAdj + chandraMod * 0.5),
    wealth: clampHalfStar(base + wealthAdj + chandraMod * 0.2),
    health: clampHalfStar(base + healthAdj + chandraMod * 0.4),
  };
}

export function resolveDailyEnergyScores(input: {
  careerScore?: number;
  relationshipScore?: number;
  wealthScore?: number;
  healthScore?: number;
  tharaBala?: string | number | null;
  chandraBala?: string | number | null;
}): Partial<DailyEnergyScores> {
  const hasAny =
    input.careerScore != null ||
    input.relationshipScore != null ||
    input.wealthScore != null ||
    input.healthScore != null;

  if (hasAny) {
    return {
      career: input.careerScore,
      relationship: input.relationshipScore,
      wealth: input.wealthScore,
      health: input.healthScore,
    };
  }

  if (input.tharaBala == null && input.chandraBala == null) {
    return {};
  }

  return deriveDailyEnergyScores(input.tharaBala, input.chandraBala);
}
