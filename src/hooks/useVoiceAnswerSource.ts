"use client";

import { useEffect, useState } from "react";
import { readAudioDurationFromUrl, readAudioDurationSeconds } from "@/lib/audio-duration";
import { resolveVoicePlaybackUrl } from "@/lib/voice-audio-proxy";

function isLocalBlobUrl(src: string): boolean {
  return src.startsWith("blob:");
}

export type VoiceAnswerSourceState = {
  playbackSrc: string | null;
  duration: number | null;
  loading: boolean;
};

/** Loads voice audio via same-origin proxy when needed and decodes duration. */
export function useVoiceAnswerSource(src: string): VoiceAnswerSourceState {
  const [state, setState] = useState<VoiceAnswerSourceState>(() => ({
    playbackSrc: isLocalBlobUrl(src) ? src : null,
    duration: null,
    loading: !isLocalBlobUrl(src),
  }));

  useEffect(() => {
    let blobUrl: string | null = null;
    let cancelled = false;
    const playbackTarget = resolveVoicePlaybackUrl(src);

    async function attachDuration(playback: string, duration: number | null) {
      if (cancelled) return;
      setState((prev) => ({ ...prev, playbackSrc: playback, duration, loading: false }));
    }

    async function resolveFromBlob(blob: Blob, playback: string) {
      if (cancelled) return;
      setState({ playbackSrc: playback, duration: null, loading: false });
      const duration = await readAudioDurationSeconds(blob);
      if (cancelled) return;
      setState((prev) => ({ ...prev, duration }));
    }

    if (isLocalBlobUrl(src)) {
      setState({ playbackSrc: src, duration: null, loading: true });
      void fetch(src)
        .then((res) => res.blob())
        .then((blob) => resolveFromBlob(blob, src))
        .catch(() => {
          void attachDuration(src, null);
        });
      return () => {
        cancelled = true;
      };
    }

    setState({ playbackSrc: null, duration: null, loading: true });

    void (async () => {
      try {
        const res = await fetch(playbackTarget);
        if (!res.ok) throw new Error("audio fetch failed");
        const blob = await res.blob();
        if (cancelled) return;
        blobUrl = URL.createObjectURL(blob);
        await resolveFromBlob(blob, blobUrl);
      } catch {
        if (cancelled) return;
        await attachDuration(playbackTarget, null);
        const duration = await readAudioDurationFromUrl(playbackTarget);
        if (cancelled) return;
        setState((prev) => ({ ...prev, duration }));
      }
    })();

    return () => {
      cancelled = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [src]);

  return state;
}
