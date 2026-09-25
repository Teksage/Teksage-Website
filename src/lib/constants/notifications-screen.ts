/** Notifications page — mirrors Flutter `notificationPage.dart`. */

export const NOTIFICATIONS_SCREEN = {
  title: "Notifications",
  tabGeneral: "General",
  tabThirtyMins: "30 Mins Consultation",
  tabSingleQuery: "Single-Query Consultation",
  /** @deprecated Prefer tabThirtyMins / tabSingleQuery — kept for older copy. */
  tabConsultation: "Consultation",
  clearAll: "Clear All",
  clearAllSuccess: "All notifications have been cleared.",
  clearAllFailed: "Failed to update notification status.",
  loadFailed: "Could not load notifications. Please try again.",
  emptyGeneral:
    "There are no recent general updates from your astrological guidance.",
  emptyThirtyMins: "There are no 30 Mins Consultation updates.",
  emptySingleQuery: "There are no Single-Query Consultation updates.",
  emptyConsultation: "There are no Consultation updates.",
  meetingLink: "Meeting Link",
  viewDetails: "View Details",
  viewAnswers: "View answers",
  customerAppointmentOn: "You have an appointment on",
  astrologerAppointmentOn: "Astrologer appointment on",
  backAria: "Go back",
} as const;

export const NOTIFICATIONS_TAB_GENERAL = "general" as const;
export const NOTIFICATIONS_TAB_THIRTY_MINS = "30-mins" as const;
export const NOTIFICATIONS_TAB_SINGLE_QUERY = "single-query" as const;
/** Legacy URL/deep-link alias — maps to Single-Query Consultation. */
export const NOTIFICATIONS_TAB_CONSULTATION = "consultation" as const;

export const NOTIFICATIONS_TABS = [
  NOTIFICATIONS_TAB_GENERAL,
  NOTIFICATIONS_TAB_THIRTY_MINS,
  NOTIFICATIONS_TAB_SINGLE_QUERY,
] as const;

export function parseNotificationTab(
  tabParam: string | null | undefined
): (typeof NOTIFICATIONS_TABS)[number] {
  if (
    tabParam === NOTIFICATIONS_TAB_THIRTY_MINS ||
    tabParam === "thirty-mins"
  ) {
    return NOTIFICATIONS_TAB_THIRTY_MINS;
  }
  if (
    tabParam === NOTIFICATIONS_TAB_SINGLE_QUERY ||
    tabParam === NOTIFICATIONS_TAB_CONSULTATION
  ) {
    return NOTIFICATIONS_TAB_SINGLE_QUERY;
  }
  return NOTIFICATIONS_TAB_GENERAL;
}

export function isSingleQueryNotificationTab(
  tabParam: string | null | undefined
): boolean {
  return (
    tabParam === NOTIFICATIONS_TAB_SINGLE_QUERY ||
    tabParam === NOTIFICATIONS_TAB_CONSULTATION
  );
}

/** Backend push titles → user-facing labels (Flutter Android mapping). */
export const NOTIFICATION_DISPLAY_TITLES = {
  dailyWisdom: "Daily Wisdom",
  dailyPrediction: "Daily Prediction",
  dailyPredictionDesc: "Your Daily Prediction have been generated",
  weeklyInsights: "Weekly Insights",
  weeklyPrediction: "Weekly Prediction",
  weeklyPredictionDesc: "Your Weekly Prediction have been generated",
  yearlyInsights: "Yearly Insights",
  yearlyPrediction: "Yearly Prediction",
  yearlyPredictionDesc: "Your Yearly Prediction have been generated",
} as const;

/** Flutter `DateFormat("dd MMM, yyyy - h:mm a")` on notification cards. */
export const NOTIFICATION_SENT_AT_FORMAT = "dd MMM, yyyy - h:mm a";

/** Flutter Ask card `DateFormat("dd MMM, yyyy")` on paid date. */
export const NOTIFICATION_ASK_PAID_AT_FORMAT = "dd MMM, yyyy";

export const NOTIFICATIONS_UI = {
  page: "relative z-10 flex min-h-0 flex-1 flex-col bg-white",
  content: "mx-auto flex w-full max-w-lg min-h-0 flex-1 flex-col lg:max-w-2xl",
  tabBarWrap: "border-b border-neutral-200 px-5 pb-3 pt-2",
  tabList:
    "grid grid-cols-3 gap-1 rounded-full bg-neutral-100 p-1",
  tabButton:
    "rounded-full px-2 py-2 text-center text-[11px] font-semibold leading-tight transition-colors sm:text-sm",
  tabActive: "bg-[var(--color-brand-primary)] text-white",
  tabIdle: "text-[var(--color-brand-black)]",
  list: "flex-1 overflow-y-auto px-5 py-3 lg:px-6 lg:py-4",
  listCard:
    "mb-3 rounded-xl border border-black/[0.04] bg-[#f6f6f6] p-4 lg:p-5",
  generalCard:
    "mb-3 w-full space-y-1.5 rounded-xl border border-black/[0.04] bg-[#f6f6f6] p-4 text-left transition-opacity active:opacity-90 lg:space-y-2 lg:p-5",
  generalCardUnread: "border-[var(--color-brand-primary)]/25 bg-white",
  generalCardTitle: "text-sm font-semibold text-[var(--color-brand-black)] lg:text-base",
  generalCardMessage: "line-clamp-2 text-sm font-medium leading-snug text-black/75 lg:text-base",
  generalCardDate: "pt-0.5 text-xs text-black/45 lg:text-sm",
  generalUnreadDot:
    "mr-2 inline-block size-1.5 shrink-0 rounded-full bg-[var(--color-brand-primary)] align-middle",
  item:
    "mb-2.5 rounded-xl border border-black/10 p-3 text-left transition-colors",
  itemUnread: "bg-[#f6f6f6]",
  itemRead: "bg-white",
  itemTitle: "text-sm font-semibold text-[var(--color-brand-black)]",
  itemMessage: "mt-1 line-clamp-2 text-sm-plus font-medium text-black/80",
  itemDate: "mt-1 text-nav font-medium text-black/45",
  consultationCard:
    "mb-3 flex items-center justify-between gap-3 rounded-xl border border-black/[0.04] bg-[#f6f6f6] p-4 lg:p-5",
  notificationRow: "flex items-center gap-[9px]",
  notificationAvatar:
    "relative size-[41px] shrink-0 overflow-hidden rounded-full border-[2.6px] border-[var(--color-brand-primary)]/30 bg-[#f6f6f6]",
  notificationAvatarFallback:
    "absolute inset-0 m-auto size-6 object-contain opacity-40",
  notificationContent: "min-w-0 flex-1",
  notificationHeaderRow: "flex items-center gap-2",
  notificationSectionLabel:
    "min-w-0 flex-1 truncate text-xs font-semibold text-black/45 lg:text-sm",
  notificationQuestion:
    "line-clamp-2 text-sm font-semibold leading-snug text-[var(--color-brand-black)] lg:text-base",
  notificationMeta: "text-xs leading-none text-black/45 lg:text-sm",
  notificationPaidDate: "text-xs font-medium leading-none text-black/55 lg:text-sm",
  notificationActionRow: "mt-2.5 flex flex-wrap justify-end gap-2",
  consultationActions: "flex shrink-0 flex-col items-end gap-1.5 sm:flex-row sm:items-center",
  consultationMeetBtn:
    "shrink-0 rounded-full bg-[var(--color-brand-primary)] px-3 py-[9px] text-xs font-semibold leading-none text-white",
  consultationSecondaryBtn:
    "shrink-0 rounded-full border border-[var(--color-brand-primary)]/40 bg-white px-3 py-[9px] text-xs font-semibold leading-none text-[var(--color-brand-primary)]",
  dialogTitle: "text-base font-semibold text-[var(--color-brand-black)] lg:text-lg",
  dialogBody: "text-sm font-medium text-black/85",
} as const;
