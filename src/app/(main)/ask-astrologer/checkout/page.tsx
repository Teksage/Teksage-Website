"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { ConsultationFlowCta } from "@/components/consultation/ConsultationFlowCta";
import { PageLoadingCenter } from "@/components/common/Loader";
import {
  clearAskAstrologerFlow,
  readAskAstrologerFlow,
  writeAskAstrologerFlow,
} from "@/lib/ask-astrologer-session";
import {
  createAskAstrologerRequest,
  fetchAskAstrologerPricing,
  verifyAskAstrologerPayment,
} from "@/lib/services/ask-astrologer";
import { openRazorpayCheckout } from "@/lib/razorpay-checkout";
import { formatConsultationFee } from "@/lib/consultation-currency";
import { useConsultationCurrency } from "@/hooks/useConsultationCurrency";
import { useAuthStore } from "@/store/auth.store";
import { ROUTES } from "@/lib/constants/routes";
import { ASK_ASTROLOGER_SCREEN, ASK_ASTROLOGER_UI } from "@/lib/constants/chat-ask-astrologer";
import type { AskAstrologerPricing } from "@/types/ask-astrologer";

export default function AskAstrologerCheckoutPage() {
  const router = useRouter();
  const flow = useMemo(() => readAskAstrologerFlow(), []);
  const currency = useConsultationCurrency();
  const user = useAuthStore((s) => s.user);

  const [pricing, setPricing] = useState<AskAstrologerPricing | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  useEffect(() => {
    if (!flow?.preferred_languages?.length) {
      router.replace(ROUTES.askAstrologerLanguages);
      return;
    }
    fetchAskAstrologerPricing()
      .then(setPricing)
      .catch(() => setLoadError(true));
  }, [flow, router]);

  if (!flow) return null;

  const isINR = currency === "INR";
  const baseAmount = pricing
    ? isINR
      ? pricing.local_plan_price
      : pricing.foreign_plan_price
    : null;
  const total = pricing
    ? isINR
      ? pricing.inr_total
      : pricing.usd_total
    : null;

  async function handlePay() {
    if (!pricing || !flow?.preferred_languages) return;
    setPaying(true);
    setPayError(null);
    try {
      const order = await createAskAstrologerRequest({
        user_question: flow.user_question,
        ai_response: flow.ai_response,
        preferred_languages: flow.preferred_languages,
        currency,
      });

      await openRazorpayCheckout({
        key: order.key,
        currency: order.currency,
        orderId: order.razorpay_order_id,
        name: "Teksage",
        description: "Ask Astrologer — Single question",
        prefill: {
          email: user?.email ?? undefined,
        },
        onSuccess: async (response) => {
          try {
            await verifyAskAstrologerPayment({
              request_id: order.request_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            writeAskAstrologerFlow({ ...flow, preferred_languages: flow.preferred_languages });
            router.push(ROUTES.askAstrologerWhatsappConsent);
          } catch {
            setPayError("Verification failed. Please contact support.");
          }
        },
        onDismiss: () => setPaying(false),
        onFailure: (msg) => setPayError(msg),
      });
    } catch {
      setPayError("Could not initiate payment. Please try again.");
    } finally {
      setPaying(false);
    }
  }

  return (
    <div className={ASK_ASTROLOGER_UI.page}>
      <AppHeader
        title={ASK_ASTROLOGER_SCREEN.checkoutTitle}
        showBack
        onBackClick={() => router.back()}
      />

      {!pricing && !loadError ? (
        <PageLoadingCenter />
      ) : loadError ? (
        <div className={ASK_ASTROLOGER_UI.inner}>
          <p className="text-sm text-[var(--color-brand-error)]">
            {ASK_ASTROLOGER_SCREEN.checkoutLoadError}
          </p>
        </div>
      ) : (
        <div className={ASK_ASTROLOGER_UI.inner}>
          <h1 className={ASK_ASTROLOGER_UI.heading}>
            {ASK_ASTROLOGER_SCREEN.checkoutHeading}
          </h1>
          <p className={ASK_ASTROLOGER_UI.subtitle}>
            {ASK_ASTROLOGER_SCREEN.checkoutSubtitle}
          </p>

          {/* Q&A preview */}
          <div className={ASK_ASTROLOGER_UI.card}>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-black/40">
              Your question
            </p>
            <p className="text-sm text-black/80">{flow.user_question}</p>
          </div>

          {/* Pricing breakdown */}
          <div className={ASK_ASTROLOGER_UI.priceBox}>
            <div className={ASK_ASTROLOGER_UI.priceLine}>
              <span className="text-black/60">Consultation fee</span>
              <span>{formatConsultationFee(baseAmount ?? 0, currency)}</span>
            </div>
            {isINR && pricing ? (
              <>
                <div className={ASK_ASTROLOGER_UI.priceLine}>
                  <span className="text-black/60">
                    CGST ({pricing.cgst_percentage}%)
                  </span>
                  <span>{formatConsultationFee(pricing.cgst, currency)}</span>
                </div>
                <div className={ASK_ASTROLOGER_UI.priceLine}>
                  <span className="text-black/60">
                    SGST ({pricing.sgst_percentage}%)
                  </span>
                  <span>{formatConsultationFee(pricing.sgst, currency)}</span>
                </div>
              </>
            ) : null}
            <div className={ASK_ASTROLOGER_UI.priceTotal}>
              <span>Total</span>
              <span className="text-[var(--color-brand-primary)]">
                {formatConsultationFee(total ?? 0, currency)}
              </span>
            </div>
          </div>

          {payError ? (
            <p className="text-sm text-[var(--color-brand-error)]">{payError}</p>
          ) : null}
        </div>
      )}

      <footer className="sticky bottom-0 border-t border-black/10 bg-white px-5 py-4">
        <ConsultationFlowCta
          label={paying ? "Processing…" : ASK_ASTROLOGER_SCREEN.checkoutPay}
          active={Boolean(pricing) && !paying}
          onClick={() => void handlePay()}
        />
      </footer>
    </div>
  );
}
