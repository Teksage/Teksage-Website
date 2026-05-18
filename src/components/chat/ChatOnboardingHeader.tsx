"use client";

import { CHAT_PREFERENCE_ASSETS, CHAT_PREFERENCES } from "@/lib/constants/chat-preferences";
import { CHAT_SCREEN } from "@/lib/constants/chat-screen";

export function ChatOnboardingHeader({ onBack }: { onBack: () => void }) {
  return (
    <header className="relative flex items-center px-3 pt-[max(0.5rem,env(safe-area-inset-top,0px))] pb-2">
      <button
        type="button"
        onClick={onBack}
        className="flex size-10 shrink-0 items-center justify-center"
        aria-label={CHAT_SCREEN.backAria}
      >
        <img src={CHAT_PREFERENCE_ASSETS.onboardingBack} alt="" className="size-5" />
      </button>
      <h1 className="pointer-events-none absolute inset-x-12 text-center text-xl font-bold">
        {CHAT_PREFERENCES.onboardingAppTitle}
      </h1>
    </header>
  );
}
