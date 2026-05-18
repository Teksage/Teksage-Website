"use client";

import { useState } from "react";
import { ChatAvatarPicker } from "@/components/chat/ChatAvatarPicker";
import { ChatOnboardingHeader } from "@/components/chat/ChatOnboardingHeader";
import { Button } from "@/components/ui/button";
import { CHAT_PREFERENCES } from "@/lib/constants/chat-preferences";
import type { ChatAvatarOnboardingProps } from "@/types/ui/chat";

export function ChatAvatarOnboarding({
  initialIndex,
  onContinue,
  onBack,
}: ChatAvatarOnboardingProps) {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      <ChatOnboardingHeader onBack={onBack} />

      <div className="flex flex-1 flex-col justify-between pb-10 pt-6">
        <div>
          <h1 className="px-5 text-center text-2xl font-semibold">
            {CHAT_PREFERENCES.avatarOnboardingTitle}
          </h1>
          <div className="mt-8">
            <ChatAvatarPicker
              selectedIndex={selectedIndex}
              onSelectIndex={setSelectedIndex}
              chooseLabel={CHAT_PREFERENCES.avatarSheetChooseLabel}
            />
          </div>
        </div>

        <div className="px-5">
          <Button
            type="button"
            onClick={() => onContinue(selectedIndex)}
            className="h-auto w-full rounded-full py-3.5 text-lg font-semibold"
          >
            {CHAT_PREFERENCES.continueCta}
          </Button>
        </div>
      </div>
    </div>
  );
}
