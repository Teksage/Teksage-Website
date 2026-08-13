"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import Link from "next/link";
import { DESKTOP_SIDEBAR_UI } from "@/lib/constants/desktop-sidebar-ui";
import {
  HOME_DASHBOARD_SIDEBAR,
  HOME_DASHBOARD_SIDEBAR_ASSETS,
} from "@/lib/constants/home-dashboard-sidebar";
import { ROUTES } from "@/lib/constants/routes";
import { DASHBOARD_ASSETS } from "@/lib/constants/assets";

export function DesktopNavUnlockPremium() {
  const HDS = useI18nConstants(HOME_DASHBOARD_SIDEBAR);

  return (
    <div className={DESKTOP_SIDEBAR_UI.premiumCard}>
      <div className={DESKTOP_SIDEBAR_UI.premiumBadge}>
        <Image
          src={HOME_DASHBOARD_SIDEBAR_ASSETS.premiumCrown}
          alt=""
          width={14}
          height={14}
          unoptimized
          className={DESKTOP_SIDEBAR_UI.premiumBadgeIcon}
        />
        <span className={DESKTOP_SIDEBAR_UI.premiumBadgeText}>
          {HDS.premiumBadge}
        </span>
      </div>
      <p className={DESKTOP_SIDEBAR_UI.premiumTitle}>{HDS.unlockPremium}</p>
      <p className={DESKTOP_SIDEBAR_UI.premiumHint}>{HDS.unlockPremiumHint}</p>
      <Link
        href={ROUTES.settingsSubscriptions}
        className={DESKTOP_SIDEBAR_UI.premiumCta}
      >
        {HDS.upgradeNow}
        <Image
          src={DASHBOARD_ASSETS.downArrow}
          alt=""
          width={14}
          height={14}
          unoptimized
          className={DESKTOP_SIDEBAR_UI.premiumCtaChevron}
        />
      </Link>
    </div>
  );
}
