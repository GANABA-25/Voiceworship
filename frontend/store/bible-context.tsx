"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";

import { biblePassage, bibleReference } from "@/types/bible";

type BibleContextTypes = {
  passage: biblePassage | null;
  reference: bibleReference | null;
  isLoading: boolean;
  error: string | null;
  searchedPassage: (data: biblePassage) => void;
  setPassage: (data: biblePassage | null) => void;
  clearPassage: () => void;
};

const BibleContext = createContext<BibleContextTypes | undefined>(undefined);

type BibleProviderProps = {
  children: ReactNode;
};

export function BibleProvider({ children }: BibleProviderProps) {
  const [passage, setPassage] = useState<biblePassage | null>(null);
  const [reference, setReference] = useState<bibleReference | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchedPassage = useCallback((data: biblePassage) => {
    setPassage(data);
    setError(null);
  }, []);

  const clearPassage = useCallback(() => {
    setPassage(null);
    setReference(null);
    setError(null);
  }, []);

  const value = useMemo(
    () => ({
      passage,
      reference,
      isLoading,
      error,
      searchedPassage,
      setPassage,
      clearPassage,
    }),
    [passage, reference, isLoading, error, searchedPassage, clearPassage],
  );

  return (
    <BibleContext.Provider value={value}>{children}</BibleContext.Provider>
  );
}

export function useBible() {
  const context = useContext(BibleContext);

  if (!context) {
    throw new Error("useBible must be used inside BibleProvider.");
  }

  return context;
}
