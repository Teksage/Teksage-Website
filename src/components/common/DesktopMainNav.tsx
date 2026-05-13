"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { APP_NAME, MAIN_NAV_ITEMS, PUBLIC_ASSETS } from "@/lib/constants";

interface DesktopMainNavProps {
  className?: string;
}

/**
 * Left rail for `lg+` — replaces the fixed bottom bar on wide viewports.
 */
export function DesktopMainNav({ className }: DesktopMainNavProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "sticky top-0 z-30 hidden h-dvh w-[13.5rem] shrink-0 flex-col border-r border-neutral-200/90 bg-white lg:flex",
        className
      )}
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-2 border-b border-neutral-100 px-4 py-5">
        <Image
          src={PUBLIC_ASSETS.appLogo}
          alt=""
          width={36}
          height={36}
          unoptimized
          className="size-9 shrink-0"
        />
        <span className="truncate text-base font-bold capitalize text-[color:var(--color-brand-panchang)]">
          {APP_NAME}
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {MAIN_NAV_ITEMS.map((tab) => {
          const active = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors",
                active
                  ? "bg-[var(--color-home-screen-mint)] text-[var(--color-brand-primary)]"
                  : "text-neutral-600 hover:bg-neutral-50"
              )}
            >
              <Image
                src={active ? tab.iconOn : tab.iconOff}
                alt=""
                width={32}
                height={33}
                unoptimized
                className="size-8 shrink-0"
              />
              <span className="text-sm font-semibold">{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
