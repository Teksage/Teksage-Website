/** Loader UI — mirrors Flutter `customLoader.dart` + `LoadingAnimationWidget.halfTriangleDot`. */

export const LOADER_DEFAULT_ARIA_LABEL = "Loading" as const;

/** Full-screen modal overlay (`CustomLoader.show`). */
export const LOADER_UI = {
  overlay:
    "fixed inset-0 z-[200] flex items-center justify-center bg-black/20 backdrop-blur-[1px]",
  /** `BoxDecoration` white card, `borderRadius: 20`. */
  modalShell:
    "flex items-center justify-center rounded-[20px] bg-white/90 shadow-sm",
  /** `responsiveWidth(0.2668)` × `responsiveHeight(0.1232)` on ~390px width. */
  modalBox: "h-[5rem] w-[6.625rem]",
  /** `CustomLoader.inline` — `borderRadius: 8`. */
  inlineShell:
    "inline-flex shrink-0 items-center justify-center rounded-lg bg-white/90 shadow-sm",
  inlineBoxSm: "size-8",
  inlineBoxMd: "size-[1.875rem]",
  inlineBoxLg: "size-11",
} as const;

export const LOADER_ICON_PX = {
  sm: 20,
  md: 30,
  lg: 30,
} as const;
