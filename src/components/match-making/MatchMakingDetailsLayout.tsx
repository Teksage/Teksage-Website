"use client";

import Link from "next/link";
import { MatchMakingDetailsFab } from "@/components/match-making/MatchMakingDetailsFab";
import { MatchMakingDetailsHeroCard } from "@/components/match-making/MatchMakingDetailsHeroCard";
import { MatchMakingKutaDetailsList } from "@/components/match-making/MatchMakingKutaDetailsList";
import { MatchMakingKutaTable } from "@/components/match-making/MatchMakingKutaTable";
import { MatchMakingShell } from "@/components/match-making/MatchMakingShell";
import { MATCH_MAKING_ASSETS } from "@/lib/constants/prediction-assets";
import { MATCH_MAKING_SCREEN } from "@/lib/constants/match-making-screen";
import { ROUTES } from "@/lib/constants/routes";
import type { MatchMakingDetailsLayoutProps } from "@/types/match-making-ui";

export function MatchMakingDetailsLayout({
  data,
  onBackClick,
  onRegenerate,
  onExpertConnect,
}: MatchMakingDetailsLayoutProps) {
  const kutas = data.result.kutas ?? [];

  return (
    <MatchMakingShell>
      <div className="relative min-h-dvh pb-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[15.625rem] overflow-hidden">
          <img
            src={MATCH_MAKING_ASSETS.background}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 match-details-hero-overlay" />
        </div>

        <header className="relative z-20 flex items-center px-3 pt-6">
          <button type="button" onClick={onBackClick} className="p-2" aria-label="Go back">
            <img
              src={MATCH_MAKING_ASSETS.appBarBack}
              alt=""
              className="h-5 w-5 brightness-0 invert"
            />
          </button>
          <h1 className="flex-1 pr-10 text-center text-xl font-bold text-white">
            {MATCH_MAKING_SCREEN.pageTitle}
          </h1>
        </header>

        <div className="relative z-10 space-y-4 px-5 pb-24 pt-4">
          <MatchMakingDetailsHeroCard data={data} />
          {kutas.length > 0 ? <MatchMakingKutaTable kutas={kutas} /> : null}
          {kutas.length > 0 ? <MatchMakingKutaDetailsList kutas={kutas} /> : null}
          {data.result.general_details ? (
            <article className="rounded-xl bg-white p-5 text-sm leading-relaxed text-black/80">
              {data.result.general_details}
            </article>
          ) : null}
          <Link
            href={ROUTES.consultation}
            className="block w-full rounded-[1.25rem] bg-white py-2.5 text-center text-lg font-semibold text-[var(--color-match-button-text)]"
          >
            {MATCH_MAKING_SCREEN.expertConnectCta}
          </Link>
        </div>

        <MatchMakingDetailsFab onRegenerate={onRegenerate} onExpertConnect={onExpertConnect} />
      </div>
    </MatchMakingShell>
  );
}
