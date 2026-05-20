"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { SETTINGS_PAGE_ASSETS } from "@/lib/constants/assets";
import { SETTINGS_SCREEN } from "@/lib/constants/settings-screen";
import { SETTINGS_UI } from "@/lib/constants/settings-ui";

type SettingsRateDialogProps = {
  open: boolean;
  onClose: () => void;
  onRateNow: () => void;
};

export function SettingsRateDialog({
  open,
  onClose,
  onRateNow,
}: SettingsRateDialogProps) {
  const SS = useI18nConstants(SETTINGS_SCREEN);
  if (!open) return null;

  return (
    <div className={SETTINGS_UI.rateOverlay} role="dialog" aria-modal>
      <div className={SETTINGS_UI.rateCard}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex size-8 items-center justify-center"
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
          {SS.rateDialogLead}
        </p>
        <div className="flex justify-center py-4">
          <button
            type="button"
            onClick={onRateNow}
            className="min-w-[140px] rounded-full bg-[var(--color-brand-primary)] px-6 py-2.5 text-base font-semibold text-white"
          >
            {SS.rateNowLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

