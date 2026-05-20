"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ConsultationSlotsAvailability } from "@/components/consultation/ConsultationSlotsAvailability";
import { ConsultationSlotsCalendar } from "@/components/consultation/ConsultationSlotsCalendar";
import { ConsultationSlotsShell } from "@/components/consultation/ConsultationSlotsShell";
import { consultationCheckoutPath } from "@/lib/constants/consultation-routes";
import { CONSULTATION_SLOTS_LAYOUT, CONSULTATION_SLOTS_SCREEN } from "@/lib/constants/consultation-slots";
import { CONSULTATION_SCREEN, ROUTES } from "@/lib/constants";
import { toIsoDate } from "@/lib/consultation-calendar";
import { consultationFeeForAstrologer } from "@/lib/consultation-currency";
import { useConsultationCurrency } from "@/hooks/useConsultationCurrency";
import { consultationAstrologerName } from "@/lib/consultation-display";
import { readConsultationFilter, writeConsultationDraft } from "@/lib/consultation-session";
import { fetchAstrologerDetail, fetchAstrologerSlots } from "@/lib/services/consultation";
import type { ConsultationSlot } from "@/types/consultation";

type ConsultationSlotsViewProps = {
  astrologerId: number;
};

export function ConsultationSlotsView({ astrologerId }: ConsultationSlotsViewProps) {
  const CS = useI18nConstants(CONSULTATION_SLOTS_SCREEN);
  const C = useI18nConstants(CONSULTATION_SCREEN);
  const router = useRouter();
  const today = useMemo(() => new Date(), []);
  const [title, setTitle] = useState("");
  const [focusedMonth, setFocusedMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [slots, setSlots] = useState<ConsultationSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ConsultationSlot | null>(null);
  const [showPickError, setShowPickError] = useState(false);

  const currency = useConsultationCurrency();
  const isoDate = toIsoDate(selectedDate);

  useEffect(() => {
    if (!readConsultationFilter()) {
      router.replace(ROUTES.consultation);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const detail = await fetchAstrologerDetail(astrologerId);
        if (!cancelled) {
          setTitle(consultationAstrologerName(detail.astrologer.user));
        }
      } catch {
        if (!cancelled) setTitle(C.slotsTitle);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [astrologerId, router]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const list = await fetchAstrologerSlots(astrologerId, isoDate);
        if (!cancelled) {
          setSlots(list);
          setSelected(null);
        }
      } catch {
        if (!cancelled) setSlots([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [astrologerId, isoDate]);

  async function onBook() {
    if (!selected || selected.event_booked) {
      setShowPickError(true);
      return;
    }
    const filter = readConsultationFilter();
    if (!filter) return;
    const detail = await fetchAstrologerDetail(astrologerId);
    const name = consultationAstrologerName(detail.astrologer.user);
    writeConsultationDraft({
      ...filter,
      astrologerId,
      astrologerName: name,
      astrologerPicture: detail.astrologer.picture,
      currency,
      fee: consultationFeeForAstrologer(detail.astrologer, currency),
      slotStart: selected.start_datetime,
      slotEnd: selected.end_datetime,
    });
    router.push(consultationCheckoutPath(astrologerId));
  }

  return (
    <ConsultationSlotsShell
      title={title || C.slotsTitle}
      onBack={() => router.back()}
      footer={
        <>
          {showPickError ? (
            <p className={CONSULTATION_SLOTS_LAYOUT.pickError}>
              * {CS.slotPickError}
            </p>
          ) : null}
          <button
            type="button"
            className={CONSULTATION_SLOTS_LAYOUT.footerBtn}
            onClick={() => void onBook()}
          >
            {CS.bookCta}
          </button>
        </>
      }
    >
      <ConsultationSlotsCalendar
        focusedMonth={focusedMonth}
        selectedDate={selectedDate}
        today={today}
        onFocusedMonthChange={setFocusedMonth}
        onSelectDate={setSelectedDate}
      />
      <ConsultationSlotsAvailability
        slots={slots}
        loading={loading}
        selected={selected}
        onSelect={(slot) => {
          setSelected(slot);
          setShowPickError(false);
        }}
      />
    </ConsultationSlotsShell>
  );
}
