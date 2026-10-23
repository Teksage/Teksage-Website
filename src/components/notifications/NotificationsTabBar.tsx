"use client";

import { useI18nConstants } from "@/hooks/useT";
import {
  NOTIFICATIONS_SCREEN,
  NOTIFICATIONS_TAB_GENERAL,
  NOTIFICATIONS_TAB_SINGLE_QUERY,
  NOTIFICATIONS_TAB_THIRTY_MINS,
  NOTIFICATIONS_TABS,
  NOTIFICATIONS_UI,
} from "@/lib/constants/notifications-screen";
import { cn } from "@/lib/utils";
import type { NotificationsTabBarProps } from "@/types/ui/notifications";

export function NotificationsTabBar({ tab, onTabChange }: NotificationsTabBarProps) {
  const NS = useI18nConstants(NOTIFICATIONS_SCREEN);
  const active =
    tab === "consultation" ? NOTIFICATIONS_TAB_SINGLE_QUERY : tab;

  const labels: Record<(typeof NOTIFICATIONS_TABS)[number], string> = {
    [NOTIFICATIONS_TAB_GENERAL]: NS.tabGeneral,
    [NOTIFICATIONS_TAB_THIRTY_MINS]: NS.tabThirtyMins,
    [NOTIFICATIONS_TAB_SINGLE_QUERY]: NS.tabSingleQuery,
  };

  return (
    <div className={NOTIFICATIONS_UI.tabBarWrap}>
      <div className={NOTIFICATIONS_UI.tabList} role="tablist">
        {NOTIFICATIONS_TABS.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={active === key}
            className={cn(
              NOTIFICATIONS_UI.tabButton,
              active === key ? NOTIFICATIONS_UI.tabActive : NOTIFICATIONS_UI.tabIdle
            )}
            onClick={() => onTabChange(key)}
          >
            {labels[key]}
          </button>
        ))}
      </div>
    </div>
  );
}
