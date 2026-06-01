import type { ReactNode, CSSProperties } from "react";

export interface BottomNavProps {
  className?: string;
}

export interface MainTabViewportBackdropProps {
  className: string;
  overflowHidden?: boolean;
}

export interface AppHeaderProps {
  title?: string;
  showNotification?: boolean;
  showBack?: boolean;
  onBackClick?: () => void;
  /** Match Flutter settings AppBar: translucent bar over gradient (no solid white strip). */
  blend?: boolean;
  /** e.g. Flutter profile AppBar trailing `Edit`. */
  action?: ReactNode;
  className?: string;
  /** Inline style override (e.g. coloured AppBar for astrologer meeting detail). */
  style?: CSSProperties;
  /** Override icon/text colour when AppBar has a non-white background. */
  foregroundColor?: string;
}

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export interface BrandLoginLogoProps {
  className?: string;
  /** Width in CSS pixels; height scales with intrinsic aspect ratio */
  widthPx?: number;
}

export interface DesktopMainNavProps {
  className?: string;
  /** Hide logo block — brand lives in `HomeDesktopTopHeader` on home. */
  hideBrand?: boolean;
}
