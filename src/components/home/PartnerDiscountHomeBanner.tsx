"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useLivePartnerDiscount } from "@/hooks/useLivePartnerDiscount";
import { usePartnerDiscountCountdown } from "@/hooks/usePartnerDiscountCountdown";
import {
  PARTNER_REFERRAL_LAYOUT as L,
  PARTNER_REFERRAL_UI,
} from "@/lib/constants/partner-referral";
import {
  formatPartnerPctOff,
  partnerBannerRows,
  partnerBannerShowTimer,
  type PartnerBannerRow,
} from "@/lib/partner-discount-banner";
import { cn } from "@/lib/utils";
import type { PartnerDiscountHomeBannerProps } from "@/types/ui/partner-referral";

function PartnerTimerChip({
  expiresAt,
  daysLeft,
}: {
  expiresAt?: string;
  daysLeft: number;
}) {
  const copy = useI18nConstants(PARTNER_REFERRAL_UI);
  const { label, parts } = usePartnerDiscountCountdown(expiresAt, daysLeft);
  if (parts.expired) {
    return <span className={L.chipTimerExpired}>{copy.timerExpired}</span>;
  }
  return (
    <span
      className={L.chipDays}
      title={label}
      aria-label={`${label} ${copy.timerLeftSuffix}`}
    >
      {label} {copy.timerLeftSuffix}
    </span>
  );
}

function statusChipClass(
  label: string,
  copy: {
    statusUsed: string;
    statusExpired: string;
    statusInactive: string;
  }
) {
  if (label === copy.statusUsed) return L.chipStatusUsed;
  if (label === copy.statusExpired) return L.chipStatusExpired;
  return L.chipStatusInactive;
}

function BannerRowChip({
  row,
  pctTemplate,
  copy,
}: {
  row: PartnerBannerRow;
  pctTemplate: string;
  copy: {
    statusUsed: string;
    statusExpired: string;
    statusInactive: string;
  };
}) {
  if (row.kind === "pct" && row.pct != null) {
    const pct = formatPartnerPctOff(row.pct, pctTemplate);
    return pct ? <span className={L.chipPct}>{pct}</span> : null;
  }
  if (row.statusLabel) {
    return (
      <span className={statusChipClass(row.statusLabel, copy)}>
        {row.statusLabel}
      </span>
    );
  }
  return null;
}

function HomeBannerRows({
  rows,
  pctTemplate,
  rowClass,
  labelClass,
  copy,
}: {
  rows: PartnerBannerRow[];
  pctTemplate: string;
  rowClass: string;
  labelClass: string;
  copy: {
    statusUsed: string;
    statusExpired: string;
    statusInactive: string;
  };
}) {
  return (
    <>
      {rows.map((row) => (
        <div key={row.key} className={rowClass}>
          <p className={labelClass}>{row.label}</p>
          <BannerRowChip row={row} pctTemplate={pctTemplate} copy={copy} />
        </div>
      ))}
    </>
  );
}

export function PartnerDiscountHomeBanner({
  discount: initialDiscount,
  className,
  variant = "home",
}: PartnerDiscountHomeBannerProps) {
  const copy = useI18nConstants(PARTNER_REFERRAL_UI);
  const discount = useLivePartnerDiscount(initialDiscount);

  if (!discount?.hasDiscount) return null;

  const rows = partnerBannerRows(discount, {
    subscriptionLabel: copy.subscriptionLabel,
    consultationLabel: copy.consultationLabel,
    used: copy.statusUsed,
    expired: copy.statusExpired,
    inactive: copy.statusInactive,
  });
  if (!rows.length) return null;

  const statusCopy = {
    statusUsed: copy.statusUsed,
    statusExpired: copy.statusExpired,
    statusInactive: copy.statusInactive,
  };
  const showTimer = partnerBannerShowTimer(discount);
  const timer = showTimer ? (
    <PartnerTimerChip
      expiresAt={discount.expiresAt}
      daysLeft={discount.daysLeft}
    />
  ) : null;

  if (variant === "sidebar") {
    return (
      <aside
        className={cn(L.sidebarCard, className)}
        aria-label={copy.homeBlockTitle}
      >
        <div
          className={cn(
            L.sidebarHeader,
            "flex items-center justify-between gap-2"
          )}
        >
          <p className={L.sidebarTitle}>{copy.homeBlockTitle}</p>
          {timer}
        </div>
        <div className={L.sidebarBody}>
          {rows.map((row) => (
            <div key={row.key} className={L.sidebarRow}>
              <div className="flex items-center justify-between gap-2">
                <p className={L.sidebarLabel}>{row.label}</p>
                <BannerRowChip row={row} pctTemplate={copy.pctOff} copy={statusCopy} />
              </div>
            </div>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className={cn(L.homeCard, className)} aria-label={copy.homeBlockTitle}>
      <div className={L.homeHeader}>
        <p className={L.homeTitle}>{copy.homeBlockTitle}</p>
        {timer}
      </div>
      <div className={L.homeBody}>
        <HomeBannerRows
          rows={rows}
          pctTemplate={copy.pctOff}
          rowClass={L.homeRow}
          labelClass={L.homeLabel}
          copy={statusCopy}
        />
      </div>
    </aside>
  );
}
