import { TYPO } from "./typography";

/** Home dashboard typography — use in home feature components. */
export const HOME_DASHBOARD_UI = {
  dailyCardTitle: `text-center text-sm font-bold leading-tight text-white lg:text-base`,
  dailyCardDate: `text-center text-3xs font-semibold leading-tight text-white/75`,
  dailyHint: `py-0.5 text-center text-3xs font-semibold text-[var(--color-brand-primary)]`,
  dailyBalaValue: `text-micro font-semibold leading-none text-neutral-900`,
  dailyBalaLabel: `px-0.5 text-center text-3xs font-semibold leading-none text-[var(--color-brand-primary)]`,
  consultBannerRow:
    "relative z-10 flex w-full items-center gap-2 px-2 py-2 sm:gap-3 sm:px-3 sm:py-2.5",
  consultBannerPortraitWrap:
    "relative z-[1] flex shrink-0 justify-center self-end pt-2.5 pl-2 pb-0.5 sm:pt-3 sm:pl-3 sm:pb-1",
  consultBannerTitle: `min-w-0 flex-1 whitespace-pre-line text-left ${TYPO.consultBannerBody} text-[var(--color-brand-consultation-heading)]`,
  /** Pill CTA — allows multi-line labels (ta/hi/te/ml) via `whitespace-pre-line`. */
  consultBannerCta: `flex shrink-0 items-center justify-center self-center max-w-[6.25rem] min-h-[2.5rem] whitespace-pre-line rounded-full bg-white px-3 py-2 text-center ${TYPO.caption} leading-snug text-[var(--color-brand-banner-dark)] shadow-sm transition-opacity hover:opacity-90 sm:max-w-[7rem] sm:px-4 sm:py-2.5`,
  /** Extra vertical room when label is long or already has a line break. */
  consultBannerCtaTall:
    "min-h-[3.5rem] max-w-[7.25rem] py-3 leading-tight sm:min-h-[3.75rem] sm:max-w-[7.75rem] sm:py-3.5",
  consultBannerCtaTallCharThreshold: 12,
  exploreSectionTitle: `${TYPO.exploreTitle} text-[color:var(--color-home-dashboard-heading)]`,
  exploreCircleLabel: `${TYPO.exploreCircle} text-[color:var(--color-home-dashboard-heading)]`,
  headerGreeting: `truncate ${TYPO.h3Bold} ${TYPO.leadingTight} lg:text-xl text-[color:var(--color-home-dashboard-heading)]`,
  sidebarGreeting: `${TYPO.h3Bold} ${TYPO.leadingTight} text-[color:var(--color-home-dashboard-heading)]`,
  chatBannerTitle: `min-w-0 shrink whitespace-pre-line text-left ${TYPO.bannerCta} text-white lg:text-lg`,
  chatBannerCta: `${TYPO.bannerFine} text-[var(--color-brand-banner-font)]`,
  eventPlannerBannerRow: "flex w-full items-center justify-between gap-3",
  eventPlannerBannerCopy: "flex min-w-0 flex-1 flex-col items-start gap-1",
  eventPlannerBannerTitle: `min-w-0 text-left ${TYPO.labelSemibold} font-bold leading-snug text-neutral-500`,
  eventPlannerBannerCta: `${TYPO.caption} leading-snug text-neutral-500 transition-opacity group-hover:opacity-90`,
  eventPlannerBannerIcon: "inline-flex size-8 shrink-0 text-[var(--color-brand-primary)] sm:size-9",
  eventPlannerBannerCtaArrow: "inline-flex shrink-0",
  eventPlannerCardTitle: `whitespace-pre-line text-center ${TYPO.bodyBold} leading-tight text-[var(--color-muhurtha-card-accent)]`,
  notificationBadge: `absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--color-brand-error)] px-1 ${TYPO.badgeMicro} ${TYPO.weightBold} text-white`,
  matchCardTitle: `whitespace-pre-line text-center ${TYPO.bodyBold} leading-tight text-[var(--color-brand-marriage)]`,
} as const;
