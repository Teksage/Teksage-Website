/** Subscribe prompt dialog — mirrors Flutter `SubscribePromptDialog`. */

export const SUBSCRIBE_PROMPT = {
  premiumTitle: "Premium Feature",
  expiredTitle: "Plan Expired",
  subtitle: "Unlock all features by choosing a plan",
  subscribeCta: "Subscribe",
  closeAria: "Close",
  loadFailed: "Could not load plans.",
} as const;

export const SUBSCRIBE_PROMPT_UI = {
  overlay:
    "fixed inset-0 z-[300] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm",
  card:
    "relative w-full max-w-sm overflow-hidden rounded-xl bg-[#010101] text-white shadow-2xl",
  closeBtn:
    "absolute right-3 top-3 z-20 flex size-8 items-center justify-center opacity-60 hover:opacity-100",
  content: "relative z-10 flex flex-col items-center px-5 pb-6 pt-10 text-center",
  title: "text-xl font-semibold leading-tight",
  subtitle: "mt-2 text-base font-semibold text-white/90",
  cta:
    "mt-6 w-full rounded-full bg-[var(--color-brand-primary)] py-3 text-base font-semibold text-white",
} as const;
