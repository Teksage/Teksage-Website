"use client";

import { cn } from "@/lib/utils";
import { CONSULTATION_HOME_LAYOUT, CONSULTATION_HOME_SCREEN } from "@/lib/constants/consultation-home";
import { useI18nConstants } from "@/hooks/useT";
import type { ConsultationMeetingsTabsProps } from "@/types/ui/consultation-home";

export function ConsultationMeetingsTabs({
  isUpcoming,
  completedCount,
  onChange,
}: ConsultationMeetingsTabsProps) {
  const CH = useI18nConstants(CONSULTATION_HOME_SCREEN);

  return (
    <div className={CONSULTATION_HOME_LAYOUT.tabsWrap}>
      <div className={CONSULTATION_HOME_LAYOUT.tabsRow}>
        <button
          type="button"
          onClick={() => onChange(true)}
          className={cn(
            CONSULTATION_HOME_LAYOUT.tab,
            isUpcoming ? CONSULTATION_HOME_LAYOUT.tabActive : CONSULTATION_HOME_LAYOUT.tabInactive
          )}
        >
          {CH.tabUpcoming}
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={cn(
            CONSULTATION_HOME_LAYOUT.tab,
            !isUpcoming ? CONSULTATION_HOME_LAYOUT.tabActive : CONSULTATION_HOME_LAYOUT.tabInactive
          )}
        >
          {CH.tabCompleted}
          <span
            className={cn(
              CONSULTATION_HOME_LAYOUT.tabBadge,
              !isUpcoming
                ? CONSULTATION_HOME_LAYOUT.tabBadgeActive
                : CONSULTATION_HOME_LAYOUT.tabBadgeInactive
            )}
          >
            {completedCount}
          </span>
        </button>
      </div>
    </div>
  );
}
