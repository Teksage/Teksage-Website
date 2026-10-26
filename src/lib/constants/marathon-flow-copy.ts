export const MARATHON_FLOW_COPY = {
  tagline: "Better guidance · Brighter tomorrow",
  bookSlot: "Book a Slot",
  saveAmount: "Save {amount}",
  registrationOpen: "Registration open",
  slotsAvailable: "{count} Slots Available",
  session: "Session",
  timeBirth: "Time Slot & Birth Details",
  payment: "Payment",
  chooseTime: "Choose a time – {when}",
  slotLength: "Each one-to-one slot is {minutes}.",
  someoneElse: "Booking for someone else",
  someoneHint: "Turn on to enter a family member's or friend's details.",
  readingFor: "Who is this reading for?",
  readingHint: "The astrologer reads your chart from these details.",
  review: "Review your booking",
  nextTitle: "What happens next",
  payConfirmed: "Payment confirmed",
  payConfirmedHint: "You get an email for payment confirmation.",
  chooseSlots: "Choose slots",
  astrologerAssigned: "Astrologer assigned",
  astrologerAssignedHint: "Within 1 hour, based on your question and language.",
  linkShared: "Meeting link shared",
  linkSharedHint: "Sent to your email about the invitation once astrologer assigned and also you can join through our app",
  bookingSummary: "Booking summary",
  totalGst: "Total incl. GST",
  privacy: "Your details are private and shared only with your assigned astrologer.",
  securePay: "You'll be taken to our secure payment partner · UPI, cards, net banking",
  whatsappAfter: "Need help after booking? Contact us on WhatsApp anytime.",
  readingForLabel: "Reading for",
  born: "Born",
  meetingTo: "Meeting link to",
  timeSlot: "Time slot",
  sessionFee: "Session fee",
  consultationLanguage: "Consultation language",
  birthCity: "City, e.g. Chennai",
  liveCity: "City you live in",
  questionExample: "e.g. Is 2027 a good year to switch jobs?",
  meetingSent: "Your meeting link is sent here.",
  minutesShort: "{count} min",
} as const;

/** Seat pills use the warm tone at this count and below. */
export const MARATHON_LOW_SEATS = 2;

/** Two cards per row, ten events per page, then previous / next. */
export const MARATHON_LIST_PAGE_SIZE = 10;

/** List-card anchor. The live fee from the event replaces this when it is lower. */
export const MARATHON_COMPARE_AT_INR = 1399;
