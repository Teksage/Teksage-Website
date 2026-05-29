import { TYPO } from "./typography";

/** Bottom nav — mirrors Flutter `bottomNavigation.dart` (`fontSize11`, ~24px icons). */
export const NAV_UI = {
  bottomNavIconPx: 24,
  bottomNavIconClass: "size-6 shrink-0",
  bottomNavItemGap: "gap-0.5",
  bottomNavTabGap: "gap-x-2.5",
  bottomNavLabelSingle: `${TYPO.bottomNavLabel} w-full whitespace-nowrap text-center`,
  bottomNavLabelMultiline: `${TYPO.bottomNavLabel} w-full text-center leading-[1.2] line-clamp-2 [overflow-wrap:anywhere] [word-break:keep-all]`,
  bottomNavLongLabelCharThreshold: 10,
  bottomNavTallPill: "min-h-[4rem] py-2",
} as const;
