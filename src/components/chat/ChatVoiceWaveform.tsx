import { CHAT_VOICE_UI, CHAT_VOICE_WAVEFORM_BAR_COUNT } from "@/lib/constants/chat-voice-ui";
import { cn } from "@/lib/utils";

export function ChatVoiceWaveform({
  samples,
  className,
}: {
  samples: number[];
  className?: string;
}) {
  const bars = samples.length ? samples : Array(CHAT_VOICE_WAVEFORM_BAR_COUNT).fill(0.1);

  return (
    <div className={cn(CHAT_VOICE_UI.waveformWrap, className)} aria-hidden>
      <div className="flex h-16 w-full max-w-md items-center justify-center gap-0.5 px-1">
        {bars.map((level, index) => (
          <span
            key={index}
            className={CHAT_VOICE_UI.waveformBar}
            style={{ height: `${Math.round(level * 64)}px` }}
          />
        ))}
      </div>
    </div>
  );
}
