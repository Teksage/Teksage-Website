"use client";

import { useI18nConstants, useT } from "@/hooks/useT";
import { bcp47FromAppLocale } from "@/lib/i18n/locale";
import { MARATHON_BANNER_UI } from "@/lib/constants/marathon-banner";
import { MARATHON_COPY, MARATHON_PAGE } from "@/lib/constants/marathon";
import { marathonDateParts } from "@/lib/marathon-display";
import { cn } from "@/lib/utils";
import type { MarathonSlotStripProps } from "@/types/marathon";

export function MarathonSlotStrip({ event, slotId, onSelect }: MarathonSlotStripProps) {
  const copy = useI18nConstants(MARATHON_COPY);
  const { locale, t } = useT();
  const localeTag = bcp47FromAppLocale(locale);
  const ui = MARATHON_PAGE;
  const tone = MARATHON_BANNER_UI;

  return (
    <div className={ui.slotRow}>
      {event.slots.map((slot) => {
        const start = marathonDateParts(slot.starts_at, event.timezone, localeTag);
        const full = slot.seats_left === 0;
        const shut = !event.booking_open || Boolean(event.admin_ended);
        const open = !full && !shut;
        const selected = slotId === slot.id && open;
        const label = full ? copy.booked : shut ? t("Closed") : copy.seatsLeft.replace("{count}", String(slot.seats_left));
        const labelClass = full ? tone.slotBooked : shut ? tone.slotClosed : ui.slotLeft;
        const boxClass = full ? tone.slotBoxBooked : shut ? tone.slotBoxClosed : "";
        return (
          <button
            key={slot.id}
            type="button"
            disabled={!open}
            className={cn(ui.slotBox, boxClass, selected && ui.slotSelected)}
            onClick={() => onSelect(slot.id)}
          >
            {selected ? (
              <span className={ui.slotCheck} aria-hidden>
                <svg viewBox="0 0 24 24" className="size-3" fill="none">
                  <path d="M6 12.5l4 4 8-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            ) : null}
            <span className={ui.slotTime}>{start.time}</span>
            <span className={labelClass}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
