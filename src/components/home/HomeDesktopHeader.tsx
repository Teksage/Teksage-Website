"use client";

import { NotificationBellLink } from "@/components/common/NotificationBellLink";
import { HOME_DASHBOARD_UI } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { HomeDesktopHeaderProps } from "@/types";

/** Desktop home left column — greeting + notifications (`lg+` only). */
export function HomeDesktopHeader({
  greeting,
  className,
}: HomeDesktopHeaderProps) {
  return (
    <header
      className={cn(
        "hidden items-center justify-between border-b border-[var(--color-home-dashboard-rule)] pb-4 lg:flex",
        className
      )}
    >
      <h1 className={HOME_DASHBOARD_UI.headerGreeting}>{greeting}</h1>
      <NotificationBellLink />
    </header>
  );
}
