/** UI copy and design tokens for the Astrologer portal (Phase F).
 * Mirrors Flutter `Screens/Astrologer/*` and `Components/Astrologer/*`.
 */

export const ASTRO_PORTAL_UI = {
  // Page headings
  dashboardTitle: "Astrologer Consultation",
  loginBadge: "You logged in as Astrologer",
  meetingsTitle: "Meetings",
  availabilityTitle: "My Availability",
  meetingDetailTitle: "Meeting Details",
  horoscopeDetailTitle: "Horoscope Details",

  // Dashboard cards — mirrors dashBoardCard.dart
  card: {
    meetings: {
      title: "Meetings",
      subtitle: "View your scheduled appointments & completed ones",
    },
    availability: {
      title: "My Availability",
      subtitle: "Set your available time slots.",
    },
  },

  // Meetings list
  tab: { upcoming: "Upcoming", completed: "Completed" },
  emptyUpcoming: "You have no upcoming meetings at the moment.",
  emptyCompleted: "You have no completed meetings at the moment.",
  bookedSlotOn: "booked a slot on",
  viewDetails: "View\nDetails",

  // Meeting detail labels
  detail: {
    date: "Date",
    time: "Time",
    duration: "Duration",
    meetLink: "Meeting Link",
    joinMeeting: "Join Meeting",
    noLink: "Link not available yet",
    customerInfo: "Customer Info",
    horoscope: "Customer Horoscope",
    horoscopeDetails: "Horoscope Details",
    horoscopeView: "View",
    horoscopeUnavailable: "Horoscope details are not available",
    questions: "Questions",
    noQuestions: "No questions submitted.",
    booked: "Booked a slot for",
    min: "min",
    consultingOn: "Consulting On",
    language: "Language",
    feesPaid: "Fees Paid",
    submitted: "Submitted",
    backToMeetings: "← Back to Meetings",
  },

  /** Customer Q&A on meeting detail — mirrors Flutter `answerDialog.dart`. */
  questions: {
    headerPending: "Queries asked — Time to share your thoughts!",
    headerDone: "Queries asked — You've already shared your thoughts!",
    noAnswerYet: "No answer provided yet.",
    answerBtn: "Answer",
    answerAfterMeeting:
      "You can answer only after completing the consultation.",
    dialogPlaceholder: "Type your answer here...",
    previous: "Previous",
    next: "Next",
    done: "Done",
    answerEmpty: "Please enter an answer.",
    answerSaveFail: "Failed to save answer. Please try again.",
    charLimit: 500,
  },

  // Availability
  avail: {
    editLabel: "Edit",
    saveLabel: "Save",
    savingLabel: "Saving…",
    viewingPrompt: "Showing the available time that you picked",
    editingPrompt: "Select the slots that you are available",
    morning: "Morning",
    afternoon: "Afternoon",
    slots: "slots",
    bookedNotice: "This slot is already booked by a user and cannot be removed.",
    saveSuccess: "Slot Updated Successfully.",
    saveFail: "Please try again.",
    multiDateHint:
      "Pick slots on any date, then tap Save once to update all changed days.",
    emptyDayHint: "No slots set for this date. Tap Edit to add availability.",
  },

  // Status chips
  statusLabel: {
    new: "New",
    confirmed: "Confirmed",
    completed: "Completed",
  },
} as const;

/** astroUserConsultBG = 0xffA2BE35 in Flutter `colorConstant.dart` */
export const ASTRO_PORTAL_COLORS = {
  /** Card background — Flutter `Color(0xffFAFFDE)` */
  cardBg: "#FAFFDE",
  /** Card bottom strip — Flutter `Color(0xffa2be35)` */
  cardStrip: "#a2be35",
  /** Primary brand green — `astroUserConsultBG` = `#94C10D` */
  brandGreen: "#94C10D",
  /** Meeting list item bg — Flutter `Color(0xFFF6F6F6)` */
  listItemBg: "#F6F6F6",
  /** Available slot tint — Flutter `Color(0xffECF4D3)` */
  slotAvailable: "#ECF4D3",
  /** Past/booked slot bg — Flutter `Color(0xffFFDCDC)` */
  slotBooked: "#FFDCDC",
  /** Slot grid edit bg — Flutter `Color(0xfff5f5f5)` */
  slotEditBg: "#f5f5f5",
} as const;

/** Time-slot grid hours — maps to Flutter `generateTimeSlots`. */
/** Query keys when opening meeting detail from the list (Flutter constructor args). */
export const MEETING_DETAIL_QUERY = {
  name: "name",
  initials: "initials",
  link: "link",
} as const;

export const SLOT_SESSIONS = {
  morning: { label: "Morning", start: 0, end: 12 },
  afternoon: { label: "Afternoon", start: 12, end: 24 },
} as const;
