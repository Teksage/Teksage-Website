"use client";

import { useI18nConstants } from "@/hooks/useT";
import { DAILY_PREDICTION_ASSETS } from "@/lib/constants";
import { DAILY_PREDICTION_BALA_UI } from "@/lib/constants/daily-prediction-bala-ui";
import { PREDICTION_DETAIL_SCREEN } from "@/lib/constants/prediction-detail-screen";
import { HOME_DASHBOARD } from "@/lib/constants/home-dashboard";
import { predictionDayStatusTextClass } from "@/lib/prediction-day-status";
import { cn } from "@/lib/utils";

function BalaDivider() {
  return (
    <div className={DAILY_PREDICTION_BALA_UI.dividerWrap} aria-hidden>
      <img
        src={DAILY_PREDICTION_ASSETS.balaDivider}
        alt=""
        width={2}
        height={48}
        className={DAILY_PREDICTION_BALA_UI.dividerImg}
      />
    </div>
  );
}

export function DailyPredictionBalaPanel({
  tharaBala,
  chandraBala,
  cautious,
  cautiousIsPositiveDay = false,
}: {
  tharaBala?: string;
  chandraBala?: string;
  cautious?: string;
  cautiousIsPositiveDay?: boolean;
}) {
  const HD = useI18nConstants(HOME_DASHBOARD);
  const PD = useI18nConstants(PREDICTION_DETAIL_SCREEN);
  const isChandra8 = chandraBala === "8";

  return (
    <div className={DAILY_PREDICTION_BALA_UI.panel}>
      <div className={DAILY_PREDICTION_BALA_UI.row}>
        <div className={DAILY_PREDICTION_BALA_UI.column}>
          <p className={DAILY_PREDICTION_BALA_UI.valueNumber}>
            {tharaBala ?? "—"}
          </p>
          <p className={DAILY_PREDICTION_BALA_UI.label}>{HD.tharaBala}</p>
        </div>

        <BalaDivider />

        <div className={DAILY_PREDICTION_BALA_UI.column}>
          {isChandra8 ? (
            <span className={DAILY_PREDICTION_BALA_UI.chandrashtamaBadge}>
              {PD.chandrashtamaLabel}
            </span>
          ) : null}
          <p
            className={cn(
              DAILY_PREDICTION_BALA_UI.valueNumber,
              isChandra8 && "text-[var(--color-daily-chandrashtama)]"
            )}
          >
            {chandraBala ?? "—"}
          </p>
          <p className={DAILY_PREDICTION_BALA_UI.label}>{HD.chandraBala}</p>
        </div>

        <BalaDivider />

        <div className={DAILY_PREDICTION_BALA_UI.column}>
          <p
            className={cn(
              DAILY_PREDICTION_BALA_UI.valueText,
              cautious && predictionDayStatusTextClass(cautiousIsPositiveDay)
            )}
          >
            {cautious ?? "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
