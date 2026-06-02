"use client";

import { useI18nConstants } from "@/hooks/useT";
import {
  NOTIFICATIONS_SCREEN,
  NOTIFICATIONS_UI,
} from "@/lib/constants/notifications-screen";
import { cn } from "@/lib/utils";
import type { NotificationsTabBarProps } from "@/types/ui/notifications";

export function NotificationsTabBar({ tab, onTabChange }: NotificationsTabBarProps) {
  const NS = useI18nConstants(NOTIFICATIONS_SCREEN);

  return (
    <div className={NOTIFICATIONS_UI.tabBarWrap}>
      <div className={NOTIFICATIONS_UI.tabList} role="tablist">
        {(["general", "consultation"] as const).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            className={cn(
              NOTIFICATIONS_UI.tabButton,
              tab === key ? NOTIFICATIONS_UI.tabActive : NOTIFICATIONS_UI.tabIdle
            )}
            onClick={() => onTabChange(key)}
          >
            {key === "general" ? NS.tabGeneral : NS.tabConsultation}
          </button>
        ))}
      </div>
    </div>
  );
}
