/** UI strings and layout constants for the Ask Astrologer feature. */

import { CONSULTATION_LAYOUT } from "@/lib/constants/consultation-screen";
import { CONSULTATION_BOOKING_LAYOUT } from "@/lib/constants/consultation-booking";
import { CONSULTATION_CHECKOUT_LAYOUT } from "@/lib/constants/consultation-checkout";
import { TYPO } from "@/lib/constants/typography";

export const ASK_ASTROLOGER_SCREEN = {
  // Chat actions bar
  askAstrologerLabel: "Ask Astrologer",
  bookConsultationLabel: "Book Consultation",

  // Language selection page
  languagePageTitle: "Ask Astrologer",
  /** Shown under the logo — product name (header uses `languagePageTitle`). */
  serviceProfileName: "Single Question",
  languageHeading: "Select your preferred language",
  languageSubtitle: "We'll match you with an astrologer who speaks your language.",
  languageFieldLabel: "Language",
  languageNotesHeading: "Notes",
  languageNotes: [
    "Your answer will be delivered within 4 hours.",
    "An expert astrologer will review your question and horoscope, then reply with a personalized voice message.",
    "You can view your answer anytime under Notifications → Consultation.",
  ] as const,
  languageFieldError: "Please select a language",
  languageContinue: "Continue to Payment",
  checkoutTitle: "Booking Details",
  checkoutQuestionSection: "Question details",
  checkoutPaymentSection: "Payment summary",
  checkoutLanguagesLabel: "Language",
  checkoutTurnaroundLabel: "Answer within",
  checkoutTurnaroundValue: "4 hours",
  checkoutHeading: "Single question consultation",
  checkoutSubtitle: "Your question will be answered within 12 hours by an expert astrologer.",
  checkoutSlaHint: "Answer within 12 hours",
  checkoutPay: "Pay & Ask",
  checkoutIncludesTax: "Includes GST",
  checkoutLoadError: "Could not load pricing. Please try again.",
  checkoutYourQuestion: "Your question",
  checkoutFeeLabel: "Consultation fee",
  checkoutCgstLabel: "CGST",
  checkoutSgstLabel: "SGST",
  checkoutTotalLabel: "Total",
  checkoutProcessing: "Processing…",

  // WhatsApp consent gate page
  waConsentTitle: "Get Updates on WhatsApp",
  waConsentSection: "WhatsApp notifications",
  waConsentHeading: "Enable WhatsApp status updates",
  waConsentSubtitle:
    "We'll send a confirmation message to your WhatsApp. Reply to opt in for alerts.",
  waConsentBenefitAnswer: "Alert when your astrologer's answer is ready",
  waConsentBenefitStatus: "Updates when your request status changes",
  waConsentCta: "Send confirmation message",
  waConsentSending: "Sending…",
  waConsentSkip: "Skip for now",

  // Confirmation page
  confirmationTitle: "Question submitted",
  confirmationSection: "What's next",
  confirmationHeading: "You're all set!",
  confirmationBody:
    "Your question is with our team. An expert astrologer will answer within 4 hours.",
  confirmationStatusLabel: "Status",
  confirmationStatusValue: "Received",
  confirmationNotificationsLink: "Track in Notifications → Consultation",
  confirmationDone: "Back to Chat",

  // Notifications tab — Ask cards
  askCardLabel: "Ask Astrologer",
  askStatusReceived: "Received",
  askStatusAssigned: "Assigned",
  askStatusAnswered: "Answer ready",
  askSlaLabel: "Expected within 4 hours",
  askViewAnswer: "View Answer",
  askVoiceAnswerLabel: "Voice answer",
  askIncludesVoice: "Includes voice answer",
  askAnswerAnsweredByPrefix: "Answered by:",
  askAnswerAnsweredBySeparator: ", ",
  askAnswerViewProfileLink: "View profile",
  askAnswerDialogTitle: "Astrologer's Answer",
  askAnswerYourQuestion: "Your question",
  askAnswerLoadError: "Could not load answer. Please try again.",
  askAnswerEmpty: "No answer content available yet.",
  emptyAskRequests: "No Ask Astrologer requests yet.",

  // Answer-ready popup (main layout)
  answerReadyPopupTitle: "Your answer is ready",
  answerReadyPopupBody: "An astrologer has replied to your question.",
  answerReadyPopupHint: "Read or listen to the answer now — or find it later in Notifications.",
  answerReadyPopupViewCta: "Open answer",
  answerReadyPopupLaterCta: "Not now",

  // Astrologer portal — ask request cards
  astrologerPageTitle: "Ask Requests",
  astrologerLoadFailed: "Failed to load requests",
  astrologerAnswerBtn: "Answer",
  astrologerCancelBtn: "Cancel",
  astrologerSubmitAnswer: "Submit Answer",
  astrologerSubmitting: "Submitting…",
  astrologerSubmitFailed: "Submit failed. Please try again.",
  astrologerAnswerRequired: "Please record or attach a voice answer before submitting.",
  astrologerSubmitConfirmMessage:
    "Are you sure you want to submit this answer? You won't be able to edit it after submission.",
  astrologerSubmitConfirmLabel: "Submit",
  astrologerAiReference: "AI Answer (for reference)",
  astrologerEventPlanReference: "Event Plan (for reference)",
  muhurthaEventPlanLabel: "Your event plan",
  astrologerYourAnswer: "Your Answer",
  astrologerVoiceAnswerLead: "Record your answer (required)",
  astrologerVoiceAnswerHint:
    "Tap Record voice and share your personalized reply. You may add optional written notes below.",
  astrologerTextAnswerOptional: "Optional written notes",
  astrologerDetailName: "Name",
  astrologerDetailDob: "DOB",
  astrologerDetailTob: "TOB",
  astrologerDetailPob: "POB",
  astrologerDetailRasi: "Rasi",
  astrologerDetailNakshatra: "Nakshatra",
  astrologerDetailLanguage: "Language",
  astrologerAnswerPlaceholder: "Type your answer here…",
  astrologerCustomerSection: "Client details",
  astrologerStatusAssigned: "Awaiting answer",
  astrologerStatusAnswered: "Answered",
  astrologerPageSubtitle: "Review client details and submit text or voice answers.",
} as const;

export const ASK_ASTROLOGER_LAYOUT = {
  page:
    "relative flex min-h-dvh flex-col bg-white -mb-[var(--main-bottom-nav-clearance)] pb-[var(--main-bottom-nav-clearance)]",
  body: "relative flex min-h-0 flex-1 flex-col",
  scroll: "flex-1 overflow-y-auto px-5 pb-4 pt-1 lg:px-8",
  contentColumn: "w-full space-y-4 lg:space-y-5",
  checkoutColumn: CONSULTATION_CHECKOUT_LAYOUT.contentColumn,
  footer: "relative shrink-0 space-y-2 px-5 pb-10 pt-2 lg:px-8",
  footerColumn: "w-full",
  checkoutFooterColumn: CONSULTATION_CHECKOUT_LAYOUT.footerColumn,
  skipLink:
    "w-full py-3 text-sm font-medium text-black/60 transition-colors hover:text-black/80 lg:text-base",
  primaryBtn:
    "w-full rounded-full bg-[var(--color-brand-primary)] py-3.5 text-base font-semibold text-white transition-opacity active:opacity-80 disabled:opacity-50 lg:py-4 lg:text-lg",
} as const;

export const ASK_NOTIFICATION_STATUS_LABEL: Record<string, string> = {
  pending_payment: "Pending",
  paid: ASK_ASTROLOGER_SCREEN.askStatusReceived,
  assigned: ASK_ASTROLOGER_SCREEN.askStatusAssigned,
  answered: ASK_ASTROLOGER_SCREEN.askStatusAnswered,
  cancelled: "Cancelled",
};

export const ASK_NOTIFICATION_STATUS_COLOR: Record<string, string> = {
  pending_payment: "bg-amber-50 text-amber-700",
  paid: "bg-blue-50 text-blue-700",
  assigned: "bg-purple-50 text-purple-700",
  answered: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-600",
};

export const ASK_ASTROLOGER_UI = {
  page: ASK_ASTROLOGER_LAYOUT.page,
  inner: ASK_ASTROLOGER_LAYOUT.contentColumn,
  heading: `${TYPO.sizeLg} ${TYPO.weightRegular} leading-tight text-[var(--color-brand-black)]`,
  subtitle: CONSULTATION_LAYOUT.pageSubtitle,
  slaBadge:
    "inline-flex items-center rounded-full bg-[var(--color-brand-primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-brand-primary)] lg:text-sm",
  languageIntro: "space-y-3",
  languageQuestionCard: "mb-4",
  languageQuestionText: `${TYPO.sizeBase} ${TYPO.weightSemibold} leading-relaxed text-black/80 lg:text-lg`,
  languageFields: "mt-4",
  languageNotesList: "mt-4 space-y-2 rounded-xl bg-neutral-50 p-4 ring-1 ring-black/5",
  languageNotesTitle: `${TYPO.sizeSm} ${TYPO.weightSemibold} text-[var(--color-brand-black)]`,
  languageNotesItem: `${TYPO.sizeSm} leading-relaxed text-black/70`,
  portalVoiceAnswerPrimary:
    "rounded-xl border-2 border-[var(--color-brand-primary)]/35 bg-[var(--color-brand-primary)]/5 p-4 lg:p-5",
  waConsentBenefits: "space-y-2.5",
  waConsentBenefitRow: "flex items-start gap-2.5 text-sm text-black/70 lg:text-base",
  waConsentBenefitIcon: "mt-0.5 size-4 shrink-0 text-[var(--color-brand-primary)]",
  waConsentPhoneCard: "mt-5",
  confirmationIntro: "space-y-3",
  confirmationCheck: "size-8 text-[var(--color-brand-primary)] lg:size-9",
  confirmationCard: "mt-5 space-y-4",
  confirmationTrackLink:
    "w-full pt-1 text-left text-sm font-semibold text-[var(--color-brand-primary)] underline underline-offset-2 transition-opacity hover:opacity-80 lg:text-base",
  checkoutStack: "mt-8 space-y-5",
  questionCard: CONSULTATION_BOOKING_LAYOUT.queryCard,
  sectionLabel: `${TYPO.sizeXs} ${TYPO.weightSemibold} uppercase tracking-wide text-black/40`,
  notificationCard:
    "mb-3 rounded-xl border border-black/[0.04] bg-[#f6f6f6] p-4 lg:p-5",
  notificationFooter: "flex flex-wrap items-center justify-between gap-2 pt-1",
  notificationViewAnswer:
    "inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-primary)] transition-opacity hover:opacity-80 lg:text-base",
  statusBadge:
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium lg:text-sm",
  dialogPanel:
    "relative z-10 max-h-[85vh] w-full overflow-y-auto overflow-x-hidden rounded-t-2xl bg-white p-5 pb-[calc(var(--main-bottom-nav-clearance)+1.25rem)] shadow-lg sm:max-w-lg sm:rounded-2xl sm:p-6 sm:pb-6 lg:p-8",
  answerBlock: "rounded-xl bg-neutral-50 p-4 lg:p-5",
  answerAttributionLink:
    "font-semibold text-[var(--color-brand-primary)] underline underline-offset-2 hover:opacity-80",
  portalList: "mx-auto w-full max-w-2xl flex-1 px-4 py-5 lg:max-w-3xl lg:px-8 lg:py-8",
  portalCard:
    "overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 lg:rounded-2xl",
  portalCardInner: "space-y-5 p-5 lg:space-y-6 lg:p-7",
  portalQuestion:
    "text-base font-semibold leading-snug text-[var(--color-brand-black)] lg:text-lg",
  portalMetaRow: "flex flex-wrap items-center gap-2",
  portalRequestId: `${TYPO.sizeXs} ${TYPO.weightSemibold} uppercase tracking-wide text-black/45`,
  portalStatusBadge:
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset lg:text-sm",
  portalStatusAssigned: "bg-amber-50 text-amber-900 ring-amber-200/80",
  portalStatusAnswered: "bg-emerald-50 text-emerald-900 ring-emerald-200/80",
  portalSectionTitle: `${TYPO.sizeSm} ${TYPO.weightSemibold} text-[var(--color-brand-black)] lg:text-base`,
  portalSectionDivider: "border-t border-dashed border-black/15",
  portalDetailGrid: "grid gap-3 sm:grid-cols-2 lg:gap-4",
  portalDetailLabel: `${TYPO.sizeXs} ${TYPO.weightMedium} text-black/50 lg:text-sm`,
  portalDetailValue: `${TYPO.sizeSm} ${TYPO.weightSemibold} text-[var(--color-brand-black)] lg:text-base`,
  portalBody: `${TYPO.sizeSm} leading-relaxed text-black/75 lg:text-base lg:leading-relaxed`,
  portalAnswerPanel:
    "rounded-xl border border-emerald-200/80 bg-emerald-50/60 p-4 lg:p-5",
  portalAnswerTitle: `${TYPO.sizeSm} ${TYPO.weightSemibold} text-emerald-800 lg:text-base`,
  portalAvatar:
    "flex size-11 shrink-0 items-center justify-center rounded-full border-[3px] border-[var(--color-brand-primary)] bg-white text-base font-semibold text-[var(--color-brand-primary)] lg:size-12 lg:text-lg",
  portalCustomerName: `${TYPO.sizeBase} ${TYPO.weightSemibold} text-gray-800 lg:text-lg`,
  portalAnswerBtn:
    "shrink-0 rounded-full bg-[var(--color-brand-primary)] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-opacity hover:opacity-90 lg:px-5 lg:py-2.5 lg:text-sm",
  portalCancelBtn:
    "shrink-0 rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-semibold text-black/70 lg:px-5 lg:py-2.5 lg:text-sm",
  portalFormPanel: "rounded-xl border border-black/10 bg-neutral-50/80 p-4 lg:p-5",
  portalTextarea:
    "w-full rounded-xl border border-black/15 bg-white px-3 py-3 text-sm leading-relaxed text-[var(--color-brand-black)] placeholder:text-black/35 focus:border-[var(--color-brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 lg:py-3.5 lg:text-base",
  answerReadyPopupPanel:
    "relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-7 lg:max-w-lg lg:rounded-3xl lg:p-8",
  answerReadyPopupIcon:
    "mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-[var(--color-brand-primary)]/12 text-xl font-bold text-[var(--color-brand-primary)] lg:mb-5 lg:size-14 lg:text-2xl",
  answerReadyPopupTitle: `${TYPO.sizeLg} ${TYPO.weightSemibold} text-center text-[var(--color-brand-black)] lg:text-xl`,
  answerReadyPopupBody: "mt-2 text-center text-sm leading-relaxed text-black/65 lg:text-base",
  answerReadyPopupHint: "mt-1 text-center text-xs leading-relaxed text-black/45 lg:text-sm",
  answerReadyPopupQuestion:
    "mt-5 rounded-xl border-l-4 border-[var(--color-brand-primary)] bg-neutral-50 px-4 py-3 text-sm leading-snug text-[var(--color-brand-black)] lg:px-5 lg:py-4 lg:text-base",
  answerReadyPopupActions: "mt-6 grid grid-cols-2 gap-2.5",
  answerReadyPopupPrimaryBtn:
    "inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-brand-primary)] px-4 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 lg:h-12 lg:text-base",
  answerReadyPopupSecondaryBtn:
    "inline-flex h-11 items-center justify-center rounded-full border border-black/12 bg-white px-4 text-sm font-medium text-black/60 transition-colors hover:bg-neutral-50 lg:h-12 lg:text-base",
} as const;

export const ASK_ASTROLOGER_SESSION_KEY = "ask_astrologer_flow" as const;
