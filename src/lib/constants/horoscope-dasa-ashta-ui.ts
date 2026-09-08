import { TYPO } from "./typography";

/** Dasa banner + Ashtavarga workspace tokens (Full Horoscope). */

export const HOROSCOPE_DASA_ASHTA_UI = {
  dasaBanner:
    "flex flex-col gap-3 rounded-xl border border-black/[0.08] bg-white px-3 py-3 shadow-[0_1px_2px_rgb(0_0_0/0.04)] sm:flex-row sm:items-center sm:px-4",
  dasaBannerIconWrap:
    "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-brand-primary)_12%,white)] text-[var(--color-brand-primary)]",
  dasaBannerLabel: `${TYPO.captionMedium} text-black/55`,
  dasaBannerPath: `${TYPO.labelSemibold} text-[var(--color-brand-panchang)]`,
  dasaBannerPeriodKind: `${TYPO.caption} font-semibold uppercase tracking-[0.04em] text-[var(--color-brand-primary)]`,
  dasaBannerDates: `${TYPO.caption} font-semibold text-[var(--color-brand-black)]`,
  dasaBannerCta:
    "w-full shrink-0 rounded-full border border-[var(--color-brand-primary)] bg-white px-3 py-2 text-[10px] font-bold text-[var(--color-brand-primary)] hover:bg-[color-mix(in_srgb,var(--color-brand-primary)_8%,white)] sm:w-auto sm:py-1.5",

  /** Ashtavarga — distinct from main/Dasa pill tabs. */
  ashtaRoot: "flex w-full flex-col gap-3",
  ashtaStage:
    "overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-[0_1px_2px_rgb(0_0_0/0.04)]",
  ashtaHeader:
    "flex flex-col gap-3 border-b border-black/[0.06] bg-[color-mix(in_srgb,var(--color-home-screen-mint)_18%,white)] px-3 py-3 sm:px-4",
  ashtaHeaderEyebrow: `${TYPO.caption} font-medium uppercase tracking-[0.06em] text-black/40`,
  ashtaHeaderTitle: `${TYPO.h3} leading-tight text-[var(--color-brand-black)]`,
  ashtaPlanetLabel: `${TYPO.captionMedium} text-black/50`,
  ashtaPlanetRail: "scrollbar-hidden flex gap-2 overflow-x-auto pb-0.5",
  ashtaPlanetChip:
    "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
  ashtaPlanetChipActive:
    "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] text-white shadow-sm",
  ashtaPlanetChipIdle:
    "border-black/[0.1] bg-white text-[var(--color-brand-black)] hover:border-[color-mix(in_srgb,var(--color-brand-primary)_45%,transparent)] hover:text-[var(--color-brand-panchang)]",
  ashtaChartsGrid:
    "mx-auto grid w-full max-w-sm grid-cols-1 gap-4 bg-[color-mix(in_srgb,var(--color-brand-bg)_55%,white)] p-3 sm:max-w-none sm:grid-cols-3 sm:gap-3 sm:p-4 lg:p-5",
  ashtaGunahara:
    "grid grid-cols-1 gap-2 border-t border-black/[0.06] bg-white px-3 py-3 sm:grid-cols-3 sm:gap-3 sm:px-4",
  ashtaGunaharaItem:
    "flex items-center justify-between gap-2 rounded-lg border border-black/[0.06] bg-[color-mix(in_srgb,var(--color-brand-bg)_50%,white)] px-3 py-2.5 sm:flex-col sm:items-start sm:justify-center sm:gap-1",
  ashtaGunaharaLabel: `${TYPO.captionMedium} text-black/55`,
  ashtaGunaharaValue: `${TYPO.h3} text-[var(--color-brand-primary)]`,
} as const;
