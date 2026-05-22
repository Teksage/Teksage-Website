"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
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
  const CS = useI18nConstants(CONSULTATION_SLOTS_SCREEN);

  const upcoming = slots
    .filter((s) => !isSlotInPast(s))
    .sort(
      (a, b) =>
        new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime()
    );

  return (
    <div className={cn("relative", CONSULTATION_SLOTS_LAYOUT.loaderBox)}>
      {!loading && upcoming.length === 0 ? (
        <p className={CONSULTATION_SLOTS_LAYOUT.emptyOnGreen}>{CS.slotsEmpty}</p>
      ) : null}
      {!loading && upcoming.length > 0 ? (
        <article className={CONSULTATION_SLOTS_LAYOUT.availabilityCard}>
          <div className={CONSULTATION_SLOTS_LAYOUT.availabilityHeader}>
            <p className={CONSULTATION_SLOTS_LAYOUT.availabilityTitle}>
              {CS.availabilityTitle}
            </p>
            <p className={CONSULTATION_SLOTS_LAYOUT.availabilityMeta}>
              {upcoming.length} {CS.slotsMetaSuffix}
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
      ) : null}
      <LoadingOverlay open={loading} />
    </div>
  );
}
