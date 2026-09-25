import type { ConsultationHubTab } from "@/lib/constants/consultation-routes";
import type { ConsultationLanguageOption } from "@/lib/constants/consultation-languages";
import type {
  ConsultationAstrologer,
  ConsultationUserEvent,
} from "@/types/consultation";

export interface ConsultationHubTabsProps {
  activeTab: ConsultationHubTab;
  onChange: (tab: ConsultationHubTab) => void;
  /** Total upcoming + completed meetings for the hub badge. */
  meetingCount?: number;
}

export interface ConsultationHubAstroCardProps {
  astrologer: ConsultationAstrologer;
  currency: "INR" | "USD";
  href: string;
}

export interface ConsultationLanguageFilterProps {
  value: string;
  onChange: (languageId: string) => void;
  /** Only languages present on the loaded roster. */
  options: readonly ConsultationLanguageOption[];
}

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
