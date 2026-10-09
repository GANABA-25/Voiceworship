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
import { usePathname } from "next/navigation";

import { PresentationSlide, BibleHistoryItem } from "@/types/presentation";

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
  const outputStateRef = useRef({ liveSlide, isOnAir, isBlocked });
  const [previewSlide, setPreviewSlide] = useState<PresentationSlide | null>(
    null,
  );

  // 1. Open the channel (skipped inside the /output window itself)
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

  // 2. Push the live state to the output window on every change
  useEffect(() => {
    const state = { liveSlide, isOnAir, isBlocked };
    outputStateRef.current = state;
    channelRef.current?.postMessage({ type: "state", state });
  }, [liveSlide, isOnAir, isBlocked]);

  // 3. Open the output window
  const openOutput = useCallback(() => {
    if (outputWindowRef.current && !outputWindowRef.current.closed) {
      outputWindowRef.current.focus();
      return;
    }

    outputWindowRef.current = window.open(
      "/output",
      "output-window",
      "popup,width=1280,height=720",
    );
  }, []);

  const addLiveSlideToHistory = useCallback((slide: PresentationSlide) => {
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
  }, []);

  const goLive = useCallback(
    (item: PresentationSlide) => {
      setLiveSlide(item);
      addLiveSlideToHistory(item);

      const index = queue.findIndex((slide) => slide.id === item.id);

      if (index !== -1) {
        setCurrentIndex(index);
      }
    },
    [queue, addLiveSlideToHistory],
  );

  const goLivePreview = useCallback(() => {
    if (!previewSlide) {
      return;
    }

    setLiveSlide(previewSlide);
    addLiveSlideToHistory(previewSlide);

    const index = queue.findIndex((slide) => slide.id === previewSlide.id);

    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [previewSlide, queue, addLiveSlideToHistory]);

  const preview = useCallback((item: PresentationSlide) => {
    setPreviewSlide(item);
  }, []);

  const presentSlides = useCallback(
    (slides: PresentationSlide[]) => {
      if (slides.length === 0) {
        return;
      }

      const firstSlide = slides[0];

      setQueue(slides);
      setCurrentIndex(0);
      setPreviewSlide(firstSlide);
      setLiveSlide(firstSlide);
      addLiveSlideToHistory(firstSlide);
    },
    [addLiveSlideToHistory],
  );

  const addToQueue = useCallback((item: PresentationSlide) => {
    setQueue((currentQueue) => {
      const exists = currentQueue.some((slide) => slide.id === item.id);

      if (exists) {
        return currentQueue;
      }

      return [...currentQueue, item];
    });
  }, []);

  const removeFromQueue = useCallback((id: string) => {
    setQueue((currentQueue) => currentQueue.filter((slide) => slide.id !== id));
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
    setCurrentIndex(-1);
  }, []);

  const clearPreview = useCallback(() => {
    setPreviewSlide(null);
  }, []);

  const clearLive = useCallback(() => {
    setLiveSlide(null);
  }, []);

  const previousSlide = useCallback(() => {
    if (queue.length === 0) {
      return;
    }

    const previousIndex = currentIndex - 1;

    if (previousIndex < 0) {
      return;
    }

    const slide = queue[previousIndex];

    setCurrentIndex(previousIndex);
    setLiveSlide(slide);
    setPreviewSlide(slide);
    addLiveSlideToHistory(slide);
  }, [queue, currentIndex, addLiveSlideToHistory]);

  const nextSlide = useCallback(() => {
    if (queue.length === 0) {
      return;
    }

    const nextIndex = currentIndex + 1;

    if (nextIndex >= queue.length) {
      return;
    }

    const slide = queue[nextIndex];

    setCurrentIndex(nextIndex);
    setLiveSlide(slide);
    setPreviewSlide(slide);
    addLiveSlideToHistory(slide);
  }, [queue, currentIndex, addLiveSlideToHistory]);

  const toggleBlock = useCallback(() => {
    setIsBlocked((current) => !current);
  }, []);

  const toggleOnAir = useCallback(() => {
    setIsOnAir((current) => !current);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const value = useMemo(
    () => ({
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
    }),
    [
      liveSlide,
      previewSlide,
      queue,
      currentIndex,
      isOnAir,
      isBlocked,
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
    ],
  );

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
