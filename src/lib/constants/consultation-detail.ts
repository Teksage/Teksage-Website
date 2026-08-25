import { TYPO } from "@/lib/constants/typography";

const flutterImage = (file: string) => `/flutter-assets/images/${file}` as const;

export const CONSULTATION_DETAIL_SCREEN = {
  breadcrumbParent: "Astrology Consultation",
  experienceLabel: "Experience",
  experienceYears: "yrs",
  perSession: "/ 30 min session",
  reviewsTitle: "Reviews",
  seeAll: "See all",
  noReviews: "No reviews yet",
  bookCta: "Book Consultation",
  seeAllSlots: "See all slots",
  aboutTitle: "About",
  consultsOnTitle: "Consults on",
  nextAvailable: "Next Available",
  today: "Today",
  noSlotsToday: "No slots available today",
  verified: "ID verified",
  topRated: "Top rated",
  consultationsLabel: "Consultations",
  reviewsLabel: "reviews",
  vedicTitle: "Vedic astrologer",
  speaksPrefix: "Speaks",
  consultedOn: "Consulted on",
  noAbout:
    "Vedic astrologer offering personalized guidance on life, career, and relationships. Sessions focus on clear timing, practical remedies, and a calm, structured reading of your chart.",
  defaultExpertiseDesc: "Personalized guidance tailored to your chart and life goals.",
  /** Default review body when API has no review text. */
  defaultReviewText:
    "The consultation was clear and practical. Timing guidance and remedies were easy to follow and gave me confidence for the decisions ahead.",
  defaultReviewAgo: "Recently",
} as const;

export const CONSULTATION_DETAIL_ASSETS = {
  dummyAvatar: flutterImage("dummyImage.png"),
} as const;

/** Soft mint-glow surface — typography aligned with consultation list (`CONSULTATION_HUB_ASTRO_CARD`). */
export const CONSULTATION_DETAIL_LAYOUT = {
  page:
    "relative flex min-h-dvh flex-1 flex-col chat-landing-surface -mb-[var(--main-bottom-nav-clearance)] pb-[var(--main-bottom-nav-clearance)] lg:-mb-8 lg:pb-8",
  pageHeader:
    "relative z-30 w-full shrink-0 border-b border-[var(--color-chat-landing-header-border)] bg-[var(--color-chat-landing-bg)]",
  pageHeaderInner:
    "mx-auto flex w-full max-w-[1280px] items-center gap-3 px-3 py-3 sm:px-4 lg:px-5",
  backBtn:
    "flex size-9 shrink-0 items-center justify-center rounded-xl border border-black/[0.1] bg-white text-[var(--color-brand-black)] shadow-[0_1px_2px_rgb(0_0_0_/0.05)] transition-colors hover:bg-black/[0.02]",
  breadcrumb: `${TYPO.sizeBodySm} ${TYPO.weightMedium} min-w-0 flex-1 truncate text-black/55`,
  breadcrumbName: `${TYPO.weightBold} text-[var(--color-brand-black)]`,
  scroll:
    "mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-4 px-3 pb-20 pt-4 sm:px-4 lg:flex-row lg:items-start lg:gap-5 lg:px-5 lg:pb-6 lg:pt-5",
  leftCol: "flex min-w-0 flex-1 flex-col gap-4",
  rightCol: "w-full shrink-0 lg:w-[360px] lg:self-start",

  // Profile card
  profileCard:
    "rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_4px_18px_rgb(0_0_0_/0.06)] sm:p-6",
  profileTop: "flex items-start gap-4",
  avatarWrap:
    "relative size-[72px] shrink-0 overflow-hidden rounded-full border-2 border-[var(--color-brand-primary)]/35 bg-[color-mix(in_srgb,var(--color-brand-primary)_14%,white)]",
  avatarImage: "size-full object-cover",
  avatarInitials: `flex size-full items-center justify-center ${TYPO.sizeXl} ${TYPO.weightBold} text-[var(--color-brand-primary)]`,
  profileMeta: "min-w-0 flex-1 pt-0.5",
  nameRow: "flex min-w-0 flex-wrap items-center gap-2",
  name: `${TYPO.sizeXl} sm:text-card-title ${TYPO.weightExtrabold} ${TYPO.leadingSnug} text-[var(--color-brand-black)]`,
  badgeVerified: `inline-flex h-6 items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--color-brand-primary)_14%,white)] px-2.5 ${TYPO.sizeXs} ${TYPO.weightBold} text-[var(--color-brand-primary)]`,
  badgeTopRated: `inline-flex h-6 items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--color-chat-star)_18%,white)] px-2.5 ${TYPO.sizeXs} ${TYPO.weightBold} text-[var(--color-chat-star)]`,
  subtitle: `${TYPO.sizeSm} ${TYPO.weightMedium} ${TYPO.leadingRelaxed} mt-1.5 text-black/55`,
  statsRow: "mt-4 flex flex-wrap items-start gap-x-8 gap-y-3 sm:gap-x-10",
  statCell: "flex shrink-0 flex-col items-start text-left",
  statValue: `${TYPO.sizeBase} ${TYPO.weightExtrabold} ${TYPO.leadingSnug} text-[var(--color-brand-black)]`,
  statLabel: `${TYPO.sizeSm} ${TYPO.weightMedium} ${TYPO.leadingRelaxed} mt-1.5 text-black/55`,
  starIcon: "text-[var(--color-chat-star)]",

  // About / Consults sections
  section:
    "rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_4px_18px_rgb(0_0_0_/0.06)] sm:p-6",
  sectionTitle: `${TYPO.sizeMd} ${TYPO.weightExtrabold} ${TYPO.leadingSnug} mb-3 text-[var(--color-brand-black)]`,
  aboutText: `${TYPO.sizeBodySm} ${TYPO.weightMedium} ${TYPO.leadingRelaxed} text-black/60`,

  // Consults on
  expertiseGrid: "grid grid-cols-1 gap-3 sm:grid-cols-2",
  expertiseCard:
    "rounded-xl border border-[var(--color-brand-primary)]/20 bg-[color-mix(in_srgb,var(--color-brand-primary)_8%,white)] p-4",
  expertiseCardInner: "flex items-start gap-2.5",
  expertiseDiamond:
    "mt-1.5 size-2 shrink-0 rotate-45 bg-[var(--color-brand-primary)]",
  expertiseCardTitle: `${TYPO.sizeSm} ${TYPO.weightBold} text-[var(--color-brand-black)]`,
  expertiseCardSub: `${TYPO.sizeXs} ${TYPO.weightMedium} ${TYPO.leadingRelaxed} mt-0.5 text-black/55`,

  // Reviews
  reviewsHeader: "mb-4 flex items-center justify-between gap-3",
  reviewsTitle: `${TYPO.sizeMd} ${TYPO.weightExtrabold} ${TYPO.leadingSnug} text-[var(--color-brand-black)]`,
  reviewsCount: `${TYPO.weightMedium} text-black/45`,
  reviewsSeeAll: `${TYPO.sizeSm} ${TYPO.weightBold} shrink-0 text-[var(--color-brand-primary)] hover:opacity-80`,
  reviewsEmpty: `${TYPO.sizeBodySm} ${TYPO.weightMedium} text-black/50`,
  ratingSummary: "flex items-center gap-5 sm:gap-8",
  ratingBigWrap: "flex w-[4.5rem] shrink-0 flex-col items-center justify-center text-center sm:w-20",
  ratingBig: `${TYPO.size2xlDisplay} ${TYPO.weightExtrabold} ${TYPO.leadingNone} text-[var(--color-brand-black)]`,
  ratingStars: `mt-2 flex justify-center gap-0.5 ${TYPO.sizeMd} leading-none text-[var(--color-chat-star)]`,
  ratingBarGrid: "min-w-0 flex-1 flex flex-col justify-center gap-1.5",
  ratingBarRow: `flex items-center gap-2 ${TYPO.sizeXs} ${TYPO.weightMedium} text-black/50`,
  ratingBarLabel: "w-3 shrink-0 text-right",
  ratingBar: "h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-black/[0.08]",
  ratingBarFill: "h-full rounded-full bg-[var(--color-brand-primary)]",
  ratingBarCount: "w-7 shrink-0 text-right tabular-nums text-black/45",
  reviewList: "mt-5 flex flex-col gap-3",
  reviewCard: "rounded-xl border border-black/[0.07] bg-white p-4",
  reviewCardTop: "flex items-start justify-between gap-2",
  reviewerRow: "flex items-center gap-2.5",
  reviewerInitial: `flex size-10 shrink-0 items-center justify-center rounded-full ${TYPO.sizeSm} ${TYPO.weightBold} text-white`,
  reviewerName: `${TYPO.sizeSm} ${TYPO.weightBold} text-[var(--color-brand-black)]`,
  reviewerStars: `mt-0.5 flex gap-px ${TYPO.sizeXs} text-[var(--color-chat-star)]`,
  reviewAgo: `${TYPO.sizeXs} ${TYPO.weightMedium} shrink-0 text-black/45`,
  reviewText: `${TYPO.sizeSm} ${TYPO.weightMedium} ${TYPO.leadingRelaxed} mt-3 text-black/60`,
  reviewTopic: `${TYPO.sizeXs} ${TYPO.weightMedium} mt-2.5 text-black/45`,

  // Sidebar pricing
  pricingCard:
    "rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_4px_18px_rgb(0_0_0_/0.06)]",
  priceRow: "flex items-baseline gap-1.5",
  priceMain: `${TYPO.size2xlDisplay} ${TYPO.weightExtrabold} ${TYPO.leadingNone} text-[var(--color-brand-black)]`,
  priceSuffix: `${TYPO.sizeSm} ${TYPO.weightMedium} text-black/45`,
  nextAvailRow: "mt-5 flex items-center justify-between gap-2",
  nextAvailLabel: `${TYPO.sizeXs} ${TYPO.weightBold} uppercase tracking-[0.08em] text-black/45`,
  nextAvailValue: `${TYPO.sizeSm} ${TYPO.weightBold} text-[var(--color-brand-primary)]`,
  nextAvailEmpty: `${TYPO.sizeSm} ${TYPO.weightMedium} text-black/45`,
  slotRow: "mt-3 grid grid-cols-3 gap-2",
  slotChip: `${TYPO.sizeXs} sm:text-sm ${TYPO.weightBold} cursor-pointer rounded-lg border border-black/[0.1] bg-white px-1.5 py-1.5 text-center text-[var(--color-brand-black)] transition-colors hover:border-[var(--color-brand-primary)] hover:bg-[color-mix(in_srgb,var(--color-brand-primary)_10%,white)] hover:text-[var(--color-brand-primary)]`,
  slotChipSelected:
    "border-[var(--color-brand-primary)] bg-[color-mix(in_srgb,var(--color-brand-primary)_12%,white)] text-[var(--color-brand-primary)] hover:border-[var(--color-brand-primary)] hover:bg-[color-mix(in_srgb,var(--color-brand-primary)_16%,white)] hover:text-[var(--color-brand-primary)]",
  seeAllBtn: `${TYPO.sizeBodySm} ${TYPO.weightExtrabold} mt-4 block w-full rounded-xl bg-[var(--color-brand-primary)] py-3.5 text-center text-white shadow-[0_6px_18px_rgb(16_177_0_/0.22)] transition-opacity hover:opacity-90`,

  footerBar:
    "sticky bottom-0 z-20 border-t border-black/[0.06] bg-[var(--color-chat-landing-bg)]/95 px-3 py-3 backdrop-blur-md sm:px-4 lg:hidden",
  footerBtn: `${TYPO.sizeBodySm} ${TYPO.weightExtrabold} block w-full rounded-xl bg-[var(--color-brand-primary)] py-3.5 text-center text-white shadow-[0_6px_18px_rgb(16_177_0_/0.22)]`,
} as const;

/** Display titles for expertise keys — reference-style names. */
export const CONSULTATION_EXPERTISE_TITLES: Record<string, string> = {
  career: "Career & business",
  business: "Career & business",
  marriage: "Marriage & relationships",
  relationships: "Marriage & relationships",
  relationship: "Relationship",
  wealth: "Wealth & property",
  property: "Wealth & property",
  finance: "Wealth & property",
  health: "Health & remedies",
  remedies: "Health & remedies",
  education: "Education",
  overseas: "Overseas & travel",
  numerology: "Numerology",
  compatibility: "Compatibility",
  family: "Family",
};

export const CONSULTATION_EXPERTISE_DESCRIPTIONS: Record<string, string> = {
  career: "Job change timing, promotions, partnerships",
  business: "Job change timing, promotions, partnerships",
  marriage: "Compatibility, timing, family friction",
  relationships: "Compatibility, timing, family friction",
  relationship: "Compatibility, timing, family friction",
  wealth: "Investments, land, loan decisions",
  property: "Investments, land, loan decisions",
  finance: "Investments, land, loan decisions",
  health: "Doshas, mantras, gemstone guidance",
  remedies: "Doshas, mantras, gemstone guidance",
  education: "Course timing, exam success",
  overseas: "Travel, settlement, visa timing",
  numerology: "Name correction, lucky numbers",
  compatibility: "Compatibility analysis",
  family: "Family harmony, parent-child",
};

/** Initials avatar Tailwind bg classes (cycled by index). */
export const CONSULTATION_REVIEW_AVATAR_BG = [
  "bg-[#5B7CFA]",
  "bg-[#E07A5F]",
  "bg-[var(--color-brand-primary)]",
  "bg-[#9B59B6]",
  "bg-[#3498DB]",
] as const;
