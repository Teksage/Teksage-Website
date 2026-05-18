"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/common/BottomNav";
import { DesktopMainNav } from "@/components/common/DesktopMainNav";
import { HOME_LAYOUT, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MainLayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChatRoute = pathname === ROUTES.chat || pathname.startsWith(`${ROUTES.chat}/`);
  const isHomeRoute = pathname === ROUTES.home || pathname.startsWith(`${ROUTES.home}/`);
  const isFullHeightPane = isChatRoute || isHomeRoute;

  return (
    <div className="flex min-h-screen bg-transparent">
      <div className={cn(isChatRoute && "hidden lg:block")}>
        <DesktopMainNav />
      </div>
      <div className="relative flex min-h-screen min-w-0 flex-1 flex-col">
        <main
          className={cn(
            isFullHeightPane
              ? "min-h-dvh p-0 lg:h-dvh lg:overflow-hidden lg:pb-0"
              : HOME_LAYOUT.bottomNavClearance
          )}
        >
          {children}
        </main>
        {isChatRoute ? null : <BottomNav />}
      </div>
    </div>
  );
}
