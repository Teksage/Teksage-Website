import { TYPO } from "./typography";

/** Searchable country dial picker — mirrors Flutter `CountryDropdownDialog`. */

export const COUNTRY_DIAL_PICKER = {
  title: "Select Country Dial Code",
  searchPlaceholder: "Search country or dial code",
  closeAria: "Close",
  emptyResults: "No countries found",
  loadError: "Could not load country codes",
  loading: "Loading…",
  triggerAria: "Country code",
} as const;

export const COUNTRY_DIAL_PICKER_UI = {
  overlay:
    "fixed inset-0 z-[250] flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-6",
  card: "relative z-[251] flex max-h-[85vh] w-full max-w-md flex-col rounded-t-2xl bg-white shadow-xl sm:rounded-2xl",
  header: "flex items-center justify-between border-b border-black/10 px-4 py-3",
  title: `${TYPO.bodySemibold} text-[var(--color-brand-black)]`,
  closeBtn: "flex size-8 items-center justify-center rounded-full hover:bg-black/5",
  searchWrap: "px-4 pt-3",
  searchInput:
    "h-11 w-full rounded-xl border border-black/15 bg-neutral-50 px-3 text-sm font-medium outline-none focus:border-[var(--color-brand-primary)]",
  list: "min-h-0 flex-1 overflow-y-auto px-2 pb-4 pt-2",
  row: "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-black/5",
  flag: "size-6 shrink-0 rounded-sm object-cover",
  rowLabel: "min-w-0 flex-1 truncate text-sm font-semibold text-[var(--color-brand-black)]",
  dial: "shrink-0 text-sm font-bold text-neutral-600",
  empty: "px-4 py-8 text-center text-sm text-black/50",
  trigger:
    "flex h-full w-full cursor-pointer items-center justify-center gap-0.5 border-none bg-transparent text-sm font-bold outline-none disabled:cursor-not-allowed disabled:opacity-60",
  triggerChevron: "size-3.5 shrink-0 text-neutral-500",
} as const;
