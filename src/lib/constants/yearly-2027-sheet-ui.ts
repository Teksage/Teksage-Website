import { TYPO } from "@/lib/constants/typography";

/** Compact static mobile 2027 sheet — short footprint, no scroll. */
export const YEARLY_2027_SHEET_UI = {
  overlay: "fixed inset-0 z-[60] bg-black/50 lg:hidden",
  panel:
    "fixed inset-x-0 bottom-0 z-[60] max-h-[52dvh] overflow-hidden rounded-t-[1.25rem] bg-[var(--color-yearly-2027-sheet-cream)] shadow-[0_-10px_32px_rgb(0_0_0_/_0.16)] lg:hidden",

  hero: "relative h-[5.25rem] overflow-hidden px-3 pb-4 pt-1.5",
  heroArt:
    "pointer-events-none absolute inset-0 size-full object-cover object-[center_32%]",
  heroShade: "pointer-events-none absolute inset-0 yearly-2027-sheet-hero-shade",
  handle:
    "relative z-[2] mx-auto mb-1.5 h-0.5 w-8 rounded-full bg-white/55",
  heroTop: "relative z-[2] flex items-start justify-between gap-2",
  heroBadge:
    `${TYPO.sizeXs} ${TYPO.weightBold} inline-flex items-center gap-1 rounded-full border border-[var(--color-yearly-2027-star)] bg-black/75 px-2 py-0.5 tracking-[0.05em] text-[var(--color-yearly-2027-star)] shadow-[0_2px_8px_rgb(0_0_0_/_0.25)]`,
  heroClose:
    "inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-[2px] transition-colors hover:bg-black/45",
  heroWave: "pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-7 yearly-2027-sheet-wave",

  body: "relative z-[1] -mt-2 px-3.5 pb-[max(0.4rem,env(safe-area-inset-bottom))]",
  title:
    `text-[1.05rem] ${TYPO.weightBold} leading-snug tracking-[-0.02em] text-[var(--color-yearly-2027-ink)]`,
  subtitle: `${TYPO.sizeXs} mt-0.5 text-black/55`,

  scoreList: "mt-1.5 flex flex-col",
  scoreItem: "flex items-center justify-between gap-3 py-2",
  scoreItemDivider: "border-b border-[var(--color-yearly-2027-ink)]/10",
  scoreLabel: `${TYPO.sizeSm} ${TYPO.weightSemibold} text-[var(--color-yearly-2027-ink)]`,
  scoreStars: "flex shrink-0 items-center gap-0.5",
  scoreStar: "size-3.5 shrink-0",
  scoreStarOn: "text-[var(--color-yearly-2027-star)]",
  scoreStarOff: "text-[var(--color-yearly-2027-ink)]/18",

  actions: "mt-2 flex flex-col items-center gap-0.5",
  primaryBtn:
    `${TYPO.sizeSm} ${TYPO.weightBold} inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-yearly-2027-star)] bg-gradient-to-b from-[var(--color-brand-primary)] to-[var(--color-yearly-2027-badge-to)] px-3 py-2 text-white shadow-[0_6px_14px_rgb(16_177_0_/_0.28)]`,
  primaryStar: "size-3.5 shrink-0 text-[var(--color-yearly-2027-star)]",
  primaryRule: "h-3.5 w-px shrink-0 bg-white/35",
  primaryLabel: "min-w-0 flex-1 text-center",
  primaryArrow: "text-base leading-none",
  ghostBtn: `${TYPO.sizeXs} ${TYPO.weightMedium} py-0.5 text-black/55`,
} as const;
