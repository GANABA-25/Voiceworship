import {
  Search,
  BookSearch,
  Focus,
  Timer,
  Layers,
  Workflow,
  MicAudioLines,
  ScanText,
  Radio,
} from "lucide-react";

export const worshipFlowData = [
  {
    id: 1,
    icon: Search,
    title: "Searching mid-sermon",
    description:
      "Hunting for a passage while the pastor is already reading it aloud.",
  },
  {
    id: 2,
    icon: Workflow,
    title: "Switching tools",
    description: "Jumping between Bible apps, slide decks, and media players.",
  },
  {
    id: 3,
    icon: BookSearch,
    title: "Manual verse lookup",
    description: "Typing book, chapter, and verse by hand under pressure.",
  },
  {
    id: 4,
    icon: Focus,
    title: "Lost focus",
    description: "Operators watch the software instead of the service.",
  },
  {
    id: 5,
    icon: Layers,
    title: "Too many elements",
    description:
      "Lyrics, scripture, media, and announcements all managed separately.",
  },
  {
    id: 6,
    icon: Timer,
    title: "Delays on stage",
    description:
      "The pastor or worship leader waits for the screen to catch up.",
  },
];

export const voiceProcessData = [
  {
    id: 1,
    step: "01",
    icon: MicAudioLines,
    title: "Speak",
    description: "“Open John chapter 3 verse 16”",
  },
  {
    id: 2,
    step: "02",
    icon: ScanText,
    title: "Recognize",
    description: "VoiceWorship identifies the Bible reference.",
  },
  {
    id: 3,
    step: "03",
    icon: Radio,
    title: "Project",
    description:
      "The passage becomes available for preview and live projection.",
  },
];

export const clientData = [
  {
    id: 1,
    user: "Pastor",
    description: "Move through scripture without interrupting your message.",
  },
  {
    id: 2,
    user: "Worship leaders",
    description: "Keep the service moving naturally.",
  },
  {
    id: 3,
    user: "Media teams",
    description: "Control the presentation from one workspace.",
  },
  {
    id: 4,
    user: "Church administrators",
    description: "Organize your service workflow.",
  },
];
