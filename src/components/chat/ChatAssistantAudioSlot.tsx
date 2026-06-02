"use client";

import { useEffect, useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import { ChatAudioPlayer } from "@/components/chat/ChatAudioPlayer";
import { CHAT_VOICE_COPY } from "@/lib/constants/chat-voice";

type ChatAssistantAudioSlotProps = {
  audioBase64?: string | null;
  audioPending?: boolean;
};

export function ChatAssistantAudioSlot({
  audioBase64,
  audioPending,
}: ChatAssistantAudioSlotProps) {
  const VC = useI18nConstants(CHAT_VOICE_COPY);
  const [showPending, setShowPending] = useState(Boolean(audioPending));

  useEffect(() => {
    if (audioBase64) {
      setShowPending(false);
      return;
    }
    if (!audioPending) {
      setShowPending(false);
      return;
    }
    setShowPending(true);
    const timer = window.setTimeout(() => setShowPending(false), 5000);
    return () => window.clearTimeout(timer);
  }, [audioBase64, audioPending]);

  if (audioBase64) {
    return <ChatAudioPlayer audioBase64={audioBase64} />;
  }

  if (!showPending) return null;

  return (
    <div className="mt-2.5 rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-center text-xs font-semibold text-white">
      {VC.speechConverting}
    </div>
  );
}
