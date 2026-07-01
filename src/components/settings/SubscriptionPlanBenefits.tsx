"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useI18nConstants } from "@/hooks/useT";
import { SETTINGS_PAGE_ASSETS } from "@/lib/constants/assets";
import { SETTINGS_UI } from "@/lib/constants/settings-ui";
import { SETTINGS_SUBSCRIPTIONS_COPY } from "@/lib/constants/settings-subscriptions";
import {
  benefitRowsForPlan,
  compareBenefitRows,
} from "@/lib/subscription-plan-benefits";
import type { SubscriptionPlan } from "@/types/settings";
import type { SubscriptionPlanBenefitsProps } from "@/types/ui/settings";
import { cn } from "@/lib/utils";

function FeatureCheckIcon({ included }: { included: boolean }) {
  if (included) {
    return (
      <Image
        src={SETTINGS_PAGE_ASSETS.planCheck}
        alt=""
        width={20}
        height={20}
        unoptimized
        className="size-5 shrink-0"
      />
    );
  }
  return (
    <Image
      src={SETTINGS_PAGE_ASSETS.planUncheck}
      alt=""
      width={20}
      height={20}
      unoptimized
      className="size-5 shrink-0 opacity-55"
    />
  );
}

/** Flutter `subscriptionComponent` compare + `subscription_home_page` pro list. */
export function SubscriptionPlanBenefits({
  selectedPlan,
  isPremium,
  className,
}: SubscriptionPlanBenefitsProps) {
  const copy = useI18nConstants(SETTINGS_SUBSCRIPTIONS_COPY);
  const compareRows = useMemo(() => compareBenefitRows(), []);
  const includedRows = useMemo(
    () => benefitRowsForPlan(selectedPlan),
    [selectedPlan]
  );
  const compareLabels = useI18nConstants(compareRows.map((r) => r.label));
  const includedLabels = useI18nConstants(includedRows.map((r) => r.label));

  if (!isPremium && compareRows.length > 0) {
    return (
      <div
        className={cn(
          "relative z-10 mt-6 rounded-xl border border-white/15",
          "bg-[var(--color-subscription-card-surface)] px-5 py-5",
          className
        )}
      >
        <div className={SETTINGS_UI.subscriptionCompareHeader}>
          <span>{copy.comparePlans}</span>
          <div className="flex shrink-0 gap-8 pr-1">
            <span className={SETTINGS_UI.subscriptionCompareCol}>{copy.comparePro}</span>
            <span className={SETTINGS_UI.subscriptionCompareCol}>{copy.compareFree}</span>
          </div>
        </div>
        <div className="my-4 border-t border-dashed border-white/50" />
        <ul className="space-y-2.5">
          {compareRows.map((row, index) => (
            <li key={row.label} className={SETTINGS_UI.subscriptionCompareRow}>
              <span
                className={cn(
                  SETTINGS_UI.subscriptionFeatureLabel,
                  "min-w-0 flex-1 text-white/50"
                )}
              >
                {compareLabels[index]}
              </span>
              <div className="flex shrink-0 gap-8">
                <span className={SETTINGS_UI.subscriptionCompareCol}>
                  <FeatureCheckIcon included={row.proIncluded} />
                </span>
                <span className={SETTINGS_UI.subscriptionCompareCol}>
                  <FeatureCheckIcon included={row.freeIncluded} />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!selectedPlan) return null;

  return (
    <div
      key={selectedPlan.planId}
      className={cn(
        "relative z-10 mt-6 rounded-xl border border-white/15",
        "bg-[var(--color-subscription-card-surface)] px-5 py-5",
        className
      )}
    >
      <p className="text-base font-semibold text-white">{copy.planBenefitsTitle}</p>
      <div className="my-4 border-t border-dashed border-white/50" />
      <ul className="space-y-2.5">
        {includedRows.map((row, index) => (
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
              {includedLabels[index]}
            </span>
            <FeatureCheckIcon included={row.included} />
          </li>
        ))}
      </ul>
    </div>
  );
}
