const flutterSvg = (file: string) => `/flutter-assets/svg/${file}` as const;

export const CONSULTATION_SLOTS_SCREEN = {
  availabilityTitle: "Showing Availability",
  slotsMetaSuffix: "Slots - 30 mins each",
  slotsEmpty: "No slots available",
  slotPickError: "Choose a preferred timing",
  bookCta: "Book Consultation",
  weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const,
} as const;

export const CONSULTATION_SLOTS_ASSETS = {
  calendarLine: flutterSvg("astroCalenderLine.svg"),
  calendarArrow: flutterSvg("astroCalenderArrow.svg"),
} as const;

export const CONSULTATION_SLOTS_LAYOUT = {
  page:
    "flex min-h-dvh flex-col bg-[var(--color-consult-user-bg)] -mb-[var(--main-bottom-nav-clearance)] pb-[var(--main-bottom-nav-clearance)]",
  header:
    "sticky top-0 z-40 border-none bg-[var(--color-consult-user-bg)] [&_h1]:text-white",
  scroll: "flex-1 px-5 pb-4 pt-2 lg:px-8",
  contentColumn: "mx-auto w-full max-w-[26rem] sm:max-w-md lg:max-w-lg",
  footerWrap: "shrink-0 px-5 pb-2 pt-1 lg:px-8",
  calendarLine: "mx-auto block w-full max-w-[280px] opacity-90",
  monthRow: "flex items-center justify-between py-2",
  monthLabel: "text-base font-semibold text-white",
  monthNavBtn: "flex size-10 items-center justify-center rounded-full",
  weekdayRow: "grid grid-cols-7 gap-1 py-2",
  weekday: "text-center text-base font-semibold text-white",
  dayGrid: "grid grid-cols-7 gap-1",
  dayCell:
    "flex h-10 items-center justify-center rounded-xl border border-white/50 text-base font-semibold transition-colors",
  dayCellSelected: "border-white bg-white text-[var(--color-consult-user-bg)]",
  dayCellDefault: "bg-[var(--color-consult-user-bg)] text-white",
  dayCellDisabled: "cursor-not-allowed opacity-40",
  availabilityCard: "mt-5 rounded-xl bg-white p-5 lg:rounded-2xl lg:p-6",
  availabilityHeader: "flex items-start justify-between gap-3",
  availabilityTitle: "text-base font-medium text-[var(--color-brand-black)]/70",
  availabilityMeta:
    "shrink-0 text-right text-sm-plus font-semibold text-[var(--color-consult-user-bg)]",
  cardDivider: "my-5 block w-full opacity-20",
  slotGrid:
    "scrollbar-hidden grid max-h-52 grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-3",
  slotChip:
    "rounded-xl border border-[var(--color-brand-black)]/10 px-2.5 py-2.5 text-center text-base font-medium text-[var(--color-brand-black)]/60 transition-colors",
  slotChipSelected:
    "border-[var(--color-consult-user-bg)] bg-[var(--color-consult-user-bg)] text-white",
  slotChipBooked: "border-[var(--color-brand-error)]/30 text-[var(--color-brand-error)]/50",
  emptyOnGreen: "mt-8 text-center text-base font-semibold text-white",
  pickError: "mt-3 text-sm font-medium text-[var(--color-brand-error)]",
  footerBtn:
    "block w-full rounded-[30px] bg-white py-4 text-center text-lg font-semibold text-[var(--color-consult-user-bg)] lg:py-[1.125rem] lg:text-xl",
  loaderBox: "flex justify-center py-12",
} as const;
