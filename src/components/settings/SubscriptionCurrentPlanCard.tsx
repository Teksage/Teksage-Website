"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { SETTINGS_PAGE_ASSETS } from "@/lib/constants/assets";
import { SETTINGS_UI } from "@/lib/constants/settings-ui";
import { SETTINGS_SUBSCRIPTIONS_COPY } from "@/lib/constants/settings-subscriptions";
import { currentPlanTenureLine } from "@/lib/subscription-plan-label";
import { cn } from "@/lib/utils";

type SubscriptionCurrentPlanCardProps = {
  symbol: string;
  price: number;
  tenureValue: number;
  tenureUnit: string;
  daysLeft: number;
  progress: number;
};

export function SubscriptionCurrentPlanCard({
  symbol,
  price,
  tenureValue,
  tenureUnit,
  daysLeft,
  progress,
}: SubscriptionCurrentPlanCardProps) {
  const SUB = useI18nConstants(SETTINGS_SUBSCRIPTIONS_COPY);
  const progressPct = Math.round(progress * 100);
  const progressColor =
    progress < 0.1 ? "bg-red-500" : "bg-white";

  return (
    <div className={SETTINGS_UI.subscriptionCard}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Image
            src={SETTINGS_PAGE_ASSETS.subscriptionPro}
            alt=""
            width={80}
            height={80}
            unoptimized
            className="h-auto w-[4.5rem]"
          />
          <p className="mt-[18px] whitespace-pre-line text-lg font-semibold leading-snug text-white">
            {SUB.currentPlan}
          </p>
        </div>
        <div className={SETTINGS_UI.subscriptionPlanPriceBox}>
          <p className="text-price font-semibold leading-none">
            {symbol}
            {Math.round(price)}
          </p>
          <p className="mt-2.5 text-xs leading-none text-white/80">
            {currentPlanTenureLine(tenureValue, tenureUnit, SUB.planLabel)}
          </p>
          <div className="mx-auto mt-2.5 h-[5px] w-[100px] overflow-hidden rounded-full bg-white/10">
            <div
              className={cn("h-full rounded-full", progressColor)}
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="mt-2.5 text-micro leading-none text-white/90">
            {daysLeft} {SUB.daysLeft}
          </p>
        </div>
      </div>
    </div>
  );
}
