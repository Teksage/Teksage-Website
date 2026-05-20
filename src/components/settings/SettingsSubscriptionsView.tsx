"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { SettingsSubpageHeader } from "@/components/settings/SettingsSubpageHeader";
import { SubscriptionCurrentPlanCard } from "@/components/settings/SubscriptionCurrentPlanCard";
import { SubscriptionPlanPicker } from "@/components/settings/SubscriptionPlanPicker";
import { SETTINGS_PAGE_ASSETS } from "@/lib/constants/assets";
import { SETTINGS_UI } from "@/lib/constants/settings-ui";
import { useConsultationCurrency } from "@/hooks/useConsultationCurrency";
import { useSubscriptionPage } from "@/hooks/useSubscriptionPage";
import { ROUTES } from "@/lib/constants/routes";
import { writeSubscriptionCheckout } from "@/lib/subscription-checkout-session";
import { cn } from "@/lib/utils";

type SettingsSubscriptionsViewProps = { onBack: () => void };

export function SettingsSubscriptionsView({ onBack }: SettingsSubscriptionsViewProps) {
  const router = useRouter();
  const currency = useConsultationCurrency();
  const {
    SUB,
    isPremium,
    currentPrice,
    tenureValue,
    tenureUnit,
    daysLeft,
    progress,
    pickerPlans,
    recommendedId,
    selectedId,
    setSelectedId,
    selectedPlan,
    showUpgradeBtn,
    loading,
    error,
    planPrice,
  } = useSubscriptionPage(currency);

  function onUpgrade() {
    if (!selectedPlan) return;
    writeSubscriptionCheckout({
      planId: selectedPlan.planId,
      currency,
    });
    router.push(ROUTES.settingsSubscriptionPayment);
  }

  const symbol = currency === "INR" ? "\u20b9" : "$";

  if (loading) {
    return (
      <div className="relative z-10 min-h-[40vh] bg-black px-5 py-8 text-white">
        <p className="text-sm text-white/70">Loading...</p>
      </div>
    );
  }

  return (
    <div className={SETTINGS_UI.subscriptionPageShell}>
      <Image
        src={SETTINGS_PAGE_ASSETS.subscriptionBg}
        alt=""
        width={800}
        height={400}
        unoptimized
        className={SETTINGS_UI.subscriptionBg}
      />
      <SettingsSubpageHeader
        title={SUB.pageTitle}
        onBack={onBack}
        variant="dark"
        className="bg-transparent"
      />
      <div className={SETTINGS_UI.subscriptionScroll}>
        <div className={SETTINGS_UI.subscriptionContent}>
          {!isPremium ? (
            <div className="mb-5 flex flex-col items-center">
              <Image
                src={SETTINGS_PAGE_ASSETS.subscriptionPro}
                alt=""
                width={120}
                height={120}
                unoptimized
                className="h-auto w-[7rem]"
              />
              <p className={cn(SETTINGS_UI.subscriptionTryPremiumTitle, "mt-3")}>
                {SUB.tryPremium}
              </p>
            </div>
          ) : null}
          {isPremium ? (
            <SubscriptionCurrentPlanCard
              symbol={symbol}
              price={currentPrice}
              tenureValue={tenureValue}
              tenureUnit={tenureUnit}
              daysLeft={daysLeft}
              progress={progress}
            />
          ) : null}
          <SubscriptionPlanPicker
            plans={pickerPlans}
            selectedId={selectedId}
            recommendedId={recommendedId}
            symbol={symbol}
            priceOf={planPrice}
            onSelect={setSelectedId}
          />
          {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
        </div>
      </div>
      {showUpgradeBtn ? (
        <div className={SETTINGS_UI.subscriptionFooter}>
          <button
            type="button"
            className={SETTINGS_UI.subscriptionPrimaryBtn}
            onClick={onUpgrade}
          >
            {isPremium ? SUB.upgradeCta : SUB.subscribeCta}
          </button>
        </div>
      ) : null}
    </div>
  );
}
