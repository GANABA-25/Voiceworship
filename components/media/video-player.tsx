"use client";

import { useEffect, useRef } from "react";
import { usePresentation } from "@/store/presentation-context";

type VideoPlayerProps = {
  src: string;
  controller?: boolean;
};

export default function VideoPlayer({
  src,
  controller = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { videoPlayback, setVideoPlayback } = usePresentation();

  // Reset playback state when the presenter selects a new video.
  useEffect(() => {
    if (!controller) return;

    setVideoPlayback({
      src,
      currentTime: 0,
      isPlaying: false,
      volume: 1,
      muted: false,
    });
  }, [src, controller, setVideoPlayback]);

  // Synchronize playback on the projection output.
  useEffect(() => {
    const video = videoRef.current;

    if (!video || controller || videoPlayback.src !== src) return;

    if (Math.abs(video.currentTime - videoPlayback.currentTime) > 0.5) {
      video.currentTime = videoPlayback.currentTime;
    }

    video.volume = videoPlayback.volume;
    video.muted = videoPlayback.muted;

    if (videoPlayback.isPlaying) {
      if (video.paused) {
        void video.play().catch((error) => {
          console.error("Unable to play live video:", error);
        });
      }
    } else if (!video.paused) {
      video.pause();
    }
  }, [controller, src, videoPlayback]);

  return (
    <video
      ref={videoRef}
      src={src}
      controls={controller}
      playsInline
      preload="auto"
      className="h-full w-full object-contain"
      onPlay={() => {
        if (!controller) return;

        setVideoPlayback((previous) => ({
          ...previous,
          src,
          isPlaying: true,
        }));
      }}
      onPause={() => {
        if (!controller) return;

        setVideoPlayback((previous) => ({
          ...previous,
          isPlaying: false,
        }));
      }}
      onTimeUpdate={(event) => {
        if (!controller) return;

        const currentTime = event.currentTarget.currentTime;

        setVideoPlayback((previous) => ({
          ...previous,
          src,
          currentTime,
        }));
      }}
      onVolumeChange={(event) => {
        if (!controller) return;

        const video = event.currentTarget;

        setVideoPlayback((previous) => ({
          ...previous,
          volume: video.volume,
          muted: video.muted,
        }));
      }}
    />
  );
}
