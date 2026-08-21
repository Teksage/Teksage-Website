"use client";

import { cn } from "@/lib/utils";
import {
  CONSULTATION_HOME_LAYOUT,
  CONSULTATION_HOME_SCREEN,
} from "@/lib/constants/consultation-home";
import {
  CONSULTATION_HUB_TAB_ASTROLOGER,
  CONSULTATION_HUB_TAB_MEETING,
} from "@/lib/constants/consultation-routes";
import { useI18nConstants } from "@/hooks/useT";
import type { ConsultationHubTabsProps } from "@/types/ui/consultation-home";

export function ConsultationHubTabs({
  activeTab,
  onChange,
  meetingCount = 0,
}: ConsultationHubTabsProps) {
  const CH = useI18nConstants(CONSULTATION_HOME_SCREEN);
  const meetingsActive = activeTab === CONSULTATION_HUB_TAB_MEETING;

  return (
    <div className={CONSULTATION_HOME_LAYOUT.hubTabsWrap}>
      <div className={CONSULTATION_HOME_LAYOUT.tabsRow}>
        <button
          type="button"
          onClick={() => onChange(CONSULTATION_HUB_TAB_ASTROLOGER)}
          className={cn(
            CONSULTATION_HOME_LAYOUT.tab,
            activeTab === CONSULTATION_HUB_TAB_ASTROLOGER
              ? CONSULTATION_HOME_LAYOUT.tabActive
              : CONSULTATION_HOME_LAYOUT.tabInactive
          )}
        >
          {CH.tabAstrologer}
        </button>
        <button
          type="button"
          onClick={() => onChange(CONSULTATION_HUB_TAB_MEETING)}
          className={cn(
            CONSULTATION_HOME_LAYOUT.tab,
            meetingsActive
              ? CONSULTATION_HOME_LAYOUT.tabActive
              : CONSULTATION_HOME_LAYOUT.tabInactive
          )}
        >
          {CH.tabMeeting}
          <span
            className={cn(
              CONSULTATION_HOME_LAYOUT.tabBadge,
              meetingsActive
                ? CONSULTATION_HOME_LAYOUT.tabBadgeActive
                : CONSULTATION_HOME_LAYOUT.tabBadgeInactive
            )}
          >
            {meetingCount}
          </span>
        </button>
      </div>
    </div>
  );
}
