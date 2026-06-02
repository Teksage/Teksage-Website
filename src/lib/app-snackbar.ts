import { useAppSnackBarStore } from "@/store/app-snackbar.store";
import type { AppSnackBarPosition } from "@/types/ui/app-snackbar";

type SnackOptions = { position?: AppSnackBarPosition; durationMs?: number };

export function showSuccessAppSnackBar(message: string, options?: SnackOptions) {
  useAppSnackBarStore.getState().show({
    message,
    variant: "success",
    position: options?.position ?? "top",
    durationMs: options?.durationMs,
  });
}

export function showErrorAppSnackBar(message: string, options?: SnackOptions) {
  useAppSnackBarStore.getState().show({
    message,
    variant: "error",
    position: options?.position ?? "top",
    durationMs: options?.durationMs,
  });
}

export function showInfoAppSnackBar(message: string, options?: SnackOptions) {
  useAppSnackBarStore.getState().show({
    message,
    variant: "info",
    position: options?.position ?? "top",
    durationMs: options?.durationMs,
  });
}

export function dismissAppSnackBar() {
  useAppSnackBarStore.getState().dismiss();
}
