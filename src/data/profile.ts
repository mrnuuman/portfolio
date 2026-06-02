import { publicAsset } from "../utils/asset";

export const profile = {
  name: "Muhammad Nouman",
  shortName: "MN",
  email: "mr.nuuman@gmail.com",
  linkedin: "https://www.linkedin.com/in/m-nouman-profile/",
  location: "Australia",
  workPermit: "Open to remote collaboration",
  headline: "Senior iOS/tvOS Developer",
  intro:
    "I build polished Apple-platform products across iOS, tvOS and watchOS, with a focus on streaming, fintech, media editing and real-time mobile experiences.",
  about:
    "Senior iOS/tvOS developer with 6+ years of production experience across STARZPLAY, Beyond Apps Group, Paywith and TXLabz. I turn product requirements into clear user stories, build high-quality Swift and SwiftUI interfaces, and ship app experiences that combine clean architecture with motion, media, payments and real-time features.",
};

export const highlights = [
  { value: "6+", label: "years in iOS delivery" },
  { value: "4", label: "major app domains" },
  { value: "iOS/tvOS", label: "current senior focus" },
  { value: "SwiftUI", label: "interface craft" },
];

export const capabilityTabs = [
  {
    title: "Apple Apps",
    kicker: "iOS, tvOS and watchOS",
    description:
      "Production Apple-platform development with SwiftUI, Swift, UIKit and Combine, including custom UI systems, watchOS features, CallKit flows and app-store-ready mobile experiences.",
    points: [
      "SwiftUI and UIKit interfaces",
      "Combine-powered state flows",
      "watchOS and CallKit integrations",
      "Reusable components and clean architecture",
    ],
    tools: ["SwiftUI", "Swift", "UIKit", "Combine", "Xcode", "watchOS"],
  },
  {
    title: "Media Systems",
    kicker: "Video, audio and graphics",
    description:
      "Media-heavy app work across Metal rendering, animation pipelines, transitions, iTunes/offline audio libraries and chroma-key video editing features.",
    points: [
      "Metal views and rendering pipeline",
      "Chroma key background removal",
      "Offline audio library support",
      "Animation and transition systems",
    ],
    tools: ["Metal", "AVFoundation", "Core Animation", "Video Editing"],
  },
  {
    title: "Payments",
    kicker: "Fintech app engineering",
    description:
      "Fintech mobile delivery with Apple Wallet integration and payment platform collaboration, including Marqeta and EML-backed payment solutions.",
    points: [
      "Apple Wallet integration",
      "Card and payment workflows",
      "Marqeta and EML collaboration",
      "Secure mobile transaction flows",
    ],
    tools: ["Apple Wallet", "Apple Pay", "REST APIs", "Agile Delivery"],
  },
  {
    title: "Product Delivery",
    kicker: "Scrum and execution",
    description:
      "Comfortable inside Scrum teams, translating requirements into user stories, coordinating with cross-functional partners and keeping implementation aligned with product goals.",
    points: [
      "Requirement analysis",
      "User-story breakdown",
      "Daily stand-up ownership",
      "Git-based team workflows",
    ],
    tools: ["Scrum", "SOLID", "MVVM", "Clean Architecture", "Git"],
  },
];

export const appWork = [
  {
    title: "STARZPLAY",
    category: "Streaming iOS and tvOS",
    company: "STARZPLAY",
    logo: publicAsset("images/logos/starzplay.png"),
    appIcon: publicAsset("images/apps/starzplay.png"),
    appUrl:
      "https://apps.apple.com/us/app/starzplay-%D8%B3%D8%AA%D8%A7%D8%B1%D8%B2%D8%A8%D9%84%D8%A7%D9%8A/id962284784",
    period: "Sep 2025 - Present",
    summary:
      "Top-tier MENA streaming platform and leading local SVOD product with around 3 million active subscribers.",
    bullets: [
      "High-performance iOS and tvOS streaming application",
      "Production feature delivery for a large entertainment audience",
      "Scalable architecture and Scrum-based execution",
    ],
    tools: ["Swift", "SwiftUI", "tvOS", "MVVM", "Scrum"],
  },
  {
    title: "MyZesty",
    category: "AI video and photo editor",
    company: "Beyond Apps Group",
    logo: publicAsset("images/logos/beyond-apps.png"),
    appIcon: publicAsset("images/apps/myzesty.png"),
    appUrl:
      "https://apps.apple.com/us/app/myzesty-ai-video-editor-maker/id1514372979",
    period: "2024 - 2025",
    summary:
      "All-in-one creative editor with presets, posters, custom filters, chroma tools, underwater enhancement and TV mirroring support.",
    bullets: [
      "Metal-powered views, animations and transitions",
      "Chroma key editing and visual-effect workflows",
      "Offline audio/iTunes library support for richer edits",
    ],
    tools: ["Metal", "AVFoundation", "Swift", "Chroma Key"],
  },
  {
    title: "mCards",
    category: "Digital cards, wallets and rewards",
    company: "Paywith",
    logo: publicAsset("images/logos/paywith.png"),
    appIcon: publicAsset("images/apps/mcards.png"),
    appUrl: "https://apps.apple.com/au/app/mcards/id1440131142",
    period: "2022 - 2024",
    summary:
      "Configurable digital payment ecosystem powering cards, wallets, rewards, promotional cash and tailored financial experiences.",
    bullets: [
      "Apple Wallet and card-flow implementation",
      "Payment platform collaboration with scalable product teams",
      "Rewards and wallet experience delivery",
    ],
    tools: ["Apple Wallet", "Payments", "Marqeta", "EML", "REST APIs"],
  },
  {
    title: "TXLabz Product Work",
    category: "Service company and multiple products",
    company: "TXLabz",
    logo: publicAsset("images/logos/txlabz.png"),
    appIcon: publicAsset("images/logos/txlabz.png"),
    period: "2021 - 2024",
    summary:
      "Worked across different client products at a service-based company, covering communication, value/rewards and kids entertainment experiences.",
    products: [
      {
        name: "myChat",
        icon: publicAsset("images/apps/mychat.png"),
        detail: "Real-time messaging and communication features.",
      },
      {
        name: "Frequent Value",
        icon: publicAsset("images/apps/frequent-value.png"),
        detail: "Customer value, rewards and app workflow delivery.",
      },
      {
        name: "Tankee",
        icon: publicAsset("images/apps/tankee.png"),
        detail: "Mobile product features for a kids entertainment platform.",
      },
    ],
    bullets: [
      "Socket.IO real-time communication",
      "CallKit communication flows",
      "Location monitoring and watchOS",
    ],
    tools: ["Socket.IO", "CallKit", "watchOS", "UIKit"],
  },
];

export const experience = [
  {
    role: "Senior iOS/tvOS Developer",
    company: "STARZPLAY",
    logo: publicAsset("images/logos/starzplay.png"),
    period: "Sep 2025 - Present",
    location: "Remote",
    detail:
      "Contributing to iOS and tvOS application development and maintenance while collaborating with the Scrum team on requirement analysis and user-story planning.",
  },
  {
    role: "Senior iOS Developer",
    company: "Beyond Apps Group",
    logo: publicAsset("images/logos/beyond-apps.png"),
    period: "Sep 2024 - Sep 2025",
    location: "Lahore, Pakistan - Remote",
    detail:
      "Developed Metal views, animation pipelines, transitions, offline audio support and chroma-key video editing features.",
  },
  {
    role: "Senior iOS Developer",
    company: "Paywith",
    logo: publicAsset("images/logos/paywith.png"),
    period: "Jun 2022 - Jul 2024",
    location: "Vancouver, Canada - Remote",
    detail:
      "Built fintech mobile features with Apple Wallet integration and payment partners including Marqeta and EML through TXLabz collaboration.",
  },
  {
    role: "Senior iOS Developer",
    company: "TXLabz",
    logo: publicAsset("images/logos/txlabz.png"),
    period: "Feb 2021 - Jun 2024",
    location: "Lahore, Pakistan - Onsite",
    detail:
      "Progressed from iOS Developer to Senior iOS Developer, creating SwiftUI views, modifiers and animations while handling complex projects, third-party libraries, APIs and Git-based team workflows.",
  },
];

export const education = [
  {
    title: "Bachelor in Computer Science",
    place: "The University of Lahore",
    period: "2017 - 2021",
  },
  {
    title: "Ten Habits of Great Problem-Solvers",
    place: "Scott Mautz course",
    period: "2024",
  },
];
