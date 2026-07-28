"use client";

import { useI18nConstants, useT } from "@/hooks/useT";
import { MUHURTHA_LAYOUT, MUHURTHA_SCREEN } from "@/lib/constants";
import { formatMuhurthaMoreReasons, formatMuhurthaWindows } from "@/lib/muhurtha-format";
import type { MuhurthaDayResult } from "@/types/muhurtha";
import { MuhurthaReasonInfo } from "@/components/muhurtha/MuhurthaReasonInfo";
import {
  MuhurthaSegmentDetails,
  MuhurthaStatusBadge,
  muhurthaSegmentReasons,
} from "@/components/muhurtha/MuhurthaDayStatus";

function periodLabel(
  period: string | undefined,
  labels: { periodMorning: string; periodEvening: string; periodFullDay: string }
): string {
  if (period === "Morning") return labels.periodMorning;
  if (period === "Evening") return labels.periodEvening;
  if (period === "Full day") return labels.periodFullDay;
  return period ?? "";
}

function shouldSplitMuhurthaDay(day: MuhurthaDayResult): boolean {
  const segments = day.segments;
  if (!segments || segments.length <= 1) return false;
  const weekday = (day.weekday ?? "").toLowerCase();
  if (weekday === "tuesday" || weekday === "saturday") return false;
  const allWeekdayExcluded = segments.every((segment) => {
    const codes = [
      ...(segment.reason_codes ?? []),
      ...(segment.reason_code ? [segment.reason_code] : []),
    ];
    return codes.includes("weekday_excluded");
  });
  return !allWeekdayExcluded;
}

export function MuhurthaDayRow({ day }: { day: MuhurthaDayResult }) {
  const M = useI18nConstants(MUHURTHA_SCREEN);
  const L = MUHURTHA_LAYOUT;
  const { t } = useT();
  const splitSegments = shouldSplitMuhurthaDay(day) ? day.segments! : null;

  if (splitSegments) {
    return (
      <div className={L.dayRowStatic}>
        <div className={L.tableColDate}>
          <p className={L.dayRowDate}>{day.date}</p>
          {day.weekday ? <p className={L.dayRowWeekday}>{day.weekday}</p> : null}
        </div>

        <div className={L.tableColStatus}>
          <div className={L.statusStack}>
            {splitSegments.map((segment) => (
              <div key={`${day.iso_date}-${segment.period}`} className={L.statusStack}>
                <span className={L.statusPeriodLabel}>
                  {periodLabel(segment.period, M)}
                </span>
                <MuhurthaStatusBadge
                  suitable={segment.is_suitable}
                  rating={segment.rating}
                  labels={{
                    veryGood: M.statusVeryGood,
                    good: M.statusGood,
                    average: M.statusAverage,
                    notSuitable: M.notSuitableLabel,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={L.tableColDetails}>
          <div className={L.segmentDetailsStack}>
            {splitSegments.map((segment) => (
              <div
                key={`${day.iso_date}-${segment.period}-details`}
                className={L.segmentDetailBlock}
              >
                <span className={L.statusPeriodLabel}>
                  {periodLabel(segment.period, M)}
                </span>
                <MuhurthaSegmentDetails segment={segment} ariaLabel={M.reasonInfoAria} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const hasWindow = Boolean(day.is_suitable && (day.windows?.length || day.window));
  const windowSlots = hasWindow ? formatMuhurthaWindows(day) : [];
  const reasons = muhurthaSegmentReasons(day, t);
  const primaryReason = reasons[0];
  const extraReasonCount = Math.max(0, reasons.length - 1);

  return (
    <div className={L.dayRowStatic}>
      <div className={L.tableColDate}>
        <p className={L.dayRowDate}>{day.date}</p>
        {day.weekday ? <p className={L.dayRowWeekday}>{day.weekday}</p> : null}
      </div>

      <div className={L.tableColStatus}>
        <MuhurthaStatusBadge
          suitable={day.is_suitable}
          rating={day.rating}
          labels={{
            veryGood: M.statusVeryGood,
            good: M.statusGood,
            average: M.statusAverage,
            notSuitable: M.notSuitableLabel,
          }}
        />
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
