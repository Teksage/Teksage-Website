"use client";

import Image from "next/image";
import { SETTINGS_PAGE_ASSETS } from "@/lib/constants/assets";
import { SETTINGS_UI } from "@/lib/constants/settings-ui";
import type { SettingsModalDialogProps } from "@/types";

/** Shared settings modal — same shell as Rate Us (`SettingsRateDialog`). */
export function SettingsModalDialog({
  open,
  onClose,
  message,
  confirmLabel,
  onConfirm,
  cancelLabel,
  confirmDisabled = false,
  body,
}: SettingsModalDialogProps) {
  if (!open) return null;

  return (
    <div className={SETTINGS_UI.rateOverlay} role="dialog" aria-modal>
      <div className={SETTINGS_UI.rateCard}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex size-8 cursor-pointer items-center justify-center"
          aria-label="Close"
        >
          <Image
            src={SETTINGS_PAGE_ASSETS.dialogClose}
            alt=""
            width={20}
            height={20}
            unoptimized
            className="size-5"
          />
        </button>
        <p className="whitespace-pre-line px-4 pt-8 text-center text-base font-semibold leading-relaxed text-[var(--color-brand-black)]">
          {message}
        </p>
        {body ? <div className="px-4 pb-2">{body}</div> : null}
        <div
          className={
            cancelLabel
              ? SETTINGS_UI.rateModalActionsRow
              : SETTINGS_UI.rateModalActions
          }
        >
          {cancelLabel ? (
            <button
              type="button"
              onClick={onClose}
              className={SETTINGS_UI.rateModalDismissBtnSplit}
            >
              {cancelLabel}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onConfirm}
            disabled={confirmDisabled}
            className={
              cancelLabel
                ? SETTINGS_UI.rateModalConfirmBtnSplit
                : SETTINGS_UI.rateModalConfirmBtn
            }
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
