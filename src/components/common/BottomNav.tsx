"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavTab {
  href: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
}

// SVG icons — mirrors Flutter bottom nav SVG assets
function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
        fill={active ? "var(--color-brand-primary)" : "#C7C7C7"}
      />
    </svg>
  );
}

function PanchangIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="4"
        width="18"
        height="17"
        rx="2"
        stroke={active ? "var(--color-brand-primary)" : "#C7C7C7"}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M8 2V6M16 2V6M3 10H21"
        stroke={active ? "var(--color-brand-primary)" : "#C7C7C7"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="12"
        cy="15"
        r="2"
        fill={active ? "var(--color-brand-primary)" : "#C7C7C7"}
      />
    </svg>
  );
}

function HoroscopeIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke={active ? "var(--color-brand-primary)" : "#C7C7C7"}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M12 3V12L17 17"
        stroke={active ? "var(--color-brand-primary)" : "#C7C7C7"}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SettingsIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke={active ? "var(--color-brand-primary)" : "#C7C7C7"}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M19.4 15A1.65 1.65 0 0 0 19 15.95L20.29 17.24C20.68 17.63 20.68 18.27 20.29 18.66L18.66 20.29C18.27 20.68 17.63 20.68 17.24 20.29L15.95 19A1.65 1.65 0 0 0 15 19.4L14.72 21C14.63 21.57 14.12 22 13.54 22H10.46C9.88 22 9.37 21.57 9.28 21L9 19.4A1.65 1.65 0 0 0 8.05 19L6.76 20.29C6.37 20.68 5.73 20.68 5.34 20.29L3.71 18.66C3.32 18.27 3.32 17.63 3.71 17.24L5 15.95A1.65 1.65 0 0 0 4.6 15L3 14.72C2.43 14.63 2 14.12 2 13.54V10.46C2 9.88 2.43 9.37 3 9.28L4.6 9A1.65 1.65 0 0 0 5 8.05L3.71 6.76C3.32 6.37 3.32 5.73 3.71 5.34L5.34 3.71C5.73 3.32 6.37 3.32 6.76 3.71L8.05 5A1.65 1.65 0 0 0 9 4.6L9.28 3C9.37 2.43 9.88 2 10.46 2H13.54C14.12 2 14.63 2.43 14.72 3L15 4.6A1.65 1.65 0 0 0 15.95 5L17.24 3.71C17.63 3.32 18.27 3.32 18.66 3.71L20.29 5.34C20.68 5.73 20.68 6.37 20.29 6.76L19 8.05A1.65 1.65 0 0 0 19.4 9L21 9.28C21.57 9.37 22 9.88 22 10.46V13.54C22 14.12 21.57 14.63 21 14.72L19.4 15Z"
        stroke={active ? "var(--color-brand-primary)" : "#C7C7C7"}
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

const TABS: NavTab[] = [
  {
    href: "/home",
    label: "Home",
    icon: (active) => <HomeIcon active={active} />,
  },
  {
    href: "/panchang",
    label: "Panchang",
    icon: (active) => <PanchangIcon active={active} />,
  },
  {
    href: "/horoscope",
    label: "Horoscope",
    icon: (active) => <HoroscopeIcon active={active} />,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: (active) => <SettingsIcon active={active} />,
  },
];

interface BottomNavProps {
  className?: string;
}

export function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "px-5 pb-safe",
        className
      )}
    >
      <div className="mx-auto max-w-lg bg-white rounded-2xl shadow-lg border border-gray-100 px-2 py-2">
        <div className="flex items-center justify-around">
          {TABS.map((tab) => {
            const active = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors",
                  active ? "opacity-100" : "opacity-60 hover:opacity-80"
                )}
              >
                {tab.icon(active)}
                <span
                  className={cn(
                    "text-xs font-semibold leading-none",
                    active ? "text-[var(--color-brand-primary)]" : "text-gray-400"
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
