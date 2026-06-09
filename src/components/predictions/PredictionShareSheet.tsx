"use client";

import { Loader } from "@/components/common/Loader";
import { useI18nConstants } from "@/hooks/useT";
import { PREDICTION_SHARE_ASSETS, SETTINGS_PAGE_ASSETS } from "@/lib/constants/assets";
import {
  PREDICTION_SHARE_SCREEN,
  PREDICTION_SHARE_UI,
} from "@/lib/constants/prediction-share";
import type { PredictionShareSheetProps } from "@/types/ui/prediction-share";

export function PredictionShareSheet({
  open,
  sharing,
  loadingLabel,
  shareReady,
  successMessage,
  errorMessage,
  onClose,
  onPrepareShare,
  onConfirmShare,
}: PredictionShareSheetProps) {
  const PS = useI18nConstants(PREDICTION_SHARE_SCREEN);

  if (!open) return null;

  const actionLabel = shareReady ? PS.shareNowAction : PS.shareAction;
  const onAction = shareReady ? onConfirmShare : onPrepareShare;

  return (
    <div className={PREDICTION_SHARE_UI.overlay} role="dialog" aria-modal aria-labelledby="prediction-share-title">
      <button type="button" className={PREDICTION_SHARE_UI.backdrop} aria-label="Close" onClick={onClose} />
      <div className={PREDICTION_SHARE_UI.sheet}>
        <button type="button" onClick={onClose} className={PREDICTION_SHARE_UI.closeBtn} aria-label="Close">
          <img src={SETTINGS_PAGE_ASSETS.dialogClose} alt="" width={20} height={20} className="size-5" />
        </button>
        <p id="prediction-share-title" className={`pt-6 ${PREDICTION_SHARE_UI.title}`}>
          {PS.shareSheetTitle}
        </p>
        {sharing ? (
          loadingLabel ? (
            <div className="mt-6 flex items-center justify-center gap-2 py-4">
              <Loader variant="inline" size="sm" label={loadingLabel} />
              <span className="text-sm font-medium text-[var(--color-brand-black)]">{loadingLabel}</span>
            </div>
          ) : null
        ) : (
          <button type="button" className={PREDICTION_SHARE_UI.actionBtn} onClick={onAction}>
            <img
              src={PREDICTION_SHARE_ASSETS.share}
              alt=""
              width={20}
              height={20}
              className={PREDICTION_SHARE_UI.actionIcon}
            />
            {actionLabel}
          </button>
        )}
        {errorMessage ? (
          <p className="mt-3 text-center text-sm text-[var(--color-brand-error)]">{errorMessage}</p>
        ) : null}
        {successMessage ? (
          <p className="mt-3 text-center text-sm text-[var(--color-brand-primary)]">{successMessage}</p>
        ) : null}
      </div>
    </div>
  );
}
