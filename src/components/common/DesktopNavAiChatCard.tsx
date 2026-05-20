"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DESKTOP_SIDEBAR_AI_CHAT_HREF } from "@/lib/constants/desktop-sidebar-nav";
import {
  HOME_DASHBOARD_SIDEBAR,
  HOME_DASHBOARD_SIDEBAR_ASSETS,
} from "@/lib/constants/home-dashboard-sidebar";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";

export function DesktopNavAiChatCard() {
  const HDS = useI18nConstants(HOME_DASHBOARD_SIDEBAR);
  const HOM = useI18nConstants(HOME_DASHBOARD_SIDEBAR_ASSETS);
  const pathname = usePathname();
  const active =
    pathname === ROUTES.home ||
    pathname === ROUTES.chat ||
    pathname.startsWith(`${ROUTES.chat}/`);

  return (
    <Link
      href={DESKTOP_SIDEBAR_AI_CHAT_HREF}
      className={cn(
        "mb-2 flex items-center gap-3 rounded-2xl border px-3 py-3 transition-colors",
        active
          ? "border-[var(--color-brand-primary)]/25 bg-[var(--color-home-screen-mint)]"
          : "border-neutral-200/90 bg-white hover:bg-neutral-50"
      )}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-primary)] p-1">
        <span className="flex size-full items-center justify-center rounded-full bg-white">
          <Image
            src={HOME_DASHBOARD_SIDEBAR_ASSETS.aiChatIcon}
            alt=""
            width={28}
            height={28}
            unoptimized
            className="size-7 object-contain"
          />
        </span>
      </span>
      <span className="flex min-w-0 flex-1 flex-col leading-snug">
        <span
          className={cn(
            "text-sm font-medium",
            active ? "text-black" : "text-black/80"
          )}
        >
          {HDS.aiChatLine1}
        </span>
        <span
          className={cn(
            "text-sm font-bold",
            active ? "text-[var(--color-brand-primary)]" : "text-black/70"
          )}
        >
          {HDS.aiChatLine2}
        </span>
      </span>
    </Link>
  );
}
