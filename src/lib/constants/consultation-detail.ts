import { DAILY_PREDICTION_ASSETS } from "@/lib/constants/assets";

const flutterSvg = (file: string) => `/flutter-assets/svg/${file}` as const;
const flutterImage = (file: string) => `/flutter-assets/images/${file}` as const;

export const CONSULTATION_DETAIL_SCREEN = {
  appBarTitle: "Astrologer Profile",
  experienceLabel: "Years of Experience",
  experienceYears: "years",
  perSession: "/ 30 min",
  reviewsTitle: "Reviews",
  noReviews: "No reviews available",
  bookCta: "Book Consultation",
} as const;

export const CONSULTATION_DETAIL_ASSETS = {
  appBarBack: DAILY_PREDICTION_ASSETS.appBarBack,
  languageIcon: flutterSvg("languageIcon.svg"),
  dashedLine: flutterSvg("astroDashedLine.svg"),
  workIcon: flutterSvg("astroWork.svg"),
  ratingLine: flutterSvg("astroRatingLine.svg"),
  ratingStar: flutterSvg("ratingSelect.svg"),
  ratingStarEmpty: flutterSvg("ratingUnselect.svg"),
  dummyAvatar: flutterImage("dummyImage.png"),
  reviewPerson: flutterSvg("person.svg"),
} as const;

export const CONSULTATION_DETAIL_LAYOUT = {
  /** Bleed through `main` bottom-nav padding so no white strip shows. */
  page:
    "flex min-h-dvh flex-col bg-[var(--color-consult-user-bg)] -mb-[var(--main-bottom-nav-clearance)] pb-[var(--main-bottom-nav-clearance)]",
  header:
    "sticky top-0 z-40 border-none bg-[var(--color-consult-user-bg)] [&_h1]:text-white",
  scroll: "flex-1 px-5 pb-4 pt-2 lg:px-8",
  contentColumn: "mx-auto w-full max-w-[26rem] sm:max-w-md lg:max-w-lg",
  footerWrap: "shrink-0 px-5 pb-2 pt-1 lg:px-8",
  profileCard:
    "relative mt-16 rounded-xl bg-white px-5 pb-6 pt-[4.75rem] text-center shadow-sm lg:mt-20 lg:rounded-2xl lg:px-8 lg:pb-8",
  avatarWrap:
    "absolute left-1/2 top-0 size-[120px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-neutral-200",
  name: "text-2xl font-semibold text-[var(--color-brand-black)]",
  langRow: "mt-2.5 flex items-center justify-center gap-2.5",
  langText: "text-sm font-semibold text-[var(--color-brand-black)]/50",
  dashed: "mx-auto my-3 block h-px w-full max-w-[280px] opacity-80",
  priceMain: "text-[2rem] font-semibold leading-none text-[var(--color-consult-user-text)]",
  priceSuffix: "text-sm font-semibold text-[var(--color-brand-black)]/30",
  expRow: "flex items-center justify-center gap-2.5",
  expText: "text-base font-semibold text-[var(--color-brand-black)]/40",
  expertiseBar:
    "mt-2.5 rounded-xl bg-white px-5 py-2.5 text-center text-sm font-medium text-[var(--color-brand-black)] lg:mt-3 lg:rounded-2xl lg:px-6 lg:py-3 lg:text-base",
  expertiseSep: "mx-2.5 inline-block h-4 w-px align-middle bg-[var(--color-brand-black)]/30",
  reviewsHeading: "mt-4 text-center text-lg font-semibold text-white lg:mt-6 lg:text-xl",
  reviewsCard: "mt-2.5 rounded-xl bg-white p-4 lg:mt-3 lg:rounded-2xl lg:p-5",
  reviewRow: "flex items-center gap-3",
  reviewAvatar:
    "flex size-11 shrink-0 items-center justify-center rounded-full border-[1.4px] border-[#7DA111] bg-neutral-300",
  reviewName: "text-base font-semibold text-[var(--color-brand-black)]",
  reviewStars: "mt-1 flex gap-0.5",
  reviewScore: "flex shrink-0 items-center gap-1 text-base font-semibold",
  reviewDivider: "my-3 block w-full opacity-80",
  footerBtn:
    "block w-full rounded-[30px] bg-white py-4 text-center text-lg font-semibold text-[var(--color-consult-user-bg)] lg:py-[1.125rem] lg:text-xl",
  loaderBox: "mx-auto mt-24 rounded-[20px] bg-white p-8",
} as const;
