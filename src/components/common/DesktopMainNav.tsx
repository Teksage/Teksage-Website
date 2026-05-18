"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { DesktopNavAiChatCard } from "@/components/common/DesktopNavAiChatCard";
import { DesktopNavItem } from "@/components/common/DesktopNavItem";
import { DesktopNavPredictionsMenu } from "@/components/common/DesktopNavPredictionsMenu";
import { DesktopNavUnlockPremium } from "@/components/common/DesktopNavUnlockPremium";
import {
  DESKTOP_SIDEBAR_BOOK_LINK,
  DESKTOP_SIDEBAR_MARRIAGE_LINK,
  DESKTOP_SIDEBAR_UTILITY_LINKS,
} from "@/lib/constants/desktop-sidebar-nav";
import { HOME_DASHBOARD_SIDEBAR } from "@/lib/constants/home-dashboard-sidebar";
import { HOME_LAYOUT } from "@/lib/constants/home-layout";
import { APP_NAME, PUBLIC_ASSETS } from "@/lib/constants";
import type { DesktopMainNavProps } from "@/types";
import { cn } from "@/lib/utils";

const UTILITY_LABELS: Record<
  (typeof DESKTOP_SIDEBAR_UTILITY_LINKS)[number]["labelKey"],
  string
> = {
  panchang: HOME_DASHBOARD_SIDEBAR.panchang,
  horoscope: HOME_DASHBOARD_SIDEBAR.horoscope,
  settings: HOME_DASHBOARD_SIDEBAR.settings,
};

/**
 * Desktop left rail — design ref dashboard sidebar (`lg+`).
 */
export function DesktopMainNav({ className }: DesktopMainNavProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "sticky top-0 z-30 hidden h-dvh shrink-0 flex-col border-r border-neutral-200/90 bg-white lg:flex",
        HOME_LAYOUT.desktopAsideWidth,
        className
      )}
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-2 border-b border-neutral-100 px-4 py-5">
        <Image
          src={PUBLIC_ASSETS.appLogo}
          alt=""
          width={36}
          height={36}
          unoptimized
          className="size-9 shrink-0"
        />
        <span className="truncate text-base font-bold capitalize text-[color:var(--color-brand-panchang)]">
          {APP_NAME}
        </span>
      </div>

      <nav className="scrollbar-hidden flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
        <DesktopNavAiChatCard />

        <DesktopNavItem
          href={DESKTOP_SIDEBAR_BOOK_LINK.href}
          iconSrc={DESKTOP_SIDEBAR_BOOK_LINK.icon}
          labelLines={{
            primary: HOME_DASHBOARD_SIDEBAR.bookConsultationLine1,
            secondary: HOME_DASHBOARD_SIDEBAR.bookConsultationLine2,
          }}
          active={pathname.startsWith(DESKTOP_SIDEBAR_BOOK_LINK.href)}
        />

        <DesktopNavPredictionsMenu />

        <DesktopNavItem
          href={DESKTOP_SIDEBAR_MARRIAGE_LINK.href}
          iconSrc={DESKTOP_SIDEBAR_MARRIAGE_LINK.icon}
          labelLines={{
            primary: HOME_DASHBOARD_SIDEBAR.marriageLine1,
            secondary: HOME_DASHBOARD_SIDEBAR.marriageLine2,
          }}
          active={pathname.startsWith(DESKTOP_SIDEBAR_MARRIAGE_LINK.href)}
        />

        {DESKTOP_SIDEBAR_UTILITY_LINKS.map((item) => (
          <DesktopNavItem
            key={item.href}
            href={item.href}
            iconSrc={item.icon}
            label={UTILITY_LABELS[item.labelKey]}
            active={pathname.startsWith(item.href)}
          />
        ))}

        <DesktopNavUnlockPremium />
      </nav>
    </aside>
  );
}
