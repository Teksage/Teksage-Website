/** Daily prediction — Thara / Chandra / Cautious panel (`DailyPredictionBalaPanel`). */
export const DAILY_PREDICTION_BALA_UI = {
  panel:
    "rounded-[1.25rem] border border-black/[0.06] bg-white px-3 py-6 shadow-lg sm:px-6 sm:py-10",
  row: "flex items-stretch justify-center",
  column: "flex min-w-0 flex-1 flex-col items-center justify-center gap-2 px-1 text-center",
  valueNumber:
    "text-3xl font-bold leading-none text-[var(--color-brand-black)] sm:text-4xl",
  valueText:
    "text-sm font-bold leading-snug text-[var(--color-brand-black)] sm:text-base",
  label:
    "text-xs font-semibold text-[var(--color-brand-primary)] sm:text-sm",
  dividerWrap: "flex shrink-0 items-center justify-center px-0.5 sm:px-2",
  dividerImg: "h-12 w-[2px] object-cover",
  chandrashtamaBadge:
    "rounded bg-[var(--color-daily-chandrashtama-bg)] px-2 py-1 text-micro font-semibold leading-none text-[var(--color-daily-chandrashtama)] sm:text-xs",
} as const;
