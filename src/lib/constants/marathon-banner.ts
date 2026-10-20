import { TYPO } from "@/lib/constants/typography";

export const MARATHON_BANNER_UI = {
  card: "h-full overflow-visible rounded-3xl border border-[var(--color-chat-bot-border)] border-l-4 border-l-[var(--color-brand-primary)] bg-white shadow-[0_8px_24px_rgb(16_24_16_/_0.06)]",
  top: "flex items-start gap-4 p-4 sm:p-5",
  copy: "flex min-w-0 flex-1 flex-col gap-2",
  titleRow: "flex flex-wrap items-start justify-between gap-2",
  meta: "mt-1 flex flex-col gap-1",
  time: `inline-flex items-center gap-1.5 text-[var(--color-brand-black)] ${TYPO.chatBubble}`,
  icon: "size-4 shrink-0 text-[var(--color-brand-primary)]",
  dateTile:
    "flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-0.5 rounded-2xl bg-[var(--color-brand-primary)] text-white shadow-[0_8px_18px_rgb(16_177_0_/_0.28)]",
  dateIcon: "size-4 text-white",
  dateDay: `${TYPO.chatCardText} text-white`,
  dateMonth: `${TYPO.chatBubble} uppercase tracking-wide text-white/90`,
  cardOpen: "relative z-20",
  foot: "flex flex-wrap items-center justify-end gap-2 border-t border-[var(--color-chat-bot-border)] px-4 py-3 sm:px-5",
  menuAnchor: "relative",
  menuOpen: "z-20",
  history: "absolute top-full right-0 z-30 mt-2 flex w-max max-w-full flex-col overflow-hidden rounded-2xl border border-[var(--color-chat-bot-border)] bg-white py-1 shadow-[0_8px_24px_rgb(16_24_16_/_0.08)]",
  historyRow: `whitespace-nowrap px-4 py-2 text-center text-[var(--color-brand-black)] hover:bg-[color-mix(in_srgb,var(--color-brand-primary)_8%,white)] ${TYPO.chatBubble}`,
  slotClosed: `${TYPO.caption} text-[var(--color-muhurtha-rating-good)]`,
  slotBooked: `${TYPO.caption} text-[var(--color-brand-error)]`,
  slotBoxClosed:
    "cursor-default border-[var(--color-muhurtha-status-good-ring)] border-l-[var(--color-muhurtha-rating-good)] hover:translate-y-0",
  slotBoxBooked:
    "cursor-default border-[color-mix(in_srgb,var(--color-brand-error)_35%,white)] border-l-[var(--color-brand-error)] hover:translate-y-0",
} as const;
