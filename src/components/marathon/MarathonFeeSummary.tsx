"use client";

import { useT } from "@/hooks/useT";
import { MARATHON_CHECKOUT } from "@/lib/constants/marathon-checkout";
import { MARATHON_SUCCESS } from "@/lib/constants/marathon-success";
import { marathonFeeAdded, marathonFeeIncluded, marathonPaidLabel } from "@/lib/marathon-display";
import type { MarathonFeeSummaryProps } from "@/types/marathon";

export function MarathonFeeSummary({ fee, currency, paid }: MarathonFeeSummaryProps) {
  const { t } = useT();
  const parts = paid ? marathonFeeIncluded(fee, currency) : marathonFeeAdded(fee, currency);
  const money = (amount: number) => marathonPaidLabel(amount.toFixed(2), currency);
  const lines = [
    { key: "fee", label: t("Consultation fee"), value: money(parts.base) },
    ...(parts.cgstPct > 0
      ? [
          { key: "cgst", label: `${t("CGST")} (${parts.cgstPct}%)`, value: money(parts.cgst) },
          { key: "sgst", label: `${t("SGST")} (${parts.sgstPct}%)`, value: money(parts.sgst) },
        ]
      : []),
    { key: "total", label: t("Total"), value: money(parts.total) },
  ];

  if (paid) {
    return (
      <>
        {lines.map((line) => (
          <div key={line.key} className={MARATHON_SUCCESS.row}>
            <span className={MARATHON_SUCCESS.label}>{line.label}</span>
            <span className={MARATHON_SUCCESS.value}>{line.value}</span>
          </div>
        ))}
      </>
    );
  }

  const ui = MARATHON_CHECKOUT;
  const last = lines[lines.length - 1];
  return (
    <div className={ui.summary}>
      <p className={ui.summaryTitle}>{t("Payment summary")}</p>
      {lines.slice(0, -1).map((line) => (
        <div key={line.key} className={ui.summaryRow}>
          <span className={ui.summaryLabel}>{line.label}</span>
          <span className={ui.summaryValue}>{line.value}</span>
        </div>
      ))}
      <div className={ui.summaryRule} />
      <div className={ui.summaryRow}>
        <span className={ui.summaryTotal}>{last.label}</span>
        <span className={ui.summaryTotal}>{last.value}</span>
      </div>
    </div>
  );
}
