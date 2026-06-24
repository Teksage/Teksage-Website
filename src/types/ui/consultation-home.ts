import type { ConsultationUserEvent } from "@/types/consultation";

export interface ConsultationMeetingsTabsProps {
  isUpcoming: boolean;
  completedCount: number;
  onChange: (isUpcoming: boolean) => void;
}

export interface ConsultationMeetingCardProps {
  event: ConsultationUserEvent;
  isUpcoming: boolean;
  meetingWithLabel: string;
  viewDetailsLabel: string;
  meetingLinkLabel: string;
  queriesAnsweredLabel: string;
  onViewDetails: (event: ConsultationUserEvent) => void;
}
