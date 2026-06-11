/** UI strings and layout constants for the Ask Astrologer feature. */

export const ASK_ASTROLOGER_SCREEN = {
  // Chat actions bar
  askAstrologerLabel: "Ask Astrologer",
  bookConsultationLabel: "Book Consultation",

  // Language selection page
  languagePageTitle: "Ask Astrologer",
  languageHeading: "Select your preferred language(s)",
  languageSubtitle: "We'll route your question to the best-matched astrologer.",
  languageFirst: "Language 1",
  languageSecond: "Language 2 (optional)",
  languageFieldError: "Please select a language",
  languageDuplicateError: "Please choose two different languages",
  languageContinue: "Continue to Payment",

  // Checkout / payment page
  checkoutTitle: "Ask Astrologer",
  checkoutHeading: "Single question consultation",
  checkoutSubtitle: "Your question will be answered within 12 hours by an expert astrologer.",
  checkoutPay: "Pay & Ask",
  checkoutIncludesTax: "Includes GST",
  checkoutLoadError: "Could not load pricing. Please try again.",

  // WhatsApp consent gate page
  waConsentTitle: "Get Updates on WhatsApp",
  waConsentHeading: "Enable WhatsApp status updates",
  waConsentSubtitle:
    "Get notified on WhatsApp when your answer is ready and when your request status changes.",
  waConsentEnable: "Enable WhatsApp Updates",
  waConsentSkip: "Skip for now",

  // Confirmation page
  confirmationTitle: "Ask Astrologer",
  confirmationHeading: "Question submitted!",
  confirmationBody:
    "Your question has been received. You'll get a response within 12 hours.",
  confirmationNotificationsLink: "Track status in Notifications → Consultation",
  confirmationDone: "Back to Chat",

  // Notifications tab — Ask cards
  askCardLabel: "Ask Astrologer",
  askStatusReceived: "Received",
  askStatusAssigned: "Assigned",
  askStatusAnswered: "Answer ready",
  askSlaLabel: "Expected within 12 hours",
  askViewAnswer: "View Answer",
  askAnswerDialogTitle: "Astrologer's Answer",
  askAnswerYourQuestion: "Your question",
  askAnswerLoadError: "Could not load answer. Please try again.",
  askAnswerEmpty: "No answer content available yet.",
  emptyAskRequests: "No Ask Astrologer requests yet.",
} as const;

export const ASK_ASTROLOGER_UI = {
  page: "flex min-h-screen flex-col bg-white",
  inner: "flex flex-1 flex-col gap-6 px-5 py-6",
  heading: "text-xl font-bold text-[var(--color-brand-black)]",
  subtitle: "mt-1 text-sm text-black/60",
  priceBox: "rounded-2xl border border-black/10 bg-[var(--color-brand-surface)] p-4",
  priceLine: "flex items-center justify-between text-sm",
  priceTotal: "mt-3 border-t border-black/10 pt-3 flex items-center justify-between font-semibold",
  card: "rounded-2xl border border-black/10 bg-white p-4 shadow-sm",
  statusBadge:
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
} as const;

export const ASK_ASTROLOGER_SESSION_KEY = "ask_astrologer_flow" as const;
