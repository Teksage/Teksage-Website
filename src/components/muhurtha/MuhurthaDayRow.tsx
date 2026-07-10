"use client";

import { useI18nConstants, useT } from "@/hooks/useT";
import { MUHURTHA_LAYOUT, MUHURTHA_SCREEN } from "@/lib/constants";
import {
  formatMuhurthaMoreReasons,
  formatMuhurthaWindows,
  muhurthaStatusBadgeClass,
} from "@/lib/muhurtha-format";
import { cn } from "@/lib/utils";
import type { MuhurthaDayResult } from "@/types/muhurtha";
import { MuhurthaReasonInfo } from "@/components/muhurtha/MuhurthaReasonInfo";

function dayReasons(day: MuhurthaDayResult, t: (key: string) => string): string[] {
  const codes =
    day.reason_codes && day.reason_codes.length > 0
      ? day.reason_codes
      : day.reason_code
        ? [day.reason_code]
        : [];
  return codes.map((code) => t(code));
}

export function MuhurthaDayRow({ day }: { day: MuhurthaDayResult }) {
  const M = useI18nConstants(MUHURTHA_SCREEN);
  const L = MUHURTHA_LAYOUT;
  const { t } = useT();
  const hasWindow = Boolean(day.is_suitable && (day.windows?.length || day.window));
  const windowSlots = hasWindow ? formatMuhurthaWindows(day) : [];
  const reasons = dayReasons(day, t);
  const primaryReason = reasons[0];
  const extraReasonCount = Math.max(0, reasons.length - 1);

  return (
    <div className={L.dayRowStatic}>
      <div className={L.tableColDate}>
        <p className={L.dayRowDate}>{day.date}</p>
        {day.weekday ? <p className={L.dayRowWeekday}>{day.weekday}</p> : null}
      </div>

      <div className={L.tableColStatus}>
        {day.is_suitable ? (
          <span className={cn(L.statusBadgeBase, muhurthaStatusBadgeClass(day.rating, L))}>
            <span>{M.suitableLabel}</span>
            {day.rating ? (
              <>
                <span className={L.statusSeparator}>–</span>
                <span>{t(day.rating)}</span>
              </>
            ) : null}
          </span>
        ) : (
          <span className={cn(L.statusBadgeBase, L.statusUnsuitable)}>{M.notSuitableLabel}</span>
        )}
      </div>

      <div className={L.tableColDetails}>
        {hasWindow ? (
          <div className={L.detailsTimeBlock}>
            {windowSlots.map((slot) => (
              <p key={slot} className={L.dayRowWindow}>
                {slot}
              </p>
            ))}
          </div>
        ) : primaryReason ? (
          <div className={L.reasonPreviewWrap}>
            <p className={L.reasonPreviewText}>{primaryReason}</p>
            {extraReasonCount > 0 ? (
              <MuhurthaReasonInfo
                reasons={reasons}
                ariaLabel={M.reasonInfoAria}
                triggerLabel={formatMuhurthaMoreReasons(extraReasonCount)}
                triggerClassName={L.reasonMoreBtn}
              />
            ) : null}
          </div>
        ) : (
          <MuhurthaReasonInfo reasons={reasons} ariaLabel={M.reasonInfoAria} />
        )}
      </div>
    </div>
  );
}
