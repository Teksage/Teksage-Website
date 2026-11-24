"use client";

import { useI18nConstants } from "@/hooks/useT";
import { DESKTOP_SIDEBAR_UI as UI } from "@/lib/constants/desktop-sidebar-ui";
import { HOME_DASHBOARD_SIDEBAR } from "@/lib/constants/home-dashboard-sidebar";
import { useDesktopSidebarStore } from "@/store/desktop-sidebar.store";

/** Edge-mounted circular expand/collapse control for the desktop left rail. */
export function DesktopSidebarCollapseToggle() {
  const copy = useI18nConstants(HOME_DASHBOARD_SIDEBAR);
  const collapsed = useDesktopSidebarStore((s) => s.collapsed);
  const toggleCollapsed = useDesktopSidebarStore((s) => s.toggleCollapsed);
  const label = collapsed ? copy.expandSidebar : copy.collapseSidebar;

  return (
    <button
      type="button"
      onClick={toggleCollapsed}
      className={UI.collapseBtn}
      aria-label={label}
      aria-expanded={!collapsed}
      title={label}
    >
      <svg viewBox="0 0 16 16" className={UI.collapseIcon} aria-hidden fill="none">
        {collapsed ? (
          <path
            d="M6 3l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M10 3L5 8l5 5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}
