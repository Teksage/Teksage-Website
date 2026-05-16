import { MatchMakingDashedLine } from "@/components/match-making/MatchMakingDashedLine";
import { MATCH_MAKING_ASSETS } from "@/lib/constants/prediction-assets";
import { MATCH_MAKING_SCREEN } from "@/lib/constants/match-making-screen";
import { cn } from "@/lib/utils";
import type { MatchMakingKutaRow } from "@/types/match-making";

function KutaBadge({ present }: { present: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white",
        present ? "bg-[var(--color-brand-primary)]" : "bg-[var(--color-brand-error)]"
      )}
    >
      {present ? MATCH_MAKING_SCREEN.presentBadge : MATCH_MAKING_SCREEN.absentBadge}
      <img
        src={present ? MATCH_MAKING_ASSETS.present : MATCH_MAKING_ASSETS.absent}
        alt=""
        className="size-3.5"
      />
    </span>
  );
}

export function MatchMakingKutaDetailsList({ kutas }: { kutas: MatchMakingKutaRow[] }) {
  return (
    <section className="rounded-2xl bg-white px-4 py-5">
      <ul className="space-y-0">
        {kutas.map((row, index) => {
          const present = Boolean(row.present);
          const titleColor = present
            ? "text-[var(--color-brand-primary)]"
            : "text-[var(--color-brand-error)]";
          return (
            <li key={`${row.kuta}-${index}`}>
              <div className="flex items-start justify-between gap-3">
                <h3 className={cn("text-lg font-bold", titleColor)}>{row.kuta}</h3>
                <KutaBadge present={present} />
              </div>
              {row.details ? (
                <p className="mt-2 text-sm leading-relaxed text-black/80">{row.details}</p>
              ) : null}
              {index < kutas.length - 1 ? (
                <MatchMakingDashedLine className="my-5 border-black/20" />
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
