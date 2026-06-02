import Image from "next/image";
import Link from "next/link";
import { DesktopNavLabel } from "@/components/common/DesktopNavLabel";
import { cn } from "@/lib/utils";
import type { DesktopNavItemProps } from "@/types/ui/desktop-nav";

/** Sidebar row — Flutter design ref (icon + label + optional chevron). */
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
  const rowClass = cn(
    "flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors",
    active
      ? "bg-[var(--color-home-screen-mint)]"
      : "hover:bg-neutral-50"
  );

  const content = (
    <>
      <Image
        src={iconSrc}
        alt=""
        width={32}
        height={32}
        unoptimized
        className="size-8 shrink-0 object-contain"
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
    <Link href={href ?? "#"} className={rowClass}>
      {content}
    </Link>
  );
}
