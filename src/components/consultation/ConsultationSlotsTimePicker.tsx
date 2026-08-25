"use client";

import { cn } from "@/lib/utils";
import { CONSULTATION_SLOTS_LAYOUT, CONSULTATION_SLOTS_SCREEN } from "@/lib/constants/consultation-slots";
import { formatSlotTime12, isSlotInPast, isSameCalendarDay } from "@/lib/consultation-calendar";
import type { ConsultationSlot } from "@/types/consultation";

type Props = {
  slots: ConsultationSlot[];
  loading: boolean;
  selected: ConsultationSlot | null;
  selectedDate: Date;
  onSelect: (slot: ConsultationSlot) => void;
};

function slotHour(iso: string): number {
  return new Date(iso).getHours();
}

function groupSlots(slots: ConsultationSlot[]): {
  morning: ConsultationSlot[];
  afternoon: ConsultationSlot[];
  evening: ConsultationSlot[];
} {
  const upcoming = slots.filter((s) => !isSlotInPast(s));
  return {
    morning: upcoming.filter((s) => slotHour(s.start_datetime) < 12),
    afternoon: upcoming.filter((s) => slotHour(s.start_datetime) >= 12 && slotHour(s.start_datetime) < 17),
    evening: upcoming.filter((s) => slotHour(s.start_datetime) >= 17),
  };
}

function SlotGroup({ label, slots, selected, onSelect }: {
  label: string;
  slots: ConsultationSlot[];
  selected: ConsultationSlot | null;
  onSelect: (slot: ConsultationSlot) => void;
}) {
  if (!slots.length) return null;
  return (
    <div className={CONSULTATION_SLOTS_LAYOUT.timeGroup}>
      <p className={CONSULTATION_SLOTS_LAYOUT.timeGroupLabel}>{label}</p>
      <div className={CONSULTATION_SLOTS_LAYOUT.slotGrid}>
        {slots.map((slot) => {
          const isActive =
            selected?.start_datetime === slot.start_datetime &&
            selected?.end_datetime === slot.end_datetime;
          const booked = slot.event_booked;
          return (
            <button
              key={`${slot.start_datetime}-${slot.end_datetime}`}
              type="button"
              onClick={() => !booked && onSelect(slot)}
              disabled={booked}
              className={cn(
                CONSULTATION_SLOTS_LAYOUT.slotChip,
                isActive && !booked && CONSULTATION_SLOTS_LAYOUT.slotChipSelected,
                booked && CONSULTATION_SLOTS_LAYOUT.slotChipBooked
              )}
            >
              <span className="block">{formatSlotTime12(slot.start_datetime)}</span>
              <span className={cn("block text-[10px]", isActive && !booked ? "text-white/70" : "text-black/40")}>
                30 min
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ConsultationSlotsTimePicker({ slots, loading, selected, selectedDate, onSelect }: Props) {
  const CS = CONSULTATION_SLOTS_SCREEN;
  const { morning, afternoon, evening } = groupSlots(slots);
  const totalOpen = morning.length + afternoon.length + evening.length;

  const dayLabel = selectedDate.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className={CONSULTATION_SLOTS_LAYOUT.timeSectionTitle}>
          {CS.chooseTime} – {dayLabel}
        </h2>
        {!loading && totalOpen > 0 ? (
          <span className={CONSULTATION_SLOTS_LAYOUT.timeSectionCount}>
            {totalOpen} {CS.slotsOpen}
          </span>
        ) : null}
      </div>

      {loading ? (
        <div className={CONSULTATION_SLOTS_LAYOUT.loaderBox}>
          <div className="size-8 animate-spin rounded-full border-2 border-[var(--color-brand-primary)] border-t-transparent" />
        </div>
      ) : totalOpen === 0 ? (
        <p className={CONSULTATION_SLOTS_LAYOUT.slotsEmpty}>{CS.slotsEmpty}</p>
      ) : (
        <>
          <SlotGroup label={CS.morning} slots={morning} selected={selected} onSelect={onSelect} />
          <SlotGroup label={CS.afternoon} slots={afternoon} selected={selected} onSelect={onSelect} />
          <SlotGroup label={CS.evening} slots={evening} selected={selected} onSelect={onSelect} />
        </>
      )}
    </section>
  );
}
