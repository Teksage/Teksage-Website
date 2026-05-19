"use client";

import Image from "next/image";
import { Loader } from "@/components/common/Loader";
import {
  CONSULTATION_SLOTS_ASSETS,
  CONSULTATION_SLOTS_LAYOUT,
  CONSULTATION_SLOTS_SCREEN,
} from "@/lib/constants/consultation-slots";
import { formatSlotTime12, isSlotInPast } from "@/lib/consultation-calendar";
import { cn } from "@/lib/utils";
import type { ConsultationSlotsAvailabilityProps } from "@/types/ui/consultation";

export function ConsultationSlotsAvailability({
  slots,
  loading,
  selected,
  onSelect,
}: ConsultationSlotsAvailabilityProps) {
  if (loading) {
    return (
      <div className={CONSULTATION_SLOTS_LAYOUT.loaderBox}>
        <Loader />
      </div>
    );
  }

  const upcoming = slots
    .filter((s) => !isSlotInPast(s))
    .sort(
      (a, b) =>
        new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime()
    );

  if (upcoming.length === 0) {
    return (
      <p className={CONSULTATION_SLOTS_LAYOUT.emptyOnGreen}>
        {CONSULTATION_SLOTS_SCREEN.slotsEmpty}
      </p>
    );
  }

  const slotCount = upcoming.length;

  return (
    <article className={CONSULTATION_SLOTS_LAYOUT.availabilityCard}>
      <div className={CONSULTATION_SLOTS_LAYOUT.availabilityHeader}>
        <p className={CONSULTATION_SLOTS_LAYOUT.availabilityTitle}>
          {CONSULTATION_SLOTS_SCREEN.availabilityTitle}
        </p>
        <p className={CONSULTATION_SLOTS_LAYOUT.availabilityMeta}>
          {slotCount} {CONSULTATION_SLOTS_SCREEN.slotsMetaSuffix}
        </p>
      </div>
      <Image
        src={CONSULTATION_SLOTS_ASSETS.calendarLine}
        alt=""
        width={320}
        height={4}
        unoptimized
        className={CONSULTATION_SLOTS_LAYOUT.cardDivider}
        aria-hidden
      />
      <div className={CONSULTATION_SLOTS_LAYOUT.slotGrid}>
        {upcoming.map((slot) => {
          const active =
            selected?.start_datetime === slot.start_datetime &&
            selected?.end_datetime === slot.end_datetime;
          const booked = slot.event_booked;
          return (
            <button
              key={`${slot.start_datetime}-${slot.end_datetime}`}
              type="button"
              onClick={() => onSelect(slot)}
              className={cn(
                CONSULTATION_SLOTS_LAYOUT.slotChip,
                active && !booked && CONSULTATION_SLOTS_LAYOUT.slotChipSelected,
                booked && CONSULTATION_SLOTS_LAYOUT.slotChipBooked
              )}
            >
              {formatSlotTime12(slot.start_datetime)}
            </button>
          );
        })}
      </div>
    </article>
  );
}
