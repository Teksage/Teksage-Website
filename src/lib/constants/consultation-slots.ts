import { TYPO } from "@/lib/constants/typography";

export const CONSULTATION_SLOTS_DAY_COUNT = 7 as const;
export const CONSULTATION_SLOTS_PREFETCH_DAY_COUNT = 30 as const;
export const CONSULTATION_SLOTS_SESSION_MINUTES = 30 as const;
export const CONSULTATION_SLOTS_PAGE_MAX = "max-w-[1280px]" as const;
/** Booking panels (date + time) — narrower so desktop keeps open space on the right. */
export const CONSULTATION_SLOTS_CONTENT_MAX = "max-w-[57rem]" as const;
/** Open slots below this use low-availability (gold) styling on the date strip. */
export const CONSULTATION_SLOTS_LOW_OPEN_COUNT = 3 as const;

export const CONSULTATION_SLOTS_SCREEN = {
  pickDate: "Pick a date",
  timesInIST: "times shown in IST",
  chooseTime: "Choose a time",
  slotsOpen: "slots open",
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  slotsEmpty: "No slots available for this day",
  slotPickError: "Please select a time slot to continue",
  bookCta: "Continue to details",
  full: "Full",
  noSlotsDay: "No slots",
  checkLater: "Check later",
  slotsSuffix: "slots",
  slotsLoading: "…",
  sessionMinutes: "30 min",
  perSessionSuffix: "/ 30 min",
  weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const,
  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ] as const,
  yourSelection: "Your selection",
  totalInclGst: "Total incl. GST",
  stepAstrologer: "Astrologer",
  stepSchedule: "Schedule",
  stepDetails: "Details",
  stepNumSchedule: "2",
  stepNumDetails: "3",
  defaultTitle: "Book Consultation",
  scrollDatesBack: "Scroll dates back",
  scrollDatesForward: "Scroll dates forward",
} as const;

export const CONSULTATION_SLOTS_LAYOUT = {
  page:
    "relative flex min-h-dvh flex-col pb-[var(--main-bottom-nav-clearance)] chat-landing-surface lg:h-full lg:min-h-0 lg:pb-0",
  pageShell: `mx-auto w-full ${CONSULTATION_SLOTS_PAGE_MAX} px-3 sm:px-4 lg:px-5`,
  pageHeader:
    "relative z-30 w-full shrink-0 border-b border-[var(--color-chat-landing-header-border)] bg-[var(--color-chat-landing-bg)]",
  pageHeaderInner: `${CONSULTATION_SLOTS_PAGE_MAX} mx-auto flex w-full items-center gap-2.5 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3 lg:px-5`,
  backBtn:
    "flex size-8 shrink-0 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-[var(--color-brand-black)] shadow-[0_1px_2px_rgb(0_0_0_/0.04)] transition-colors hover:bg-black/[0.02] sm:size-9 sm:rounded-xl",
  headerProfile: "flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3",
  headerAvatarWrap:
    "relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-[color-mix(in_srgb,var(--color-chat-star)_35%,white)] bg-[color-mix(in_srgb,var(--color-chat-star)_14%,white)] sm:size-12",
  headerAvatarImage: "size-full object-cover",
  headerAvatarInitials: `${TYPO.sizeXs} sm:text-sm ${TYPO.weightBold} flex size-full items-center justify-center text-[color-mix(in_srgb,var(--color-chat-star)_75%,var(--color-brand-black))]`,
  headerMain: "min-w-0 flex-1",
  headerTitle: `${TYPO.sizeSm} ${TYPO.weightExtrabold} ${TYPO.leadingSnug} truncate text-[var(--color-brand-black)] sm:text-md sm:text-lg`,
  headerSub: `${TYPO.size2xs} sm:text-xs ${TYPO.weightMedium} mt-0.5 truncate text-black/50 sm:text-sm`,
  headerStar: "text-[var(--color-chat-star)]",
  stepRow: "hidden shrink-0 items-center gap-5 md:flex lg:gap-6",
  stepItem: "flex items-center gap-2",
  stepBadge:
    "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
  stepBadgeDone:
    "bg-[color-mix(in_srgb,var(--color-brand-primary)_16%,white)] text-[var(--color-brand-primary)]",
  stepBadgeActive: "bg-[var(--color-brand-primary)] text-white",
  stepBadgeIdle: "bg-black/15 text-white",
  stepLabelDone: `${TYPO.sizeSm} ${TYPO.weightMedium} text-black/40`,
  stepLabelActive: `${TYPO.sizeSm} ${TYPO.weightBold} text-[var(--color-brand-black)]`,
  stepLabelIdle: `${TYPO.sizeSm} ${TYPO.weightMedium} text-black/40`,

  scroll: `min-h-0 flex-1 overflow-y-auto pb-4 pt-3 sm:pt-4`,
  inner: `flex w-full flex-col gap-3 sm:gap-4 ${CONSULTATION_SLOTS_PAGE_MAX} mx-auto px-3 sm:px-4 lg:px-5`,
  contentColumn: `flex w-full flex-col gap-3 sm:gap-4 lg:max-w-[57rem]`,

  panelCard:
    "w-full rounded-2xl border border-black/[0.06] bg-white p-3.5 shadow-[0_4px_18px_rgb(0_0_0_/0.06)] sm:p-5",
  dateStripHead: "mb-3 flex items-start justify-between gap-3 sm:mb-4",
  dateStripHeadMain: "min-w-0",
  dateStripTitle: `${TYPO.sizeSm} ${TYPO.weightExtrabold} text-[var(--color-brand-black)] sm:text-base`,
  dateStripHint: `mt-0.5 ${TYPO.size2xs} sm:text-xs ${TYPO.weightMedium} text-black/40 sm:mt-1 sm:text-sm`,
  dateStripNavRow: "flex shrink-0 items-center gap-1 pt-0.5 sm:gap-1.5",
  dateStripNavBtn:
    "flex size-7 shrink-0 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-sm text-black/45 transition-colors hover:bg-black/[0.03] hover:text-black/70 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white sm:size-8 sm:text-base",
  dateStrip:
    "flex w-full gap-2 sm:gap-2.5",
  dateCell:
    "flex min-h-[4.5rem] min-w-0 flex-1 cursor-pointer flex-col items-center justify-center rounded-xl border px-1 py-2 transition-all hover:border-[var(--color-brand-primary)]/35 sm:min-h-[5.25rem] sm:px-2 sm:py-2.5",
  dateCellSelected:
    "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] text-white shadow-[0_4px_12px_rgb(16_177_0_/0.28)] hover:border-[var(--color-brand-primary)]",
  dateCellDefault: "border-black/[0.08] bg-white text-[var(--color-brand-black)]",
  dateCellDisabled: "cursor-not-allowed hover:border-black/[0.08]",
  dateDayLabel: `${TYPO.size2xs} sm:text-xs ${TYPO.weightSemibold}`,
  dateDayLabelMuted: "text-black/35",
  dateDayLabelSelected: "text-white/90",
  dateDayLabelDefault: "text-black/50",
  dateDateNum: `mt-0.5 ${TYPO.sizeLg} ${TYPO.weightExtrabold} leading-none sm:mt-1 sm:text-xl`,
  dateDateNumMuted: "text-black/35",
  dateDateNumSelected: "text-white",
  dateSlotsLabel: `mt-1 ${TYPO.size2xs} sm:text-xs ${TYPO.weightBold} leading-tight sm:mt-1.5`,
  dateSlotsLabelSel: "text-white/90",
  dateSlotsLabelFull: "text-[var(--color-brand-error)]",
  dateSlotsLabelNone: "text-black/40",
  dateSlotsLabelCheckLater: "text-black/40",
  dateSlotsLabelAvail: "text-[var(--color-brand-primary)]",
  dateSlotsLabelLow: "text-[var(--color-chat-star)]",
  dateSlotsLabelLoading: "text-black/35",

  timeSectionHead: "mb-3 flex items-start justify-between gap-2 sm:mb-4 sm:gap-3",
  timeSectionTitle: `${TYPO.sizeSm} ${TYPO.weightExtrabold} leading-snug text-[var(--color-brand-black)] sm:text-base`,
  timeSectionCount: `${TYPO.sizeXs} ${TYPO.weightBold} shrink-0 text-[var(--color-brand-primary)] sm:text-sm`,
  timeGroup: "mb-4 last:mb-0 sm:mb-5",
  timeGroupLabel: `mb-2 ${TYPO.size2xs} sm:text-xs ${TYPO.weightBold} uppercase tracking-[0.14em] text-black/40 sm:mb-2.5`,
  slotGrid: "flex flex-wrap gap-2",
  slotChip: `group w-[5.25rem] cursor-pointer rounded-xl border border-black/[0.1] bg-white px-2 py-2 text-center ${TYPO.sizeXs} ${TYPO.weightBold} text-[var(--color-brand-black)] transition-colors hover:border-[var(--color-brand-primary)] hover:bg-[color-mix(in_srgb,var(--color-brand-primary)_10%,white)] hover:text-[var(--color-brand-primary)] sm:w-[5.75rem] sm:text-sm`,
  slotChipDuration: `mt-0.5 block ${TYPO.size2xs} sm:text-xs ${TYPO.weightSemibold} text-black/65 transition-colors group-hover:text-[var(--color-brand-primary)]`,
  slotChipDurationSel: "text-white/90 group-hover:text-white/90",
  slotChipSelected:
    "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] text-white shadow-[0_3px_10px_rgb(16_177_0_/0.22)] hover:border-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white",
  slotChipBooked:
    "cursor-not-allowed border-[var(--color-brand-error)]/20 text-[var(--color-brand-error)]/45 hover:border-[var(--color-brand-error)]/20 hover:bg-white hover:text-[var(--color-brand-error)]/45",
  slotsEmpty: `py-8 text-center ${TYPO.sizeSm} ${TYPO.weightMedium} text-black/40`,

  footer:
    "relative z-20 mt-auto shrink-0 border-t border-black/[0.06] bg-white/95 backdrop-blur-md",
  footerInner: `${CONSULTATION_SLOTS_PAGE_MAX} mx-auto px-3 pt-2.5 pb-2 sm:px-4 sm:pt-3 lg:px-5 lg:pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]`,
  footerRow: "flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-end sm:gap-3",
  footerSelection:
    "flex w-full min-w-0 items-start justify-between gap-3 sm:mr-auto sm:flex-1 sm:items-center sm:justify-start sm:gap-8",
  footerSelBlock: "min-w-0 flex-1 pr-2 sm:flex-none sm:pr-0",
  footerSelLabel: `${TYPO.size2xs} sm:text-xs ${TYPO.weightSemibold} text-black/50`,
  footerSelValue: `${TYPO.sizeXs} ${TYPO.weightBold} leading-snug text-[var(--color-brand-black)] sm:text-sm`,
  footerTotalWrap: "shrink-0 text-right sm:text-left",
  footerTotal: `${TYPO.sizeSm} ${TYPO.weightExtrabold} text-[var(--color-brand-black)] sm:text-base`,
  footerBtn:
    "ml-auto w-auto shrink-0 rounded-xl bg-[var(--color-brand-primary)] px-5 py-2.5 text-center text-sm font-extrabold text-white shadow-[0_6px_18px_rgb(16_177_0_/0.22)] transition-opacity hover:opacity-90 disabled:opacity-40 sm:min-w-[220px] sm:px-8 sm:py-3 sm:text-base",
  pickError: `text-right ${TYPO.size2xs} sm:text-xs ${TYPO.weightMedium} text-[var(--color-brand-error)]`,

  loaderBox: "flex justify-center py-16",
} as const;
