"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { HOME_LAYOUT, MAIN_NAV_ITEMS } from "@/lib/constants";

interface BottomNavProps {
  className?: string;
}

export function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 pb-safe lg:hidden",
        className
      )}
    >
      <div
        className={cn(
          HOME_LAYOUT.maxWidth,
          HOME_LAYOUT.gutterX,
          "mx-auto border border-black/[0.06] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)]",
          HOME_LAYOUT.pillStrip,
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
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
