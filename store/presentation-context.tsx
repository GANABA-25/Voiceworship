"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { usePathname } from "next/navigation";

import { PresentationSlide, BibleHistoryItem } from "@/types/presentation";

type VideoPlaybackState = {
  src: string | null;
  currentTime: number;
  isPlaying: boolean;
  volume: number;
  muted: boolean;
};

type PresentationContextType = {
  liveSlide: PresentationSlide | null;
  previewSlide: PresentationSlide | null;
  queue: PresentationSlide[];
  currentIndex: number;
  isOnAir: boolean;
  isBlocked: boolean;
  setPreviewSlide: (slide: PresentationSlide | null) => void;
  goLive: (item: PresentationSlide) => void;
  goLivePreview: () => void;
  preview: (item: PresentationSlide) => void;
  presentSlides: (slides: PresentationSlide[]) => void;
  addToQueue: (item: PresentationSlide) => void;
  removeFromQueue: (id: string) => void;
  clearQueue: () => void;
  clearPreview: () => void;
  clearLive: () => void;
  previousSlide: () => void;
  nextSlide: () => void;
  toggleBlock: () => void;
  toggleOnAir: () => void;
  history: BibleHistoryItem[];
  clearHistory: () => void;
  openOutput: () => void;
  videoPlayback: VideoPlaybackState;
  setVideoPlayback: Dispatch<SetStateAction<VideoPlaybackState>>;
};

const PresentationContext = createContext<PresentationContextType | undefined>(
  undefined,
);

type PresentationProviderProps = {
  children: ReactNode;
};

export function PresentationProvider({ children }: PresentationProviderProps) {
  const [queue, setQueue] = useState<PresentationSlide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [liveSlide, setLiveSlide] = useState<PresentationSlide | null>(null);
  const [isOnAir, setIsOnAir] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [history, setHistory] = useState<BibleHistoryItem[]>([]);
  const pathname = usePathname();
  const channelRef = useRef<BroadcastChannel | null>(null);
  const outputWindowRef = useRef<Window | null>(null);
  const [previewSlide, setPreviewSlide] = useState<PresentationSlide | null>(
    null,
  );
  const [videoPlayback, setVideoPlayback] = useState<VideoPlaybackState>({
    src: null,
    currentTime: 0,
    isPlaying: false,
    volume: 1,
    muted: false,
  });

  const outputStateRef = useRef({
    liveSlide,
    isOnAir,
    isBlocked,
    videoPlayback,
  });

  useEffect(() => {
    if (pathname.startsWith("/output")) return;

    const ch = new BroadcastChannel("projection");
    channelRef.current = ch;

    // a freshly opened output window asks for the current state
    ch.onmessage = (e) => {
      if (e.data?.type === "hello") {
        ch.postMessage({ type: "state", state: outputStateRef.current });
      }
    };

    return () => {
      ch.close();
      channelRef.current = null;
    };
  }, [pathname]);

  useEffect(() => {
    const state = {
      liveSlide,
      isOnAir,
      isBlocked,
      videoPlayback,
    };
    outputStateRef.current = state;
    channelRef.current?.postMessage({ type: "state", state });
  }, [liveSlide, isOnAir, isBlocked, videoPlayback]);

  const openOutput = () => {
    if (outputWindowRef.current && !outputWindowRef.current.closed) {
      outputWindowRef.current.focus();
      return;
    }

    outputWindowRef.current = window.open(
      "/output",
      "output-window",
      "popup,width=1280,height=720",
    );
  };

  const addLiveSlideToHistory = (slide: PresentationSlide) => {
    if (slide.type !== "bible") {
      return;
    }

    setHistory((currentHistory) => {
      if (currentHistory.some((item) => item.slide.id === slide.id)) {
        return currentHistory;
      }

      return [
        {
          slide,
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour12: false,
          }),
        },
        ...currentHistory,
      ];
    });
  };

  const goLive = (item: PresentationSlide) => {
    setLiveSlide(item);
    addLiveSlideToHistory(item);

    const index = queue.findIndex((slide) => slide.id === item.id);

    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  const goLivePreview = () => {
    if (!previewSlide) {
      return;
    }

    goLive(previewSlide);
  };

  const preview = (item: PresentationSlide) => {
    setPreviewSlide(item);
  };

  const presentSlides = (slides: PresentationSlide[]) => {
    if (slides.length === 0) {
      return;
    }

    const firstSlide = slides[0];

    setQueue(slides);
    setCurrentIndex(0);
    setPreviewSlide(firstSlide);
    setLiveSlide(firstSlide);
    addLiveSlideToHistory(firstSlide);
  };

  const addToQueue = (item: PresentationSlide) => {
    setQueue((currentQueue) => {
      const exists = currentQueue.some((slide) => slide.id === item.id);

      if (exists) {
        return currentQueue;
      }

      return [...currentQueue, item];
    });
  };

  const removeFromQueue = (id: string) => {
    setQueue((currentQueue) => currentQueue.filter((slide) => slide.id !== id));
  };

  const clearQueue = () => {
    setQueue([]);
    setCurrentIndex(-1);
  };

  const clearPreview = () => {
    setPreviewSlide(null);
  };

  const clearLive = () => {
    setLiveSlide(null);
  };

  const goToIndex = (index: number) => {
    const slide = queue[index];

    if (!slide) {
      return;
    }

    setCurrentIndex(index);
    setLiveSlide(slide);
    setPreviewSlide(slide);
    addLiveSlideToHistory(slide);
  };

  const previousSlide = () => goToIndex(currentIndex - 1);

  const nextSlide = () => goToIndex(currentIndex + 1);

  const toggleBlock = () => {
    setIsBlocked((current) => !current);
  };

  const toggleOnAir = () => {
    setIsOnAir((current) => !current);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const value = {
    liveSlide,
    previewSlide,
    queue,
    currentIndex,
    isOnAir,
    isBlocked,
    setPreviewSlide,
    goLive,
    goLivePreview,
    preview,
    presentSlides,
    addToQueue,
    removeFromQueue,
    clearQueue,
    clearPreview,
    clearLive,
    previousSlide,
    nextSlide,
    toggleBlock,
    toggleOnAir,
    history,
    clearHistory,
    openOutput,
    videoPlayback,
    setVideoPlayback,
  };

  return (
    <PresentationContext.Provider value={value}>
      {children}
    </PresentationContext.Provider>
  );
}

export function usePresentation() {
  const context = useContext(PresentationContext);

  if (!context) {
    throw new Error(
      "usePresentation must be used inside PresentationProvider.",
    );
  }

  return context;
}
