import { TYPO } from "./typography";

/** Full Horoscope mobile + shared section UI tokens. */

export const HOROSCOPE_FULL_UI = {
  /** Entry strip on main Horoscope tab (not a pill button). */
  fullEntryLink: "group block w-full max-w-md lg:max-w-xl",
  fullEntryShell:
    "flex w-full items-center gap-3 rounded-[20px] border border-[color-mix(in_srgb,var(--color-brand-primary)_25%,transparent)] bg-[linear-gradient(135deg,var(--color-muhurtha-banner-top)_0%,var(--color-muhurtha-banner-bottom)_100%)] px-4 py-3.5 shadow-sm transition-[box-shadow,transform] group-hover:shadow-md group-active:scale-[0.99] sm:px-5",
  fullEntryIconWrap:
    "inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-brand-primary)] shadow-sm",
  fullEntryIcon: "size-5",
  fullEntryCopy: "flex min-w-0 flex-1 flex-col items-start gap-0.5",
  fullEntryTitle: `min-w-0 text-left ${TYPO.bodySmSemibold} text-[var(--color-brand-black)]`,
  fullEntryHint: `min-w-0 text-left ${TYPO.captionMedium} leading-snug text-[var(--color-brand-panchang)]`,
  fullEntryCta:
    "inline-flex shrink-0 items-center gap-1 text-[var(--color-brand-primary)] transition-transform group-hover:translate-x-0.5",
  fullEntryCtaLabel: `${TYPO.caption} text-[var(--color-brand-primary)]`,
  fullEntryCtaArrow: "size-4",
  pillTabListScroll:
    "scrollbar-hidden flex w-full gap-1 overflow-x-auto rounded-xl border border-[color-mix(in_srgb,var(--color-brand-primary)_25%,transparent)] bg-white p-1 shadow-sm md:overflow-visible",
  pillTabScroll:
    "shrink-0 rounded-lg px-3 py-2 text-center text-xs font-semibold whitespace-nowrap transition-colors md:min-w-0 md:flex-1 md:px-1.5 md:text-[10px] lg:text-sm",
  fullPage:
    "mx-auto flex w-full max-w-md flex-col gap-3 px-3 pb-10 pt-3 sm:gap-4 sm:px-4 lg:max-w-4xl lg:gap-4 lg:px-8 lg:pt-4",
  mainTabList:
    "scrollbar-hidden flex w-full gap-1 overflow-x-auto rounded-[28px] border border-[color-mix(in_srgb,var(--color-brand-primary)_50%,transparent)] bg-white p-1 shadow-sm md:overflow-visible",
  mainTab:
    "flex min-h-11 min-w-[4.5rem] shrink-0 flex-col items-center justify-center gap-0.5 rounded-full px-2 py-1.5 text-center transition-colors md:min-h-10 md:min-w-0 md:flex-1 md:px-0.5",
  mainTabLabel:
    "max-w-full text-[10px] font-semibold leading-tight md:truncate md:text-[10px] lg:text-xs",
  tableScroll:
    "scrollbar-hidden w-full min-w-0 overflow-x-auto overscroll-x-contain rounded-xl [-webkit-overflow-scrolling:touch]",
  toolbarMobile:
    "flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between",
} as const;
