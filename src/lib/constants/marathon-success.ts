import { TYPO } from "@/lib/constants/typography";

export const MARATHON_SUCCESS = {
  stack: "mx-auto flex w-full min-w-0 max-w-4xl flex-col gap-5 pb-[var(--main-bottom-nav-clearance)] lg:pb-0",
  hero: "relative overflow-hidden rounded-3xl border border-[var(--color-chat-bot-border)] bg-white px-6 py-8 text-center shadow-[0_12px_32px_rgb(16_24_16_/_0.08)]",
  glow: "pointer-events-none absolute -top-16 left-1/2 size-48 -translate-x-1/2 rounded-full bg-[var(--color-chat-conversation-glow)] opacity-80 blur-3xl",
  badge: "relative mx-auto flex size-16 items-center justify-center rounded-full bg-[var(--color-brand-primary)] text-white shadow-[0_8px_20px_rgb(16_177_0_/_0.28)]",
  title: `${TYPO.h1Semibold} relative mt-4 text-[var(--color-brand-black)]`,
  event: `${TYPO.h3} relative mt-1 text-[var(--color-brand-primary)]`,
  chips: "relative mt-3 flex justify-center",
  note: `relative mt-5 rounded-2xl bg-[color-mix(in_srgb,var(--color-brand-primary)_10%,white)] px-4 py-3 text-left text-[var(--color-brand-black)] ${TYPO.chatCardTextBot}`,
  meet: `relative mt-5 inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-5 py-2.5 text-white shadow-[0_6px_16px_rgb(16_177_0_/_0.28)] ${TYPO.bodySemibold}`,
  card: "overflow-hidden rounded-3xl border border-[var(--color-chat-bot-border)] bg-white shadow-[0_8px_24px_rgb(16_24_16_/_0.06)]",
  cardHead: `bg-[color-mix(in_srgb,var(--color-brand-primary)_12%,white)] px-5 py-3 text-[var(--color-brand-black)] ${TYPO.h3}`,
  row: "flex items-center justify-between gap-3 border-b border-black/5 px-4 py-3.5 last:border-b-0 sm:gap-4 sm:px-5",
  label: `${TYPO.chatBubble} shrink-0 text-black/50`,
  value: `${TYPO.chatCardTextBot} min-w-0 text-right text-[var(--color-brand-black)]`,
  storeBar:
    "mint-glow-surface flex w-full min-w-0 flex-col items-stretch gap-3 rounded-3xl border border-[color-mix(in_srgb,var(--color-brand-primary)_16%,white)] px-4 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:px-6",
  storePrimary: `inline-flex w-full min-w-0 items-center justify-center gap-3 rounded-full bg-[var(--color-brand-primary)] px-5 py-2.5 text-center text-white sm:w-fit ${TYPO.bodySemibold}`,
  storeGhost: `inline-flex w-full min-w-0 items-center justify-center gap-3 rounded-full border border-[color-mix(in_srgb,var(--color-brand-primary)_35%,white)] bg-white/80 px-5 py-2.5 text-center text-[var(--color-brand-primary)] sm:w-fit ${TYPO.bodySemibold}`,
  storeIcon: "size-5 shrink-0",
} as const;
