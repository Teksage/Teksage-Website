"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useI18nConstants } from "@/hooks/useT";
import { useConsultationCurrency } from "@/hooks/useConsultationCurrency";
import { SubscriptionPlanPicker } from "@/components/settings/SubscriptionPlanPicker";
import { SETTINGS_PAGE_ASSETS } from "@/lib/constants/assets";
import { ROUTES } from "@/lib/constants/routes";
import { SUBSCRIBE_PROMPT, SUBSCRIBE_PROMPT_UI } from "@/lib/constants/subscribe-prompt";
import { fetchPremiumPlans } from "@/lib/services/settings-subscription";
import { writeSubscriptionCheckout } from "@/lib/subscription-checkout-session";
import { PageLoadingCenter } from "@/components/common/Loader";
import { cn } from "@/lib/utils";
import type { SubscriptionPlan } from "@/types/settings";
import type { SubscribePromptDialogProps } from "@/types/ui/subscribe-prompt";

function sortPlans(plans: SubscriptionPlan[], currency: "INR" | "USD") {
  const price = (p: SubscriptionPlan) =>
    currency === "INR" ? p.localPlanPrice : p.foreignPlanPrice;
  return [...plans].sort((a, b) => price(a) - price(b));
}

/** Flutter `SubscribePromptDialog` — dark card with plan picker + subscribe CTA. */
export function SubscribePromptDialog({
  open,
  onClose,
  planStatus = "default",
}: SubscribePromptDialogProps) {
  const SP = useI18nConstants(SUBSCRIBE_PROMPT);
  const router = useRouter();
  const currency = useConsultationCurrency();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    void fetchPremiumPlans()
      .then((list) => {
        if (cancelled) return;
        const sorted = sortPlans(list, currency);
        setPlans(sorted);
        const mid = sorted.length > 1 ? 1 : 0;
        setSelectedId(sorted[mid]?.planId ?? null);
      })
      .catch(() => {
        if (!cancelled) setPlans([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open, currency]);

  const recommendedId = useMemo(() => {
    if (plans.length < 2) return plans[0]?.planId ?? null;
    return plans[1]?.planId ?? null;
  }, [plans]);

  const symbol = currency === "INR" ? "\u20b9" : "$";
  const title = planStatus === "expired" ? SP.expiredTitle : SP.premiumTitle;

  function onSubscribe() {
    const plan = plans.find((p) => p.planId === selectedId);
    if (!plan) return;
    writeSubscriptionCheckout({ planId: plan.planId, currency });
    onClose();
    router.push(ROUTES.settingsSubscriptionPayment);
  }

  if (!open || !mounted) return null;

  const dialog = (
    <div
      className={SUBSCRIBE_PROMPT_UI.overlay}
      role="dialog"
      aria-modal
      aria-labelledby="subscribe-prompt-title"
      onClick={onClose}
    >
      <div className={cn(SUBSCRIBE_PROMPT_UI.card, "relative")} onClick={(e) => e.stopPropagation()}>
        <Image
          src={SETTINGS_PAGE_ASSETS.subscriptionBg}
          alt=""
          fill
          className="pointer-events-none object-cover opacity-90"
          unoptimized
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={SUBSCRIBE_PROMPT_UI.closeBtn}
          aria-label={SP.closeAria}
        >
          <Image
            src={SETTINGS_PAGE_ASSETS.dialogClose}
            alt=""
            width={20}
            height={20}
            unoptimized
            className="size-5 brightness-0 invert"
          />
        </button>
        <div className={SUBSCRIBE_PROMPT_UI.content}>
          <Image
            src={SETTINGS_PAGE_ASSETS.subscriptionPro}
            alt=""
            width={48}
            height={48}
            unoptimized
            className="size-12"
          />
          <h2 id="subscribe-prompt-title" className={SUBSCRIBE_PROMPT_UI.title}>
            {title}
          </h2>
          <p className={SUBSCRIBE_PROMPT_UI.subtitle}>{SP.subtitle}</p>
          {loading ? (
            <div className="mt-6 min-h-[88px] w-full">
              <PageLoadingCenter />
            </div>
          ) : plans.length > 0 ? (
            <div className="mt-6 w-full">
              <SubscriptionPlanPicker
                plans={plans}
                selectedId={selectedId}
                recommendedId={recommendedId}
                symbol={symbol}
                priceOf={(p) =>
                  currency === "INR" ? p.localPlanPrice : p.foreignPlanPrice
                }
                onSelect={setSelectedId}
              />
            </div>
          ) : (
            <p className="mt-4 text-sm text-white/70">{SP.loadFailed}</p>
          )}
          <button
            type="button"
            disabled={!selectedId || loading}
            onClick={onSubscribe}
            className={SUBSCRIBE_PROMPT_UI.cta}
          >
            {SP.subscribeCta}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
}
