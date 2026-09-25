import type { ConsultationAnswersReadyPending } from "@/types/consultation";

export interface ConsultationAnswersReadyDialogProps {
  open: boolean;
  event: ConsultationAnswersReadyPending | null;
  onViewAnswers: () => void;
  onLater: () => void;
}
