import {
  CHAT_VOICE_RECORDER_MIME_CANDIDATES,
} from "@/lib/constants/chat-voice";

export function pickVoiceRecorderMimeType(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  for (const mime of CHAT_VOICE_RECORDER_MIME_CANDIDATES) {
    if (MediaRecorder.isTypeSupported(mime)) return mime;
  }
  return undefined;
}

/** Map recorder MIME to an API-accepted file extension. */
export function voiceBlobFilename(mimeType: string): string {
  if (mimeType.includes("mp4")) return "recording.m4a";
  if (mimeType.includes("ogg")) return "recording.ogg";
  return "recording.webm";
}

export function isVoiceRecordingSupported(): boolean {
  return (
    typeof navigator !== "undefined" &&
    Boolean(navigator.mediaDevices?.getUserMedia) &&
    pickVoiceRecorderMimeType() != null
  );
}
