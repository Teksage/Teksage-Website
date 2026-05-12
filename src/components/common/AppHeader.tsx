"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";

interface AppHeaderProps {
  title?: string;
  showNotification?: boolean;
  showBack?: boolean;
  onBackClick?: () => void;
  className?: string;
}

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
  className,
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-white border-b border-gray-100",
        "px-4 py-3 flex items-center justify-between",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={onBackClick}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
            aria-label="Go back"
          >
            <BackIcon />
          </button>
        )}
        <h1 className="text-lg font-bold text-gray-900">{title}</h1>
      </div>

      {showNotification && (
        <Link
          href="/notifications"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
          aria-label="Notifications"
        >
          <BellIcon />
        </Link>
      )}
    </header>
  );
}
