import type { ReactNode } from "react";

export interface DesktopNavLabelLines {
  primary: string;
  secondary?: string;
}

export interface DesktopNavItemProps {
  href?: string;
  iconSrc: string;
  label?: string;
  labelLines?: DesktopNavLabelLines;
  active?: boolean;
  trailing?: ReactNode;
  onClick?: () => void;
  ariaExpanded?: boolean;
  /** Icon-only rail when the desktop sidebar is collapsed. */
  collapsed?: boolean;
  /** When false, skip hover tooltip even if collapsed. */
  showTooltip?: boolean;
}
