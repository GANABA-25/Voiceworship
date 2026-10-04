export type MicrophoneStatus =
  | "checking"
  | "active"
  | "muted"
  | "unavailable"
  | "permission-denied";

export type RecognitionStatus =
  | "idle"
  | "listening"
  | "paused"
  | "processing"
  | "error";

export interface VoiceRecognitionInstance {
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

export interface VoiceRecognitionConstructor {
  new (): VoiceRecognitionInstance;
}

export interface VoiceContextType {
  microphoneStatus: MicrophoneStatus;
  recognitionStatus: RecognitionStatus;
  volume: number;
  transcript: string;
  isListening: boolean;
  isMuted: boolean;
  startListening: () => void;
  stopListening: () => void;
  pauseListening: () => void;
  resumeListening: () => void;
  muteMicrophone: () => void;
  unmuteMicrophone: () => void;
  toggleMicrophone: () => void;
  setMicrophoneStatus: (status: MicrophoneStatus) => void;
  setRecognitionStatus: (status: RecognitionStatus) => void;
  setVolume: (volume: number) => void;
  setTranscript: (transcript: string) => void;
}

declare global {
  interface Window {
    SpeechRecognition?: VoiceRecognitionConstructor;
    webkitSpeechRecognition?: VoiceRecognitionConstructor;
  }
}
