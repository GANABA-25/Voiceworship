import {
  LayoutDashboard,
  Music,
  MicVocal,
  BookOpen,
  Presentation,
  Image,
  ListMusic,
  Megaphone,
  History,
  Settings,
  Video,
  FileSliders,
} from "lucide-react";

export const items = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Bible",
    icon: BookOpen,
    href: "/bible",
  },
  {
    label: "Songs",
    icon: Music,
    href: "/songs",
  },
  {
    label: "Presentations",
    icon: Presentation,
    href: "/presentation",
  },
  {
    label: "Media",
    icon: Image,
    href: "/media",
  },
  {
    label: "Playlists",
    icon: ListMusic,
    href: "/playlists",
  },
  {
    label: "Announcements",
    icon: Megaphone,
    href: "/announcements",
  },
  {
    label: "History",
    icon: History,
    href: "/history",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export const serviceResources = [
  {
    label: "Bible",
    icon: BookOpen,
    item: "books",
    number: 66,
  },
  {
    label: "Lyrics",
    icon: MicVocal,
    item: "songs",
    number: 41,
  },
  {
    label: "Images",
    icon: Image,
    item: "files",
    number: 228,
  },
  {
    label: "Videos",
    icon: Video,
    item: "files",
    number: 64,
  },
  {
    label: "Slides",
    icon: FileSliders,
    item: "decks",
    number: 59,
  },
];
