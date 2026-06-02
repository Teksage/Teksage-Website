"use client";

import { useI18nConstants } from "@/hooks/useT";
import { LOGIN_SCREEN } from "@/lib/constants/login-screen";
import { cn } from "@/lib/utils";
import type { LoginMethodTab } from "@/types/login-flow";

type LoginMethodTabsProps = {
  active: LoginMethodTab;
  onChange: (tab: LoginMethodTab) => void;
};

export function LoginMethodTabs({ active, onChange }: LoginMethodTabsProps) {
  const LS = useI18nConstants(LOGIN_SCREEN);

  return (
    <div
      className="mb-6 flex rounded-xl bg-neutral-100 p-1"
      role="tablist"
      aria-label={LS.tabListAria}
    >
      <button
        type="button"
        role="tab"
        aria-selected={active === "mobile"}
        className={cn(
          "flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors",
          active === "mobile"
            ? "bg-white text-neutral-900 shadow-sm"
            : "text-neutral-500"
        )}
        onClick={() => onChange("mobile")}
      >
        {LS.tabMobile}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={active === "email"}
        className={cn(
          "flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors",
          active === "email"
            ? "bg-white text-neutral-900 shadow-sm"
            : "text-neutral-500"
        )}
        onClick={() => onChange("email")}
      >
        {LS.tabEmail}
      </button>
    </div>
  );
}
