import type { HoroscopePayload, PanchangDetail } from "../astrology";

export interface HoroscopeChartFrameProps {
  title: string;
  html: string;
  className?: string;
  /** When false, only the iframe is shown (chart type comes from a parent toggle). */
  showTitle?: boolean;
}

export interface PanchangDetailViewProps {
  panchang: PanchangDetail;
}

export interface PanchangPremiumGateProps {
  className?: string;
}

export interface PanchangDottedRowProps {
  label: string;
  value?: string;
  isLast: boolean;
}

export interface PanchangPersonalizedSectionsProps {
  panchang: PanchangDetail;
}

export interface PanchangDateRibbonProps {
  panchang: PanchangDetail;
}

export interface PanchangBalaPairProps {
  panchang: PanchangDetail;
}

export interface PanchangSunTimeGridProps {
  sunrise?: string;
  sunset?: string;
}

export interface PanchangExtendedTimingCardProps {
  panchang: PanchangDetail;
}

export interface HoroscopeProfileCardProps {
  data: HoroscopePayload;
}

export type HoroscopeChartVariant = "south" | "north";

export interface HoroscopeChartToggleProps {
  value: HoroscopeChartVariant;
  onChange: (next: HoroscopeChartVariant) => void;
}

export interface HoroscopeLoadedViewProps {
  data: HoroscopePayload;
  chartVariant: HoroscopeChartVariant;
  onChartVariantChange: (next: HoroscopeChartVariant) => void;
}
