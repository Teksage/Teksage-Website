/** Flutter-aligned layout tokens for settings sub-pages. */

import { TYPO } from "@/lib/constants/typography";

export const PREMIUM_PLAN_FEATURES = [
  "Auto Schedule Daily Predictions",
  "Auto Schedule Weekly Predictions",
  "Book Consultations",
  "Basic Horoscope Chart",
  "Edit Horoscope Details",
  "Unlimited Number Of Chat Per Week",
  "Pick Chat Avatar",
  "Pick Chat Style",
  "Life Predictions",
  "Yearly Predictions",
  "Personalized Panchang",
] as const;

export const SETTINGS_UI = {
  rowShell:
    "flex min-h-[3.5rem] w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors",
  rowDefault:
    "bg-transparent hover:bg-[var(--color-home-screen-mint)]/55",
  rowLogout:
    "bg-transparent hover:bg-[color-mix(in_srgb,var(--color-brand-error)_8%,transparent)]",
  rowIconWrap:
    "flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-home-screen-mint)]/90 ring-1 ring-[var(--color-brand-primary)]/10",
  rowIconWrapLogout:
    "flex size-9 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-brand-error)_10%,white)]",
  rowIcon: "size-[1.15rem] object-contain",
  rowLabel: `${TYPO.sizeSm} ${TYPO.weightMedium} truncate text-[var(--color-brand-black)]/80 lg:text-base`,
  rowLabelLogout: `${TYPO.sizeSm} ${TYPO.weightSemibold} truncate text-[var(--color-brand-error)] lg:text-base`,
  rowChevron: "size-4 shrink-0 text-black/25 lg:size-5",
  whitePage: "relative z-10 min-h-0 flex-1 bg-white",
  languagePage: "relative z-10 min-h-0 flex-1",
  subscriptionPage: "relative z-10 min-h-0 flex-1 bg-black text-white",
  contentPad: "w-full",
  languageHint: `${TYPO.chatBubble} text-black/45`,
  languageList: "mt-4 flex flex-col gap-2",
  languageOption:
    "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors",
  languageOptionSelected:
    "bg-[var(--color-home-screen-mint)]/70 ring-1 ring-[var(--color-brand-primary)]/20",
  languageOptionIdle: "hover:bg-[var(--color-home-screen-mint)]/40",
  languageOptionLabel: `${TYPO.chatBubble} block text-[var(--color-brand-black)]`,
  languageOptionLabelActive: `${TYPO.chatCardText} block text-[var(--color-brand-primary)]`,
  languageOptionSub: `${TYPO.sizeXs} text-black/45`,
  radioOuter:
    "flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-neutral-400",
  radioOuterSelected: "border-[var(--color-brand-primary)]",
  radioInner: "size-2.5 rounded-full bg-[var(--color-brand-primary)]",
  pushList: "divide-y divide-black/[0.06]",
  pushRow: "px-4 py-4 sm:px-5",
  pushNotice: `${TYPO.chatBubble} mb-4 text-black/55`,
  pushNoticeLink: `${TYPO.weightSemibold} text-[var(--color-brand-primary)] underline-offset-2 hover:underline`,
  toggleLabel: `${TYPO.chatBubble} min-w-0`,
  toggleLabelOn: "text-[var(--color-brand-black)]",
  toggleLabelOff: "text-black/60",
  supportLead: `${TYPO.chatBubble} whitespace-pre-line text-black/50`,
  supportTextarea:
    `mt-0 w-full resize-none rounded-xl border border-black/[0.08] bg-[var(--color-brand-bg)] px-4 py-3.5 ${TYPO.chatBubble} text-[var(--color-brand-black)] outline-none focus:border-[var(--color-brand-primary)] focus:bg-white`,
  supportSubmit:
    `mt-6 w-full rounded-full py-3.5 ${TYPO.chatBubble} transition-colors disabled:bg-black/10 disabled:text-neutral-500 enabled:bg-[var(--color-brand-primary)] enabled:text-white sm:max-w-[14rem]`,
  supportOrRow: "mt-6 flex max-w-[18rem] items-center gap-3",
  supportOrLine: "h-px flex-1 bg-black/[0.08]",
  supportOrLabel: `${TYPO.chatBubble} text-black/40`,
  supportWhatsAppBtn:
    `mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[var(--color-brand-primary)] bg-white ${TYPO.chatBubble} text-[var(--color-brand-primary)] transition-colors hover:bg-[var(--color-home-screen-mint)]/70 sm:max-w-[18rem]`,
  supportWhatsAppIcon: "size-5 object-contain",
  supportWhatsAppHint: `${TYPO.chatBubble} mt-2 max-w-[18rem] text-black/40`,
  faqSubtitle: `${TYPO.chatBubble} text-black/50`,
  faqContent: "w-full",
  faqSearch:
    "relative rounded-xl bg-[var(--color-brand-bg)] px-4 py-3 ring-1 ring-transparent focus-within:ring-[color-mix(in_srgb,var(--color-brand-primary)_35%,transparent)]",
  faqSearchInput:
    `w-full min-w-0 bg-transparent pr-10 ${TYPO.chatBubble} text-black/80 outline-none placeholder:text-black/50`,
  faqSearchIcon:
    "pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 opacity-50",
  faqQuestion: `${TYPO.chatCardTextBot} flex-1 text-[var(--color-brand-black)]`,
  faqAnswer: `${TYPO.chatBubble} px-4 pb-4 text-black/55`,
  faqFooter: "mt-5",
  faqFooterInner: "flex w-full flex-col items-start sm:items-center",
  faqContactBtn:
    `mt-4 inline-flex rounded-full bg-[var(--color-brand-primary)] px-6 py-3 text-center ${TYPO.chatBubble} text-white transition-opacity hover:opacity-95`,
  subscriptionBg:
    "pointer-events-none absolute inset-x-0 top-12 z-0 h-64 w-full object-cover opacity-60",
  subscriptionHeroScrim:
    "pointer-events-none absolute inset-x-0 top-12 z-[1] h-80 bg-gradient-to-b from-black/25 via-black/75 to-black",
  subscriptionPageShell:
    "relative z-10 flex min-h-dvh w-full flex-1 flex-col bg-black text-white lg:h-full lg:min-h-0 lg:overflow-hidden",
  subscriptionScroll:
    "relative z-10 flex-1 lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain",
  subscriptionContent: "mx-auto w-full max-w-lg px-5 pt-2 lg:max-w-2xl lg:px-8",
  subscriptionContentAboveFooter: "pb-28 lg:pb-8",
  subscriptionFooter:
    "sticky bottom-0 z-20 mt-auto flex w-full shrink-0 justify-center border-t border-white/10 bg-black px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] shadow-[0_-12px_32px_rgb(0_0_0_/0.65)] lg:px-8 lg:pb-6",
  subscriptionPrimaryBtn:
    "w-full max-w-md cursor-pointer rounded-full bg-white py-4 text-center text-lg font-semibold text-[var(--color-brand-primary)] transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60",
  subscriptionCard:
    "relative z-10 rounded-xl border border-white/15 bg-[var(--color-subscription-card-surface)] px-5 pb-4 pt-6 shadow-[0_8px_32px_rgb(0_0_0_/0.5)] backdrop-blur-md",
  subscriptionPlanPriceBox:
    "shrink-0 rounded-md bg-[color-mix(in_srgb,var(--color-brand-black)_55%,transparent)] px-[15px] py-5 text-center ring-1 ring-white/15",
  subscriptionFeatureLabel:
    "text-sm font-medium leading-snug text-[var(--color-subscription-feature-text)]",
  subscriptionCompareHeader:
    "flex items-center justify-between gap-3 text-base font-semibold text-white",
  subscriptionCompareCol:
    "w-10 shrink-0 text-center text-sm font-medium text-white",
  subscriptionCompareRow: "flex items-center justify-between gap-3",
  subscriptionPlanRow: "relative z-10 mt-2.5 flex gap-2.5 lg:max-w-xl lg:mx-auto",
  subscriptionPlanCard:
    "relative mt-2.5 flex w-full flex-col items-center justify-center rounded border-[1.5px] px-1 py-2",
  subscriptionPlanCardIdle:
    "h-[81px] border-white/15 bg-[var(--color-subscription-plan-idle-surface)] backdrop-blur-sm",
  subscriptionPlanCardSelected:
    "h-[106px] border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]",
  subscriptionTryPremiumTitle:
    "text-center text-title-lg font-semibold leading-none text-white",
  rateOverlay:
    "fixed inset-0 z-50 flex items-center justify-center bg-black/10 p-6 backdrop-blur-sm",
  rateCard:
    "relative max-h-[80vh] w-full max-w-sm overflow-y-auto rounded-xl bg-white p-4 shadow-xl",
  cancelReasonList: "flex flex-col gap-2 text-left",
  cancelReasonItem:
    "flex cursor-pointer items-start gap-2 text-sm font-medium text-[var(--color-brand-black)]",
  cancelReasonCheckbox:
    "mt-0.5 size-4 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-[var(--color-brand-primary)] bg-white outline-none ring-0 checked:border-[6px] checked:border-[var(--color-brand-primary)] focus:outline-none focus:ring-0 focus-visible:outline-none",
  cancelReasonOtherInput:
    "mt-2 w-full resize-none rounded-lg border border-black/15 px-3 py-2 text-sm text-[var(--color-brand-black)] outline-none focus:border-[var(--color-brand-primary)]",
  cancelReasonError: "mt-1 text-xs text-red-500",
  rateModalActions: "flex justify-center px-4 pb-4 pt-2",
  rateModalActionsRow:
    "flex w-full flex-row items-stretch justify-between gap-3 px-4 pb-4 pt-2",
  rateModalConfirmBtn:
    "min-w-[140px] cursor-pointer rounded-full bg-[var(--color-brand-primary)] px-6 py-2.5 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
  rateModalConfirmBtnSplit:
    "flex-1 cursor-pointer rounded-full bg-[var(--color-brand-primary)] px-3 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
  rateModalDismissBtn:
    "min-w-[140px] cursor-pointer rounded-full border border-black/15 px-6 py-2.5 text-base font-semibold text-[var(--color-brand-black)] transition-opacity hover:opacity-90",
  rateModalDismissBtnSplit:
    "flex-1 cursor-pointer rounded-full border border-black/15 px-3 py-2.5 text-sm font-semibold text-[var(--color-brand-black)] transition-opacity hover:opacity-90",
} as const;
