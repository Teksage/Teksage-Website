"use client";

import type { ReactNode } from "react";
import { MARATHON_FLOW_UI } from "@/lib/constants/marathon-flow-ui";

export function MarathonFlowSummary({
  kicker,
  rows,
  totalLabel,
  total,
  lead,
  children,
}: {
  kicker: string;
  rows: { label: string; value: string; accent?: boolean }[];
  totalLabel: string;
  total: string;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  const ui = MARATHON_FLOW_UI;
  return (
    <aside className={ui.aside}>
      <p className={ui.kicker}>{kicker}</p>
      {lead}
      <div className={ui.summaryList}>
        {rows.map((row) => (
          <div key={row.label} className={ui.summaryRow}>
            <span className={ui.summaryLabel}>{row.label}</span>
            <span className={row.accent ? ui.summaryValueGreen : ui.summaryValue}>{row.value}</span>
          </div>
        ))}
      </div>
      <div className={ui.totalRow}>
        <span className={ui.totalLabel}>{totalLabel}</span>
        <span className={ui.total}>{total}</span>
      </div>
      {children}
    </aside>
  );
}
