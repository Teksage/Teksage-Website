import type { HomePanchangTimingStripVariant } from "@/lib/constants/home-panchang-timing-ui";

export interface HomePanchangTimingStripProps {
  variant?: HomePanchangTimingStripVariant;
  /** Drop bottom border when nested in `HomeDesktopTopHeader`. */
  flush?: boolean;
  className?: string;
}

export interface HomePanchangTimingTickerProps {
  className?: string;
}

export interface HomePanchangTimingMobileCardProps {
  className?: string;
}

export interface HomePanchangTimingStripCellProps {
  label: string;
  value: string;
  variant: HomePanchangTimingStripVariant;
}

export interface HomePanchangTimingAuspiciousCellProps {
  label: string;
  slots: string[];
  placeholder: string;
  variant: HomePanchangTimingStripVariant;
}
