"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { APP_NAME, ROUTES } from "@/lib/constants";
import type { AppHeaderProps } from "@/types";

function BellIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.73 21a2 2 0 0 1-3.46 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M19 12H5M5 12L12 19M5 12L12 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AppHeader({
  title = APP_NAME,
  showNotification = false,
  showBack = false,
  onBackClick,
  blend = false,
  action,
  className,
  style,
  foregroundColor,
}: AppHeaderProps) {
  const fg = foregroundColor ?? undefined;
  return (
    <header
      className={cn(
        "sticky top-0 z-40",
        "relative flex min-h-[52px] items-center justify-center px-4 py-3",
        blend
          ? "border-transparent bg-white/50 backdrop-blur-[2px]"
          : "border-b border-gray-100 bg-white",
        className
      )}
      style={style}
    >
      <div className="absolute left-4 top-1/2 z-10 flex -translate-y-1/2 items-center">
        {showBack ? (
          <button
            type="button"
            onClick={onBackClick}
            className="rounded-full p-1 transition-colors hover:bg-black/10"
            style={{ color: fg ?? undefined }}
            aria-label="Go back"
          >
            <BackIcon />
          </button>
        ) : null}
      </div>

      <h1
        className="max-w-[min(100%,18rem)] truncate px-10 text-center text-lg font-bold sm:max-w-[min(100%,22rem)]"
        style={{ color: fg ?? undefined }}
      >
        {title}
      </h1>

      <div className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 items-center gap-2">
        {action}
        {showNotification ? (
          <Link
            href={ROUTES.notifications}
            className="rounded-full p-2 transition-colors hover:bg-black/10"
            style={{ color: fg ?? undefined }}
            aria-label="Notifications"
          >
            <BellIcon />
          </Link>
        ) : null}
      </div>
    </header>
  );
}
