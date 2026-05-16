import { YEARLY_PREDICTION_ASSETS } from "@/lib/constants/prediction-assets";
import { PREDICTION_DESKTOP_LAYOUT } from "@/lib/constants/prediction-desktop-layout";
import { cn } from "@/lib/utils";
import type { YearlyCategorizedPrediction } from "@/types/prediction-yearly";

const ICONS: Record<keyof YearlyCategorizedPrediction, string> = {
  career: YEARLY_PREDICTION_ASSETS.overview.career,
  finance: YEARLY_PREDICTION_ASSETS.overview.finance,
  health: YEARLY_PREDICTION_ASSETS.overview.health,
  relationship: YEARLY_PREDICTION_ASSETS.overview.relationship,
};

export function YearlyOverviewCard({
  field,
  label,
  description,
}: {
  field: keyof YearlyCategorizedPrediction;
  label: string;
  description: string;
}) {
  return (
    <article
      className={cn(
        "flex shrink-0 flex-col items-center rounded-[1.125rem] bg-[var(--color-yearly-card-bg)] px-6 py-8 text-center",
        PREDICTION_DESKTOP_LAYOUT.horizontalCardWidth
      )}
    >
      <img src={ICONS[field]} alt="" className="h-14 w-14" />
      <h3 className="mt-5 text-[1.375rem] font-bold leading-tight text-[var(--color-brand-black)]">
        {label}
      </h3>
      <p className="mt-2 text-base leading-snug text-black/80">{description}</p>
    </article>
  );
}
