"use client";

import { useI18nConstants, useT } from "@/hooks/useT";
import { useViewerTimezone } from "@/hooks/useViewerTimezone";
import { bcp47FromAppLocale } from "@/lib/i18n/locale";
import { MARATHON_LOW_SEATS } from "@/lib/constants/marathon-flow-copy";
import { MARATHON_FLOW_UI } from "@/lib/constants/marathon-flow-ui";
import { MARATHON_COPY } from "@/lib/constants/marathon";
import { marathonDateParts } from "@/lib/marathon-display";
import { cn } from "@/lib/utils";
import type { MarathonSlotStripProps } from "@/types/marathon";

export function MarathonSlotStrip({
  event,
  slotId,
  onSelect,
  bookedSlotIds = [],
}: MarathonSlotStripProps) {
  const copy = useI18nConstants(MARATHON_COPY);
  const { locale, t } = useT();
  const localeTag = bcp47FromAppLocale(locale);
  const viewerZone = useViewerTimezone();
  const ui = MARATHON_FLOW_UI;
  const mine = new Set(bookedSlotIds.map((id) => Number(id)).filter((id) => Number.isFinite(id) && id > 0));

  return (
    <div className={ui.slotRow}>
      {event.slots.map((slot) => {
        const start = marathonDateParts(slot.starts_at, viewerZone, localeTag);
        const id = Number(slot.id);
        const mineBooked = mine.has(id);
        const full = Number(slot.seats_left) === 0;
        const shut = !event.booking_open || Boolean(event.admin_ended);
        const taken = mineBooked || full;
        const open = !taken && !shut;
        const selected = Number(slotId) === id && open;
        const low = open && !selected && Number(slot.seats_left) <= MARATHON_LOW_SEATS;
        const label = taken ? copy.booked : shut ? t("Closed") : copy.seatsLeft.replace("{count}", String(slot.seats_left));
        const clock = start.time.replace(/\b(AM|PM)\b/g, (mark) => mark.toLowerCase());
        return (
          <button
            key={slot.id}
            type="button"
            disabled={!open}
            className={cn(ui.slot, selected ? ui.slotOn : taken ? ui.slotTaken : low ? ui.slotLow : ui.slotOff, !open && !taken && "cursor-default opacity-60")}
            onClick={() => onSelect(id)}
          >
            <span className={ui.slotTime}>{clock}</span>
            <span className={selected ? ui.seatsOn : taken ? ui.seatsTaken : low ? ui.seatsLow : ui.seatsOff}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
