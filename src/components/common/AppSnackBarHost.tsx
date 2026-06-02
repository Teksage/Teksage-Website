"use client";

import { AppSnackBar } from "@/components/common/AppSnackBar";
import { APP_SNACKBAR_UI } from "@/lib/constants/app-snackbar";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { useAppSnackBarStore } from "@/store/app-snackbar.store";
import { cn } from "@/lib/utils";

/** Global host — mount once in `AppProviders` (Flutter `ScaffoldMessenger`). */
export function AppSnackBarHost() {
  const { t } = useAppLanguage();
  const current = useAppSnackBarStore((s) => s.current);
  const dismiss = useAppSnackBarStore((s) => s.dismiss);

  if (!current) return null;

  const label = t(current.message);

  return (
    <div
      className={cn(
        current.position === "bottom"
          ? APP_SNACKBAR_UI.hostBottom
          : APP_SNACKBAR_UI.hostTop,
        APP_SNACKBAR_UI.hostDesktopBottomRight
      )}
    >
      <AppSnackBar
        message={label}
        variant={current.variant}
        onDismiss={dismiss}
      />
    </div>
  );
}
