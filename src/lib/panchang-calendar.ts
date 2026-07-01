import { PANCHANG_DATE } from "@/lib/constants/panchang-date";
import {
  isSameCalendarDay,
  startOfDay,
  toIsoDate,
} from "@/lib/consultation-calendar";

export { toIsoDate, isSameCalendarDay, startOfDay };

export function panchangMinDate(today: Date): Date {
  const d = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  d.setDate(d.getDate() - PANCHANG_DATE.rangeDays);
  return d;
}

export function panchangMaxDate(today: Date): Date {
  const d = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  d.setDate(d.getDate() + PANCHANG_DATE.rangeDays);
  return d;
}

export function isDateInPanchangRange(day: Date, today: Date): boolean {
  const t = startOfDay(day).getTime();
  return (
    t >= startOfDay(panchangMinDate(today)).getTime() &&
    t <= startOfDay(panchangMaxDate(today)).getTime()
  );
}

export function canNavigatePanchangPrevMonth(focused: Date, today: Date): boolean {
  const min = panchangMinDate(today);
  const prev = new Date(focused.getFullYear(), focused.getMonth() - 1, 1);
  const minMonth = new Date(min.getFullYear(), min.getMonth(), 1);
  return prev.getTime() >= minMonth.getTime();
}

export function canNavigatePanchangNextMonth(focused: Date, today: Date): boolean {
  const max = panchangMaxDate(today);
  const next = new Date(focused.getFullYear(), focused.getMonth() + 1, 1);
  const maxMonth = new Date(max.getFullYear(), max.getMonth(), 1);
  return next.getTime() <= maxMonth.getTime();
}

export function shiftPanchangDate(day: Date, deltaDays: number, today: Date): Date | null {
  const next = new Date(day.getFullYear(), day.getMonth(), day.getDate() + deltaDays);
  return isDateInPanchangRange(next, today) ? next : null;
}
