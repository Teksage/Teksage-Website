"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ConsultationBookingDetailsCard } from "@/components/consultation/ConsultationBookingDetailsCard";
import { ConsultationBookingFeesBlock } from "@/components/consultation/ConsultationBookingFeesBlock";
import { ConsultationBookingProfileHeader } from "@/components/consultation/ConsultationBookingProfileHeader";
import { ConsultationCheckoutShell } from "@/components/consultation/ConsultationCheckoutShell";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { consultationSlotsPath } from "@/lib/constants/consultation-routes";
import {
  CONSULTATION_BOOKING_LAYOUT,
  CONSULTATION_BOOKING_SCREEN,
} from "@/lib/constants/consultation-booking";
import { CONSULTATION_CHECKOUT_SCREEN } from "@/lib/constants/consultation-checkout";
import { COUPON_PROMO_COPY } from "@/lib/constants/coupon-promo";
import { CONSULTATION_SCREEN, ROUTES } from "@/lib/constants";
import {
  formatConsultationBookingDate,
  formatConsultationBookingTimeRange,
} from "@/lib/consultation-booking-format";
import {
  formatConsultationCategoryLabel,
  formatConsultationLanguageList,
} from "@/lib/consultation-display";
import {
  clearConsultationDraft,
  readConsultationDraft,
  writeConsultationSummary,
} from "@/lib/consultation-session";
import { openRazorpayCheckout } from "@/lib/razorpay-checkout";
import {
  applyConsultationCoupon,
  bookConsultation,
  fetchAstrologerDetail,
  verifyConsultationPayment,
} from "@/lib/services/consultation";
import { useConsultationCurrency } from "@/hooks/useConsultationCurrency";
import { consultationFeeForAstrologer } from "@/lib/consultation-currency";
import { consultationAstrologerName } from "@/lib/consultation-display";
import {
  consultationBookPaymentAmount,
  initialConsultationPricing,
} from "@/lib/consultation-pricing";
import { fetchProfile } from "@/lib/services/profile";
import { useAuthStore } from "@/store/auth.store";
import { APP_SNACKBAR_MESSAGES } from "@/lib/constants/app-snackbar";
import {
  showErrorAppSnackBar,
  showSuccessAppSnackBar,
} from "@/lib/app-snackbar";
import type { ConsultationBookingDraft, ConsultationCouponResult } from "@/types/consultation";
import type { UserProfile } from "@/types";
import { isAxiosError } from "axios";

type ConsultationCheckoutViewProps = {
  astrologerId: number;
};

function bookErrorMessage(err: unknown, fallback: string): string {
  if (isAxiosError(err)) {
    const detail = err.response?.data as { detail?: string } | undefined;
    if (typeof detail?.detail === "string") return detail.detail;
  }
  return fallback;
}

export function ConsultationCheckoutView({ astrologerId }: ConsultationCheckoutViewProps) {
  const CB = useI18nConstants(CONSULTATION_BOOKING_SCREEN);
  const CC = useI18nConstants(CONSULTATION_CHECKOUT_SCREEN);
  const C = useI18nConstants(CONSULTATION_SCREEN);
  const PROMO = useI18nConstants(COUPON_PROMO_COPY);
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const currency = useConsultationCurrency();
  const [draft, setDraft] = useState<ConsultationBookingDraft | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [shareHoroscope, setShareHoroscope] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [appliedCouponCode, setAppliedCouponCode] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);
  const [appliedCouponId, setAppliedCouponId] = useState<number | null>(null);
  const [pricing, setPricing] = useState<ConsultationCouponResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const d = readConsultationDraft();
    if (
      !d?.slotStart ||
      !d.slotEnd ||
      !d.languages?.length ||
      !d.categories?.length ||
      d.astrologerId !== astrologerId
    ) {
      router.replace(consultationSlotsPath(astrologerId));
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const [detail, userProfile] = await Promise.all([
          fetchAstrologerDetail(astrologerId),
          fetchProfile(),
        ]);
        const fee = consultationFeeForAstrologer(detail.astrologer, currency);
        if (cancelled) return;
        setProfile(userProfile);
        setDraft({
          ...(d as ConsultationBookingDraft),
          currency,
          fee,
          astrologerName: consultationAstrologerName(detail.astrologer.user) || d.astrologerName || "",
          astrologerPicture: detail.astrologer.picture ?? d.astrologerPicture,
        });
        setPricing(initialConsultationPricing(fee, currency));
      } catch {
        if (!cancelled) router.replace(consultationSlotsPath(astrologerId));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [astrologerId, currency, router]);

  const checkoutLoading = !draft || !pricing;

  if (checkoutLoading) {
    return (
      <>
        <ConsultationCheckoutShell title={CB.title} onBack={() => router.back()}>
          {null}
        </ConsultationCheckoutShell>
        <LoadingOverlay open />
      </>
    );
  }

  const booking = draft;
  const totals = pricing;

  function onCouponChange(value: string) {
    setCouponCode(value);
    if (
      (couponApplied || promoError) &&
      value.trim() !== appliedCouponCode
    ) {
      setCouponApplied(false);
      setPromoError(null);
      setAppliedCouponId(null);
      if (booking.fee != null) {
        setPricing(initialConsultationPricing(booking.fee, currency));
      }
    }
  }

  async function onApplyCoupon() {
    if (!couponCode.trim()) return;
    setBusy(true);
    setPromoError(null);
    try {
      const result = await applyConsultationCoupon({
        coupon_name: couponCode.trim(),
        type: "consultation",
        currency,
        amount: booking.fee ?? 0,
      });
      setPricing(result);
      const couponId =
        result.coupon_id && result.coupon_id > 0 ? result.coupon_id : null;
      setAppliedCouponId(couponId);
      setCouponApplied(true);
      setAppliedCouponCode(couponCode.trim());
    } catch {
      setCouponApplied(false);
      setAppliedCouponId(null);
      setPromoError(PROMO.invalidPromo);
      if (booking.fee != null) {
        setPricing(initialConsultationPricing(booking.fee, currency));
      }
    } finally {
      setBusy(false);
    }
  }

  async function onPay() {
    if (!shareHoroscope) {
      setError(C.shareHoroscopeRequired);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const paymentAmount = consultationBookPaymentAmount(totals);
      const order = await bookConsultation({
        start_datetime: booking.slotStart,
        end_datetime: booking.slotEnd,
        share_horoscope: shareHoroscope,
        languages: booking.languages,
        category: booking.categories,
        astrologer_id: astrologerId,
        payment_amount: paymentAmount,
        currency,
        coupon_id: appliedCouponId,
      });
      await openRazorpayCheckout({
        key: order.key,
        currency: order.currency,
        orderId: order.id,
        amount: order.amount,
        prefill: { email: user?.email ?? undefined, contact: user?.mobile ?? undefined },
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
                startDatetime: ev.start_datetime ?? booking.slotStart,
                endDatetime: ev.end_datetime ?? booking.slotEnd,
                categories: ev.category ?? booking.categories,
                languages: ev.languages ?? booking.languages,
                consultationFee: Number(ev.consultation_fee ?? totals.final_price),
                currency: ev.currency ?? currency,
                astrologerName: booking.astrologerName,
                astrologerPicture: booking.astrologerPicture,
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
          const hint =
            currency === "USD" ? ` ${CC.paymentUsdHint}` : "";
          const failMsg = `${message || CC.paymentFailed}${hint}`;
          setError(failMsg);
          showErrorAppSnackBar(failMsg);
          setBusy(false);
        },
      });
    } catch (err) {
      setError(bookErrorMessage(err, C.loadError));
      setBusy(false);
    }
  }

  const categoriesLabel = booking.categories.map(formatConsultationCategoryLabel).join(", ");
  const languagesLabel = formatConsultationLanguageList(booking.languages);

  return (
    <ConsultationCheckoutShell
      title={CB.title}
      onBack={() => router.back()}
      footer={
        <>
          <label className={CONSULTATION_BOOKING_LAYOUT.consentRow}>
            <input
              type="checkbox"
              checked={shareHoroscope}
              onChange={(e) => {
                setShareHoroscope(e.target.checked);
                setError(null);
              }}
              className="mt-1 accent-[#A2C14D]"
            />
            <span>{CB.shareHoroscope}</span>
          </label>
          {error ? <p className="text-sm text-[var(--color-brand-error)]">{error}</p> : null}
          <button
            type="button"
            disabled={busy}
            className={CONSULTATION_BOOKING_LAYOUT.payBtn}
            onClick={() => void onPay()}
          >
            {busy ? CC.processingCta : CB.payCta}
          </button>
        </>
      }
    >
      <ConsultationBookingProfileHeader
        name={booking.astrologerName}
        picture={booking.astrologerPicture}
        compact
      />
      <ConsultationBookingDetailsCard
        date={formatConsultationBookingDate(booking.slotStart)}
        time={formatConsultationBookingTimeRange(booking.slotStart, booking.slotEnd)}
        consultingOn={categoriesLabel}
        language={languagesLabel}
        profile={profile}
        labels={{
          date: CB.date,
          time: CB.time,
          consultingOn: CB.consultingOn,
          language: CB.language,
          dob: CB.dob,
          tob: CB.tob,
          pob: CB.pob,
          rasi: CB.rasi,
          nakshatram: CB.nakshatram,
        }}
      />
      <ConsultationBookingFeesBlock
        totals={totals}
        currency={currency}
        couponCode={couponCode}
        couponApplied={couponApplied}
        promoError={promoError}
        busy={busy}
        onCouponChange={onCouponChange}
        onApplyCoupon={() => void onApplyCoupon()}
      />
    </ConsultationCheckoutShell>
  );
}
