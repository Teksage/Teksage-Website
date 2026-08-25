"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { consultationSlotsPath } from "@/lib/constants/consultation-routes";
import {
  CONSULTATION_BOOKING_SCREEN,
} from "@/lib/constants/consultation-booking";
import {
  CONSULTATION_CHECKOUT_SCREEN,
  CONSULTATION_CHECKOUT_LAYOUT,
} from "@/lib/constants/consultation-checkout";
import { COUPON_PROMO_COPY } from "@/lib/constants/coupon-promo";
import { CONSULTATION_SCREEN, ROUTES } from "@/lib/constants";
import {
  formatConsultationBookingDate,
  formatConsultationBookingTimeRange,
  formatProfileDateOfBirth,
  formatProfileTimeOfBirth,
} from "@/lib/consultation-booking-format";
import {
  formatConsultationCategoryLabel,
  formatConsultationLanguageList,
  consultationAstrologerName,
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
import {
  assertConsultationCurrency,
  consultationFeeForAstrologer,
} from "@/lib/consultation-currency";
import {
  consultationBookPaymentAmount,
  initialConsultationPricing,
} from "@/lib/consultation-pricing";
import {
  PARTNER_CHECKOUT_CODE,
  partnerConsultPct,
} from "@/lib/partner-discount";
import { fetchPartnerMyDiscount } from "@/lib/services/partner-discount-api";
import { fetchProfile } from "@/lib/services/profile";
import { useAuthStore } from "@/store/auth.store";
import { APP_SNACKBAR_MESSAGES } from "@/lib/constants/app-snackbar";
import {
  showErrorAppSnackBar,
  showSuccessAppSnackBar,
} from "@/lib/app-snackbar";
import { cn } from "@/lib/utils";
import type { ConsultationBookingDraft, ConsultationCouponResult } from "@/types/consultation";
import type { UserProfile } from "@/types";
import { isAxiosError } from "axios";

type Props = { astrologerId: number };

function bookErrorMessage(err: unknown, fallback: string): string {
  if (isAxiosError(err)) {
    const detail = err.response?.data as { detail?: string } | undefined;
    if (typeof detail?.detail === "string") return detail.detail;
  }
  return fallback;
}

function formatFee(amount: number, currency: string): string {
  const unit = currency === "INR" ? "₹" : "$";
  return `${unit}${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

const FOCUS_CATEGORIES = ["Career", "Wealth", "Marriage", "Health", "Education", "Property"];

export function ConsultationCheckoutView({ astrologerId }: Props) {
  const CB = useI18nConstants(CONSULTATION_BOOKING_SCREEN);
  const CC = CONSULTATION_CHECKOUT_SCREEN;
  const C = useI18nConstants(CONSULTATION_SCREEN);
  const PROMO = useI18nConstants(COUPON_PROMO_COPY);
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const currency = useConsultationCurrency();

  const [draft, setDraft] = useState<ConsultationBookingDraft | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [astrologerPicture, setAstrologerPicture] = useState<string | null>(null);
  const [shareHoroscope, setShareHoroscope] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [appliedCouponCode, setAppliedCouponCode] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);
  const [appliedCouponId, setAppliedCouponId] = useState<number | null>(null);
  const [pricing, setPricing] = useState<ConsultationCouponResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [focusTopics, setFocusTopics] = useState<string[]>([]);

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
    setFocusTopics(d.categories.map((c) => formatConsultationCategoryLabel(c)).slice(0, 3));
    let cancelled = false;
    (async () => {
      try {
        const [detail, userProfile, liveDiscount] = await Promise.all([
          fetchAstrologerDetail(astrologerId),
          fetchProfile(),
          fetchPartnerMyDiscount().catch(() => null),
        ]);
        const fee = consultationFeeForAstrologer(detail.astrologer, currency);
        if (cancelled) return;
        setProfile(userProfile);
        setAstrologerPicture(detail.astrologer.picture ?? null);
        setDraft({
          ...(d as ConsultationBookingDraft),
          currency,
          fee,
          astrologerName: consultationAstrologerName(detail.astrologer.user) || d.astrologerName || "",
          astrologerPicture: detail.astrologer.picture ?? d.astrologerPicture,
        });
        const partnerPct = partnerConsultPct(liveDiscount ?? userProfile.partnerDiscount);
        setPricing(initialConsultationPricing(fee, currency, partnerPct));
        if (partnerPct > 0) {
          setCouponApplied(true);
          setAppliedCouponCode(PARTNER_CHECKOUT_CODE);
          setCouponCode(PARTNER_CHECKOUT_CODE);
        }
      } catch {
        if (!cancelled) router.replace(consultationSlotsPath(astrologerId));
      }
    })();
    return () => { cancelled = true; };
  }, [astrologerId, currency, router]);

  const checkoutLoading = !draft || !pricing;
  if (checkoutLoading) {
    return (
      <div className={CONSULTATION_CHECKOUT_LAYOUT.page}>
        <LoadingOverlay open />
      </div>
    );
  }

  const booking = draft;
  const totals = pricing;
  const referralLocked = appliedCouponCode === PARTNER_CHECKOUT_CODE;
  const hasDiscount = totals.discount > 0;
  const baseFee = totals.plan_price > 0 ? totals.plan_price : totals.discounted_price;

  function onCouponChange(value: string) {
    if (referralLocked) return;
    setCouponCode(value);
    if ((couponApplied || promoError) && value.trim() !== appliedCouponCode) {
      setCouponApplied(false);
      setPromoError(null);
      setAppliedCouponId(null);
      if (booking.fee != null) {
        setPricing(initialConsultationPricing(booking.fee, currency));
      }
    }
  }

  async function onApplyCoupon() {
    if (referralLocked || !couponCode.trim()) return;
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
      setAppliedCouponId(result.coupon_id && result.coupon_id > 0 ? result.coupon_id : null);
      setCouponApplied(true);
      setAppliedCouponCode(couponCode.trim());
      showSuccessAppSnackBar(PROMO.appliedToast, { position: "top" });
    } catch {
      setCouponApplied(false);
      setAppliedCouponId(null);
      setPromoError(PROMO.invalidPromo);
      showErrorAppSnackBar(PROMO.invalidPromo, { position: "top" });
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
        currency: assertConsultationCurrency(order.currency, currency),
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
          const hint = currency === "USD" ? ` ${CC.paymentUsdHint}` : "";
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

  function toggleFocus(cat: string) {
    setFocusTopics((prev) =>
      prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : prev.length < 3
        ? [...prev, cat]
        : prev
    );
  }

  const langLabel = formatConsultationLanguageList(booking.languages);
  const astroSubtitle = [
    "Video call",
    langLabel,
    `30 minutes`,
  ].filter(Boolean).join(" · ");

  return (
    <>
      <div className={CONSULTATION_CHECKOUT_LAYOUT.page}>
        {/* Header */}
        <header className={CONSULTATION_CHECKOUT_LAYOUT.pageHeader}>
          <div className={CONSULTATION_CHECKOUT_LAYOUT.pageHeaderInner}>
            <button
              type="button"
              onClick={() => router.back()}
              className={CONSULTATION_CHECKOUT_LAYOUT.backBtn}
              aria-label="Back"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className={CONSULTATION_CHECKOUT_LAYOUT.headerMain}>
              <span className={CONSULTATION_CHECKOUT_LAYOUT.headerTitle}>{CC.title}</span>
              <span className={CONSULTATION_CHECKOUT_LAYOUT.headerSub}>{CC.subtitle}</span>
            </div>
            {/* Step indicators */}
            <div className="hidden sm:flex items-center gap-1 shrink-0">
              <span className="flex items-center gap-1 rounded-full bg-[var(--color-brand-primary)] px-2.5 py-1 text-xs font-bold text-white">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                  <path d="M2 5.5L4 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Astrologer
              </span>
              <span className="text-black/30 text-xs">›</span>
              <span className="flex items-center gap-1 rounded-full bg-[var(--color-brand-primary)] px-2.5 py-1 text-xs font-bold text-white">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                  <path d="M2 5.5L4 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Schedule
              </span>
              <span className="text-black/30 text-xs">›</span>
              <span className="rounded-full border-2 border-[var(--color-brand-primary)] px-2.5 py-0.5 text-xs font-bold text-[var(--color-brand-primary)]">
                3 Details
              </span>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className={CONSULTATION_CHECKOUT_LAYOUT.scroll}>
          <div className={CONSULTATION_CHECKOUT_LAYOUT.inner}>
            {/* Left column */}
            <div className={CONSULTATION_CHECKOUT_LAYOUT.leftCol}>
              {/* Astrologer chip */}
              <div className={CONSULTATION_CHECKOUT_LAYOUT.astroChip}>
                <div className={CONSULTATION_CHECKOUT_LAYOUT.astroAvatar}>
                  {astrologerPicture ? (
                    <Image
                      src={astrologerPicture}
                      alt={booking.astrologerName}
                      width={48}
                      height={48}
                      unoptimized
                      className={CONSULTATION_CHECKOUT_LAYOUT.astroAvatarImg}
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center bg-[var(--color-brand-primary)] text-white text-sm font-bold">
                      {booking.astrologerName[0]?.toUpperCase() ?? "A"}
                    </div>
                  )}
                </div>
                <div className={CONSULTATION_CHECKOUT_LAYOUT.astroMeta}>
                  <p className={CONSULTATION_CHECKOUT_LAYOUT.astroName}>{booking.astrologerName}</p>
                  <p className={CONSULTATION_CHECKOUT_LAYOUT.astroSub}>{astroSubtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className={CONSULTATION_CHECKOUT_LAYOUT.changeLink}
                >
                  {CC.changeAstrologer}
                </button>
              </div>

              {/* When */}
              <div className={CONSULTATION_CHECKOUT_LAYOUT.whenCard}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={CONSULTATION_CHECKOUT_LAYOUT.whenLabel}>{CC.whenLabel}</p>
                    <p className={CONSULTATION_CHECKOUT_LAYOUT.whenValue}>
                      {formatConsultationBookingDate(booking.slotStart)} · {formatConsultationBookingTimeRange(booking.slotStart, booking.slotEnd)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className={CONSULTATION_CHECKOUT_LAYOUT.rescheduleBtn}
                  >
                    {CC.reschedule}
                  </button>
                </div>
              </div>

              {/* Birth details */}
              <div className={CONSULTATION_CHECKOUT_LAYOUT.birthCard}>
                <div className={CONSULTATION_CHECKOUT_LAYOUT.birthCardHeader}>
                  <h2 className={CONSULTATION_CHECKOUT_LAYOUT.birthCardTitle}>{CC.birthDetailsTitle}</h2>
                  <a href={ROUTES.profile} className={CONSULTATION_CHECKOUT_LAYOUT.editLink}>
                    {CC.editProfile}
                  </a>
                </div>
                <div className={CONSULTATION_CHECKOUT_LAYOUT.birthGrid}>
                  {[
                    { label: CB.dob, value: formatProfileDateOfBirth(profile?.dateOfBirth) },
                    { label: CB.tob, value: formatProfileTimeOfBirth(profile?.timeOfBirth) },
                    { label: CB.pob, value: profile?.placeOfBirth?.trim() || "—" },
                    { label: CB.rasi, value: profile?.rashi?.trim() || "—" },
                    { label: CB.nakshatram, value: profile?.nakshatra?.trim() || "—" },
                    { label: "Language for call", value: langLabel || "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className={CONSULTATION_CHECKOUT_LAYOUT.birthCell}>
                      <p className={CONSULTATION_CHECKOUT_LAYOUT.birthCellLabel}>{label}</p>
                      <p className={CONSULTATION_CHECKOUT_LAYOUT.birthCellValue}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Focus topics */}
              <div className={CONSULTATION_CHECKOUT_LAYOUT.focusCard}>
                <h2 className={CONSULTATION_CHECKOUT_LAYOUT.focusCardTitle}>{CC.focusTitle}</h2>
                <p className={CONSULTATION_CHECKOUT_LAYOUT.focusCardHint}>{CC.focusHint}</p>
                <div className={CONSULTATION_CHECKOUT_LAYOUT.focusChips}>
                  {FOCUS_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleFocus(cat)}
                      className={cn(
                        CONSULTATION_CHECKOUT_LAYOUT.focusChip,
                        focusTopics.includes(cat)
                          ? CONSULTATION_CHECKOUT_LAYOUT.focusChipActive
                          : CONSULTATION_CHECKOUT_LAYOUT.focusChipDefault
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <textarea
                  rows={2}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={CC.questionPlaceholder}
                  className={CONSULTATION_CHECKOUT_LAYOUT.focusTextarea}
                />
              </div>
            </div>

            {/* Right column — Payment summary */}
            <div className={CONSULTATION_CHECKOUT_LAYOUT.rightCol}>
              <div className={CONSULTATION_CHECKOUT_LAYOUT.payCard}>
                <h2 className={CONSULTATION_CHECKOUT_LAYOUT.payCardTitle}>{CC.paymentSummaryTitle}</h2>

                {/* Promo code */}
                <div className={CONSULTATION_CHECKOUT_LAYOUT.promoRow}>
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => onCouponChange(e.target.value)}
                    placeholder={CC.promoPlaceholder}
                    disabled={referralLocked}
                    className={CONSULTATION_CHECKOUT_LAYOUT.promoInput}
                  />
                  <button
                    type="button"
                    disabled={busy || !couponCode.trim() || referralLocked}
                    onClick={() => void onApplyCoupon()}
                    className={CONSULTATION_CHECKOUT_LAYOUT.promoBtn}
                  >
                    {couponApplied ? PROMO.applied : CC.applyBtn}
                  </button>
                </div>
                {promoError ? <p className={CONSULTATION_CHECKOUT_LAYOUT.promoError}>{promoError}</p> : null}

                {/* Fee rows */}
                <div className={CONSULTATION_CHECKOUT_LAYOUT.feeRow}>
                  <span>Consultation fee (30 min)</span>
                  <span className="font-semibold">{formatFee(baseFee, currency)}</span>
                </div>
                {hasDiscount ? (
                  <div className={CONSULTATION_CHECKOUT_LAYOUT.feeDiscountRow}>
                    <span>{referralLocked ? CB.referralDiscount : "Discount"}</span>
                    <span>-{formatFee(totals.discount, currency)}</span>
                  </div>
                ) : null}
                {totals.cgst > 0 ? (
                  <div className={CONSULTATION_CHECKOUT_LAYOUT.feeRow}>
                    <span>CGST {totals.cgst_percentage}%</span>
                    <span>{formatFee(totals.cgst, currency)}</span>
                  </div>
                ) : null}
                {totals.sgst > 0 ? (
                  <div className={CONSULTATION_CHECKOUT_LAYOUT.feeRow}>
                    <span>SGST {totals.sgst_percentage}%</span>
                    <span>{formatFee(totals.sgst, currency)}</span>
                  </div>
                ) : null}
                <div className={CONSULTATION_CHECKOUT_LAYOUT.feeDivider} />
                <div className={CONSULTATION_CHECKOUT_LAYOUT.feeTotalRow}>
                  <span>Total payable</span>
                  <span>{formatFee(totals.final_price, currency)}</span>
                </div>

                {/* Consent */}
                <label className={CONSULTATION_CHECKOUT_LAYOUT.consentRow}>
                  <input
                    type="checkbox"
                    checked={shareHoroscope}
                    onChange={(e) => {
                      setShareHoroscope(e.target.checked);
                      setError(null);
                    }}
                    className={CONSULTATION_CHECKOUT_LAYOUT.consentCheck}
                  />
                  <span className={CONSULTATION_CHECKOUT_LAYOUT.consentText}>{CC.consentText}</span>
                </label>
                {error ? <p className={CONSULTATION_CHECKOUT_LAYOUT.error}>{error}</p> : null}
                {!shareHoroscope && !error ? (
                  <p className={CONSULTATION_CHECKOUT_LAYOUT.consentHint}>{CC.consentHint}</p>
                ) : null}

                <button
                  type="button"
                  disabled={busy || !shareHoroscope}
                  className={CONSULTATION_CHECKOUT_LAYOUT.payBtn}
                  onClick={() => void onPay()}
                >
                  {busy ? CC.processingCta : `Pay ${formatFee(totals.final_price, currency)} securely`}
                </button>

                {/* Trust points */}
                <div className={CONSULTATION_CHECKOUT_LAYOUT.trustList}>
                  {CC.trustPoints.map((point, i) => (
                    <div key={i} className={CONSULTATION_CHECKOUT_LAYOUT.trustRow}>
                      <span className={CONSULTATION_CHECKOUT_LAYOUT.trustIcon}>✓</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoadingOverlay open={busy} />
    </>
  );
}
