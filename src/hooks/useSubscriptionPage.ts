"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import { SETTINGS_SUBSCRIPTIONS_COPY } from "@/lib/constants/settings-subscriptions";
import {
  clearSubscriptionActivating,
  isSubscriptionActivatingRecent,
} from "@/lib/subscription-checkout-session";
import { isPremiumProfileActivated } from "@/lib/subscription-activation-wait";
import { isActiveAutoPaySubscription } from "@/lib/subscription-auto-pay";
import { fetchProfileSettings } from "@/lib/services/settings-profile";
import {
  cancelAutoPaySubscription,
  fetchPremiumPlans,
} from "@/lib/services/settings-subscription";
import type { SubscriptionPlan } from "@/types/settings";

function planPrice(plan: SubscriptionPlan, currency: "INR" | "USD"): number {
  return currency === "INR" ? plan.localPlanPrice : plan.foreignPlanPrice;
}

export function useSubscriptionPage(currency: "INR" | "USD") {
  const SUB = useI18nConstants(SETTINGS_SUBSCRIPTIONS_COPY);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentPlanId, setCurrentPlanId] = useState<number | null>(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [tenureValue, setTenureValue] = useState(1);
  const [tenureUnit, setTenureUnit] = useState("");
  const [daysLeft, setDaysLeft] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAutoPayActive, setIsAutoPayActive] = useState(false);
  const [nextBillingDate, setNextBillingDate] = useState<string | undefined>();
  const [activatingPremium, setActivatingPremium] = useState(false);

  const loadSettings = useCallback(async () => {
    const [settings, catalog] = await Promise.all([
      fetchProfileSettings(),
      fetchPremiumPlans(),
    ]);
    setIsPremium(settings.isPremium);
    setCurrentPlanId(settings.subscription?.planId ?? null);
    setIsAutoPayActive(isActiveAutoPaySubscription(settings.subscription));
    setNextBillingDate(settings.subscription?.nextBillingDate);
    const pd = settings.planDetails;
    setTenureValue(pd?.tenureValue ?? 1);
    setTenureUnit(pd?.tenureCount ?? "");
    const price =
      currency === "INR"
        ? (pd?.localPlanPrice ?? 0)
        : (pd?.foreignPlanPrice ?? 0);
    setCurrentPrice(price);
    if (settings.subscription?.subscriptionEndDate) {
      const end = new Date(settings.subscription.subscriptionEndDate);
      const start = settings.subscription.subscriptionStartDate
        ? new Date(settings.subscription.subscriptionStartDate)
        : new Date();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const endDay = new Date(end);
      endDay.setHours(0, 0, 0, 0);
      const startDay = new Date(start);
      startDay.setHours(0, 0, 0, 0);
      const total = Math.max(
        1,
        (endDay.getTime() - startDay.getTime()) / 86400000
      );
      const elapsed = Math.min(
        total,
        Math.max(0, (today.getTime() - startDay.getTime()) / 86400000)
      );
      const remaining = Math.max(
        0,
        (endDay.getTime() - today.getTime()) / 86400000
      );
      setDaysLeft(Math.ceil(remaining));
      setProgress(Math.max(0, Math.min(1, 1 - elapsed / total)));
    }
    const sorted = [...catalog].sort(
      (a, b) => planPrice(a, currency) - planPrice(b, currency)
    );
    setPlans(sorted);
    const list =
      settings.isPremium && settings.subscription?.planId != null
        ? sorted.filter((p) => p.planId !== settings.subscription?.planId)
        : sorted;
    const higher = list.filter((p) => planPrice(p, currency) > price);
    const pickFrom = higher.length > 0 ? higher : list;
    if (pickFrom.length > 0) {
      const mid = pickFrom[Math.floor(pickFrom.length / 2)];
      setSelectedId(mid?.planId ?? pickFrom[0].planId);
    }
    return settings;
  }, [currency]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const settings = await loadSettings();
        if (isPremiumProfileActivated(settings)) {
          clearSubscriptionActivating();
          setActivatingPremium(false);
        } else if (isSubscriptionActivatingRecent()) {
          setActivatingPremium(true);
        }
      } catch {
        if (!cancelled) setError(SUB.loadFailed);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [loadSettings, SUB.loadFailed]);

  useEffect(() => {
    if (!activatingPremium || isPremium) return;
    const timer = window.setInterval(() => {
      void loadSettings().then((settings) => {
        if (isPremiumProfileActivated(settings)) {
          clearSubscriptionActivating();
          setActivatingPremium(false);
        }
      });
    }, 2000);
    return () => window.clearInterval(timer);
  }, [activatingPremium, isPremium, loadSettings]);

  const cancelAutoPay = useCallback(async () => {
    await cancelAutoPaySubscription();
    await loadSettings();
  }, [loadSettings]);

  const sortedPlans = useMemo(
    () =>
      [...plans].sort(
        (a, b) => planPrice(a, currency) - planPrice(b, currency)
      ),
    [plans, currency]
  );

  const pickerPlans = useMemo(() => {
    if (!isPremium || currentPlanId == null) return sortedPlans;
    return sortedPlans.filter((p) => p.planId !== currentPlanId);
  }, [sortedPlans, isPremium, currentPlanId]);

  const hasUpgradePath = useMemo(
    () => pickerPlans.some((p) => planPrice(p, currency) > currentPrice),
    [pickerPlans, currentPrice, currency]
  );

  const recommendedId = useMemo(() => {
    if (pickerPlans.length === 0 || !hasUpgradePath) return null;
    const mid = pickerPlans[Math.floor(pickerPlans.length / 2)];
    return mid?.planId ?? null;
  }, [pickerPlans, hasUpgradePath]);

  const selectedPlan = pickerPlans.find((p) => p.planId === selectedId);

  const showUpgradeBtn = isPremium
    ? hasUpgradePath &&
      selectedPlan != null &&
      planPrice(selectedPlan, currency) > currentPrice
    : selectedPlan != null;

  return {
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
    planPrice: (p: SubscriptionPlan) => planPrice(p, currency),
    isAutoPayActive,
    nextBillingDate,
    cancelAutoPay,
    reload: loadSettings,
    activatingPremium,
  };
}
