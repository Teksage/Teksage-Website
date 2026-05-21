/** Shared modal overlay — Flutter rate/login prompt dialogs. */

export const DIALOG_UI = {
  overlay:
    "fixed inset-0 z-[100] flex items-center justify-center bg-black/10 p-6 backdrop-blur-sm",
  card: "relative w-full max-w-sm rounded-xl bg-white p-4 shadow-xl",
  closeBtn: "absolute right-3 top-3 flex size-8 items-center justify-center",
  bodyText:
    "px-4 pt-8 text-center text-base font-semibold leading-relaxed text-[var(--color-brand-black)]",
  primaryBtn:
    "min-w-[140px] rounded-full bg-[var(--color-brand-primary)] px-6 py-2.5 text-base font-semibold text-white",
  /** Login prompt — compact illustration above message (matches rate dialog footprint). */
  loginIllustration:
    "mx-auto mb-2 mt-6 size-14 object-contain",
  loginMessage:
    "px-4 text-center text-base font-semibold leading-relaxed text-[var(--color-brand-black)]",
  loginActions: "flex justify-center py-4",
} as const;
