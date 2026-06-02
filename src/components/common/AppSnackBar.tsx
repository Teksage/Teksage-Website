"use client";

import {
  APP_SNACKBAR_UI,
  APP_SNACKBAR_VARIANT_STYLES,
} from "@/lib/constants/app-snackbar";
import type { AppSnackBarVariant } from "@/types/ui/app-snackbar";
import { cn } from "@/lib/utils";

function SnackIcon({ variant, className }: { variant: AppSnackBarVariant; className: string }) {
  if (variant === "success") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden>
        <path
          fill="currentColor"
          d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm-1.2 14.2-4.2-4.2 1.4-1.4 2.8 2.8 6.8-6.8 1.4 1.4Z"
        />
      </svg>
    );
  }
  if (variant === "error") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden>
        <path
          fill="currentColor"
          d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 5h-2v6h2Zm0 8h-2v2h2Z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 14h-2v-2h2Zm0-4h-2V7h2Z"
      />
    </svg>
  );
}

type AppSnackBarProps = {
  message: string;
  variant: AppSnackBarVariant;
  onDismiss: () => void;
};

export function AppSnackBar({ message, variant, onDismiss }: AppSnackBarProps) {
  const styles = APP_SNACKBAR_VARIANT_STYLES[variant];

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(APP_SNACKBAR_UI.bar, styles.surface)}
    >
      <div className={cn(APP_SNACKBAR_UI.indicator, styles.indicator)} aria-hidden />
      <div className={APP_SNACKBAR_UI.body}>
        <SnackIcon variant={variant} className={cn(APP_SNACKBAR_UI.icon, styles.iconClass)} />
        <p className={APP_SNACKBAR_UI.message}>{message}</p>
        <button
          type="button"
          onClick={onDismiss}
          className="sr-only"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
