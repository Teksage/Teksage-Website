"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import {
  CHAT_VOICE_COPY,
  CHAT_VOICE_MAX_RECORD_SEC,
} from "@/lib/constants/chat-voice";
import {
  isVoiceRecordingSupported,
  pickVoiceRecorderMimeType,
} from "@/lib/chat-voice-recorder";
import { transcribeChatAudio } from "@/lib/services/chat-transcribe";

type UseChatVoiceInputOptions = {
  language: string;
  disabled: boolean;
  onTranscript: (text: string) => void;
  onError: (message: string) => void;
};

export function useChatVoiceInput({
  language,
  disabled,
  onTranscript,
  onError,
}: UseChatVoiceInputOptions) {
  const VC = useI18nConstants(CHAT_VOICE_COPY);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const mimeRef = useRef<string>("audio/webm");
  const stopTimerRef = useRef<number | null>(null);

  const cleanupStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const stopRecordingInternal = useCallback(async () => {
    if (stopTimerRef.current != null) {
      window.clearTimeout(stopTimerRef.current);
      stopTimerRef.current = null;
    }
    const recorder = recorderRef.current;
    if (!recorder || recorder.state === "inactive") {
      setIsRecording(false);
      return;
    }

    const blobPromise = new Promise<Blob>((resolve, reject) => {
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeRef.current });
        chunksRef.current = [];
        resolve(blob);
      };
      recorder.onerror = () => reject(new Error("Recorder error"));
    });

    recorder.stop();
    setIsRecording(false);
    cleanupStream();

    try {
      const blob = await blobPromise;
      if (blob.size < 1) return;
      setIsTranscribing(true);
      const transcript = await transcribeChatAudio(blob, mimeRef.current, language);
      onTranscript(transcript);
    } catch {
      onError(VC.transcribeFailed);
    } finally {
      setIsTranscribing(false);
      recorderRef.current = null;
    }
  }, [VC.transcribeFailed, cleanupStream, language, onError, onTranscript]);

  const startRecording = useCallback(async () => {
    if (disabled || isTranscribing) return;
    if (!isVoiceRecordingSupported()) {
      onError(VC.notSupported);
      return;
    }

    try {
      const mime = pickVoiceRecorderMimeType();
      if (!mime) {
        onError(VC.notSupported);
        return;
      }
      mimeRef.current = mime;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream, { mimeType: mime });
      recorderRef.current = recorder;
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.start(250);
      setIsRecording(true);

      stopTimerRef.current = window.setTimeout(() => {
        void stopRecordingInternal();
      }, CHAT_VOICE_MAX_RECORD_SEC * 1000);
    } catch {
      cleanupStream();
      onError(VC.permissionDenied);
    }
  }, [
    VC.notSupported,
    VC.permissionDenied,
    cleanupStream,
    disabled,
    isTranscribing,
    onError,
    stopRecordingInternal,
  ]);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      void stopRecordingInternal();
    } else {
      void startRecording();
    }
  }, [isRecording, startRecording, stopRecordingInternal]);

  useEffect(() => {
    return () => {
      if (stopTimerRef.current != null) window.clearTimeout(stopTimerRef.current);
      if (recorderRef.current?.state === "recording") recorderRef.current.stop();
      cleanupStream();
    };
  }, [cleanupStream]);

  return {
    isRecording,
    isTranscribing,
    toggleRecording,
    statusHint: isTranscribing
      ? VC.transcribing
      : isRecording
        ? VC.recording
        : null,
  };
}
