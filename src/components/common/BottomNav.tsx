"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { cn } from "@/lib/utils";
import { HOME_LAYOUT, MAIN_NAV_ITEMS } from "@/lib/constants";
import type { BottomNavProps } from "@/types";

/**
 * Floating pill bottom nav — mirrors Flutter `bottomNavigation.dart`
 * (`extendBody: true`, horizontal margin, `BorderRadius.circular(40)`).
 * Only the pill is white; page background shows through around it.
 */
export function BottomNav({ className }: BottomNavProps) {
  const { t } = useAppLanguage();
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-50 bg-transparent lg:hidden",
        HOME_LAYOUT.floatingNavInsetX,
        HOME_LAYOUT.floatingNavBottom,
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-auto mx-auto w-full max-w-lg",
          HOME_LAYOUT.pillStrip,
          HOME_LAYOUT.bottomNavPillSurface,
          HOME_LAYOUT.floatingNavShadow,
          HOME_LAYOUT.bottomNavPadding
        )}
      >
        <div className="flex items-end justify-between gap-0.5 sm:justify-around sm:gap-1">
          {MAIN_NAV_ITEMS.map((tab) => {
            const active = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex min-w-0 flex-1 flex-col items-center gap-1.5 rounded-2xl px-1.5 py-1 sm:px-3 sm:py-1.5",
                  "transition-colors hover:bg-neutral-50/80"
                )}
              >
                <Image
                  src={active ? tab.iconOn : tab.iconOff}
                  alt=""
                  width={32}
                  height={33}
                  unoptimized
                  className="size-8"
                />
                <span
                  className={cn(
                    "text-center text-[0.6875rem] font-semibold leading-tight sm:text-xs",
                    active
                      ? "text-[var(--color-brand-primary)]"
                      : "text-neutral-500"
                  )}
                >
                  {t(tab.label)}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
