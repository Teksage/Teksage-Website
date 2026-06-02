"use client";

import type { ReactNode } from "react";
import { useLoginPrompt } from "@/contexts/LoginPromptContext";
import type { OpenLoginPromptOptions } from "@/contexts/LoginPromptContext";
import { cn } from "@/lib/utils";

type LoginPromptButtonProps = OpenLoginPromptOptions & {
  children: ReactNode;
  className?: string;
};

/** Opens Flutter-style login dialog; navigates to `/login` only after Login Now. */
export function LoginPromptButton({
  children,
  className,
  returnPath,
  redirectHomeOnClose,
}: LoginPromptButtonProps) {
  const { openLoginPrompt } = useLoginPrompt();

  return (
    <button
      type="button"
      className={cn(className)}
      onClick={() => openLoginPrompt({ returnPath, redirectHomeOnClose })}
    >
      {children}
    </button>
  );
}
