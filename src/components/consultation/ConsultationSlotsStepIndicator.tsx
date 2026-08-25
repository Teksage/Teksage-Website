"use client";

import { cn } from "@/lib/utils";
import {
  CONSULTATION_SLOTS_LAYOUT,
  CONSULTATION_SLOTS_SCREEN,
} from "@/lib/constants/consultation-slots";

export function ConsultationSlotsStepIndicator() {
  const CS = CONSULTATION_SLOTS_SCREEN;
  const L = CONSULTATION_SLOTS_LAYOUT;

  return (
    <nav className={L.stepRow} aria-label="Booking steps">
      <div className={L.stepItem}>
        <span className={cn(L.stepBadge, L.stepBadgeDone)} aria-hidden>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6.2L4.8 8.5L9.5 3.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className={L.stepLabelDone}>{CS.stepAstrologer}</span>
      </div>
      <div className={L.stepItem} aria-current="step">
        <span className={cn(L.stepBadge, L.stepBadgeActive)}>{CS.stepNumSchedule}</span>
        <span className={L.stepLabelActive}>{CS.stepSchedule}</span>
      </div>
      <div className={L.stepItem}>
        <span className={cn(L.stepBadge, L.stepBadgeIdle)}>{CS.stepNumDetails}</span>
        <span className={L.stepLabelIdle}>{CS.stepDetails}</span>
      </div>
    </nav>
  );
}
