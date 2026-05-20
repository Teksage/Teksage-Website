"use client";

import { useI18nConstants } from "@/hooks/useT";
import { CHAT_PREFERENCE_ASSETS, CHAT_PREFERENCES } from "@/lib/constants/chat-preferences";
import { CHAT_SCREEN } from "@/lib/constants/chat-screen";

export function ChatOnboardingHeader({ onBack }: { onBack: () => void }) {
  const CS = useI18nConstants(CHAT_SCREEN);
  const CP = useI18nConstants(CHAT_PREFERENCES);
  return (
    <header className="relative flex items-center px-3 pt-[max(0.5rem,env(safe-area-inset-top,0px))] pb-2">
      <button
        type="button"
        onClick={onBack}
        className="flex size-10 shrink-0 items-center justify-center"
        aria-label={CS.backAria}
      >
        <img src={CHAT_PREFERENCE_ASSETS.onboardingBack} alt="" className="size-5" />
      </button>
      <h1 className="pointer-events-none absolute inset-x-12 text-center text-xl font-bold">
        {CP.onboardingAppTitle}
      </h1>
    </header>
  );
}
