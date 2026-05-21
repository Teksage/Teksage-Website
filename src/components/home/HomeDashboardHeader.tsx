"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { AuthGatedLink } from "@/components/common/AuthGatedLink";
import { cn } from "@/lib/utils";
import { DASHBOARD_ASSETS, HOME_DASHBOARD, HOME_LAYOUT, ROUTES } from "@/lib/constants";
import type { HomeDashboardHeaderProps } from "@/types";

export function HomeDashboardHeader({
  greeting,
  isAuthenticated,
  unreadCount,
  className,
}: HomeDashboardHeaderProps) {
  const HD = useI18nConstants(HOME_DASHBOARD);
  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-[color:var(--color-home-screen-mint)]/95 backdrop-blur-sm",
        className
      )}
    >
      <div className={cn(HOME_LAYOUT.maxWidth, HOME_LAYOUT.gutterX)}>
        <div className="flex items-center justify-between py-3.5 sm:py-4">
          <h1
            className={cn(
              "truncate text-lg font-bold leading-tight lg:text-xl",
              "text-[color:var(--color-home-dashboard-heading)]"
            )}
          >
            {greeting}
          </h1>
          <AuthGatedLink
            href={ROUTES.notifications}
            returnPath={ROUTES.notifications}
            inline
            className="relative rounded-full p-1.5 transition-colors hover:bg-black/5"
            aria-label={HD.notificationsLinkAria}
          >
            <Image
              src={DASHBOARD_ASSETS.notification}
              alt=""
              width={32}
              height={32}
              unoptimized
              className="block size-8"
            />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--color-brand-error)] px-1 text-[10px] font-bold text-white">
                {unreadCount > 9 ? HD.notificationCountOverflow : unreadCount}
              </span>
            )}
          </AuthGatedLink>
        </div>
        <div
          className="h-px min-h-px w-full shrink-0 bg-[var(--color-home-dashboard-rule)]"
          aria-hidden
        />
      </div>
    </header>
  );
}
