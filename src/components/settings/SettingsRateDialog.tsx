"use client";

import { useI18nConstants } from "@/hooks/useT";
import { SettingsModalDialog } from "@/components/settings/SettingsModalDialog";
import { SETTINGS_SCREEN } from "@/lib/constants/settings-screen";
import type { SettingsRateDialogProps } from "@/types";

export function SettingsRateDialog({ open, onClose, onRateNow }: SettingsRateDialogProps) {
  const SS = useI18nConstants(SETTINGS_SCREEN);
  return (
    <SettingsModalDialog
      open={open}
      onClose={onClose}
      message={SS.rateDialogLead}
      confirmLabel={SS.rateNowLabel}
      onConfirm={onRateNow}
    />
  );
}
