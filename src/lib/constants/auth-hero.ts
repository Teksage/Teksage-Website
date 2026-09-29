/** Login / OTP left-column hero — light mint, chat typography. */

import { TYPO } from "@/lib/constants/typography";

export const AUTH_HERO = {
  eyebrow: "Astrology guidance",
  title: "Teksage",
  description:
    "Personal astrology insights, expert consultations, and answers when you need them.",
  highlights: [
    {
      title: "Consult",
      detail: "Talk with professional astrologers for clarity",
    },
    {
      title: "Predict",
      detail: "Daily, weekly and life predictions tailored to you",
    },
    {
      title: "Ask",
      detail: "Get answers to your questions with 24x7 AI voice chat",
    },
  ] as const,
  logoWidthPx: 176,
  backAria: "Go back",
  asideClassName:
    "auth-hero auth-hero-enter relative hidden min-h-dvh w-[46%] shrink-0 overflow-hidden lg:flex lg:flex-col",
  contentClassName:
    "relative z-10 flex h-full flex-col justify-center p-10 xl:p-14",
  backButtonClassName:
    "mb-6 inline-flex size-10 items-center justify-center rounded-full border border-black/[0.06] bg-white text-[var(--color-brand-black)] shadow-[0_1px_6px_rgb(0_0_0_/_0.06)] transition-colors hover:bg-black/[0.02]",
  mobileBackButtonClassName:
    "absolute left-3 top-3 z-20 inline-flex size-10 items-center justify-center rounded-full border border-black/[0.06] bg-white text-[var(--color-brand-black)] shadow-[0_1px_6px_rgb(0_0_0_/_0.06)] transition-colors hover:bg-black/[0.02] lg:hidden sm:left-4 sm:top-4",
  logoClassName: "w-auto justify-start mb-5",
  bodyClassName: "auth-hero-enter max-w-md space-y-8",
  copyBlockClassName: "space-y-3 ",
  eyebrowClassName: `${TYPO.sizeXs} ${TYPO.weightBold} tracking-[0.14em] uppercase text-[var(--color-brand-primary)]`,
  titleClassName: `${TYPO.h1} ${TYPO.leadingTight} text-[var(--color-brand-black)] sm:${TYPO.size3xl}`,
  descriptionClassName: `${TYPO.chatBubble} text-black/65`,
  listClassName: "grid gap-3",
  chipClassName:
    "auth-hero-chip flex items-start gap-3 rounded-2xl border border-[var(--color-chat-bot-border)] bg-[var(--color-chat-bot-bubble)] px-4 py-3.5 shadow-[0_1px_6px_rgb(0_0_0_/_0.06)]",
  chipIndexClassName: `mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-brand-primary)_12%,white)] ${TYPO.sizeSm} ${TYPO.weightBold} text-[var(--color-brand-primary)]`,
  chipTitleClassName: `${TYPO.chatCardTextBot} ${TYPO.weightExtrabold}`,
  chipDetailClassName: `${TYPO.chatBubble} mt-0.5 text-black/55`,
  footerClassName: `relative ${TYPO.sizeXs} ${TYPO.weightMedium} text-black/45`,
} as const;
