/**
 * Settings mint-glow layout tokens — shared by Settings home + subpages.
 */

import { TYPO } from "@/lib/constants/typography";

/** Soft mint page fill — same language as chat (`mint-glow-surface` in globals.css). */
export const SETTINGS_SHELL_GRADIENT_CLASS = "mint-glow-surface";

/** Subtitles for mint-glow settings subpages (Profile/Settings intro style). */
export const SETTINGS_SECTION_SUBTITLE = {
  "push-notifications": "Choose which alerts you want to receive.",
  language: "Select your preferred app language.",
  faq: "Find answers to common questions about our astrology services.",
  support: "Got a question? Our support team is here to guide your path.",
  terms: "Please read these terms carefully before using Teksage.",
  privacy: "How we collect, use, and protect your information.",
} as const;

export const SETTINGS_LAYOUT = {
  pageRoot: "relative min-h-dvh mint-glow-surface",
  headerChrome:
    "lg:border-b lg:border-black/[0.06] lg:bg-white/80 lg:shadow-[0_1px_3px_rgb(0_0_0_/0.04)] lg:backdrop-blur-sm",
  desktopPanel:
    "relative z-10 mx-auto w-full max-w-lg px-4 pb-8 pt-5 lg:my-6 lg:max-w-6xl lg:px-8 lg:pb-10",
  pageIntro: "mb-5 hidden lg:block",
  pageTitle: "text-2xl font-bold tracking-tight text-[var(--color-brand-black)]",
  pageSubtitle: "mt-1 max-w-2xl text-sm font-medium text-black/45",
  subpageHeader: "mb-6 flex flex-col gap-4",
  subpageBack: `${TYPO.sizeSm} ${TYPO.weightMedium} inline-flex w-fit items-center gap-1.5 rounded-full py-1 pr-2.5 text-black/50 transition-colors hover:bg-black/5 hover:text-[var(--color-brand-black)]`,
  subpageBackIcon: "size-[1.1rem] shrink-0",
  subpageIntro: "flex items-start justify-between gap-4",
  subpageText: "min-w-0 flex-1",
  subpageTitle: `${TYPO.size2xl} ${TYPO.weightBold} tracking-tight text-[var(--color-brand-black)]`,
  subpageSubtitle: `${TYPO.sizeSm} ${TYPO.weightMedium} mt-1 max-w-xl text-black/45`,
  subpageAction: "shrink-0 pt-0.5",
  contentCard:
    "overflow-hidden rounded-[1.25rem] border border-black/[0.06] bg-white shadow-[0_8px_28px_rgba(15,23,42,0.06)]",
  contentCardBody: "p-2 sm:p-3",
  contentCardPad: "px-5 py-5 sm:px-6 sm:py-6",
  sectionsGrid: "grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5",
  sectionCard:
    "overflow-hidden rounded-[1.25rem] border border-black/[0.06] bg-white shadow-[0_8px_28px_rgba(15,23,42,0.06)]",
  sectionHeader:
    "border-b border-black/[0.05] bg-[var(--color-home-screen-mint)]/35 px-4 py-3",
  sectionTitle: "text-sm font-bold tracking-wide text-[var(--color-brand-black)]",
  sectionBody: "flex flex-col gap-0.5 p-2",
  dangerCard:
    "overflow-hidden rounded-[1.25rem] border border-black/[0.06] bg-white shadow-[0_8px_28px_rgba(15,23,42,0.06)]",
  dangerTitle:
    "border-b border-black/[0.05] bg-[var(--color-home-screen-mint)]/35 px-4 py-3 text-sm font-bold tracking-wide text-[var(--color-brand-black)]",
  dangerBody: "flex flex-col gap-0.5 p-2",
  menuContent: "flex flex-col gap-1.5 lg:hidden",
  menuDivider: "my-3 h-px bg-black/[0.06]",
} as const;
