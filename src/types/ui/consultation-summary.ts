import type { ConsultationQuestion } from "@/types/consultation";

export interface ConsultationSummarySessionCardProps {
  name: string;
  picture?: string | null;
  isCompleted: boolean;
  eventLink?: string | null;
  statusCompletedLabel: string;
  statusUpcomingLabel: string;
  meetingLinkLabel: string;
  meetingLinkPendingLabel: string;
}

export interface ConsultationSummaryDetailItem {
  label: string;
  value: string;
}

export interface ConsultationSummaryDetailsCardProps {
  title: string;
  items: ConsultationSummaryDetailItem[];
}

export interface ConsultationSummaryQueriesCardProps {
  title: string;
  loading: boolean;
  questions: ConsultationQuestion[];
  showAnswersBanner: boolean;
  canAddQuery: boolean;
  addQueryLabel: string;
  emptyLabel: string;
  loadingLabel: string;
  answerLabel: string;
  onAddQuery: () => void;
}
