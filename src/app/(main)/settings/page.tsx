"use client";

import Link from "next/link";
import { AppHeader } from "@/components/common/AppHeader";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface SettingsItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon: string;
  danger?: boolean;
}

export default function SettingsPage() {
  const { user, logout } = useAuth();

  const SETTINGS_ITEMS: SettingsItem[] = [
    { label: "Profile Details", href: "/profile", icon: "👤" },
    { label: "Subscription", href: "/subscription", icon: "⭐" },
    { label: "App Language", href: "/settings/language", icon: "🌐" },
    { label: "Push Notifications", href: "/settings/notifications", icon: "🔔" },
    { label: "FAQ", href: "/settings/faq", icon: "❓" },
    { label: "Support", href: "/settings/support", icon: "💬" },
    { label: "Privacy Policy", href: "/settings/privacy", icon: "🔒" },
    { label: "Terms & Conditions", href: "/settings/terms", icon: "📄" },
    { label: "Logout", onClick: logout, icon: "🚪", danger: true },
    { label: "Delete Account", href: "/settings/delete-account", icon: "🗑️", danger: true },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-brand-bg)]">
      <AppHeader title="Settings" />

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-4">
        {/* User info card */}
        {user && (
          <Link href="/profile" className="block mb-4">
            <div className="bg-white rounded-2xl px-4 py-4 flex items-center gap-4 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[var(--color-brand-primary)]/10 flex items-center justify-center">
                <span className="text-xl font-bold text-[var(--color-brand-primary)]">
                  {user.name?.[0]?.toUpperCase() ?? "?"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 truncate">{user.name}</p>
                <p className="text-sm text-gray-500 truncate">
                  {user.email ?? user.mobile ?? ""}
                </p>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </Link>
        )}

        {/* Settings list */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
          {SETTINGS_ITEMS.map((item) => {
            const content = (
              <div
                className={cn(
                  "flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors",
                  item.danger ? "text-[var(--color-brand-error)]" : "text-gray-800"
                )}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="flex-1 text-sm font-semibold">{item.label}</span>
                {!item.danger && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
              </div>
            );

            if (item.onClick) {
              return (
                <button key={item.label} onClick={item.onClick} className="w-full text-left">
                  {content}
                </button>
              );
            }

            return (
              <Link key={item.label} href={item.href ?? "#"}>
                {content}
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
