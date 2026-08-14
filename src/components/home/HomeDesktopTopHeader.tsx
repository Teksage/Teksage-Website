"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18nConstants } from "@/hooks/useT";
import { AuthGatedLink } from "@/components/common/AuthGatedLink";
import { ProfileQuickMenu } from "@/components/common/ProfileQuickMenu";
import { HomePanchangTimingPills } from "@/components/home/HomePanchangTimingPills";
import { HomeReferralTopBarPill } from "@/components/home/HomeReferralTopBarPill";
import {
  DASHBOARD_ASSETS,
  HOME_DASHBOARD,
  HOME_DASHBOARD_UI,
  ROUTES,
} from "@/lib/constants";
import { CHAT_LANDING_UI } from "@/lib/constants/chat-landing-ui";
import { HOME_EMBED_HEADER_UI as UI } from "@/lib/constants/home-embed-header-ui";
import { HOME_DASHBOARD_SIDEBAR } from "@/lib/constants/home-dashboard-sidebar";
import { userInitialsFromProfile } from "@/lib/chat-helpers";
import { useAuthStore } from "@/store/auth.store";
import { useDashboard } from "@/hooks/useDashboard";
import type { HomeDesktopTopHeaderProps } from "@/types/ui/home-embed-header";
import { cn } from "@/lib/utils";

/** Desktop (`lg+`) — greeting row + mint Panchang strip above the main pane. */
export function HomeDesktopTopHeader({ className }: HomeDesktopTopHeaderProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const HDS = useI18nConstants(HOME_DASHBOARD_SIDEBAR);
  const HD = useI18nConstants(HOME_DASHBOARD);
  const landingCopy = useI18nConstants(CHAT_LANDING_UI);
  const { unreadCount } = useDashboard();

  const displayName =
    user?.name?.trim() || user?.firstName?.trim() || HDS.helloGuest;
  const initials = userInitialsFromProfile(
    user?.firstName,
    user?.lastName,
    user?.name
  );

  if (!isAuthenticated) return null;

  return (
    <header
      className={cn(UI.desktopTopHeader, className)}
      aria-label="Teksage home"
    >
      <div className={UI.topRow}>
        <div className={UI.greetingRow}>
          <p className={UI.helloText}>
            {HDS.hello}, {displayName}
          </p>
          <div className={UI.actionsRow}>
            <HomeReferralTopBarPill discount={user?.partnerDiscount} />
            <Link href={ROUTES.gettingStarted} className={UI.gettingStartedPill}>
              <Image
                src={UI.gettingStartedIcon}
                alt=""
                width={16}
                height={16}
                unoptimized
                className="size-4"
              />
              {landingCopy.gettingStarted}
            </Link>
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
                width={24}
                height={24}
                unoptimized
                className="block size-6"
              />
              {unreadCount > 0 ? (
                <span className={HOME_DASHBOARD_UI.notificationBadge}>
                  {unreadCount > 9
                    ? HD.notificationCountOverflow
                    : unreadCount}
                </span>
              ) : null}
            </AuthGatedLink>
            <ProfileQuickMenu
              userInitials={initials}
              userName={displayName}
              userSubtitle={user?.email?.trim() || user?.mobile?.trim()}
            />
          </div>
        </div>
      </div>
      <div className={UI.panchangRow}>
        <div className={UI.panchangPane}>
          <HomePanchangTimingPills />
        </div>
      </div>
    </header>
  );
}
