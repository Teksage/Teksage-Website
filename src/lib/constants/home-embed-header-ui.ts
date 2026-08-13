import { TYPO } from "@/lib/constants/typography";
import { DASHBOARD_ASSETS } from "@/lib/constants/assets";

/** Home desktop — header sits in the main column only (brand lives in sidebar). */
export const HOME_EMBED_HEADER_UI = {
  desktopTopHeader:
    "relative z-40 hidden w-full shrink-0 flex-col bg-white lg:flex",
  topRow: "flex w-full items-stretch",
  greetingRow:
    "flex min-w-0 flex-1 items-center justify-between gap-3 border-b border-neutral-200/90 px-4 py-2.5",
  helloText: `${TYPO.h3Bold} truncate text-[var(--color-brand-black)]`,
  actionsRow: "flex shrink-0 items-center gap-2",
  gettingStartedPill: `${TYPO.sizeSm} ${TYPO.weightSemibold} inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-[var(--color-brand-black)] transition-colors hover:bg-black/[0.03]`,
  gettingStartedIcon: DASHBOARD_ASSETS.headerPlay,
  referralIcon: DASHBOARD_ASSETS.headerGift,
  panchangRow: "flex w-full items-stretch",
  panchangPane: "min-w-0 flex-1",
} as const;
