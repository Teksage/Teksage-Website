"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SettingsSubpageHeader } from "@/components/settings/SettingsSubpageHeader";
import { SubscriptionPaymentFees } from "@/components/settings/SubscriptionPaymentFees";
import { SETTINGS_PAGE_ASSETS } from "@/lib/constants/assets";
import { ROUTES } from "@/lib/constants/routes";
import { SETTINGS_UI } from "@/lib/constants/settings-ui";
import {
  SETTINGS_SUBSCRIPTION_PAYMENT,
  SUBSCRIPTION_PAYMENT_LAYOUT,
} from "@/lib/constants/settings-subscription-payment";
import { useConsultationCurrency } from "@/hooks/useConsultationCurrency";
import { openRazorpayCheckout } from "@/lib/razorpay-checkout";
import {
  clearSubscriptionCheckout,
  readSubscriptionCheckout,
} from "@/lib/subscription-checkout-session";
import {
  totalsFromCoupon,
  totalsFromPlan,
  type PaymentTotals,
} from "@/lib/subscription-payment-totals";
import {
  applySubscriptionCoupon,
  fetchPremiumPlanById,
  initiateSubscriptionPayment,
  verifySubscriptionPayment,
} from "@/lib/services/settings-subscription";
import { useAuthStore } from "@/store/auth.store";
import type { SubscriptionPlan } from "@/types/settings";
import { cn } from "@/lib/utils";

type Props = { onBack: () => void };

export function SubscriptionPaymentSummaryView({ onBack }: Props) {
  const P = useI18nConstants(SETTINGS_SUBSCRIPTION_PAYMENT);
  const defaultCurrency = useConsultationCurrency();
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const [plan, setPlan] = useState<SubscriptionPlan | null>(null);
  const [currency, setCurrency] = useState<"INR" | "USD">(defaultCurrency);
  const [totals, setTotals] = useState<PaymentTotals | null>(null);
  const [promo, setPromo] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const session = readSubscriptionCheckout();
      if (!session) {
        setError(P.invalidCheckout);
        setLoading(false);
        return;
      }
      setCurrency(session.currency);
      try {
        const fetched = await fetchPremiumPlanById(session.planId);
        if (cancelled) return;
        if (!fetched) {
          setError(P.loadFailed);
          return;
        }
        setPlan(fetched);
        setTotals(totalsFromPlan(fetched, session.currency));
      } catch {
        if (!cancelled) setError(P.loadFailed);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [P.invalidCheckout, P.loadFailed]);

  const symbol = currency === "INR" ? "\u20b9" : "$";
  const isInr = currency === "INR";

  const applyPromo = useCallback(async () => {
    if (!plan || !promo.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const base = isInr ? plan.localPlanPrice : plan.foreignPlanPrice;
      const result = await applySubscriptionCoupon({
        coupon_name: promo.trim(),
        plan_id: plan.planId,
        currency,
        amount: base,
      });
      setTotals(totalsFromCoupon(result));
    } catch {
      setError(P.paymentFailed);
      if (plan) setTotals(totalsFromPlan(plan, currency));
    } finally {
      setBusy(false);
    }
  }, [plan, promo, currency, isInr, P.paymentFailed]);

  async function onPay() {
    if (!plan || !totals) return;
    setBusy(true);
    setError(null);
    const baseAmount = totals.planCost - totals.discount;
    try {
      const order = await initiateSubscriptionPayment({
        planId: plan.planId,
        paymentAmount: baseAmount,
        currency,
        couponId: totals.couponId || null,
      });
      await openRazorpayCheckout({
        key: order.key,
        currency: order.currency,
        orderId: order.id,
        description: plan.planName,
        prefill: { email: user?.email, contact: user?.mobile },
        onSuccess: async (response) => {
          await verifySubscriptionPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          clearSubscriptionCheckout();
          router.replace(ROUTES.settingsSubscriptions);
        },
        onDismiss: () => setBusy(false),
        onFailure: () => {
          setError(P.paymentFailed);
          setBusy(false);
        },
      });
    } catch {
      setError(P.paymentFailed);
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <div className={SETTINGS_UI.subscriptionPageShell}>
        <p className="px-5 py-8 text-sm text-white/70">Loading...</p>
      </div>
    );
  }

  if (!plan || !totals) {
    return (
      <div className={SETTINGS_UI.subscriptionPageShell}>
        <SettingsSubpageHeader title={P.pageTitle} onBack={onBack} variant="dark" />
        <p className="px-5 py-8 text-sm text-red-400">{error ?? P.loadFailed}</p>
      </div>
    );
  }

  const membershipLine = `${plan.tenureValue}-${plan.tenureCount} ${P.membership}`;

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
        title={P.pageTitle}
        onBack={onBack}
        variant="dark"
        className="bg-transparent"
      />
      <div className={SUBSCRIPTION_PAYMENT_LAYOUT.scroll}>
        <div className={SUBSCRIPTION_PAYMENT_LAYOUT.content}>
          <Image
            src={SETTINGS_PAGE_ASSETS.subscriptionPro}
            alt=""
            width={80}
            height={80}
            unoptimized
            className={SUBSCRIPTION_PAYMENT_LAYOUT.heroIcon}
          />
          <p className={cn(SUBSCRIPTION_PAYMENT_LAYOUT.productTitle, "mt-3")}>
            {P.productName}
          </p>
          <p className={SUBSCRIPTION_PAYMENT_LAYOUT.membershipPill}>{membershipLine}</p>
          <div className={SUBSCRIPTION_PAYMENT_LAYOUT.dashed} />
          <SubscriptionPaymentFees
            totals={totals}
            symbol={symbol}
            isInr={isInr}
            promo={promo}
            busy={busy}
            onPromoChange={setPromo}
            onApplyPromo={() => void applyPromo()}
          />
          {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}
        </div>
      </div>
      <div className={SUBSCRIPTION_PAYMENT_LAYOUT.footer}>
        <button
          type="button"
          disabled={busy}
          className={SUBSCRIPTION_PAYMENT_LAYOUT.payBtn}
          onClick={() => void onPay()}
        >
          {busy ? "…" : P.payNow}
        </button>
      </div>
    </div>
  );
}
