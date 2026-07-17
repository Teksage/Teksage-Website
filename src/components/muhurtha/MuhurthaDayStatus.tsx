"use client";

import { useT } from "@/hooks/useT";
import { MUHURTHA_LAYOUT } from "@/lib/constants";
import {
  formatMuhurthaMoreReasons,
  formatMuhurthaWindows,
  muhurthaStatusBadgeClass,
} from "@/lib/muhurtha-format";
import { cn } from "@/lib/utils";
import type { MuhurthaDaySegment } from "@/types/muhurtha";
import { MuhurthaReasonInfo } from "@/components/muhurtha/MuhurthaReasonInfo";

export function muhurthaSegmentReasons(
  segment: Pick<MuhurthaDaySegment, "reason_code" | "reason_codes">,
  t: (key: string) => string
): string[] {
  const codes =
    segment.reason_codes && segment.reason_codes.length > 0
      ? segment.reason_codes
      : segment.reason_code
        ? [segment.reason_code]
        : [];
  return codes.map((code) => t(code));
}

export function MuhurthaStatusBadge({
  suitable,
  rating,
  labelSuitable,
  labelNotSuitable,
}: {
  suitable: boolean;
  rating?: string;
  labelSuitable: string;
  labelNotSuitable: string;
}) {
  const L = MUHURTHA_LAYOUT;
  const { t } = useT();
  if (!suitable) {
    return (
      <span className={cn(L.statusBadgeBase, L.statusUnsuitable)}>{labelNotSuitable}</span>
    );
  }
  return (
    <span className={cn(L.statusBadgeBase, muhurthaStatusBadgeClass(rating, L))}>
      <span>{labelSuitable}</span>
      {rating ? (
        <>
          <span className={L.statusSeparator}>–</span>
          <span>{t(rating)}</span>
        </>
      ) : null}
    </span>
  );
}

export function MuhurthaSegmentDetails({
  segment,
  ariaLabel,
}: {
  segment: MuhurthaDaySegment;
  ariaLabel: string;
}) {
  const L = MUHURTHA_LAYOUT;
  const { t } = useT();
  const hasWindow = Boolean(segment.is_suitable && (segment.windows?.length || segment.window));
  const windowSlots = hasWindow ? formatMuhurthaWindows(segment) : [];
  const reasons = muhurthaSegmentReasons(segment, t);
  const primaryReason = reasons[0];
  const extraReasonCount = Math.max(0, reasons.length - 1);

  if (hasWindow) {
    return (
      <div className={L.detailsTimeBlock}>
        {windowSlots.map((slot) => (
          <p key={slot} className={L.dayRowWindow}>
            {slot}
          </p>
        ))}
      </div>
    );
  }

  if (!primaryReason) {
    return <MuhurthaReasonInfo reasons={reasons} ariaLabel={ariaLabel} />;
  }

  return (
    <div className={L.reasonPreviewWrap}>
      <p className={L.reasonPreviewText}>{primaryReason}</p>
      {extraReasonCount > 0 ? (
        <MuhurthaReasonInfo
          reasons={reasons}
          ariaLabel={ariaLabel}
          triggerLabel={formatMuhurthaMoreReasons(extraReasonCount)}
          triggerClassName={L.reasonMoreBtn}
        />
      ) : null}
    </div>
  );
}
