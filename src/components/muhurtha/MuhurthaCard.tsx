"use client";

import { useI18nConstants } from "@/hooks/useT";
import { AuthGatedLink } from "@/components/common/AuthGatedLink";
import { cn } from "@/lib/utils";
import {
  DASHBOARD_ASSETS,
  HOME_DASHBOARD,
  HOME_DASHBOARD_UI,
  HOME_LAYOUT,
  ROUTES,
} from "@/lib/constants";
import type { MuhurthaCardProps } from "@/types";

export function MuhurthaCard({ className }: MuhurthaCardProps) {
  const HD = useI18nConstants(HOME_DASHBOARD);
  const href = ROUTES.muhurtha;

  return (
    <AuthGatedLink
      href={href}
      returnPath={href}
      redirectHomeOnClose
      className={cn("group block flex-1", className)}
    >
      <div
        className={cn(
          "relative flex flex-col overflow-hidden bg-white",
          HOME_LAYOUT.featureCardHeight,
          HOME_LAYOUT.homeCardRadius,
          "shadow-[0_4px_20px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.05]"
        )}
      >
        <div className="relative z-10 flex shrink-0 justify-center px-2 pt-5">
          <p className={HOME_DASHBOARD_UI.matchCardTitle}>{HD.muhurthaLines}</p>
        </div>
        <div className="relative mt-auto flex flex-1 items-end justify-center pb-2 pt-2">
          <img
            src={DASHBOARD_ASSETS.muhurthaHero}
            alt=""
            className="h-14 w-14 object-contain opacity-90"
          />
        </div>
      </div>
    </AuthGatedLink>
  );
}
