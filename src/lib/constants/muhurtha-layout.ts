import { TYPO } from "@/lib/constants/typography";
import { PREDICTION_DESKTOP_LAYOUT } from "@/lib/constants/prediction-desktop-layout";

export const MUHURTHA_LAYOUT = {
  formRoot: `${PREDICTION_DESKTOP_LAYOUT.contentColumn} ${PREDICTION_DESKTOP_LAYOUT.contentGutter} mx-auto w-full max-w-lg space-y-5 py-6`,
  formCard: "space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/[0.05]",
  fieldLabel: `${TYPO.labelSemibold} text-sm text-[var(--color-brand-black)]`,
  select:
    "mt-1.5 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800",
  dateInput:
    "mt-1.5 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800",
  locationText: `${TYPO.bodySm} mt-1 text-[var(--color-brand-black)]/70`,
  submitCta: "w-full rounded-full",
  resultsRoot: `${PREDICTION_DESKTOP_LAYOUT.contentColumn} ${PREDICTION_DESKTOP_LAYOUT.contentGutter} mx-auto w-full max-w-2xl space-y-4 py-6`,
  resultsHeader: "flex flex-col gap-1",
  resultsTitle: `${TYPO.h3Bold} text-[var(--color-brand-black)]`,
  resultsRange: `${TYPO.bodySm} text-[var(--color-brand-black)]/65`,
  tableCard: "overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.05]",
  tableHead: "grid grid-cols-[1fr_1fr_1.2fr] gap-2 border-b border-neutral-100 bg-neutral-50 px-4 py-3",
  tableHeadCell: `${TYPO.caption} font-semibold text-[var(--color-brand-black)]/70`,
  dayRowButton:
    "grid w-full grid-cols-[1fr_1fr_1.2fr] gap-2 border-b border-neutral-100 px-4 py-3 text-left transition-colors hover:bg-neutral-50/80",
  dayRowStatic:
    "grid w-full grid-cols-[1fr_1fr_1.2fr] gap-2 border-b border-neutral-100 px-4 py-3 text-left",
  dayRowDate: `${TYPO.bodySm} font-semibold text-[var(--color-brand-black)]`,
  dayRowWindow: `${TYPO.bodySm} text-[var(--color-brand-primary)]`,
  statusSuitable: "text-sm font-semibold text-[var(--color-brand-primary)]",
  statusUnsuitable: "text-sm font-semibold text-[var(--color-brand-black)]/55",
  reasonInfoBtn:
    "inline-flex size-8 items-center justify-center rounded-full border border-neutral-200 text-[var(--color-brand-black)]/70 hover:bg-neutral-50",
  detailPanel: "border-b border-neutral-100 bg-[var(--color-brand-bg)] px-4 py-3",
  premiumGateRoot: "relative flex min-h-0 flex-1 flex-col",
  premiumGateBackdrop: "absolute inset-0 overflow-hidden",
  premiumGateDesktopMint: "absolute inset-0 hidden bg-[var(--color-brand-bg)] lg:block",
  premiumGateGradient:
    "absolute inset-0 bg-gradient-to-b from-[var(--color-brand-panchang)]/90 to-[var(--color-brand-primary)]/80",
  premiumGateScrim: "absolute inset-0 bg-black/20",
  premiumGateContent:
    "relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-10",
  premiumGateCard:
    "w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-lg ring-1 ring-black/5",
  premiumGateIconWrap: "mb-4 flex justify-center",
  premiumGateTitle: `${TYPO.h3Bold} text-[var(--color-brand-black)]`,
  premiumGateDescription: `${TYPO.bodySm} mt-2 text-[var(--color-brand-black)]/70`,
  premiumGateCtaWrap: "mt-6",
  premiumGateCta: "w-full rounded-full",
  panchangCtaWrap: "px-4 pb-4 lg:px-0",
  panchangCtaLink:
    "flex items-center justify-between gap-3 rounded-xl bg-[color-mix(in_srgb,var(--color-brand-primary)_10%,white)] px-4 py-3 text-sm font-semibold text-[var(--color-brand-primary)] ring-1 ring-[color-mix(in_srgb,var(--color-brand-primary)_20%,transparent)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-brand-primary)_14%,white)]",
} as const;
