/** Birth-date calendar helpers — mirrors Flutter `CustomDatePicker` bounds (1900 → today). */

import {
  daysInMonth,
  firstWeekdayOffset,
  isPastCalendarDay,
  isSameCalendarDay,
  monthYearLabel,
  startOfDay,
} from "@/lib/consultation-calendar";

export const PROFILE_BIRTH_MIN_DATE = new Date(1900, 0, 1);

export {
  daysInMonth,
  firstWeekdayOffset,
  isSameCalendarDay,
  monthYearLabel,
  startOfDay,
};

export function isFutureBirthDay(day: Date, today: Date): boolean {
  return startOfDay(day).getTime() > startOfDay(today).getTime();
}

export function canNavigatePrevBirthMonth(focused: Date): boolean {
  const prev = new Date(focused.getFullYear(), focused.getMonth() - 1, 1);
  const minMonth = new Date(
    PROFILE_BIRTH_MIN_DATE.getFullYear(),
    PROFILE_BIRTH_MIN_DATE.getMonth(),
    1,
  );
  return prev >= minMonth;
}

export function canNavigateNextBirthMonth(focused: Date, today: Date): boolean {
  const next = new Date(focused.getFullYear(), focused.getMonth() + 1, 1);
  const maxMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  return next <= maxMonth;
}

export function isBirthDayDisabled(day: Date, today: Date): boolean {
  return (
    isPastCalendarDay(day, PROFILE_BIRTH_MIN_DATE) ||
    isFutureBirthDay(day, today)
  );
}

/** Descending years for the birth-date dropdown (current year → 1900). */
export function getBirthYearOptions(today: Date): number[] {
  const end = today.getFullYear();
  const start = PROFILE_BIRTH_MIN_DATE.getFullYear();
  return Array.from({ length: end - start + 1 }, (_, i) => end - i);
}

export function isBirthMonthDisabled(
  year: number,
  month: number,
  today: Date,
): boolean {
  const minYear = PROFILE_BIRTH_MIN_DATE.getFullYear();
  const minMonth = PROFILE_BIRTH_MIN_DATE.getMonth();
  if (year < minYear || year > today.getFullYear()) return true;
  if (year === minYear && month < minMonth) return true;
  if (year === today.getFullYear() && month > today.getMonth()) return true;
  return false;
}

export function clampBirthFocusedMonth(focused: Date, today: Date): Date {
  let year = focused.getFullYear();
  let month = focused.getMonth();
  const minYear = PROFILE_BIRTH_MIN_DATE.getFullYear();
  const minMonth = PROFILE_BIRTH_MIN_DATE.getMonth();
  if (year < minYear || (year === minYear && month < minMonth)) {
    year = minYear;
    month = minMonth;
  }
  if (year > today.getFullYear() || (year === today.getFullYear() && month > today.getMonth())) {
    year = today.getFullYear();
    month = today.getMonth();
  }
  return new Date(year, month, 1);
}
