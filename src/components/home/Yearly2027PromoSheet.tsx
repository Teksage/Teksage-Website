"use client";

import Image from "next/image";
import { Yearly2027SheetScoreGrid } from "@/components/home/Yearly2027SheetScoreGrid";
import { Yearly2027StarIcon } from "@/components/home/Yearly2027StarIcon";
import { useI18nConstants } from "@/hooks/useT";
import { YEARLY_2027_PROMO } from "@/lib/constants/yearly-2027-promo";
import { YEARLY_2027_PROMO_ASSETS } from "@/lib/constants/yearly-2027-promo-ui";
import { YEARLY_2027_SHEET_UI as UI } from "@/lib/constants/yearly-2027-sheet-ui";
import type { Yearly2027PromoSheetProps } from "@/types/yearly-2027-promo";

export function Yearly2027PromoSheet({
  open,
  scores,
  isPremium,
  generating,
  onClose,
  onOpenYearly,
  onUpgrade,
}: Yearly2027PromoSheetProps) {
  const copy = useI18nConstants(YEARLY_2027_PROMO);
  if (!open) return null;

  const primaryAction = isPremium ? onOpenYearly : onUpgrade;
  const primaryLabel = isPremium ? copy.viewFull : copy.upgradeCta;

  return (
    <div className="lg:hidden" role="presentation">
      <button
        type="button"
        className={UI.overlay}
        aria-label={copy.closeAria}
        onClick={onClose}
      />
      <div
        className={UI.panel}
        role="dialog"
        aria-modal
        aria-labelledby="yearly-2027-sheet-title"
      >
        <div className={UI.hero}>
          <Image
            src={YEARLY_2027_PROMO_ASSETS.heroDeco}
            alt=""
            fill
            unoptimized
            priority
            sizes="100vw"
            className={UI.heroArt}
          />
          <div className={UI.heroShade} aria-hidden />
          <div className={UI.handle} />
          <div className={UI.heroTop}>
            <span className={UI.heroBadge}>{copy.sheetHeroBadge}</span>
            <button
              type="button"
              onClick={onClose}
              className={UI.heroClose}
              aria-label={copy.closeAria}
            >
              <svg viewBox="0 0 16 16" className="size-3" aria-hidden fill="none">
                <path
                  d="M4 4l8 8M12 4l-8 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div className={UI.heroWave} aria-hidden />
        </div>

        <div className={UI.body}>
          <h2 id="yearly-2027-sheet-title" className={UI.title}>
            {copy.sheetTitle}
          </h2>
          <p className={UI.subtitle}>
            {generating && !scores ? copy.generating : copy.sheetSubtitle}
          </p>

          {scores ? <Yearly2027SheetScoreGrid scores={scores} /> : null}

          <div className={UI.actions}>
            <button type="button" className={UI.primaryBtn} onClick={primaryAction}>
              <Yearly2027StarIcon className={UI.primaryStar} />
              <span className={UI.primaryRule} aria-hidden />
              <span className={UI.primaryLabel}>{primaryLabel}</span>
              <span className={UI.primaryArrow} aria-hidden>
                →
              </span>
            </button>
            <button type="button" className={UI.ghostBtn} onClick={onClose}>
              {copy.notNow}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
