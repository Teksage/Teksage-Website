/** Daily/weekly prediction share — copy (i18n keys = string values). */

export const PREDICTION_SHARE_SCREEN = {
  shareAriaLabel: "Share prediction",
  shareSheetTitle: "Share your prediction",
  shareAction: "Share",
  shareLoading: "Preparing PDF…",
  shareOpening: "Opening share…",
  shareReadyPrompt: "PDF is ready. Tap Share now to pick an app.",
  shareNowAction: "Share now",
  shareSuccess: "Prediction shared successfully.",
  shareDownloadHint: "PDF downloaded. Share it from your Downloads folder or installed apps.",
  shareError: "Could not share prediction. Please try again.",
} as const;

export const PREDICTION_SHARE_UI = {
  overlay:
    "fixed inset-0 z-[250] flex items-end justify-center bg-black/30 p-4 sm:items-center",
  sheet:
    "relative z-[252] w-full max-w-sm rounded-2xl bg-white p-4 shadow-xl pointer-events-auto",
  backdrop: "absolute inset-0 z-[251]",
  title: "text-center text-base font-semibold text-[var(--color-brand-black)]",
  actionBtn:
    "mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-black/10 text-base font-semibold text-[var(--color-brand-black)] hover:bg-black/5 disabled:opacity-50",
  actionIcon: "size-5 shrink-0",
  closeBtn: "absolute right-3 top-3 flex size-8 items-center justify-center",
} as const;
