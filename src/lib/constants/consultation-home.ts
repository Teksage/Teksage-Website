import { CONSULTATION_ASSETS } from "@/lib/constants/consultation-screen";
import { NOTIFICATION_SENT_AT_FORMAT } from "@/lib/constants/notifications-screen";

const flutterImage = (file: string) => `/flutter-assets/images/${file}` as const;

/** User consultation hub — mirrors Flutter `userConsultationHomePage.dart`. */
export const CONSULTATION_HOME_SCREEN = {
  appBarTitle: "Astrology Consultation",
  findConsultTitle: "Find & Consult Astrologers",
  findConsultCount: "100+ Astrologers",
  findConsultHint: "Explore and find your perfect match",
  tabAstrologer: "Astrologer",
  tabMeeting: "Meeting",
  tabUpcoming: "Upcoming",
  tabCompleted: "Completed",
  emptyUpcoming: "You have no upcoming meetings at the moment.",
  emptyCompleted: "You have no completed meetings at the moment.",
  meetingWith: "Meeting with {name}",
  viewDetails: "View Details",
  meetingLink: "Meeting Link",
  queriesAnsweredBanner: "Astrologer submitted answers for your queries",
} as const;

export const CONSULTATION_HOME_MEETING_DATE_FORMAT = NOTIFICATION_SENT_AT_FORMAT;

export const CONSULTATION_HOME_ASSETS = {
  appBarBack: CONSULTATION_ASSETS.appBarBack,
  dummyAvatar: "/flutter-assets/images/dummyImage.png",
  astrologerStack: [
    flutterImage("astrologer1.png"),
    flutterImage("astrologer2.png"),
    flutterImage("astrologer3.png"),
    flutterImage("astrologer4.png"),
    flutterImage("astrologer5.png"),
  ],
} as const;

/** Mirrors Flutter `FindConsultCard` — 5 overlapping ~37px avatars in 80px width. */
export const CONSULTATION_HOME_AVATAR_STACK = {
  count: 5,
  widthPx: 80,
  offsetPx: 11,
  sizePx: 37,
} as const;

export const CONSULTATION_HOME_LAYOUT = {
  page: "flex min-h-dvh flex-col bg-white",
  header: "bg-[var(--color-consult-user-bg)] pb-5",
  appHeader:
    "border-none bg-transparent [&_h1]:text-white [&_button]:text-white [&_button_svg]:text-white",
  findOuter:
    "mx-4 mt-2 block rounded-xl bg-[var(--color-consult-filter-chip)] p-3 text-left transition-opacity hover:opacity-95",
  findTitleRow: "flex items-start justify-between gap-2 px-2",
  findTitle: "text-lg font-semibold leading-snug text-[#455c02]",
  findArrow: "size-5 shrink-0 rotate-180 text-[#455c02]",
  findInner:
    "mt-2 flex items-center gap-[9px] rounded-xl bg-[#D4E68D] px-2.5 py-2.5",
  avatarStack: "relative shrink-0 overflow-hidden",
  avatarStackItem: "absolute top-0 overflow-hidden rounded-full",
  findCount: "text-base font-semibold leading-snug text-[var(--color-brand-black)]",
  findHint: "text-sm font-medium leading-snug text-[var(--color-brand-black)]/60",
  hubTabsWrap: "sticky top-0 z-30 bg-white px-4 pb-2 pt-4",
  meetingTabsWrap: "bg-white px-4 pb-3 pt-2",
  tabsWrap: "sticky top-0 z-30 bg-white px-4 pb-3 pt-4",
  tabsRow: "flex items-center gap-2",
  astrologerGrid: "grid grid-cols-2 gap-x-5 gap-y-2.5 pb-10 pt-2 xl:grid-cols-3",
  tab:
    "inline-flex items-center gap-2.5 rounded-full px-3 py-1.5 text-base font-semibold transition-colors",
  tabActive: "bg-[var(--color-consult-user-bg)] text-white",
  tabInactive: "text-[var(--color-brand-black)]/50",
  tabBadge:
    "flex size-5 items-center justify-center rounded-full text-sm font-semibold leading-none",
  tabBadgeActive: "bg-white text-[var(--color-consult-user-bg)]",
  tabBadgeInactive: "bg-[var(--color-consult-user-bg)] text-white",
  body: "flex-1 px-4 pb-10",
  empty: "pt-12 text-center text-sm font-medium text-[var(--color-brand-black)]/50",
  meetingCard:
    "mb-4 rounded-xl border border-black/[0.04] bg-[#f8f8f8] px-3 py-5",
  meetingCardCompleted: "border-white bg-white",
  meetingRow: "flex items-start gap-2",
  meetingAvatar:
    "size-[41px] shrink-0 overflow-hidden rounded-full border-[2.6px] border-[var(--color-consult-user-bg)]/30 bg-neutral-200",
  meetingName: "text-sm font-medium text-[var(--color-brand-black)]/80",
  meetingDate: "mt-1 text-base font-semibold text-[var(--color-brand-black)]",
  answersBanner:
    "mt-3 rounded-[20px] bg-[#DDE8A9] py-2.5 text-center text-sm font-medium text-[#4B5909]",
  actionRow: "mt-3 flex gap-1.5",
  actionBtn:
    "flex-1 rounded-md border border-[#87AE0E] py-2 text-center text-base font-semibold text-[#87AE0E] transition-opacity hover:opacity-90",
} as const;
