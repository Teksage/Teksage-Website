import type { useAstrologerAvailability } from "@/hooks/useAstrologerAvailability";

export type AstrologerAvailabilityState = ReturnType<
  typeof useAstrologerAvailability
>;

export interface AstrologerAvailabilityProps {
  selectedDate: Date;
  onDateChange: (d: Date) => void;
  isEdit: boolean;
  onEditChange: (edit: boolean) => void;
  availability: AstrologerAvailabilityState;
}

export interface AstrologerMeetingDetailProps {
  event: import("@/types/astrologer-portal").AstroEventDetail;
  initials: string;
  fullName: string;
  /** Preserved from list navigation — Flutter `widget.name` / query args. */
  queryString: string;
  meetingLinkFallback?: string | null;
  onRefresh?: () => void | Promise<void>;
}

export interface AstrologerMeetingQuestionsSectionProps {
  questions: import("@/types/astrologer-portal").AstroQuestion[];
  startDatetime: string;
  consultationDuration: number | null;
  onQuestionsUpdated: () => void | Promise<void>;
}

export interface AstrologerAnswerQuestionDialogProps {
  open: boolean;
  questions: import("@/types/astrologer-portal").AstroQuestion[];
  startIndex: number;
  onClose: () => void;
  /** Called after each answer is persisted to the API. */
  onAnswerSaved: (updated: import("@/types/astrologer-portal").AstroQuestion) => void;
}

export interface AskAnswerVoiceInputProps {
  voiceFile: File | null;
  voiceDurationSec: number | null;
  onVoiceFileChange: (file: File | null, durationSec?: number | null) => void;
  disabled?: boolean;
}
