"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";
import { useAuthStore } from "@/store/auth.store";
import { DesktopNavAiChatCard } from "@/components/common/DesktopNavAiChatCard";
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
  DESKTOP_SIDEBAR_WEEKLY_PREDICTION_LINK,
} from "@/lib/constants/desktop-sidebar-nav";
import { DESKTOP_SIDEBAR_UI } from "@/lib/constants/desktop-sidebar-ui";
import { HOME_DASHBOARD_SIDEBAR } from "@/lib/constants/home-dashboard-sidebar";
import { HOME_LAYOUT } from "@/lib/constants/home-layout";
import { APP_NAME, PUBLIC_ASSETS } from "@/lib/constants";
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
  const isAstrologer = isAstrologerHomeSession(user ?? undefined);
  const showPremiumUpsell = isAuthenticated && !user?.isPremium;
  const consultSidebarLink = isAstrologer
    ? DESKTOP_SIDEBAR_ASTROLOGER_PORTAL_LINK
    : DESKTOP_SIDEBAR_BOOK_LINK;

  function go(href: string) {
    guardNavigation(href, { redirectHomeOnClose: true });
  }

  return (
    <aside
      className={cn(
        DESKTOP_SIDEBAR_UI.aside,
        "h-full",
        HOME_LAYOUT.desktopAsideWidth,
        className
      )}
      aria-label="Main navigation"
    >
      <div className={DESKTOP_SIDEBAR_UI.brandRow}>
        <Image
          src={PUBLIC_ASSETS.appLogo}
          alt=""
          width={36}
          height={36}
          unoptimized
          className={DESKTOP_SIDEBAR_UI.brandLogo}
        />
        <span className={DESKTOP_SIDEBAR_UI.brandName}>{APP_NAME}</span>
      </div>

      <nav className={DESKTOP_SIDEBAR_UI.navScroll}>
        <DesktopNavAiChatCard />

        <DesktopNavItem
          iconSrc={consultSidebarLink.icon}
          label={isAstrologer ? HDS.astrologerPortal : HDS.bookConsultation}
          active={pathname.startsWith(consultSidebarLink.href)}
          onClick={() => go(consultSidebarLink.href)}
        />

        <DesktopNavItem
          iconSrc={DESKTOP_SIDEBAR_DAILY_PREDICTION_LINK.icon}
          label={HDS.dailyPredictions}
          active={pathname.startsWith(DESKTOP_SIDEBAR_DAILY_PREDICTION_LINK.href)}
          onClick={() => go(DESKTOP_SIDEBAR_DAILY_PREDICTION_LINK.href)}
        />

        <DesktopNavItem
          iconSrc={DESKTOP_SIDEBAR_WEEKLY_PREDICTION_LINK.icon}
          label={HDS.weeklyPredictions}
          active={pathname.startsWith(DESKTOP_SIDEBAR_WEEKLY_PREDICTION_LINK.href)}
          onClick={() => go(DESKTOP_SIDEBAR_WEEKLY_PREDICTION_LINK.href)}
        />

        <DesktopNavItem
          iconSrc={DESKTOP_SIDEBAR_EVENT_PLANNER_LINK.icon}
          label={HDS.eventPlanner}
          active={pathname.startsWith(DESKTOP_SIDEBAR_EVENT_PLANNER_LINK.href)}
          onClick={() => go(DESKTOP_SIDEBAR_EVENT_PLANNER_LINK.href)}
        />

        <DesktopNavItem
          iconSrc={DESKTOP_SIDEBAR_LOVE_COMPATIBILITY_LINK.icon}
          label={HDS.loveCompatibility}
          active={pathname.startsWith(DESKTOP_SIDEBAR_LOVE_COMPATIBILITY_LINK.href)}
          onClick={() => go(DESKTOP_SIDEBAR_LOVE_COMPATIBILITY_LINK.href)}
        />

        <DesktopNavItem
          iconSrc={DESKTOP_SIDEBAR_PANCHANG_LINK.icon}
          label={HDS.panchangam}
          active={pathname.startsWith(DESKTOP_SIDEBAR_PANCHANG_LINK.href)}
          onClick={() => go(DESKTOP_SIDEBAR_PANCHANG_LINK.href)}
        />

        <DesktopNavOtherPredictionsMenu />
      </nav>

      {showPremiumUpsell ? (
        <div className={DESKTOP_SIDEBAR_UI.navFooter}>
          <DesktopNavUnlockPremium />
        </div>
      ) : null}
    </aside>
  );
}
