"use client";

import { useState } from "react";
import Image from "next/image";
import { useI18nConstants } from "@/hooks/useT";
import { useLivePartnerDiscount } from "@/hooks/useLivePartnerDiscount";
import { usePartnerDiscountCountdown } from "@/hooks/usePartnerDiscountCountdown";
import { CHAT_LANDING_UI } from "@/lib/constants/chat-landing-ui";
import { DASHBOARD_ASSETS } from "@/lib/constants/assets";
import { HOME_EMBED_HEADER_UI } from "@/lib/constants/home-embed-header-ui";
import {
  PARTNER_REFERRAL_LAYOUT as L,
  PARTNER_REFERRAL_UI,
} from "@/lib/constants/partner-referral";
import type { HomeReferralTopBarPillProps } from "@/types/ui/partner-referral";
import type { PartnerBannerRow } from "@/lib/partner-discount-banner";
import {
  formatPartnerPctOff,
  partnerBannerRows,
  partnerBannerShowTimer,
} from "@/lib/partner-discount-banner";
import { cn } from "@/lib/utils";

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

function HoverRowChip({
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

export function HomeReferralTopBarPill({
  discount: initialDiscount,
  className,
}: HomeReferralTopBarPillProps) {
  const landingCopy = useI18nConstants(CHAT_LANDING_UI);
  const copy = useI18nConstants(PARTNER_REFERRAL_UI);
  const discount = useLivePartnerDiscount(initialDiscount);
  const [hoverOpen, setHoverOpen] = useState(false);
  const showTimer =
    Boolean(discount?.hasDiscount) &&
    discount != null &&
    partnerBannerShowTimer(discount);
  const { label, parts } = usePartnerDiscountCountdown(
    discount?.expiresAt,
    discount?.daysLeft ?? 0
  );

  const rows = discount?.hasDiscount
    ? partnerBannerRows(discount, {
        subscriptionLabel: copy.subscriptionLabel,
        consultationLabel: copy.consultationLabel,
        used: copy.statusUsed,
        expired: copy.statusExpired,
        inactive: copy.statusInactive,
      })
    : [];

  const statusCopy = {
    statusUsed: copy.statusUsed,
    statusExpired: copy.statusExpired,
    statusInactive: copy.statusInactive,
  };

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setHoverOpen(true)}
      onMouseLeave={() => setHoverOpen(false)}
      onFocus={() => setHoverOpen(true)}
      onBlur={() => setHoverOpen(false)}
    >
      <div
        className={L.topBarPill}
        role="status"
        aria-label={landingCopy.referralRewards}
        aria-expanded={hoverOpen && rows.length > 0}
      >
        <Image
          src={HOME_EMBED_HEADER_UI.referralIcon}
          alt=""
          width={16}
          height={16}
          unoptimized
          className="size-4"
        />
        <span className={L.topBarTitle}>{landingCopy.referralRewards}</span>
        {showTimer && !parts.expired ? (
          <span className={L.topBarTimer} title={label} aria-label={label}>
            <Image
              src={DASHBOARD_ASSETS.headerTimer}
              alt=""
              width={12}
              height={12}
              unoptimized
              className="size-3"
            />
            {label}
          </span>
        ) : parts.expired && discount?.hasDiscount ? (
          <span className={L.chipTimerExpired}>{copy.timerExpired}</span>
        ) : null}
      </div>

      {hoverOpen && rows.length > 0 ? (
        <div className={L.topBarPopover} role="tooltip">
          <p className={L.topBarPopoverTitle}>{copy.homeBlockTitle}</p>
          {rows.map((row) => (
            <div key={row.key} className={L.topBarPopoverRow}>
              <p className={L.topBarPopoverLabel}>{row.label}</p>
              <HoverRowChip
                row={row}
                pctTemplate={copy.pctOff}
                copy={statusCopy}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
