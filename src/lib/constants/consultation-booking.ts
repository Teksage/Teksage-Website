import { CONSULTATION_SLOTS_ASSETS } from "@/lib/constants/consultation-slots";

const flutterSvg = (file: string) => `/flutter-assets/svg/${file}` as const;

export const CONSULTATION_BOOKING_SCREEN = {
  title: "Booking Details",
  consultationSection: "Consultation details",
  personalSection: "Personal details",
  date: "Date",
  time: "Time",
  consultingOn: "Consulting on",
  language: "Language",
  consultationFee: "Consultation fee",
  totalFee: "Total Fee",
  dob: "Date of Birth",
  tob: "Time of Birth",
  pob: "Place of Birth",
  rasi: "Rasi",
  nakshatram: "Nakshatram",
  shareHoroscope:
    "I consent to share my personal information & horoscope with the astrologer.",
  meetingLinkPending: "Meeting link is being prepared…",
  payCta: "Confirm & Proceed to Pay",
  meetingLink: "Meeting Link",
  queriesTitle: "Queries you asked",
  addQueryCta: "Add Another Query +",
  noQueries: "No questions found",
  queryDialogTitle: "Write your consultation query here",
  queryPlaceholder: "Enter your question here...",
  queryMaxHint: "You can add maximum 5 queries",
  queryRequiredNote: "* All questions are required to help us serve you better.",
  queryEmpty: "Question cannot be empty",
  querySavedMailFailed:
    "Your question was saved. Email to the astrologer failed because horoscope data is missing on this booking — see steps below.",
  queryPrevious: "Previous",
  queryNext: "Next",
  querySubmit: "Submit",
} as const;

export const CONSULTATION_BOOKING_ASSETS = {
  dashedLine: CONSULTATION_SLOTS_ASSETS.calendarLine,
  queryIcon: flutterSvg("questions.svg"),
  dummyAvatar: "/flutter-assets/images/dummyImage.png",
} as const;

export const CONSULTATION_BOOKING_LAYOUT = {
  profileWrap: "flex flex-col items-center pt-2",
  avatar:
    "size-20 overflow-hidden rounded-full bg-neutral-200 object-cover lg:size-[5.5rem]",
  brandLogo: "size-20 object-contain lg:size-[5.5rem]",
  profileName: "mt-2 text-center text-2xl font-semibold text-[var(--color-brand-black)]",
  sectionTitle:
    "text-center text-sm font-semibold text-[var(--color-brand-black)]/60",
  dashed: "mx-auto my-4 block w-full max-w-[280px] opacity-20",
  detailRows: "space-y-1.5 px-1",
  detailRow: "flex gap-2 text-sm lg:text-base",
  detailLabel: "w-[42%] shrink-0 font-medium text-[var(--color-brand-black)]/50",
  detailValue: "min-w-0 flex-1 font-medium text-[var(--color-brand-black)]",
  grayCard: "rounded-xl bg-[#f3f3f3] p-5",
  profileChip:
    "mb-3 flex items-center justify-center gap-3 rounded-xl bg-[#f3f3f3] py-2.5",
  profileChipAvatar: "size-10 overflow-hidden rounded-full bg-neutral-200 object-cover",
  profileChipName: "text-base font-semibold text-[var(--color-brand-black)]",
  consentRow: "mt-4 flex items-start gap-2 text-sm text-[var(--color-brand-black)]/70",
  meetingBtn:
    "rounded-md border border-[#87AE0E] px-3.5 py-2 text-base font-semibold text-[#87AE0E]",
  queryCard:
    "rounded-lg border border-black/5 bg-[#f8f8f8] px-4 py-3 text-base font-semibold text-[var(--color-brand-black)]",
  addQueryBtn:
    "w-full rounded-lg bg-[var(--color-consult-user-bg)] py-3.5 text-center text-base font-semibold text-white",
  payBtn:
    "w-full rounded-[30px] bg-[var(--color-consult-user-bg)] py-4 text-center text-lg font-semibold text-white disabled:opacity-50",
  promoCard: "rounded-xl bg-[#f3f3f3] p-4",
  feeRow: "flex justify-between text-sm text-[var(--color-brand-black)]/80",
  feeTotalRow: "flex justify-between text-base font-semibold text-[var(--color-brand-black)]",
} as const;

export const CONSULTATION_QUERY_LIMIT = 5 as const;
