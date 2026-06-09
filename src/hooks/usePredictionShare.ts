"use client";

import { useCallback, useRef, useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import { DOWNLOAD_FILENAMES } from "@/lib/constants/downloads";
import { PREDICTION_SHARE_SCREEN } from "@/lib/constants/prediction-share";
import {
  canSharePdfFile,
  pdfFileForSystemShare,
  sharePdfWithWebApi,
  triggerPdfDownloadFromBytes,
} from "@/lib/prediction-share";
import { fetchPredictionSharePdf } from "@/lib/services/predictions";
import type { PredictionShareKind } from "@/types/ui/prediction-share";

type PendingShare = {
  pdfBytes: ArrayBuffer;
  filename: string;
};

function filenameForKind(kind: PredictionShareKind): string {
  return kind === "daily"
    ? DOWNLOAD_FILENAMES.dailyPredictionPdf
    : DOWNLOAD_FILENAMES.weeklyPredictionPdf;
}

export function usePredictionShare() {
  const PS = useI18nConstants(PREDICTION_SHARE_SCREEN);
  const [sharing, setSharing] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [shareReady, setShareReady] = useState(false);
  const pendingShareRef = useRef<PendingShare | null>(null);

  const clearPendingShare = useCallback(() => {
    pendingShareRef.current = null;
    setShareReady(false);
  }, []);

  const prepareShare = useCallback(
    async (kind: PredictionShareKind, predictionId: number) => {
      setError(null);
      setSuccess(null);
      clearPendingShare();
      setLoadingLabel(PS.shareLoading);
      setSharing(true);

      try {
        const blob = await fetchPredictionSharePdf({ kind, predictionId });
        if (!blob || blob.size === 0) throw new Error("empty_pdf");

        const filename = filenameForKind(kind);
        const pdfBytes = await blob.arrayBuffer();
        if (pdfBytes.byteLength === 0) throw new Error("empty_pdf");
        const file = await pdfFileForSystemShare(pdfBytes, filename);

        if (canSharePdfFile(file)) {
          pendingShareRef.current = { pdfBytes, filename };
          setShareReady(true);
          setSuccess(PS.shareReadyPrompt);
          return true;
        }

        triggerPdfDownloadFromBytes(pdfBytes, filename);
        setSuccess(PS.shareDownloadHint);
        return true;
      } catch {
        setError(PS.shareError);
        return false;
      } finally {
        setSharing(false);
        setLoadingLabel(null);
      }
    },
    [PS, clearPendingShare]
  );

  const confirmShare = useCallback(async () => {
    const pending = pendingShareRef.current;
    if (!pending) return false;

    setError(null);
    setSuccess(null);
    setLoadingLabel(PS.shareOpening);
    setSharing(true);

    try {
      const outcome = await sharePdfWithWebApi({
        bytes: pending.pdfBytes,
        filename: pending.filename,
      });

      if (outcome === "native") {
        setSuccess(PS.shareSuccess);
      } else if (outcome === "cancelled") {
        setSuccess(null);
      }

      clearPendingShare();
      return true;
    } catch {
      triggerPdfDownloadFromBytes(pending.pdfBytes, pending.filename);
      setSuccess(PS.shareDownloadHint);
      clearPendingShare();
      return false;
    } finally {
      setSharing(false);
      setLoadingLabel(null);
    }
  }, [PS]);

  const resetShare = useCallback(() => {
    setSharing(false);
    setLoadingLabel(null);
    setError(null);
    setSuccess(null);
    clearPendingShare();
  }, [clearPendingShare]);

  return {
    sharing,
    loadingLabel,
    error,
    success,
    shareReady,
    prepareShare,
    confirmShare,
    resetShare,
  };
}
