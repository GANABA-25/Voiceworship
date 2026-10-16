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
  Music,
  Presentation,
  Image,
  TvMinimalPlay,
  RotateCcwClock,
  Zap,
  LayoutGrid,
  SlidersHorizontal,
  Film,
  UserGroup,
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

export const featuresData = [
  {
    id: 1,
    icon: MicAudioLines,
    title: "Voice-Controlled Bible Projection",
    description:
      "Speak a Bible reference and quickly bring the passage into your presentation workflow.",
  },
  {
    id: 2,
    icon: BookSearch,
    title: "Bible Management",
    description: "Search, browse, and prepare Bible passages for projection.",
  },
  {
    id: 3,
    icon: Music,
    title: "Worship Lyrics",
    description: "Prepare and display worship lyrics during your service.",
  },
  {
    id: 4,
    icon: Presentation,
    title: "Presentations",
    description:
      "Build and manage presentation slides for sermons, announcements, and services.",
  },
  {
    id: 5,
    icon: Image,
    title: "Media",
    description: "Manage images, videos, and other service media.",
  },
  {
    id: 6,
    icon: TvMinimalPlay,
    title: "Live Output",
    description:
      "Preview exactly what your audience will see before projecting it.",
  },
  {
    id: 7,
    icon: Workflow,
    title: "Service Management",
    description: "Organize your service elements into a single workflow.",
  },
  {
    id: 8,
    icon: RotateCcwClock,
    title: "Voice Command History",
    description: "Review previous voice commands and recognized references.",
  },
];

export const workFlowData = [
  {
    id: 1,
    icon: MicAudioLines,
    title: "Voice-first workflow",
    description: "Get from reference to preview with fewer steps.",
  },
  {
    id: 2,
    icon: Zap,
    title: "Fast Bible access",
    description: "Search, browse, and prepare Bible passages for projection.",
  },
  {
    id: 3,
    icon: LayoutGrid,
    title: "Centralized service workspace",
    description: "Scripture, lyrics, slides, and media in one place.",
  },
  {
    id: 4,
    icon: SlidersHorizontal,
    title: "Live presentation control",
    description: "Preview, project, and dismiss with clear controls.",
  },
  {
    id: 5,
    icon: Film,
    title: "Media and lyrics support",
    description: "Bring songs and service media into the same flow.",
  },
  {
    id: 6,
    icon: UserGroup,
    title: "Designed for production teams",
    description: "Made for the booth, the pulpit, and everyone in between.",
  },
];

export const pricingData = [
  {
    id: 1,
    name: "Starter",
    description: "For churches getting started.",
    monthlyPrice: 100,
    yearlyPrice: 960,
    billing: "Free to start",
    popular: false,
    features: [
      "Basic Bible search",
      "Limited presentations",
      "Voice command access",
      "Basic media support",
    ],
    buttonLabel: "Get Started",
  },
  {
    id: 2,
    name: "Growth",
    description: "For growing worship and media teams.",
    monthlyPrice: 200,
    yearlyPrice: 1920,
    billing: "Placeholder pricing",
    popular: true,
    features: [
      "Full Bible workflow",
      "Unlimited presentations",
      "Voice-controlled projection",
      "Media management",
      "Service management",
      "Advanced features",
    ],
    buttonLabel: "Get Started",
  },
  {
    id: 3,
    name: "Premium",
    description: "For churches with larger teams and production needs.",
    monthlyPrice: 300,
    yearlyPrice: 2880,
    billing: "Placeholder pricing",
    popular: false,
    features: [
      "Multiple users",
      "Team management",
      "Advanced presentation workflows",
      "Organization features",
      "Priority support",
    ],
    buttonLabel: "Get Started",
  },
];
