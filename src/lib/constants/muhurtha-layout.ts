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
  tableCard: "overflow-visible rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.05]",
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
    "inline-flex size-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-[var(--color-brand-black)]/70 shadow-sm transition-colors hover:border-[var(--color-brand-primary)]/35 hover:bg-[var(--color-brand-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)]/30",
  reasonTooltipWrap: "relative inline-flex items-center",
  reasonTooltipPanel:
    "pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-72 -translate-x-1/2 whitespace-normal break-words rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-medium leading-5 text-[var(--color-brand-black)] shadow-xl opacity-0 translate-y-1 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100",
  reasonTooltipArrow:
    "pointer-events-none absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 border-r border-b border-black/10 bg-white",
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
