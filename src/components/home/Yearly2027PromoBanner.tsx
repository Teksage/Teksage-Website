"use client";

import Image from "next/image";
import { Yearly2027MiniStars } from "@/components/home/Yearly2027MiniStars";
import { Yearly2027StarIcon } from "@/components/home/Yearly2027StarIcon";
import { useI18nConstants } from "@/hooks/useT";
import { YEARLY_2027_PROMO, YEARLY_2027_SCORE_ORDER } from "@/lib/constants/yearly-2027-promo";
import {
  YEARLY_2027_PROMO_ASSETS,
  YEARLY_2027_PROMO_UI as UI,
} from "@/lib/constants/yearly-2027-promo-ui";
import { cn } from "@/lib/utils";
import type { Yearly2027PromoBannerProps } from "@/types/yearly-2027-promo";

const PANEL_LABEL = {
  career: "career",
  relationship: "relationship",
  finance: "finance",
  health: "health",
} as const;

/** HD yearly promo banner — live copy + category scores from Yearly Prediction. */
export function Yearly2027PromoBanner({
  scores,
  isPremium,
  generating,
  onClose,
  onOpenYearly,
  onUpgrade,
  className,
}: Yearly2027PromoBannerProps) {
  const copy = useI18nConstants(YEARLY_2027_PROMO);
  const primaryAction = isPremium ? onOpenYearly : onUpgrade;
  const primaryLabel = isPremium ? copy.viewFull : copy.upgradeCta;
  const hasScores = Boolean(scores);
  const panelTitle = hasScores ? copy.yourScores : copy.quickAccess;

  return (
    <aside className={cn(UI.bannerShell, className)} aria-label={copy.bannerTitle}>
      <div className={UI.bannerArt} aria-hidden>
        <Image
          src={YEARLY_2027_PROMO_ASSETS.heroDeco}
          alt=""
          fill
          unoptimized
          priority
          sizes="220px"
          className={UI.bannerArtImg}
        />
      </div>

      <div className={UI.bannerInner}>
        <div className={UI.bannerMain}>
          <span className={UI.bannerSparkles} aria-hidden>
            <span className={cn(UI.bannerSparkle, "text-[0.55rem]")}>✦</span>
            <span className={cn(UI.bannerSparkle, "text-[0.7rem]")}>✧</span>
            <span className={cn(UI.bannerSparkle, "text-[0.5rem]")}>✦</span>
          </span>
          <div className={UI.bannerCopy}>
            <span className={UI.bannerEyebrow}>
              <Yearly2027StarIcon className={UI.bannerEyebrowStar} />
              {copy.bannerEyebrow}
              <span className={UI.newBadge}>{copy.newBadge}</span>
            </span>
            <h2 className={UI.bannerTitle}>{copy.bannerTitle}</h2>
            <p className={UI.bannerSubtitle}>
              {generating ? copy.generating : copy.bannerSubtitle}
            </p>
            <div className={UI.bannerActions}>
              <button type="button" className={UI.primaryBtn} onClick={primaryAction}>
                {primaryLabel}
                <span className={UI.primaryBtnArrow} aria-hidden>
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className={UI.panel}>
          <div className={UI.panelHeader}>
            <p className={UI.panelTitle}>{panelTitle}</p>
            <button
              type="button"
              onClick={onClose}
              className={UI.panelClose}
              aria-label={copy.closeAria}
            >
              <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden fill="none">
                <path
                  d="M4 4l8 8M12 4l-8 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div className={UI.panelGrid}>
            {YEARLY_2027_SCORE_ORDER.map((key) => (
              <div key={key} className={UI.panelCard}>
                <p className={UI.panelLabel}>{copy[PANEL_LABEL[key]]}</p>
                {scores ? <Yearly2027MiniStars score={scores[key]} /> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
