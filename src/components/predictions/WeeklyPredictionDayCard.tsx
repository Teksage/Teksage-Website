import { PredictionBalaSplit } from "@/components/predictions/PredictionBalaSplit";
import { predictionDayStatusTextClass } from "@/lib/prediction-day-status";
import { WEEKLY_PREDICTION_CARD_UI } from "@/lib/constants/weekly-prediction-card-ui";
import type { WeeklyDayPrediction } from "@/types/prediction-detail";
import { cn } from "@/lib/utils";

export function WeeklyPredictionDayCard({
  day,
  data,
  cardRef,
}: {
  day: string;
  data: WeeklyDayPrediction;
  cardRef?: (el: HTMLElement | null) => void;
}) {
  const isPositiveDay = data.isPositiveDay ?? false;

  return (
    <article ref={cardRef} className={WEEKLY_PREDICTION_CARD_UI.article}>
      <div className={WEEKLY_PREDICTION_CARD_UI.header}>
        <h2 className={WEEKLY_PREDICTION_CARD_UI.dayTitle}>{day}</h2>
        <span
          className={cn(
            WEEKLY_PREDICTION_CARD_UI.badge,
            predictionDayStatusTextClass(isPositiveDay)
          )}
        >
          {data.shortPrediction}
        </span>
      </div>
      <p className={WEEKLY_PREDICTION_CARD_UI.bodyText}>{data.longPrediction}</p>
      <PredictionBalaSplit
        tharaBala={data.tharaBala != null ? String(data.tharaBala) : undefined}
        chandraBala={data.chandraBala != null ? String(data.chandraBala) : undefined}
      />
    </article>
  );
}
