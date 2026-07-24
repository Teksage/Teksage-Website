import type { MuhurthaDayResult, MuhurthaResult } from "@/types/muhurtha";

export interface MuhurthaPremiumGateProps {
  className?: string;
}

export interface MuhurthaFormViewProps {
  event: string;
  startDate: string;
  location: string;
  locationFull: string;
  locationError: string | null;
  onEventChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onLocationChange: (selected: string, full: string) => void;
  onSubmit: () => void;
}

export interface MuhurthaResultsViewProps {
  result: MuhurthaResult;
}

export interface MuhurthaDayRowProps {
  day: MuhurthaDayResult;
}

export interface MuhurthaCardProps {
  className?: string;
}

export interface MuhurthaFeatureHeroProps {
  title: string;
  subtitle?: string;
}
