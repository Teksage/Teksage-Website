/** Copy + layout tokens for previous Ask Astrologer Q&A (mirrors Question details). */

import { TYPO } from "@/lib/constants/typography";

export const ASK_PREVIOUS_QA_COPY = {
  previousConsultationsTitle: "Previous consultations",
  previousConsultationsSubtitle: "Tap to review past Q&A",
  previousConsultationsBadge: "Previous · {count}",
  previousReturningBadge: "Returning",
  previousAnsweredBy: "Answered by {name}",
  previousAnsweredByYou: "Answered by You",
  previousKindChat: "Chat",
  previousKindEventPlanner: "Event planner",
  previousQuestionLabel: "Question",
  previousAnswerLabel: "Answer",
  previousEventPlanLabel: "Event Plan (for reference)",
  previousShowMore: "Show more",
  previousShowLess: "Show less",
} as const;

export const ASK_PREVIOUS_QA_UI = {
  previousSection:
    "w-full overflow-hidden rounded-2xl border border-[var(--color-chat-bot-border)] bg-white shadow-[0_1px_6px_rgb(0_0_0_/_0.06)]",
  previousToggle:
    "flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-[color-mix(in_srgb,var(--color-home-screen-mint)_10%,white)] sm:px-6",
  previousHeaderBlock: "min-w-0",
  previousHeaderTitleRow: "flex flex-wrap items-center gap-2",
  sectionTitle:
    "text-nav font-bold uppercase tracking-[0.08em] text-[var(--color-brand-panchang)]",
  previousSubtitle: "mt-0.5 text-xs text-black/50",
  previousBadge:
    "inline-flex items-center rounded-full border border-[color-mix(in_srgb,var(--color-brand-primary)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-home-screen-mint)_22%,white)] px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-[var(--color-brand-primary)]",
  previousReturningBadge:
    "inline-flex items-center rounded-full bg-[var(--color-brand-primary)]/10 px-2.5 py-0.5 text-[11px] font-bold text-[var(--color-brand-primary)]",
  previousList: "space-y-6 border-t border-black/5 px-5 py-5 sm:px-6",
  previousItem: "space-y-3",
  previousMeta: "flex flex-wrap items-center gap-2 pl-11",
  previousDate: `${TYPO.sizeXs} font-medium text-black/45`,
  previousKindChip:
    "inline-flex items-center rounded-full bg-[color-mix(in_srgb,var(--color-home-screen-mint)_20%,white)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--color-brand-primary)]",
  previousAnsweredBy: `${TYPO.sizeXs} font-semibold text-black/55`,
  userRow: "flex w-full items-start justify-end gap-2.5",
  userBubble:
    "max-w-[min(90%,34rem)] rounded-2xl bg-[var(--color-chat-user-bubble)] px-4 py-3 shadow-[0_2px_10px_rgb(16_177_0_/_0.16)]",
  userBubbleText:
    "whitespace-pre-wrap break-words text-body-sm font-bold leading-relaxed text-white",
  userAvatar:
    "flex size-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-[var(--color-chat-user-avatar-bg)] text-xs font-bold text-[var(--color-chat-user-avatar-text)]",
  answerRow: "flex w-full items-start justify-start gap-2.5",
  botLogo: "mr-0.5 mt-0.5 size-9 shrink-0 self-start",
  answerCard:
    "max-w-[min(90%,34rem)] space-y-2.5 rounded-2xl border border-[var(--color-chat-bot-border)] bg-white px-4 py-3.5 shadow-[0_1px_6px_rgb(0_0_0_/_0.06)]",
  answerLabel:
    "text-xs font-bold uppercase tracking-wider text-[var(--color-brand-panchang)]",
  answerBody:
    "whitespace-pre-wrap break-words text-body-sm font-medium leading-relaxed text-[var(--color-brand-black)]",
  previousExpandBtn:
    "mt-1.5 text-xs font-semibold text-white/90 underline underline-offset-2 hover:opacity-80",
} as const;
