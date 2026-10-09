import { TYPO } from "@/lib/constants/typography";

export const MARATHON_HOME = {
  card: "group flex overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--color-brand-primary)_22%,white)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--color-home-screen-mint)_78%,white),white)] shadow-[0_8px_24px_rgb(16_24_16_/_0.06)]",
  stripe: "w-1.5 shrink-0 bg-[var(--color-brand-primary)]",
  body: "flex min-w-0 flex-1 flex-col gap-2.5 p-4 sm:p-5",
  head: "flex w-full min-w-0 items-center justify-between gap-3",
  title: `${TYPO.h3Bold} min-w-0 flex-1 text-[var(--color-brand-black)]`,
  timer: `${TYPO.labelSemibold} shrink-0 whitespace-nowrap text-right text-[var(--color-brand-primary)]`,
  sub: `${TYPO.chatCardTextBot} min-w-0 text-black/70`,
  event: `${TYPO.labelSemibold} text-[var(--color-brand-black)]`,
  cta: `inline-flex w-fit items-center rounded-full border border-[var(--color-brand-primary)] bg-white px-3 py-1 text-[var(--color-brand-primary)] ${TYPO.labelSemibold}`,
} as const;
