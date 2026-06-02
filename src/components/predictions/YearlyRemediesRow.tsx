import { YearlyHorizontalTrack } from "@/components/predictions/YearlyHorizontalTrack";
import { YearlyRemedyCard } from "@/components/predictions/YearlyRemedyCard";
import { YEARLY_REMEDY_ENTRIES } from "@/lib/constants/yearly-prediction-screen";
import type { YearlyRemedies } from "@/types/prediction-yearly";

export function YearlyRemediesRow({ remedies }: { remedies: YearlyRemedies }) {
  return (
    <YearlyHorizontalTrack>
      {YEARLY_REMEDY_ENTRIES.map(({ key, label }) => (
        <YearlyRemedyCard
          key={key}
          field={key}
          label={label}
          description={remedies[key]}
        />
      ))}
    </YearlyHorizontalTrack>
  );
}
