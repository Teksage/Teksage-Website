"use client";

import { useI18nConstants } from "@/hooks/useT";
import { HOME_DASHBOARD_SIDEBAR } from "@/lib/constants/home-dashboard-sidebar";
import { HOME_DASHBOARD_UI } from "@/lib/constants/home-dashboard-ui";
import type { DesktopNavGreetingProps } from "@/types/ui/desktop-sidebar-greeting";
import { cn } from "@/lib/utils";

export function DesktopNavGreeting({
  userName,
  isAuthenticated,
}: DesktopNavGreetingProps) {
  const HDS = useI18nConstants(HOME_DASHBOARD_SIDEBAR);
  const displayName =
    isAuthenticated && userName?.trim()
      ? userName.trim()
      : HDS.helloGuest;

  return (
    <p className={cn(HOME_DASHBOARD_UI.sidebarGreeting, "mb-3 shrink-0 px-1")}>
      {HDS.hello} {displayName}
    </p>
  );
}
