import { TYPO } from "./typography";

/** Home dashboard typography — use in home feature components. */
export const HOME_DASHBOARD_UI = {
  dailyCardTitle: `text-center ${TYPO.h3Bold} text-white`,
  dailyCardDate: `${TYPO.labelSemibold} text-white/75`,
  dailyHint: `py-1 text-center ${TYPO.caption} text-[var(--color-brand-primary)]`,
  dailyBalaValue: `${TYPO.badgeMicro} text-neutral-900`,
  dailyBalaLabel: `${TYPO.badge3xs} text-[var(--color-brand-primary)]`,
  consultBannerRow:
    "relative z-10 flex w-full items-center gap-2 px-2 py-2 sm:gap-3 sm:px-3 sm:py-2.5",
  consultBannerPortraitWrap:
    "relative z-[1] flex shrink-0 justify-center self-end pt-2.5 pl-2 pb-0.5 sm:pt-3 sm:pl-3 sm:pb-1",
  consultBannerTitle: `min-w-0 flex-1 whitespace-pre-line text-left ${TYPO.consultBannerBody} text-[var(--color-brand-consultation-heading)]`,
  /** Pill CTA — far right, vertically centered (Flutter `homePage.dart` Row + design ref). */
  consultBannerCta: `shrink-0 whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-center ${TYPO.caption} text-[var(--color-brand-banner-dark)] shadow-sm transition-opacity hover:opacity-90 sm:px-5 sm:py-3`,
  exploreSectionTitle: `${TYPO.exploreTitle} text-[color:var(--color-home-dashboard-heading)]`,
  exploreCircleLabel: `${TYPO.exploreCircle} text-[color:var(--color-home-dashboard-heading)]`,
  headerGreeting: `truncate ${TYPO.h3Bold} ${TYPO.leadingTight} lg:text-xl text-[color:var(--color-home-dashboard-heading)]`,
  chatBannerTitle: `min-w-0 shrink whitespace-pre-line text-left ${TYPO.bannerCta} text-white lg:text-lg`,
  chatBannerCta: `${TYPO.bannerFine} text-[var(--color-brand-banner-font)]`,
  notificationBadge: `absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--color-brand-error)] px-1 ${TYPO.badgeMicro} ${TYPO.weightBold} text-white`,
  matchCardTitle: `whitespace-pre-line text-center ${TYPO.bodyBold} leading-tight text-[var(--color-brand-marriage)]`,
} as const;
