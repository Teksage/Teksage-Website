import { cn } from "@/lib/utils";
import { DESKTOP_SIDEBAR_UI } from "@/lib/constants/desktop-sidebar-ui";
import type { DesktopNavLabelLines } from "@/types/ui/desktop-nav";

export function DesktopNavLabel({
  label,
  labelLines,
  active,
}: {
  label?: string;
  labelLines?: DesktopNavLabelLines;
  active?: boolean;
}) {
  if (labelLines) {
    return (
      <span className="flex min-w-0 flex-1 flex-col leading-snug">
        <span
          className={
            active
              ? DESKTOP_SIDEBAR_UI.navLabelActive
              : DESKTOP_SIDEBAR_UI.navLabel
          }
        >
          {labelLines.primary}
        </span>
        {labelLines.secondary ? (
          <span
            className={
              active
                ? DESKTOP_SIDEBAR_UI.navLabelActive
                : DESKTOP_SIDEBAR_UI.navLabel
            }
          >
            {labelLines.secondary}
          </span>
        ) : null}
      </span>
    );
  }

  return (
    <span
      className={
        active ? DESKTOP_SIDEBAR_UI.navLabelActive : DESKTOP_SIDEBAR_UI.navLabel
      }
    >
      {label}
    </span>
  );
}
