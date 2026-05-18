"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatOnboardingHeader } from "@/components/chat/ChatOnboardingHeader";
import { ChatStyleOptionCard } from "@/components/chat/ChatStyleOptionCard";
import { Button } from "@/components/ui/button";
import {
  CHAT_PREFERENCES,
  CHAT_STYLE_OPTIONS,
  type ChatStyleFormat,
} from "@/lib/constants/chat-preferences";
import { cn } from "@/lib/utils";
import type { ChatStyleOnboardingProps } from "@/types/ui/chat";

export function ChatStyleOnboarding({ onContinue }: ChatStyleOnboardingProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<ChatStyleFormat | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      <ChatOnboardingHeader onBack={() => router.back()} />

      <div className="flex flex-1 flex-col justify-between px-5 pb-10 pt-6">
        <div>
          <h1 className="text-center text-2xl font-semibold">
            {CHAT_PREFERENCES.styleOnboardingTitle}
          </h1>
          <div className="mt-10 space-y-5">
            {CHAT_STYLE_OPTIONS.map((option) => (
              <ChatStyleOptionCard
                key={option.format}
                label={option.label}
                hint={option.hint}
                selected={selected === option.format}
                onSelect={() => setSelected(option.format)}
              />
            ))}
          </div>
        </div>

        <Button
          type="button"
          disabled={!selected}
          onClick={() => selected && onContinue(selected)}
          className={cn(
            "h-auto w-full rounded-full py-3.5 text-lg font-semibold",
            !selected && "bg-black/20 text-white hover:bg-black/20"
          )}
        >
          {CHAT_PREFERENCES.continueCta}
        </Button>
      </div>
    </div>
  );
}
