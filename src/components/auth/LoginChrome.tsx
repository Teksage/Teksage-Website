"use client";

import { useRouter } from "next/navigation";
import type { LoginBackButtonProps } from "@/types";

export function LoginBackButton({ onNavigateBack }: LoginBackButtonProps) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => (onNavigateBack ? onNavigateBack() : router.back())}
      className="absolute left-4 top-4 z-10 rounded-full p-2 text-neutral-900 hover:bg-black/5"
      aria-label="Go back"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M19 12H5M5 12l7 7M5 12l7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export function LoginOrSignupHeading() {
  return (
    <div className="mb-8 flex items-center gap-3">
      <div className="h-px flex-1 border-t border-dashed border-neutral-400/90" />
      <h1 className="whitespace-nowrap text-xl font-bold tracking-tight text-neutral-900">
        Login or Sign up
      </h1>
      <div className="h-px flex-1 border-t border-dashed border-neutral-400/90" />
    </div>
  );
}
