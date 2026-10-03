"use client";

import { useEffect, useRef, useState } from "react";

export default function VoiceCard() {
  const [volume, setVolume] = useState(0);
  const [status, setStatus] = useState("Checking microphone...");

  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let audioContext: AudioContext | null = null;

    const start = async () => {
      try {
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
          setStatus("Microphone muted");
        });

        track.addEventListener("unmute", () => {
          console.log("🔊 Microphone track unmuted");
          setStatus("Microphone active");
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

        setStatus("Microphone active");

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
        setStatus("Microphone unavailable");
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
  }, []);

  const speaking = volume > 10;

  return (
    <div className="rounded-md border border-border bg-card p-4">
      <p className="text-xs uppercase tracking-wide text-muted">
        Microphone Test
      </p>

      <p className="mt-1 text-sm text-text">{status}</p>

      <div className="mt-5 flex h-10 items-center justify-center gap-1">
        {Array.from({ length: 32 }).map((_, index) => {
          const distance = Math.abs(index - 15.5);
          const strength = Math.max(0, 1 - distance / 16);
          const height = Math.max(3, volume * strength);

          return (
            <span
              key={index}
              className="w-1 rounded-full bg-primary transition-all duration-75"
              style={{
                height: `${Math.min(height, 36)}px`,
              }}
            />
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted">
        <span
          className={`h-2 w-2 rounded-full ${
            speaking ? "animate-pulse bg-success" : "bg-muted"
          }`}
        />

        <span>Volume: {volume}</span>
      </div>
    </div>
  );
}
