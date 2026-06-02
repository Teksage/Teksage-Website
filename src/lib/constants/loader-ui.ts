/** Loader UI — Teksage logo pulse (no card shell). */

export const LOADER_DEFAULT_ARIA_LABEL = "Loading" as const;

export const LOADER_UI = {
  overlay:
    "fixed inset-0 z-[200] flex items-center justify-center bg-black/20 backdrop-blur-[1px]",
  /** In-page centered loader (lists, sections). */
  center: "flex items-center justify-center py-24",
} as const;

/** Logo width/height in px — `lg` for overlays, `sm` for buttons/fields. */
export const LOADER_ICON_PX = {
  sm: 28,
  md: 48,
  lg: 96,
} as const;
