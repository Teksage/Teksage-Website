import { create } from "zustand";
import { APP_SNACKBAR_DURATION_MS } from "@/lib/constants/app-snackbar";
import type {
  AppSnackBarPayload,
  AppSnackBarPosition,
  AppSnackBarVariant,
} from "@/types/ui/app-snackbar";

type ShowOptions = {
  message: string;
  variant?: AppSnackBarVariant;
  position?: AppSnackBarPosition;
  durationMs?: number;
};

type AppSnackBarStore = {
  current: (AppSnackBarPayload & { timeoutId?: number }) | null;
  show: (options: ShowOptions) => void;
  dismiss: () => void;
};

export const useAppSnackBarStore = create<AppSnackBarStore>((set, get) => ({
  current: null,
  show: ({ message, variant = "success", position = "top", durationMs }) => {
    const prev = get().current?.timeoutId;
    if (prev != null) window.clearTimeout(prev);

    const duration =
      durationMs ?? APP_SNACKBAR_DURATION_MS[variant];
    const timeoutId = window.setTimeout(() => get().dismiss(), duration);

    set({
      current: { message, variant, position, durationMs: duration, timeoutId },
    });
  },
  dismiss: () => {
    const id = get().current?.timeoutId;
    if (id != null) window.clearTimeout(id);
    set({ current: null });
  },
}));
