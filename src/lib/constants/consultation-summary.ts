import { TYPO } from "@/lib/constants/typography";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";

const chatCard =
  `${TYPO.chatCardTextBot} w-full overflow-hidden rounded-2xl border border-[var(--color-chat-bot-border)] bg-[var(--color-chat-bot-bubble)] shadow-[0_1px_6px_rgb(0_0_0_/_0.06)]` as const;

/** Booking Details — chat conversation surface + bot-card panels. */
export const CONSULTATION_SUMMARY_SCREEN = {
  subtitle: "Review your session details and astrologer answers.",
  subtitleCompleted: "Your completed consultation details and answers.",
  statusCompleted: "Completed",
  statusUpcoming: "Upcoming",
  answerLabel: "Answer",
  queriesLoading: "Loading your queries…",
} as const;

export const CONSULTATION_SUMMARY_LAYOUT = {
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

  sessionCard: chatCard,
  sessionInner: "flex items-center gap-3 px-4 py-4 sm:px-5",
  astroAvatar:
    "flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--color-chat-bot-border)] bg-[var(--color-home-screen-mint)]/50",
  astroAvatarImg: "size-full object-cover",
  astroAvatarInitials: `${TYPO.sizeBodySm} ${TYPO.weightBold} text-[var(--color-brand-primary)]`,
  astroMeta: "min-w-0 flex-1",
  astroName: `${TYPO.chatCardTextBot} ${TYPO.weightExtrabold}`,
  statusPill: `${TYPO.sizeXs} ${TYPO.weightBold} mt-1 inline-flex rounded-full px-2.5 py-0.5`,
  statusCompleted:
    "bg-[color-mix(in_srgb,var(--color-brand-primary)_16%,white)] text-[var(--color-brand-primary)]",
  statusUpcoming: "bg-black/[0.06] text-black/55",
  meetingBtn: CHAT_LAYOUT.consultActionBtn,
  meetingPending: `${TYPO.chatBubble} shrink-0 text-black/45`,

  detailsCard: `${chatCard} px-0 py-0`,
  sectionTitle: `${TYPO.h3Bold} border-b border-black/[0.05] bg-[var(--color-home-screen-mint)]/35 px-4 py-3 sm:px-5`,
  detailList: "flex w-full flex-col",
  detailRow:
    "flex w-full items-start justify-between gap-4 border-b border-black/[0.05] px-4 py-3.5 last:border-b-0 sm:px-5",
  detailLabel: `${TYPO.chatBubble} shrink-0 text-black/50`,
  detailValue: `${TYPO.chatCardTextBot} min-w-0 flex-1 text-right`,

  queriesCard: `${chatCard} px-0 py-0`,
  queriesBody: "px-4 py-4 sm:px-5 sm:py-5",
  addQueryBtn: `${CHAT_LAYOUT.consultActionBtn} mb-4 w-full py-2.5`,
  queryList: "flex w-full flex-col gap-3",
  queryCard:
    "w-full space-y-2 rounded-2xl border border-[var(--color-chat-bot-border)] bg-white/70 px-4 py-3",
  queryQuestion: `${TYPO.chatCardTextBot} ${TYPO.weightExtrabold}`,
  queryAnswerLabel: `${TYPO.sizeXs} ${TYPO.weightBold} uppercase tracking-[0.06em] text-black/45`,
  queryAnswer: `${TYPO.chatBubble} text-black/65`,
  empty: `${TYPO.chatBubble} py-6 text-center text-black/45`,
  loadingText: `${TYPO.chatBubble} py-6 text-center text-black/45`,
} as const;
