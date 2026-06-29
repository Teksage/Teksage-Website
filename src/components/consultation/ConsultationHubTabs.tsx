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

export function ConsultationHubTabs({ activeTab, onChange }: ConsultationHubTabsProps) {
  const CH = useI18nConstants(CONSULTATION_HOME_SCREEN);

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
            activeTab === CONSULTATION_HUB_TAB_MEETING
              ? CONSULTATION_HOME_LAYOUT.tabActive
              : CONSULTATION_HOME_LAYOUT.tabInactive
          )}
        >
          {CH.tabMeeting}
        </button>
      </div>
    </div>
  );
}
