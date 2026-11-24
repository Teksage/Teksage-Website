"use client";

import { DESKTOP_SIDEBAR_UI as UI } from "@/lib/constants/desktop-sidebar-ui";
import type { DesktopSidebarTooltipProps } from "@/types/ui/desktop-sidebar-tooltip";

/** Hover label for collapsed desktop sidebar icons. */
export function DesktopSidebarTooltip({
  label,
  enabled = true,
  children,
}: DesktopSidebarTooltipProps) {
  if (!enabled || !label?.trim()) return children;

  return (
    <span className={`group ${UI.tooltipWrap}`}>
      {children}
      <span role="tooltip" className={UI.tooltipBubble}>
        <span className={UI.tooltipArrow} aria-hidden />
        {label}
      </span>
    </span>
  );
}
