import {
  openRazorpayCheckout,
  openRazorpaySubscriptionCheckout,
} from "@/lib/razorpay-checkout";
import { assertConsultationCurrency } from "@/lib/consultation-currency";
import {
  initiateAutoPaySubscription,
  initiateSubscriptionPayment,
  verifyAutoPayPayment,
  verifySubscriptionPayment,
} from "@/lib/services/settings-subscription";
import type { PaymentTotals } from "@/lib/subscription-payment-totals";
import type { SubscriptionPlan } from "@/types/settings";

type PayPrefill = { email?: string; contact?: string };

export async function paySubscriptionOneTime(options: {
  plan: SubscriptionPlan;
  totals: PaymentTotals;
  currency: "INR" | "USD";
  prefill?: PayPrefill;
  onBusyChange: (busy: boolean) => void;
  onError: (message: string) => void;
  onSuccess: () => void | Promise<void>;
}): Promise<void> {
  const { plan, totals, currency, prefill, onBusyChange, onError, onSuccess } =
    options;
  onBusyChange(true);
  const baseAmount = totals.planCost - totals.discount;
  try {
    const order = await initiateSubscriptionPayment({
      planId: plan.planId,
      paymentAmount: baseAmount,
      currency,
      couponId: totals.couponId || null,
    });
    const orderCurrency = assertConsultationCurrency(order.currency, currency);
    await openRazorpayCheckout({
      key: order.key,
      currency: orderCurrency,
      orderId: order.id,
      description: plan.planName,
      prefill,
      onSuccess: async (response) => {
        try {
          await verifySubscriptionPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          await onSuccess();
        } catch {
          onError("paymentFailed");
          onBusyChange(false);
        }
      },
      onDismiss: () => onBusyChange(false),
      onFailure: () => {
        onError("paymentFailed");
        onBusyChange(false);
      },
    });
  } catch {
    onError("paymentFailed");
    onBusyChange(false);
  }
}

export async function paySubscriptionAutoRenew(options: {
  plan: SubscriptionPlan;
  currency: "INR" | "USD";
  prefill?: PayPrefill;
  onBusyChange: (busy: boolean) => void;
  onError: (message: string) => void;
  onSuccess: () => void | Promise<void>;
}): Promise<void> {
  const { plan, currency, prefill, onBusyChange, onError, onSuccess } = options;
  onBusyChange(true);
  try {
    const init = await initiateAutoPaySubscription({
      planId: plan.planId,
      currency,
    });
    await openRazorpaySubscriptionCheckout({
      key: init.key,
      subscriptionId: init.subscriptionId,
      description: plan.planName,
      prefill,
      onSuccess: async (response) => {
        try {
          await verifyAutoPayPayment(response);
          await onSuccess();
        } catch {
          onError("paymentFailed");
          onBusyChange(false);
        }
      },
      onDismiss: () => onBusyChange(false),
      onFailure: () => {
        onError("paymentFailed");
        onBusyChange(false);
      },
    });
  } catch {
    onError("paymentFailed");
    onBusyChange(false);
  }
}
