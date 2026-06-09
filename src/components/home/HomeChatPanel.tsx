"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChatPageView } from "@/components/chat/ChatPageView";
import { HomeChatEmbedHeader } from "@/components/home/HomeChatEmbedHeader";
import { useHydratedLoggedIn } from "@/hooks/useHydratedLoggedIn";
import { buildLoginRedirectPath } from "@/lib/login-redirect";
import { ROUTES } from "@/lib/constants/routes";
import type { HomeChatPanelProps } from "@/types";
import { cn } from "@/lib/utils";

/** Desktop home main pane — embedded AI chat (`lg+` only). */
export function HomeChatPanel({ className }: HomeChatPanelProps) {
  const router = useRouter();
  const { ready: authReady, loggedIn } = useHydratedLoggedIn();

  useEffect(() => {
    if (!authReady || loggedIn) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const redirect = () => {
      if (mq.matches) router.replace(buildLoginRedirectPath(ROUTES.home));
    };
    redirect();
    mq.addEventListener("change", redirect);
    return () => mq.removeEventListener("change", redirect);
  }, [authReady, loggedIn, router]);

  if (!authReady || !loggedIn) {
    return (
      <aside
        className={cn(
          "hidden h-full min-h-0 flex-col bg-white lg:flex",
          className
        )}
        aria-hidden
      />
    );
  }

  return (
    <aside
      className={cn(
        "hidden h-full min-h-0 flex-col overflow-hidden bg-white lg:flex",
        className
      )}
    >
      <ChatPageView embedded embedHeader={<HomeChatEmbedHeader />} />
    </aside>
  );
}
