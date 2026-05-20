/** Flutter-aligned layout tokens for settings sub-pages. */

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
  whitePage: "relative z-10 min-h-0 flex-1 bg-white",
  languagePage: "relative z-10 min-h-0 flex-1 settings-language-gradient",
  subscriptionPage: "relative z-10 min-h-0 flex-1 bg-black text-white",
  contentPad: "mx-auto w-full max-w-lg px-5",
  languageHint: "text-sm font-medium text-neutral-500",
  languageList: "mt-5 flex flex-col gap-3",
  languageOption:
    "flex w-full items-center gap-3 rounded-lg border-2 border-transparent px-3 py-2.5 text-left transition-colors",
  languageOptionSelected:
    "border-[var(--color-brand-primary)] bg-[color-mix(in_srgb,var(--color-brand-primary)_10%,white)]",
  languageOptionIdle: "border-transparent bg-[color-mix(in_srgb,var(--color-brand-black)_3%,transparent)]",
  radioOuter:
    "flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-neutral-400",
  radioOuterSelected: "border-[var(--color-brand-primary)]",
  radioInner: "size-2.5 rounded-full bg-[var(--color-brand-primary)]",
  pushList:
    "w-full border-y border-[#e0e0e0] divide-y divide-[#e0e0e0] bg-white",
  pushRow: "px-5 py-4",
  supportLead: "text-center text-base font-medium text-black/50",
  supportTextarea:
    "mt-12 w-full resize-none rounded-lg border-0 bg-[#f2f2f2] px-3 py-3.5 text-sm text-[var(--color-brand-black)] outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]",
  supportSubmit:
    "mt-auto w-full rounded-full py-3.5 text-base font-semibold transition-colors disabled:bg-[#d9d9d9] disabled:text-neutral-600 enabled:bg-[var(--color-brand-primary)] enabled:text-white",
  faqSubtitle: "text-center text-base font-medium text-black/50",
  faqContent: "mx-auto w-full max-w-lg lg:max-w-2xl",
  faqSearch:
    "relative rounded-xl bg-[#f6f6f6] px-4 py-3 ring-1 ring-transparent focus-within:ring-[color-mix(in_srgb,var(--color-brand-primary)_35%,transparent)]",
  faqSearchInput:
    "w-full min-w-0 bg-transparent pr-10 text-base leading-normal text-black/80 outline-none placeholder:text-black/50",
  faqSearchIcon:
    "pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 opacity-50",
  faqFooter:
    "shrink-0 border-t border-black/[0.12] bg-[#f6f6f6] px-4 pt-4 pb-6 lg:px-8 lg:pb-8",
  faqFooterInner: "mx-auto flex w-full max-w-lg flex-col items-center lg:max-w-md",
  faqContactBtn:
    "mt-5 block w-full max-w-md rounded-full bg-[var(--color-brand-primary)] py-3 text-center text-base font-semibold text-white transition-opacity hover:opacity-95 lg:py-2.5 lg:text-lg",
  legalHero: "settings-legal-hero relative shrink-0 px-4 pb-5 pt-3",
  legalHeroTitle: "text-center text-2xl font-bold text-white",
  legalHeroDate: "mt-2 text-center text-xs italic text-white",
  legalBody: "bg-white px-5 py-6",
  legalParagraph: "mt-2 text-sm leading-relaxed text-neutral-600",
  subscriptionBg: "pointer-events-none absolute inset-x-0 top-12 z-0 h-64 w-full object-cover opacity-90",
  subscriptionPageShell:
    "relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden bg-black text-white",
  subscriptionScroll: "relative z-10 flex-1 overflow-y-auto",
  subscriptionContent: "mx-auto w-full max-w-lg px-5 pt-2 lg:max-w-2xl lg:px-8",
  subscriptionFooter:
    "flex w-full shrink-0 justify-center bg-black px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] lg:px-8 lg:pb-8",
  subscriptionPrimaryBtn:
    "w-full max-w-md rounded-full bg-white py-4 text-center text-lg font-semibold text-[var(--color-brand-primary)] transition-opacity hover:opacity-95 disabled:opacity-60",
  subscriptionCard:
    "relative z-10 rounded border border-white/12 bg-white/[0.04] px-5 pb-4 pt-6",
  subscriptionPlanRow: "relative z-10 mt-2.5 flex gap-2.5 lg:max-w-xl lg:mx-auto",
  subscriptionPlanCard:
    "relative mt-2.5 flex w-full flex-col items-center justify-center rounded border-[1.5px] px-1 py-2",
  subscriptionPlanCardIdle:
    "h-[81px] border-white/12 bg-white/[0.04]",
  subscriptionPlanCardSelected:
    "h-[106px] border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]",
  subscriptionTryPremiumTitle:
    "text-center text-[1.35rem] font-semibold leading-none text-white",
  rateOverlay: "fixed inset-0 z-50 flex items-center justify-center bg-black/10 p-6 backdrop-blur-sm",
  rateCard: "relative w-full max-w-sm rounded-xl bg-white p-4 shadow-xl",
} as const;
