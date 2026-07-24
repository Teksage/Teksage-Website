"use client";

import { useI18nConstants } from "@/hooks/useT";
import { AuthGatedLink } from "@/components/common/AuthGatedLink";
import { EventPlannerCalendarIcon } from "@/components/home/EventPlannerCalendarIcon";
import { cn } from "@/lib/utils";
import {
  HOME_DASHBOARD,
  HOME_DASHBOARD_UI,
  HOME_LAYOUT,
  ROUTES,
} from "@/lib/constants";
import type { MuhurthaBannerProps } from "@/types";

/** Home Event Planner strip — mirrors Flutter `EventPlannerHomeBanner` (mobile). */
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
          HOME_LAYOUT.homeCardRadius,
          HOME_LAYOUT.eventPlannerBannerShell,
          HOME_LAYOUT.eventPlannerBannerPad
        )}
      >
        <div className={HOME_DASHBOARD_UI.eventPlannerBannerRow}>
          <div className={HOME_DASHBOARD_UI.eventPlannerBannerCopy}>
            <p className={HOME_DASHBOARD_UI.eventPlannerBannerTitle}>
              {HD.eventPlannerBannerTitle}
            </p>
            <span className={HOME_DASHBOARD_UI.eventPlannerBannerCta}>
              {HD.eventPlannerBannerCta}
            </span>
          </div>
          <EventPlannerCalendarIcon />
        </div>
      </div>
    </AuthGatedLink>
  );
}
