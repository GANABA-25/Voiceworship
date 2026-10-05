export type PresentationContentType =
  | "bible"
  | "image"
  | "video"
  | "audio"
  | "document"
  | "text";

export type PresentationSlide = {
  id: string;
  type: PresentationContentType;
  title: string;
  content?: string;
  source?: string;
  reference?: string;
  metadata?: Record<string, unknown>;
};

export type PresentationItem = PresentationSlide;
