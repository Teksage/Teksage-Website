"use client";

import { useI18nConstants } from "@/hooks/useT";
import { ChatVoiceWaveform } from "@/components/chat/ChatVoiceWaveform";
import { CHAT_ASSETS } from "@/lib/constants/chat-assets";
import { CHAT_VOICE_COPY } from "@/lib/constants/chat-voice";
import { CHAT_VOICE_UI } from "@/lib/constants/chat-voice-ui";
import { formatVoiceTimer } from "@/lib/format-voice-timer";
import type { ChatRecordingComposerProps } from "@/types/ui/chat";
import { cn } from "@/lib/utils";

export function ChatRecordingComposer({
  elapsedSec,
  amplitudes,
  isTranscribing,
  onCancel,
  onStop,
  preferenceBar,
  embedded = false,
}: ChatRecordingComposerProps) {
  const VC = useI18nConstants(CHAT_VOICE_COPY);

  return (
    <div
      className={cn(
        CHAT_VOICE_UI.shell,
        embedded
          ? "pb-2 lg:pb-2"
          : "pb-[max(0.5rem,env(safe-area-inset-bottom,0px))]"
      )}
    >
      <div className={CHAT_VOICE_UI.row}>
        <button
          type="button"
          onClick={onCancel}
          disabled={isTranscribing}
          className={cn(CHAT_VOICE_UI.deleteButton, "disabled:opacity-50")}
          aria-label={VC.cancelRecordingAria}
        >
          <img src={CHAT_ASSETS.deleteRecording} alt="" className="size-6" />
        </button>
        <span className={CHAT_VOICE_UI.timer}>{formatVoiceTimer(elapsedSec)}</span>
        {isTranscribing ? (
          <p className={cn(CHAT_VOICE_UI.transcribing, "min-w-0 flex-1 px-2")}>
            {VC.transcribing}
          </p>
        ) : (
          <ChatVoiceWaveform samples={amplitudes} />
        )}
        <button
          type="button"
          onClick={onStop}
          disabled={isTranscribing}
          className={cn(CHAT_VOICE_UI.stopButton, "disabled:opacity-50")}
          aria-label={VC.stopRecordingAria}
        >
          <img
            src={CHAT_ASSETS.stopRecording}
            alt=""
            className="size-5 brightness-0 invert"
          />
        </button>
      </div>
      <p className={cn(CHAT_VOICE_UI.languagesHintWrap, CHAT_VOICE_UI.languagesHint)}>
        {VC.languagesHint}
      </p>
      {preferenceBar}
    </div>
  );
}
