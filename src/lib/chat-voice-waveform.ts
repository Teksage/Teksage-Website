import { CHAT_VOICE_WAVEFORM_BAR_COUNT } from "@/lib/constants/chat-voice-ui";

export function createSilentWaveform(
  length = CHAT_VOICE_WAVEFORM_BAR_COUNT
): number[] {
  return Array.from({ length }, () => 0.1);
}

export function normalizeAudioLevel(value: number): number {
  const silence = 0.02;
  if (value < silence) return 0.1;
  if (value > 1) return 1;
  return Math.max(0.1, value);
}

export function pushWaveformSample(
  samples: number[],
  next: number
): number[] {
  return [...samples.slice(1), normalizeAudioLevel(next)];
}
