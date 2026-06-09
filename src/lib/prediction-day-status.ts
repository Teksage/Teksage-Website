/** Weekly/daily day label colors — Flutter `predictionContainer.dart` + `colorConstant.dart`. */

export const PREDICTION_DAY_STATUS_UI = {
  positiveText: "text-[var(--color-weekly-badge-positive)]",
  negativeText: "text-[var(--color-brand-error)]",
} as const;

const POSITIVE_THARA_BALAS = new Set([2, 4, 6, 8, 9]);

export function parsePredictionPositiveDay(value: unknown): boolean | undefined {
  if (value === true || value === 1) return true;
  if (value === false || value === 0) return false;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true" || normalized === "1") return true;
    if (normalized === "false" || normalized === "0") return false;
  }
  return undefined;
}

export function inferPositiveDayFromTharaBala(
  tharaBala: number | string | undefined
): boolean | undefined {
  if (tharaBala == null || tharaBala === "") return undefined;
  const numeric = typeof tharaBala === "number" ? tharaBala : Number(tharaBala);
  if (!Number.isFinite(numeric)) return undefined;
  return POSITIVE_THARA_BALAS.has(numeric);
}

export function resolvePredictionPositiveDay(args: {
  isPositiveDay?: unknown;
  tharaBala?: number | string;
}): boolean {
  const parsed = parsePredictionPositiveDay(args.isPositiveDay);
  if (parsed != null) return parsed;
  return inferPositiveDayFromTharaBala(args.tharaBala) ?? false;
}

export function predictionDayStatusTextClass(isPositiveDay: boolean): string {
  return isPositiveDay
    ? PREDICTION_DAY_STATUS_UI.positiveText
    : PREDICTION_DAY_STATUS_UI.negativeText;
}
