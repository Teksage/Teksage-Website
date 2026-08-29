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
}: ChatLandingViewProps) {
  const { loading, theme, themeIsPositive, scores, dasaSummary } =
    useChatLandingData();

  return (
    <div className={CHAT_LANDING_LAYOUT.landingRoot}>
      <ChatLandingMicHero onSpeak={onSpeak} disabled={speakDisabled} />
      <ChatLandingHeaderMeta
        theme={theme}
        themeIsPositive={themeIsPositive}
        dasaSummary={dasaSummary}
        loading={loading}
      />
      <ChatEnergyScoreRow scores={loading ? {} : scores} />
      <ChatTryAskingSection onSelectQuestion={onSelectQuestion} />
    </div>
  );
}
