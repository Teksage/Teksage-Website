"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AskAstrologerCheckoutContent } from "@/components/ask-astrologer/AskAstrologerCheckoutContent";
import { AskAstrologerShell } from "@/components/ask-astrologer/AskAstrologerShell";
import { PageLoadingCenter } from "@/components/common/Loader";
import {
  readAskAstrologerFlow,
  writeAskAstrologerFlow,
} from "@/lib/ask-astrologer-session";
import {
  createAskAstrologerRequest,
  fetchAskAstrologerPricing,
  verifyAskAstrologerPayment,
} from "@/lib/services/ask-astrologer";
import { openRazorpayCheckout } from "@/lib/razorpay-checkout";
import { useConsultationCurrency } from "@/hooks/useConsultationCurrency";
import { useAuthStore } from "@/store/auth.store";
import { useI18nConstants } from "@/hooks/useT";
import { ROUTES } from "@/lib/constants/routes";
import { CONSULTATION_BOOKING_LAYOUT } from "@/lib/constants/consultation-booking";
import { ASK_ASTROLOGER_SCREEN } from "@/lib/constants/chat-ask-astrologer";
import { APP_SNACKBAR_MESSAGES } from "@/lib/constants/app-snackbar";
import {
  showErrorAppSnackBar,
  showSuccessAppSnackBar,
} from "@/lib/app-snackbar";
import type { AskAstrologerPricing } from "@/types/ask-astrologer";

export default function AskAstrologerCheckoutPage() {
  const router = useRouter();
  const flow = useMemo(() => readAskAstrologerFlow(), []);
  const AA = useI18nConstants(ASK_ASTROLOGER_SCREEN);
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
    : 0;
  const total = pricing ? (isINR ? pricing.inr_total : pricing.usd_total) : 0;

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
            writeAskAstrologerFlow({
              ...flow,
              preferred_languages: flow.preferred_languages,
            });
            showSuccessAppSnackBar(APP_SNACKBAR_MESSAGES.paymentSuccess);
            router.push(ROUTES.askAstrologerWhatsappConsent);
          } catch {
            const msg = APP_SNACKBAR_MESSAGES.paymentFailed;
            setPayError(msg);
            showErrorAppSnackBar(msg);
          }
        },
        onDismiss: () => setPaying(false),
        onFailure: (msg) => {
          const failMsg = msg || APP_SNACKBAR_MESSAGES.paymentFailedGeneric;
          setPayError(failMsg);
          showErrorAppSnackBar(failMsg);
        },
      });
    } catch {
      const msg = APP_SNACKBAR_MESSAGES.paymentFailedGeneric;
      setPayError(msg);
      showErrorAppSnackBar(msg);
    } finally {
      setPaying(false);
    }
  }

  return (
    <AskAstrologerShell
      title={AA.checkoutTitle}
      onBack={() => router.back()}
      centered
      footer={
        !loadError && pricing ? (
          <>
            {payError ? (
              <p className="mb-2 text-center text-sm text-[var(--color-brand-error)]">
                {payError}
              </p>
            ) : null}
            <button
              type="button"
              disabled={paying}
              onClick={() => void handlePay()}
              className={CONSULTATION_BOOKING_LAYOUT.payBtn}
            >
              {paying ? AA.checkoutProcessing : AA.checkoutPay}
            </button>
          </>
        ) : undefined
      }
    >
      {loadError ? (
        <p className="text-center text-sm text-[var(--color-brand-error)]">
          {AA.checkoutLoadError}
        </p>
      ) : !pricing ? (
        <PageLoadingCenter />
      ) : (
        <AskAstrologerCheckoutContent
          userQuestion={flow.user_question}
          preferredLanguages={flow.preferred_languages ?? []}
          pricing={pricing}
          currency={currency}
          baseAmount={baseAmount}
          total={total}
          isINR={isINR}
        />
      )}
    </AskAstrologerShell>
  );
}
