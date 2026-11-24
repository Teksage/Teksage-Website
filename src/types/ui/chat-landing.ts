import type { CurrentDasaSummary } from "@/types/astrology";
import type { ChatLandingQuestionCategory } from "@/lib/constants/chat-landing-questions";

export interface ChatLandingEnergyScores {
  career?: number;
  relationship?: number;
  wealth?: number;
  health?: number;
}

export interface ChatLandingHeaderMetaProps {
  theme?: string | null;
  themeIsPositive?: boolean;
  dasaSummary?: CurrentDasaSummary | null;
  loading?: boolean;
  compact?: boolean;
}

export interface ChatLandingQuestionCardProps {
  question: string;
  onSelect: (question: string) => void;
}

export interface ChatEnergyScoreRowProps {
  scores: ChatLandingEnergyScores;
  compact?: boolean;
}

export interface ChatStarRatingProps {
  value?: number;
  className?: string;
}

export interface ChatTryAskingSectionProps {
  onSelectQuestion: (question: string) => void;
}

export interface ChatLandingMicHeroProps {
  onSpeak: () => void;
  disabled?: boolean;
  compact?: boolean;
}

export interface ChatLandingViewProps {
  onSelectQuestion: (question: string) => void;
  onSpeak: () => void;
  speakDisabled?: boolean;
  /** Home embed — denser layout so promo + landing fit without scroll. */
  compact?: boolean;
}

export interface HomeChatEmbedHeaderProps {
  onPreviousChat?: () => void;
  showPreviousChat?: boolean;
  onReturnToLanding?: () => void;
  showReturnToLanding?: boolean;
  isPremium: boolean;
  messageCount: number;
  maintainHistory: boolean;
  planStatus: string;
  onToast: (message: string) => void;
  compact?: boolean;
}

export type { ChatLandingQuestionCategory };
