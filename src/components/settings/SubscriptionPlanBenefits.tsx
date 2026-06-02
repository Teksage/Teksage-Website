"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useI18nConstants } from "@/hooks/useT";
import { SETTINGS_PAGE_ASSETS } from "@/lib/constants/assets";
import { SETTINGS_UI } from "@/lib/constants/settings-ui";
import { SETTINGS_SUBSCRIPTIONS_COPY } from "@/lib/constants/settings-subscriptions";
import { benefitRowsForPlan } from "@/lib/subscription-plan-benefits";
import type { SubscriptionPlan } from "@/types/settings";
import { cn } from "@/lib/utils";

type SubscriptionPlanBenefitsProps = {
  selectedPlan: SubscriptionPlan | null | undefined;
  className?: string;
};

/** Flutter feature list; checks reflect selected plan `plan_services` from API. */
export function SubscriptionPlanBenefits({
  selectedPlan,
  className,
}: SubscriptionPlanBenefitsProps) {
  const copy = useI18nConstants(SETTINGS_SUBSCRIPTIONS_COPY);
  const rows = useMemo(
    () => benefitRowsForPlan(selectedPlan),
    [selectedPlan]
  );
  const labels = useI18nConstants(rows.map((r) => r.label));

  if (!selectedPlan) return null;

  return (
    <div
      key={selectedPlan.planId}
      className={cn(
        "relative z-10 mt-6 hidden rounded-xl border border-white/15",
        "bg-[var(--color-subscription-card-surface)] px-5 py-5 lg:block",
        className
      )}
    >
      <p className="text-base font-semibold text-white">{copy.planBenefitsTitle}</p>
      <div className="my-4 border-t border-dashed border-white/50" />
      <ul className="space-y-2.5">
        {rows.map((row, index) => (
          <li
            key={row.label}
            className="flex items-center justify-between gap-3"
          >
            <span
              className={cn(
                SETTINGS_UI.subscriptionFeatureLabel,
                !row.included && "text-white/40"
              )}
            >
              {labels[index]}
            </span>
            {row.included ? (
              <Image
                src={SETTINGS_PAGE_ASSETS.planCheck}
                alt=""
                width={20}
                height={20}
                unoptimized
                className="size-5 shrink-0"
              />
            ) : (
              <span
                className="size-5 shrink-0 rounded border border-white/25 bg-white/5"
                aria-hidden
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
