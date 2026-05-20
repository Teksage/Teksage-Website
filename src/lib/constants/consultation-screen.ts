import { DAILY_PREDICTION_ASSETS } from "@/lib/constants/assets";

const flutterSvg = (file: string) => `/flutter-assets/svg/${file}` as const;
const flutterImage = (file: string) => `/flutter-assets/images/${file}` as const;

/** Consultation flow — Flutter `userCategory.dart`, `userSelectLanguage.dart`. */
export const CONSULTATION_SCREEN = {
  appBarTitle: "Astrology Consultation",
  categoryHeading: "What do you\nneed guidance on?",
  categorySubtitle: "Select the categories and continue",
  categoryCta: "Continue",
  categoryError: "Kindly select one or more categories",
  languageHeading: "Choose your\npreferred language",
  languageSubtitle: "This will help us to match the best astrologer",
  languageFirst: "First Preference",
  languageSecond: "Second Preference",
  languagePlaceholder: "Select language",
  languageSubmit: "Submit",
  languageError: "Choose a preferred language to continue",
  languageFieldError: "Kindly select your preferred language",
  languageDuplicateError: "Second language must be different from first",
  languageSecondDisabledHint: "Please select the first language first",
  listingTitle: "Astrologers for you",
  topAstrologers: "Top matches",
  allAstrologers: "More astrologers",
  listingEmpty: "No astrologers match your preferences. Try different filters.",
  experienceYears: "yrs exp",
  matchLabel: "match",
  bookCta: "Book consultation",
  detailTitle: "Astrologer profile",
  reviewsTitle: "Reviews",
  noReviews: "No reviews yet",
  slotsTitle: "Select a slot",
  slotsDateLabel: "Date",
  slotsEmpty: "No slots available for this date",
  checkoutTitle: "Booking details",
  consultationFee: "Consultation fee",
  discount: "Discount",
  cgst: "CGST",
  sgst: "SGST",
  total: "Total",
  shareHoroscope: "Share my horoscope with the astrologer",
  shareHoroscopeRequired: "Please confirm horoscope sharing to continue",
  couponPlaceholder: "Promo code",
  applyCoupon: "Apply",
  payCta: "Confirm & pay",
  summaryTitle: "Booking confirmed",
  summaryHint:
    "Your consultation is scheduled. You can view it under My consultations in the app.",
  backHome: "Back to home",
  loginTitle: "Sign in to book",
  loginDescription: "Log in to browse astrologers and book a consultation.",
  loginCta: "Log in",
  loadError: "Something went wrong. Please try again.",
  astrologerHubTitle: "My consultations",
  astrologerHubHint:
    "Manage your consultation profile and schedule from the mobile app. Web scheduling for astrologers is coming soon.",
  astrologerHubCta: "View profile",
} as const;

export const CONSULTATION_CATEGORIES = [
  {
    id: "career",
    label: "Career",
    apiValue: "Career",
    image: flutterImage("categoryCareer.png"),
  },
  {
    id: "wealth",
    label: "Wealth",
    apiValue: "Wealth",
    image: flutterImage("categoryWealth.png"),
  },
  {
    id: "marriage",
    label: "Marriage & Relationships",
    apiValue: "Marriage & Relationships",
    image: flutterImage("categoryMarriage.png"),
  },
  {
    id: "health",
    label: "Health",
    apiValue: "Health",
    image: flutterImage("categoryBusiness.png"),
  },
  {
    id: "all",
    label: "All",
    apiValue: "All",
    image: flutterImage("categoryAll.png"),
  },
] as const;

export const CONSULTATION_ASSETS = {
  categoryTopDeco: flutterSvg("categoryTopDeco.svg"),
  categoryBottomDeco: flutterSvg("categoryBottomDeco.svg"),
  categoryLanguage: flutterImage("categoryLanguage.png"),
  dropDownArrow: flutterSvg("dropDownArrow.svg"),
  appBarBack: DAILY_PREDICTION_ASSETS.appBarBack,
} as const;

export const CONSULTATION_LAYOUT = {
  shell: "relative flex min-h-dvh flex-col bg-white",
  decoTop:
    "pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(42vh,320px)] w-full object-cover object-top",
  decoBottom:
    "pointer-events-none absolute inset-x-0 bottom-0 z-0 w-full object-bottom opacity-95",
  body: "relative z-10 flex min-h-0 flex-1 flex-col",
  scroll: "flex-1 overflow-y-auto px-5 pb-4 pt-1",
  footer: "relative z-10 shrink-0 space-y-2 px-5 pb-10 pt-2",
  pageHeading:
    "whitespace-pre-line text-[1.75rem] font-semibold leading-tight text-[var(--color-brand-black)]",
  pageSubtitle: "mt-3 text-base font-medium text-[var(--color-brand-black)]/60",
  chipWrap: "mt-12 flex flex-wrap gap-2.5",
  chip:
    "inline-flex items-center gap-2.5 rounded-[20px] border border-[var(--color-brand-black)]/12 bg-white px-5 py-[11px] text-lg font-semibold text-[var(--color-brand-black)]/60 transition-colors",
  chipSelected:
    "border-[var(--color-brand-banner)] bg-[var(--color-brand-banner)] text-white",
  chipIcon: "size-[18px] shrink-0 object-contain",
  flowCta:
    "w-full rounded-[30px] py-3.5 text-center text-lg font-semibold text-white transition-opacity",
  flowCtaActive: "bg-[var(--color-brand-banner)]",
  flowCtaInactive: "bg-[var(--color-brand-banner)]/50",
  langFieldLabel: "text-base font-medium text-[var(--color-brand-black)]/60",
  langField:
    "mt-1 flex w-full items-center justify-between rounded-full border border-[var(--color-brand-black)]/12 px-5 py-[11px]",
  langFieldEmpty: "bg-white",
  langFieldFilled: "bg-[var(--color-brand-banner)]",
  langFieldText: "truncate text-lg font-semibold",
  langFieldPlaceholder: "text-[var(--color-brand-black)]/60",
  langFieldValue: "text-white",
  langIcon: "mr-2.5 size-5 shrink-0 object-contain",
  /** Flutter language sheet list — ~50% viewport, scroll inside modal. */
  langList: "scrollbar-hidden min-h-0 flex-1 overflow-y-auto py-2",
  langListItem:
    "w-full px-5 py-3 text-left text-sm font-medium text-[var(--color-brand-black)] hover:bg-neutral-50",
  langModal:
    "flex w-full max-h-[50vh] max-w-[70%] flex-col overflow-hidden rounded-[20px] bg-white shadow-lg sm:max-w-sm",
  langModalTitle:
    "shrink-0 px-4 pb-2 pt-5 text-center text-base font-medium text-[var(--color-brand-black)]",
  card:
    "flex gap-3 rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-sm",
  matchBadge:
    "rounded-full bg-[var(--color-brand-primary)]/10 px-2 py-0.5 text-xs font-semibold text-[var(--color-brand-primary)]",
  footerCta:
    "mt-8 w-full rounded-full bg-[var(--color-brand-primary)] py-3 text-base font-semibold text-white disabled:opacity-50",
} as const;
