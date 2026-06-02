"use client";

import Image from "next/image";
import { AuthGatedLink } from "@/components/common/AuthGatedLink";
import { DASHBOARD_ASSETS, HOME_DASHBOARD, ROUTES } from "@/lib/constants";
import { useI18nConstants } from "@/hooks/useT";

/** Desktop notification bell — mirrors `HomeDashboardHeader` mobile bell. */
export function NotificationBellLink() {
  const HD = useI18nConstants(HOME_DASHBOARD);
  return (
    <AuthGatedLink
      href={ROUTES.notifications}
      returnPath={ROUTES.notifications}
      inline
      className="relative rounded-full p-1.5 transition-colors hover:bg-black/10"
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
    </AuthGatedLink>
  );
}
