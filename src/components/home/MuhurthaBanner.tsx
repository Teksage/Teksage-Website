"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { AuthGatedLink } from "@/components/common/AuthGatedLink";
import { cn } from "@/lib/utils";
import {
  DASHBOARD_ASSETS,
  HOME_DASHBOARD,
  HOME_DASHBOARD_UI,
  HOME_LAYOUT,
  ROUTES,
} from "@/lib/constants";
import type { MuhurthaBannerProps } from "@/types";

/** Home strip — soft mint gradient, distinct from consultation lime and chat dark. */
export function MuhurthaBanner({ className }: MuhurthaBannerProps) {
  const HD = useI18nConstants(HOME_DASHBOARD);
  const href = ROUTES.eventPlanner;

  return (
    <AuthGatedLink
      href={href}
      returnPath={href}
      redirectHomeOnClose
      className={cn("group block w-full", className)}
    >
      <div
        className={cn(
          "relative isolate w-full min-w-0 overflow-hidden",
          HOME_LAYOUT.homeBannerStripMinH,
          HOME_LAYOUT.homeCardRadius,
          HOME_LAYOUT.eventPlannerBannerShell
        )}
      >
        <div aria-hidden className={HOME_DASHBOARD_UI.eventPlannerBannerGlow} />

        <div
          className={cn(
            "relative z-10 flex w-full items-center justify-evenly gap-2 px-2 py-2 sm:gap-3 sm:px-3 sm:py-3",
            HOME_LAYOUT.homeBannerStripMinH
          )}
        >
          <p className={HOME_DASHBOARD_UI.eventPlannerBannerTitle}>{HD.eventPlannerBannerTitle}</p>

          <Image
            src={DASHBOARD_ASSETS.muhurthaHero}
            alt=""
            width={38}
            height={38}
            unoptimized
            className="pointer-events-none size-[2.125rem] shrink-0 object-contain sm:size-[2.375rem]"
            aria-hidden
          />

          <div className={HOME_DASHBOARD_UI.eventPlannerBannerCtaPill}>
            <span className={HOME_DASHBOARD_UI.eventPlannerBannerCta}>{HD.eventPlannerBannerCta}</span>
            <Image
              src={DASHBOARD_ASSETS.chatStripArrow}
              alt=""
              width={14}
              height={14}
              unoptimized
              className="shrink-0"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </AuthGatedLink>
  );
}
