import { fetchAstrologerSlots } from "@/lib/services/consultation";
import { calendarDayOffset, isSlotInPast, toIsoDate } from "@/lib/consultation-calendar";
import {
  CONSULTATION_SLOTS_DAY_COUNT,
  CONSULTATION_SLOTS_PREFETCH_DAY_COUNT,
} from "@/lib/constants/consultation-slots";
import type {
  ConsultationDaySlotSummary,
  ConsultationSlot,
} from "@/types/consultation";

export function summarizeDaySlots(slots: ConsultationSlot[]): ConsultationDaySlotSummary {
  const total = slots.length;
  if (total === 0) {
    return { open: 0, total: 0, status: "none" };
  }

  const upcoming = slots.filter((s) => !isSlotInPast(s));
  if (upcoming.length === 0) {
    return { open: 0, total, status: "check_later" };
  }

  const open = upcoming.filter((s) => !s.event_booked).length;
  if (open > 0) {
    return { open, total, status: "open" };
  }

  return { open: 0, total, status: "full" };
}

export async function fetchDaySlotSummariesByDate(
  astrologerId: number,
  days: Date[]
): Promise<Record<string, ConsultationDaySlotSummary>> {
  const pairs = await Promise.all(
    days.map(async (day) => {
      const iso = toIsoDate(day);
      try {
        const slots = await fetchAstrologerSlots(astrologerId, iso);
        return [iso, summarizeDaySlots(slots)] as const;
      } catch {
        return [iso, { open: 0, total: 0, status: "none" as const }] as const;
      }
    })
  );
  return Object.fromEntries(pairs);
}

export function buildUpcomingDays(
  today: Date,
  count: number,
  startOffset = 0
): Date[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + startOffset + i);
    return d;
  });
}

export function maxDateWindowOffset(): number {
  return Math.max(
    0,
    CONSULTATION_SLOTS_PREFETCH_DAY_COUNT - CONSULTATION_SLOTS_DAY_COUNT
  );
}

/** Keep the selected day inside the visible 7-day window when possible. */
export function windowOffsetForDate(today: Date, target: Date): number {
  const dayIndex = calendarDayOffset(today, target);
  if (dayIndex <= 0) return 0;
  const maxOffset = maxDateWindowOffset();
  const preferred = Math.max(0, dayIndex - CONSULTATION_SLOTS_DAY_COUNT + 1);
  return Math.min(preferred, maxOffset);
}
