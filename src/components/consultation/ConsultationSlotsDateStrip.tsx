"use client";

import { cn } from "@/lib/utils";
import {
  CONSULTATION_SLOTS_DAY_COUNT,
  CONSULTATION_SLOTS_LAYOUT,
  CONSULTATION_SLOTS_LOW_OPEN_COUNT,
  CONSULTATION_SLOTS_SCREEN,
} from "@/lib/constants/consultation-slots";
import { isSameCalendarDay, isPastCalendarDay, toIsoDate } from "@/lib/consultation-calendar";
import { buildUpcomingDays } from "@/lib/consultation-slots-counts";
import type { ConsultationDaySlotStatus } from "@/types/consultation";
import type { ConsultationSlotsDateStripProps } from "@/types/ui/consultation";

function dayLabel(
  status: ConsultationDaySlotStatus | "loading",
  open: number
): string {
  const CS = CONSULTATION_SLOTS_SCREEN;
  if (status === "loading") return CS.slotsLoading;
  if (status === "open") return `${open} ${CS.slotsSuffix}`;
  if (status === "full") return CS.full;
  if (status === "none") return CS.noSlotsDay;
  return CS.checkLater;
}

function labelClass(
  status: ConsultationDaySlotStatus | "loading",
  isSelected: boolean,
  open: number
): string {
  if (isSelected) return CONSULTATION_SLOTS_LAYOUT.dateSlotsLabelSel;
  if (status === "loading") return CONSULTATION_SLOTS_LAYOUT.dateSlotsLabelLoading;
  if (status === "open") {
    return open < CONSULTATION_SLOTS_LOW_OPEN_COUNT
      ? CONSULTATION_SLOTS_LAYOUT.dateSlotsLabelLow
      : CONSULTATION_SLOTS_LAYOUT.dateSlotsLabelAvail;
  }
  if (status === "full") return CONSULTATION_SLOTS_LAYOUT.dateSlotsLabelFull;
  if (status === "none") return CONSULTATION_SLOTS_LAYOUT.dateSlotsLabelNone;
  return CONSULTATION_SLOTS_LAYOUT.dateSlotsLabelCheckLater;
}

function isMutedDay(
  isPast: boolean,
  status: ConsultationDaySlotStatus | "loading",
  isSelected: boolean
): boolean {
  if (isSelected) return false;
  if (isPast) return true;
  return status === "full" || status === "none" || status === "check_later";
}

export function ConsultationSlotsDateStrip({
  selectedDate,
  today,
  windowOffset,
  canWindowPrev,
  canWindowNext,
  slotSummariesByDate,
  countsLoading = false,
  onSelectDate,
  onWindowPrev,
  onWindowNext,
}: ConsultationSlotsDateStripProps) {
  const CS = CONSULTATION_SLOTS_SCREEN;
  const days = buildUpcomingDays(today, CONSULTATION_SLOTS_DAY_COUNT, windowOffset);
  const monthHint = selectedDate.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={CONSULTATION_SLOTS_LAYOUT.panelCard}>
      <div className={CONSULTATION_SLOTS_LAYOUT.dateStripHead}>
        <div className={CONSULTATION_SLOTS_LAYOUT.dateStripHeadMain}>
          <h2 className={CONSULTATION_SLOTS_LAYOUT.dateStripTitle}>{CS.pickDate}</h2>
          <p className={CONSULTATION_SLOTS_LAYOUT.dateStripHint}>
            {monthHint} · {CS.timesInIST}
          </p>
        </div>
        <div className={CONSULTATION_SLOTS_LAYOUT.dateStripNavRow}>
          <button
            type="button"
            onClick={onWindowPrev}
            disabled={!canWindowPrev}
            className={CONSULTATION_SLOTS_LAYOUT.dateStripNavBtn}
            aria-label={CS.scrollDatesBack}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={onWindowNext}
            disabled={!canWindowNext}
            className={CONSULTATION_SLOTS_LAYOUT.dateStripNavBtn}
            aria-label={CS.scrollDatesForward}
          >
            ›
          </button>
        </div>
      </div>
      <div className={CONSULTATION_SLOTS_LAYOUT.dateStrip} role="list">
        {days.map((d) => {
          const isPast = isPastCalendarDay(d, today);
          const isSelected = isSameCalendarDay(d, selectedDate);
          const iso = toIsoDate(d);
          const summary = slotSummariesByDate[iso];
          const status: ConsultationDaySlotStatus | "loading" = countsLoading
            ? "loading"
            : (summary?.status ?? "none");
          const open = summary?.open ?? 0;
          const label = isPast ? CS.full : dayLabel(status, open);
          const muted = isMutedDay(isPast, status, isSelected);

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
              <span
                className={cn(
                  CONSULTATION_SLOTS_LAYOUT.dateDayLabel,
                  isSelected
                    ? CONSULTATION_SLOTS_LAYOUT.dateDayLabelSelected
                    : muted
                      ? CONSULTATION_SLOTS_LAYOUT.dateDayLabelMuted
                      : CONSULTATION_SLOTS_LAYOUT.dateDayLabelDefault
                )}
              >
                {CS.weekdays[d.getDay()]}
              </span>
              <span
                className={cn(
                  CONSULTATION_SLOTS_LAYOUT.dateDateNum,
                  isSelected
                    ? CONSULTATION_SLOTS_LAYOUT.dateDateNumSelected
                    : muted && CONSULTATION_SLOTS_LAYOUT.dateDateNumMuted
                )}
              >
                {d.getDate()}
              </span>
              <span
                className={cn(
                  CONSULTATION_SLOTS_LAYOUT.dateSlotsLabel,
                  isPast
                    ? CONSULTATION_SLOTS_LAYOUT.dateSlotsLabelFull
                    : labelClass(status, isSelected, open)
                )}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
