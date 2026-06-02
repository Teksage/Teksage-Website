export type AppSnackBarVariant = "success" | "error" | "info";

export type AppSnackBarPosition = "top" | "bottom";

export type AppSnackBarPayload = {
  message: string;
  variant: AppSnackBarVariant;
  position: AppSnackBarPosition;
  durationMs: number;
};
