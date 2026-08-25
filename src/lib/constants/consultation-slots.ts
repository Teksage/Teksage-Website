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
  stepSchedule: "2 Schedule",
  stepDetails: "3 Details",
  defaultTitle: "Book Consultation",
} as const;

export const CONSULTATION_SLOTS_LAYOUT = {
  page: "relative flex min-h-dvh flex-col chat-landing-surface",
  pageHeader:
    "relative z-30 w-full shrink-0 border-b border-[var(--color-chat-landing-header-border)] bg-[var(--color-chat-landing-bg)]",
  pageHeaderInner:
    "mx-auto flex w-full max-w-lg items-center gap-3 px-4 py-3 sm:px-6 lg:max-w-3xl lg:px-8",
  backBtn:
    "flex size-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-black/5",
  headerMain: "flex min-w-0 flex-1 flex-col",
  headerTitle: "text-base font-bold leading-snug text-[var(--color-brand-black)]",
  headerSub: "text-xs font-medium text-black/45",
  stepRow: "flex shrink-0 items-center gap-1",
  stepDone:
    "flex items-center gap-1 rounded-full bg-[var(--color-brand-primary)] px-2.5 py-1 text-xs font-bold text-white",
  stepActive:
    "rounded-full border-2 border-[var(--color-brand-primary)] px-2.5 py-0.5 text-xs font-bold text-[var(--color-brand-primary)]",
  stepIdle:
    "rounded-full border border-black/20 px-2.5 py-0.5 text-xs font-medium text-black/40",
  stepSep: "text-xs text-black/30",

  scroll: "flex-1 overflow-y-auto px-4 pb-32 pt-4 sm:px-6 lg:px-8",
  inner: "mx-auto w-full max-w-lg lg:max-w-3xl",

  dateStripSection: "mb-5",
  dateStripLabel: "mb-2 flex items-center justify-between",
  dateStripTitle: "text-base font-extrabold text-[var(--color-brand-black)]",
  dateStripHint: "text-xs font-medium text-black/40",
  dateStrip:
    "scrollbar-hidden -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8",
  dateCell:
    "flex w-[72px] shrink-0 flex-col items-center rounded-2xl border px-2 py-3 transition-all",
  dateCellSelected:
    "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] text-white shadow-[0_4px_12px_rgb(16_177_0_/0.28)]",
  dateCellDefault: "border-black/[0.08] bg-white text-[var(--color-brand-black)]",
  dateCellDisabled: "cursor-not-allowed opacity-35",
  dateDayLabel: "text-xs font-semibold",
  dateDateNum: "mt-0.5 text-xl font-extrabold leading-none",
  dateSlotsLabel: "mt-1 text-[10px] font-bold",
  dateSlotsLabelSel: "text-white/80",
  dateSlotsLabelFull: "text-[var(--color-brand-error)]/70",
  dateSlotsLabelAvail: "text-[var(--color-brand-primary)]",

  timeSectionTitle: "mb-3 text-base font-extrabold text-[var(--color-brand-black)]",
  timeSectionCount: "ml-2 text-sm font-bold text-[var(--color-brand-primary)]",
  timeGroup: "mb-5",
  timeGroupLabel: "mb-2 text-xs font-bold uppercase tracking-widest text-black/40",
  slotGrid: "flex flex-wrap gap-2",
  slotChip:
    "rounded-xl border border-black/10 px-4 py-2.5 text-sm font-medium text-[var(--color-brand-black)]/70 transition-all",
  slotChipSelected:
    "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] font-bold text-white shadow-[0_3px_10px_rgb(16_177_0_/0.22)]",
  slotChipBooked: "border-[var(--color-brand-error)]/20 text-[var(--color-brand-error)]/40",
  slotsEmpty: "py-6 text-center text-sm font-medium text-black/40",

  footer:
    "fixed bottom-0 left-0 right-0 z-20 border-t border-black/[0.06] bg-white/95 px-4 pb-4 pt-3 backdrop-blur-md sm:px-6 lg:px-8",
  footerInner: "mx-auto max-w-lg lg:max-w-3xl",
  footerSelection: "mb-2 flex items-center justify-between",
  footerSelLabel: "text-xs font-semibold text-black/50",
  footerSelValue: "text-sm font-bold text-[var(--color-brand-black)]",
  footerTotal: "text-sm font-extrabold text-[var(--color-brand-black)]",
  footerTotalWrap: "text-right",
  footerBtn:
    "mt-2 block w-full rounded-full bg-[var(--color-brand-primary)] py-3.5 text-center text-base font-extrabold text-white shadow-[0_6px_18px_rgb(16_177_0_/0.22)] transition-opacity hover:opacity-90 disabled:opacity-40",
  pickError: "mt-1 text-center text-xs font-medium text-[var(--color-brand-error)]",

  loaderBox: "flex justify-center py-20",
} as const;
