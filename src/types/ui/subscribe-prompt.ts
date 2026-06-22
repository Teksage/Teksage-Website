export type SubscribePromptPlanStatus = "expired" | "default";

export interface SubscribePromptDialogProps {
  open: boolean;
  onClose: () => void;
  planStatus?: SubscribePromptPlanStatus;
}
