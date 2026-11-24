import { TYPO } from "@/lib/constants/typography";

/** Desktop left rail layout — modern dashboard sidebar. */
export const DESKTOP_SIDEBAR_UI = {
  aside:
    "relative sticky top-0 z-30 hidden h-full shrink-0 flex-col border-r border-black/[0.06] bg-white transition-[width] duration-200 ease-out lg:flex",
  brandRow:
    "flex items-center gap-2.5 border-b border-black/[0.06] py-3.5 pl-3 pr-3 xl:pr-4",
  brandRowCollapsed:
    "flex items-center justify-center border-b border-black/[0.06] px-2 py-3",
  /** Height-only so 36×35 `welcomeLogo` keeps aspect ratio (`w-auto` on Image). */
  brandLogo: "h-12 w-auto shrink-0 object-contain",
  brandLogoCollapsed: "h-9 w-auto shrink-0 object-contain",
  brandName: `${TYPO.sizeLg} ${TYPO.weightBold} min-w-0 flex-1 truncate capitalize text-[var(--color-brand-panchang)]`,
  /** Floating circular toggle on the sidebar/content edge (reference style). */
  collapseBtn:
    "absolute top-5 -right-3 z-40 inline-flex size-6 items-center justify-center rounded-full border border-black/[0.08] bg-white text-black/55 shadow-[0_2px_8px_rgb(0_0_0_/_0.1)] transition-colors hover:bg-black/[0.03] hover:text-black/80",
  collapseIcon: "size-3.5",
  tooltipWrap: "relative inline-flex",
  tooltipBubble:
    `${TYPO.sizeXs} ${TYPO.weightSemibold} pointer-events-none absolute left-[calc(100%+0.55rem)] top-1/2 z-[80] -translate-y-1/2 whitespace-nowrap rounded-md border border-[var(--color-brand-primary)]/20 bg-white px-2.5 py-1.5 text-[var(--color-brand-primary)] opacity-0 shadow-[0_6px_16px_rgb(16_177_0_/_0.16)] transition-opacity duration-150 group-hover:opacity-100`,
  tooltipArrow:
    "absolute -left-1 top-1/2 size-2 -translate-y-1/2 rotate-45 border-b border-l border-[var(--color-brand-primary)]/20 bg-white",
  flyoutPanel:
    "absolute left-[calc(100%+0.45rem)] top-0 z-[90] min-w-[12.5rem] rounded-xl border border-[var(--color-brand-primary)]/15 bg-white p-1.5 shadow-[0_10px_28px_rgb(16_177_0_/_0.16)]",
  flyoutItem:
    `flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left ${TYPO.sizeSm} ${TYPO.weightSemibold} text-black/70 transition-colors hover:bg-[var(--color-home-screen-mint)]/55 hover:text-black/85`,
  flyoutItemActive:
    `flex w-full items-center gap-2 rounded-lg bg-[var(--color-home-screen-mint)]/80 px-2.5 py-2 text-left ${TYPO.sizeSm} ${TYPO.weightSemibold} text-black/85`,
  flyoutItemYearly:
    `flex w-full items-center gap-2 rounded-lg bg-[var(--color-home-screen-mint)]/70 px-2.5 py-2 text-left ${TYPO.sizeSm} ${TYPO.weightSemibold} text-black/80 transition-colors hover:bg-[var(--color-home-screen-mint)]/90`,
  flyoutItemYearlyActive:
    `flex w-full items-center gap-2 rounded-lg bg-[var(--color-home-screen-mint)] px-2.5 py-2 text-left ${TYPO.sizeSm} ${TYPO.weightSemibold} text-black/85`,
  flyoutWrap: "relative flex flex-col items-center",
  /** Slight left inset so card radii show; more room on the right. */
  navScroll:
    "scrollbar-hidden flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pb-4 pl-2.5 pr-3.5 pt-3 xl:pr-4",
  navScrollCollapsed:
    "scrollbar-hidden flex min-h-0 flex-1 flex-col items-center gap-1 overflow-visible px-1.5 pb-4 pt-3",
  navFooter: "shrink-0 border-t border-black/[0.06] py-3 pl-2.5 pr-3.5 xl:pr-4",
  navFooterCollapsed: "shrink-0 border-t border-black/[0.06] px-1.5 py-3",
  aiCard:
    "mb-2 flex w-full shrink-0 items-center gap-3 rounded-2xl border border-[var(--color-brand-primary)]/15 bg-[var(--color-home-screen-mint)]/35 px-3 py-2.5 transition-colors hover:bg-[var(--color-home-screen-mint)]/50",
  aiCardIdle:
    "mb-2 flex w-full shrink-0 items-center gap-3 rounded-2xl border border-[var(--color-brand-primary)]/10 bg-[var(--color-home-screen-mint)]/25 px-3 py-2.5 transition-colors hover:bg-[var(--color-home-screen-mint)]/40",
  aiCardCollapsed:
    "mb-2 flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-brand-primary)]/15 bg-[var(--color-home-screen-mint)]/35 transition-colors hover:bg-[var(--color-home-screen-mint)]/50",
  aiIconWrap:
    "flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-primary)] shadow-[0_2px_8px_rgb(16_177_0_/_0.25)]",
  aiIconInner:
    "flex size-7 items-center justify-center rounded-full bg-white",
  aiIcon: "size-5 object-contain",
  aiLine1: `${TYPO.sizeSm} ${TYPO.weightSemibold} text-black/45`,
  aiLine2: `${TYPO.sizeSm} ${TYPO.weightBold} text-[var(--color-brand-primary)]`,
  navItem:
    "group flex w-full items-center gap-3 rounded-2xl py-2.5 pl-2.5 pr-2.5 text-left transition-colors hover:bg-black/[0.03]",
  navItemActive:
    "group flex w-full items-center gap-3 rounded-2xl bg-[var(--color-home-screen-mint)]/80 py-2.5 pl-2.5 pr-2.5 text-left transition-colors",
  navItemCollapsed:
    "group flex size-11 items-center justify-center rounded-2xl transition-colors hover:bg-black/[0.03]",
  navItemCollapsedActive:
    "group flex size-11 items-center justify-center rounded-2xl bg-[var(--color-home-screen-mint)]/80 transition-colors",
  navIcon:
    "size-7 shrink-0 object-contain opacity-80 transition-opacity group-hover:opacity-100",
  navIconActive: "size-7 shrink-0 object-contain opacity-100",
  navLabel: `${TYPO.sizeBase} ${TYPO.weightSemibold} min-w-0 flex-1 leading-snug text-black/70`,
  navTimer: `${TYPO.caption} shrink-0 tabular-nums text-[var(--color-brand-primary)]`,
  navLabelActive: `${TYPO.sizeBase} ${TYPO.weightSemibold} min-w-0 flex-1 leading-snug text-black/80`,
  submenuItem: `flex w-full items-center gap-2.5 rounded-xl py-2 pl-1 text-left ${TYPO.sizeBodySm} ${TYPO.weightMedium} text-black/65 transition-colors hover:bg-black/[0.03] hover:text-black/80`,
  submenuItemActive: `flex w-full items-center gap-2.5 rounded-xl bg-[var(--color-home-screen-mint)]/50 py-2 pl-1 text-left ${TYPO.sizeBodySm} ${TYPO.weightSemibold} text-black/80`,
  submenuDot: "size-1.5 shrink-0 rounded-full bg-[var(--color-brand-primary)]",
  premiumCard:
    "relative w-full overflow-hidden rounded-2xl bg-[var(--color-brand-primary)] px-3 py-3 shadow-[0_6px_16px_rgb(16_177_0_/_0.22)]",
  premiumBadge:
    "mb-1.5 inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5",
  premiumBadgeIcon: "size-3 brightness-0 invert",
  premiumBadgeText: `${TYPO.sizeXs} ${TYPO.weightBold} tracking-[0.06em] text-white`,
  premiumTitle: `${TYPO.sizeSm} ${TYPO.weightBold} text-white`,
  premiumHint: `${TYPO.sizeXs} mt-0.5 leading-snug text-white/85`,
  premiumCta: `mt-2.5 flex w-full items-center justify-center gap-1 rounded-full bg-white py-1.5 ${TYPO.sizeSm} ${TYPO.weightBold} text-[var(--color-brand-primary)] transition-opacity hover:opacity-95`,
  premiumCtaChevron: "size-3 -rotate-90 brightness-0",
} as const;
