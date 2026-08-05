"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useLivePartnerDiscount } from "@/hooks/useLivePartnerDiscount";
import { usePartnerDiscountCountdown } from "@/hooks/usePartnerDiscountCountdown";
import {
  PARTNER_REFERRAL_LAYOUT as L,
  PARTNER_REFERRAL_UI,
} from "@/lib/constants/partner-referral";
import { cn } from "@/lib/utils";
import type { PartnerDiscountHomeBannerProps } from "@/types/ui/partner-referral";

function formatPctOff(pct: number, template: string): string | null {
  if (pct <= 0) return null;
  return template.replace("{pct}", String(Math.round(pct)));
}

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

export function PartnerDiscountHomeBanner({
  discount: initialDiscount,
  className,
  variant = "home",
}: PartnerDiscountHomeBannerProps) {
  const copy = useI18nConstants(PARTNER_REFERRAL_UI);
  const discount = useLivePartnerDiscount(initialDiscount);

  if (!discount?.hasDiscount) return null;

  const codeActive = discount.codeActive !== false;
  if (!codeActive) {
    return (
      <aside
        className={cn(L.revokedCard, className)}
        aria-label={copy.revokedTitle}
      >
        <p className={L.revokedTitle}>{copy.revokedTitle}</p>
        <p className={L.revokedBody}>
          {discount.message || copy.revokedBody}
        </p>
      </aside>
    );
  }

  if (!discount.showSubscriptionRow && !discount.showConsultationRow) {
    return null;
  }

  const isSidebar = variant === "sidebar";
  const rows: { key: string; label: string; pct: number }[] = [];
  if (discount.showSubscriptionRow) {
    rows.push({
      key: "sub",
      label: copy.subscriptionLabel,
      pct: discount.yearlyPct,
    });
  }
  if (discount.showConsultationRow) {
    rows.push({
      key: "consult",
      label: copy.consultationLabel,
      pct: discount.consultPct,
    });
  }

  const timer = (
    <PartnerTimerChip
      expiresAt={discount.expiresAt}
      daysLeft={discount.daysLeft}
    />
  );

  if (isSidebar) {
    return (
      <aside
        className={cn(L.sidebarCard, className)}
        aria-label={copy.homeBlockTitle}
      >
        <div
          className={cn(L.sidebarHeader, "flex items-center justify-between gap-2")}
        >
          <p className={L.sidebarTitle}>{copy.homeBlockTitle}</p>
          {timer}
        </div>
        <div className={L.sidebarBody}>
          {rows.map((row) => {
            const pct = formatPctOff(row.pct, copy.pctOff);
            return (
              <div key={row.key} className={L.sidebarRow}>
                <div className="flex items-center justify-between gap-2">
                  <p className={L.sidebarLabel}>{row.label}</p>
                  {pct ? <span className={L.chipPct}>{pct}</span> : null}
                </div>
              </div>
            );
          })}
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
        {rows.map((row) => {
          const pct = formatPctOff(row.pct, copy.pctOff);
          return (
            <div key={row.key} className={L.homeRow}>
              <p className={L.homeLabel}>{row.label}</p>
              {pct ? <span className={L.chipPct}>{pct}</span> : null}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
