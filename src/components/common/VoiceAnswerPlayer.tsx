"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  VOICE_ANSWER_PLAYER_COPY,
  VOICE_ANSWER_PLAYER_UI,
} from "@/lib/constants/voice-answer-player-ui";
import { formatVoiceTimer } from "@/lib/format-voice-timer";
import { useVoiceAnswerSource } from "@/hooks/useVoiceAnswerSource";
import { cn } from "@/lib/utils";
import type { VoiceAnswerPlayerProps } from "@/types/ui/common";

function readDuration(audio: HTMLAudioElement): number {
  const value = audio.duration;
  return Number.isFinite(value) && value > 0 ? value : 0;
}

export function VoiceAnswerPlayer({
  src,
  className,
  durationSec = null,
}: VoiceAnswerPlayerProps) {
  const { playbackSrc, duration: probedDuration, loading } = useVoiceAnswerSource(src);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [elementDuration, setElementDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const effectiveDuration = Math.max(
    durationSec ?? 0,
    probedDuration ?? 0,
    elementDuration
  );

  useEffect(() => {
    if (!playbackSrc) return;

    const audio = new Audio(playbackSrc);
    audio.preload = "auto";
    audioRef.current = audio;
    setPlaying(false);
    setPosition(0);
    setElementDuration(0);

    const syncDuration = () => {
      const next = readDuration(audio);
      if (next > 0) setElementDuration(next);
    };

    const onTime = () => {
      setPosition(audio.currentTime);
      syncDuration();
    };

    const onEnd = () => {
      setPlaying(false);
      setPosition(0);
      audio.currentTime = 0;
    };

    audio.addEventListener("loadedmetadata", syncDuration);
    audio.addEventListener("durationchange", syncDuration);
    audio.addEventListener("canplaythrough", syncDuration);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    audio.load();

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", syncDuration);
      audio.removeEventListener("durationchange", syncDuration);
      audio.removeEventListener("canplaythrough", syncDuration);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
      audioRef.current = null;
    };
  }, [playbackSrc]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    if (effectiveDuration > 0 && position >= effectiveDuration) {
      audio.currentTime = 0;
      setPosition(0);
    }

    void audio
      .play()
      .then(() => {
        setPlaying(true);
        const next = readDuration(audio);
        if (next > 0) setElementDuration(next);
      })
      .catch(() => {
        setPlaying(false);
      });
  }, [effectiveDuration, playing, position]);

  const seek = useCallback(
    (clientX: number) => {
      const audio = audioRef.current;
      const track = trackRef.current;
      if (!audio || !track || effectiveDuration <= 0) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      audio.currentTime = ratio * effectiveDuration;
      setPosition(audio.currentTime);
    },
    [effectiveDuration]
  );

  if (loading || !playbackSrc) {
    return (
      <div className={cn(VOICE_ANSWER_PLAYER_UI.skeleton, className)} aria-hidden />
    );
  }

  const progress = effectiveDuration > 0 ? (position / effectiveDuration) * 100 : 0;

  return (
    <div className={cn(VOICE_ANSWER_PLAYER_UI.shell, className)}>
      <div className={VOICE_ANSWER_PLAYER_UI.row}>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={
            playing ? VOICE_ANSWER_PLAYER_COPY.pauseAria : VOICE_ANSWER_PLAYER_COPY.playAria
          }
          className={VOICE_ANSWER_PLAYER_UI.playBtn}
        >
          {playing ? (
            <span className="text-sm leading-none">❚❚</span>
          ) : (
            <span className="ml-0.5 text-base leading-none">▶</span>
          )}
        </button>

        <div className={VOICE_ANSWER_PLAYER_UI.progressWrap}>
          <div
            ref={trackRef}
            role="slider"
            aria-label={VOICE_ANSWER_PLAYER_COPY.seekAria}
            aria-valuemin={0}
            aria-valuemax={effectiveDuration}
            aria-valuenow={position}
            tabIndex={0}
            className={VOICE_ANSWER_PLAYER_UI.progressTrack}
            onClick={(e) => seek(e.clientX)}
            onKeyDown={(e) => {
              const audio = audioRef.current;
              if (!audio || effectiveDuration <= 0) return;
              const step = effectiveDuration * 0.05;
              if (e.key === "ArrowRight") {
                audio.currentTime = Math.min(effectiveDuration, audio.currentTime + step);
                setPosition(audio.currentTime);
              }
              if (e.key === "ArrowLeft") {
                audio.currentTime = Math.max(0, audio.currentTime - step);
                setPosition(audio.currentTime);
              }
            }}
          >
            <div
              className={VOICE_ANSWER_PLAYER_UI.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={VOICE_ANSWER_PLAYER_UI.timeRow}>
            <span className={VOICE_ANSWER_PLAYER_UI.timeLabel}>
              {formatVoiceTimer(position)}
            </span>
            <span className={VOICE_ANSWER_PLAYER_UI.timeLabel}>
              {formatVoiceTimer(effectiveDuration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
