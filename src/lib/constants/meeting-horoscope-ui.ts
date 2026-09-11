import { TYPO } from "./typography";

/** Customer Horoscope summary card on meeting horoscope page (no charts). */

export const MEETING_HOROSCOPE_PREVIEW = {
  periodCount: 5,
  textChars: 220,
} as const;

export const MEETING_HOROSCOPE_UI = {
  root: "overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-[0_1px_2px_rgb(0_0_0/0.04)]",
  header:
    "border-b border-black/[0.06] bg-[color-mix(in_srgb,var(--color-home-screen-mint)_22%,white)] px-4 py-3.5 sm:px-5",
  headerEyebrow: `${TYPO.caption} font-medium uppercase tracking-[0.06em] text-black/40`,
  headerTitle: `${TYPO.h3} leading-tight text-[var(--color-brand-black)]`,
  factsGrid:
    "grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:gap-3 sm:p-5 lg:grid-cols-3",
  factCard:
    "rounded-lg border border-black/[0.06] bg-[color-mix(in_srgb,var(--color-brand-bg)_55%,white)] px-3.5 py-3",
  factLabel: `${TYPO.caption} font-semibold uppercase tracking-[0.04em] text-[var(--color-brand-panchang)]`,
  factValue: `${TYPO.bodySmSemibold} mt-1 text-[var(--color-brand-black)]`,
  sections: "space-y-3 border-t border-black/[0.06] bg-[color-mix(in_srgb,var(--color-brand-bg)_35%,white)] p-4 sm:p-5",
  sectionCard:
    "rounded-lg border border-black/[0.06] bg-white px-4 py-3.5 shadow-sm",
  sectionLabel: `${TYPO.caption} font-semibold uppercase tracking-[0.04em] text-[var(--color-brand-panchang)]`,
  sectionBody: `${TYPO.bodySm} mt-2 text-[var(--color-brand-black)]`,
  periodList: "mt-2 list-disc space-y-1.5 pl-5 marker:text-[var(--color-brand-panchang)]",
  periodItem: `${TYPO.bodySm} leading-snug text-[var(--color-brand-black)]`,
  expandBtn: `${TYPO.caption} mt-2.5 font-semibold text-[var(--color-brand-panchang)] underline-offset-2 hover:underline`,
} as const;
