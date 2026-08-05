"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SettingsSubpageHeader } from "@/components/settings/SettingsSubpageHeader";
import { SettingsModalDialog } from "@/components/settings/SettingsModalDialog";
import { SubscriptionPaymentFees } from "@/components/settings/SubscriptionPaymentFees";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { SETTINGS_PAGE_ASSETS } from "@/lib/constants/assets";
import { ROUTES } from "@/lib/constants/routes";
import { SETTINGS_UI } from "@/lib/constants/settings-ui";
import {
  SETTINGS_SUBSCRIPTION_PAYMENT,
  SUBSCRIPTION_PAYMENT_LAYOUT,
} from "@/lib/constants/settings-subscription-payment";
import { PageLoadingCenter } from "@/components/common/Loader";
import { useConsultationCurrency } from "@/hooks/useConsultationCurrency";
import { SubscriptionAutoPayToggle } from "@/components/settings/SubscriptionAutoPayToggle";
import {
  clearSubscriptionActivating,
  clearSubscriptionCheckout,
  readSubscriptionCheckout,
} from "@/lib/subscription-checkout-session";
import {
  showErrorAppSnackBar,
  showSuccessAppSnackBar,
} from "@/lib/app-snackbar";
import {
  SETTINGS_SUBSCRIPTIONS_COPY,
  SUBSCRIPTION_AUTO_PAY_DEFAULT_ENABLED,
} from "@/lib/constants/settings-subscriptions";
import {
  isPremiumProfileActivated,
  refreshAuthProfileAfterSubscription,
  waitForPremiumActivation,
} from "@/lib/subscription-activation-wait";
import { isAutoPayEligiblePlan, isSubscriptionCouponAllowed } from "@/lib/subscription-auto-pay";
import {
  paySubscriptionAutoRenew,
  paySubscriptionOneTime,
} from "@/lib/subscription-payment-actions";
import {
  totalsFromCoupon,
  totalsFromPlan,
  type PaymentTotals,
} from "@/lib/subscription-payment-totals";
import {
  PARTNER_CHECKOUT_CODE,
  partnerYearlyPct,
} from "@/lib/partner-discount";
import { fetchProfile } from "@/lib/services/profile";
import {
  applySubscriptionCoupon,
  fetchPremiumPlanById,
} from "@/lib/services/settings-subscription";
import { useAuthStore } from "@/store/auth.store";
import type { SubscriptionPlan } from "@/types/settings";
import { cn } from "@/lib/utils";
import { COUPON_PROMO_COPY } from "@/lib/constants/coupon-promo";

type Props = { onBack: () => void };

export function SubscriptionPaymentSummaryView({ onBack }: Props) {
  const P = useI18nConstants(SETTINGS_SUBSCRIPTION_PAYMENT);
  const SUB = useI18nConstants(SETTINGS_SUBSCRIPTIONS_COPY);
  const PROMO = useI18nConstants(COUPON_PROMO_COPY);
  const defaultCurrency = useConsultationCurrency();
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const [plan, setPlan] = useState<SubscriptionPlan | null>(null);
  const [currency, setCurrency] = useState<"INR" | "USD">(defaultCurrency);
  const [totals, setTotals] = useState<PaymentTotals | null>(null);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [appliedPromoCode, setAppliedPromoCode] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoPayEnabled, setAutoPayEnabled] = useState(
    SUBSCRIPTION_AUTO_PAY_DEFAULT_ENABLED
  );

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
      setAutoPayEnabled(
        session.autoPay ?? SUBSCRIPTION_AUTO_PAY_DEFAULT_ENABLED
      );
      try {
        const [fetched, profile] = await Promise.all([
          fetchPremiumPlanById(session.planId),
          fetchProfile().catch(() => null),
        ]);
        if (cancelled) return;
        if (!fetched) {
          setError(P.loadFailed);
          return;
        }
        if (profile) {
          const token = useAuthStore.getState().token;
          if (token) useAuthStore.getState().setAuth(profile, token);
        }
        const discount = profile?.partnerDiscount ?? user?.partnerDiscount;
        setPlan(fetched);
        const partnerPct = partnerYearlyPct(discount, fetched.planId);
        setTotals(totalsFromPlan(fetched, session.currency, partnerPct));
        if (partnerPct > 0) {
          setPromoApplied(true);
          setAppliedPromoCode(PARTNER_CHECKOUT_CODE);
          setPromo(PARTNER_CHECKOUT_CODE);
        }
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
  }, [P.invalidCheckout, P.loadFailed, user?.partnerDiscount]);

  const symbol = currency === "INR" ? "\u20b9" : "$";
  const isInr = currency === "INR";

  const autoPayEligible = plan != null && isAutoPayEligiblePlan(plan.planId, currency);

  useEffect(() => {
    if (!plan) return;
    const partnerPct = partnerYearlyPct(user?.partnerDiscount, plan.planId);
    // Only monthly auto-pay checkout clears coupons; yearly keeps partner %.
    if (autoPayEnabled && autoPayEligible) {
      setTotals(totalsFromPlan(plan, currency));
      setPromo("");
      setPromoApplied(false);
      setAppliedPromoCode("");
      setPromoError(null);
      return;
    }
    setTotals(totalsFromPlan(plan, currency, partnerPct));
    if (partnerPct > 0) {
      setPromoApplied(true);
      setAppliedPromoCode(PARTNER_CHECKOUT_CODE);
      setPromo(PARTNER_CHECKOUT_CODE);
    }
  }, [autoPayEnabled, autoPayEligible, plan, currency, user?.partnerDiscount]);

  const showPromo =
    (plan != null && isSubscriptionCouponAllowed(plan.planId, autoPayEnabled)) ||
    (promoApplied && appliedPromoCode === PARTNER_CHECKOUT_CODE);

  const onPromoChange = useCallback(
    (value: string) => {
      setPromo(value);
      if (
        (promoApplied || promoError) &&
        value.trim() !== appliedPromoCode
      ) {
        setPromoApplied(false);
        setPromoError(null);
        if (plan) setTotals(totalsFromPlan(plan, currency));
      }
    },
    [promoApplied, promoError, appliedPromoCode, plan, currency]
  );

  const applyPromo = useCallback(async () => {
    if (!plan || !promo.trim() || autoPayEnabled) return;
    setBusy(true);
    setPromoError(null);
    try {
      const base = isInr ? plan.localPlanPrice : plan.foreignPlanPrice;
      const result = await applySubscriptionCoupon({
        coupon_name: promo.trim(),
        plan_id: plan.planId,
        currency,
        amount: base,
      });
      setTotals(totalsFromCoupon(result));
      setPromoApplied(true);
      setAppliedPromoCode(promo.trim());
      showSuccessAppSnackBar(PROMO.appliedToast, { position: "top" });
    } catch {
      setPromoApplied(false);
      setPromoError(PROMO.invalidPromo);
      showErrorAppSnackBar(PROMO.invalidPromo, { position: "top" });
      setTotals(totalsFromPlan(plan, currency));
    } finally {
      setBusy(false);
    }
  }, [plan, promo, currency, isInr, PROMO.invalidPromo, autoPayEnabled]);

  const finishPayment = useCallback(async () => {
    setFinishing(true);
    setBusy(true);
    clearSubscriptionCheckout();
    try {
      const profile = await waitForPremiumActivation();
      if (!isPremiumProfileActivated(profile)) {
        showErrorAppSnackBar(SUB.activatingPending);
        router.replace(ROUTES.settingsSubscriptions);
        return;
      }
      clearSubscriptionActivating();
      await refreshAuthProfileAfterSubscription();
      setSuccessOpen(true);
    } catch {
      showErrorAppSnackBar(P.paymentFailed);
      router.replace(ROUTES.settingsSubscriptions);
    } finally {
      setFinishing(false);
      setBusy(false);
    }
  }, [P.paymentFailed, SUB.activatingPending, router]);

  const onSuccessDialogConfirm = useCallback(() => {
    setSuccessOpen(false);
    showSuccessAppSnackBar(SUB.paymentSuccess);
    router.replace(ROUTES.settingsSubscriptions);
  }, [SUB.paymentSuccess, router]);

  function onPayError(code: string) {
    setError(code === "paymentFailed" ? P.paymentFailed : P.paymentFailed);
  }

  async function onPay() {
    if (!plan || !totals) return;
    setError(null);
    const prefill = { email: user?.email, contact: user?.mobile };
    if (autoPayEnabled && autoPayEligible) {
      await paySubscriptionAutoRenew({
        plan,
        currency,
        prefill,
        onBusyChange: setBusy,
        onError: onPayError,
        onSuccess: finishPayment,
      });
      return;
    }
    await paySubscriptionOneTime({
      plan,
      totals,
      currency,
      prefill,
      onBusyChange: setBusy,
      onError: onPayError,
      onSuccess: finishPayment,
    });
  }

  if (loading) {
    return (
      <div className={SETTINGS_UI.subscriptionPageShell}>
        <PageLoadingCenter />
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
      <LoadingOverlay open={finishing} />
      <SettingsModalDialog
        open={successOpen}
        onClose={onSuccessDialogConfirm}
        message={SUB.paymentSuccessDialogTitle}
        confirmLabel={SUB.paymentSuccessDialogConfirm}
        onConfirm={onSuccessDialogConfirm}
      />
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
          {autoPayEligible ? (
            <SubscriptionAutoPayToggle
              enabled={autoPayEnabled}
              onChange={setAutoPayEnabled}
              disabled={busy}
            />
          ) : null}
          <SubscriptionPaymentFees
            totals={totals}
            symbol={symbol}
            isInr={isInr}
            showPromo={showPromo}
            promo={promo}
            promoApplied={promoApplied}
            promoError={promoError}
            busy={busy || autoPayEnabled}
            onPromoChange={onPromoChange}
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
