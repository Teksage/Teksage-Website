"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { ConsultationSlotsDateStrip } from "@/components/consultation/ConsultationSlotsDateStrip";
import { ConsultationSlotsProfileHeader } from "@/components/consultation/ConsultationSlotsProfileHeader";
import { ConsultationSlotsStepIndicator } from "@/components/consultation/ConsultationSlotsStepIndicator";
import { ConsultationSlotsTimePicker } from "@/components/consultation/ConsultationSlotsTimePicker";
import {
  CONSULTATION_SLOTS_LAYOUT,
  CONSULTATION_SLOTS_PREFETCH_DAY_COUNT,
  CONSULTATION_SLOTS_SCREEN,
} from "@/lib/constants/consultation-slots";
import {
  formatSlotTime12,
  toIsoDate,
} from "@/lib/consultation-calendar";
import {
  buildUpcomingDays,
  fetchDaySlotSummariesByDate,
  maxDateWindowOffset,
  summarizeDaySlots,
  windowOffsetForDate,
} from "@/lib/consultation-slots-counts";
import { consultationFeeForAstrologer } from "@/lib/consultation-currency";
import { useConsultationCurrency } from "@/hooks/useConsultationCurrency";
import {
  consultationAstrologerInitials,
  consultationAstrologerName,
} from "@/lib/consultation-display";
import { ensureConsultationFilter } from "@/lib/consultation-default-filter";
import {
  readConsultationDraft,
  readConsultationFilter,
  writeConsultationDraft,
} from "@/lib/consultation-session";
import { fetchAstrologerDetail, fetchAstrologerSlots } from "@/lib/services/consultation";
import { consultationCheckoutPath } from "@/lib/constants/consultation-routes";
import type {
  ConsultationAstrologer,
  ConsultationDaySlotSummary,
  ConsultationSlot,
} from "@/types/consultation";

type Props = { astrologerId: number };

function draftSlotForAstrologer(astrologerId: number): {
  start: string;
  end: string;
  date: Date;
} | null {
  const draft = readConsultationDraft();
  if (
    !draft?.slotStart ||
    !draft.slotEnd ||
    draft.astrologerId !== astrologerId
  ) {
    return null;
  }
  const date = new Date(draft.slotStart);
  if (Number.isNaN(date.getTime())) return null;
  return { start: draft.slotStart, end: draft.slotEnd, date };
}

function matchDraftSlot(
  list: ConsultationSlot[],
  draft: { start: string; end: string } | null
): ConsultationSlot | null {
  if (!draft) return null;
  return (
    list.find(
      (s) =>
        !s.event_booked &&
        s.start_datetime === draft.start &&
        s.end_datetime === draft.end
    ) ?? null
  );
}

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
  const router = useRouter();
  const today = useMemo(() => new Date(), []);

  const [astrologer, setAstrologer] = useState<ConsultationAstrologer | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    return draftSlotForAstrologer(astrologerId)?.date ?? new Date();
  });
  const [windowOffset, setWindowOffset] = useState(() => {
    const initialDate = draftSlotForAstrologer(astrologerId)?.date ?? new Date();
    return windowOffsetForDate(new Date(), initialDate);
  });
  const [slots, setSlots] = useState<ConsultationSlot[]>([]);
  const [slotSummariesByDate, setSlotSummariesByDate] = useState<
    Record<string, ConsultationDaySlotSummary>
  >({});
  const [countsLoading, setCountsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ConsultationSlot | null>(null);
  const [showPickError, setShowPickError] = useState(false);
  const [busy, setBusy] = useState(false);

  const currency = useConsultationCurrency();
  const isoDate = toIsoDate(selectedDate);
  const unit = currency === "INR" ? "₹" : "$";
  const fee = astrologer ? consultationFeeForAstrologer(astrologer, currency) : 0;
  const name = astrologer
    ? consultationAstrologerName(astrologer.user)
    : CS.defaultTitle;
  const initials = consultationAstrologerInitials(astrologer?.user);
  const feeLabel = `${unit}${fee.toLocaleString()} ${CS.perSessionSuffix}`;

  useEffect(() => {
    ensureConsultationFilter();
    let cancelled = false;
    const days = buildUpcomingDays(today, CONSULTATION_SLOTS_PREFETCH_DAY_COUNT);
    setCountsLoading(true);
    (async () => {
      try {
        const [detail, summaries] = await Promise.all([
          fetchAstrologerDetail(astrologerId),
          fetchDaySlotSummariesByDate(astrologerId, days),
        ]);
        if (!cancelled) {
          setAstrologer(detail.astrologer);
          setSlotSummariesByDate(summaries);
        }
      } catch {
        if (!cancelled) setAstrologer(null);
      } finally {
        if (!cancelled) setCountsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [astrologerId, today]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const list = await fetchAstrologerSlots(astrologerId, isoDate);
        if (!cancelled) {
          setSlots(list);
          setSelected(matchDraftSlot(list, draftSlotForAstrologer(astrologerId)));
          setSlotSummariesByDate((prev) => ({
            ...prev,
            [isoDate]: summarizeDaySlots(list),
          }));
        }
      } catch {
        if (!cancelled) {
          setSlots([]);
          setSelected(null);
        }
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
    setBusy(true);
    try {
      const filter = readConsultationFilter();
      if (!filter || !astrologer) return;
      writeConsultationDraft({
        ...filter,
        astrologerId,
        astrologerName: name,
        astrologerPicture: astrologer.picture,
        currency,
        fee: consultationFeeForAstrologer(astrologer, currency),
        slotStart: selected.start_datetime,
        slotEnd: selected.end_datetime,
      });
      router.push(consultationCheckoutPath(astrologerId));
    } finally {
      setBusy(false);
    }
  }

  const hasSelected = selected && !selected.event_booked;
  const maxWindowOffset = maxDateWindowOffset();
  const canWindowPrev = windowOffset > 0;
  const canWindowNext = windowOffset < maxWindowOffset;

  function shiftWindow(direction: -1 | 1) {
    setWindowOffset((offset) => {
      const next = offset + direction;
      return Math.min(Math.max(0, next), maxWindowOffset);
    });
  }

  return (
    <>
      <div className={CONSULTATION_SLOTS_LAYOUT.page}>
        <header className={CONSULTATION_SLOTS_LAYOUT.pageHeader}>
          <div className={CONSULTATION_SLOTS_LAYOUT.pageHeaderInner}>
            <button
              type="button"
              onClick={() => router.back()}
              className={CONSULTATION_SLOTS_LAYOUT.backBtn}
              aria-label="Back"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <ConsultationSlotsProfileHeader
              name={name}
              initials={initials}
              picture={astrologer?.picture}
              rating={astrologer?.customer_rating}
              reviewCount={astrologer?.review_count}
              languages={astrologer?.languages ?? []}
              feeLabel={feeLabel}
            />
            <ConsultationSlotsStepIndicator />
          </div>
        </header>

        <div className={CONSULTATION_SLOTS_LAYOUT.scroll}>
          <div className={CONSULTATION_SLOTS_LAYOUT.inner}>
            <div className={CONSULTATION_SLOTS_LAYOUT.contentColumn}>
              <ConsultationSlotsDateStrip
                selectedDate={selectedDate}
                today={today}
                windowOffset={windowOffset}
                canWindowPrev={canWindowPrev}
                canWindowNext={canWindowNext}
                slotSummariesByDate={slotSummariesByDate}
                countsLoading={countsLoading}
                onSelectDate={(d) => {
                  setSelectedDate(d);
                  setShowPickError(false);
                }}
                onWindowPrev={() => shiftWindow(-1)}
                onWindowNext={() => shiftWindow(1)}
              />
              <ConsultationSlotsTimePicker
                slots={slots}
                loading={loading}
                selected={selected}
                selectedDate={selectedDate}
                onSelect={(slot) => {
                  setSelected(slot);
                  setShowPickError(false);
                  writeConsultationDraft({
                    astrologerId,
                    slotStart: slot.start_datetime,
                    slotEnd: slot.end_datetime,
                  });
                }}
              />
            </div>
          </div>
        </div>

        <div className={CONSULTATION_SLOTS_LAYOUT.footer}>
          <div className={CONSULTATION_SLOTS_LAYOUT.footerInner}>
            <div className={CONSULTATION_SLOTS_LAYOUT.footerRow}>
              {hasSelected ? (
                <div className={CONSULTATION_SLOTS_LAYOUT.footerSelection}>
                  <div className={CONSULTATION_SLOTS_LAYOUT.footerSelBlock}>
                    <p className={CONSULTATION_SLOTS_LAYOUT.footerSelLabel}>
                      {CS.yourSelection}
                    </p>
                    <p className={CONSULTATION_SLOTS_LAYOUT.footerSelValue}>
                      {formatSlotRange(selected.start_datetime, selected.end_datetime)}
                    </p>
                  </div>
                  <div className={CONSULTATION_SLOTS_LAYOUT.footerTotalWrap}>
                    <p className={CONSULTATION_SLOTS_LAYOUT.footerSelLabel}>
                      {CS.totalInclGst}
                    </p>
                    <p className={CONSULTATION_SLOTS_LAYOUT.footerTotal}>
                      {unit}
                      {(fee * 1.18).toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                </div>
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
            {showPickError ? (
              <p className={CONSULTATION_SLOTS_LAYOUT.pickError}>{CS.slotPickError}</p>
            ) : null}
          </div>
        </div>
      </div>
      <LoadingOverlay open={busy} />
    </>
  );
}
