"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/common/Loader";
import { MatchMakingDetailsLayout } from "@/components/match-making/MatchMakingDetailsLayout";
import { MatchMakingShell } from "@/components/match-making/MatchMakingShell";
import { buttonVariants } from "@/components/ui/button";
import { MATCH_MAKING_SCREEN } from "@/lib/constants/match-making-screen";
import { PAGE_SHELL, ROUTES } from "@/lib/constants";
import { buildLoginRedirectPath } from "@/lib/login-redirect";
import { cn } from "@/lib/utils";
import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import { parseCompatibilityGet } from "@/lib/prediction-api-parse";
import { useAuthStore } from "@/store/auth.store";
import type { MatchMakingExisting } from "@/types/match-making";

export function MatchMakingDetailsView() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [existing, setExisting] = useState<MatchMakingExisting | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;
    let c = false;
    http
      .get(API_ENDPOINTS.matchMakingCompatibility)
      .then(({ data }) => {
        if (c) return;
        const { existing: ex } = parseCompatibilityGet(data);
        setExisting(ex && ex.matchMakingId ? ex : null);
      })
      .catch(() => {
        if (!c) setExisting(null);
      })
      .finally(() => {
        if (!c) setLoading(false);
      });
    return () => {
      c = true;
    };
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className={cn(PAGE_SHELL.column, PAGE_SHELL.root, PAGE_SHELL.flutterFullBleed)}>
        <MatchMakingShell className="flex min-h-dvh flex-col items-center justify-center px-5">
          <p className="text-center font-semibold text-white">{MATCH_MAKING_SCREEN.loginTitle}</p>
          <Link
            href={buildLoginRedirectPath(ROUTES.matchmakingDetails)}
            className={cn(buttonVariants(), "mt-6 inline-flex rounded-full")}
          >
            {MATCH_MAKING_SCREEN.loginCta}
          </Link>
        </MatchMakingShell>
      </div>
    );
  }

  if (loading) {
    return (
      <MatchMakingShell className="flex min-h-dvh items-center justify-center">
        <Loader variant="dots" size="lg" />
      </MatchMakingShell>
    );
  }

  if (!existing) {
    return (
      <MatchMakingShell className="flex min-h-dvh flex-col items-center justify-center px-5 text-center text-white">
        <p className="text-sm">{MATCH_MAKING_SCREEN.noMatchYet}</p>
        <Link
          href={ROUTES.matchmaking}
          className={cn(buttonVariants(), "mt-4 inline-flex rounded-full")}
        >
          {MATCH_MAKING_SCREEN.newMatchCta}
        </Link>
      </MatchMakingShell>
    );
  }

  return (
    <div className={cn(PAGE_SHELL.flutterFullBleed)}>
      <MatchMakingDetailsLayout
        data={existing}
        onBackClick={() => router.back()}
        onRegenerate={() => router.push(ROUTES.matchmaking)}
        onExpertConnect={() => router.push(ROUTES.consultation)}
      />
    </div>
  );
}
