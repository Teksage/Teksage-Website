"use client";

import { useI18nConstants } from "@/hooks/useT";
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
  const MM = useI18nConstants(MATCH_MAKING_SCREEN);
  const isBoy = variant === "boy";
  const labels = isBoy
    ? {
        name: MM.boyNameLabel,
        icon: MATCH_MAKING_ASSETS.boy,
      }
    : {
        name: MM.girlNameLabel,
        icon: MATCH_MAKING_ASSETS.girl,
      };

  return (
    <div className="flex w-[46%] max-w-[9.5rem] shrink-0 flex-col items-center gap-3 lg:w-[9.5rem]">
      <img src={labels.icon} alt="" className="h-12 w-12" />
      <MatchMakingDashedLine />
      <DetailBlock label={labels.name} value={name} />
      <MatchMakingDashedLine />
      <DetailBlock label={MM.rasiLabel} value={rasi} />
      <MatchMakingDashedLine />
      <DetailBlock label={MM.nakshatraLabel} value={nakshatra} />
    </div>
  );
}
