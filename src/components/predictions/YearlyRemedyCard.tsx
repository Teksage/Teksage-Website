import { YEARLY_PREDICTION_ASSETS } from "@/lib/constants/prediction-assets";
import { YEARLY_LAYOUT } from "@/lib/constants/yearly-prediction-screen";
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
  return (
    <article
      className="flex shrink-0 flex-col items-center rounded-[1.125rem] bg-white px-6 py-8 text-center"
      style={{ width: YEARLY_LAYOUT.horizontalCardWidth }}
    >
      <img src={ICONS[field]} alt="" className="h-12 w-12" />
      <img
        src={YEARLY_PREDICTION_ASSETS.remedyDecoLine}
        alt=""
        className="mt-2 h-2 w-24"
      />
      <h3 className="mt-2 text-[1.375rem] font-bold leading-tight text-[var(--color-brand-black)]">
        {label}
      </h3>
      <p className="mt-2 text-base leading-snug text-black/80">{description}</p>
    </article>
  );
}
