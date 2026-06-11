"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { VoiceAnswerPlayerProps } from "@/types/ui/common";

function isLocalBlobUrl(src: string): boolean {
  return src.startsWith("blob:");
}

/** Native audio controls; remote files are fetched as blobs so duration loads before play. */
export function VoiceAnswerPlayer({ src, className }: VoiceAnswerPlayerProps) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playbackSrc, setPlaybackSrc] = useState<string | null>(
    isLocalBlobUrl(src) ? src : null
  );

  useEffect(() => {
    if (isLocalBlobUrl(src)) {
      setPlaybackSrc(src);
      return;
    }

    let blobUrl: string | null = null;
    let cancelled = false;
    setPlaybackSrc(null);

    void (async () => {
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error("audio fetch failed");
        const blob = await res.blob();
        if (cancelled) return;
        blobUrl = URL.createObjectURL(blob);
        setPlaybackSrc(blobUrl);
      } catch {
        if (!cancelled) setPlaybackSrc(src);
      }
    })();

    return () => {
      cancelled = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [src]);

  useEffect(() => {
    const audio = ref.current;
    if (!audio || !playbackSrc) return;
    audio.preload = "metadata";
    audio.load();
  }, [playbackSrc]);

  if (!playbackSrc) {
    return (
      <div
        className={cn("h-10 w-full animate-pulse rounded-full bg-black/10", className)}
        aria-hidden
      />
    );
  }

  return (
    <audio
      ref={ref}
      key={playbackSrc}
      controls
      preload="metadata"
      src={playbackSrc}
      className={cn("w-full", className)}
    />
  );
}
