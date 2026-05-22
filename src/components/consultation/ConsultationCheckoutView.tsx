"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ConsultationBookingDetailRow } from "@/components/consultation/ConsultationBookingDetailRow";
import { ConsultationBookingFeesBlock } from "@/components/consultation/ConsultationBookingFeesBlock";
import { ConsultationBookingProfileHeader } from "@/components/consultation/ConsultationBookingProfileHeader";
import { ConsultationBookingSectionDivider } from "@/components/consultation/ConsultationBookingSectionDivider";
import { ConsultationCheckoutShell } from "@/components/consultation/ConsultationCheckoutShell";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { consultationSlotsPath } from "@/lib/constants/consultation-routes";
import {
  CONSULTATION_BOOKING_LAYOUT,
  CONSULTATION_BOOKING_SCREEN,
} from "@/lib/constants/consultation-booking";
import { CONSULTATION_CHECKOUT_SCREEN } from "@/lib/constants/consultation-checkout";
import { CONSULTATION_SCREEN, ROUTES } from "@/lib/constants";
import {
  formatConsultationBookingDate,
  formatConsultationBookingTimeRange,
  formatFeeSlash,
  formatProfileDateOfBirth,
  formatProfileTimeOfBirth,
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
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const currency = useConsultationCurrency();
  const [draft, setDraft] = useState<ConsultationBookingDraft | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [shareHoroscope, setShareHoroscope] = useState(false);
  const [couponCode, setCouponCode] = useState("");
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

  async function onApplyCoupon() {
    if (!couponCode.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const result = await applyConsultationCoupon({
        coupon_name: couponCode.trim(),
        type: "consultation",
        currency,
        amount: booking.fee ?? 0,
      });
      setPricing(result);
      setAppliedCouponId(result.coupon_id && result.coupon_id > 0 ? result.coupon_id : null);
    } catch {
      setError(C.loadError);
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
      const order = await bookConsultation({
        start_datetime: booking.slotStart,
        end_datetime: booking.slotEnd,
        share_horoscope: shareHoroscope,
        languages: booking.languages,
        category: booking.categories,
        astrologer_id: astrologerId,
        payment_amount: consultationBookPaymentAmount(totals),
        currency,
        coupon_id: appliedCouponId,
      });
      await openRazorpayCheckout({
        key: order.key,
        currency: order.currency,
        orderId: order.id,
        prefill: { email: user?.email ?? undefined, contact: user?.mobile ?? undefined },
        onSuccess: async (response) => {
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
          router.push(ROUTES.consultationSummary);
        },
        onDismiss: () => setBusy(false),
        onFailure: (message) => {
          const hint =
            currency === "USD" ? ` ${CC.paymentUsdHint}` : "";
          setError(`${message || CC.paymentFailed}${hint}`);
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
      />
      <ConsultationBookingSectionDivider title={CB.consultationSection} />
      <div className={CONSULTATION_BOOKING_LAYOUT.detailRows}>
        <ConsultationBookingDetailRow
          label={CB.date}
          value={formatConsultationBookingDate(booking.slotStart)}
        />
        <ConsultationBookingDetailRow
          label={CB.time}
          value={formatConsultationBookingTimeRange(booking.slotStart, booking.slotEnd)}
        />
        <ConsultationBookingDetailRow
          label={CB.consultingOn}
          value={categoriesLabel}
        />
        <ConsultationBookingDetailRow
          label={CB.language}
          value={languagesLabel}
        />
        <ConsultationBookingDetailRow
          label={CB.consultationFee}
          value={formatFeeSlash(totals.final_price, currency)}
        />
      </div>
      <ConsultationBookingSectionDivider title={CB.personalSection} />
      <div className={CONSULTATION_BOOKING_LAYOUT.grayCard}>
        <ConsultationBookingDetailRow
          label={CB.dob}
          value={formatProfileDateOfBirth(profile?.dateOfBirth)}
        />
        <ConsultationBookingDetailRow
          label={CB.tob}
          value={formatProfileTimeOfBirth(profile?.timeOfBirth)}
        />
        <ConsultationBookingDetailRow
          label={CB.pob}
          value={profile?.placeOfBirth?.trim() || "—"}
        />
        <ConsultationBookingDetailRow
          label={CB.rasi}
          value={profile?.rashi?.trim() || "—"}
        />
        <ConsultationBookingDetailRow
          label={CB.nakshatram}
          value={profile?.nakshatra?.trim() || "—"}
        />
        <label className="mt-4 flex items-start gap-2 border-t border-black/10 pt-4 text-sm">
          <input
            type="checkbox"
            checked={shareHoroscope}
            onChange={(e) => {
              setShareHoroscope(e.target.checked);
              setError(null);
            }}
            className="mt-1 accent-[#A2C14D]"
          />
          <span className="text-[var(--color-brand-black)]/70">
            {CB.shareHoroscope}
          </span>
        </label>
      </div>
      <ConsultationBookingFeesBlock
        totals={totals}
        currency={currency}
        couponCode={couponCode}
        busy={busy}
        onCouponChange={setCouponCode}
        onApplyCoupon={() => void onApplyCoupon()}
      />
    </ConsultationCheckoutShell>
  );
}
