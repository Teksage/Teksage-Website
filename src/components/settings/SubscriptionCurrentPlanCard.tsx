"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { SETTINGS_PAGE_ASSETS } from "@/lib/constants/assets";
import { PREMIUM_PLAN_FEATURES, SETTINGS_UI } from "@/lib/constants/settings-ui";
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
  const features = useI18nConstants(PREMIUM_PLAN_FEATURES);
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
          <p className="mt-[18px] whitespace-pre-line text-lg font-semibold leading-none">
            {SUB.currentPlan}
          </p>
        </div>
        <div
          className={cn(
            "shrink-0 rounded-md bg-white/10 px-[15px] py-5 text-center"
          )}
        >
          <p className="text-[25px] font-semibold leading-none">
            {symbol}
            {Math.round(price)}
          </p>
          <p className="mt-2.5 text-xs leading-none text-white/60">
            {currentPlanTenureLine(tenureValue, tenureUnit, SUB.planLabel)}
          </p>
          <div className="mx-auto mt-2.5 h-[5px] w-[100px] overflow-hidden rounded-full bg-white/10">
            <div
              className={cn("h-full rounded-full", progressColor)}
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="mt-2.5 text-[10px] leading-none">
            {daysLeft} {SUB.daysLeft}
          </p>
        </div>
      </div>
      <div className="my-5 border-t border-dashed border-white/50" />
      <ul className="space-y-2.5">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center justify-between gap-3"
          >
            <span className="text-sm text-white/50">{feature}</span>
            <Image
              src={SETTINGS_PAGE_ASSETS.planCheck}
              alt=""
              width={20}
              height={20}
              unoptimized
              className="size-5 shrink-0"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
