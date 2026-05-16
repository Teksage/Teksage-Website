import { PredictionBalaSplit } from "@/components/predictions/PredictionBalaSplit";
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
  const badgeColor = data.isPositiveDay
    ? "text-[var(--color-weekly-badge-positive)]"
    : "text-[var(--color-brand-error)]";

  return (
    <article ref={cardRef} className="overflow-hidden rounded-[1.25rem] bg-white shadow-sm">
      <div className="flex h-[50px] items-center justify-between rounded-t-[1.25rem] bg-[var(--color-weekly-card-header)] px-5">
        <h2 className="text-lg font-semibold text-white">{day}</h2>
        <span className={cn("rounded-full bg-white px-2.5 py-1 text-xs font-bold", badgeColor)}>
          {data.shortPrediction}
        </span>
      </div>
      <p className="px-5 py-5 text-base text-black/70">{data.longPrediction}</p>
      <PredictionBalaSplit
        tharaBala={data.tharaBala != null ? String(data.tharaBala) : undefined}
        chandraBala={data.chandraBala != null ? String(data.chandraBala) : undefined}
      />
    </article>
  );
}
