import Image from "next/image";
import Link from "next/link";
import { DesktopNavLabel } from "@/components/common/DesktopNavLabel";
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
}: DesktopNavItemProps) {
  const rowClass = active
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
      <DesktopNavLabel label={label} labelLines={labelLines} active={active} />
      {trailing ? <span className="ml-auto shrink-0">{trailing}</span> : null}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={rowClass}
        aria-expanded={ariaExpanded}
      >
        {content}
      </button>
    );
  }

  return (
    <Link href={href ?? "#"} className={cn(rowClass)}>
      {content}
    </Link>
  );
}
