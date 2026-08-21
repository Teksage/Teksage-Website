import { CONSULTATION_ASSETS } from "@/lib/constants/consultation-screen";
import { HOME_DASHBOARD_SIDEBAR_ASSETS } from "@/lib/constants/home-dashboard-sidebar";
import { NOTIFICATION_SENT_AT_FORMAT } from "@/lib/constants/notifications-screen";
import { TYPO } from "@/lib/constants/typography";

const flutterImage = (file: string) => `/flutter-assets/images/${file}` as const;

/** User consultation hub — website list redesign (mint glow + row cards). */
export const CONSULTATION_HOME_SCREEN = {
  appBarTitle: "Astrology Consultation",
  pageTitle: "Book Consultation",
  pageSubtitle: "All Languages · Spoken replies",
  headerIconAlt: "Book consultation",
  findConsultTitle: "Find & Consult Astrologers",
  findConsultCount: "100+ Astrologers",
  findConsultHint: "Explore and find your perfect match",
  tabAstrologer: "Astrologers",
  tabMeeting: "My Meetings",
  tabUpcoming: "Upcoming",
  tabCompleted: "Completed",
  emptyUpcoming: "You have no upcoming meetings at the moment.",
  emptyCompleted: "You have no completed meetings at the moment.",
  meetingWith: "Meeting with {name}",
  viewDetails: "View Details",
  meetingLink: "Meeting Link",
  queriesAnsweredBanner: "Astrologer submitted answers for your queries",
  topRatedBadge: "Top rated",
  reviewsLabel: "Reviews",
  viewAllReviews: "view all reviews",
  experienceLabel: "Experience",
  experienceYearsSuffix: "Yrs",
  bookCta: "Book",
  bookCtaArrow: ">",
  ratingFallback: "—",
} as const;

/** Show “Top rated” when `customer_rating` is at least this value. */
export const CONSULTATION_TOP_RATED_MIN = 4.5;

export const CONSULTATION_HOME_MEETING_DATE_FORMAT = NOTIFICATION_SENT_AT_FORMAT;

export const CONSULTATION_HOME_ASSETS = {
  appBarBack: CONSULTATION_ASSETS.appBarBack,
  dummyAvatar: "/flutter-assets/images/dummyImage.png",
  headerIcon: HOME_DASHBOARD_SIDEBAR_ASSETS.bookConsultation,
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

const mintCardShadow =
  "shadow-[0_4px_18px_rgb(0_0_0_/0.06)]";

export const CONSULTATION_HOME_LAYOUT = {
  /** White page + soft top glow — same language as chat landing (not full mint wash). */
  page: "relative flex min-h-dvh flex-col chat-landing-surface",
  /** Same white embed header as chat landing (`HomeChatEmbedHeader`). */
  pageHeader:
    "relative z-30 w-full shrink-0 border-b border-[var(--color-chat-landing-header-border)] bg-[var(--color-chat-landing-bg)]",
  pageHeaderInner:
    "mx-auto flex w-full max-w-lg items-center gap-3 px-4 py-3 sm:px-6 lg:max-w-6xl lg:px-8",
  headerIconWrap: "relative shrink-0",
  headerIcon:
    "flex size-10 items-center justify-center rounded-full bg-[var(--color-home-screen-mint)]",
  headerIconImage: "size-6 object-contain",
  headerOnlineDot:
    "absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-white bg-[var(--color-brand-primary)]",
  headerText: "min-w-0",
  pageTitle: `${TYPO.h3Bold} leading-snug text-[var(--color-brand-black)]`,
  pageSubtitle: `${TYPO.sizeBodySm} ${TYPO.weightMedium} ${TYPO.leadingRelaxed} text-black/55`,
  desktopPanel:
    "relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pb-10 pt-0 sm:px-6 lg:max-w-6xl lg:px-8 lg:pb-12",
  contentBody: "flex flex-1 flex-col pt-5 lg:pt-6",
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
  hubTabsWrap: "mb-5",
  meetingTabsWrap: "pb-3 pt-1",
  tabsWrap: "pb-3 pt-1",
  tabsRow: "flex flex-wrap items-center gap-2",
  astrologerList:
    "grid grid-cols-1 gap-4 pb-8 md:grid-cols-2 md:gap-5",
  astrologerGrid: "grid grid-cols-2 gap-x-5 gap-y-2.5 pb-10 pt-2 xl:grid-cols-3",
  /** Match chat landing try-asking tabs. */
  tab: `${TYPO.sizeBodySm} inline-flex items-center gap-2 rounded-full px-4 py-1.5 transition-colors`,
  tabActive: `${TYPO.weightBold} bg-[var(--color-brand-primary)] text-white`,
  tabInactive: `${TYPO.weightMedium} bg-transparent text-black/55 hover:text-[var(--color-brand-black)]`,
  tabInactiveOutlined:
    `${TYPO.weightSemibold} border border-[var(--color-brand-primary)]/35 bg-white text-[var(--color-brand-primary)]`,
  tabBadge:
    `flex size-5 items-center justify-center rounded-full ${TYPO.sizeXs} ${TYPO.weightSemibold} leading-none`,
  tabBadgeActive: "bg-white text-[var(--color-brand-primary)]",
  tabBadgeInactive: "bg-black/[0.08] text-black/50",
  tabBadgeOutlinedIdle: "bg-[var(--color-brand-primary)] text-white",
  body: "flex-1 pb-6",
  empty: `pt-12 text-center ${TYPO.chatBubble} text-black/50`,
  meetingCard: "mb-4 rounded-xl border border-black/[0.04] bg-white px-3 py-5",
  meetingCardCompleted: "border-black/[0.04] bg-white",
  meetingRow: "flex items-start gap-2",
  meetingAvatar:
    "size-[41px] shrink-0 overflow-hidden rounded-full border-[2.6px] border-[var(--color-consult-user-bg)]/30 bg-neutral-200",
  meetingName: `${TYPO.sizeBodySm} ${TYPO.weightMedium} ${TYPO.leadingRelaxed} text-[var(--color-brand-black)]/80`,
  meetingDate: `mt-1 ${TYPO.bodySemibold} text-[var(--color-brand-black)]`,
  answersBanner:
    `mt-3 rounded-[20px] bg-[#DDE8A9] py-2.5 text-center ${TYPO.chatBubble} text-[#4B5909]`,
  actionRow: "mt-3 flex flex-wrap items-center gap-2 ",
  actionBtn:
    `inline-flex shrink-0 items-center justify-center rounded-md border border-[#87AE0E] px-3 py-1.5 text-center ${TYPO.labelSemibold} text-[#87AE0E] transition-opacity hover:opacity-90`,
} as const;

export const CONSULTATION_HUB_ASTRO_CARD = {
  root: `consult-hub-card rounded-2xl border border-black/[0.06] bg-white px-4 py-4 ${mintCardShadow} will-change-transform transition-transform duration-200 ease-out hover:-translate-y-0.5`,
  headerRow: "flex items-start gap-3",
  avatarWrap: "relative shrink-0",
  avatar:
    "flex size-12 items-center justify-center overflow-hidden rounded-full border-2 border-[var(--color-brand-primary)]/35 bg-[color-mix(in_srgb,var(--color-brand-primary)_14%,white)]",
  avatarImage: "size-full object-cover",
  avatarInitials: `${TYPO.sizeBodySm} ${TYPO.weightBold} text-[var(--color-brand-primary)]`,
  onlineDot:
    "absolute bottom-0.5 right-0.5 size-2.5 rounded-full border-2 border-white bg-[var(--color-brand-primary)]",
  headerMain: "min-w-0 flex-1",
  nameRow: "flex min-w-0 items-center gap-1.5",
  /** Heavier than chat body — extrabold so names/stats/prices punch through. */
  name: `${TYPO.sizeBase} ${TYPO.weightExtrabold} ${TYPO.leadingSnug} truncate text-[var(--color-brand-black)]`,
  verifiedIcon: "size-4 shrink-0",
  verifiedBadge:
    "flex size-4 items-center justify-center rounded-full bg-[var(--color-brand-primary)] text-white",
  verifiedGlyph: `${TYPO.size3xs} ${TYPO.weightBold} leading-none`,
  langs: `${TYPO.sizeSm} ${TYPO.weightMedium} ${TYPO.leadingRelaxed} mt-0.5 truncate text-black/55`,
  topRated: `${TYPO.sizeSm} ${TYPO.weightBold} inline-flex shrink-0 items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--color-chat-star)_18%,white)] px-2 py-0.5 text-[var(--color-chat-star)]`,
  statsRow:
    "mt-4 grid grid-cols-2 divide-x divide-black/[0.08] rounded-xl bg-black/[0.03] px-1 py-3",
  statCell: "flex flex-col px-3",
  ratingValueRow: "flex items-center gap-1",
  star: `${TYPO.sizeBase} text-[var(--color-chat-star)]`,
  ratingValue: `${TYPO.sizeBase} ${TYPO.weightExtrabold} ${TYPO.leadingSnug} text-[var(--color-brand-black)]`,
  reviewsMeta: `${TYPO.sizeSm} ${TYPO.weightMedium} ${TYPO.leadingRelaxed} mt-0.5 text-black/55 transition-colors hover:text-[var(--color-brand-primary)]`,
  viewReviews: `${TYPO.sizeSm} ${TYPO.weightBold} ${TYPO.leadingRelaxed} mt-1 inline-flex text-[var(--color-brand-primary)] underline underline-offset-2 hover:opacity-80`,
  experienceValue: `${TYPO.sizeBase} ${TYPO.weightExtrabold} ${TYPO.leadingSnug} text-[var(--color-brand-black)]`,
  experienceLabel: `${TYPO.sizeSm} ${TYPO.weightMedium} ${TYPO.leadingRelaxed} mt-0.5 text-black/55`,
  footerRow: "mt-4 flex items-center justify-between gap-3",
  priceRow: "flex items-baseline gap-1",
  priceMain: `${TYPO.sizeBase} ${TYPO.weightExtrabold} ${TYPO.leadingSnug} text-[var(--color-brand-black)]`,
  priceSuffix: `${TYPO.sizeSm} ${TYPO.weightMedium} ${TYPO.leadingRelaxed} text-black/45`,
  bookBtn: `${TYPO.sizeBodySm} ${TYPO.weightExtrabold} inline-flex shrink-0 items-center gap-1 rounded-full border border-[var(--color-brand-primary)] bg-[color-mix(in_srgb,var(--color-brand-primary)_10%,white)] px-4 py-1.5 text-[var(--color-brand-primary)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-brand-primary)_16%,white)]`,
} as const;
