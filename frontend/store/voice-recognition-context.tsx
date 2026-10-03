"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";

export type MicrophoneStatus =
  | "checking"
  | "active"
  | "muted"
  | "unavailable"
  | "permission-denied";

export type RecognitionStatus =
  | "idle"
  | "listening"
  | "paused"
  | "processing"
  | "error";

type VoiceContextTypes = {
  microphoneStatus: MicrophoneStatus;
  recognitionStatus: RecognitionStatus;
  volume: number;
  transcript: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  pauseListening: () => void;
  resumeListening: () => void;
  setMicrophoneStatus: (status: MicrophoneStatus) => void;
  setRecognitionStatus: (status: RecognitionStatus) => void;
  setVolume: (volume: number) => void;
  setTranscript: (transcript: string) => void;
};

const VoiceContext = createContext<VoiceContextTypes | undefined>(undefined);

type VoiceProviderProps = {
  children: ReactNode;
};

export function VoiceProvider({ children }: VoiceProviderProps) {
  const [microphoneStatus, setMicrophoneStatus] =
    useState<MicrophoneStatus>("checking");

  const [recognitionStatus, setRecognitionStatus] =
    useState<RecognitionStatus>("idle");

  const [volume, setVolume] = useState(0);
  const [transcript, setTranscript] = useState("");

  const isListening = recognitionStatus === "listening";

  const startListening = useCallback(() => {
    setRecognitionStatus("listening");
  }, []);

  const stopListening = useCallback(() => {
    setRecognitionStatus("idle");
  }, []);

  const pauseListening = useCallback(() => {
    if (recognitionStatus === "listening") {
      setRecognitionStatus("paused");
    }
  }, [recognitionStatus]);

  const resumeListening = useCallback(() => {
    if (recognitionStatus === "paused") {
      setRecognitionStatus("listening");
    }
  }, [recognitionStatus]);

  const value = useMemo(
    () => ({
      microphoneStatus,
      recognitionStatus,
      volume,
      transcript,
      isListening,
      startListening,
      stopListening,
      pauseListening,
      resumeListening,
      setMicrophoneStatus,
      setRecognitionStatus,
      setVolume,
      setTranscript,
    }),
    [
      microphoneStatus,
      recognitionStatus,
      volume,
      transcript,
      isListening,
      startListening,
      stopListening,
      pauseListening,
      resumeListening,
    ],
  );

  return (
    <VoiceContext.Provider value={value}>{children}</VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);

  if (!context) {
    throw new Error("useVoice must be used inside VoiceProvider.");
  }

  return context;
}
