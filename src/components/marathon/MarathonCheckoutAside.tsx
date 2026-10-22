"use client";

import { useRouter } from "next/navigation";
import { MarathonFlowSummary } from "@/components/marathon/MarathonFlowSummary";
import { useI18nConstants, useT } from "@/hooks/useT";
import { useViewerTimezone } from "@/hooks/useViewerTimezone";
import { bcp47FromAppLocale } from "@/lib/i18n/locale";
import { MARATHON_COPY, MARATHON_PAGE } from "@/lib/constants/marathon";
import { MARATHON_FLOW_COPY } from "@/lib/constants/marathon-flow-copy";
import { MARATHON_FLOW_UI } from "@/lib/constants/marathon-flow-ui";
import { marathonBookingPath } from "@/lib/constants/routes";
import { marathonDateParts, marathonDisplayName, marathonFeeAdded, marathonPaidLabel, marathonSlotMinutes, marathonTimeRange } from "@/lib/marathon-display";
import type { MarathonBooking, MarathonCheckoutStep, MarathonEvent, MarathonSlot } from "@/types/marathon";

export function MarathonCheckoutAside({
  event,
  slot,
  step,
  payFee,
  payCurrency,
  mine,
  error,
  onPay,
}: {
  event: MarathonEvent | null;
  slot?: MarathonSlot;
  step: MarathonCheckoutStep | null;
  payFee: string;
  payCurrency: string;
  mine: MarathonBooking[];
  error: string;
  onPay: () => void;
}) {
  const copy = useI18nConstants(MARATHON_COPY);
  const flow = useI18nConstants(MARATHON_FLOW_COPY);
  const { locale, t } = useT();
  const zone = useViewerTimezone();
  const ui = MARATHON_FLOW_UI;
  const router = useRouter();
  const localeTag = bcp47FromAppLocale(locale);
  const slotWhen = slot ? marathonDateParts(slot.starts_at, zone, localeTag) : null;
  const slotEnd = slot ? marathonDateParts(slot.ends_at, zone, localeTag) : null;
  const minutes = slot ? marathonSlotMinutes(slot.starts_at, slot.ends_at) : 0;
  const parts = payFee ? marathonFeeAdded(payFee, payCurrency) : null;
  const total = parts ? marathonPaidLabel(parts.total.toFixed(2), payCurrency) : "";
  const money = (amount: number) => marathonPaidLabel(amount.toFixed(2), payCurrency);
  const clash = slot
    ? mine.find((row) => new Date(row.starts_at) < new Date(slot.ends_at) && new Date(row.ends_at) > new Date(slot.starts_at))
    : undefined;
  const summaryRows = [
    { label: flow.session, value: event ? marathonDisplayName(event.name) : "" },
    { label: t("Date"), value: slotWhen ? `${slotWhen.weekday}, ${slotWhen.day} ${slotWhen.month}` : "" },
    { label: flow.timeSlot, value: slotWhen && slotEnd ? marathonTimeRange(slotWhen.time, slotEnd.time) : "", accent: true },
    { label: t("Duration"), value: minutes ? flow.minutesShort.replace("{count}", String(minutes)) : copy.minutes },
  ];
  const feeRows = parts
    ? [
        { label: flow.sessionFee, value: money(parts.base) },
        ...(parts.cgstPct > 0
          ? [
              { label: `${t("CGST")} ${parts.cgstPct}%`, value: money(parts.cgst) },
              { label: `${t("SGST")} ${parts.sgstPct}%`, value: money(parts.sgst) },
            ]
          : []),
      ]
    : summaryRows;

  return (
    <MarathonFlowSummary
      kicker={step === 3 ? t("Payment summary") : flow.bookingSummary}
      rows={step === 3 ? feeRows : summaryRows}
      totalLabel={step === 3 ? t("Total") : flow.totalGst}
      total={total}
      lead={step === 3 && slotWhen ? (
        <div className={ui.lead}>
          <div className={ui.dateTile}>
            <span className={ui.dateDay}>{slotWhen.day}</span>
            <span className={ui.dateMonth}>{slotWhen.month.toUpperCase()}</span>
          </div>
          <div className={ui.leadCopy}>
            <p className={ui.leadTitle}>{event ? marathonDisplayName(event.name) : ""}</p>
            <p className={ui.leadMeta}>
              {slotEnd ? marathonTimeRange(slotWhen.time, slotEnd.time) : ""}
              {minutes ? ` · ${flow.minutesShort.replace("{count}", String(minutes))}` : ""}
            </p>
          </div>
        </div>
      ) : null}
    >
      {step === 3 && clash ? <p className={ui.sectionHint}>{t("You already have a consultation at this time.")}</p> : null}
      {step === 3 && error ? <p className={MARATHON_PAGE.bookError}>{error}</p> : null}
      {step === 3 ? <p className={ui.note}>{flow.securePay}</p> : (
        <p className={ui.noteBox}>
          <svg viewBox="0 0 24 24" className={ui.noteIcon} fill="none" aria-hidden>
            <path d="M12 3l7 3v6c0 4.2-2.8 7-7 8.5C7.8 19 5 16.2 5 12V6l7-3z" stroke="currentColor" strokeWidth="1.8" />
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span>{flow.privacy}</span>
        </p>
      )}
      {step === 3 ? (
        <p className={ui.noteBox}>
          <svg viewBox="0 0 24 24" className={ui.noteIcon} fill="none" aria-hidden>
            <path d="M6 7.5A2.5 2.5 0 0 1 8.5 5h7A2.5 2.5 0 0 1 18 7.5v6A2.5 2.5 0 0 1 15.5 16H10l-3.5 3v-3H8.5A2.5 2.5 0 0 1 6 13.5v-6z" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          <span>{flow.whatsappAfter}</span>
        </p>
      ) : null}
      {step === 3 && clash ? (
        <button type="button" className={ui.payBtn} onClick={() => router.push(marathonBookingPath(clash.id))}>
          {copy.viewBooking}
        </button>
      ) : null}
      {step === 3 && !clash ? (
        <button type="button" className={ui.payBtn} onClick={onPay}>{copy.payBar}</button>
      ) : null}
    </MarathonFlowSummary>
  );
}
