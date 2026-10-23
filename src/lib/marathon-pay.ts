import { consultationCurrencyForLocation } from "@/lib/consultation-currency";
import { openRazorpayCheckout } from "@/lib/razorpay-checkout";
import { checkoutMarathonSlot, marathonErrorMessage, verifyMarathonPayment } from "@/lib/services/marathon";
import { fetchProfile } from "@/lib/services/profile";

export async function payMarathonCheckout(input: {
  slotId: number;
  eventName: string;
  customerQuery: string;
  preferredLanguage: string;
  relatedProfileId: number | null;
  queryRequired: string;
  languageRequired: string;
  paymentFailed: string;
  onNeedDetails: () => void;
  onError: (message: string) => void;
  onBooked: (bookingId: number) => void;
}) {
  input.onError("");
  try {
    const profile = await fetchProfile();
    const currency = consultationCurrencyForLocation(profile.preferredLocation || profile.placeOfBirth, {
      countryCode: profile.countryCode,
      timezone: profile.timezone,
    });
    if (!input.customerQuery.trim() || !input.preferredLanguage.trim()) {
      input.onError(!input.customerQuery.trim() ? input.queryRequired : input.languageRequired);
      input.onNeedDetails();
      return;
    }
    const order = await checkoutMarathonSlot(
      input.slotId,
      currency,
      input.customerQuery.trim(),
      input.preferredLanguage.trim(),
      input.relatedProfileId
    );
    await openRazorpayCheckout({
      key: order.key,
      currency: order.currency,
      orderId: order.id,
      amount: order.amount,
      description: input.eventName,
      onFailure: () => input.onError(input.paymentFailed),
      onSuccess: (response) => {
        void verifyMarathonPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        })
          .then((result) => input.onBooked(result.booking_id))
          .catch((err: unknown) => input.onError(marathonErrorMessage(err)));
      },
    });
  } catch (err: unknown) {
    input.onError(marathonErrorMessage(err));
  }
}
