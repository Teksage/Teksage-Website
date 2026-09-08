import { TYPO } from "./typography";

/** Shadbala section chrome (tabs + sort) — table styles stay separate. */

export const HOROSCOPE_SHADBALA_UI = {
  shadbalaRoot: "flex w-full min-w-0 flex-col gap-3",
  shadbalaStage:
    "overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-[0_1px_2px_rgb(0_0_0/0.04)]",
  shadbalaHeader:
    "flex flex-col gap-0 border-b border-black/[0.06] bg-[color-mix(in_srgb,var(--color-home-screen-mint)_18%,white)] px-3 pt-3 sm:px-4",
  shadbalaHeaderEyebrow: `${TYPO.caption} font-medium uppercase tracking-[0.06em] text-black/40`,
  shadbalaHeaderTitle: `${TYPO.h3} mb-3 leading-tight text-[var(--color-brand-black)]`,
  /** Underline tab strip — distinct from filled green pills. */
  shadbalaTabRail:
    "scrollbar-hidden flex gap-0 overflow-x-auto border-t border-black/[0.06]",
  shadbalaTabBtn:
    "relative shrink-0 border-b-2 px-3 py-2.5 text-center text-xs font-semibold transition-colors sm:flex-1 sm:px-2 sm:text-sm",
  shadbalaTabActive:
    "border-[var(--color-brand-primary)] text-[var(--color-brand-panchang)]",
  shadbalaTabIdle:
    "border-transparent text-black/45 hover:text-[var(--color-brand-panchang)]",
  shadbalaToolbar:
    "flex flex-wrap items-end gap-2 border-b border-black/[0.06] bg-[color-mix(in_srgb,var(--color-brand-bg)_55%,white)] px-3 py-3 sm:px-4",
  shadbalaSortLabel: `${TYPO.captionMedium} text-black/50`,
  shadbalaSortGroup: "flex w-auto flex-col gap-1.5",
  shadbalaSortSelect:
    "w-[9.5rem] rounded-lg border border-black/[0.1] bg-white px-2.5 py-2 text-xs font-semibold text-[var(--color-brand-black)] shadow-sm outline-none transition-colors hover:border-[color-mix(in_srgb,var(--color-brand-primary)_35%,transparent)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-brand-primary)_20%,transparent)] sm:w-[10.5rem]",
  shadbalaOrderBtn:
    "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-xs font-semibold text-[var(--color-brand-black)] transition-colors hover:border-[color-mix(in_srgb,var(--color-brand-primary)_35%,transparent)] hover:text-[var(--color-brand-panchang)]",
  shadbalaTableWrap:
    "bg-[color-mix(in_srgb,var(--color-brand-bg)_40%,white)] p-2 sm:p-3",
} as const;
