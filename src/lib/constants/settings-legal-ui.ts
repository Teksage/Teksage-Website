/**
 * Policy reading UI — chat conversation card + type, comfortable measure.
 */

import { TYPO } from "@/lib/constants/typography";

export const SETTINGS_LEGAL_COPY = {
  lastUpdatedPrefix: "Last updated:",
  emailPrefix: "By email:",
} as const;

export const SETTINGS_LEGAL_UI = {
  /** Full Settings panel width (`SETTINGS_LAYOUT.desktopPanel` / `lg:max-w-6xl`). */
  column: "flex w-full flex-col gap-4",
  stack: "flex flex-col gap-3",
  card: `${TYPO.chatCardTextBot} rounded-2xl border border-[var(--color-chat-bot-border)] bg-[var(--color-chat-bot-bubble)] px-5 py-4 shadow-[0_1px_6px_rgb(0_0_0_/_0.06)] sm:px-6 sm:py-5`,
  meta: `${TYPO.sizeXs} ${TYPO.weightMedium} text-black/45`,
  heading: `${TYPO.h3Bold} mb-3 text-[var(--color-brand-black)]`,
  subsection: "mb-4 last:mb-0",
  subsectionTitle: `${TYPO.bodySemibold} text-[var(--color-brand-black)]`,
  paragraph: `${TYPO.chatBubble} mt-2 text-[var(--color-brand-black)]/80`,
  bullets: `${TYPO.chatBubble} mb-4 list-disc space-y-2 pl-5 text-[var(--color-brand-black)]/80 last:mb-0`,
  contact: "mb-1",
  contactEmail: `${TYPO.weightSemibold} text-[var(--color-brand-primary)] underline-offset-2 hover:underline`,
} as const;
