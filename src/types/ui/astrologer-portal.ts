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
}
