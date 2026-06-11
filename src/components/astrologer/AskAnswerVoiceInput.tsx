"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChatVoiceWaveform } from "@/components/chat/ChatVoiceWaveform";
import { VoiceAnswerPlayer } from "@/components/common/VoiceAnswerPlayer";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { CHAT_ASSETS } from "@/lib/constants/chat-assets";
import { ASTRO_PORTAL_UI } from "@/lib/constants/astrologer-portal";
import { formatVoiceTimer } from "@/lib/format-voice-timer";
import { cn } from "@/lib/utils";
import type { AskAnswerVoiceInputProps } from "@/types/ui/astrologer-portal";

const VOICE = ASTRO_PORTAL_UI.askAnswerVoice;

export function AskAnswerVoiceInput({
  voiceFile,
  onVoiceFileChange,
  disabled = false,
}: AskAnswerVoiceInputProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recorder = useVoiceRecorder({
    disabled,
    maxRecordSec: VOICE.maxRecordSec,
    onComplete: (file) => {
      setError(null);
      onVoiceFileChange(file);
    },
    onError: (message) => setError(message),
  });

  useEffect(() => {
    if (!voiceFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(voiceFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [voiceFile]);

  function handleRemove() {
    onVoiceFileChange(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  if (recorder.isRecording) {
    return (
      <div className="rounded-xl border border-[var(--color-brand-primary)]/30 bg-[var(--color-brand-primary)]/5 p-3">
        <div className="flex min-h-12 items-center gap-2">
          <button
            type="button"
            onClick={recorder.cancelRecording}
            className="flex size-10 shrink-0 items-center justify-center"
            aria-label={VOICE.cancelRecordingAria}
          >
            <Image src={CHAT_ASSETS.deleteRecording} alt="" width={24} height={24} unoptimized />
          </button>
          <span className="shrink-0 text-lg font-medium tabular-nums text-black/40">
            {formatVoiceTimer(recorder.elapsedSec)}
          </span>
          <ChatVoiceWaveform samples={recorder.amplitudes} className="h-16 min-w-0 flex-1" />
          <button
            type="button"
            onClick={recorder.stopRecording}
            className={cn(
              "flex shrink-0 items-center justify-center rounded-full",
              "border-[1.5px] border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] px-3.5 py-4"
            )}
            aria-label={VOICE.stopRecordingAria}
          >
            <Image
              src={CHAT_ASSETS.stopRecording}
              alt=""
              width={20}
              height={20}
              unoptimized
              className="brightness-0 invert"
            />
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-[var(--color-brand-primary)]">
          {VOICE.recordingHint}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="audio/*"
          className="hidden"
          disabled={disabled}
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            setError(null);
            onVoiceFileChange(file);
          }}
        />
        {recorder.isSupported ? (
          <button
            type="button"
            disabled={disabled}
            onClick={() => void recorder.startRecording()}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-[var(--color-brand-primary)]",
              "px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-primary)] disabled:opacity-50"
            )}
          >
            <Image src={CHAT_ASSETS.mic} alt="" width={16} height={16} unoptimized />
            {VOICE.recordLabel}
          </button>
        ) : null}
        <button
          type="button"
          disabled={disabled}
          onClick={() => fileRef.current?.click()}
          className="rounded-full border border-black/20 px-3 py-1.5 text-xs font-medium text-black/60 disabled:opacity-50"
        >
          {VOICE.attachLabel}
        </button>
        {voiceFile ? (
          <button
            type="button"
            onClick={handleRemove}
            className="text-xs text-[var(--color-brand-error)]"
          >
            {VOICE.removeLabel}
          </button>
        ) : null}
      </div>
      {voiceFile ? (
        <div className="rounded-xl bg-neutral-50 p-3">
          <p className="mb-2 truncate text-xs text-black/60">{voiceFile.name}</p>
          {previewUrl ? <VoiceAnswerPlayer src={previewUrl} /> : null}
        </div>
      ) : null}
      {error ? <p className="text-xs text-[var(--color-brand-error)]">{error}</p> : null}
    </div>
  );
}
