"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { Button } from "@/components/ui/button";
import { MarathonCheckoutProfile } from "@/components/marathon/MarathonCheckoutProfile";
import { MarathonCheckoutSignIn } from "@/components/marathon/MarathonCheckoutSignIn";
import { MarathonCheckoutStepper } from "@/components/marathon/MarathonCheckoutStepper";
import { MarathonEventBanner } from "@/components/marathon/MarathonEventBanner";
import { MarathonListHero } from "@/components/marathon/MarathonListHero";
import { useI18nConstants, useT } from "@/hooks/useT";
import { bcp47FromAppLocale } from "@/lib/i18n/locale";
import { consultationCurrencyForLocation } from "@/lib/consultation-currency";
import { MARATHON_CHECKOUT, MARATHON_CHECKOUT_COPY } from "@/lib/constants/marathon-checkout";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";
import { MARATHON_COPY, MARATHON_PAGE, MARATHON_PORTAL_UI } from "@/lib/constants/marathon";
import { marathonBookingPath, marathonEventPath } from "@/lib/constants/routes";
import { marathonDateParts, marathonPaidLabel, marathonProfileReady } from "@/lib/marathon-display";
import { openRazorpayCheckout } from "@/lib/razorpay-checkout";
import { checkoutMarathonSlot, fetchMyMarathonBookings, fetchPublicMarathon, marathonErrorMessage, verifyMarathonPayment } from "@/lib/services/marathon";
import { fetchProfile } from "@/lib/services/profile";
import { useAuthStore } from "@/store/auth.store";
import type { MarathonBooking, MarathonCheckoutStep, MarathonCheckoutViewProps, MarathonEvent } from "@/types/marathon";

export function MarathonCheckoutView({ marathonId, slotId }: MarathonCheckoutViewProps) {
  const copy = useI18nConstants(MARATHON_COPY);
  const steps = useI18nConstants(MARATHON_CHECKOUT_COPY);
  const { locale, t } = useT();
  const localeTag = bcp47FromAppLocale(locale);
  const router = useRouter();
  const ui = MARATHON_CHECKOUT;
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [hydrated, setHydrated] = useState(false);
  const [event, setEvent] = useState<MarathonEvent | null>(null);
  const [step, setStep] = useState<MarathonCheckoutStep | null>(null);
  const [error, setError] = useState("");
  const [payLabel, setPayLabel] = useState("");
  const [mine, setMine] = useState<MarathonBooking[]>([]);
  const back = () => router.push(marathonEventPath(marathonId));

  useEffect(() => {
    setHydrated(useAuthStore.persist.hasHydrated());
    return useAuthStore.persist.onFinishHydration(() => setHydrated(true));
  }, []);

  useEffect(() => {
    fetchPublicMarathon(marathonId)
      .then(setEvent)
      .catch((err: unknown) => setError(marathonErrorMessage(err)));
  }, [marathonId]);

  useEffect(() => {
    if (!hydrated || !event || step != null) return;
    if (!isAuthenticated) {
      setStep(1);
      return;
    }
    void fetchProfile()
      .then((profile) => setStep(marathonProfileReady(profile) ? 3 : 2))
      .catch((err: unknown) => setError(marathonErrorMessage(err)));
  }, [hydrated, event, isAuthenticated, step]);

  useEffect(() => {
    if (!hydrated || !isAuthenticated) return;
    void fetchMyMarathonBookings().then(setMine).catch(() => setMine([]));
  }, [hydrated, isAuthenticated]);

  useEffect(() => {
    if (step !== 3 || !event) return;
    void fetchProfile().then((profile) => {
      const currency = consultationCurrencyForLocation(profile.preferredLocation || profile.placeOfBirth, {
        countryCode: profile.countryCode,
        timezone: profile.timezone,
      });
      const amount = currency === "USD" && event.usd_fee ? event.usd_fee : event.fee;
      setPayLabel(marathonPaidLabel(amount, currency));
    });
  }, [step, event]);

  async function pay() {
    setError("");
    try {
      const profile = await fetchProfile();
      const currency = consultationCurrencyForLocation(profile.preferredLocation || profile.placeOfBirth, {
        countryCode: profile.countryCode,
        timezone: profile.timezone,
      });
      const order = await checkoutMarathonSlot(slotId, currency);
      await openRazorpayCheckout({
        key: order.key,
        currency: order.currency,
        orderId: order.id,
        amount: order.amount,
        description: event?.name ?? "",
        onFailure: () => setError(copy.paymentFailed),
        onSuccess: (response) => {
          void verifyMarathonPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          })
            .then((result) => router.push(marathonBookingPath(result.booking_id)))
            .catch((err: unknown) => setError(marathonErrorMessage(err)));
        },
      });
    } catch (err: unknown) {
      setError(marathonErrorMessage(err));
    }
  }

  const labels = [
    { title: steps.step1, caption: copy.login },
    { title: steps.step2, caption: copy.profileTitle },
    { title: steps.step3, caption: copy.pay },
  ];
  const slot = event?.slots.find((item) => item.id === slotId);
  const clash = slot
    ? mine.find((row) => new Date(row.starts_at) < new Date(slot.ends_at) && new Date(row.ends_at) > new Date(slot.starts_at))
    : undefined;
  const loading = !hydrated || (!event && !error) || (event != null && step == null && !error);
  const slotWhen = slot && event ? marathonDateParts(slot.starts_at, event.timezone, localeTag) : null;
  const slotEnd = slot && event ? marathonDateParts(slot.ends_at, event.timezone, localeTag) : null;

  return (
    <div className={MARATHON_PAGE.page}>
      <div className={CHAT_LAYOUT.messageListGlow} aria-hidden />
      <div className={MARATHON_PAGE.pageInner}>
        <button type="button" className={MARATHON_PORTAL_UI.back} onClick={back}>
          <svg viewBox="0 0 24 24" className={MARATHON_PORTAL_UI.backIcon} fill="none" aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{t("Go back")}</span>
        </button>
        <div className={MARATHON_PAGE.column}>
          <div className={ui.hero}>
            <MarathonListHero />
          </div>
          <div className={ui.split}>
            <div className={ui.aside}>
              {event ? <MarathonEventBanner event={event} linked={false} /> : null}
              {slotWhen && slotEnd ? (
                <article className={MARATHON_PAGE.showCard}>
                  <div className={MARATHON_PAGE.showBody}>
                    <div className={MARATHON_PAGE.showCopy}>
                      <p className={MARATHON_PAGE.showTitle}>{copy.selectSlot}</p>
                      <p className={MARATHON_PAGE.showText}>{copy.minutes}</p>
                    </div>
                    <p className={MARATHON_PAGE.showWhen}>{slotWhen.time} – {slotEnd.time}</p>
                  </div>
                </article>
              ) : null}
              {error && !event ? <p className={MARATHON_PAGE.bookError}>{error}</p> : null}
            </div>
            <div className={ui.card}>
              {event?.admin_ended ? (
                <div className={ui.body}>
                  <p className={ui.hint}>{copy.adminEnded}</p>
                </div>
              ) : (
              <>
              <MarathonCheckoutStepper step={step ?? 1} labels={labels} />
              <div className={ui.body}>
                {step === 1 ? <MarathonCheckoutSignIn onComplete={setStep} /> : null}
                {step === 2 ? <MarathonCheckoutProfile onComplete={() => setStep(3)} /> : null}
                {step === 3 ? (
                  <>
                    <p className={ui.stepTitle}>{copy.pay}</p>
                    <p className={ui.hint}>{event?.name}</p>
                    {payLabel ? <p className={ui.stepTitle}>{payLabel}</p> : null}
                    {clash ? (
                      <p className={ui.hint}>{t("You already have a consultation at this time.")}</p>
                    ) : (
                      <>
                        <p className={ui.hint}>{copy.summary}</p>
                        <p className={ui.hint}>{copy.whatsappInquiry}</p>
                      </>
                    )}
                    {error ? <p className={MARATHON_PAGE.bookError}>{error}</p> : null}
                    {clash ? (
                      <Button type="button" className={ui.action} onClick={() => router.push(marathonBookingPath(clash.id))}>
                        {copy.viewBooking}
                      </Button>
                    ) : (
                      <Button type="button" className={ui.action} onClick={() => void pay()}>{copy.payBar}</Button>
                    )}
                  </>
                ) : null}
              </div>
              </>
              )}
            </div>
          </div>
        </div>
      </div>
      <LoadingOverlay open={loading} />
    </div>
  );
}
