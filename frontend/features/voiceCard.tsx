"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/button";
import ProgressBar from "@/components/progress-bar";
import { useVoice } from "@/store/voice-recognition-context";

interface VoiceRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: ((event: Event) => void) | null;
  onspeechstart: ((event: Event) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: ((event: Event) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface VoiceRecognitionConstructor {
  new (): VoiceRecognitionInstance;
}

declare global {
  interface Window {
    SpeechRecognition?: VoiceRecognitionConstructor;
    webkitSpeechRecognition?: VoiceRecognitionConstructor;
  }
}

export default function VoiceCard() {
  const {
    volume,
    transcript,
    isListening,
    startListening,
    stopListening,
    setMicrophoneStatus,
    setRecognitionStatus,
    setVolume,
    setTranscript,
  } = useVoice();

  const animationRef = useRef<number | null>(null);
  const recognitionRef = useRef<VoiceRecognitionInstance | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let audioContext: AudioContext | null = null;

    const start = async () => {
      try {
        setMicrophoneStatus("checking");

        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
          },
        });

        const track = stream.getAudioTracks()[0];

        console.log("🎤 Permission granted");
        console.log("🎤 Label:", track.label);
        console.log("🎤 Enabled:", track.enabled);
        console.log("🎤 Muted:", track.muted);
        console.log("🎤 Ready state:", track.readyState);
        console.log("🎤 Settings:", track.getSettings());

        track.addEventListener("mute", () => {
          console.log("🔇 Microphone track muted");
          setMicrophoneStatus("muted");
        });

        track.addEventListener("unmute", () => {
          console.log("🔊 Microphone track unmuted");
          setMicrophoneStatus("active");
        });

        audioContext = new AudioContext();

        if (audioContext.state === "suspended") {
          await audioContext.resume();
        }

        const source = audioContext.createMediaStreamSource(stream);

        const analyser = audioContext.createAnalyser();

        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0.5;

        source.connect(analyser);

        const data = new Uint8Array(analyser.fftSize);

        setMicrophoneStatus("active");

        const update = () => {
          analyser.getByteTimeDomainData(data);

          let sum = 0;

          for (let i = 0; i < data.length; i++) {
            const sample = (data[i] - 128) / 128;
            sum += sample * sample;
          }

          const rms = Math.sqrt(sum / data.length);
          const currentVolume = Math.round(rms * 1000);

          setVolume(currentVolume);

          animationRef.current = requestAnimationFrame(update);
        };

        update();
      } catch (error) {
        console.error("❌ Microphone error:", error);

        if (error instanceof DOMException && error.name === "NotAllowedError") {
          setMicrophoneStatus("permission-denied");
        } else {
          setMicrophoneStatus("unavailable");
        }
      }
    };

    start();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      stream?.getTracks().forEach((track) => track.stop());

      audioContext?.close();
    };
  }, [setMicrophoneStatus, setVolume]);

  const handleStartListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setRecognitionStatus("error");
      console.error("❌ Speech recognition is not supported");
      return;
    }

    if (isListening) {
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("🎤 Speech recognition started");
      startListening();
    };

    recognition.onspeechstart = () => {
      console.log("🗣️ Speech detected");
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

      console.log("🎤 Transcript:", currentTranscript);

      if (finalTranscript) {
        console.log("✅ Final transcript:", finalTranscript);
        setRecognitionStatus("processing");
      }
    };

    recognition.onerror = (event) => {
      console.error("❌ Speech recognition error:", event);

      if (event.error === "not-allowed") {
        setMicrophoneStatus("permission-denied");
      } else if (event.error === "audio-capture") {
        setMicrophoneStatus("unavailable");
      }

      setRecognitionStatus("error");
    };

    recognition.onend = () => {
      console.log("🛑 Speech recognition ended");

      if (recognitionRef.current) {
        stopListening();
      }

      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (error) {
      console.error("❌ Failed to start speech recognition:", error);
      setRecognitionStatus("error");
      recognitionRef.current = null;
    }
  };

  const handleStopListening = () => {
    if (!recognitionRef.current) {
      stopListening();
      return;
    }

    recognitionRef.current.stop();
  };

  {
    /* <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isListening
                  ? "animate-pulse bg-danger"
                  : speaking
                    ? "animate-pulse bg-success"
                    : "bg-muted"
              }`}
            />

            <span>Volume: {volume}</span>
          </div> */
  }
  {
    /* <div className="mt-4 flex gap-2">
            {!isListening ? (
              <Button onClick={handleStartListening} label="Start Listening" />
            ) : (
              <Button onClick={handleStopListening} label="Stop Listening" />
            )}
          </div> */
  }

  const speaking = volume > 10;

  return (
    <div className="flex items-start gap-4">
      <section className="flex h-30 flex-6 flex-col justify-between space-y-2 rounded-md border border-border bg-background p-3">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-muted">Heard</p>

          <h1 className="mt-1 font-bold text-text">
            "{transcript || "Say a Bible reference..."}"
          </h1>
        </div>

        <div className="flex h-10 items-center gap-0.75">
          {Array.from({ length: 55 }).map((_, index) => {
            const distance = Math.abs(index - 15.5);
            const strength = Math.max(0.2, 1 - distance / 18);
            const idleHeights = [
              4, 7, 5, 11, 6, 15, 8, 12, 5, 9, 6, 14, 7, 11, 8, 16, 9, 13, 6,
              10, 7, 15, 5, 11, 8, 14, 6, 9, 5, 12, 7, 10, 15, 5, 11, 8, 14, 6,
              9, 5, 12, 7, 10, 15, 5, 11, 8, 14, 6, 9, 5, 12, 7, 10, 4,
            ];

            const idleHeight = idleHeights[index];
            const activeHeight = Math.max(4, volume * strength);
            const height =
              volume > 10 ? Math.min(activeHeight, 28) : idleHeight;

            return (
              <span
                key={index}
                className={`w-0.75 rounded-full transition-all duration-100 ${
                  volume > 10 ? "bg-primary" : "bg-primary/40"
                }`}
                style={{
                  height: `${height}px`,
                }}
              />
            );
          })}
        </div>
      </section>

      <section className="flex h-30 flex-4 flex-col justify-between rounded-md border border-border bg-background p-3">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-muted">
            Interpreted
          </p>

          <h1 className="mt-1 font-black text-primary">
            "{transcript || "Genesis 1:1"}"
          </h1>
        </div>

        <div className="space-y-2">
          <ProgressBar progress={95} />
        </div>
      </section>
    </div>
  );
}
