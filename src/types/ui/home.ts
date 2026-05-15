export interface ChatBannerProps {
  isLoggedIn: boolean;
  className?: string;
}

export interface ConsultationBannerProps {
  isLoggedIn: boolean;
  isAstrologer?: boolean;
  className?: string;
}

export interface MatchMakingCardProps {
  isLoggedIn: boolean;
  hasExistingMatch?: boolean;
  className?: string;
}

export interface PredictionCirclesProps {
  isLoggedIn: boolean;
  className?: string;
}

export interface DailyPredictionData {
  tharaBala?: string;
  chandraBala?: string;
}

export interface DailyPredictionCardProps {
  data?: DailyPredictionData;
  isLoading?: boolean;
  isLoggedIn: boolean;
  /** Set when dashboard prediction APIs failed. */
  fetchError?: string | null;
  currentDate: string;
  className?: string;
}

export interface HomeDashboardHeaderProps {
  greeting: string;
  isAuthenticated: boolean;
  unreadCount: number;
  className?: string;
}
