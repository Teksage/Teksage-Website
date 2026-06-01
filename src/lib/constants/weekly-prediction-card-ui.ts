/** Weekly day card — header, body, and bala row (`WeeklyPredictionDayCard`). */
export const WEEKLY_PREDICTION_CARD_UI = {
  article:
    "overflow-hidden rounded-[1.25rem] bg-white shadow-sm ring-1 ring-black/[0.06]",
  header:
    "flex min-h-[50px] items-center justify-between gap-3 rounded-t-[1.25rem] bg-[var(--color-weekly-card-header)] px-5",
  dayTitle: "text-lg font-bold text-white drop-shadow-[0_1px_2px_rgb(0_0_0_/0.2)]",
  badge: "max-w-[55%] shrink-0 rounded-full bg-white px-2.5 py-1 text-center text-xs font-bold leading-snug shadow-sm",
  badgePositive: "text-[var(--color-weekly-badge-positive)]",
  badgeNegative: "text-[var(--color-brand-error)]",
  bodyText:
    "px-5 py-5 text-base font-medium leading-relaxed text-[var(--color-brand-black)]",
  balaSection:
    "border-t border-neutral-100 bg-[var(--color-home-timing-chip-bg)]",
  balaValue: "text-lg font-bold text-[var(--color-brand-black)]",
  balaLabel: "text-xs font-bold text-[var(--color-brand-black)]",
  balaDividerWrap: "flex shrink-0 items-center px-2",
} as const;
