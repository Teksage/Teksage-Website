import { TYPO } from "@/lib/constants/typography";

/** Profile DOB picker — mirrors Flutter `CustomDatePicker` + `profile_page.dart`. */

export const PROFILE_DATE_PICKER = {
  placeholder: "DD/MM/YYYY",
  dialogTitle: "Select date of birth",
  monthAria: "Month",
  yearAria: "Year",
  prevMonthAria: "Previous month",
  nextMonthAria: "Next month",
  weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const,
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ] as const,
} as const;

export const PROFILE_DATE_PICKER_LAYOUT = {
  overlay:
    "fixed inset-0 z-[250] flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-6",
  sheet:
    "relative z-[251] w-full max-w-sm rounded-t-2xl bg-white p-5 shadow-xl sm:rounded-2xl",
  title: `${TYPO.bodySemibold} mb-1 text-center text-[var(--color-brand-black)]`,
  preview: `${TYPO.caption} mb-4 text-center font-medium text-black/50`,
  selectRow: "mb-3 grid grid-cols-2 gap-2",
  select:
    "h-11 w-full appearance-none rounded-xl border border-black/15 bg-neutral-50 px-3 text-sm font-semibold text-[var(--color-brand-black)] focus:border-[var(--color-brand-primary)] focus:outline-none",
  navRow: "mb-2 flex items-center justify-between",
  monthLabel: `${TYPO.bodySemibold} text-[var(--color-brand-black)]`,
  monthNavBtn:
    "flex size-9 items-center justify-center rounded-full text-lg font-bold text-[var(--color-brand-black)] hover:bg-black/5 disabled:opacity-30",
  divider: "mb-2 border-t border-black/10",
  weekdayRow: "grid grid-cols-7 gap-1 pb-1",
  weekday: `${TYPO.caption} text-center font-semibold text-black/45`,
  dayGrid: "grid grid-cols-7 gap-1",
  dayCell:
    "flex h-10 items-center justify-center rounded-full text-sm font-semibold transition-colors",
  dayCellSelected: "bg-[var(--color-brand-primary)] text-white",
  dayCellDefault: "text-[var(--color-brand-black)] hover:bg-black/5",
  dayCellDisabled: "cursor-not-allowed text-black/25",
  fieldBtn:
    "flex h-12 w-full items-center rounded-xl border border-black/15 bg-neutral-100 px-4 text-left text-sm font-medium transition-colors",
  fieldBtnEditable:
    "cursor-pointer focus-visible:border-[var(--color-brand-primary)] focus-visible:outline-none",
  fieldBtnDisabled: "cursor-not-allowed border-black/10 text-neutral-800",
  fieldPlaceholder: "text-black/45",
} as const;
