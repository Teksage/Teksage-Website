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
}
