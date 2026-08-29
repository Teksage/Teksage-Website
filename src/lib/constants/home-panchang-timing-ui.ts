import { TYPO } from "@/lib/constants/typography";

/** Home desktop header — mint Panchang timing pills. */
export const HOME_PANCHANG_TIMING_UI = {
  pillsStrip:
    "flex items-center gap-2 overflow-x-auto scrollbar-hidden bg-[var(--color-home-timing-rail-bg)] px-4 py-2",
  pillsRow: "flex min-w-0 flex-1 items-center gap-2",
  pill:
    "inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-[0_1px_2px_rgb(0_0_0_/0.04)]",
  pillDot: "size-1.5 shrink-0 rounded-full",
  pillDotAuspicious: "bg-[var(--color-brand-primary)]",
  pillDotInauspicious: "bg-[var(--color-brand-error)]",
  pillLabel: `${TYPO.sizeXs} ${TYPO.weightMedium} text-black/55`,
  pillLabelAuspicious: `${TYPO.sizeXs} ${TYPO.weightSemibold} text-[var(--color-brand-primary)]`,
  pillValue: `${TYPO.sizeXs} ${TYPO.weightBold} text-[var(--color-brand-black)]`,
  pillExtra:
    `${TYPO.sizeXs} ${TYPO.weightSemibold} cursor-pointer leading-none text-[var(--color-brand-primary)]`,
  pillExtraWrap: "relative inline-flex cursor-pointer",
  pillsCta: `${TYPO.sizeSm} ${TYPO.weightSemibold} ml-auto inline-flex shrink-0 items-center gap-0.5 text-[var(--color-brand-primary)]`,
  auspiciousPopoverFixed:
    "pointer-events-auto fixed z-[250] min-w-[14rem] rounded-2xl border border-neutral-200/90 bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.1)]",
  auspiciousPopoverTitle: `${TYPO.caption} mb-2 font-bold text-[var(--color-brand-black)]`,
  auspiciousPopoverList: "space-y-2",
  auspiciousPopoverItem: `${TYPO.caption} font-bold leading-snug text-[var(--color-brand-black)]`,
} as const;

export const HOME_PANCHANG_TIMING_ROW_IDS = {
  rahu: "rahu",
  yama: "yama",
  auspicious: "auspicious",
} as const;

export type HomePanchangTimingRowId =
  (typeof HOME_PANCHANG_TIMING_ROW_IDS)[keyof typeof HOME_PANCHANG_TIMING_ROW_IDS];
