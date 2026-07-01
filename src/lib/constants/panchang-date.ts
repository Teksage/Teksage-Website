import { TYPO } from "@/lib/constants/typography";

/** Panchang calendar — past/future window (days from today, inclusive). */
export const PANCHANG_DATE = {
  rangeDays: 365,
  weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const,
  prevMonthAria: "Previous month",
  nextMonthAria: "Next month",
  prevDayAria: "Previous day",
  nextDayAria: "Next day",
  pickDateAria: "Pick a Panchang date",
  dialogTitle: "Choose Panchang date",
  changeDateHintId: "panchang-change-date-hint",
} as const;

export const PANCHANG_DATE_LAYOUT = {
  overlay:
    "fixed inset-0 z-[250] flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-6",
  sheet:
    "relative z-[251] w-full max-w-sm rounded-t-2xl bg-white p-5 shadow-xl sm:rounded-2xl",
  dialogTitle: `${TYPO.labelSemibold} mb-3 text-center text-[var(--color-brand-black)]`,
  ribbonWrap: "flex flex-col items-center gap-1.5",
  changeDateHint: `${TYPO.caption} text-center font-semibold text-[var(--color-brand-panchang)] lg:text-[var(--color-brand-black)]/70`,
  ribbonTrigger:
    "group relative mx-auto block w-full max-w-md cursor-pointer rounded-lg border-0 bg-transparent p-0 text-left transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] active:scale-[0.99] lg:max-w-none",
  ribbonInnerRow:
    "absolute inset-0 flex items-center justify-center gap-2 px-6 sm:gap-2.5 sm:px-8",
  ribbonCalendarIcon: "size-4 shrink-0 brightness-0 invert sm:size-[18px]",
  ribbonDateText:
    "flex flex-wrap items-center justify-center gap-x-0.5 text-center text-xs font-semibold text-white sm:text-sm",
  ribbonChevron: "size-4 shrink-0 text-white/95 transition-transform group-hover:translate-y-0.5",
  wrap: "w-full",
  monthRow: "mb-1 flex items-center justify-between gap-2",
  monthLabel: `${TYPO.labelSemibold} flex-1 text-center text-sm text-[var(--color-brand-black)]`,
  monthNavBtn:
    "flex size-10 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-brand-black)_14%,transparent)] text-[var(--color-brand-black)] hover:bg-[color-mix(in_srgb,var(--color-brand-primary)_10%,transparent)]",
  monthNavChevron: "size-5",
  monthNavBtnDisabled: "cursor-not-allowed opacity-30",
  weekdayRow: "grid grid-cols-7 gap-1 py-2",
  weekday: "text-center text-xs font-semibold text-[var(--color-brand-black)]/55",
  dayGrid: "grid grid-cols-7 gap-1",
  dayCell:
    "flex h-9 items-center justify-center rounded-lg text-sm font-semibold transition-colors",
  dayCellSelected:
    "bg-[var(--color-brand-primary)] text-white",
  dayCellDefault:
    "text-[var(--color-brand-black)] hover:bg-[color-mix(in_srgb,var(--color-brand-primary)_12%,transparent)]",
  dayCellDisabled: "cursor-not-allowed text-[var(--color-brand-black)]/25",
  dayCellTodayRing:
    "ring-1 ring-[color-mix(in_srgb,var(--color-brand-primary)_45%,transparent)]",
  todayBtnWrap: "mt-4 flex justify-center",
  todayBtn:
    "rounded-full border border-[color-mix(in_srgb,var(--color-brand-primary)_30%,transparent)] px-4 py-2 text-sm font-semibold text-[var(--color-brand-primary)] hover:bg-[color-mix(in_srgb,var(--color-brand-primary)_8%,transparent)]",
} as const;
