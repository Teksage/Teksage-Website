"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { MarathonCheckoutAside } from "@/components/marathon/MarathonCheckoutAside";
import { MarathonCheckoutLogin } from "@/components/marathon/MarathonCheckoutNext";
import { MarathonCheckoutProfile } from "@/components/marathon/MarathonCheckoutProfile";
import { MarathonCheckoutReview } from "@/components/marathon/MarathonCheckoutReview";
import { MarathonCheckoutTimeCard } from "@/components/marathon/MarathonCheckoutTimeCard";
import { MarathonFlowHeader } from "@/components/marathon/MarathonFlowHeader";
import { useI18nConstants } from "@/hooks/useT";
import { consultationCurrencyForLocation } from "@/lib/consultation-currency";
import { RELATED_RELATIONSHIP_COPY, relatedRelationshipLabel } from "@/lib/constants/related-profiles";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";
import { MARATHON_FLOW_COPY } from "@/lib/constants/marathon-flow-copy";
import { MARATHON_FLOW_UI } from "@/lib/constants/marathon-flow-ui";
import { MARATHON_COPY, MARATHON_PAGE } from "@/lib/constants/marathon";
import { ROUTES, marathonBookingPath, marathonCheckoutPath } from "@/lib/constants/routes";
import { marathonBookedSlotIds, marathonDisplayName } from "@/lib/marathon-display";
import { payMarathonCheckout } from "@/lib/marathon-pay";
import { fetchMyMarathonBookings, fetchPublicMarathon, marathonErrorMessage } from "@/lib/services/marathon";
import { fetchProfile } from "@/lib/services/profile";
import { useAuthStore } from "@/store/auth.store";
import type { MarathonBooking, MarathonCheckoutStep, MarathonCheckoutViewProps, MarathonEvent } from "@/types/marathon";

export function MarathonCheckoutView({ marathonId, slotId, eventKey }: MarathonCheckoutViewProps) {
  const copy = useI18nConstants(MARATHON_COPY);
  const flow = useI18nConstants(MARATHON_FLOW_COPY);
  const relations = useI18nConstants(RELATED_RELATIONSHIP_COPY);
  const router = useRouter();
  const ui = MARATHON_FLOW_UI;
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [hydrated, setHydrated] = useState(false);
  const [event, setEvent] = useState<MarathonEvent | null>(null);
  const [step, setStep] = useState<MarathonCheckoutStep | null>(null);
  const [error, setError] = useState("");
  const [payFee, setPayFee] = useState("");
  const [payCurrency, setPayCurrency] = useState("INR");
  const [mine, setMine] = useState<MarathonBooking[]>([]);
  const [customerQuery, setCustomerQuery] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [relatedProfileId, setRelatedProfileId] = useState<number | null>(null);
  const [memberName, setMemberName] = useState("");
  const [memberRelationship, setMemberRelationship] = useState("");
  const [bornLine, setBornLine] = useState("");
  const back = () => router.push(ROUTES.expertHours);

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
      .then((profile) => {
        useAuthStore.getState().updateUser(profile);
        setStep(2);
      })
      .catch((err: unknown) => setError(marathonErrorMessage(err)));
  }, [hydrated, event, isAuthenticated, step]);

  useEffect(() => {
    if (!hydrated || !isAuthenticated) return;
    void fetchMyMarathonBookings().then(setMine).catch(() => setMine([]));
  }, [hydrated, isAuthenticated]);

  useEffect(() => {
    if (!event) return;
    if (!isAuthenticated) {
      setPayCurrency("INR");
      setPayFee(String(event.fee));
      return;
    }
    void fetchProfile().then((profile) => {
      useAuthStore.getState().updateUser(profile);
      const currency = consultationCurrencyForLocation(profile.preferredLocation || profile.placeOfBirth, {
        countryCode: profile.countryCode,
        timezone: profile.timezone,
      });
      const amount = currency === "USD" && event.usd_fee ? event.usd_fee : event.fee;
      setPayCurrency(currency);
      setPayFee(String(amount));
    });
  }, [event, isAuthenticated]);

  function pay() {
    void payMarathonCheckout({
      slotId,
      eventName: event?.name ?? "",
      customerQuery,
      preferredLanguage,
      relatedProfileId,
      queryRequired: copy.queryRequired,
      languageRequired: copy.languageRequired,
      paymentFailed: copy.paymentFailed,
      onNeedDetails: () => setStep(2),
      onError: setError,
      onBooked: (bookingId) => router.push(marathonBookingPath(bookingId)),
    });
  }

  const labels = [copy.login, flow.timeBirth, flow.payment].map((title) => ({ title, caption: "" }));
  const slot = event?.slots.find((item) => item.id === slotId);
  const loading = !hydrated || (!event && !error) || (event != null && step == null && !error);
  const bookedSlotIds = marathonBookedSlotIds(event, mine);
  const readingFor = memberName
    ? `${memberName}${memberRelationship ? ` · ${relatedRelationshipLabel(relations, memberRelationship)}` : ""}`
    : [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.name || "";
  const displayStep: MarathonCheckoutStep = step ?? 1;

  function pickSlot(id: number) {
    if (!event || id === slotId) return;
    router.replace(marathonCheckoutPath(event.public_slug || eventKey || marathonId, id));
  }

  return (
    <div className={MARATHON_PAGE.page}>
      <div className={CHAT_LAYOUT.messageListGlow} aria-hidden />
      <div className={MARATHON_PAGE.pageInner}>
        <MarathonFlowHeader
          title={event ? marathonDisplayName(event.name) : copy.title}
          step={displayStep}
          labels={labels}
          onBack={back}
          onSelectStep={(next) => {
            if (step === 3 && next === 2) setStep(2);
          }}
        />
        <div className={step === 1 ? ui.gridLogin : ui.grid}>
          <div className={ui.stack}>
            {error && !event ? <p className={MARATHON_PAGE.bookError}>{error}</p> : null}
            {event?.admin_ended ? (
              <div className={ui.card}><p className={ui.sectionHint}>{copy.adminEnded}</p></div>
            ) : null}
            {event && !event.admin_ended && step === 1 ? <MarathonCheckoutLogin onComplete={setStep} /> : null}
            {event && !event.admin_ended && step === 2 ? (
              <>
                <MarathonCheckoutTimeCard event={event} slotId={slotId} bookedSlotIds={bookedSlotIds} onSelect={pickSlot} />
                <div className={ui.card}>
                  <MarathonCheckoutProfile
                    initialQuery={customerQuery}
                    initialLanguage={preferredLanguage}
                    initialRelatedProfileId={relatedProfileId}
                    onComplete={(result) => {
                      setCustomerQuery(result.customerQuery);
                      setPreferredLanguage(result.preferredLanguage);
                      setRelatedProfileId(result.relatedProfileId);
                      setMemberName(result.memberDisplayName ?? "");
                      setMemberRelationship(result.relationship ?? "");
                      setBornLine(result.bornLine ?? "");
                      setStep(3);
                    }}
                  />
                </div>
              </>
            ) : null}
            {event && !event.admin_ended && step === 3 ? (
              <MarathonCheckoutReview
                readingFor={readingFor}
                born={bornLine}
                language={preferredLanguage}
                email={user?.email ?? ""}
                question={customerQuery}
                onEdit={() => setStep(2)}
              />
            ) : null}
          </div>
          {step === 1 ? null : (
            <MarathonCheckoutAside
              event={event}
              slot={slot}
              step={step}
              payFee={payFee}
              payCurrency={payCurrency}
              mine={mine}
              error={error}
              onPay={() => void pay()}
            />
          )}
        </div>
      </div>
      <LoadingOverlay open={loading} />
    </div>
  );
}
