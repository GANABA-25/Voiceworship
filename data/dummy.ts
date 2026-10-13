import { SongTypes } from "@/types/songs-types";

export type ServiceOrderItem = {
  id: number;
  startTime: string;
  title: string;
  description: string;
  name: string;
  duration: string;
};

export const ServiceOrder: ServiceOrderItem[] = [
  {
    id: 1,
    startTime: "08:20",
    title: "Pre-service & Welcome",
    description: "Countdown loop and welcome slides",
    name: "Dana K",
    duration: "10",
  },
  {
    id: 2,
    startTime: "08:40",
    title: "Opening Prayer",
    description: "Opening prayer and call to worship",
    name: "Pastor Daniel",
    duration: "5",
  },
  {
    id: 3,
    startTime: "09:45",
    title: "Praise & Worship",
    description: "Praise songs and worship lyrics",
    name: "Grace Mensah",
    duration: "20",
  },
  {
    id: 4,
    startTime: "08:47",
    title: "Scripture Reading",
    description: "Psalm 100:1-5",
    name: "Michael Osei",
    duration: "10",
  },
  {
    id: 5,
    startTime: "9:10",
    title: "Church Announcements",
    description: "Upcoming events and church updates",
    name: "Sarah Agyeman",
    duration: "5",
  },
];

// export const songs: SongTypes[] = [
//   {
//     id: 1,
//     title: "Amazing Grace",
//     singer: "John Newton",
//     lyrics: [
//       {
//         id: "section-1",
//         type: "verse",
//         title: "Verse 1",
//         lyrics:
//           "Amazing grace! How sweet the sound\nThat saved a wretch like me!",
//       },
//       {
//         id: "section-2",
//         type: "verse",
//         title: "Verse 2",
//         lyrics: "Through many dangers, toils and snares\nI have already come.",
//       },
//       {
//         id: "section-3",
//         type: "chorus",
//         title: "Chorus",
//         lyrics:
//           "My chains are gone, I've been set free\nMy God, my Savior has ransomed me.",
//       },
//     ],
//     createdAt: new Date("2026-10-01"),
//     updatedAt: new Date("2026-10-01"),
//   },
//   {
//     id: 2,
//     title: "How Great Is Our God",
//     singer: "Chris Tomlin",
//     lyrics: [
//       {
//         id: "section-4",
//         type: "verse",
//         title: "Verse 1",
//         lyrics:
//           "The splendor of a King, clothed in majesty\nLet all the earth rejoice.",
//       },
//       {
//         id: "section-5",
//         type: "chorus",
//         title: "Chorus",
//         lyrics:
//           "How great is our God, sing with me\nHow great is our God, and all will see.",
//       },
//     ],
//     createdAt: new Date("2026-10-02"),
//     updatedAt: new Date("2026-10-02"),
//   },
//   {
//     id: 3,
//     title: "Way Maker",
//     singer: "Sinach",
//     lyrics: [
//       {
//         id: "section-6",
//         type: "verse",
//         title: "Verse 1",
//         lyrics:
//           "You are here, moving in our midst\nI worship You, I worship You.",
//       },
//       {
//         id: "section-7",
//         type: "chorus",
//         title: "Chorus",
//         lyrics:
//           "Way maker, miracle worker\nPromise keeper, light in the darkness.",
//       },
//       {
//         id: "section-8",
//         type: "bridge",
//         title: "Bridge",
//         lyrics:
//           "Even when I don't see it, You're working\nEven when I don't feel it, You're working.",
//       },
//     ],
//     createdAt: new Date("2026-10-03"),
//     updatedAt: new Date("2026-10-03"),
//   },
//   {
//     id: 4,
//     title: "Great Is Thy Faithfulness",
//     singer: "Thomas O. Chisholm",
//     lyrics: [
//       {
//         id: "section-9",
//         type: "verse",
//         title: "Verse 1",
//         lyrics:
//           "Great is Thy faithfulness, O God my Father\nThere is no shadow of turning with Thee.",
//       },
//       {
//         id: "section-10",
//         type: "chorus",
//         title: "Chorus",
//         lyrics:
//           "Great is Thy faithfulness\nMorning by morning new mercies I see.",
//       },
//     ],
//     createdAt: new Date("2026-10-04"),
//     updatedAt: new Date("2026-10-04"),
//   },
//   {
//     id: 5,
//     title: "What a Beautiful Name",
//     singer: "Hillsong Worship",
//     lyrics: [
//       {
//         id: "section-11",
//         type: "verse",
//         title: "Verse 1",
//         lyrics:
//           "You were the Word at the beginning\nOne with God the Lord Most High.",
//       },
//       {
//         id: "section-12",
//         type: "chorus",
//         title: "Chorus",
//         lyrics:
//           "What a beautiful Name it is\nThe Name of Jesus Christ my King.",
//       },
//       {
//         id: "section-13",
//         type: "bridge",
//         title: "Bridge",
//         lyrics: "Death could not hold You\nThe veil tore before You.",
//       },
//     ],
//     createdAt: new Date("2026-10-05"),
//     updatedAt: new Date("2026-10-05"),
//   },
// ];

export const songs: SongTypes[] = [
  {
    id: 1,
    title: "Amazing Grace",
    singer: "John Newton",
    lyrics: [
      {
        id: "section-1",
        type: "verse",
        title: "Verse 1",
        lyrics:
          "Amazing grace! How sweet the sound\nThat saved a wretch like me!",
      },
      {
        id: "section-2",
        type: "verse",
        title: "Verse 2",
        lyrics: "Through many dangers, toils and snares\nI have already come.",
      },
      {
        id: "section-3",
        type: "chorus",
        title: "Chorus",
        lyrics:
          "My chains are gone, I've been set free\nMy God, my Savior has ransomed me.",
      },
    ],
    createdAt: new Date("2026-10-01"),
    updatedAt: new Date("2026-10-01"),
  },
  {
    id: 2,
    title: "How Great Is Our God",
    singer: "Chris Tomlin",
    lyrics: [
      {
        id: "section-4",
        type: "verse",
        title: "Verse 1",
        lyrics:
          "The splendor of a King, clothed in majesty\nLet all the earth rejoice.",
      },
      {
        id: "section-5",
        type: "chorus",
        title: "Chorus",
        lyrics:
          "How great is our God, sing with me\nHow great is our God, and all will see.",
      },
    ],
    createdAt: new Date("2026-10-02"),
    updatedAt: new Date("2026-10-02"),
  },
  {
    id: 3,
    title: "Way Maker",
    singer: "Sinach",
    lyrics: [
      {
        id: "section-6",
        type: "verse",
        title: "Verse 1",
        lyrics:
          "You are here, moving in our midst\nI worship You, I worship You.",
      },
      {
        id: "section-7",
        type: "chorus",
        title: "Chorus",
        lyrics:
          "Way maker, miracle worker\nPromise keeper, light in the darkness.",
      },
      {
        id: "section-8",
        type: "bridge",
        title: "Bridge",
        lyrics:
          "Even when I don't see it, You're working\nEven when I don't feel it, You're working.",
      },
    ],
    createdAt: new Date("2026-10-03"),
    updatedAt: new Date("2026-10-03"),
  },
  {
    id: 4,
    title: "Great Is Thy Faithfulness",
    singer: "Thomas O. Chisholm",
    lyrics: [
      {
        id: "section-9",
        type: "verse",
        title: "Verse 1",
        lyrics:
          "Great is Thy faithfulness, O God my Father\nThere is no shadow of turning with Thee.",
      },
      {
        id: "section-10",
        type: "chorus",
        title: "Chorus",
        lyrics:
          "Great is Thy faithfulness\nMorning by morning new mercies I see.",
      },
    ],
    createdAt: new Date("2026-10-04"),
    updatedAt: new Date("2026-10-04"),
  },
  {
    id: 5,
    title: "What a Beautiful Name",
    singer: "Hillsong Worship",
    lyrics: [
      {
        id: "section-11",
        type: "verse",
        title: "Verse 1",
        lyrics:
          "You were the Word at the beginning\nOne with God the Lord Most High.",
      },
      {
        id: "section-12",
        type: "chorus",
        title: "Chorus",
        lyrics:
          "What a beautiful Name it is\nThe Name of Jesus Christ my King.",
      },
      {
        id: "section-13",
        type: "bridge",
        title: "Bridge",
        lyrics: "Death could not hold You\nThe veil tore before You.",
      },
    ],
    createdAt: new Date("2026-10-05"),
    updatedAt: new Date("2026-10-05"),
  },
  {
    id: 6,
    title: "Goodness of God",
    singer: "Bethel Music",
    lyrics: [
      {
        id: "section-14",
        type: "verse",
        title: "Verse 1",
        lyrics: "I love You, Lord\nFor Your mercy never fails me.",
      },
      {
        id: "section-15",
        type: "chorus",
        title: "Chorus",
        lyrics:
          "All my life You have been faithful\nAll my life You have been so, so good.",
      },
      {
        id: "section-16",
        type: "bridge",
        title: "Bridge",
        lyrics: "Your goodness is running after\nIt's running after me.",
      },
    ],
    createdAt: new Date("2026-10-06"),
    updatedAt: new Date("2026-10-06"),
  },
  {
    id: 7,
    title: "10,000 Reasons",
    singer: "Matt Redman",
    lyrics: [
      {
        id: "section-17",
        type: "verse",
        title: "Verse 1",
        lyrics: "Bless the Lord, O my soul\nO my soul, worship His holy name.",
      },
      {
        id: "section-18",
        type: "chorus",
        title: "Chorus",
        lyrics:
          "Sing like never before, O my soul\nI'll worship Your holy name.",
      },
      {
        id: "section-19",
        type: "verse",
        title: "Verse 2",
        lyrics:
          "The sun comes up, it's a new day dawning\nIt's time to sing Your song again.",
      },
    ],
    createdAt: new Date("2026-10-07"),
    updatedAt: new Date("2026-10-07"),
  },
  {
    id: 8,
    title: "Oceans (Where Feet May Fail)",
    singer: "Hillsong UNITED",
    lyrics: [
      {
        id: "section-20",
        type: "verse",
        title: "Verse 1",
        lyrics:
          "You call me out upon the waters\nThe great unknown where feet may fail.",
      },
      {
        id: "section-21",
        type: "chorus",
        title: "Chorus",
        lyrics:
          "Spirit lead me where my trust is without borders\nLet me walk upon the waters.",
      },
      {
        id: "section-22",
        type: "bridge",
        title: "Bridge",
        lyrics:
          "Take me deeper than my feet could ever wander\nAnd my faith will be made stronger.",
      },
    ],
    createdAt: new Date("2026-10-08"),
    updatedAt: new Date("2026-10-08"),
  },
  {
    id: 9,
    title: "Here I Am to Worship",
    singer: "Tim Hughes",
    lyrics: [
      {
        id: "section-23",
        type: "verse",
        title: "Verse 1",
        lyrics:
          "Light of the world, You stepped down into darkness\nOpened my eyes, let me see.",
      },
      {
        id: "section-24",
        type: "chorus",
        title: "Chorus",
        lyrics:
          "Here I am to worship, here I am to bow down\nHere I am to say that You're my God.",
      },
      {
        id: "section-25",
        type: "verse",
        title: "Verse 2",
        lyrics:
          "King of all days, oh so highly exalted\nGlorious in heaven above.",
      },
    ],
    createdAt: new Date("2026-10-09"),
    updatedAt: new Date("2026-10-09"),
  },
  {
    id: 10,
    title: "I Speak Jesus",
    singer: "Charity Gayle",
    lyrics: [
      {
        id: "section-26",
        type: "verse",
        title: "Verse 1",
        lyrics:
          "I just want to speak the name of Jesus\nOver every heart and every mind.",
      },
      {
        id: "section-27",
        type: "chorus",
        title: "Chorus",
        lyrics: "Your name is power, Your name is healing\nYour name is life.",
      },
      {
        id: "section-28",
        type: "bridge",
        title: "Bridge",
        lyrics: "Shout Jesus from the mountains\nJesus in the streets.",
      },
    ],
    createdAt: new Date("2026-10-10"),
    updatedAt: new Date("2026-10-10"),
  },
];
