import { TYPO } from "./typography";

/** Bottom nav + desktop rail label typography. */
export const NAV_UI = {
  /** Flutter `fontSize11` + up to 2 lines for long translations (ta/hi/te). */
  bottomNavLabel: `${TYPO.bottomNavLabel} w-full break-words line-clamp-2 leading-[1.15]`,
  /** When any tab label exceeds this length, use taller pill (mirrors Flutter bar height). */
  bottomNavLongLabelCharThreshold: 8,
  bottomNavTallPill: "min-h-[4.35rem] py-3 sm:min-h-[4.5rem] sm:py-3.5",
} as const;
