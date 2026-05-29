"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";
import { cn } from "@/lib/utils";
import type { AuthGatedLinkProps } from "@/types/ui/auth-gated-link";

/**
 * Logged-in: normal navigation. Logged-out: Flutter `LoginPromptDialog` (no `/login` jump).
 */
export function AuthGatedLink({
  href,
  returnPath,
  redirectHomeOnClose = false,
  className,
  inline = false,
  children,
  onClick,
  "aria-label": ariaLabel,
}: AuthGatedLinkProps) {
  const { guardNavigation, isAuthenticated } = useAuthNavigation();
  const destination = returnPath ?? href;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Token lives in localStorage — defer auth branch until after mount to avoid SSR mismatch.
  if (mounted && isAuthenticated) {
    return (
      <Link href={href} className={className} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={cn(!inline && "block w-full text-left", className)}
      aria-label={ariaLabel}
      onClick={(e) => {
        onClick?.(e);
        guardNavigation(destination, { redirectHomeOnClose });
      }}
    >
      {children}
    </button>
  );
}
