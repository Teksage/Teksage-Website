import { MatchMakingDashedLine } from "@/components/match-making/MatchMakingDashedLine";
import { MatchMakingPartnerColumn } from "@/components/match-making/MatchMakingPartnerColumn";
import { MATCH_MAKING_ASSETS } from "@/lib/constants/prediction-assets";
import { MATCH_MAKING_SCREEN } from "@/lib/constants/match-making-screen";
import type { MatchMakingExisting } from "@/types/match-making";

export function MatchMakingDetailsHeroCard({ data }: { data: MatchMakingExisting }) {
  const gained = data.result.gained ?? 0;
  const maxScore = data.result.max_score ?? 40;

  return (
    <article className="relative overflow-hidden rounded-[1.25rem] border-[5px] border-white/40 bg-[var(--color-match-head)] pb-5">
      <img
        src={MATCH_MAKING_ASSETS.matchTopDeco}
        alt=""
        className="pointer-events-none absolute left-1/2 top-0 w-[min(12rem,42%)] -translate-x-1/2"
      />
      <img
        src={MATCH_MAKING_ASSETS.bigRing}
        alt=""
        className="match-ring-pulse pointer-events-none absolute left-1/2 top-2 w-[min(4.5rem,24%)] max-w-[4.5rem] -translate-x-1/2"
      />
      <div className="relative z-10 px-4 pt-20 lg:px-6">
        <div className="mx-auto flex w-full max-w-[22rem] justify-between gap-4 sm:max-w-md lg:max-w-lg lg:justify-center lg:gap-14">
          <MatchMakingPartnerColumn
            variant="boy"
            name={data.boyName}
            rasi={data.boyRashi}
            nakshatra={data.boyNakshatra}
          />
          <MatchMakingPartnerColumn
            variant="girl"
            name={data.girlName}
            rasi={data.girlRashi}
            nakshatra={data.girlNakshatra}
          />
        </div>
        <MatchMakingDashedLine className="mx-auto my-4 max-w-md" />
        <p className="text-center text-[clamp(1.75rem,6vw,2.25rem)] font-semibold text-[var(--color-brand-black)]">
          {gained}/{maxScore}
        </p>
        <p className="mt-1 text-center text-base font-medium text-[var(--color-match-button-text)]">
          {MATCH_MAKING_SCREEN.totalCompatibilityScore}
        </p>
      </div>
    </article>
  );
}
