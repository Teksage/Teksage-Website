"use client";

import { useI18nConstants } from "@/hooks/useT";
import Link from "next/link";
import { ChatPageView } from "@/components/chat/ChatPageView";
import { HOME_DASHBOARD_SIDEBAR } from "@/lib/constants/home-dashboard-sidebar";
import { ROUTES } from "@/lib/constants/routes";
import { buildLoginRedirectPath } from "@/lib/login-redirect";
import type { HomeChatPanelProps } from "@/types";
import { cn } from "@/lib/utils";

/** Desktop home main pane — embedded AI chat (`lg+` only). */
export function HomeChatPanel({ isLoggedIn, className }: HomeChatPanelProps) {
  const HDS = useI18nConstants(HOME_DASHBOARD_SIDEBAR);
  if (!isLoggedIn) {
    return (
      <aside
        className={cn(
          "hidden h-full min-h-0 flex-col bg-white lg:flex",
          className
        )}
      >
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-lg font-bold text-[var(--color-brand-primary)]">
            {HDS.chatLoginTitle}
          </p>
          <p className="text-sm text-neutral-600">{HDS.chatLoginHint}</p>
          <Link
            href={buildLoginRedirectPath(ROUTES.home)}
            className="inline-flex rounded-full bg-[var(--color-brand-primary)] px-8 py-2.5 text-sm font-semibold text-white"
          >
            {HDS.chatLoginCta}
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "hidden h-full min-h-0 flex-col overflow-hidden bg-white lg:flex",
        className
      )}
    >
      <ChatPageView embedded />
    </aside>
  );
}
