import { YEARLY_PREDICTION_ASSETS } from "@/lib/constants/prediction-assets";
import { PREDICTION_DESKTOP_LAYOUT } from "@/lib/constants/prediction-desktop-layout";
import { YEARLY_CARD_UI } from "@/lib/constants/yearly-prediction-card-ui";
import { cn } from "@/lib/utils";
import type { YearlyRemedies } from "@/types/prediction-yearly";

const ICONS: Record<keyof YearlyRemedies, string> = {
  chanting: YEARLY_PREDICTION_ASSETS.remedies.chanting,
  puja: YEARLY_PREDICTION_ASSETS.remedies.puja,
  charity: YEARLY_PREDICTION_ASSETS.remedies.charity,
};

export function YearlyRemedyCard({
  field,
  label,
  description,
}: {
  field: keyof YearlyRemedies;
  label: string;
  description: string;
}) {
  const C = YEARLY_CARD_UI;

  return (
    <article
      className={cn(
        C.surface,
        C.surfaceWhite,
        PREDICTION_DESKTOP_LAYOUT.horizontalCardWidth
      )}
    >
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
