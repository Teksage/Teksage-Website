"use client";

import { useI18nConstants } from "@/hooks/useT";
import {
  PROFILE_DATE_PICKER,
  PROFILE_DATE_PICKER_LAYOUT,
} from "@/lib/constants/profile-date-picker";
import { formatProfileDobForDisplay, formatProfileDobToIso } from "@/lib/profile-birth-date-format";
import {
  canNavigateNextBirthMonth,
  canNavigatePrevBirthMonth,
  clampBirthFocusedMonth,
  daysInMonth,
  firstWeekdayOffset,
  getBirthYearOptions,
  isBirthDayDisabled,
  isBirthMonthDisabled,
  isSameCalendarDay,
} from "@/lib/profile-birth-calendar";
import { cn } from "@/lib/utils";
import type { ProfileBirthDateCalendarProps } from "@/types";

export function ProfileBirthDateCalendar({
  focusedMonth,
  selectedDate,
  today,
  onFocusedMonthChange,
  onSelectDate,
}: ProfileBirthDateCalendarProps) {
  const P = useI18nConstants(PROFILE_DATE_PICKER);
  const year = focusedMonth.getFullYear();
  const month = focusedMonth.getMonth();
  const totalDays = daysInMonth(year, month);
  const offset = firstWeekdayOffset(year, month);
  const canPrev = canNavigatePrevBirthMonth(focusedMonth);
  const canNext = canNavigateNextBirthMonth(focusedMonth, today);
  const years = getBirthYearOptions(today);

  const cells: Array<{ day: number } | null> = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: totalDays }, (_, i) => ({ day: i + 1 })),
  ];

  function setMonth(nextMonth: number) {
    onFocusedMonthChange(
      clampBirthFocusedMonth(new Date(year, nextMonth, 1), today),
    );
  }

  function setYear(nextYear: number) {
    onFocusedMonthChange(
      clampBirthFocusedMonth(new Date(nextYear, month, 1), today),
    );
  }

  return (
    <section aria-label={P.dialogTitle}>
      <p className={PROFILE_DATE_PICKER_LAYOUT.preview}>
        {formatProfileDobForDisplay(formatProfileDobToIso(selectedDate))}
      </p>

      <div className={PROFILE_DATE_PICKER_LAYOUT.selectRow}>
        <select
          aria-label={P.monthAria}
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className={PROFILE_DATE_PICKER_LAYOUT.select}
        >
          {P.months.map((label, index) => (
            <option
              key={label}
              value={index}
              disabled={isBirthMonthDisabled(year, index, today)}
            >
              {label}
            </option>
          ))}
        </select>
        <select
          aria-label={P.yearAria}
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className={PROFILE_DATE_PICKER_LAYOUT.select}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div className={PROFILE_DATE_PICKER_LAYOUT.navRow}>
        <button
          type="button"
          disabled={!canPrev}
          onClick={() => onFocusedMonthChange(new Date(year, month - 1, 1))}
          className={PROFILE_DATE_PICKER_LAYOUT.monthNavBtn}
          aria-label={P.prevMonthAria}
        >
          ‹
        </button>
        <span className={PROFILE_DATE_PICKER_LAYOUT.monthLabel}>
          {P.months[month]} {year}
        </span>
        <button
          type="button"
          disabled={!canNext}
          onClick={() => onFocusedMonthChange(new Date(year, month + 1, 1))}
          className={PROFILE_DATE_PICKER_LAYOUT.monthNavBtn}
          aria-label={P.nextMonthAria}
        >
          ›
        </button>
      </div>

      <div className={PROFILE_DATE_PICKER_LAYOUT.divider} />

      <div className={PROFILE_DATE_PICKER_LAYOUT.weekdayRow}>
        {P.weekdays.map((d) => (
          <span key={d} className={PROFILE_DATE_PICKER_LAYOUT.weekday}>
            {d}
          </span>
        ))}
      </div>
      <div className={PROFILE_DATE_PICKER_LAYOUT.dayGrid}>
        {cells.map((cell, index) => {
          if (!cell) {
            return <span key={`empty-${index}`} />;
          }
          const date = new Date(year, month, cell.day);
          const disabled = isBirthDayDisabled(date, today);
          const isSelected = isSameCalendarDay(date, selectedDate);
          return (
            <button
              key={cell.day}
              type="button"
              disabled={disabled}
              onClick={() => onSelectDate(date)}
              className={cn(
                PROFILE_DATE_PICKER_LAYOUT.dayCell,
                disabled
                  ? PROFILE_DATE_PICKER_LAYOUT.dayCellDisabled
                  : isSelected
                    ? PROFILE_DATE_PICKER_LAYOUT.dayCellSelected
                    : PROFILE_DATE_PICKER_LAYOUT.dayCellDefault,
              )}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </section>
  );
}
