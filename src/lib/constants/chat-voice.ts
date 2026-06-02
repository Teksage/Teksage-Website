/** Voice input — mirrors Flutter `chatField.dart` + `RecordTimer` (20s cap). */

export const CHAT_VOICE_MAX_RECORD_SEC = 20;

export const CHAT_VOICE_RECORDER_MIME_CANDIDATES = [
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/mp4",
  "audio/ogg;codecs=opus",
] as const;

export const CHAT_VOICE_COPY = {
  permissionDenied: "Microphone permission is required for voice input.",
  notSupported: "Voice recording is not supported in this browser.",
  transcribeFailed: "Could not transcribe audio. Please try again.",
  recording: "Recording… tap mic to stop",
  transcribing: "Converting speech to text…",
  speechConverting: "Converting this into speech for you…",
  playAria: "Play reply audio",
  pauseAria: "Pause reply audio",
} as const;
