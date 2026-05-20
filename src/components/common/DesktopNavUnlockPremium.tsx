"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import Link from "next/link";
import {
  HOME_DASHBOARD_SIDEBAR,
  HOME_DASHBOARD_SIDEBAR_ASSETS,
} from "@/lib/constants/home-dashboard-sidebar";
import { ROUTES } from "@/lib/constants/routes";

export function DesktopNavUnlockPremium() {
  const HDS = useI18nConstants(HOME_DASHBOARD_SIDEBAR);
  const HOM = useI18nConstants(HOME_DASHBOARD_SIDEBAR_ASSETS);
  return (
    <div className="relative mt-auto rounded-2xl border border-[var(--color-brand-primary)]/15 bg-[var(--color-home-screen-mint)]/60 p-4">
      <Image
        src={HOME_DASHBOARD_SIDEBAR_ASSETS.premiumCrown}
        alt=""
        width={28}
        height={28}
        unoptimized
        className="absolute right-3 top-3 size-7"
      />
      <p className="pr-8 text-base font-bold text-[var(--color-brand-primary)]">
        {HDS.unlockPremium}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-neutral-600">
        {HDS.unlockPremiumHint}
      </p>
      <Link
        href={ROUTES.settingsSubscriptions}
        className="mt-3 flex w-full items-center justify-center rounded-full bg-[var(--color-brand-primary)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-brand-primary)]/90"
      >
        {HDS.upgradeNow}
      </Link>
    </div>
  );
}
