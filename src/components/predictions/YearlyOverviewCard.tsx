import { YEARLY_PREDICTION_ASSETS } from "@/lib/constants/prediction-assets";
import { PREDICTION_DESKTOP_LAYOUT } from "@/lib/constants/prediction-desktop-layout";
import { YEARLY_CARD_UI } from "@/lib/constants/yearly-prediction-card-ui";
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
  const C = YEARLY_CARD_UI;

  return (
    <article
      className={cn(
        C.surface,
        C.surfaceMint,
        PREDICTION_DESKTOP_LAYOUT.horizontalCardWidth
      )}
    >
      <img src={YEARLY_PREDICTION_ASSETS.cardDeco} alt="" className={C.deco} />
      <div className={C.body}>
        <div className={C.headerRow}>
          <h3 className={C.title}>{label}</h3>
          <img src={ICONS[field]} alt="" className={C.icon} />
        </div>
        <p className={C.bodyText}>{description}</p>
      </div>
    </article>
  );
}
