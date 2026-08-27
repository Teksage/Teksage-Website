import { TYPO } from "@/lib/constants/typography";

export const CONSULTATION_CHECKOUT_PAGE_MAX = "max-w-[1280px]" as const;
export const CONSULTATION_CHECKOUT_FOCUS_CATEGORIES = [
  "Career",
  "Wealth",
  "Marriage",
  "Health",
  "Education",
  "Property",
] as const;

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
  focusTitle: "What should {name} focus on?",
  focusHint: "Pick up to 3 — helps them prepare before the call.",
  questionPlaceholder: "Optional: one question you most want answered",
  paymentSummaryTitle: "Payment summary",
  promoPlaceholder: "Promo code",
  applyBtn: "Apply",
  consentText:
    "I consent to sharing my personal information & horoscope with the astrologer.",
  consentHint: "Tick the consent box to continue",
  trustPoints: [
    "Free reschedule or full refund up to 4 hours before the call.",
    "Astrologers are ID-verified and reviewed after every session.",
    "Your chart is shared only with {name}.",
  ],
  whenLabel: "WHEN",
  stepAstrologer: "Astrologer",
  stepSchedule: "Schedule",
  stepDetails: "Details",
  stepNumDetails: "3",
  callLanguageLabel: "Language for call",
  consultationFeeLabel: "Consultation fee (30 min)",
  totalPayableLabel: "Total payable",
  paySecurely: "Pay {amount} securely",
  videoCallLabel: "Video call",
  sessionMinutesLabel: "30 minutes",
} as const;

export const CONSULTATION_CHECKOUT_BIRTH_CELL_BG =
  "bg-[color-mix(in_srgb,var(--color-brand-primary)_10%,white)]" as const;

export const CONSULTATION_CHECKOUT_LAYOUT = {
  page: "relative flex min-h-dvh flex-col chat-landing-surface lg:h-full lg:min-h-0",
  pageHeader:
    "relative z-30 w-full shrink-0 border-b border-[var(--color-chat-landing-header-border)] bg-[var(--color-chat-landing-bg)]",
  pageHeaderInner: `${CONSULTATION_CHECKOUT_PAGE_MAX} mx-auto flex w-full items-center gap-3 px-3 py-3 sm:gap-4 sm:px-4 lg:px-5`,
  backBtn:
    "flex size-9 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] bg-white text-[var(--color-brand-black)] shadow-[0_1px_2px_rgb(0_0_0_/0.04)] transition-colors hover:bg-black/[0.02]",
  headerMain: "min-w-0 flex-1",
  headerTitle: `${TYPO.sizeBase} ${TYPO.weightExtrabold} ${TYPO.leadingSnug} text-[var(--color-brand-black)]`,
  headerSub: `${TYPO.sizeXs} ${TYPO.weightMedium} mt-0.5 text-black/45 sm:text-sm`,
  stepRow: "hidden shrink-0 items-center gap-5 md:flex lg:gap-6",
  stepItem: "flex items-center gap-2",
  stepBadge:
    "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
  stepBadgeDone:
    "bg-[color-mix(in_srgb,var(--color-brand-primary)_16%,white)] text-[var(--color-brand-primary)]",
  stepBadgeActive: "bg-[var(--color-brand-primary)] text-white",
  stepLabelDone: `${TYPO.sizeSm} ${TYPO.weightMedium} text-black/40`,
  stepLabelActive: `${TYPO.sizeSm} ${TYPO.weightBold} text-[var(--color-brand-black)]`,

  scroll: "min-h-0 flex-1 overflow-y-auto px-3 pb-8 pt-4 sm:px-4 lg:px-5",
  inner: `${CONSULTATION_CHECKOUT_PAGE_MAX} mx-auto grid w-full grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-8`,

  detailsPanel:
    "overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_4px_18px_rgb(0_0_0_/0.06)]",
  detailsSection: "px-4 py-4 sm:px-5 sm:py-5",
  detailsDivider: "border-t border-dashed border-black/10",
  astroRow: "flex items-center gap-3",
  astroAvatar:
    "size-12 shrink-0 overflow-hidden rounded-full border-2 border-[color-mix(in_srgb,var(--color-chat-star)_35%,white)] bg-[color-mix(in_srgb,var(--color-chat-star)_14%,white)]",
  astroAvatarImg: "size-full object-cover",
  astroAvatarInitials: `${TYPO.sizeXs} sm:text-sm ${TYPO.weightBold} flex size-full items-center justify-center text-[color-mix(in_srgb,var(--color-chat-star)_75%,var(--color-brand-black))]`,
  astroMeta: "min-w-0 flex-1",
  astroName: `${TYPO.sizeSm} ${TYPO.weightExtrabold} text-[var(--color-brand-black)]`,
  astroSub: `${TYPO.sizeXs} ${TYPO.weightMedium} mt-0.5 text-black/50`,
  textLink: `${TYPO.sizeSm} ${TYPO.weightBold} shrink-0 cursor-pointer text-[var(--color-brand-primary)] transition-opacity hover:opacity-80`,
  whenRow: "flex items-start justify-between gap-3",
  whenBlock: "min-w-0",
  whenLabel: `${TYPO.size2xs} ${TYPO.weightBold} uppercase tracking-[0.14em] text-black/40`,
  whenValue: `${TYPO.sizeSm} sm:text-base ${TYPO.weightExtrabold} mt-1 text-[var(--color-brand-black)]`,
  outlineBtn:
    `${TYPO.sizeXs} ${TYPO.weightBold} shrink-0 cursor-pointer rounded-xl border border-black/15 px-3 py-1.5 text-black/60 transition-colors hover:border-black/30`,
  birthHeader: "mb-3 flex items-center justify-between gap-3",
  birthTitle: `${TYPO.sizeSm} ${TYPO.weightExtrabold} text-[var(--color-brand-black)]`,
  birthGrid: "grid grid-cols-2 gap-2 sm:grid-cols-3",
  birthCell: `rounded-xl p-3 ${CONSULTATION_CHECKOUT_BIRTH_CELL_BG}`,
  birthCellLabel: `${TYPO.size2xs} ${TYPO.weightSemibold} uppercase tracking-wide text-black/45`,
  birthCellValue: `${TYPO.sizeSm} ${TYPO.weightBold} mt-1 text-[var(--color-brand-black)]`,
  focusTitle: `${TYPO.sizeSm} ${TYPO.weightExtrabold} text-[var(--color-brand-black)]`,
  focusHint: `${TYPO.sizeXs} ${TYPO.weightMedium} mt-0.5 text-black/45`,
  focusChips: "mt-3 flex flex-wrap gap-2",
  focusChip: `${TYPO.sizeSm} ${TYPO.weightSemibold} rounded-full border px-3.5 py-1.5 transition-colors`,
  focusChipActive:
    "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] text-white",
  focusChipDefault: "border-black/15 bg-white text-black/65 hover:border-black/25",
  focusTextarea: `mt-3 w-full resize-none rounded-xl border border-black/[0.09] bg-black/[0.02] px-3.5 py-3 ${TYPO.sizeSm} ${TYPO.weightMedium} text-black/70 placeholder:text-black/35 focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]/40`,

  rightCol: "flex flex-col gap-4 lg:sticky lg:top-4",
  payCard:
    "rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_4px_18px_rgb(0_0_0_/0.06)] sm:p-5",
  payCardTitle: `${TYPO.sizeBase} ${TYPO.weightExtrabold} mb-4 text-[var(--color-brand-black)]`,
  promoRow: "mb-4 flex gap-2",
  promoInput: `min-w-0 flex-1 rounded-xl border border-dashed border-black/20 bg-black/[0.02] px-3.5 py-2.5 ${TYPO.sizeSm} ${TYPO.weightMedium} placeholder:text-black/35 focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]/40`,
  promoBtn: `${TYPO.sizeSm} ${TYPO.weightBold} shrink-0 rounded-xl border border-[var(--color-brand-primary)] px-4 py-2.5 text-[var(--color-brand-primary)] transition-opacity hover:opacity-80 disabled:opacity-40`,
  feeRow: `flex justify-between py-1.5 ${TYPO.sizeSm} ${TYPO.weightMedium} text-black/65`,
  feeDiscountRow: `flex justify-between py-1.5 ${TYPO.sizeSm} ${TYPO.weightBold} text-[var(--color-brand-primary)]`,
  feeDivider: "my-2 border-t border-black/[0.07]",
  feeTotalRow: `flex justify-between pt-1 ${TYPO.sizeLg} ${TYPO.weightExtrabold} text-[var(--color-brand-black)]`,
  promoError: `${TYPO.sizeXs} ${TYPO.weightMedium} mt-1 text-[var(--color-brand-error)]`,
  consentRow: "mt-4 flex items-start gap-2.5",
  consentCheck: "mt-0.5 size-4 shrink-0 accent-[var(--color-brand-primary)]",
  consentText: `${TYPO.sizeXs} ${TYPO.weightMedium} leading-relaxed text-black/60`,
  consentHint: `${TYPO.sizeXs} ${TYPO.weightMedium} mt-1.5 text-center text-black/40`,
  error: `${TYPO.sizeSm} ${TYPO.weightMedium} mt-2 text-[var(--color-brand-error)]`,
  payBtn: `${TYPO.sizeBase} ${TYPO.weightExtrabold} mt-4 block w-full rounded-xl py-3.5 text-center text-white shadow-[0_6px_18px_rgb(16_177_0_/0.22)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-black/20 disabled:text-white/80 disabled:shadow-none enabled:bg-[var(--color-brand-primary)]`,
  trustCard:
    "rounded-2xl border border-[color-mix(in_srgb,var(--color-brand-primary)_18%,white)] bg-[color-mix(in_srgb,var(--color-brand-primary)_8%,white)] p-4 sm:p-5",
  trustList: "flex flex-col gap-2.5",
  trustRow: `flex items-start gap-2 ${TYPO.sizeXs} ${TYPO.weightMedium} text-black/60`,
  trustIcon: "mt-px shrink-0 text-sm text-[var(--color-brand-primary)]",

  decoTop: "pointer-events-none hidden",
  decoBottom: "pointer-events-none hidden",
  body: "relative z-10 flex min-h-0 flex-1 flex-col",
  contentColumn: "mx-auto w-full max-w-lg space-y-4 lg:max-w-3xl",
  footer: "relative z-10 shrink-0 px-4 pb-6 pt-2 sm:px-6 lg:px-8",
  footerColumn: "mx-auto w-full max-w-lg lg:max-w-3xl",
  astrologerName: "text-base font-semibold text-[var(--color-brand-black)] lg:text-lg",
  pricingCard:
    "space-y-2 rounded-2xl bg-white p-4 text-sm shadow-sm ring-1 ring-neutral-200/80 lg:p-5 lg:text-base",
  pricingRow: "flex justify-between gap-4",
  pricingTotal: "flex justify-between gap-4 border-t border-neutral-200 pt-2 font-bold",
  couponRow: "flex gap-2",
  couponInput:
    "min-w-0 flex-1 rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm lg:py-3",
  couponBtn:
    "shrink-0 rounded-xl border border-[var(--color-brand-primary)] px-4 py-2.5 text-sm font-semibold text-[var(--color-brand-primary)] lg:px-5",
  horoscopeLabel: "flex items-start gap-2 text-sm lg:text-base",
} as const;
