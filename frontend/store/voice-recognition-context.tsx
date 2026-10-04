"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "react-toastify";

import { createSpeechRecognition } from "@/features/voice/services/speech-recognition";
import type {
  MicrophoneStatus,
  RecognitionStatus,
  VoiceContextType,
  VoiceRecognitionInstance,
} from "../types/voice";

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

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

  const microphoneStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const recognitionRef = useRef<VoiceRecognitionInstance | null>(null);

  const isListening = recognitionStatus === "listening";
  const isMuted = microphoneStatus === "muted";

  const stopVolumeMonitoring = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const startVolumeMonitoring = useCallback(() => {
    const analyser = analyserRef.current;

    if (!analyser) {
      return;
    }

    const data = new Uint8Array(analyser.fftSize);

    const update = () => {
      if (!analyserRef.current) {
        return;
      }

      analyser.getByteTimeDomainData(data);

      let sum = 0;

      for (let i = 0; i < data.length; i++) {
        const sample = (data[i] - 128) / 128;
        sum += sample * sample;
      }

      const rms = Math.sqrt(sum / data.length);
      const currentVolume = Math.min(100, Math.round(rms * 1000));

      setVolume(currentVolume);

      animationRef.current = requestAnimationFrame(update);
    };

    update();
  }, []);

  const initializeMicrophone = useCallback(async () => {
    if (microphoneStreamRef.current) {
      return true;
    }

    try {
      setMicrophoneStatus("checking");

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      microphoneStreamRef.current = stream;

      const audioContext = new AudioContext();

      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.5;

      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      const track = stream.getAudioTracks()[0];

      track.addEventListener("mute", () => {
        setMicrophoneStatus("muted");
        setVolume(0);
      });

      track.addEventListener("unmute", () => {
        setMicrophoneStatus("active");
      });

      setMicrophoneStatus("active");

      startVolumeMonitoring();

      return true;
    } catch (error) {
      if (error instanceof DOMException) {
        if (error.name === "NotAllowedError") {
          setMicrophoneStatus("permission-denied");
          toast.error("Microphone permission denied");
        } else {
          setMicrophoneStatus("unavailable");
          toast.error("Microphone unavailable");
        }
      } else {
        setMicrophoneStatus("unavailable");
        toast.error("Microphone unavailable");
      }

      return false;
    }
  }, [startVolumeMonitoring]);

  const startListening = useCallback(async () => {
    if (isMuted) {
      toast.warning("Microphone is muted");
      return;
    }

    const microphoneReady = await initializeMicrophone();

    if (!microphoneReady) {
      return;
    }

    if (recognitionRef.current) {
      return;
    }

    const recognition = createSpeechRecognition();

    if (!recognition) {
      setRecognitionStatus("error");
      toast.error("Speech recognition is not supported");
      return;
    }

    recognition.onstart = () => {
      setRecognitionStatus("listening");
      setMicrophoneStatus("active");
    };

    recognition.onspeechstart = () => {
      console.log("Speech detected");
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0].transcript;

        if (result.isFinal) {
          finalTranscript += text;
        } else {
          interimTranscript += text;
        }
      }

      const currentTranscript = finalTranscript || interimTranscript;

      setTranscript(currentTranscript);

      if (finalTranscript) {
        setRecognitionStatus("processing");
      }
    };

    recognition.onerror = (event) => {
      if (event.error === "not-allowed") {
        setMicrophoneStatus("permission-denied");
        setRecognitionStatus("error");
        toast.error("Microphone permission denied");
        return;
      }

      if (event.error === "audio-capture") {
        setMicrophoneStatus("unavailable");
        setRecognitionStatus("error");
        toast.error("Microphone is unavailable");
        return;
      }

      if (event.error === "no-speech") {
        return;
      }

      setRecognitionStatus("error");
      toast.error("Speech recognition error");
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      setRecognitionStatus("idle");
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setRecognitionStatus("error");
      toast.error("Failed to start speech recognition");
    }
  }, [initializeMicrophone, isMuted]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) {
      setRecognitionStatus("idle");
      return;
    }

    recognitionRef.current.stop();
    recognitionRef.current = null;
    setRecognitionStatus("idle");
  }, []);

  const pauseListening = useCallback(() => {
    if (!recognitionRef.current) {
      return;
    }

    recognitionRef.current.stop();
    recognitionRef.current = null;
    setRecognitionStatus("paused");
  }, []);

  const resumeListening = useCallback(() => {
    if (recognitionStatus !== "paused" || isMuted) {
      return;
    }

    startListening();
  }, [isMuted, recognitionStatus, startListening]);

  const muteMicrophone = useCallback(() => {
    microphoneStreamRef.current?.getAudioTracks().forEach((track) => {
      track.enabled = false;
    });

    recognitionRef.current?.stop();

    recognitionRef.current = null;

    stopVolumeMonitoring();

    setVolume(0);
    setMicrophoneStatus("muted");
    setRecognitionStatus("idle");

    toast.error("Microphone muted");
  }, [stopVolumeMonitoring]);

  const unmuteMicrophone = useCallback(() => {
    microphoneStreamRef.current?.getAudioTracks().forEach((track) => {
      track.enabled = true;
    });

    setMicrophoneStatus("active");

    startVolumeMonitoring();
  }, [startVolumeMonitoring]);

  const toggleMicrophone = useCallback(() => {
    if (isMuted) {
      unmuteMicrophone();
    } else {
      muteMicrophone();
    }
  }, [isMuted, muteMicrophone, unmuteMicrophone]);

  useEffect(() => {
    return () => {
      stopVolumeMonitoring();

      recognitionRef.current?.abort();

      microphoneStreamRef.current?.getTracks().forEach((track) => {
        track.stop();
      });

      microphoneStreamRef.current = null;

      audioContextRef.current?.close();

      audioContextRef.current = null;
      analyserRef.current = null;
    };
  }, [stopVolumeMonitoring]);

  const value = useMemo<VoiceContextType>(
    () => ({
      microphoneStatus,
      recognitionStatus,
      volume,
      transcript,
      isListening,
      isMuted,
      startListening,
      stopListening,
      pauseListening,
      resumeListening,
      muteMicrophone,
      unmuteMicrophone,
      toggleMicrophone,
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
      isMuted,
      startListening,
      stopListening,
      pauseListening,
      resumeListening,
      muteMicrophone,
      unmuteMicrophone,
      toggleMicrophone,
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
