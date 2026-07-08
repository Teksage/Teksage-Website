"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";
import { useAuthStore } from "@/store/auth.store";
import { DesktopNavAiChatCard } from "@/components/common/DesktopNavAiChatCard";
import { DesktopNavGreeting } from "@/components/common/DesktopNavGreeting";
import { DesktopNavItem } from "@/components/common/DesktopNavItem";
import { DesktopNavOtherPredictionsMenu } from "@/components/common/DesktopNavOtherPredictionsMenu";
import { DesktopNavUnlockPremium } from "@/components/common/DesktopNavUnlockPremium";
import {
  DESKTOP_SIDEBAR_ASTROLOGER_PORTAL_LINK,
  DESKTOP_SIDEBAR_BOOK_LINK,
  DESKTOP_SIDEBAR_DAILY_PREDICTION_LINK,
  DESKTOP_SIDEBAR_LOVE_COMPATIBILITY_LINK,
  DESKTOP_SIDEBAR_NOTIFICATIONS_LINK,
  DESKTOP_SIDEBAR_WHATSAPP_LINK,
  DESKTOP_SIDEBAR_PANCHANG_LINK,
  DESKTOP_SIDEBAR_MUHURTHA_LINK,
  DESKTOP_SIDEBAR_SETTINGS_LINK,
  DESKTOP_SIDEBAR_GETTING_STARTED_LINK,
  DESKTOP_SIDEBAR_WEEKLY_PREDICTION_LINK,
} from "@/lib/constants/desktop-sidebar-nav";
import { HOME_DASHBOARD_SIDEBAR } from "@/lib/constants/home-dashboard-sidebar";
import { HOME_LAYOUT } from "@/lib/constants/home-layout";
import { APP_NAME, PUBLIC_ASSETS } from "@/lib/constants";
import type { DesktopMainNavProps } from "@/types";
import { cn, isAstrologerHomeSession } from "@/lib/utils";

/**
 * Desktop left rail — design ref dashboard sidebar (`lg+`).
 */
export function DesktopMainNav({ className, hideBrand = false }: DesktopMainNavProps) {
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

  return (
    <aside
      className={cn(
        "sticky top-0 z-30 hidden shrink-0 flex-col border-r border-neutral-200/90 bg-white lg:flex",
        hideBrand ? "h-full" : "h-dvh",
        HOME_LAYOUT.desktopAsideWidth,
        className
      )}
      aria-label="Main navigation"
    >
      {!hideBrand ? (
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
      ) : null}

      <nav
        className={cn(
          "scrollbar-hidden flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4",
          hideBrand && "pt-4"
        )}
      >
        {isAuthenticated ? (
          <DesktopNavGreeting
            userName={user?.name}
            isAuthenticated={isAuthenticated}
          />
        ) : null}

        <DesktopNavAiChatCard />

        <DesktopNavItem
          iconSrc={DESKTOP_SIDEBAR_DAILY_PREDICTION_LINK.icon}
          label={HDS.dailyPredictions}
          active={pathname.startsWith(DESKTOP_SIDEBAR_DAILY_PREDICTION_LINK.href)}
          onClick={() =>
            guardNavigation(DESKTOP_SIDEBAR_DAILY_PREDICTION_LINK.href, {
              redirectHomeOnClose: true,
            })
          }
        />

        <DesktopNavItem
          iconSrc={DESKTOP_SIDEBAR_WEEKLY_PREDICTION_LINK.icon}
          label={HDS.weeklyPredictions}
          active={pathname.startsWith(DESKTOP_SIDEBAR_WEEKLY_PREDICTION_LINK.href)}
          onClick={() =>
            guardNavigation(DESKTOP_SIDEBAR_WEEKLY_PREDICTION_LINK.href, {
              redirectHomeOnClose: true,
            })
          }
        />

        <DesktopNavItem
          iconSrc={DESKTOP_SIDEBAR_LOVE_COMPATIBILITY_LINK.icon}
          label={HDS.loveCompatibility}
          active={pathname.startsWith(DESKTOP_SIDEBAR_LOVE_COMPATIBILITY_LINK.href)}
          onClick={() =>
            guardNavigation(DESKTOP_SIDEBAR_LOVE_COMPATIBILITY_LINK.href, {
              redirectHomeOnClose: true,
            })
          }
        />

        <DesktopNavOtherPredictionsMenu />

        {isAstrologer ? (
          <DesktopNavItem
            iconSrc={consultSidebarLink.icon}
            label={HDS.astrologerPortal}
            active={pathname.startsWith(consultSidebarLink.href)}
            onClick={() =>
              guardNavigation(consultSidebarLink.href, { redirectHomeOnClose: true })
            }
          />
        ) : (
          <DesktopNavItem
            iconSrc={consultSidebarLink.icon}
            label={HDS.bookConsultation}
            active={pathname.startsWith(consultSidebarLink.href)}
            onClick={() =>
              guardNavigation(consultSidebarLink.href, { redirectHomeOnClose: true })
            }
          />
        )}

        <DesktopNavItem
          iconSrc={DESKTOP_SIDEBAR_PANCHANG_LINK.icon}
          label={HDS.panchangam}
          active={pathname.startsWith(DESKTOP_SIDEBAR_PANCHANG_LINK.href)}
          onClick={() =>
            guardNavigation(DESKTOP_SIDEBAR_PANCHANG_LINK.href, {
              redirectHomeOnClose: true,
            })
          }
        />

        <DesktopNavItem
          iconSrc={DESKTOP_SIDEBAR_MUHURTHA_LINK.icon}
          label={HDS.muhurtha}
          active={pathname.startsWith(DESKTOP_SIDEBAR_MUHURTHA_LINK.href)}
          onClick={() =>
            guardNavigation(DESKTOP_SIDEBAR_MUHURTHA_LINK.href, {
              redirectHomeOnClose: true,
            })
          }
        />

        <DesktopNavItem
          iconSrc={DESKTOP_SIDEBAR_NOTIFICATIONS_LINK.icon}
          label={HDS.notifications}
          active={pathname.startsWith(DESKTOP_SIDEBAR_NOTIFICATIONS_LINK.href)}
          onClick={() =>
            guardNavigation(DESKTOP_SIDEBAR_NOTIFICATIONS_LINK.href, {
              redirectHomeOnClose: true,
            })
          }
        />

        <DesktopNavItem
          iconSrc={DESKTOP_SIDEBAR_WHATSAPP_LINK.icon}
          label={HDS.whatsappUpdates}
          active={pathname.startsWith(DESKTOP_SIDEBAR_WHATSAPP_LINK.href)}
          onClick={() =>
            guardNavigation(DESKTOP_SIDEBAR_WHATSAPP_LINK.href, {
              redirectHomeOnClose: true,
            })
          }
        />

        <DesktopNavItem
          href={DESKTOP_SIDEBAR_SETTINGS_LINK.href}
          iconSrc={DESKTOP_SIDEBAR_SETTINGS_LINK.icon}
          label={HDS.settings}
          active={pathname.startsWith(DESKTOP_SIDEBAR_SETTINGS_LINK.href)}
        />

        <DesktopNavItem
          href={DESKTOP_SIDEBAR_GETTING_STARTED_LINK.href}
          iconSrc={DESKTOP_SIDEBAR_GETTING_STARTED_LINK.icon}
          label={HDS.gettingStarted}
          active={pathname.startsWith(DESKTOP_SIDEBAR_GETTING_STARTED_LINK.href)}
        />

        {showPremiumUpsell ? (
          <div className="mt-auto pt-4">
            <DesktopNavUnlockPremium />
          </div>
        ) : null}
      </nav>
    </aside>
  );
}
