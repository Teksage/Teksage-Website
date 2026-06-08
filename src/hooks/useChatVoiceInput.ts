"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import {
  createSilentWaveform,
  pushWaveformSample,
} from "@/lib/chat-voice-waveform";
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
  const [elapsedSec, setElapsedSec] = useState(0);
  const [amplitudes, setAmplitudes] = useState(createSilentWaveform);

  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const mimeRef = useRef<string>("audio/webm");
  const stopTimerRef = useRef<number | null>(null);
  const tickTimerRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (stopTimerRef.current != null) {
      window.clearTimeout(stopTimerRef.current);
      stopTimerRef.current = null;
    }
    if (tickTimerRef.current != null) {
      window.clearInterval(tickTimerRef.current);
      tickTimerRef.current = null;
    }
  }, []);

  const stopAnalyser = useCallback(() => {
    if (rafRef.current != null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    analyserRef.current?.disconnect();
    analyserRef.current = null;
    if (audioContextRef.current?.state !== "closed") {
      void audioContextRef.current?.close();
    }
    audioContextRef.current = null;
  }, []);

  const cleanupStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    stopAnalyser();
  }, [stopAnalyser]);

  const resetRecordingUi = useCallback(() => {
    setElapsedSec(0);
    setAmplitudes(createSilentWaveform());
  }, []);

  const startAnalyser = useCallback((stream: MediaStream) => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    audioContextRef.current = audioContext;
    analyserRef.current = analyser;

    const data = new Uint8Array(analyser.frequencyBinCount);
    const tick = () => {
      analyser.getByteFrequencyData(data);
      const avg = data.reduce((sum, value) => sum + value, 0) / data.length / 255;
      setAmplitudes((prev) => pushWaveformSample(prev, avg));
      rafRef.current = window.requestAnimationFrame(tick);
    };
    rafRef.current = window.requestAnimationFrame(tick);
  }, []);

  const stopRecordingInternal = useCallback(
    async (shouldTranscribe: boolean) => {
      clearTimers();
      const recorder = recorderRef.current;
      if (!recorder || recorder.state === "inactive") {
        setIsRecording(false);
        cleanupStream();
        resetRecordingUi();
        return;
      }

      const blobPromise = shouldTranscribe
        ? new Promise<Blob>((resolve, reject) => {
            recorder.onstop = () => {
              const blob = new Blob(chunksRef.current, { type: mimeRef.current });
              chunksRef.current = [];
              resolve(blob);
            };
            recorder.onerror = () => reject(new Error("Recorder error"));
          })
        : null;

      recorder.stop();
      setIsRecording(false);
      cleanupStream();

      if (!shouldTranscribe || !blobPromise) {
        resetRecordingUi();
        recorderRef.current = null;
        return;
      }

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
        resetRecordingUi();
        recorderRef.current = null;
      }
    },
    [
      VC.transcribeFailed,
      cleanupStream,
      clearTimers,
      language,
      onError,
      onTranscript,
      resetRecordingUi,
    ]
  );

  const startRecording = useCallback(async () => {
    if (disabled || isTranscribing || isRecording) return;
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
      resetRecordingUi();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      startAnalyser(stream);

      const recorder = new MediaRecorder(stream, { mimeType: mime });
      recorderRef.current = recorder;
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.start(250);
      setIsRecording(true);
      setElapsedSec(0);

      tickTimerRef.current = window.setInterval(() => {
        setElapsedSec((prev) => prev + 1);
      }, 1000);

      stopTimerRef.current = window.setTimeout(() => {
        void stopRecordingInternal(true);
      }, CHAT_VOICE_MAX_RECORD_SEC * 1000);
    } catch {
      cleanupStream();
      resetRecordingUi();
      onError(VC.permissionDenied);
    }
  }, [
    VC.notSupported,
    VC.permissionDenied,
    cleanupStream,
    disabled,
    isRecording,
    isTranscribing,
    onError,
    resetRecordingUi,
    startAnalyser,
    stopRecordingInternal,
  ]);

  const cancelRecording = useCallback(() => {
    void stopRecordingInternal(false);
  }, [stopRecordingInternal]);

  const stopRecording = useCallback(() => {
    void stopRecordingInternal(true);
  }, [stopRecordingInternal]);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      void stopRecordingInternal(true);
    } else {
      void startRecording();
    }
  }, [isRecording, startRecording, stopRecordingInternal]);

  useEffect(() => {
    return () => {
      clearTimers();
      if (recorderRef.current?.state === "recording") recorderRef.current.stop();
      cleanupStream();
    };
  }, [cleanupStream, clearTimers]);

  return {
    isRecording,
    isTranscribing,
    elapsedSec,
    amplitudes,
    toggleRecording,
    cancelRecording,
    stopRecording,
    statusHint: isTranscribing ? VC.transcribing : null,
  };
}
