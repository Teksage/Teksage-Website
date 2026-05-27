"use client";

import { useEffect, useRef, useState } from "react";
import { chatReplyAudioObjectUrl } from "@/lib/chat-audio-decode";
import { useI18nConstants } from "@/hooks/useT";
import { CHAT_VOICE_COPY } from "@/lib/constants/chat-voice";
import { cn } from "@/lib/utils";

type ChatAudioPlayerProps = {
  audioBase64: string;
};

function blobUrlFromBase64(base64: string): string {
  return chatReplyAudioObjectUrl(base64);
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const mm = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const ss = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mm}:${ss}`;
}

export function ChatAudioPlayer({ audioBase64 }: ChatAudioPlayerProps) {
  const VC = useI18nConstants(CHAT_VOICE_COPY);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);

    const url = blobUrlFromBase64(audioBase64);
    urlRef.current = url;
    const audio = new Audio(url);
    audioRef.current = audio;
    setPlaying(false);
    setPosition(0);
    setDuration(0);

    const onMeta = () => setDuration(audio.duration || 0);
    const onTime = () => setPosition(audio.currentTime);
    const onEnd = () => {
      setPlaying(false);
      setPosition(0);
      audio.currentTime = 0;
    };

    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
      audioRef.current = null;
    };
  }, [audioBase64]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    if (duration > 0 && position >= duration) {
      audio.currentTime = 0;
      setPosition(0);
    }
    void audio.play();
    setPlaying(true);
  }

  const remaining = Math.max(0, duration - position);
  const progress = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <div className="mt-2.5 rounded-xl border border-white/15 bg-white/10 p-2">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-1.5 flex justify-between text-2xs text-white/90">
            <span>{formatTime(remaining)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? VC.pauseAria : VC.playAria}
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full bg-white",
            "text-[var(--color-brand-primary)]"
          )}
        >
          {playing ? (
            <span className="text-lg leading-none">❚❚</span>
          ) : (
            <span className="ml-0.5 text-xl leading-none">▶</span>
          )}
        </button>
      </div>
    </div>
  );
}
