import type { PartnerDiscountState } from "@/types/partner-referral";

export type PartnerBannerRow = {
  key: string;
  label: string;
  kind: "pct" | "status";
  pct?: number;
  statusLabel?: string;
};

export type PartnerBannerRowCopy = {
  subscriptionLabel: string;
  consultationLabel: string;
  used: string;
  expired: string;
  inactive: string;
};

function rowEligible(status: string, pct: number): boolean {
  return status !== "na" || pct > 0;
}

function resolveStatus(status: string, codeActive: boolean): string {
  if (!codeActive && status === "active") return "revoked";
  return status;
}

/** Home banner rows — always show attributed benefits with status chips. */
export function partnerBannerRows(
  discount: PartnerDiscountState,
  copy: PartnerBannerRowCopy
): PartnerBannerRow[] {
  const codeActive = discount.codeActive !== false;
  const rows: PartnerBannerRow[] = [];

  const push = (key: string, label: string, status: string, pct: number) => {
    if (!rowEligible(status, pct)) return;
    const resolved = resolveStatus(status, codeActive);
    if (resolved === "active" && pct > 0 && discount.daysLeft > 0) {
      rows.push({ key, label, kind: "pct", pct });
      return;
    }
    if (resolved === "consumed") {
      rows.push({ key, label, kind: "status", statusLabel: copy.used });
      return;
    }
    if (resolved === "expired") {
      rows.push({ key, label, kind: "status", statusLabel: copy.expired });
      return;
    }
    if (resolved === "revoked") {
      rows.push({ key, label, kind: "status", statusLabel: copy.inactive });
    }
  };

  push("sub", copy.subscriptionLabel, discount.yearlyStatus, discount.yearlyPct);
  push(
    "consult",
    copy.consultationLabel,
    discount.consultStatus,
    discount.consultPct
  );
  return rows;
}

export function partnerBannerShowTimer(discount: PartnerDiscountState): boolean {
  if (discount.codeActive === false) return false;
  if ((discount.daysLeft ?? 0) <= 0) return false;
  return (
    discount.consultStatus === "active" || discount.yearlyStatus === "active"
  );
}

export function formatPartnerPctOff(pct: number, template: string): string {
  if (pct <= 0) return "";
  return template.replace("{pct}", String(Math.round(pct)));
}
