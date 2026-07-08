"use client";

import { useI18nConstants, useT } from "@/hooks/useT";
import { MUHURTHA_LAYOUT, MUHURTHA_SCREEN } from "@/lib/constants";
import type { MuhurthaDayResult } from "@/types/muhurtha";
import { MuhurthaReasonInfo } from "@/components/muhurtha/MuhurthaReasonInfo";

function reasonTooltip(day: MuhurthaDayResult, t: (key: string) => string) {
  const codes =
    day.reason_codes && day.reason_codes.length > 0
      ? day.reason_codes
      : day.reason_code
        ? [day.reason_code]
        : [];
  return codes.map((code) => t(code)).join(" · ");
}

export function MuhurthaDayRow({ day }: { day: MuhurthaDayResult }) {
  const M = useI18nConstants(MUHURTHA_SCREEN);
  const L = MUHURTHA_LAYOUT;
  const { t } = useT();

  return (
    <div className={L.dayRowStatic}>
      <span className={L.dayRowDate}>{day.date}</span>
      <span className={day.is_suitable ? L.statusSuitable : L.statusUnsuitable}>
        {day.is_suitable ? M.suitableLabel : M.notSuitableLabel}
      </span>
      {day.is_suitable && day.rating && day.window ? (
        <span className={L.dayRowWindow}>
          {t(day.rating)} ({day.window})
        </span>
      ) : (
        <MuhurthaReasonInfo
          tooltip={reasonTooltip(day, t)}
          ariaLabel={M.reasonInfoAria}
        />
      )}
    </div>
  );
}
