/** Monthly plan — backend auto-pay webhook activates `plan_id` 1 only. */
export const SUBSCRIPTION_AUTO_PAY_PLAN_ID = 1;

export const SETTINGS_SUBSCRIPTIONS_AUTO_PAY = {
  toggleLabel: "Enable auto-renewal",
  toggleHint: "Renews monthly. Cancel anytime from this page.",
  activeLabel: "Auto-renewal is on",
  nextBilling: "Next billing",
  cancelCta: "Cancel auto-renewal",
  cancelConfirm:
    "Stop automatic renewals? You keep premium access until the current period ends.",
  cancelSuccess: "Auto-renewal cancelled.",
  cancelFailed: "Could not cancel auto-renewal. Please try again.",
  monthlyBadge: "Auto-renew available",
} as const;

export const SETTINGS_SUBSCRIPTIONS_COPY = {
  pageTitle: "Subscription",
  loadFailed: "Could not load subscription details.",
  plansFailed: "Could not load plans.",
  activeLabel: "Current plan",
  daysRemaining: "days remaining",
  daysLeft: "days left",
  tryPremium: "Try Premium Plan",
  subscribeCta: "Subscribe",
  upgradeCta: "Upgrade Plan",
  currentPlan: "Your Current Plan",
  planLabel: "Plan",
  recommended: "Recommended",
  processing: "Processing…",
  paymentFailed: "Payment failed. Please try again.",
  paymentSuccess: "Subscription activated. Enjoy premium features!",
  paymentSuccessDialogTitle: "Payment Successful",
  paymentSuccessDialogConfirm: "OK",
  paymentActivating: "Activating your premium plan…",
  activatingPending:
    "Payment received. Premium is activating — check Subscriptions in a moment.",
  activating:
    "Payment received. Activating your premium plan… refresh in a moment if this stays.",
  noPlans: "No plans available for your region.",
  premiumFeatures: "Premium unlocks daily, weekly, and yearly prediction notifications.",
  comparePlans: "Compare the plans",
  planBenefitsTitle: "Included with this plan",
} as const;

/**
 * Intro offer pricing:
 * show MRP strike-off for INR monthly plan card in picker.
 */
export const SETTINGS_SUBSCRIPTION_MONTHLY_INR = {
  introPrice: 99,
  originalPrice: 199,
} as const;
