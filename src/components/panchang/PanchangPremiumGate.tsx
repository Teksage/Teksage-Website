"use client";

import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { DASHBOARD_ASSETS } from "@/lib/constants/assets";
import { PANCHANG_SCREEN, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function PanchangPremiumGate() {
  return (
    <div className="flex flex-col">
      <div className="relative min-h-[50vh] w-full overflow-hidden rounded-b-3xl bg-gradient-to-b from-[var(--color-panchang-hero-top)] to-[var(--color-panchang-hero-bottom)]">
        <Image
          src={DASHBOARD_ASSETS.panchangHero}
          alt=""
          width={PANCHANG_SCREEN.heroImageWidthPx}
          height={PANCHANG_SCREEN.heroImageHeightPx}
          className="h-auto w-full object-cover object-top opacity-90"
          priority
        />
      </div>
      <div className="flex flex-col gap-3 px-5 py-8 text-center">
        <h2 className="text-lg font-semibold text-[var(--color-brand-black)]">
          {PANCHANG_SCREEN.premiumTitle}
        </h2>
        <p className="text-sm text-neutral-600">{PANCHANG_SCREEN.premiumDescription}</p>
        <Link
          href={ROUTES.settingsSubscriptions}
          className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
        >
          {PANCHANG_SCREEN.subscriptionsCta}
        </Link>
      </div>
    </div>
  );
}
