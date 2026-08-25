export const CONSULTATION_CHECKOUT_SCREEN = {
  title: "Review & pay",
  subtitle: "Check your birth details — the astrologer reads your chart from these.",
  processingCta: "Processing…",
  paymentFailed: "Payment could not be completed. Please try again.",
  paymentUsdHint:
    "USD payments require International Payments enabled on your Razorpay test account (Dashboard → Payment methods).",
  changeAstrologer: "Change",
  reschedule: "Reschedule",
  birthDetailsTitle: "Your birth details",
  editProfile: "Edit",
  focusTitle: "What should they focus on?",
  focusHint: "Pick up to 3 — helps them prepare before the call.",
  questionPlaceholder: "Optional: one question you most want answered",
  paymentSummaryTitle: "Payment summary",
  promoPlaceholder: "Promo code",
  applyBtn: "Apply",
  consentText: "I consent to sharing my personal information & horoscope with the astrologer.",
  consentHint: "Tick the consent box to continue",
  trustPoints: [
    "Free reschedule or full refund up to 4 hours before the call.",
    "Astrologers are ID-verified and reviewed after every session.",
    "Your chart is shared only with the astrologer.",
  ],
  whenLabel: "WHEN",
} as const;

export const CONSULTATION_CHECKOUT_LAYOUT = {
  page: "relative flex min-h-dvh flex-col chat-landing-surface",
  pageHeader:
    "relative z-30 w-full shrink-0 border-b border-[var(--color-chat-landing-header-border)] bg-[var(--color-chat-landing-bg)]",
  pageHeaderInner:
    "mx-auto flex w-full max-w-lg items-center gap-3 px-4 py-3 sm:px-6 lg:max-w-5xl lg:px-8",
  backBtn:
    "flex size-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-black/5",
  headerMain: "flex min-w-0 flex-1 flex-col",
  headerTitle: "text-base font-bold leading-snug text-[var(--color-brand-black)]",
  headerSub: "text-xs font-medium text-black/45",

  scroll: "flex-1 overflow-y-auto px-4 pb-12 pt-4 sm:px-6 lg:px-8",
  inner:
    "mx-auto w-full max-w-lg space-y-4 lg:max-w-5xl lg:grid lg:grid-cols-[1fr_340px] lg:items-start lg:gap-8 lg:space-y-0",
  leftCol: "space-y-4",
  rightCol: "space-y-4 lg:sticky lg:top-20",

  // Astrologer chip
  astroChip:
    "flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_4px_18px_rgb(0_0_0_/0.06)]",
  astroAvatar:
    "size-12 shrink-0 overflow-hidden rounded-full bg-neutral-200 object-cover",
  astroAvatarImg: "size-full object-cover",
  astroMeta: "min-w-0 flex-1",
  astroName: "text-sm font-bold text-[var(--color-brand-black)]",
  astroSub: "mt-0.5 text-xs font-medium text-black/50",
  changeLink: "shrink-0 text-sm font-bold text-[var(--color-brand-primary)] hover:opacity-80",

  // When card
  whenCard:
    "rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_4px_18px_rgb(0_0_0_/0.06)]",
  whenLabel: "mb-1 text-[10px] font-bold uppercase tracking-widest text-black/40",
  whenValue: "text-base font-extrabold text-[var(--color-brand-black)]",
  rescheduleBtn:
    "shrink-0 rounded-xl border border-black/15 px-3 py-1.5 text-xs font-bold text-black/60 hover:border-black/30",

  // Birth details card
  birthCard:
    "rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_4px_18px_rgb(0_0_0_/0.06)]",
  birthCardHeader: "mb-3 flex items-center justify-between",
  birthCardTitle: "text-sm font-extrabold text-[var(--color-brand-black)]",
  editLink: "text-xs font-bold text-[var(--color-brand-primary)] hover:opacity-80",
  birthGrid: "grid grid-cols-2 gap-2 sm:grid-cols-3",
  birthCell: "rounded-xl border border-black/[0.07] bg-black/[0.02] p-3",
  birthCellLabel: "text-[10px] font-semibold uppercase tracking-wide text-black/40",
  birthCellValue: "mt-0.5 text-sm font-bold text-[var(--color-brand-black)]",

  // Focus card
  focusCard:
    "rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_4px_18px_rgb(0_0_0_/0.06)]",
  focusCardTitle: "mb-0.5 text-sm font-extrabold text-[var(--color-brand-black)]",
  focusCardHint: "mb-3 text-xs font-medium text-black/45",
  focusChips: "flex flex-wrap gap-2",
  focusChip:
    "rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-all",
  focusChipActive:
    "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] text-white",
  focusChipDefault: "border-black/15 text-black/65",
  focusTextarea:
    "mt-3 w-full resize-none rounded-xl border border-black/[0.09] bg-black/[0.02] px-3.5 py-3 text-sm font-medium text-black/70 placeholder:text-black/35 focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]/40",

  // Payment summary card
  payCard:
    "rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_4px_18px_rgb(0_0_0_/0.06)]",
  payCardTitle: "mb-4 text-base font-extrabold text-[var(--color-brand-black)]",
  promoRow: "mb-4 flex gap-2",
  promoInput:
    "min-w-0 flex-1 rounded-xl border border-black/[0.1] bg-black/[0.02] px-3.5 py-2.5 text-sm font-medium placeholder:text-black/35 focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]/40",
  promoBtn:
    "shrink-0 rounded-xl border border-[var(--color-brand-primary)] px-4 py-2.5 text-sm font-bold text-[var(--color-brand-primary)] transition-opacity hover:opacity-80",
  feeRow: "flex justify-between py-1.5 text-sm font-medium text-black/65",
  feeDiscountRow: "flex justify-between py-1.5 text-sm font-bold text-[var(--color-brand-primary)]",
  feeDivider: "my-2 border-t border-black/[0.07]",
  feeTotalRow:
    "flex justify-between pt-1 text-lg font-extrabold text-[var(--color-brand-black)]",
  promoError: "mt-1 text-xs font-medium text-[var(--color-brand-error)]",

  // Consent
  consentRow: "mt-4 flex items-start gap-2.5",
  consentCheck: "mt-0.5 size-4 shrink-0 accent-[var(--color-brand-primary)]",
  consentText: "text-xs font-medium leading-relaxed text-black/60",
  consentHint: "mt-1.5 text-center text-xs font-medium text-black/40",
  error: "mt-2 text-sm font-medium text-[var(--color-brand-error)]",
  payBtn:
    "mt-4 block w-full rounded-full bg-[var(--color-brand-primary)] py-4 text-center text-base font-extrabold text-white shadow-[0_6px_18px_rgb(16_177_0_/0.22)] transition-opacity hover:opacity-90 disabled:opacity-40",

  // Trust list
  trustList: "mt-5 flex flex-col gap-2.5",
  trustRow: "flex items-start gap-2 text-xs font-medium text-black/55",
  trustIcon: "mt-px text-[var(--color-brand-primary)] text-sm shrink-0",

  // Legacy keys kept for backward compat with ConsultationCheckoutShell,
  // ConsultationCheckoutActions, ConsultationCheckoutPricing, chat-ask-astrologer.
  decoTop: "pointer-events-none hidden",
  decoBottom: "pointer-events-none hidden",
  body: "relative z-10 flex min-h-0 flex-1 flex-col",
  contentColumn: "mx-auto w-full max-w-lg space-y-4 lg:max-w-3xl",
  footer: "relative z-10 shrink-0 px-4 pb-6 pt-2 sm:px-6 lg:px-8",
  footerColumn: "mx-auto w-full max-w-lg lg:max-w-3xl",
  astrologerName: "text-base font-semibold text-[var(--color-brand-black)] lg:text-lg",
  pricingCard: "space-y-2 rounded-2xl bg-white p-4 text-sm shadow-sm ring-1 ring-neutral-200/80 lg:p-5 lg:text-base",
  pricingRow: "flex justify-between gap-4",
  pricingTotal: "flex justify-between gap-4 border-t border-neutral-200 pt-2 font-bold",
  couponRow: "flex gap-2",
  couponInput: "min-w-0 flex-1 rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm lg:py-3",
  couponBtn: "shrink-0 rounded-xl border border-[var(--color-brand-primary)] px-4 py-2.5 text-sm font-semibold text-[var(--color-brand-primary)] lg:px-5",
  horoscopeLabel: "flex items-start gap-2 text-sm lg:text-base",
} as const;
