/** Yearly / life prediction premium gate — mirrors mobile `handlePredictionAccess`. */

export const PREDICTION_PREMIUM_GATE = {
  title: "Premium Feature",
  expiredTitle: "Plan Expired",
  description: "Unlock yearly and life predictions with a premium plan.",
  upgradeCta: "View Plans",
} as const;

export const PREDICTION_PREMIUM_GATE_UI = {
  root: "flex min-h-dvh flex-col bg-[var(--color-brand-bg)]",
  body: "mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-6 py-12 text-center",
  crown: "mb-4",
  title: "text-xl font-bold text-[var(--color-brand-black)]",
  description: "mt-2 text-sm leading-relaxed text-black/60",
  cta: "mt-6 rounded-full bg-[var(--color-brand-primary)] px-8 py-3 text-base font-semibold text-white",
} as const;
