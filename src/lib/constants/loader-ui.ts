/** Loader UI — Teksage logo pulse (no card shell). */

import { TYPO } from "@/lib/constants/typography";

export const LOADER_DEFAULT_ARIA_LABEL = "Loading" as const;

export const LOADER_UI = {
  overlay:
    "fixed inset-0 z-[200] flex flex-col items-center justify-center gap-3 bg-black/20 backdrop-blur-[1px]",
  /** Status line under overlay loader (prediction generate, etc.). */
  overlayMessage: `${TYPO.sizeSm} ${TYPO.weightMedium} max-w-xs px-4 text-center text-white`,
  /** In-page centered loader (lists, sections). */
  center: "flex items-center justify-center py-24",
  /** Spinner on a brand-green button — white ring, not the green logo. */
  onBrandSpinner: "border-white/40 border-t-white",
} as const;

/** Logo width/height in px — `lg` for overlays, `sm` for buttons/fields. */
export const LOADER_ICON_PX = {
  sm: 28,
  md: 48,
  lg: 96,
} as const;
