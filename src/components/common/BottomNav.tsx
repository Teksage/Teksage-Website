"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";
import { cn } from "@/lib/utils";
import { HOME_LAYOUT, MAIN_NAV_ITEMS, NAV_UI } from "@/lib/constants";
import type { BottomNavProps } from "@/types";

function longestNavLabelLength(labels: string[]): number {
  return labels.reduce(
    (max, label) => Math.max(max, label.replace(/\s/g, "").length),
    0
  );
}

/**
 * Floating pill bottom nav — mirrors Flutter `bottomNavigation.dart`
 * (`extendBody: true`, horizontal margin, `BorderRadius.circular(40)`).
 */
export function BottomNav({ className }: BottomNavProps) {
  const { t } = useAppLanguage();
  const pathname = usePathname();
  const { guardNavigation, shouldPromptLogin } = useAuthNavigation();

  const tabLabels = useMemo(
    () => MAIN_NAV_ITEMS.map((tab) => t(tab.label)),
    [t]
  );
  const useTallNav =
    longestNavLabelLength(tabLabels) >= NAV_UI.bottomNavLongLabelCharThreshold;

  function renderTab(
    tab: (typeof MAIN_NAV_ITEMS)[number],
    label: string,
    active: boolean,
    onNavigate: () => void,
    isButton: boolean
  ) {
    const itemClass = cn(
      "flex min-w-0 w-full flex-col items-center gap-1 px-0.5 py-1",
      "transition-colors hover:bg-neutral-50/80",
      !isButton && "rounded-2xl"
    );
    const labelClass = cn(
      NAV_UI.bottomNavLabel,
      active ? "text-[var(--color-brand-primary)]" : "text-neutral-500"
    );
    const content = (
      <>
        <Image
          src={active ? tab.iconOn : tab.iconOff}
          alt=""
          width={32}
          height={33}
          unoptimized
          className="size-8 shrink-0"
        />
        <span className={labelClass}>{label}</span>
      </>
    );

    if (isButton) {
      return (
        <button key={tab.href} type="button" onClick={onNavigate} className={itemClass}>
          {content}
        </button>
      );
    }

    return (
      <Link key={tab.href} href={tab.href} className={itemClass}>
        {content}
      </Link>
    );
  }

  return (
    <nav
      aria-label="Main"
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-50 lg:hidden",
        HOME_LAYOUT.floatingNavShell,
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
          HOME_LAYOUT.bottomNavPadding,
          useTallNav && NAV_UI.bottomNavTallPill
        )}
      >
        <div className="grid grid-cols-4 items-end gap-x-0.5">
          {MAIN_NAV_ITEMS.map((tab, tabIndex) => {
            const active = pathname.startsWith(tab.href);
            const needsLogin = shouldPromptLogin(tab.href);
            const label = tabLabels[tabIndex];

            return renderTab(
              tab,
              label,
              active,
              () => guardNavigation(tab.href, { redirectHomeOnClose: true }),
              needsLogin
            );
          })}
        </div>
      </div>
    </nav>
  );
}
