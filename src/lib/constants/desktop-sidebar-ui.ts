import { TYPO } from "@/lib/constants/typography";

/** Desktop left rail layout — modern dashboard sidebar. */
export const DESKTOP_SIDEBAR_UI = {
  aside:
    "sticky top-0 z-30 hidden h-full shrink-0 flex-col border-r border-black/[0.06] bg-white lg:flex",
  brandRow:
    "flex items-center gap-2.5 border-b border-black/[0.06] py-3.5 pl-3 pr-3 xl:pr-4",
  brandLogo: "size-12 shrink-0",
  brandName: `${TYPO.sizeLg} ${TYPO.weightBold} truncate capitalize text-[var(--color-brand-panchang)]`,
  /** Slight left inset so card radii show; more room on the right. */
  navScroll:
    "scrollbar-hidden flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pb-4 pl-2.5 pr-3.5 pt-3 xl:pr-4",
  navFooter: "shrink-0 border-t border-black/[0.06] py-3 pl-2.5 pr-3.5 xl:pr-4",
  aiCard:
    "mb-2 flex w-full shrink-0 items-center gap-3 rounded-2xl border border-[var(--color-brand-primary)]/15 bg-[var(--color-home-screen-mint)]/35 px-3 py-2.5 transition-colors hover:bg-[var(--color-home-screen-mint)]/50",
  aiCardIdle:
    "mb-2 flex w-full shrink-0 items-center gap-3 rounded-2xl border border-[var(--color-brand-primary)]/10 bg-[var(--color-home-screen-mint)]/25 px-3 py-2.5 transition-colors hover:bg-[var(--color-home-screen-mint)]/40",
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
  navIcon:
    "size-7 shrink-0 object-contain opacity-80 transition-opacity group-hover:opacity-100",
  navIconActive: "size-7 shrink-0 object-contain opacity-100",
  navLabel: `${TYPO.sizeBase} ${TYPO.weightSemibold} flex-1 leading-snug text-black/70`,
  navLabelActive: `${TYPO.sizeBase} ${TYPO.weightSemibold} flex-1 leading-snug text-black/80`,
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
