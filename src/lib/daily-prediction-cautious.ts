import type { WeeklyPredictionDetail } from "@/types/prediction-detail";

const WEEKDAY_KEYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

/** Matches Flutter daily header — before 6 AM uses previous calendar day. */
export function getDailyPredictionReferenceDate(now = new Date()): Date {
  const ref = new Date(now);
  const sixAm = new Date(ref);
  sixAm.setHours(6, 0, 0, 0);
  if (ref < sixAm) {
    ref.setDate(ref.getDate() - 1);
  }
  return ref;
}

export function weekdayKeyFromDate(
  date: Date
): (typeof WEEKDAY_KEYS)[number] {
  return WEEKDAY_KEYS[date.getDay()];
}

/** Weekly `short_prediction` for the reference day (e.g. Comfort & Joy). */
export function cautiousFromWeeklyDetail(
  weekly: WeeklyPredictionDetail,
  referenceDate = getDailyPredictionReferenceDate()
): string | undefined {
  const key = weekdayKeyFromDate(referenceDate);
  const titled = key.charAt(0).toUpperCase() + key.slice(1);
  const match = weekly.days.find((day) => {
    const name = day.day.toLowerCase();
    return name === key || name === titled.toLowerCase();
  });
  const text = match?.shortPrediction?.trim();
  return text || undefined;
}
