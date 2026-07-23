/** Match making form + details — full-bleed header, readable hero copy. */
import { TYPO } from "@/lib/constants/typography";
import { PREDICTION_DESKTOP_LAYOUT } from "@/lib/constants/prediction-desktop-layout";

export const MATCH_MAKING_LAYOUT = {
  pageRoot:
    "min-h-dvh w-full min-w-0 bg-[linear-gradient(180deg,var(--color-match-top)_0%,var(--color-match-bottom)_100%)]",
  heroInner: "w-full px-4 pb-2 pt-8 sm:px-5 lg:px-8 lg:pt-10",
  backButton: "inline-flex p-2 lg:p-3",
  heroCopy:
    "mt-4 flex flex-col items-center gap-2.5 px-2 text-center text-white sm:px-4",
  heroTitle: `${TYPO.h2} lg:text-2xl ${TYPO.weightBold} drop-shadow-sm`,
  heroSubtitle: `${TYPO.bodySm} ${TYPO.weightSemibold} ${TYPO.leadingRelaxed} max-w-md sm:max-w-lg lg:max-w-xl`,
  headerBar:
    "relative z-20 grid w-full grid-cols-[auto_1fr_auto] items-center px-4 pt-6 lg:px-8 lg:pt-8",
  headerTitle: `${TYPO.h2} lg:text-2xl ${TYPO.weightBold} text-center text-white drop-shadow-sm`,
  formBody: `${PREDICTION_DESKTOP_LAYOUT.contentColumn} ${PREDICTION_DESKTOP_LAYOUT.contentGutter} flex flex-col gap-4 pb-12 pt-6`,
  detailsContent: `${PREDICTION_DESKTOP_LAYOUT.contentColumn} ${PREDICTION_DESKTOP_LAYOUT.contentGutter} relative z-10 space-y-4 pb-28 pt-4 lg:pb-12`,
  /** Desktop only — icon + label on one line. */
  detailsCtaRow: "mx-auto hidden w-full max-w-2xl flex-row gap-2 sm:gap-3 lg:flex",
  detailsCtaButton: `flex min-w-0 flex-1 flex-row items-center justify-center gap-1 rounded-[1.25rem] bg-white px-1.5 py-2.5 text-center ${TYPO.sizeMicro} font-semibold leading-tight text-[var(--color-match-button-text)] sm:gap-1.5 sm:px-2.5 sm:py-3 sm:text-xs md:text-sm`,
  detailsCtaIcon: "size-3.5 shrink-0 sm:size-4",
  /** Mobile only — fixed above bottom nav. */
  fabWrap:
    "fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] right-5 z-50 flex flex-col items-end gap-3 lg:hidden",
  fabButton:
    "flex size-12 items-center justify-center rounded-full bg-[var(--color-match-fab)] shadow-lg transition-transform sm:size-14",
  fabIcon: "size-5 sm:size-6",
  fabMenuPanel:
    "mb-0 w-max max-w-[min(100%,16rem)] rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur-sm",
  fabMenuItem:
    "flex w-full items-center gap-2.5 py-1.5 text-sm font-medium text-[var(--color-brand-black)]",
} as const;
