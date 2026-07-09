"use client";

import { useI18nConstants, useT } from "@/hooks/useT";
import { MUHURTHA_LAYOUT, MUHURTHA_SCREEN } from "@/lib/constants";
import { formatMuhurthaWindow } from "@/lib/muhurtha-format";
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
  const hasWindow = Boolean(day.is_suitable && day.window);

  return (
    <div className={L.dayRowStatic}>
      <div className={L.tableColDate}>
        <p className={L.dayRowDate}>{day.date}</p>
        {day.weekday ? <p className={L.dayRowWeekday}>{day.weekday}</p> : null}
      </div>

      <div className={L.tableColStatus}>
        <span
          className={cn(
            L.statusBadgeBase,
            day.is_suitable ? L.statusSuitable : L.statusUnsuitable
          )}
        >
          {day.is_suitable ? M.suitableLabel : M.notSuitableLabel}
        </span>
      </div>

      <div className={L.tableColDetails}>
        {hasWindow ? (
          <div className={L.detailsTimeBlock}>
            {day.rating ? (
              <span className={L.detailsRating}>{t(day.rating)}</span>
            ) : null}
            <p className={L.dayRowWindow}>{formatMuhurthaWindow(day.window!)}</p>
          </div>
        ) : (
          <MuhurthaReasonInfo
            reasons={dayReasons(day, t)}
            ariaLabel={M.reasonInfoAria}
          />
        )}
      </div>
    </div>
  );
}
