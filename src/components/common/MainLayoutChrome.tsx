"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/common/BottomNav";
import { DesktopMainNav } from "@/components/common/DesktopMainNav";
import { HomeDesktopTopHeader } from "@/components/home/HomeDesktopTopHeader";
import { ProtectedRoutePrompt } from "@/components/common/ProtectedRoutePrompt";
import { AskAnswerReadyPrompt } from "@/components/common/AskAnswerReadyPrompt";
import { HOME_LAYOUT, ROUTES, isPredictionsPath } from "@/lib/constants";
import {
  isConsultationCheckoutPath,
  isConsultationGreenFullBleedPath,
} from "@/lib/constants/consultation-routes";
import { useAuthStore } from "@/store/auth.store";
import { cn } from "@/lib/utils";

export function MainLayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isChatRoute = pathname === ROUTES.chat || pathname.startsWith(`${ROUTES.chat}/`);
  const isHomeRoute = pathname === ROUTES.home || pathname.startsWith(`${ROUTES.home}/`);
  const isConsultGreen = isConsultationGreenFullBleedPath(pathname);
  const isConsultCheckout = isConsultationCheckoutPath(pathname);
  const isSubscriptionFlow = pathname.startsWith(ROUTES.settingsSubscriptions);
  const isPredictionPane =
    isPredictionsPath(pathname) || pathname.startsWith(ROUTES.matchmaking);
  const isFullHeightPane =
    isChatRoute || isHomeRoute || isSubscriptionFlow;
  const hideBottomNav = isChatRoute || isSubscriptionFlow;
  /** Top header shows brand when logged in — avoid duplicating it in the sidebar. */
  const hideSidebarBrand = isAuthenticated;

  const mainPaneClass = cn(
    isFullHeightPane &&
      "min-h-dvh p-0 lg:h-full lg:min-h-0 lg:overflow-hidden lg:pb-0",
    isPredictionPane &&
      "flex min-h-0 flex-1 flex-col overflow-y-auto p-0 lg:h-full lg:min-h-0",
    !isFullHeightPane &&
      !isPredictionPane &&
      cn(HOME_LAYOUT.bottomNavClearance, "min-h-0 lg:h-full lg:overflow-y-auto"),
    isConsultGreen && "bg-[var(--color-consult-user-bg)]",
    isConsultCheckout && "bg-white",
    isSubscriptionFlow &&
      "flex min-h-dvh flex-col bg-black lg:h-full lg:min-h-0 lg:overflow-hidden lg:pb-0"
  );

  return (
    <>
      <Suspense fallback={null}>
        <ProtectedRoutePrompt />
        <AskAnswerReadyPrompt />
      </Suspense>
      <div className="flex min-h-screen flex-col bg-transparent lg:h-dvh lg:overflow-hidden">
        {isAuthenticated ? <HomeDesktopTopHeader /> : null}
        <div className="flex min-h-0 flex-1">
          <div className={cn(isChatRoute && "hidden lg:block")}>
            <DesktopMainNav hideBrand={hideSidebarBrand} className="h-full" />
          </div>
          <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
            <main className={mainPaneClass}>{children}</main>
            {hideBottomNav ? null : <BottomNav />}
          </div>
        </div>
      </div>
    </>
  );
}
