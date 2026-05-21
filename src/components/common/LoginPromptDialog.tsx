"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { DIALOG_UI } from "@/lib/constants/dialog-ui";
import { LOGIN_PROMPT } from "@/lib/constants/login-prompt";
import { PUBLIC_ASSETS, SETTINGS_PAGE_ASSETS } from "@/lib/constants/assets";

type LoginPromptDialogProps = {
  open: boolean;
  onClose: () => void;
  onLoginNow: () => void;
};

/** Flutter `LoginPromptDialog` — same size shell as `SettingsRateDialog`. */
export function LoginPromptDialog({ open, onClose, onLoginNow }: LoginPromptDialogProps) {
  const LP = useI18nConstants(LOGIN_PROMPT);
  if (!open) return null;

  return (
    <div className={DIALOG_UI.overlay} role="dialog" aria-modal aria-labelledby="login-prompt-title">
      <div className={DIALOG_UI.card}>
        <button
          type="button"
          onClick={onClose}
          className={DIALOG_UI.closeBtn}
          aria-label={LP.closeAria}
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
        <Image
          src={PUBLIC_ASSETS.dashLogin}
          alt={LP.illustrationAlt}
          width={56}
          height={56}
          unoptimized
          className={DIALOG_UI.loginIllustration}
        />
        <p id="login-prompt-title" className={DIALOG_UI.loginMessage}>
          {LP.message}
        </p>
        <div className={DIALOG_UI.loginActions}>
          <button type="button" onClick={onLoginNow} className={DIALOG_UI.primaryBtn}>
            {LP.loginNowCta}
          </button>
        </div>
      </div>
    </div>
  );
}
