"use client";

import { cn } from "@/lib/utils";
import {
  CONSULTATION_CHECKOUT_LAYOUT,
  CONSULTATION_CHECKOUT_SCREEN,
} from "@/lib/constants/consultation-checkout";

export function ConsultationCheckoutStepIndicator() {
  const CC = CONSULTATION_CHECKOUT_SCREEN;
  const L = CONSULTATION_CHECKOUT_LAYOUT;

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
        <span className={L.stepLabelDone}>{CC.stepAstrologer}</span>
      </div>
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
        <span className={L.stepLabelDone}>{CC.stepSchedule}</span>
      </div>
      <div className={L.stepItem} aria-current="step">
        <span className={cn(L.stepBadge, L.stepBadgeActive)}>{CC.stepNumDetails}</span>
        <span className={L.stepLabelActive}>{CC.stepDetails}</span>
      </div>
    </nav>
  );
}
