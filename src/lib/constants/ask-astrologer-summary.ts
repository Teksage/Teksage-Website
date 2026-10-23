import { TYPO } from "@/lib/constants/typography";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";

const chatCard =
  `${TYPO.chatCardTextBot} w-full overflow-hidden rounded-2xl border border-[var(--color-chat-bot-border)] bg-[var(--color-chat-bot-bubble)] shadow-[0_1px_6px_rgb(0_0_0_/_0.06)]` as const;

/** Ask Astrologer answered summary — mirrors consultation Booking Details. */
export const ASK_SUMMARY_SCREEN = {
  title: "Ask Details",
  subtitle: "Your question, answer, and turnaround details.",
  subtitleAnswered: "Your answer is ready — you can leave a review below.",
  statusAnswered: "Answer ready",
  statusPending: "In progress",
  questionSection: "Your question",
  answerSection: "Astrologer's answer",
  detailsSection: "Request details",
  turnaroundLabel: "Answer within",
  turnaroundValue: "4 hours",
  languageLabel: "Language",
  feeLabel: "Consultation fee",
  answeredAtLabel: "Answered on",
  loadError: "Could not load this Ask request. Please try again.",
  missingId: "Missing Ask request.",
  reviewTitle: "Rate your answer",
} as const;

export const ASK_SUMMARY_LAYOUT = {
  page: "relative flex min-h-dvh flex-col chat-conversation-surface",
  pageHeader:
    "relative z-30 w-full shrink-0 border-b border-[var(--color-chat-landing-header-border)] bg-[var(--color-chat-landing-bg)]",
  pageHeaderInner:
    "mx-auto flex w-full max-w-lg items-center gap-3 px-5 py-3 sm:px-6 lg:max-w-6xl lg:px-8",
  backBtn:
    "flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-black/[0.08] bg-white text-[var(--color-brand-black)] shadow-[0_1px_2px_rgb(0_0_0_/0.04)] transition-colors hover:bg-black/[0.02]",
  headerMain: "min-w-0 flex-1",
  headerTitle: `${TYPO.h3Bold} ${TYPO.leadingSnug} text-[var(--color-brand-black)]`,
  headerSub: `${TYPO.chatBubble} mt-0.5 text-black/55`,
  scroll: "min-h-0 flex-1 overflow-y-auto",
  stack:
    "mx-auto flex w-full max-w-lg flex-col gap-4 px-5 py-5 sm:px-6 lg:max-w-6xl lg:px-8 lg:py-6",
  card: chatCard,
  sectionTitle: `${TYPO.h3Bold} border-b border-black/[0.05] bg-[var(--color-home-screen-mint)]/35 px-4 py-3 sm:px-5`,
  body: "px-4 py-4 sm:px-5 sm:py-5",
  question: `${TYPO.chatCardTextBot} ${TYPO.weightExtrabold}`,
  answerLabel: `${TYPO.sizeXs} ${TYPO.weightBold} uppercase tracking-[0.06em] text-black/45`,
  answer: `${TYPO.chatBubble} mt-1 text-black/65`,
  empty: `${TYPO.chatBubble} py-6 text-center text-black/45`,
  statusPill: `${TYPO.sizeXs} ${TYPO.weightBold} mt-1 inline-flex rounded-full px-2.5 py-0.5`,
  statusAnswered:
    "bg-[color-mix(in_srgb,var(--color-brand-primary)_16%,white)] text-[var(--color-brand-primary)]",
  statusPending: "bg-black/[0.06] text-black/55",
  sessionInner: "flex items-center gap-3 px-4 py-4 sm:px-5",
  astroMeta: "min-w-0 flex-1",
  astroName: `${TYPO.chatCardTextBot} ${TYPO.weightExtrabold}`,
  meetingBtn: CHAT_LAYOUT.consultActionBtn,
} as const;

export const ASK_SUMMARY_QUERY_ID = "id" as const;
