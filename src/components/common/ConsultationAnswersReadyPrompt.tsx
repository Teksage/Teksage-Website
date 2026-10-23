"use client";

import { ConsultationAnswersReadyDialog } from "@/components/consultation/ConsultationAnswersReadyDialog";
import { useConsultationAnswersReadyPopup } from "@/hooks/useConsultationAnswersReadyPopup";

export function ConsultationAnswersReadyPrompt() {
  const { open, pending, onLater, onViewAnswers } =
    useConsultationAnswersReadyPopup();

  return (
    <ConsultationAnswersReadyDialog
      open={open}
      event={pending}
      onLater={onLater}
      onViewAnswers={onViewAnswers}
    />
  );
}
