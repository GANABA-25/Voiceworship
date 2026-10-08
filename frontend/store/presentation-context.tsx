// "use client";

// import {
//   createContext,
//   useCallback,
//   useContext,
//   useMemo,
//   useState,
//   type ReactNode,
// } from "react";

// import { PresentationSlide } from "@/types/presentation";

// type PresentationContextType = {
//   liveSlide: PresentationSlide | null;
//   previewSlide: PresentationSlide | null;
//   queue: PresentationSlide[];
//   currentIndex: number;
//   isOnAir: boolean;
//   isBlocked: boolean;
//   setPreviewSlide: (slide: PresentationSlide | null) => void;
//   goLive: (item: PresentationSlide) => void;
//   goLivePreview: () => void;
//   preview: (item: PresentationSlide) => void;
//   addToQueue: (item: PresentationSlide) => void;
//   removeFromQueue: (id: string) => void;
//   clearQueue: () => void;
//   clearPreview: () => void;
//   clearLive: () => void;
//   previousSlide: () => void;
//   nextSlide: () => void;
//   toggleBlock: () => void;
//   toggleOnAir: () => void;
// };

// const PresentationContext = createContext<PresentationContextType | undefined>(
//   undefined,
// );

// type PresentationProviderProps = {
//   children: ReactNode;
// };

// export function PresentationProvider({ children }: PresentationProviderProps) {
//   const [queue, setQueue] = useState<PresentationSlide[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(-1);
//   const [liveSlide, setLiveSlide] = useState<PresentationSlide | null>(null);
//   const [previewSlide, setPreviewSlide] = useState<PresentationSlide | null>(
//     null,
//   );
//   const [isOnAir, setIsOnAir] = useState(true);
//   const [isBlocked, setIsBlocked] = useState(false);

//   const goLive = useCallback(
//     (item: PresentationSlide) => {
//       setLiveSlide(item);

//       const index = queue.findIndex((slide) => slide.id === item.id);

//       if (index !== -1) {
//         setCurrentIndex(index);
//       }
//     },
//     [queue],
//   );

//   const goLivePreview = useCallback(() => {
//     if (!previewSlide) {
//       return;
//     }

//     setLiveSlide(previewSlide);
//   }, [previewSlide]);

//   const preview = useCallback((item: PresentationSlide) => {
//     console.log("checking", item);
//     setPreviewSlide(item);
//   }, []);

//   const addToQueue = useCallback((item: PresentationSlide) => {
//     setQueue((currentQueue) => {
//       const exists = currentQueue.some((slide) => slide.id === item.id);

//       if (exists) {
//         return currentQueue;
//       }

//       return [...currentQueue, item];
//     });
//   }, []);

//   const removeFromQueue = useCallback((id: string) => {
//     setQueue((currentQueue) => currentQueue.filter((slide) => slide.id !== id));
//   }, []);

//   const clearQueue = useCallback(() => {
//     setQueue([]);
//     setCurrentIndex(-1);
//   }, []);

//   const clearPreview = useCallback(() => {
//     setPreviewSlide(null);
//   }, []);

//   const clearLive = useCallback(() => {
//     setLiveSlide(null);
//   }, []);

//   const previousSlide = useCallback(() => {
//     if (queue.length === 0) {
//       return;
//     }

//     const previousIndex = currentIndex - 1;

//     if (previousIndex < 0) {
//       return;
//     }

//     const slide = queue[previousIndex];

//     setCurrentIndex(previousIndex);
//     setLiveSlide(slide);
//   }, [queue, currentIndex]);

//   const nextSlide = useCallback(() => {
//     if (queue.length === 0) {
//       return;
//     }

//     const nextIndex = currentIndex + 1;

//     if (nextIndex >= queue.length) {
//       return;
//     }

//     const slide = queue[nextIndex];

//     setCurrentIndex(nextIndex);
//     setLiveSlide(slide);
//   }, [queue, currentIndex]);

//   const toggleBlock = useCallback(() => {
//     setIsBlocked((current) => !current);
//   }, []);

//   const toggleOnAir = useCallback(() => {
//     setIsOnAir((current) => !current);
//   }, []);

//   const value = useMemo(
//     () => ({
//       liveSlide,
//       previewSlide,
//       queue,
//       currentIndex,
//       isOnAir,
//       isBlocked,
//       setPreviewSlide,
//       goLive,
//       goLivePreview,
//       preview,
//       addToQueue,
//       removeFromQueue,
//       clearQueue,
//       clearPreview,
//       clearLive,
//       previousSlide,
//       nextSlide,
//       toggleBlock,
//       toggleOnAir,
//     }),
//     [
//       liveSlide,
//       previewSlide,
//       queue,
//       currentIndex,
//       isOnAir,
//       isBlocked,
//       goLive,
//       goLivePreview,
//       preview,
//       addToQueue,
//       removeFromQueue,
//       clearQueue,
//       clearPreview,
//       clearLive,
//       previousSlide,
//       nextSlide,
//       toggleBlock,
//       toggleOnAir,
//     ],
//   );

//   return (
//     <PresentationContext.Provider value={value}>
//       {children}
//     </PresentationContext.Provider>
//   );
// }

// export function usePresentation() {
//   const context = useContext(PresentationContext);

//   if (!context) {
//     throw new Error(
//       "usePresentation must be used inside PresentationProvider.",
//     );
//   }

//   return context;
// }

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { PresentationSlide } from "@/types/presentation";

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
  const [previewSlide, setPreviewSlide] = useState<PresentationSlide | null>(
    null,
  );
  const [isOnAir, setIsOnAir] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);

  const goLive = useCallback(
    (item: PresentationSlide) => {
      setLiveSlide(item);

      const index = queue.findIndex((slide) => slide.id === item.id);

      if (index !== -1) {
        setCurrentIndex(index);
      }
    },
    [queue],
  );

  const goLivePreview = useCallback(() => {
    if (!previewSlide) {
      return;
    }

    setLiveSlide(previewSlide);

    const index = queue.findIndex((slide) => slide.id === previewSlide.id);

    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [previewSlide, queue]);

  const preview = useCallback((item: PresentationSlide) => {
    setPreviewSlide(item);
  }, []);

  const presentSlides = useCallback((slides: PresentationSlide[]) => {
    if (slides.length === 0) {
      return;
    }

    const firstSlide = slides[0];

    setQueue(slides);
    setCurrentIndex(0);
    setPreviewSlide(firstSlide);
    setLiveSlide(firstSlide);
  }, []);

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
  }, [queue, currentIndex]);

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
  }, [queue, currentIndex]);

  const toggleBlock = useCallback(() => {
    setIsBlocked((current) => !current);
  }, []);

  const toggleOnAir = useCallback(() => {
    setIsOnAir((current) => !current);
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
