/** Subscription payment summary — mirrors Flutter `paymentSummary.dart`. */
export const SETTINGS_SUBSCRIPTION_PAYMENT = {
  pageTitle: "Payment Summary",
  productName: "Teksage Pro",
  membership: "membership",
  planCost: "Plan Cost",
  discount: "Discount",
  cgstLabel: "CGST Charges",
  sgstLabel: "SGST Charges",
  totalCost: "Total Cost",
  promoPlaceholder: "Enter Promo Code",
  apply: "Apply",
  payNow: "Pay Now",
  paymentSuccess: "Payment successful!",
  paymentFailed: "Payment failed. Please try again.",
  loadFailed: "Could not load plan details.",
  invalidCheckout: "Select a plan from subscriptions first.",
} as const;

export const SUBSCRIPTION_PAYMENT_LAYOUT = {
  page: "relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden bg-black text-white lg:min-h-full",
  scroll: "relative z-10 flex-1 overflow-y-auto",
  content: "mx-auto w-full max-w-lg px-5 pt-2 lg:max-w-2xl lg:px-8",
  footer:
    "flex w-full shrink-0 justify-center bg-black px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] lg:px-8 lg:pb-8",
  heroIcon: "mx-auto h-auto w-[4.5rem]",
  productTitle: "text-center text-[1.35rem] font-semibold leading-none",
  membershipPill:
    "mx-auto mt-2.5 rounded-md border border-white/12 bg-[radial-gradient(circle,rgba(16,177,0,0.42)_0%,rgba(1,1,1,0.42)_100%)] px-5 py-2.5 text-center text-sm font-semibold leading-none",
  dashed: "my-5 border-t border-dashed border-white/50",
  feeRow: "flex items-center justify-between text-base text-white/50",
  feeTotalRow: "flex items-center justify-between text-white/50",
  feeTotalValue: "text-[1.1rem] font-semibold text-white",
  promoWrap:
    "flex items-center gap-2 rounded-md border border-dashed border-white/80 bg-white/[0.08] px-3 py-2.5",
  promoInput:
    "min-w-0 flex-1 bg-transparent text-sm text-white/50 outline-none placeholder:text-white/50",
  promoApply: "shrink-0 text-sm font-semibold text-[var(--color-brand-primary)]",
  payBtn:
    "w-full max-w-md rounded-full bg-white py-4 text-center text-lg font-semibold text-[var(--color-brand-primary)] transition-opacity hover:opacity-95 disabled:opacity-60",
} as const;
