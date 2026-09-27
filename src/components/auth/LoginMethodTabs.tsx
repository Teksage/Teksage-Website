"use client";

import { useI18nConstants } from "@/hooks/useT";
import { AUTH_SCREEN, LOGIN_SCREEN } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { LoginMethodTab } from "@/types/login-flow";

type LoginMethodTabsProps = {
  active: LoginMethodTab;
  onChange: (tab: LoginMethodTab) => void;
};

export function LoginMethodTabs({ active, onChange }: LoginMethodTabsProps) {
  const LS = useI18nConstants(LOGIN_SCREEN);
  const emailActive = active === "email";

  return (
    <div
      className={AUTH_SCREEN.tabsTrackClassName}
      role="tablist"
      aria-label={LS.tabListAria}
    >
      <div
        className={cn(
          AUTH_SCREEN.tabPillClassName,
          emailActive && AUTH_SCREEN.tabPillEmailClassName
        )}
        aria-hidden
      />
      <button
        type="button"
        role="tab"
        aria-selected={active === "mobile"}
        className={cn(
          AUTH_SCREEN.tabClassName,
          active === "mobile"
            ? AUTH_SCREEN.tabActiveClassName
            : AUTH_SCREEN.tabIdleClassName
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
          AUTH_SCREEN.tabClassName,
          active === "email"
            ? AUTH_SCREEN.tabActiveClassName
            : AUTH_SCREEN.tabIdleClassName
        )}
        onClick={() => onChange("email")}
      >
        {LS.tabEmail}
      </button>
    </div>
  );
}
