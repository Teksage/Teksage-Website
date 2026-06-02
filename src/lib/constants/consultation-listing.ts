import { DAILY_PREDICTION_ASSETS } from "@/lib/constants/assets";

const flutterSvg = (file: string) => `/flutter-assets/svg/${file}` as const;
const flutterImage = (file: string) => `/flutter-assets/images/${file}` as const;

export const CONSULTATION_LISTING_SCREEN = {
  appBarTitle: "Astrologer Consultation",
  bookNow: "Book Now",
  matchSuffix: "Match",
  perSession: "/ 30 min",
} as const;

export const CONSULTATION_LISTING_ASSETS = {
  appBarBack: DAILY_PREDICTION_ASSETS.appBarBack,
  chipClose: flutterSvg("closeAstroUser.svg"),
  dummyAvatar: flutterImage("dummyImage.png"),
} as const;

export const CONSULTATION_LISTING_LAYOUT = {
  page: "min-h-dvh bg-white",
  header: "sticky top-0 z-40 border-none bg-[var(--color-consult-user-bg)] [&_h1]:text-white",
  hero: "bg-[var(--color-consult-user-bg)] px-5 pb-6 pt-1",
  heroBorder: "border-t border-white/20",
  heroTitle: "mt-5 whitespace-pre-line text-2xl font-semibold leading-tight text-white",
  chipRow: "scrollbar-hidden mt-4 flex gap-2.5 overflow-x-auto pb-1",
  chip:
    "inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--color-consult-filter-chip)] py-1.5 pl-3 pr-2 text-sm font-semibold text-white",
  carousel: "scrollbar-hidden -mx-1 mt-5 flex gap-2.5 overflow-x-auto pb-2 pl-1",
  dots: "mt-2 flex justify-center gap-2",
  dot: "size-2.5 rounded-full bg-white/30",
  dotActive: "bg-white",
  body: "px-5 pb-10 pt-6",
  otherTitle: "text-center text-base font-semibold text-[var(--color-brand-black)]/60",
  grid: "mt-5 grid grid-cols-1 gap-x-5 gap-y-2.5 sm:grid-cols-2 xl:grid-cols-3",
} as const;

export const CONSULTATION_ASTRO_CARD = {
  top:
    "flex w-[158px] shrink-0 flex-col justify-between rounded-2xl border border-[var(--color-brand-black)]/12 bg-white px-3.5 py-3",
  grid:
    "flex flex-col justify-between rounded-2xl border border-[var(--color-brand-black)]/12 bg-white px-3.5 py-3",
  matchRow: "flex items-center gap-1",
  matchBar: "h-1 w-[50px] overflow-hidden rounded-full bg-[var(--color-consult-match-track)]",
  matchFill: "h-full rounded-full bg-[var(--color-brand-primary)]",
  matchText: "text-xs font-semibold text-[var(--color-brand-primary)]",
  avatarWrap:
    "mx-auto flex size-[60px] items-center justify-center overflow-hidden rounded-full bg-[var(--color-consult-user-bg)]",
  name: "text-center text-base font-semibold text-[var(--color-brand-black)]",
  langs: "text-center text-xs font-semibold leading-snug text-[var(--color-brand-black)]/50",
  priceRow: "flex items-baseline justify-center gap-0.5",
  priceMain: "text-xl font-semibold text-[var(--color-consult-user-text)]",
  priceUnit: "text-lg font-semibold text-[var(--color-consult-user-text)]",
  priceSuffix: "text-sm font-semibold text-[var(--color-brand-black)]/30",
  bookBtn:
    "w-full rounded-full bg-[var(--color-brand-primary)] py-1.5 text-center text-sm font-semibold text-white",
} as const;
