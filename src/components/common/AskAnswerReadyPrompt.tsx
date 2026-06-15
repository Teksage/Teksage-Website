"use client";

import { AskAnswerReadyDialog } from "@/components/ask-astrologer/AskAnswerReadyDialog";
import { useAskAnswerReadyPopup } from "@/hooks/useAskAnswerReadyPopup";

/** Shows the answer-ready popup once per answered Ask Astrologer request. */
export function AskAnswerReadyPrompt() {
  const { open, pending, onLater, onViewAnswer } = useAskAnswerReadyPopup();

  return (
    <AskAnswerReadyDialog
      open={open}
      request={pending}
      onLater={onLater}
      onViewAnswer={onViewAnswer}
    />
  );
}
