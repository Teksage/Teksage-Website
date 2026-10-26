"use client";

import type { ReactNode } from "react";
import { useI18nConstants, useT } from "@/hooks/useT";
import { useViewerTimezone } from "@/hooks/useViewerTimezone";
import { bcp47FromAppLocale } from "@/lib/i18n/locale";
import { MarathonRegisterTimer } from "@/components/marathon/MarathonRegisterTimer";
import { MARATHON_COPY } from "@/lib/constants/marathon";
import { MARATHON_COMPARE_AT_INR, MARATHON_FLOW_COPY } from "@/lib/constants/marathon-flow-copy";
import { MARATHON_FLOW_UI } from "@/lib/constants/marathon-flow-ui";
import { marathonDateParts, marathonDisplayName, marathonListOffer, marathonOpenSlotCount, marathonTimeRange } from "@/lib/marathon-display";
import { cn } from "@/lib/utils";
import type { MarathonEvent } from "@/types/marathon";

export function MarathonEventFact({ event, children }: { event: MarathonEvent; children?: ReactNode }) {
  const copy = useI18nConstants(MARATHON_COPY);
  const flow = useI18nConstants(MARATHON_FLOW_COPY);
  const { locale, t } = useT();
  const localeTag = bcp47FromAppLocale(locale);
  const zone = useViewerTimezone();
  const ui = MARATHON_FLOW_UI;
  const when = marathonDateParts(event.starts_at, zone, localeTag);
  const end = marathonDateParts(event.ends_at, zone, localeTag);
  const category = event.categories[0];
  const open = event.booking_open && !event.admin_ended;
  const status = event.admin_ended ? copy.adminEnded : open ? flow.registrationOpen : copy.bookingClosed;
  const slots = flow.slotsAvailable.replace("{count}", String(marathonOpenSlotCount(event)));
  const offer = marathonListOffer(event.fee, MARATHON_COMPARE_AT_INR);

  return (
    <>
      <div className={ui.dotRow}>
        <p className={ui.categoryBadge}>
          <span className={open ? ui.dotMark : ui.dotOff} aria-hidden />
          <span className={cn(open ? ui.dotText : ui.dotMuted, "lg:truncate")}>{category ? t(category) : flow.session}</span>
        </p>
        <p className={ui.dot}>
          <span className={open ? ui.dotMark : ui.dotOff} aria-hidden />
          <span className={cn(open ? ui.dotText : ui.dotMuted, "lg:truncate")}>
            {status}
            {open && event.booking_closes_at ? (
              <>
                {" · "}
                <MarathonRegisterTimer closesAt={event.booking_closes_at} className={ui.offerTimer} compact />
              </>
            ) : null}
          </span>
        </p>
      </div>
      <div className={ui.titlePrice}>
        <div className={ui.titleCopy}>
          <h2 className={cn(ui.factTitle, "mt-0")}>{marathonDisplayName(event.name)}</h2>
          {event.description ? <p className={ui.factText}>{t(event.description)}</p> : null}
        </div>
        <div className={ui.priceCol}>
          {offer.showCompare ? <p className={ui.strike}>{offer.compareLabel}</p> : null}
          <p className={ui.price}>{offer.liveLabel}</p>
          {offer.showCompare ? <p className={ui.save}>{flow.saveAmount.replace("{amount}", offer.saveLabel)}</p> : null}
        </div>
      </div>
      <div className={ui.dateRow}>
        <div className={ui.dateTile}>
          <span className={ui.dateDay}>{when.day}</span>
          <span className={ui.dateMonth}>{when.month.toUpperCase()}</span>
        </div>
        <div className={ui.dateCopy}>
          <p className={ui.weekday}>{when.weekday}</p>
          <p className={ui.hours}>{marathonTimeRange(when.time, end.time)}</p>
        </div>
        <p className={ui.slots}>{slots}</p>
      </div>
      {children}
    </>
  );
}

export function MarathonFlowPager({
  index,
  total,
  onPrev,
  onNext,
}: {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const { t } = useT();
  const ui = MARATHON_FLOW_UI;
  if (total < 2) return null;
  return (
    <div className={ui.pager}>
      <button type="button" className={ui.pagerBtn} onClick={onPrev} disabled={index === 0} aria-label={t("Previous")}>
        <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <span className={ui.pagerLabel}>{index + 1}/{total}</span>
      <button type="button" className={cn(ui.pagerBtn)} onClick={onNext} disabled={index >= total - 1} aria-label={t("Next")}>
        <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
