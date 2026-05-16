import { YearlyHorizontalTrack } from "@/components/predictions/YearlyHorizontalTrack";
import { YearlyOverviewCard } from "@/components/predictions/YearlyOverviewCard";
import { YEARLY_OVERVIEW_ENTRIES } from "@/lib/constants/yearly-prediction-screen";
import type { YearlyCategorizedPrediction } from "@/types/prediction-yearly";

export function YearlyCategorizedRow({ prediction }: { prediction: YearlyCategorizedPrediction }) {
  return (
    <YearlyHorizontalTrack>
      {YEARLY_OVERVIEW_ENTRIES.map(({ key, label }) => (
        <YearlyOverviewCard
          key={key}
          field={key}
          label={label}
          description={prediction[key]}
        />
      ))}
    </YearlyHorizontalTrack>
  );
}
