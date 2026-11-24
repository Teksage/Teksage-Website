import Image from "next/image";
import Link from "next/link";
import { DesktopNavLabel } from "@/components/common/DesktopNavLabel";
import { DesktopSidebarTooltip } from "@/components/common/DesktopSidebarTooltip";
import { DESKTOP_SIDEBAR_UI } from "@/lib/constants/desktop-sidebar-ui";
import { cn } from "@/lib/utils";
import type { DesktopNavItemProps } from "@/types/ui/desktop-nav";

/** Sidebar row — modern icon + label + optional chevron. */
export function DesktopNavItem({
  href,
  iconSrc,
  label,
  labelLines,
  active,
  trailing,
  onClick,
  ariaExpanded,
  collapsed = false,
  showTooltip = true,
}: DesktopNavItemProps) {
  const title = label ?? labelLines?.primary;
  const rowClass = collapsed
    ? active
      ? DESKTOP_SIDEBAR_UI.navItemCollapsedActive
      : DESKTOP_SIDEBAR_UI.navItemCollapsed
    : active
      ? DESKTOP_SIDEBAR_UI.navItemActive
      : DESKTOP_SIDEBAR_UI.navItem;

  const content = (
    <>
      <Image
        src={iconSrc}
        alt=""
        width={28}
        height={28}
        unoptimized
        className={
          active ? DESKTOP_SIDEBAR_UI.navIconActive : DESKTOP_SIDEBAR_UI.navIcon
        }
      />
      {collapsed ? null : (
        <>
          <DesktopNavLabel label={label} labelLines={labelLines} active={active} />
          {trailing ? <span className="ml-auto shrink-0">{trailing}</span> : null}
        </>
      )}
    </>
  );

  const control = onClick ? (
    <button
      type="button"
      onClick={onClick}
      className={rowClass}
      aria-expanded={ariaExpanded}
      aria-label={title}
    >
      {content}
    </button>
  ) : (
    <Link href={href ?? "#"} className={cn(rowClass)} aria-label={title}>
      {content}
    </Link>
  );

  return (
    <DesktopSidebarTooltip label={title} enabled={collapsed && showTooltip}>
      {control}
    </DesktopSidebarTooltip>
  );
}
