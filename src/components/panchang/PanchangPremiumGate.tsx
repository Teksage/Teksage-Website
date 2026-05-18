"use client";

import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  PANCHANG_ASSETS,
  PANCHANG_LAYOUT,
  PANCHANG_SCREEN,
  ROUTES,
} from "@/lib/constants";
import { DASHBOARD_ASSETS } from "@/lib/constants/assets";
import type { PanchangPremiumGateProps } from "@/types";
import { cn } from "@/lib/utils";

/** Non‑premium Panchang — starfield backdrop + centered upgrade card (Flutter `emptyPanchangPage.dart`). */
export function PanchangPremiumGate({ className }: PanchangPremiumGateProps) {
  const L = PANCHANG_LAYOUT;

  return (
    <div className={cn(L.premiumGateRoot, className)}>
      <div aria-hidden className={L.premiumGateBackdrop}>
        <div className={L.premiumGateDesktopMint} />
        <div className={cn(L.fillLayer, "lg:hidden")}>
          <div className={L.premiumGateGradient} />
          <Image
            src={PANCHANG_ASSETS.personalizedBackground}
            alt=""
            fill
            className={L.imageCover}
            sizes={L.imageSizes}
            priority
          />
        </div>
        <div className={L.premiumGateScrim} />
      </div>

      <div className={L.premiumGateContent}>
        <article className={L.premiumGateCard}>
          <div className={L.premiumGateIconWrap}>
            <Image
              src={DASHBOARD_ASSETS.sidebarPremiumCrown}
              alt=""
              width={32}
              height={32}
              unoptimized
              className="size-8"
            />
          </div>
          <h2 className={L.premiumGateTitle}>{PANCHANG_SCREEN.premiumTitle}</h2>
          <p className={L.premiumGateDescription}>{PANCHANG_SCREEN.premiumDescription}</p>
          <div className={L.premiumGateCtaWrap}>
            <Link
              href={ROUTES.settingsSubscriptions}
              className={cn(buttonVariants({ size: "lg" }), L.premiumGateCta)}
            >
              {PANCHANG_SCREEN.upgradeCta}
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
