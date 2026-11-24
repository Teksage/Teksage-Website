"use client";

import { ChatEnergyScoreRow } from "@/components/chat/ChatEnergyScoreRow";
import { ChatLandingHeaderMeta } from "@/components/chat/ChatLandingHeaderMeta";
import { ChatLandingMicHero } from "@/components/chat/ChatLandingMicHero";
import { ChatTryAskingSection } from "@/components/chat/ChatTryAskingSection";
import { CHAT_LANDING_LAYOUT } from "@/lib/constants/chat-landing-ui";
import { useChatLandingData } from "@/hooks/useChatLandingData";
import type { ChatLandingViewProps } from "@/types/ui/chat-landing";

export function ChatLandingView({
  onSelectQuestion,
  onSpeak,
  speakDisabled = false,
  compact = false,
}: ChatLandingViewProps) {
  const { loading, theme, themeIsPositive, scores, dasaSummary } =
    useChatLandingData();

  return (
    <div
      className={
        compact
          ? CHAT_LANDING_LAYOUT.landingRootCompact
          : CHAT_LANDING_LAYOUT.landingRoot
      }
    >
      <ChatLandingMicHero
        onSpeak={onSpeak}
        disabled={speakDisabled}
        compact={compact}
      />
      <ChatLandingHeaderMeta
        theme={theme}
        themeIsPositive={themeIsPositive}
        dasaSummary={dasaSummary}
        loading={loading}
        compact={compact}
      />
      <ChatEnergyScoreRow scores={loading ? {} : scores} compact={compact} />
      {compact ? null : (
        <ChatTryAskingSection onSelectQuestion={onSelectQuestion} />
      )}
    </div>
  );
}
