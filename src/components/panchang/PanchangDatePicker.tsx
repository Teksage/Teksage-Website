"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useI18nConstants } from "@/hooks/useT";
import {
  PANCHANG_DATE,
  PANCHANG_DATE_LAYOUT,
} from "@/lib/constants/panchang-date";
import { PANCHANG_SCREEN } from "@/lib/constants/panchang-screen";
import {
  canNavigatePanchangNextMonth,
  canNavigatePanchangPrevMonth,
  isDateInPanchangRange,
  isSameCalendarDay,
} from "@/lib/panchang-calendar";
import {
  daysInMonth,
  firstWeekdayOffset,
  monthYearLabel,
} from "@/lib/consultation-calendar";
import { cn } from "@/lib/utils";
import type { PanchangDatePickerProps } from "@/types/ui/panchang-date";

function MonthNavChevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className={PANCHANG_DATE_LAYOUT.monthNavChevron}
      aria-hidden
    >
      <path
        d={direction === "prev" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PanchangDatePicker({
  open,
  onOpenChange,
  selectedDate,
  today = new Date(),
  onSelectDate,
}: PanchangDatePickerProps) {
  const P = useI18nConstants(PANCHANG_SCREEN);
  const L = PANCHANG_DATE_LAYOUT;
  const [mounted, setMounted] = useState(false);
  const [focusedMonth, setFocusedMonth] = useState(
    () => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    setFocusedMonth(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
    );
  }, [open, selectedDate]);

  if (!open || !mounted) return null;

  const year = focusedMonth.getFullYear();
  const month = focusedMonth.getMonth();
  const totalDays = daysInMonth(year, month);
  const offset = firstWeekdayOffset(year, month);
  const canPrev = canNavigatePanchangPrevMonth(focusedMonth, today);
  const canNext = canNavigatePanchangNextMonth(focusedMonth, today);
  const showToday = !isSameCalendarDay(selectedDate, today);

  const cells: Array<{ day: number } | null> = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: totalDays }, (_, i) => ({ day: i + 1 })),
  ];

  function pick(date: Date) {
    onSelectDate(date);
    onOpenChange(false);
  }

  return createPortal(
    <div
      className={L.overlay}
      role="dialog"
      aria-modal
      aria-labelledby="panchang-date-picker-title"
      onClick={() => onOpenChange(false)}
    >
      <div className={L.sheet} onClick={(e) => e.stopPropagation()}>
        <p id="panchang-date-picker-title" className={L.dialogTitle}>
          {PANCHANG_DATE.dialogTitle}
        </p>

        <div className={L.monthRow}>
          <button
            type="button"
            disabled={!canPrev}
            onClick={() => setFocusedMonth(new Date(year, month - 1, 1))}
            className={cn(L.monthNavBtn, !canPrev && L.monthNavBtnDisabled)}
            aria-label={PANCHANG_DATE.prevMonthAria}
          >
            <MonthNavChevron direction="prev" />
          </button>
          <span className={L.monthLabel}>{monthYearLabel(focusedMonth)}</span>
          <button
            type="button"
            disabled={!canNext}
            onClick={() => setFocusedMonth(new Date(year, month + 1, 1))}
            className={cn(L.monthNavBtn, !canNext && L.monthNavBtnDisabled)}
            aria-label={PANCHANG_DATE.nextMonthAria}
          >
            <MonthNavChevron direction="next" />
          </button>
        </div>

        <div className={L.weekdayRow}>
          {PANCHANG_DATE.weekdays.map((label) => (
            <span key={label} className={L.weekday}>
              {label}
            </span>
          ))}
        </div>

        <div className={L.dayGrid}>
          {cells.map((cell, idx) => {
            if (!cell) {
              return <span key={`empty-${idx}`} aria-hidden />;
            }
            const date = new Date(year, month, cell.day);
            const inRange = isDateInPanchangRange(date, today);
            const isSelected = isSameCalendarDay(date, selectedDate);
            const isToday = isSameCalendarDay(date, today);

            return (
              <button
                key={toIsoKey(date)}
                type="button"
                disabled={!inRange}
                onClick={() => pick(date)}
                className={cn(
                  L.dayCell,
                  isSelected ? L.dayCellSelected : L.dayCellDefault,
                  !inRange && L.dayCellDisabled,
                  isToday && !isSelected && L.dayCellTodayRing
                )}
              >
                {cell.day}
              </button>
            );
          })}
        </div>

        {showToday ? (
          <div className={L.todayBtnWrap}>
            <button type="button" className={L.todayBtn} onClick={() => pick(today)}>
              {P.todayLabel}
            </button>
          </div>
        ) : null}
      </div>
    </div>,
    document.body
  );
}

function toIsoKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}
