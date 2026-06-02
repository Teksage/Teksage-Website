"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import {
  CONSULTATION_SLOTS_ASSETS,
  CONSULTATION_SLOTS_LAYOUT,
  CONSULTATION_SLOTS_SCREEN,
} from "@/lib/constants/consultation-slots";
import {
  canNavigatePrevMonth,
  daysInMonth,
  firstWeekdayOffset,
  isPastCalendarDay,
  isSameCalendarDay,
  monthYearLabel,
} from "@/lib/consultation-calendar";
import { cn } from "@/lib/utils";
import type { ConsultationSlotsCalendarProps } from "@/types/ui/consultation";

export function ConsultationSlotsCalendar({
  focusedMonth,
  selectedDate,
  today,
  onFocusedMonthChange,
  onSelectDate,
}: ConsultationSlotsCalendarProps) {
  const CS = useI18nConstants(CONSULTATION_SLOTS_SCREEN);
  const year = focusedMonth.getFullYear();
  const month = focusedMonth.getMonth();
  const totalDays = daysInMonth(year, month);
  const offset = firstWeekdayOffset(year, month);
  const canPrev = canNavigatePrevMonth(focusedMonth, today);

  const cells: Array<{ day: number } | null> = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: totalDays }, (_, i) => ({ day: i + 1 })),
  ];

  return (
    <section>
      <Image
        src={CONSULTATION_SLOTS_ASSETS.calendarLine}
        alt=""
        width={280}
        height={4}
        unoptimized
        className={CONSULTATION_SLOTS_LAYOUT.calendarLine}
        aria-hidden
      />
      <div className={CONSULTATION_SLOTS_LAYOUT.monthRow}>
        <button
          type="button"
          disabled={!canPrev}
          onClick={() => onFocusedMonthChange(new Date(year, month - 1, 1))}
          className={cn(
            CONSULTATION_SLOTS_LAYOUT.monthNavBtn,
            !canPrev && "opacity-30"
          )}
          aria-label="Previous month"
        >
          <Image
            src={CONSULTATION_SLOTS_ASSETS.calendarArrow}
            alt=""
            width={20}
            height={20}
            unoptimized
            aria-hidden
          />
        </button>
        <span className={CONSULTATION_SLOTS_LAYOUT.monthLabel}>
          {monthYearLabel(focusedMonth)}
        </span>
        <button
          type="button"
          onClick={() => onFocusedMonthChange(new Date(year, month + 1, 1))}
          className={CONSULTATION_SLOTS_LAYOUT.monthNavBtn}
          aria-label="Next month"
        >
          <Image
            src={CONSULTATION_SLOTS_ASSETS.calendarArrow}
            alt=""
            width={20}
            height={20}
            unoptimized
            className="rotate-180"
            aria-hidden
          />
        </button>
      </div>
      <Image
        src={CONSULTATION_SLOTS_ASSETS.calendarLine}
        alt=""
        width={280}
        height={4}
        unoptimized
        className={CONSULTATION_SLOTS_LAYOUT.calendarLine}
        aria-hidden
      />
      <div className={CONSULTATION_SLOTS_LAYOUT.weekdayRow}>
        {CS.weekdays.map((d) => (
          <span key={d} className={CONSULTATION_SLOTS_LAYOUT.weekday}>
            {d}
          </span>
        ))}
      </div>
      <div className={CONSULTATION_SLOTS_LAYOUT.dayGrid}>
        {cells.map((cell, index) => {
          if (!cell) {
            return <span key={`empty-${index}`} />;
          }
          const date = new Date(year, month, cell.day);
          const isPast = isPastCalendarDay(date, today);
          const isSelected = isSameCalendarDay(date, selectedDate);
          return (
            <button
              key={cell.day}
              type="button"
              disabled={isPast}
              onClick={() => onSelectDate(date)}
              className={cn(
                CONSULTATION_SLOTS_LAYOUT.dayCell,
                isSelected
                  ? CONSULTATION_SLOTS_LAYOUT.dayCellSelected
                  : CONSULTATION_SLOTS_LAYOUT.dayCellDefault,
                isPast && CONSULTATION_SLOTS_LAYOUT.dayCellDisabled
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
