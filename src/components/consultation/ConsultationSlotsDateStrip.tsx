"use client";

import { cn } from "@/lib/utils";
import { CONSULTATION_SLOTS_LAYOUT, CONSULTATION_SLOTS_SCREEN } from "@/lib/constants/consultation-slots";
import { isSameCalendarDay, isPastCalendarDay } from "@/lib/consultation-calendar";

type Props = {
  selectedDate: Date;
  today: Date;
  onSelectDate: (d: Date) => void;
};

/** 14 days starting today */
function buildDays(today: Date): Date[] {
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });
}

export function ConsultationSlotsDateStrip({ selectedDate, today, onSelectDate }: Props) {
  const CS = CONSULTATION_SLOTS_SCREEN;
  const days = buildDays(today);
  const month = CS.months[selectedDate.getMonth()];
  const year = selectedDate.getFullYear();

  return (
    <section className={CONSULTATION_SLOTS_LAYOUT.dateStripSection}>
      <div className={CONSULTATION_SLOTS_LAYOUT.dateStripLabel}>
        <h2 className={CONSULTATION_SLOTS_LAYOUT.dateStripTitle}>{CS.pickDate}</h2>
        <span className={CONSULTATION_SLOTS_LAYOUT.dateStripHint}>
          {month} {year} · {CS.timesInIST}
        </span>
      </div>
      <div className={CONSULTATION_SLOTS_LAYOUT.dateStrip} role="list">
        {days.map((d) => {
          const isPast = isPastCalendarDay(d, today);
          const isSelected = isSameCalendarDay(d, selectedDate);
          const dayName = CS.weekdays[d.getDay()];
          return (
            <button
              key={d.toISOString()}
              type="button"
              role="listitem"
              disabled={isPast}
              onClick={() => onSelectDate(d)}
              className={cn(
                CONSULTATION_SLOTS_LAYOUT.dateCell,
                isSelected
                  ? CONSULTATION_SLOTS_LAYOUT.dateCellSelected
                  : CONSULTATION_SLOTS_LAYOUT.dateCellDefault,
                isPast && CONSULTATION_SLOTS_LAYOUT.dateCellDisabled
              )}
            >
              <span className={cn(
                CONSULTATION_SLOTS_LAYOUT.dateDayLabel,
                isSelected ? "text-white/80" : "text-black/50"
              )}>
                {dayName}
              </span>
              <span className={CONSULTATION_SLOTS_LAYOUT.dateDateNum}>
                {d.getDate()}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
