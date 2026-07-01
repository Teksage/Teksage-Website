"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { SETTINGS_PAGE_ASSETS } from "@/lib/constants/assets";
import { SETTINGS_UI } from "@/lib/constants/settings-ui";
import { SETTINGS_SUBSCRIPTIONS_COPY } from "@/lib/constants/settings-subscriptions";
import { planDurationText } from "@/lib/subscription-plan-label";
import type { SubscriptionPlan } from "@/types/settings";
import { cn } from "@/lib/utils";

type SubscriptionPlanPickerProps = {
  plans: SubscriptionPlan[];
  selectedId: number | null;
  recommendedId: number | null;
  symbol: string;
  priceOf: (plan: SubscriptionPlan) => number;
  originalPriceOf?: (plan: SubscriptionPlan) => number | null;
  onSelect: (planId: number) => void;
};

export function SubscriptionPlanPicker({
  plans,
  selectedId,
  recommendedId,
  symbol,
  priceOf,
  originalPriceOf,
  onSelect,
}: SubscriptionPlanPickerProps) {
  const SUB = useI18nConstants(SETTINGS_SUBSCRIPTIONS_COPY);

  if (plans.length === 0) return null;

  return (
    <div className={SETTINGS_UI.subscriptionPlanRow}>
      {plans.map((plan) => {
        const selected = plan.planId === selectedId;
        const recommended = plan.planId === recommendedId;

        const originalPrice = originalPriceOf?.(plan) ?? null;

        return (
          <button
            key={plan.planId}
            type="button"
            onClick={() => onSelect(plan.planId)}
            className="relative min-w-0 flex-1"
          >
            {selected ? (
              <Image
                src={SETTINGS_PAGE_ASSETS.planSelected}
                alt=""
                width={24}
                height={24}
                unoptimized
                className="absolute right-0 top-[5px] z-10 size-6"
              />
            ) : null}
            <div
              className={cn(
                SETTINGS_UI.subscriptionPlanCard,
                selected && SETTINGS_UI.subscriptionPlanCardSelected,
                !selected && SETTINGS_UI.subscriptionPlanCardIdle
              )}
            >
              {originalPrice != null ? (
                <p className="mb-1 text-xs leading-none text-white/55 line-through">
                  {symbol}
                  {Math.round(originalPrice)}
                </p>
              ) : null}
              <p className="text-price font-semibold leading-none">
                {symbol}
                {Math.round(priceOf(plan))}
              </p>
              <p className="mt-1.5 text-sm leading-none text-white/60">
                {planDurationText(plan)}
              </p>
              {recommended ? (
                <span className="mt-1.5 rounded-xl bg-white px-2.5 py-1 text-2xs font-semibold leading-none text-[var(--color-brand-primary)]">
                  {SUB.recommended}
                </span>
              ) : (
                <span className="mt-1.5 block h-[22px]" aria-hidden />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
