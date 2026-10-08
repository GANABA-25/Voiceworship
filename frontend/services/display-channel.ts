import type { PresentationSlide } from "@/types/presentation";

const DISPLAY_CHANNEL = "voiceworship-display";

export type DisplayMessage =
  | {
      type: "LIVE_SLIDE";
      slide: PresentationSlide;
    }
  | {
      type: "CLEAR_LIVE";
    };

export function broadcastDisplayMessage(message: DisplayMessage) {
  if (typeof window === "undefined") {
    return;
  }

  const channel = new BroadcastChannel(DISPLAY_CHANNEL);

  channel.postMessage(message);

  channel.close();
}

export function createDisplayChannel() {
  if (typeof window === "undefined") {
    return null;
  }

  return new BroadcastChannel(DISPLAY_CHANNEL);
}
