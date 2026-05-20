"use client";

import { useState } from "react";
import { ChatAvatarPicker } from "@/components/chat/ChatAvatarPicker";
import { ChatOnboardingHeader } from "@/components/chat/ChatOnboardingHeader";
import { Button } from "@/components/ui/button";
import { CHAT_PREFERENCES } from "@/lib/constants/chat-preferences";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";
import { cn } from "@/lib/utils";
import type { ChatAvatarOnboardingProps } from "@/types/ui/chat";

export function ChatAvatarOnboarding({
  embedded = false,
  initialIndex,
  onContinue,
  onBack,
}: ChatAvatarOnboardingProps) {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  return (
    <div
      className={cn(
        embedded ? CHAT_LAYOUT.onboardingRootEmbedded : CHAT_LAYOUT.onboardingRootStandalone
      )}
    >
      <ChatOnboardingHeader onBack={onBack} />

      <div className={CHAT_LAYOUT.onboardingContent}>
        <div>
          <h1 className={CHAT_LAYOUT.onboardingTitle}>
            {CHAT_PREFERENCES.avatarOnboardingTitle}
          </h1>
          <div className="mt-8 lg:mt-10">
            <ChatAvatarPicker
              selectedIndex={selectedIndex}
              onSelectIndex={setSelectedIndex}
              chooseLabel={CHAT_PREFERENCES.avatarSheetChooseLabel}
            />
          </div>
        </div>

        <Button
          type="button"
          onClick={() => onContinue(selectedIndex)}
          className="h-auto w-full rounded-full py-3.5 text-lg font-semibold lg:max-w-sm lg:self-center"
        >
          {CHAT_PREFERENCES.continueCta}
        </Button>
      </div>
    </div>
  );
}
