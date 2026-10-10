export type ServiceOrderItem = {
  id: number;
  startTime: string; // "HH:mm" (24h) or "h:mm AM/PM"
  title: string;
  description: string;
  name: string;
  duration: string; // minutes
};

// Each startTime = previous startTime + previous duration
export const ServiceOrder: ServiceOrderItem[] = [
  {
    id: 1,
    startTime: "09:30",
    title: "Pre-service & Welcome",
    description: "Countdown loop and welcome slides",
    name: "Dana K",
    duration: "10",
  }, // 09:30–09:40
  {
    id: 2,
    startTime: "09:40",
    title: "Opening Prayer",
    description: "Opening prayer and call to worship",
    name: "Pastor Daniel",
    duration: "5",
  }, // 09:40–09:45
  {
    id: 3,
    startTime: "09:45",
    title: "Praise & Worship",
    description: "Praise songs and worship lyrics",
    name: "Grace Mensah",
    duration: "20",
  }, // 09:45–10:05
  {
    id: 4,
    startTime: "10:05",
    title: "Scripture Reading",
    description: "Psalm 100:1-5",
    name: "Michael Osei",
    duration: "5",
  }, // 10:05–10:10
  {
    id: 5,
    startTime: "10:10",
    title: "Church Announcements",
    description: "Upcoming events and church updates",
    name: "Sarah Agyeman",
    duration: "5",
  }, // 10:10–10:15
  {
    id: 6,
    startTime: "10:15",
    title: "Offering & Tithes",
    description: "Offering collection and giving scripture",
    name: "Daniel Owusu",
    duration: "10",
  }, // 10:15–10:25
  {
    id: 7,
    startTime: "10:28",
    title: "Special Ministration",
    description: "Choir ministration and song lyrics",
    name: "House of Faith Choir",
    duration: "10",
  }, // 10:25–10:35
  {
    id: 8,
    startTime: "10:35",
    title: "Sermon",
    description: "The Power of Faith — Hebrews 11:1-6",
    name: "Pastor Daniel",
    duration: "35",
  }, // 10:35–11:10
  {
    id: 9,
    startTime: "11:10",
    title: "Altar Call & Prayer",
    description: "Invitation, prayer, and ministry",
    name: "Pastor Daniel",
    duration: "10",
  }, // 11:10–11:20
  {
    id: 10,
    startTime: "11:20",
    title: "Closing Prayer & Benediction",
    description: "Closing prayer and final scripture",
    name: "Pastor Daniel",
    duration: "5",
  }, // 11:20–11:25
];
