"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/common/BottomNav";
import { DesktopMainNav } from "@/components/common/DesktopMainNav";
import { HomeDesktopTopHeader } from "@/components/home/HomeDesktopTopHeader";
import { ProtectedRoutePrompt } from "@/components/common/ProtectedRoutePrompt";
import { AskAnswerReadyPrompt } from "@/components/common/AskAnswerReadyPrompt";
import { FeatureDiscoveryPrompt } from "@/components/common/FeatureDiscoveryPrompt";
import { HOME_LAYOUT, ROUTES, isPredictionsPath } from "@/lib/constants";
import {
  isConsultationAstrologerSlotsPath,
  isConsultationCheckoutPath,
  isConsultationGreenFullBleedPath,
} from "@/lib/constants/consultation-routes";
import { useAuthStore } from "@/store/auth.store";
import { cn } from "@/lib/utils";
import { useSyncAuthProfileRole } from "@/hooks/useSyncAuthProfileRole";

export function MainLayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  useSyncAuthProfileRole();
  const isChatRoute = pathname === ROUTES.chat || pathname.startsWith(`${ROUTES.chat}/`);
  const isHomeRoute = pathname === ROUTES.home || pathname.startsWith(`${ROUTES.home}/`);
  const isConsultGreen = isConsultationGreenFullBleedPath(pathname);
  const isConsultCheckout = isConsultationCheckoutPath(pathname);
  const isConsultSlots = isConsultationAstrologerSlotsPath(pathname);
  const isSubscriptionFlow = pathname.startsWith(ROUTES.settingsSubscriptions);
  const isPredictionPane =
    isPredictionsPath(pathname) || pathname.startsWith(ROUTES.matchmaking);
  const isFullHeightPane =
    isChatRoute || isHomeRoute || isSubscriptionFlow;
  const hideBottomNav = isChatRoute || isSubscriptionFlow;

  const mainPaneClass = cn(
    isFullHeightPane &&
      "min-h-dvh p-0 lg:h-full lg:min-h-0 lg:overflow-hidden lg:pb-0",
    isConsultSlots &&
      "flex min-h-dvh flex-col overflow-hidden p-0 pb-0 lg:h-full lg:min-h-0",
    isPredictionPane &&
      "flex min-h-0 flex-1 flex-col overflow-y-auto p-0 lg:h-full lg:min-h-0",
    !isFullHeightPane &&
      !isPredictionPane &&
      !isConsultSlots &&
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
        <FeatureDiscoveryPrompt />
      </Suspense>
      <div className="flex min-h-screen flex-col bg-transparent lg:h-dvh lg:overflow-hidden">
        <div className="relative z-0 flex min-h-0 flex-1">
          <div className={cn(isChatRoute && "hidden lg:block")}>
            <DesktopMainNav className="h-full" />
          </div>
          <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
            {isAuthenticated ? <HomeDesktopTopHeader /> : null}
            <main className={mainPaneClass}>{children}</main>
            {hideBottomNav ? null : <BottomNav />}
          </div>
        </div>
      </div>
    </>
  );
}
