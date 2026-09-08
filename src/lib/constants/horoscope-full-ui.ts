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
    "scrollbar-hidden flex w-full gap-1 overflow-x-auto rounded-xl border border-black/[0.08] bg-white p-1 shadow-sm md:overflow-visible",
  pillTabScroll:
    "shrink-0 rounded-lg px-3 py-2 text-center text-xs font-semibold whitespace-nowrap transition-colors md:min-w-0 md:flex-1 md:px-1.5 md:text-[10px] lg:text-sm",
  fullPage:
    "mx-auto flex w-full max-w-md flex-col gap-3 px-3 pb-8 pt-2 sm:gap-3 sm:px-4 lg:max-w-6xl lg:gap-3 lg:px-6 lg:pb-10 lg:pt-3 xl:max-w-7xl xl:px-8",

  /** Section tabs — soft segmented control (desktop-friendly). */
  mainTabList:
    "scrollbar-hidden flex w-full gap-0.5 overflow-x-auto rounded-xl border border-black/[0.08] bg-[var(--color-brand-bg)] p-1 md:overflow-visible",
  mainTab:
    "flex min-h-10 min-w-[4.25rem] shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg px-2 py-1.5 text-center transition-colors md:min-h-11 md:min-w-0 md:flex-1 md:px-1",
  mainTabActive:
    "bg-white text-[var(--color-brand-panchang)] shadow-sm ring-1 ring-black/[0.06]",
  mainTabIdle: "text-black/55 hover:bg-white/70 hover:text-black/80",
  mainTabLabel:
    "max-w-full text-[10px] font-semibold leading-tight md:truncate md:text-[10px] lg:text-xs",
  tableScroll:
    "scrollbar-hidden w-full min-w-0 overflow-x-auto overscroll-x-contain rounded-xl [-webkit-overflow-scrolling:touch]",
  toolbarMobile:
    "flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between",

  /** Charts workspace — rail + canvas (full list, no sidebar scroll). */
  chartsRoot: "flex w-full flex-col gap-3",
  chartsStage:
    "grid w-full overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-[0_1px_2px_rgb(0_0_0/0.04)] md:grid-cols-[12.5rem_minmax(0,1fr)] lg:grid-cols-[14rem_minmax(0,1fr)]",
  chartsSidebar:
    "hidden flex-col border-r border-black/[0.06] bg-[color-mix(in_srgb,var(--color-home-screen-mint)_20%,white)] md:flex",
  chartsSidebarHeader:
    "flex items-center gap-1.5 border-b border-black/[0.06] bg-[color-mix(in_srgb,var(--color-home-screen-mint)_28%,white)] px-3 py-2.5",
  chartsSidebarTitle: `${TYPO.caption} font-bold uppercase tracking-[0.08em] text-[var(--color-brand-panchang)]`,
  chartsSidebarList: "flex flex-col gap-0.5 p-2 pb-3",
  chartsSidebarItem:
    "w-full cursor-pointer rounded-md border-l-[3px] px-2.5 py-1.5 text-left text-xs font-medium transition-colors",
  chartsSidebarActive:
    "border-l-[var(--color-brand-primary)] bg-white font-semibold text-[var(--color-brand-black)] shadow-sm",
  chartsSidebarIdle:
    "border-l-transparent text-black/55 hover:bg-white/55 hover:text-black/80",
  chartsDisplay: "flex min-w-0 flex-col bg-white",
  chartsDisplayHeader:
    "flex items-end justify-between gap-3 border-b border-black/[0.06] px-4 py-3 sm:px-5 lg:px-6",
  chartsDisplayEyebrow: `${TYPO.caption} font-medium uppercase tracking-[0.06em] text-black/40`,
  chartsDisplayTitle: `${TYPO.h3} leading-tight text-[var(--color-brand-black)]`,
  chartsCanvas:
    "flex flex-1 items-center justify-center bg-[color-mix(in_srgb,var(--color-brand-bg)_70%,white)] p-4 sm:p-5 lg:p-6",
  chartsFrameWrap:
    "w-full max-w-[min(100%,24rem)] sm:max-w-md md:max-w-[min(100%,28rem)] lg:max-w-[min(100%,34rem)] xl:max-w-[36rem]",
  chartsFrame: "mx-auto w-full max-w-none rounded-xl shadow-[0_8px_28px_rgb(0_0_0/0.08)]",
} as const;
