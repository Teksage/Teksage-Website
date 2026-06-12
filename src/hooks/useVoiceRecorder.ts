"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  createSilentWaveform,
  pushWaveformSample,
} from "@/lib/chat-voice-waveform";
import {
  isVoiceRecordingSupported,
  pickVoiceRecorderMimeType,
  voiceBlobFilename,
} from "@/lib/chat-voice-recorder";

type UseVoiceRecorderOptions = {
  disabled?: boolean;
  maxRecordSec: number;
  onComplete: (file: File, durationSec: number) => void;
  onError: (message: string) => void;
};

export function useVoiceRecorder({
  disabled = false,
  maxRecordSec,
  onComplete,
  onError,
}: UseVoiceRecorderOptions) {
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [amplitudes, setAmplitudes] = useState(createSilentWaveform);

  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const mimeRef = useRef("audio/webm");
  const stopTimerRef = useRef<number | null>(null);
  const tickTimerRef = useRef<number | null>(null);
  const elapsedSecRef = useRef(0);
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
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    stopAnalyser();
  }, [stopAnalyser]);

  const resetRecordingUi = useCallback(() => {
    setElapsedSec(0);
    elapsedSecRef.current = 0;
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
    async (saveRecording: boolean) => {
      clearTimers();
      const recorder = recorderRef.current;
      if (!recorder || recorder.state === "inactive") {
        setIsRecording(false);
        cleanupStream();
        resetRecordingUi();
        return;
      }

      const blobPromise = saveRecording
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

      if (!saveRecording || !blobPromise) {
        resetRecordingUi();
        recorderRef.current = null;
        return;
      }

      try {
        const blob = await blobPromise;
        if (blob.size < 1) return;
        const filename = voiceBlobFilename(mimeRef.current);
        const durationSec = Math.max(1, elapsedSecRef.current || 1);
        onComplete(new File([blob], filename, { type: mimeRef.current }), durationSec);
      } catch {
        onError("Could not save recording. Please try again.");
      } finally {
        resetRecordingUi();
        recorderRef.current = null;
      }
    },
    [cleanupStream, clearTimers, onComplete, onError, resetRecordingUi]
  );

  const startRecording = useCallback(async () => {
    if (disabled || isRecording) return;
    if (!isVoiceRecordingSupported()) {
      onError("Voice recording is not supported in this browser.");
      return;
    }

    try {
      const mime = pickVoiceRecorderMimeType();
      if (!mime) {
        onError("Voice recording is not supported in this browser.");
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
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.start(250);
      setIsRecording(true);

      tickTimerRef.current = window.setInterval(() => {
        setElapsedSec((prev) => {
          const next = prev + 1;
          elapsedSecRef.current = next;
          return next;
        });
      }, 1000);

      stopTimerRef.current = window.setTimeout(() => {
        void stopRecordingInternal(true);
      }, maxRecordSec * 1000);
    } catch {
      cleanupStream();
      resetRecordingUi();
      onError("Microphone permission is required to record voice.");
    }
  }, [
    cleanupStream,
    disabled,
    isRecording,
    maxRecordSec,
    onError,
    resetRecordingUi,
    startAnalyser,
    stopRecordingInternal,
  ]);

  useEffect(() => {
    return () => {
      clearTimers();
      if (recorderRef.current?.state === "recording") recorderRef.current.stop();
      cleanupStream();
    };
  }, [cleanupStream, clearTimers]);

  return {
    isRecording,
    elapsedSec,
    amplitudes,
    startRecording,
    cancelRecording: () => void stopRecordingInternal(false),
    stopRecording: () => void stopRecordingInternal(true),
    isSupported: isVoiceRecordingSupported(),
  };
}
