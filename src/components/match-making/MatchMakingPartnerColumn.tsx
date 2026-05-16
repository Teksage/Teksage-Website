import { MatchMakingDashedLine } from "@/components/match-making/MatchMakingDashedLine";
import { MATCH_MAKING_ASSETS } from "@/lib/constants/prediction-assets";
import { MATCH_MAKING_SCREEN } from "@/lib/constants/match-making-screen";
import type { MatchMakingPartnerColumnProps } from "@/types/match-making-ui";

function DetailBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full max-w-[9rem] flex-col items-center text-center">
      <span className="text-xs font-medium text-[var(--color-match-button-text)]">{label}</span>
      <span className="mt-0.5 text-base font-medium text-[var(--color-brand-black)]">{value}</span>
    </div>
  );
}

export function MatchMakingPartnerColumn({
  variant,
  name,
  rasi,
  nakshatra,
}: MatchMakingPartnerColumnProps) {
  const isBoy = variant === "boy";
  const labels = isBoy
    ? {
        name: MATCH_MAKING_SCREEN.boyNameLabel,
        icon: MATCH_MAKING_ASSETS.boy,
      }
    : {
        name: MATCH_MAKING_SCREEN.girlNameLabel,
        icon: MATCH_MAKING_ASSETS.girl,
      };

  return (
    <div className="flex flex-1 flex-col items-center gap-3">
      <img src={labels.icon} alt="" className="h-12 w-12" />
      <MatchMakingDashedLine />
      <DetailBlock label={labels.name} value={name} />
      <MatchMakingDashedLine />
      <DetailBlock label={MATCH_MAKING_SCREEN.rasiLabel} value={rasi} />
      <MatchMakingDashedLine />
      <DetailBlock label={MATCH_MAKING_SCREEN.nakshatraLabel} value={nakshatra} />
    </div>
  );
}
