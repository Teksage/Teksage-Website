"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { clearAskAstrologerFlow } from "@/lib/ask-astrologer-session";
import { ROUTES } from "@/lib/constants/routes";
import { ASK_ASTROLOGER_SCREEN, ASK_ASTROLOGER_UI } from "@/lib/constants/chat-ask-astrologer";

export default function AskAstrologerConfirmationPage() {
  const router = useRouter();

  useEffect(() => {
    // Clean up flow state after payment is complete
    clearAskAstrologerFlow();
  }, []);

  return (
    <div className={ASK_ASTROLOGER_UI.page}>
      <AppHeader title={ASK_ASTROLOGER_SCREEN.confirmationTitle} />
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
        {/* Success icon */}
        <div className="flex size-20 items-center justify-center rounded-full bg-[var(--color-brand-primary)]/10">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-10 text-[var(--color-brand-primary)]"
            aria-hidden
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[var(--color-brand-black)]">
          {ASK_ASTROLOGER_SCREEN.confirmationHeading}
        </h1>
        <p className="text-sm text-black/60">
          {ASK_ASTROLOGER_SCREEN.confirmationBody}
        </p>

        <button
          type="button"
          onClick={() =>
            router.push(`${ROUTES.notifications}?tab=consultation`)
          }
          className="mt-2 text-sm font-semibold text-[var(--color-brand-primary)] underline underline-offset-2"
        >
          {ASK_ASTROLOGER_SCREEN.confirmationNotificationsLink}
        </button>
      </div>

      <footer className="sticky bottom-0 border-t border-black/10 bg-white px-5 py-4">
        <button
          type="button"
          onClick={() => router.push(ROUTES.chat)}
          className="w-full rounded-2xl bg-[var(--color-brand-primary)] py-4 text-sm font-semibold text-white transition-opacity active:opacity-80"
        >
          {ASK_ASTROLOGER_SCREEN.confirmationDone}
        </button>
      </footer>
    </div>
  );
}
