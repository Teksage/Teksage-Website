"use client";

import { MarathonSlotStrip } from "@/components/marathon/MarathonSlotStrip";
import { useI18nConstants, useT } from "@/hooks/useT";
import { useViewerTimezone, useViewerTimezoneHint } from "@/hooks/useViewerTimezone";
import { bcp47FromAppLocale } from "@/lib/i18n/locale";
import { MARATHON_COPY } from "@/lib/constants/marathon";
import { MARATHON_FLOW_COPY } from "@/lib/constants/marathon-flow-copy";
import { MARATHON_FLOW_UI } from "@/lib/constants/marathon-flow-ui";
import { marathonShortDay } from "@/lib/marathon-display";
import type { MarathonEvent } from "@/types/marathon";

export function MarathonCheckoutTimeCard({
  event,
  slotId,
  bookedSlotIds,
  onSelect,
}: {
  event: MarathonEvent;
  slotId: number;
  bookedSlotIds: number[];
  onSelect: (id: number) => void;
}) {
  const copy = useI18nConstants(MARATHON_COPY);
  const flow = useI18nConstants(MARATHON_FLOW_COPY);
  const { locale } = useT();
  const zone = useViewerTimezone();
  const timeHint = useViewerTimezoneHint(copy.timesInIST, copy.timesInYourZone);
  const ui = MARATHON_FLOW_UI;
  const slot = event.slots.find((item) => item.id === slotId) ?? event.slots[0];
  const when = marathonShortDay(slot?.starts_at ?? event.starts_at, zone, bcp47FromAppLocale(locale));

  return (
    <section className={ui.card}>
      <h2 className={ui.timeTitle}>{flow.chooseTime.replace("{when}", when)}</h2>
      <p className={ui.sectionHint}>
        {flow.slotLength.replace("{minutes}", copy.minutes)} {timeHint}
      </p>
      <MarathonSlotStrip event={event} slotId={slotId} bookedSlotIds={bookedSlotIds} onSelect={onSelect} />
    </section>
  );
}
