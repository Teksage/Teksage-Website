/** Notifications page — mirrors Flutter `notificationPage.dart`. */

export const NOTIFICATIONS_SCREEN = {
  title: "Notifications",
  tabGeneral: "General",
  tabConsultation: "Consultation",
  clearAll: "Clear All",
  clearAllSuccess: "All notifications have been cleared.",
  clearAllFailed: "Failed to update notification status.",
  loadFailed: "Could not load notifications. Please try again.",
  emptyGeneral:
    "There are no recent general updates from your astrological guidance.",
  emptyConsultation: "There are no Consultation updates.",
  meetingLink: "Meeting Link",
  customerAppointmentOn: "You have an appointment on",
  astrologerAppointmentOn: "Astrologer appointment on",
  backAria: "Go back",
} as const;

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

export const NOTIFICATIONS_UI = {
  page: "relative z-10 flex min-h-0 flex-1 flex-col bg-white",
  content: "mx-auto flex w-full max-w-lg min-h-0 flex-1 flex-col lg:max-w-2xl",
  tabBarWrap: "border-b border-neutral-200 px-5 pb-3 pt-2",
  tabList:
    "grid grid-cols-2 gap-1 rounded-full bg-neutral-100 p-1",
  tabButton:
    "rounded-full px-3 py-2 text-sm font-semibold transition-colors",
  tabActive: "bg-[var(--color-brand-primary)] text-white",
  tabIdle: "text-[var(--color-brand-black)]",
  list: "flex-1 overflow-y-auto px-5 py-3 lg:px-6 lg:py-4",
  generalCard:
    "mb-3 w-full space-y-1.5 rounded-xl bg-white p-4 text-left shadow-sm ring-1 ring-black/5 transition-opacity active:opacity-90 lg:space-y-2 lg:p-5",
  generalCardUnread: "ring-[var(--color-brand-primary)]/25",
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
  itemMessage: "mt-1 line-clamp-2 text-[13px] font-medium text-black/80",
  itemDate: "mt-1 text-[11px] font-medium text-black/45",
  consultationCard:
    "mb-3 flex items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5 lg:p-5",
  consultationMeetBtn:
    "shrink-0 rounded-full bg-[var(--color-brand-primary)] px-3 py-2 text-xs font-semibold text-white",
  dialogTitle: "text-base font-semibold text-[var(--color-brand-black)] lg:text-lg",
  dialogBody: "text-sm font-medium text-black/85",
} as const;
