"use client";

import { useEffect } from "react";
import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";
import { useAuthStore } from "@/store/auth.store";
import { DesktopNavAiChatCard } from "@/components/common/DesktopNavAiChatCard";
import { DesktopSidebarCollapseToggle } from "@/components/common/DesktopSidebarCollapseToggle";
import { MarathonNavTimer } from "@/components/marathon/MarathonNavTimer";
import { DesktopNavItem } from "@/components/common/DesktopNavItem";
import { DesktopNavOtherPredictionsMenu } from "@/components/common/DesktopNavOtherPredictionsMenu";
import { DesktopNavUnlockPremium } from "@/components/common/DesktopNavUnlockPremium";
import {
  DESKTOP_SIDEBAR_ASTROLOGER_PORTAL_LINK,
  DESKTOP_SIDEBAR_BOOK_LINK,
  DESKTOP_SIDEBAR_DAILY_PREDICTION_LINK,
  DESKTOP_SIDEBAR_LOVE_COMPATIBILITY_LINK,
  DESKTOP_SIDEBAR_PANCHANG_LINK,
  DESKTOP_SIDEBAR_EVENT_PLANNER_LINK,
  DESKTOP_SIDEBAR_MARATHON_LINK,
  DESKTOP_SIDEBAR_SUBSCRIPTION_LINK,
  DESKTOP_SIDEBAR_WEEKLY_PREDICTION_LINK,
} from "@/lib/constants/desktop-sidebar-nav";
import { DESKTOP_SIDEBAR_UI } from "@/lib/constants/desktop-sidebar-ui";
import { HOME_DASHBOARD_SIDEBAR } from "@/lib/constants/home-dashboard-sidebar";
import { HOME_LAYOUT } from "@/lib/constants/home-layout";
import {
  APP_LOGO_INTRINSIC_HEIGHT,
  APP_LOGO_INTRINSIC_WIDTH,
  APP_NAME,
  PUBLIC_ASSETS,
} from "@/lib/constants";
import { useDesktopSidebarStore } from "@/store/desktop-sidebar.store";
import type { DesktopMainNavProps } from "@/types";
import { cn, isAstrologerHomeSession } from "@/lib/utils";

/**
 * Desktop left rail — modern dashboard sidebar (`lg+`).
 */
export function DesktopMainNav({ className }: DesktopMainNavProps) {
  const HDS = useI18nConstants(HOME_DASHBOARD_SIDEBAR);
  const pathname = usePathname();
  const { guardNavigation } = useAuthNavigation();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const collapsed = useDesktopSidebarStore((s) => s.collapsed);
  const hydrate = useDesktopSidebarStore((s) => s.hydrate);
  const isAstrologer = isAstrologerHomeSession(user ?? undefined);
  const showPremiumUpsell = isAuthenticated && !user?.isPremium;
  const consultSidebarLink = isAstrologer
    ? DESKTOP_SIDEBAR_ASTROLOGER_PORTAL_LINK
    : DESKTOP_SIDEBAR_BOOK_LINK;

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  function go(href: string) {
    guardNavigation(href, { redirectHomeOnClose: true });
  }

  return (
    <aside
      className={cn(
        DESKTOP_SIDEBAR_UI.aside,
        "h-full",
        collapsed
          ? HOME_LAYOUT.desktopAsideWidthCollapsed
          : HOME_LAYOUT.desktopAsideWidth,
        className
      )}
      aria-label="Main navigation"
      data-collapsed={collapsed ? "true" : "false"}
    >
      <DesktopSidebarCollapseToggle />

      <div
        className={
          collapsed ? DESKTOP_SIDEBAR_UI.brandRowCollapsed : DESKTOP_SIDEBAR_UI.brandRow
        }
      >
        {collapsed ? (
          <Image
            src={PUBLIC_ASSETS.appLogo}
            alt=""
            width={APP_LOGO_INTRINSIC_WIDTH}
            height={APP_LOGO_INTRINSIC_HEIGHT}
            unoptimized
            className={DESKTOP_SIDEBAR_UI.brandLogoCollapsed}
          />
        ) : (
          <>
            <Image
              src={PUBLIC_ASSETS.appLogo}
              alt=""
              width={APP_LOGO_INTRINSIC_WIDTH}
              height={APP_LOGO_INTRINSIC_HEIGHT}
              unoptimized
              className={DESKTOP_SIDEBAR_UI.brandLogo}
            />
            <span className={DESKTOP_SIDEBAR_UI.brandName}>{APP_NAME}</span>
          </>
        )}
      </div>

      <nav
        className={
          collapsed ? DESKTOP_SIDEBAR_UI.navScrollCollapsed : DESKTOP_SIDEBAR_UI.navScroll
        }
      >
        <DesktopNavAiChatCard />

        <DesktopNavItem
          collapsed={collapsed}
          iconSrc={consultSidebarLink.icon}
          label={isAstrologer ? HDS.astrologerPortal : HDS.bookConsultation}
          active={pathname.startsWith(consultSidebarLink.href)}
          onClick={() => go(consultSidebarLink.href)}
        />

        <DesktopNavItem
          collapsed={collapsed}
          iconSrc={DESKTOP_SIDEBAR_DAILY_PREDICTION_LINK.icon}
          label={HDS.dailyPredictions}
          active={pathname.startsWith(DESKTOP_SIDEBAR_DAILY_PREDICTION_LINK.href)}
          onClick={() => go(DESKTOP_SIDEBAR_DAILY_PREDICTION_LINK.href)}
        />

        <DesktopNavItem
          collapsed={collapsed}
          iconSrc={DESKTOP_SIDEBAR_WEEKLY_PREDICTION_LINK.icon}
          label={HDS.weeklyPredictions}
          active={pathname.startsWith(DESKTOP_SIDEBAR_WEEKLY_PREDICTION_LINK.href)}
          onClick={() => go(DESKTOP_SIDEBAR_WEEKLY_PREDICTION_LINK.href)}
        />

        <DesktopNavItem
          collapsed={collapsed}
          iconSrc={DESKTOP_SIDEBAR_EVENT_PLANNER_LINK.icon}
          label={HDS.eventPlanner}
          active={pathname.startsWith(DESKTOP_SIDEBAR_EVENT_PLANNER_LINK.href)}
          onClick={() => go(DESKTOP_SIDEBAR_EVENT_PLANNER_LINK.href)}
        />

        <DesktopNavItem
          collapsed={collapsed}
          iconSrc={DESKTOP_SIDEBAR_MARATHON_LINK.icon}
          label={HDS.consultationMarathon}
          active={pathname.startsWith(DESKTOP_SIDEBAR_MARATHON_LINK.href)}
          onClick={() => go(DESKTOP_SIDEBAR_MARATHON_LINK.href)}
          trailing={collapsed ? null : <MarathonNavTimer />}
        />

        <DesktopNavItem
          collapsed={collapsed}
          iconSrc={DESKTOP_SIDEBAR_LOVE_COMPATIBILITY_LINK.icon}
          label={HDS.loveCompatibility}
          active={pathname.startsWith(DESKTOP_SIDEBAR_LOVE_COMPATIBILITY_LINK.href)}
          onClick={() => go(DESKTOP_SIDEBAR_LOVE_COMPATIBILITY_LINK.href)}
        />

        <DesktopNavItem
          collapsed={collapsed}
          iconSrc={DESKTOP_SIDEBAR_PANCHANG_LINK.icon}
          label={HDS.panchangam}
          active={pathname.startsWith(DESKTOP_SIDEBAR_PANCHANG_LINK.href)}
          onClick={() => go(DESKTOP_SIDEBAR_PANCHANG_LINK.href)}
        />

        <DesktopNavItem
          collapsed={collapsed}
          iconSrc={DESKTOP_SIDEBAR_SUBSCRIPTION_LINK.icon}
          label={HDS.subscriptions}
          active={pathname.startsWith(DESKTOP_SIDEBAR_SUBSCRIPTION_LINK.href)}
          onClick={() => go(DESKTOP_SIDEBAR_SUBSCRIPTION_LINK.href)}
        />

        <DesktopNavOtherPredictionsMenu />
      </nav>

      {showPremiumUpsell ? (
        <div
          className={
            collapsed
              ? DESKTOP_SIDEBAR_UI.navFooterCollapsed
              : DESKTOP_SIDEBAR_UI.navFooter
          }
        >
          {collapsed ? null : <DesktopNavUnlockPremium />}
        </div>
      ) : null}
    </aside>
  );
}
