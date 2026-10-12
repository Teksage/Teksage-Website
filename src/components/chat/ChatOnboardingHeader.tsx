"use client";

import { useI18nConstants } from "@/hooks/useT";
import { CHAT_PREFERENCES } from "@/lib/constants/chat-preferences";
import { CHAT_LAYOUT, CHAT_SCREEN } from "@/lib/constants/chat-screen";

export function ChatOnboardingHeader({ onBack }: { onBack: () => void }) {
  const CS = useI18nConstants(CHAT_SCREEN);
  const CP = useI18nConstants(CHAT_PREFERENCES);
  const ui = CHAT_LAYOUT;
  return (
    <header className={ui.onboardingHeader}>
      <button type="button" onClick={onBack} className={ui.onboardingBack} aria-label={CS.backAria}>
        <svg viewBox="0 0 24 24" className={ui.onboardingBackIcon} fill="none" aria-hidden>
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <h1 className={ui.onboardingHeaderTitle}>{CP.onboardingAppTitle}</h1>
    </header>
  );
}
