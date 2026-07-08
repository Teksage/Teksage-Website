"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  MUHURTHA_LAYOUT,
  MUHURTHA_SCREEN,
  PANCHANG_ASSETS,
  ROUTES,
} from "@/lib/constants";
import { DASHBOARD_ASSETS } from "@/lib/constants/assets";
import type { MuhurthaPremiumGateProps } from "@/types";
import { cn } from "@/lib/utils";

export function MuhurthaPremiumGate({ className }: MuhurthaPremiumGateProps) {
  const M = useI18nConstants(MUHURTHA_SCREEN);
  const L = MUHURTHA_LAYOUT;

  return (
    <div className={cn(L.premiumGateRoot, className)}>
      <div aria-hidden className={L.premiumGateBackdrop}>
        <div className={L.premiumGateDesktopMint} />
        <div className={cn("absolute inset-0 lg:hidden", L.premiumGateGradient)}>
          <Image
            src={PANCHANG_ASSETS.personalizedBackground}
            alt=""
            fill
            className="object-cover opacity-40"
            sizes="100vw"
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
          <h2 className={L.premiumGateTitle}>{M.premiumTitle}</h2>
          <p className={L.premiumGateDescription}>{M.premiumDescription}</p>
          <div className={L.premiumGateCtaWrap}>
            <Link
              href={ROUTES.settingsSubscriptions}
              className={cn(buttonVariants({ size: "lg" }), L.premiumGateCta)}
            >
              {M.upgradeCta}
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
