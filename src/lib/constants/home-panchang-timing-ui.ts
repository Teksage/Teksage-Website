import { TYPO } from "@/lib/constants/typography";

/** Home timings strip — unified header row (on primary or light surface). */
export const HOME_PANCHANG_TIMING_UI = {
  stripOnPrimary:
    "relative z-20 flex items-stretch overflow-x-auto overflow-y-visible scrollbar-hidden border-b border-white/15 bg-black/10",
  stripLight:
    "relative z-20 flex items-stretch overflow-x-auto overflow-y-visible scrollbar-hidden border-b border-neutral-200/90 bg-white",
  stripLightFlush:
    "relative z-20 flex items-stretch overflow-x-auto overflow-y-visible scrollbar-hidden bg-white",
  cell: "flex min-w-[7.5rem] flex-1 flex-col justify-center gap-0.5 px-3 py-2.5 sm:min-w-[8.5rem] sm:px-4",
  cellRelative: "relative z-10",
  cellInteractive: "pointer-events-auto",
  auspiciousValueRow: "mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0",
  auspiciousMoreBtn: `${TYPO.caption} relative z-20 shrink-0 cursor-pointer rounded px-1.5 py-1 font-semibold underline underline-offset-2 hover:opacity-90`,
  auspiciousMoreBtnOnPrimary: "text-white",
  auspiciousMoreBtnLight: "font-bold text-[var(--color-brand-black)]",
  auspiciousPopoverFixed:
    "pointer-events-auto fixed z-[250] min-w-[14rem] rounded-2xl border border-neutral-200/90 bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.1)]",
  auspiciousPopoverTitle: `${TYPO.caption} mb-2 font-bold text-[var(--color-brand-black)]`,
  auspiciousPopoverList: "space-y-2",
  auspiciousPopoverItem: `${TYPO.caption} font-bold leading-snug text-[var(--color-brand-black)]`,
  cellDividerOnPrimary: "border-r border-white/15 last:border-r-0",
  cellDividerLight: "border-r border-neutral-100 last:border-r-0",
  labelOnPrimary: `${TYPO.badgeMicro} font-semibold uppercase tracking-wide text-white/75`,
  /** Same `text-xs` + `font-bold` as values — `badgeMicro` (10px) looked thinner. */
  labelLight:
    "text-xs font-bold uppercase tracking-wide text-[var(--color-brand-black)]",
  valueOnPrimary: `${TYPO.caption} font-semibold leading-snug text-white`,
  valueLight: "text-xs font-bold leading-snug text-[var(--color-brand-black)]",
  ctaOnPrimary: `${TYPO.caption} font-semibold text-white underline-offset-2 hover:underline`,
  ctaLight: `${TYPO.caption} font-bold text-[var(--color-brand-black)] underline-offset-2 hover:underline`,
  /** Mobile home — card in main scroll (`HomePanchangTimingMobileCard`). */
  mobileCard:
    "rounded-2xl border border-[color-mix(in_srgb,var(--color-brand-primary)_22%,transparent)] bg-white p-4 shadow-[0_2px_12px_rgb(0_0_0_/0.06)]",
  mobileTitle: `${TYPO.labelSemibold} text-[var(--color-brand-panchang)]`,
  mobileRowGroup: "mt-3 space-y-0 divide-y divide-neutral-100",
  mobileRow: "flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0",
  mobileLabel:
    "w-[6.75rem] shrink-0 text-xs font-bold uppercase tracking-wide text-[var(--color-brand-black)]",
  mobileValue:
    "min-w-0 flex-1 text-right text-xs font-bold leading-snug text-[var(--color-brand-black)]",
  mobileValueStack: "flex min-w-0 flex-1 flex-col items-end gap-1",
  mobileCta: `${TYPO.caption} mt-4 w-full rounded-full border border-[var(--color-brand-primary)] py-2.5 font-bold text-[var(--color-brand-primary)]`,
} as const;

export const HOME_PANCHANG_TIMING_ROW_IDS = {
  rahu: "rahu",
  yama: "yama",
  auspicious: "auspicious",
} as const;

export type HomePanchangTimingRowId =
  (typeof HOME_PANCHANG_TIMING_ROW_IDS)[keyof typeof HOME_PANCHANG_TIMING_ROW_IDS];

export type HomePanchangTimingStripVariant = "onPrimary" | "light";
