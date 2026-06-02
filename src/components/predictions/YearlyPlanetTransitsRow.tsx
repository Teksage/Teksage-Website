import { YearlyHorizontalTrack } from "@/components/predictions/YearlyHorizontalTrack";
import { YearlyPlanetCard } from "@/components/predictions/YearlyPlanetCard";
import {
  YEARLY_PLANET_KEYS,
  YEARLY_PLANET_LABELS,
} from "@/lib/constants/yearly-prediction-screen";
import type { YearlyPlanetTransits } from "@/types/prediction-yearly";

export function YearlyPlanetTransitsRow({ transits }: { transits: YearlyPlanetTransits }) {
  return (
    <YearlyHorizontalTrack>
      {YEARLY_PLANET_KEYS.map((key) => (
        <YearlyPlanetCard
          key={key}
          planetKey={key}
          label={YEARLY_PLANET_LABELS[key]}
          details={transits[key]}
        />
      ))}
    </YearlyHorizontalTrack>
  );
}
