import type { PanchangTimingRow } from "@/lib/panchang-timing-rows";
import type { HoroscopeDivisionalChart, HoroscopePayload, PanchangDetail } from "../astrology";

export interface HoroscopeChartFrameProps {
  title: string;
  html: string;
  className?: string;
  /** When false, only the iframe is shown (chart type comes from a parent toggle). */
  showTitle?: boolean;
}

export interface PanchangDetailViewProps {
  panchang: PanchangDetail;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onDownloadPdf?: () => void;
  pdfBusy?: boolean;
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
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export interface PanchangDateRibbonProps {
  panchang: PanchangDetail;
  onOpenCalendar: () => void;
}

export interface PanchangBalaPairProps {
  panchang: PanchangDetail;
}

export interface PanchangSunTimeGridProps {
  sunrise?: string;
  sunset?: string;
}

export type PanchangTimingCardVariant = "all" | "primary" | "secondary";

export interface PanchangTimingRowsCardProps {
  rows: PanchangTimingRow[];
  className?: string;
}

export interface PanchangExtendedTimingCardProps {
  panchang: PanchangDetail;
  variant?: PanchangTimingCardVariant;
  className?: string;
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
  onDownloadPdf?: () => Promise<void>;
}

export interface HoroscopeChartChipsProps {
  charts: HoroscopeDivisionalChart[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export interface HoroscopeSouthChartsProps {
  data: HoroscopePayload;
}
