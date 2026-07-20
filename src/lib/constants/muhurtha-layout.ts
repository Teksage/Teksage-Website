import { TYPO } from "@/lib/constants/typography";

const panchangCard =
  "rounded-[20px] border-[3px] border-[color-mix(in_srgb,var(--color-brand-primary)_30%,transparent)] bg-white";

const tableGridCols =
  "grid-cols-[minmax(4.5rem,0.95fr)_minmax(4.25rem,0.8fr)_minmax(5.25rem,1.25fr)] sm:grid-cols-[minmax(6.5rem,1fr)_minmax(6.5rem,1fr)_minmax(10rem,1.5fr)]";

const primaryCta =
  "inline-flex min-h-12 min-w-[12rem] items-center justify-center rounded-full bg-[var(--color-brand-primary)] px-8 text-base font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45";

export const MUHURTHA_LAYOUT = {
  featureBackdrop: "absolute inset-0 bg-[var(--color-brand-horoscope-bg)]",
  contentShell: "relative z-10",
  featurePageMain:
    "relative z-10 mx-auto flex w-full max-w-sm flex-1 flex-col px-4 pb-6 pt-1 lg:max-w-md lg:px-6",
  featurePageMainForm: "justify-start mt-20 lg:justify-center lg:mt-0",
  featurePageMainResults: "max-w-lg lg:max-w-2xl",
  heroHeader:
    "relative z-10 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top,0px))] lg:px-8 lg:pb-5 lg:pt-5",
  heroCopy: "mx-auto max-w-xl text-center",
  heroTitle:
    "text-center text-xl font-bold leading-tight tracking-tight text-[var(--color-brand-black)] lg:text-2xl",
  heroSubtitle: `${TYPO.bodySm} mx-auto mt-2 max-w-md text-center font-medium text-[var(--color-brand-black)]/70 sm:text-base`,
  heroNotification:
    "absolute right-4 top-[max(0.75rem,env(safe-area-inset-top,0px))] rounded-full p-2 text-[var(--color-brand-black)] transition-colors hover:bg-black/5 lg:right-8 lg:top-5",
  heroBackBtn:
    "absolute left-4 top-[max(0.75rem,env(safe-area-inset-top,0px))] rounded-full p-2 text-[var(--color-brand-black)] transition-colors hover:bg-black/5 lg:left-8 lg:top-5",
  formRoot: "mx-auto w-full space-y-4",
  formCard: `space-y-5 ${panchangCard} p-5 sm:p-6`,
  fieldLabel: `${TYPO.labelSemibold} text-sm text-[var(--color-brand-black)]`,
  selectWrap: "relative mt-1.5",
  select:
    "h-12 w-full appearance-none rounded-xl border border-neutral-200 bg-white px-4 pr-11 text-sm font-medium text-neutral-800 focus-visible:border-[var(--color-brand-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)]/20",
  selectChevron:
    "pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-brand-black)]/70",
  dateInput:
    "mt-1.5 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 focus-visible:border-[var(--color-brand-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)]/20",
  locationInput: "bg-white",
  submitWrap: "flex justify-center pt-2",
  submitCta: primaryCta,
  resultsRoot: "mx-auto w-full space-y-4",
  resultsHeaderCard: `${panchangCard} p-4 sm:p-5`,
  resultsHeaderTop: "flex flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:justify-between",
  resultsHeaderCopy: "min-w-0 space-y-2 text-center sm:text-left",
  resultsTitle: `${TYPO.h3Bold} text-[var(--color-brand-black)]`,
  resultsSubtitle: `${TYPO.bodySm} text-[var(--color-brand-black)]/65`,
  resultsMetaRow: "flex flex-wrap justify-center gap-2 sm:justify-start",
  metaChip:
    "inline-flex items-center rounded-full bg-[color-mix(in_srgb,var(--color-brand-primary)_8%,white)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-brand-black)]/75 ring-1 ring-[color-mix(in_srgb,var(--color-brand-primary)_15%,transparent)]",
  backCta:
    "ml-auto inline-flex min-h-9 min-w-[8.5rem] shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-primary)] px-4 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 sm:ml-0 sm:min-h-12 sm:min-w-[12rem] sm:px-8 sm:text-base",
  resultsActionsRow: "flex flex-wrap items-center justify-end gap-3 pt-1",
  resultsActionBtnBase:
    "inline-flex min-h-11 min-w-[10rem] flex-1 cursor-pointer items-center justify-center rounded-full px-6 text-sm font-semibold shadow-sm transition-opacity hover:opacity-90 sm:flex-none sm:min-w-[12rem] sm:text-base",
  resultsActionPrimary: "bg-[var(--color-brand-primary)] text-white",
  resultsActionSecondary:
    "border border-[var(--color-brand-primary)] bg-white text-[var(--color-brand-primary)]",
  tableCard: `overflow-visible ${panchangCard}`,
  tableHead: `grid gap-1.5 border-b border-neutral-100 bg-[color-mix(in_srgb,var(--color-brand-primary)_6%,white)] px-3 py-2 sm:gap-3 sm:px-4 sm:py-3 ${tableGridCols}`,
  tableHeadCell: `${TYPO.caption} font-semibold uppercase tracking-wide text-[var(--color-brand-black)]/55`,
  tableHeadDetails: `${TYPO.caption} font-semibold uppercase tracking-wide text-[var(--color-brand-black)]/55 text-right`,
  dayRowStatic: `grid items-center gap-1.5 border-b border-neutral-100 px-3 py-2.5 last:border-b-0 sm:gap-3 sm:px-4 sm:py-3 ${tableGridCols}`,
  tableColDate: "min-w-0",
  tableColStatus: "min-w-0",
  tableColDetails: "flex min-w-0 items-center justify-end",
  dayRowDate: "text-xs font-semibold text-[var(--color-brand-black)] sm:text-sm",
  dayRowWeekday: "text-[10px] text-[var(--color-brand-black)]/50 sm:text-xs",
  statusStack: "flex flex-col items-start gap-1",
  statusPeriodLabel:
    "text-[9px] font-semibold uppercase tracking-wide text-[var(--color-brand-black)]/45 sm:text-[10px]",
  segmentDetailsStack: "flex min-w-0 flex-col items-end gap-1.5 text-right",
  segmentDetailBlock: "flex min-w-0 flex-col items-end gap-0.5",
  statusBadgeBase:
    "inline-flex w-fit max-w-full flex-wrap items-center gap-x-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold leading-tight sm:px-2.5 sm:text-xs",
  statusSuitable:
    "bg-[var(--color-muhurtha-suitable-bg)] text-[var(--color-muhurtha-suitable-text)] ring-1 ring-[var(--color-muhurtha-suitable-ring)]",
  statusSuitableVeryGood:
    "bg-[var(--color-muhurtha-status-very-good-bg)] text-[var(--color-muhurtha-status-very-good-text)] ring-1 ring-[var(--color-muhurtha-status-very-good-ring)]",
  statusSuitableGood:
    "bg-[var(--color-muhurtha-status-good-bg)] text-[var(--color-muhurtha-status-good-text)] ring-1 ring-[var(--color-muhurtha-status-good-ring)]",
  statusSuitableAverage:
    "bg-[var(--color-muhurtha-status-average-bg)] text-[var(--color-muhurtha-status-average-text)] ring-1 ring-[var(--color-muhurtha-status-average-ring)]",
  statusUnsuitable:
    "bg-[var(--color-muhurtha-unsuitable-bg)] text-[var(--color-muhurtha-unsuitable-text)] ring-1 ring-[var(--color-muhurtha-unsuitable-ring)]",
  statusSeparator: "font-semibold opacity-80",
  detailsTimeBlock: "flex min-w-0 flex-col items-end gap-0.5 text-right",
  dayRowWindow: "text-[10px] font-medium leading-tight text-[var(--color-brand-black)]/80 sm:text-sm",
  reasonPreviewText:
    "max-w-full text-right text-[10px] font-semibold leading-snug text-[var(--color-brand-black)] sm:text-xs",
  reasonMoreBtn:
    "text-[10px] font-semibold text-[var(--color-brand-black)] underline underline-offset-2 hover:opacity-70 sm:text-xs",
  reasonPreviewWrap: "flex min-w-0 flex-col items-end gap-0.5 text-right",
  reasonInfoBtn:
    "inline-flex size-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-[var(--color-brand-black)]/65 shadow-sm transition-colors hover:border-[var(--color-brand-primary)]/35 hover:bg-[var(--color-brand-bg)] hover:text-[var(--color-brand-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)]/30",
  reasonTooltipWrap: "relative inline-flex items-center justify-end",
  reasonTooltipPanelFixed:
    "rounded-xl border border-neutral-200 bg-white p-3 text-left text-xs font-medium leading-5 text-[var(--color-brand-black)] shadow-xl",
  reasonList: "m-0 list-disc space-y-1 pl-4",
  premiumGateRoot: "relative flex min-h-0 flex-1 flex-col",
  premiumGateBackdrop: "absolute inset-0 overflow-hidden",
  premiumGateDesktopMint: "absolute inset-0 bg-[var(--color-brand-horoscope-bg)]",
  premiumGateGradient:
    "absolute inset-0 bg-gradient-to-b from-[var(--color-panchang-hero-top)]/95 to-[var(--color-panchang-hero-bottom)]/90",
  premiumGateScrim: "absolute inset-0 bg-black/25 lg:bg-black/10",
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
