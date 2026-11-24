import { TYPO } from "@/lib/constants/typography";

const flutterImage = (file: string) => `/flutter-assets/images/${file}` as const;

export const YEARLY_2027_PROMO_ASSETS = {
  /** HD zodiac + silk hero (left strip). */
  heroDeco: flutterImage("yearly-2027-zodiac-hd.png"),
} as const;

export const YEARLY_2027_PROMO_UI = {
  headerChipWrap: "relative inline-flex",
  headerSparkles:
    "pointer-events-none absolute -top-2.5 left-3 flex items-center gap-1 text-[var(--color-yearly-2027-star)]",
  headerSparkle: "block leading-none opacity-90",
  headerChip:
    `${TYPO.sizeSm} ${TYPO.weightSemibold} inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-[var(--color-brand-black)] transition-colors hover:bg-black/[0.03]`,
  headerStar: "size-3.5 shrink-0 text-[var(--color-yearly-2027-star)]",
  headerChipLabel: "whitespace-nowrap",
  newBadge:
    `${TYPO.sizeXs} ${TYPO.weightBold} inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[var(--color-brand-primary)] to-[var(--color-yearly-2027-badge-to)] px-2 py-[0.2rem] leading-none tracking-[0.08em] text-white shadow-[0_2px_6px_rgb(16_177_0_/_0.35),inset_0_1px_0_rgb(255_255_255_/_0.25)]`,
  sidebarYearly:
    `flex w-full items-center gap-2.5 rounded-xl bg-[var(--color-home-screen-mint)]/70 py-2 pl-1 pr-2 text-left ${TYPO.sizeBodySm} ${TYPO.weightSemibold} text-black/80 transition-colors hover:bg-[var(--color-home-screen-mint)]/90`,
  sidebarYearlyActive:
    `flex w-full items-center gap-2.5 rounded-xl bg-[var(--color-home-screen-mint)] py-2 pl-1 pr-2 text-left ${TYPO.sizeBodySm} ${TYPO.weightSemibold} text-black/85`,
  sidebarNew:
    `${TYPO.sizeXs} ${TYPO.weightBold} ml-auto inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[var(--color-brand-primary)] to-[var(--color-yearly-2027-badge-to)] px-2 py-[0.2rem] leading-none tracking-[0.08em] text-white shadow-[0_2px_6px_rgb(16_177_0_/_0.35),inset_0_1px_0_rgb(255_255_255_/_0.25)]`,

  bannerShell:
    "relative overflow-hidden rounded-2xl yearly-2027-banner-silk shadow-[0_8px_24px_rgb(31_107_40_/_0.14)]",
  bannerInner: "relative z-[1] flex min-h-[10.5rem] items-stretch",
  bannerArt:
    "pointer-events-none absolute inset-y-0 left-0 w-[11.5rem] sm:w-[13rem] [mask-image:linear-gradient(90deg,black_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(90deg,black_55%,transparent_100%)]",
  bannerArtImg: "size-full object-cover object-[28%_center]",
  bannerMain:
    "relative flex min-w-0 flex-1 flex-col justify-center py-3.5 pl-[11.75rem] pr-3 sm:pl-[13.25rem] sm:pr-4 sm:py-4",
  bannerCopy: "relative max-w-xl",
  bannerSparkles:
    "pointer-events-none absolute -top-0.5 left-[10.5rem] flex gap-2 text-[var(--color-yearly-2027-star)] sm:left-[12rem]",
  bannerSparkle: "leading-none opacity-85",
  bannerEyebrow:
    `${TYPO.sizeXs} ${TYPO.weightSemibold} mb-2 inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-2.5 py-1 text-[var(--color-brand-primary)] shadow-[0_1px_4px_rgb(0_0_0_/_0.06)]`,
  bannerEyebrowStar: "size-3.5 shrink-0 text-[var(--color-yearly-2027-star)]",
  bannerTitle:
    `text-[1.15rem] sm:text-[1.35rem] ${TYPO.weightBold} leading-snug tracking-[-0.015em] text-[var(--color-yearly-2027-ink)]`,
  bannerSubtitle:
    `${TYPO.sizeXs} sm:text-[0.875rem] mt-1.5 max-w-lg leading-snug text-[var(--color-yearly-2027-ink)]/68`,
  bannerActions: "mt-3.5",
  primaryBtn:
    `${TYPO.sizeSm} ${TYPO.weightBold} inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[var(--color-brand-primary)] px-5 py-2.5 text-white shadow-[0_6px_16px_rgb(6_166_8_/_0.28)] transition-opacity hover:opacity-95`,
  primaryBtnArrow: "text-base leading-none",
  ghostBtn: `${TYPO.sizeSm} ${TYPO.weightMedium} cursor-pointer rounded-full px-3 py-2 text-black/55`,

  panel:
    "relative z-[1] flex w-[min(100%,19.5rem)] shrink-0 flex-col justify-center border-l border-[var(--color-yearly-2027-ink)]/10 bg-transparent px-3 py-3 sm:w-[20.5rem] sm:px-3.5",
  panelHeader: "mb-2 flex items-center justify-between gap-2",
  panelTitle: `${TYPO.sizeSm} ${TYPO.weightBold} text-[var(--color-yearly-2027-ink)]`,
  panelClose:
    "inline-flex cursor-pointer items-center justify-center rounded-full p-1 text-[var(--color-brand-primary)] transition-colors hover:bg-white/70",
  panelGrid: "grid grid-cols-2 gap-2",
  panelCard:
    "flex min-h-[3.75rem] flex-col items-center justify-center gap-1 rounded-xl bg-white px-2 py-2.5 text-center shadow-[0_3px_10px_rgb(31_107_40_/_0.1)]",
  panelLabel:
    `${TYPO.sizeSm} ${TYPO.weightBold} leading-tight tracking-[-0.01em] text-[var(--color-yearly-2027-ink)]`,
  miniStars: "flex items-center justify-center gap-0.5",
  miniStar: "size-3 shrink-0",
  miniStarOn: "text-[var(--color-yearly-2027-star)]",
  miniStarOff: "text-[var(--color-yearly-2027-ink)]/18",
} as const;
