"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Yearly2027PromoBanner } from "@/components/home/Yearly2027PromoBanner";
import { Yearly2027PromoSheet } from "@/components/home/Yearly2027PromoSheet";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useYearly2027Promo } from "@/hooks/useYearly2027Promo";
import { ROUTES } from "@/lib/constants/routes";
import { useAuthStore } from "@/store/auth.store";
import { useYearly2027PromoUiStore } from "@/store/yearly-2027-promo.store";
import { cn } from "@/lib/utils";

type Yearly2027PromoPromptProps = {
  /** `chat` — desktop banner inside embedded chat. `sheet` — mobile bottom sheet. */
  surface?: "chat" | "sheet";
  className?: string;
};

/** Once-per-day 2027 promo — chat banner (desktop) or bottom sheet (mobile). */
export function Yearly2027PromoPrompt({
  surface = "sheet",
  className,
}: Yearly2027PromoPromptProps) {
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isHome =
    pathname === ROUTES.home || pathname.startsWith(`${ROUTES.home}/`);

  const surfaceReady =
    isDesktop !== null &&
    (surface === "chat" ? isDesktop : !isDesktop);

  const enabled = Boolean(isAuthenticated && isHome && surfaceReady);
  const { status, dismiss, openYearly, openUpgrade } = useYearly2027Promo(enabled);
  const setSheetOpen = useYearly2027PromoUiStore((s) => s.setSheetOpen);
  const setBannerVisible = useYearly2027PromoUiStore((s) => s.setBannerVisible);

  useEffect(() => {
    if (surface !== "sheet") return;
    setSheetOpen(Boolean(enabled && status.showSheet));
    return () => setSheetOpen(false);
  }, [surface, enabled, status.showSheet, setSheetOpen]);

  useEffect(() => {
    if (surface !== "chat") return;
    setBannerVisible(Boolean(enabled && status.showBanner));
    return () => setBannerVisible(false);
  }, [surface, enabled, status.showBanner, setBannerVisible]);

  if (!enabled) return null;

  if (surface === "chat") {
    if (!status.showBanner) return null;
    return (
      <div className={cn("relative z-20 shrink-0 px-2.5 pb-0.5 pt-1 sm:px-3", className)}>
        <Yearly2027PromoBanner
          scores={status.scores}
          isPremium={status.isPremium}
          generating={status.generating}
          onClose={() => void dismiss()}
          onOpenYearly={() => void openYearly()}
          onUpgrade={() => void openUpgrade()}
        />
      </div>
    );
  }

  return (
    <Yearly2027PromoSheet
      open={status.showSheet}
      scores={status.scores}
      isPremium={status.isPremium}
      generating={status.generating}
      onClose={() => void dismiss()}
      onOpenYearly={() => void openYearly()}
      onUpgrade={() => void openUpgrade()}
    />
  );
}
