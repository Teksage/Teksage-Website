"use client";

import { useI18nConstants, useT } from "@/hooks/useT";
import { MuhurthaDayRow } from "@/components/muhurtha/MuhurthaDayRow";
import { MuhurthaFeatureHero } from "@/components/muhurtha/MuhurthaFeatureHero";
import { MUHURTHA_LAYOUT, MUHURTHA_SCREEN, ROUTES } from "@/lib/constants";
import { PREDICTION_SHARE_ASSETS } from "@/lib/constants/assets";
import {
  showErrorAppSnackBar,
  showSuccessAppSnackBar,
} from "@/lib/app-snackbar";
import {
  shareMuhurthaResultImage,
} from "@/lib/muhurtha-share";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRef, useState } from "react";
import type { MuhurthaResultsViewProps } from "@/types";

interface MuhurthaResultsViewExtendedProps extends MuhurthaResultsViewProps {
  onAskAstrologer?: () => void;
}

function formatRange(start: string, end: string) {
  const s = new Date(`${start}T12:00:00`);
  const e = new Date(`${end}T12:00:00`);
  const fmt = (d: Date) =>
    d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
  return `${fmt(s)} – ${fmt(e)}`;
}

export function MuhurthaResultsView({ result, onAskAstrologer }: MuhurthaResultsViewExtendedProps) {
  const M = useI18nConstants(MUHURTHA_SCREEN);
  const L = MUHURTHA_LAYOUT;
  const { t } = useT();
  const captureRef = useRef<HTMLDivElement>(null);
  const [sharing, setSharing] = useState(false);
  const rows = result.days?.length ? result.days : result.dates;
  const hasSuitable = rows.some((day) => day.is_suitable);
  const shareCopy = M.share;

  async function handleShare() {
    const element = captureRef.current;
    if (!element || sharing) return;
    setSharing(true);
    try {
      const outcome = await shareMuhurthaResultImage({
        element,
        pageUrl: window.location.href,
      });
      if (outcome === "cancelled") return;
      if (outcome === "sharedNeedsPaste") {
        showSuccessAppSnackBar(shareCopy.shareCaptionPasteHint);
        return;
      }
      if (outcome === "copied") {
        showSuccessAppSnackBar(shareCopy.shareCopied);
        return;
      }
      if (outcome === "downloaded") {
        showSuccessAppSnackBar(shareCopy.shareDownloaded);
        return;
      }
      showSuccessAppSnackBar(shareCopy.shareSuccess);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      showErrorAppSnackBar(shareCopy.shareError);
    } finally {
      setSharing(false);
    }
  }

  if (!rows.length) {
    return (
      <>
        <MuhurthaFeatureHero title={M.headerTitle} />
        <div className={cn(L.featurePageMain, L.featurePageMainResults)}>
          <div className={`${L.resultsHeaderCard} text-center`}>
            <h2 className={L.resultsTitle}>{M.emptyTitle}</h2>
            <p className={`mt-2 ${L.resultsSubtitle}`}>{M.emptyDescription}</p>
            <Link href={ROUTES.eventPlanner} className={cn("mt-5 inline-flex", L.backCta)}>
              {M.backToFormCta}
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <MuhurthaFeatureHero title={M.headerTitle} />
      <div className={cn(L.featurePageMain, L.featurePageMainResults)}>
        <div className={L.resultsRoot}>
          <div className={L.shareCaptureShell}>
            <div ref={captureRef} className={L.shareCaptureRoot}>
              <div className={L.resultsHeaderCard}>
                <div className={L.resultsHeaderCopy}>
                  <h2 className={L.resultsTitle}>
                    {M.resultsTitle} — {t(result.event)}
                  </h2>
                  <div className={L.resultsMetaRow}>
                    <span className={L.metaChip}>
                      {formatRange(result.start_date, result.end_date)}
                    </span>
                    <span className={L.metaChip}>{result.location}</span>
                  </div>
                  {!hasSuitable ? (
                    <p className={L.resultsSubtitle}>{M.emptyDescription}</p>
                  ) : null}
                </div>
              </div>

              <div className={L.tableCard}>
                <div className={L.tableHead}>
                  <span className={L.tableHeadCell}>{M.dateColumn}</span>
                  <span className={L.tableHeadCell}>{M.statusColumn}</span>
                  <span className={L.tableHeadDetails}>{M.detailsColumn}</span>
                </div>
                {rows.map((day) => (
                  <MuhurthaDayRow key={day.iso_date} day={day} />
                ))}
              </div>
            </div>
            <div className={L.resultsHeaderActions}>
              <button
                type="button"
                onClick={() => void handleShare()}
                disabled={sharing}
                aria-label={shareCopy.shareAriaLabel}
                className={L.resultsShareBtn}
              >
                <img
                  src={PREDICTION_SHARE_ASSETS.share}
                  alt=""
                  width={20}
                  height={20}
                  className={L.resultsShareIcon}
                />
              </button>
            </div>
          </div>

          <div className={L.resultsActionsRow}>
            {onAskAstrologer ? (
              <button
                type="button"
                onClick={onAskAstrologer}
                className={cn(L.resultsActionBtnBase, L.resultsActionSecondary)}
              >
                {M.askAstrologerCta}
              </button>
            ) : null}
            <Link
              href={ROUTES.eventPlanner}
              className={cn(L.resultsActionBtnBase, L.resultsActionPrimary)}
            >
              {M.backToFormCta}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
