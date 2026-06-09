import type { PredictionDetailKind } from "@/types/prediction-detail";

export type PredictionShareKind = Extract<PredictionDetailKind, "daily" | "weekly">;

export type PredictionShareSheetProps = {
  open: boolean;
  sharing: boolean;
  loadingLabel?: string | null;
  shareReady?: boolean;
  successMessage?: string | null;
  errorMessage?: string | null;
  onClose: () => void;
  onPrepareShare: () => void;
  onConfirmShare: () => void;
};

export type PredictionShareButtonProps = {
  disabled?: boolean;
  onClick: () => void;
  className?: string;
};
