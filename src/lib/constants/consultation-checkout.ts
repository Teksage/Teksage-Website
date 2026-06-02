export const CONSULTATION_CHECKOUT_SCREEN = {
  processingCta: "Processing…",
  paymentFailed: "Payment could not be completed. Please try again.",
  paymentUsdHint:
    "USD payments require International Payments enabled on your Razorpay test account (Dashboard → Payment methods).",
} as const;

export const CONSULTATION_CHECKOUT_LAYOUT = {
  page:
    "relative flex min-h-dvh flex-col bg-white -mb-[var(--main-bottom-nav-clearance)] pb-[var(--main-bottom-nav-clearance)]",
  decoTop:
    "pointer-events-none absolute inset-x-0 top-0 z-0 mx-auto h-[min(42vh,320px)] w-full max-w-[32rem] object-cover object-top sm:max-w-md lg:max-w-lg",
  decoBottom:
    "pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-auto w-full max-w-[32rem] object-bottom opacity-95 sm:max-w-md lg:max-w-lg",
  body: "relative z-10 flex min-h-0 flex-1 flex-col",
  scroll: "flex-1 overflow-y-auto px-5 pb-4 pt-1 lg:px-8",
  contentColumn: "mx-auto w-full max-w-[26rem] space-y-4 sm:max-w-md lg:max-w-lg lg:space-y-5",
  footer: "relative z-10 shrink-0 px-5 pb-6 pt-2 lg:px-8",
  footerColumn: "mx-auto w-full max-w-[26rem] sm:max-w-md lg:max-w-lg",
  astrologerName: "text-base font-semibold text-[var(--color-brand-black)] lg:text-lg",
  pricingCard:
    "space-y-2 rounded-2xl bg-white p-4 text-sm shadow-sm ring-1 ring-neutral-200/80 lg:p-5 lg:text-base",
  pricingRow: "flex justify-between gap-4",
  pricingTotal:
    "flex justify-between gap-4 border-t border-neutral-200 pt-2 font-bold",
  couponRow: "flex gap-2",
  couponInput:
    "min-w-0 flex-1 rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm lg:py-3",
  couponBtn:
    "shrink-0 rounded-xl border border-[var(--color-brand-primary)] px-4 py-2.5 text-sm font-semibold text-[var(--color-brand-primary)] lg:px-5",
  horoscopeLabel: "flex items-start gap-2 text-sm lg:text-base",
  error: "text-sm text-[var(--color-brand-error)]",
  payBtn:
    "mt-2 w-full rounded-full bg-[var(--color-brand-primary)] py-3 text-base font-semibold text-white disabled:opacity-50 lg:py-3.5 lg:text-lg",
} as const;
