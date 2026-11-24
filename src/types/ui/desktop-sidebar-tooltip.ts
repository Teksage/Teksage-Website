import type { ReactNode } from "react";

export type DesktopSidebarTooltipProps = {
  label?: string;
  /** When false, children render without a tooltip wrapper. */
  enabled?: boolean;
  children: ReactNode;
};
