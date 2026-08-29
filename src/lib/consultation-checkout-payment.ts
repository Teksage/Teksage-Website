import { CONSULTATION_CHECKOUT_SCREEN } from "@/lib/constants/consultation-checkout";
import { ROUTES } from "@/lib/constants";
import { APP_SNACKBAR_MESSAGES } from "@/lib/constants/app-snackbar";
import { assertConsultationCurrency, type ConsultationCurrency } from "@/lib/consultation-currency";
import { consultationBookPaymentAmount } from "@/lib/consultation-pricing";
import {
  clearConsultationDraft,
  writeConsultationSummary,
} from "@/lib/consultation-session";
import { openRazorpayCheckout } from "@/lib/razorpay-checkout";
import {
  bookConsultation,
  verifyConsultationPayment,
} from "@/lib/services/consultation";
import {
  showErrorAppSnackBar,
  showSuccessAppSnackBar,
} from "@/lib/app-snackbar";
import { bookConsultationCheckoutErrorMessage } from "@/lib/consultation-checkout-format";
import type { ConsultationBookingDraft, ConsultationCouponResult } from "@/types/consultation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type PayParams = {
  draft: ConsultationBookingDraft;
  pricing: ConsultationCouponResult;
  astrologerId: number;
  currency: ConsultationCurrency;
  appliedCouponId: number | null;
  shareHoroscope: boolean;
  userEmail?: string | null;
  userMobile?: string | null;
  loadErrorLabel: string;
  shareHoroscopeRequiredLabel: string;
  router: AppRouterInstance;
  setBusy: (busy: boolean) => void;
  setError: (error: string | null) => void;
};

export async function runConsultationCheckoutPayment({
  draft,
  pricing,
  astrologerId,
  currency,
  appliedCouponId,
  shareHoroscope,
  userEmail,
  userMobile,
  loadErrorLabel,
  shareHoroscopeRequiredLabel,
  router,
  setBusy,
  setError,
}: PayParams): Promise<void> {
  const CC = CONSULTATION_CHECKOUT_SCREEN;

  if (!shareHoroscope) {
    setError(shareHoroscopeRequiredLabel);
    return;
  }

  setBusy(true);
  setError(null);

  try {
    const paymentAmount = consultationBookPaymentAmount(pricing);
    const order = await bookConsultation({
      start_datetime: draft.slotStart,
      end_datetime: draft.slotEnd,
      share_horoscope: shareHoroscope,
      languages: draft.languages,
      category: draft.categories,
      astrologer_id: astrologerId,
      payment_amount: paymentAmount,
      currency,
      coupon_id: appliedCouponId,
    });

    await openRazorpayCheckout({
      key: order.key,
      currency: assertConsultationCurrency(order.currency, currency),
      orderId: order.id,
      amount: order.amount,
      prefill: { email: userEmail ?? undefined, contact: userMobile ?? undefined },
      onSuccess: async (response) => {
        try {
          const verified = await verifyConsultationPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          const ev = verified.data;
          if (ev?.id) {
            writeConsultationSummary({
              eventId: ev.id,
              eventLink: ev.event_link ?? null,
              startDatetime: ev.start_datetime ?? draft.slotStart,
              endDatetime: ev.end_datetime ?? draft.slotEnd,
              categories: ev.category ?? draft.categories,
              languages: ev.languages ?? draft.languages,
              consultationFee: Number(ev.consultation_fee ?? pricing.final_price),
              currency: ev.currency ?? currency,
              astrologerName: draft.astrologerName,
              astrologerPicture: draft.astrologerPicture,
            });
          }
          clearConsultationDraft();
          showSuccessAppSnackBar(APP_SNACKBAR_MESSAGES.paymentSuccess);
          router.push(ROUTES.consultationSummary);
        } catch {
          showErrorAppSnackBar(APP_SNACKBAR_MESSAGES.paymentFailed);
          setBusy(false);
        }
      },
      onDismiss: () => setBusy(false),
      onFailure: (message) => {
        const hint = currency === "USD" ? ` ${CC.paymentUsdHint}` : "";
        const failMsg = `${message || CC.paymentFailed}${hint}`;
        setError(failMsg);
        showErrorAppSnackBar(failMsg);
        setBusy(false);
      },
    });
  } catch (err) {
    setError(bookConsultationCheckoutErrorMessage(err, loadErrorLabel));
    setBusy(false);
  }
}
