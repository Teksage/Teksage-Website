import type { AskAstrologerRequest } from "@/types/ask-astrologer";

export interface AskAnswerReadyDialogProps {
  open: boolean;
  request: AskAstrologerRequest | null;
  onViewAnswer: () => void;
  onLater: () => void;
}
