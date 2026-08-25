"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { ConsultationSlotsDateStrip } from "@/components/consultation/ConsultationSlotsDateStrip";
import { ConsultationSlotsTimePicker } from "@/components/consultation/ConsultationSlotsTimePicker";
import { CONSULTATION_SLOTS_LAYOUT, CONSULTATION_SLOTS_SCREEN } from "@/lib/constants/consultation-slots";
import { CONSULTATION_SCREEN } from "@/lib/constants";
import { toIsoDate } from "@/lib/consultation-calendar";
import { consultationFeeForAstrologer } from "@/lib/consultation-currency";
import { useConsultationCurrency } from "@/hooks/useConsultationCurrency";
import { consultationAstrologerName } from "@/lib/consultation-display";
import { ensureConsultationFilter } from "@/lib/consultation-default-filter";
import { readConsultationFilter, writeConsultationDraft } from "@/lib/consultation-session";
import { fetchAstrologerDetail, fetchAstrologerSlots } from "@/lib/services/consultation";
import { consultationCheckoutPath } from "@/lib/constants/consultation-routes";
import { formatSlotTime12 } from "@/lib/consultation-calendar";
import type { ConsultationSlot } from "@/types/consultation";

type Props = { astrologerId: number };

function formatSlotDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatSlotRange(start: string, end: string): string {
  return `${formatSlotDate(start)} · ${formatSlotTime12(start)} – ${formatSlotTime12(end)}`;
}

export function ConsultationSlotsView({ astrologerId }: Props) {
  const CS = CONSULTATION_SLOTS_SCREEN;
  const C = useI18nConstants(CONSULTATION_SCREEN);
  const router = useRouter();
  const today = useMemo(() => new Date(), []);

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [slots, setSlots] = useState<ConsultationSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ConsultationSlot | null>(null);
  const [showPickError, setShowPickError] = useState(false);
  const [fee, setFee] = useState(0);
  const [busy, setBusy] = useState(false);

  const currency = useConsultationCurrency();
  const isoDate = toIsoDate(selectedDate);
  const unit = currency === "INR" ? "₹" : "$";

  useEffect(() => {
    ensureConsultationFilter();
    let cancelled = false;
    (async () => {
      try {
        const detail = await fetchAstrologerDetail(astrologerId);
        if (!cancelled) {
          setTitle(consultationAstrologerName(detail.astrologer.user));
          const f = consultationFeeForAstrologer(detail.astrologer, currency);
          setFee(f);
          const langs = detail.astrologer.languages?.join(", ") ?? "";
          setSubTitle([
            `★${detail.astrologer.customer_rating?.toFixed(1) ?? "—"} (${detail.astrologer.review_count ?? 0})`,
            langs,
            `${unit}${f.toLocaleString()} / 30 min`,
          ].filter(Boolean).join(" · "));
        }
      } catch {
        if (!cancelled) setTitle(C.slotsTitle);
      }
    })();
    return () => { cancelled = true; };
  }, [astrologerId, currency]);

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
    return () => { cancelled = true; };
  }, [astrologerId, isoDate]);

  async function onBook() {
    if (!selected || selected.event_booked) {
      setShowPickError(true);
      return;
    }
    setBusy(true);
    try {
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
    } finally {
      setBusy(false);
    }
  }

  const hasSelected = selected && !selected.event_booked;

  return (
    <>
      <div className={CONSULTATION_SLOTS_LAYOUT.page}>
        {/* Header */}
        <header className={CONSULTATION_SLOTS_LAYOUT.pageHeader}>
          <div className={CONSULTATION_SLOTS_LAYOUT.pageHeaderInner}>
            <button
              type="button"
              onClick={() => router.back()}
              className={CONSULTATION_SLOTS_LAYOUT.backBtn}
              aria-label="Back"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className={CONSULTATION_SLOTS_LAYOUT.headerMain}>
              <span className={CONSULTATION_SLOTS_LAYOUT.headerTitle}>
                {title || CS.defaultTitle}
              </span>
              {subTitle ? (
                <span className={CONSULTATION_SLOTS_LAYOUT.headerSub}>{subTitle}</span>
              ) : null}
            </div>
            <div className={CONSULTATION_SLOTS_LAYOUT.stepRow}>
              <span className={CONSULTATION_SLOTS_LAYOUT.stepDone}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                  <path
                    d="M2 5.5L4 7.5L8 3"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {CS.stepAstrologer}
              </span>
              <span className={CONSULTATION_SLOTS_LAYOUT.stepSep} aria-hidden>
                ›
              </span>
              <span className={CONSULTATION_SLOTS_LAYOUT.stepActive}>{CS.stepSchedule}</span>
              <span className={CONSULTATION_SLOTS_LAYOUT.stepSep} aria-hidden>
                ›
              </span>
              <span className={CONSULTATION_SLOTS_LAYOUT.stepIdle}>{CS.stepDetails}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className={CONSULTATION_SLOTS_LAYOUT.scroll}>
          <div className={CONSULTATION_SLOTS_LAYOUT.inner}>
            <ConsultationSlotsDateStrip
              selectedDate={selectedDate}
              today={today}
              onSelectDate={(d) => {
                setSelectedDate(d);
                setShowPickError(false);
              }}
            />
            <ConsultationSlotsTimePicker
              slots={slots}
              loading={loading}
              selected={selected}
              selectedDate={selectedDate}
              onSelect={(slot) => {
                setSelected(slot);
                setShowPickError(false);
              }}
            />
          </div>
        </div>

        {/* Sticky footer */}
        <div className={CONSULTATION_SLOTS_LAYOUT.footer}>
          <div className={CONSULTATION_SLOTS_LAYOUT.footerInner}>
            {hasSelected ? (
              <div className={CONSULTATION_SLOTS_LAYOUT.footerSelection}>
                <div>
                  <p className={CONSULTATION_SLOTS_LAYOUT.footerSelLabel}>{CS.yourSelection}</p>
                  <p className={CONSULTATION_SLOTS_LAYOUT.footerSelValue}>
                    {formatSlotRange(selected.start_datetime, selected.end_datetime)}
                  </p>
                </div>
                <div className={CONSULTATION_SLOTS_LAYOUT.footerTotalWrap}>
                  <p className={CONSULTATION_SLOTS_LAYOUT.footerSelLabel}>{CS.totalInclGst}</p>
                  <p className={CONSULTATION_SLOTS_LAYOUT.footerTotal}>
                    {unit}{(fee * 1.18).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            ) : null}
            {showPickError ? (
              <p className={CONSULTATION_SLOTS_LAYOUT.pickError}>{CS.slotPickError}</p>
            ) : null}
            <button
              type="button"
              disabled={busy}
              className={CONSULTATION_SLOTS_LAYOUT.footerBtn}
              onClick={() => void onBook()}
            >
              {CS.bookCta}
            </button>
          </div>
        </div>
      </div>
      <LoadingOverlay open={busy} />
    </>
  );
}
