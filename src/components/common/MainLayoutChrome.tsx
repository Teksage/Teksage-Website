"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/common/BottomNav";
import { DesktopMainNav } from "@/components/common/DesktopMainNav";
import { HomeDesktopTopHeader } from "@/components/home/HomeDesktopTopHeader";
import { ProtectedRoutePrompt } from "@/components/common/ProtectedRoutePrompt";
import { HOME_LAYOUT, ROUTES } from "@/lib/constants";
import {
  isConsultationCheckoutPath,
  isConsultationGreenFullBleedPath,
} from "@/lib/constants/consultation-routes";
import { cn } from "@/lib/utils";

export function MainLayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChatRoute = pathname === ROUTES.chat || pathname.startsWith(`${ROUTES.chat}/`);
  const isHomeRoute = pathname === ROUTES.home || pathname.startsWith(`${ROUTES.home}/`);
  const isConsultGreen = isConsultationGreenFullBleedPath(pathname);
  const isConsultCheckout = isConsultationCheckoutPath(pathname);
  const isSubscriptionFlow = pathname.startsWith(ROUTES.settingsSubscriptions);
  const isFullHeightPane =
    isChatRoute || isHomeRoute || isSubscriptionFlow;
  const hideBottomNav = isChatRoute || isSubscriptionFlow;

  const mainPaneClass = cn(
    isFullHeightPane
      ? "min-h-dvh p-0 lg:h-full lg:min-h-0 lg:overflow-hidden lg:pb-0"
      : cn(
          HOME_LAYOUT.bottomNavClearance,
          "min-h-0 lg:h-full lg:overflow-y-auto"
        ),
    isConsultGreen && "bg-[var(--color-consult-user-bg)]",
    isConsultCheckout && "bg-white",
    isSubscriptionFlow &&
      "flex min-h-dvh flex-col bg-black lg:h-full lg:min-h-0 lg:overflow-hidden lg:pb-0"
  );

  return (
    <>
      <Suspense fallback={null}>
        <ProtectedRoutePrompt />
      </Suspense>
      <div className="flex min-h-screen flex-col bg-transparent lg:h-dvh lg:overflow-hidden">
        <HomeDesktopTopHeader />
        <div className="flex min-h-0 flex-1">
          <div className={cn(isChatRoute && "hidden lg:block")}>
            <DesktopMainNav hideBrand className="h-full" />
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
