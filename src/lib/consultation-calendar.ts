/** Calendar helpers — mirrors Flutter `userBookingPage.dart` date grid. */

export function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function isSameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function calendarDayOffset(from: Date, to: Date): number {
  const ms = startOfDay(to).getTime() - startOfDay(from).getTime();
  return Math.round(ms / 86_400_000);
}

export function isPastCalendarDay(day: Date, today: Date): boolean {
  return startOfDay(day).getTime() < startOfDay(today).getTime();
}

export function canNavigatePrevMonth(focused: Date, today: Date): boolean {
  const prev = new Date(focused.getFullYear(), focused.getMonth() - 1, 1);
  const nowMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  return prev >= nowMonth;
}

export function monthYearLabel(focused: Date): string {
  return focused.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function firstWeekdayOffset(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function formatSlotTime12(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function isSlotInPast(slot: { start_datetime: string }): boolean {
  return new Date(slot.start_datetime).getTime() < Date.now();
}
