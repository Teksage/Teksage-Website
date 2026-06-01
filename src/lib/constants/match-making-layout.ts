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
  detailsContent: `${PREDICTION_DESKTOP_LAYOUT.contentColumn} ${PREDICTION_DESKTOP_LAYOUT.contentGutter} relative z-10 space-y-4 pb-24 pt-4 lg:pb-12`,
} as const;
