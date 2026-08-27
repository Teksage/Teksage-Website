"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import { consultationSlotsPath } from "@/lib/constants/consultation-routes";
import { COUPON_PROMO_COPY } from "@/lib/constants/coupon-promo";
import { CONSULTATION_SCREEN } from "@/lib/constants";
import { formatConsultationLanguageList } from "@/lib/consultation-display";
import { readConsultationDraft } from "@/lib/consultation-session";
import { applyConsultationCoupon } from "@/lib/services/consultation";
import { useConsultationCurrency } from "@/hooks/useConsultationCurrency";
import { initialConsultationPricing } from "@/lib/consultation-pricing";
import {
  loadConsultationCheckoutData,
  PARTNER_CHECKOUT_CODE,
} from "@/lib/consultation-checkout-load";
import { runConsultationCheckoutPayment } from "@/lib/consultation-checkout-payment";
import { useAuthStore } from "@/store/auth.store";
import {
  showErrorAppSnackBar,
  showSuccessAppSnackBar,
} from "@/lib/app-snackbar";
import type { ConsultationBookingDraft, ConsultationCouponResult } from "@/types/consultation";
import type { UserProfile } from "@/types";

export { formatConsultationCheckoutFee } from "@/lib/consultation-checkout-format";

export function useConsultationCheckout(astrologerId: number) {
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
    const stored = readConsultationDraft();
    if (
      !stored?.slotStart ||
      !stored.slotEnd ||
      !stored.languages?.length ||
      !stored.categories?.length ||
      stored.astrologerId !== astrologerId
    ) {
      router.replace(consultationSlotsPath(astrologerId));
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const loaded = await loadConsultationCheckoutData(
          stored as ConsultationBookingDraft,
          astrologerId,
          currency
        );
        if (cancelled) return;
        setProfile(loaded.profile);
        setAstrologerPicture(loaded.astrologerPicture);
        setDraft(loaded.draft);
        setFocusTopics(loaded.focusTopics);
        setPricing(loaded.pricing);
        if (loaded.partnerCouponApplied) {
          setCouponApplied(true);
          setAppliedCouponCode(PARTNER_CHECKOUT_CODE);
          setCouponCode(PARTNER_CHECKOUT_CODE);
        }
      } catch {
        if (!cancelled) router.replace(consultationSlotsPath(astrologerId));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [astrologerId, currency, router]);

  const referralLocked = appliedCouponCode === PARTNER_CHECKOUT_CODE;
  const langLabel = draft ? formatConsultationLanguageList(draft.languages) : "";

  function onCouponChange(value: string) {
    if (referralLocked || !draft) return;
    setCouponCode(value);
    if ((couponApplied || promoError) && value.trim() !== appliedCouponCode) {
      setCouponApplied(false);
      setPromoError(null);
      setAppliedCouponId(null);
      if (draft.fee != null) {
        setPricing(initialConsultationPricing(draft.fee, currency));
      }
    }
  }

  async function onApplyCoupon() {
    if (referralLocked || !couponCode.trim() || !draft) return;
    setBusy(true);
    setPromoError(null);
    try {
      const result = await applyConsultationCoupon({
        coupon_name: couponCode.trim(),
        type: "consultation",
        currency,
        amount: draft.fee ?? 0,
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
      if (draft.fee != null) {
        setPricing(initialConsultationPricing(draft.fee, currency));
      }
    } finally {
      setBusy(false);
    }
  }

  async function onPay() {
    if (!draft || !pricing) return;
    await runConsultationCheckoutPayment({
      draft,
      pricing,
      astrologerId,
      currency,
      appliedCouponId,
      shareHoroscope,
      userEmail: user?.email,
      userMobile: user?.mobile,
      loadErrorLabel: C.loadError,
      shareHoroscopeRequiredLabel: C.shareHoroscopeRequired,
      router,
      setBusy,
      setError,
    });
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

  return {
    draft,
    profile,
    astrologerPicture,
    pricing,
    langLabel,
    focusTopics,
    question,
    shareHoroscope,
    couponCode,
    couponApplied,
    referralLocked,
    promoError,
    busy,
    error,
    currency,
    setQuestion,
    toggleFocus,
    onCouponChange,
    onApplyCoupon,
    onPay,
    setShareHoroscope: (checked: boolean) => {
      setShareHoroscope(checked);
      setError(null);
    },
  };
}
