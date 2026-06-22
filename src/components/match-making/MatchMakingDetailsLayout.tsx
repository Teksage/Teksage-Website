"use client";

import { useI18nConstants } from "@/hooks/useT";
import Link from "next/link";
import { MatchMakingDetailsFab } from "@/components/match-making/MatchMakingDetailsFab";
import { MatchMakingDetailsHeroCard } from "@/components/match-making/MatchMakingDetailsHeroCard";
import { MatchMakingKutaDetailsList } from "@/components/match-making/MatchMakingKutaDetailsList";
import { MatchMakingKutaTable } from "@/components/match-making/MatchMakingKutaTable";
import { MatchMakingShell } from "@/components/match-making/MatchMakingShell";
import { MATCH_MAKING_ASSETS } from "@/lib/constants/prediction-assets";
import { MATCH_MAKING_SCREEN } from "@/lib/constants/match-making-screen";
import { MATCH_MAKING_LAYOUT } from "@/lib/constants/match-making-layout";
import { PREDICTION_DESKTOP_LAYOUT } from "@/lib/constants/prediction-desktop-layout";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";
import type { MatchMakingDetailsLayoutProps } from "@/types/match-making-ui";

export function MatchMakingDetailsLayout({
  data,
  onBackClick,
  onRegenerate,
  onExpertConnect,
  onDownloadPdf,
  pdfBusy = false,
}: MatchMakingDetailsLayoutProps) {
  const MM = useI18nConstants(MATCH_MAKING_SCREEN);
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

        <header className={MATCH_MAKING_LAYOUT.headerBar}>
          <button
            type="button"
            onClick={onBackClick}
            className={MATCH_MAKING_LAYOUT.backButton}
            aria-label="Go back"
          >
            <img
              src={MATCH_MAKING_ASSETS.appBarBack}
              alt=""
              className="h-5 w-5 brightness-0 invert"
            />
          </button>
          <h1 className={MATCH_MAKING_LAYOUT.headerTitle}>{MM.pageTitle}</h1>
          <span className="size-9" aria-hidden />
        </header>

        <div className={MATCH_MAKING_LAYOUT.detailsContent}>
          <MatchMakingDetailsHeroCard data={data} />
          {kutas.length > 0 ? <MatchMakingKutaTable kutas={kutas} /> : null}
          {kutas.length > 0 ? <MatchMakingKutaDetailsList kutas={kutas} /> : null}
          {data.result.general_details ? (
            <article className="rounded-xl bg-white p-5 text-sm leading-relaxed text-black/80">
              {data.result.general_details}
            </article>
          ) : null}
          <div className={cn("hidden lg:flex", PREDICTION_DESKTOP_LAYOUT.sideBySideCtaRow)}>
            {onDownloadPdf ? (
              <button
                type="button"
                disabled={pdfBusy}
                onClick={onDownloadPdf}
                className="flex flex-1 items-center justify-center gap-2 rounded-[1.25rem] bg-white py-3 text-lg font-semibold text-[var(--color-match-button-text)]"
              >
                {pdfBusy ? "…" : MM.downloadPdfCta}
              </button>
            ) : null}
            <button
              type="button"
              onClick={onRegenerate}
              className="flex flex-1 items-center justify-center gap-2 rounded-[1.25rem] bg-white py-3 text-lg font-semibold text-[var(--color-match-button-text)]"
            >
              <img src={MATCH_MAKING_ASSETS.regenerate} alt="" className="size-5" />
              {MM.regenerateCta}
            </button>
            <Link
              href={ROUTES.consultation}
              onClick={onExpertConnect}
              className="flex flex-1 items-center justify-center gap-2 rounded-[1.25rem] bg-white py-3 text-lg font-semibold text-[var(--color-match-button-text)]"
            >
              <img src={MATCH_MAKING_ASSETS.expert} alt="" className="size-5" />
              {MM.expertConnectCta}
            </Link>
          </div>
        </div>

        <MatchMakingDetailsFab
          onRegenerate={onRegenerate}
          onExpertConnect={onExpertConnect}
          onDownloadPdf={onDownloadPdf}
          pdfBusy={pdfBusy}
        />
      </div>
    </MatchMakingShell>
  );
}
