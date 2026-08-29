import { TYPO } from "@/lib/constants/typography";

/** Promo code UI — mirrors Flutter `PromoCodeContainer` / `dashedContianer.dart`. */
export const COUPON_PROMO_COPY = {
  invalidPromo: "Invalid or expired promo code.",
  applied: "Applied",
  appliedToast: "Coupon applied",
  consultationSaved: "Coupon applied & you saved",
  referralSaved: "Referral discount applied & you saved",
} as const;

export const COUPON_PROMO_LAYOUT = {
  subscriptionWrap:
    "flex items-center gap-2 rounded-md border border-dashed border-white/80 bg-white/[0.08] px-3 py-2.5",
  subscriptionWrapApplied:
    "flex items-center gap-2 rounded-md border border-[var(--color-brand-primary)] bg-white/[0.08] px-3 py-2.5",
  subscriptionInput:
    "min-w-0 flex-1 bg-transparent text-sm text-white/50 outline-none placeholder:text-white/50",
  subscriptionApply:
    "shrink-0 text-sm font-semibold text-[var(--color-brand-primary)] disabled:opacity-60",
  consultationWrap:
    "flex gap-2 rounded-xl border border-dashed border-neutral-300 bg-white p-1",
  consultationWrapApplied:
    "flex gap-2 rounded-xl border border-[var(--color-consult-user-bg)] bg-white p-1",
  consultationInput:
    "min-w-0 flex-1 rounded-lg border-0 bg-white px-3 py-2.5 text-sm outline-none disabled:cursor-not-allowed disabled:text-neutral-500",
  consultationApply:
    "shrink-0 rounded-lg border border-[var(--color-consult-user-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--color-consult-user-bg)] disabled:cursor-not-allowed disabled:opacity-60",
  consultationWrapDisabled:
    "flex gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-1 opacity-90",
  error: `${TYPO.caption} mt-1.5 text-[var(--color-brand-error)]`,
  savedRow: `mt-1.5 flex items-center justify-between ${TYPO.caption} font-medium text-[var(--color-consult-user-bg)]`,
  subscriptionSavedRow: `mt-1.5 flex items-center justify-between ${TYPO.caption} font-medium text-[var(--color-brand-primary)]`,
} as const;
