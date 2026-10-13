import {
  VoiceRecognitionConstructor,
  VoiceRecognitionInstance,
} from "@/types/voice";

export function getSpeechRecognition(): VoiceRecognitionConstructor | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export function createSpeechRecognition(): VoiceRecognitionInstance | null {
  const SpeechRecognition = getSpeechRecognition();

  if (!SpeechRecognition) {
    return null;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  return recognition;
}
