import { TYPO } from "./typography";

export const ASTROCONNECT_POPUP_COPY = {
  badge: "AstroConnect Pro",
  stuck: "Stuck in\nyour {category}?",
  next: "Not sure\nwhat's {word}?",
  nextWord: "Next",
  bring:
    "We're bringing together expert astrologers specialising in {category} guidance – all in one place, just for you.",
  whatYouGet: "WHAT YOU GET",
  oneOnOne: "Exclusive 15-min one-on-one",
  online: "Online — join from anywhere",
  limited: "Limited slots available",
  date: "DATE",
  time: "TIME",
  book: "Book your session",
  close: "Close",
} as const;

/** Spoken label for the popup headline and the “specialising in …” line. */
const POPUP_CATEGORY_PHRASE: Record<string, string> = {
  "Marriage & Relationships": "marriage and relationship",
};

export function popupCategoryLine(
  categories: string[],
  translate: (value: string) => string
): string {
  const names = categories.filter((name) => name && name !== "All");
  const chosen = names.length ? names : ["Career"];
  return chosen.map((name) => translate(POPUP_CATEGORY_PHRASE[name] ?? name)).join(" and ");
}

export const ASTROCONNECT_POPUP_UI = {
  overlay: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6",
  backdrop: "absolute inset-0 bg-black/75 backdrop-blur-md",
  panel:
    "relative z-10 flex max-h-[88dvh] w-full max-w-4xl flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-xl md:min-h-[26rem] md:flex-row",
  close:
    "absolute right-3 top-3 z-20 flex size-9 cursor-pointer items-center justify-center text-[var(--color-brand-black)]/80",
  closeIcon: "size-6",
  art: "relative h-[20rem] w-full shrink-0 sm:h-[22rem] md:h-auto md:w-[47%]",
  imageWrap: "absolute inset-0",
  image: "size-full object-cover object-[72%_center]",
  scrimTop:
    "pointer-events-none absolute inset-y-0 left-0 w-[82%] bg-gradient-to-r from-white via-white/80 to-transparent",
  scrimBottom:
    "pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/80 via-black/55 to-transparent",
  artCopy: "absolute inset-0 z-10 flex flex-col justify-between px-5 py-5 sm:px-7 sm:py-6",
  artTop: "flex flex-col gap-4",
  headlines: "flex max-w-[16rem] flex-col",
  badge:
    `inline-flex w-fit rounded-full border border-[var(--color-brand-black)]/20 bg-white px-3 py-1 ${TYPO.caption} text-[var(--color-brand-black)]`,
  headline: `${TYPO.size2xl} ${TYPO.weightBold} ${TYPO.leadingTight} whitespace-pre-line text-[var(--color-brand-black)]`,
  accent: "font-bold italic text-[var(--color-brand-primary)]",
  body: `max-w-[18rem] ${TYPO.sizeBase} ${TYPO.weightMedium} ${TYPO.leadingSnug} text-white`,
  bodyStrong: `${TYPO.weightBold} text-white`,
  details: "flex min-h-0 flex-1 flex-col justify-start overflow-y-auto px-4 py-4 sm:px-6 md:justify-center md:px-7 md:py-6",
  kicker: `${TYPO.caption} tracking-[0.14em] text-[var(--color-brand-primary)]`,
  perks: "mt-3 flex flex-col gap-2.5 md:mt-5 md:gap-3.5",
  perk: `flex items-center gap-3 ${TYPO.label} text-[var(--color-brand-black)]`,
  perkIcon:
    "flex size-9 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-brand-primary)_14%,white)] text-[var(--color-brand-primary)]",
  perkIconWarm:
    "flex size-9 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-muhurtha-card-accent)_22%,white)] text-[var(--color-muhurtha-rating-good)]",
  when: "mt-3 grid grid-cols-2 gap-2.5 md:mt-5 md:gap-3",
  whenCard: "flex items-center gap-2.5 rounded-2xl border border-[var(--color-brand-black)]/10 px-3 py-3",
  whenIcon:
    "flex size-8 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-brand-primary)_14%,white)] text-[var(--color-brand-primary)]",
  whenLabel: `${TYPO.badge2xs} uppercase tracking-wide text-[var(--color-brand-black)]/40`,
  whenValue: `mt-0.5 ${TYPO.labelSemibold} text-[var(--color-brand-black)]`,
  cta:
    `mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-5 py-3 ${TYPO.bodySemibold} text-white md:mt-6 md:py-3.5`,
} as const;
