export const companyProfile = {
  name: "Adrich",
  tagline: "Think. Create. Influence.",
  industry: "Advertising Services",
  founded: "1997",
  headquarters: "Dhaka, Bangladesh",
  address:
    "House #32,34, Road #6, Block F, Banashree, Dhaka 1219, Bangladesh",
  email: "hello@adrich.agency",
  phone: "+880 1712-000000",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
] as const;

export const trustPoints = [
  {
    title: "Founded",
    value: companyProfile.founded,
    detail: "27+ years shaping campaigns that move markets.",
  },
  {
    title: "Headquarters",
    value: companyProfile.headquarters,
    detail: "Rooted in Dhaka, producing for national and global audiences.",
  },
  {
    title: "Positioning",
    value: "Full-service creative agency",
    detail: "From strategy to production to performance media.",
  },
] as const;

export type Service = {
  slug: string;
  title: string;
  description: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    slug: "tvc-production",
    title: "TVC Production",
    description:
      "Concept to final edit TV commercials crafted for recall, reach, and brand lift.",
    deliverables: [
      "Creative direction and scripts",
      "Production planning and casting",
      "Shoot, edit, color, and final mastering",
    ],
  },
  {
    slug: "corporate-av-production",
    title: "Corporate AV Production",
    description:
      "Corporate narratives that communicate capability, trust, and business impact.",
    deliverables: [
      "Storyboarding and interview frameworks",
      "On-site filming and sound capture",
      "Motion titles and multilingual subtitle packs",
    ],
  },
  {
    slug: "social-media-content-production",
    title: "Social Media Content Production",
    description:
      "Always-on social content systems for Facebook, Instagram, YouTube, and LinkedIn.",
    deliverables: [
      "Monthly content calendars",
      "Short-form video and static creatives",
      "Community-ready copy and posting kits",
    ],
  },
  {
    slug: "digital-campaign-strategy",
    title: "Digital Campaign Strategy",
    description:
      "Cross-platform campaign strategy designed around audience behavior and measurable outcomes.",
    deliverables: [
      "Audience and channel planning",
      "Message architecture and funnel mapping",
      "KPI dashboards and campaign reporting",
    ],
  },
  {
    slug: "paid-ads-management",
    title: "Paid Ads Management (Meta, Google, LinkedIn)",
    description:
      "Performance media buying and optimization across key paid channels.",
    deliverables: [
      "Campaign setup and tracking",
      "A/B creative and audience testing",
      "Budget optimization and weekly insights",
    ],
  },
  {
    slug: "motion-graphics-animation",
    title: "Motion Graphics / Animation",
    description:
      "Visual storytelling through dynamic motion language, explainers, and animated brand assets.",
    deliverables: [
      "2D and 3D animation direction",
      "Animated product explainers",
      "Motion packages for digital campaigns",
    ],
  },
  {
    slug: "branding-and-graphic-design",
    title: "Branding & Graphic Design",
    description:
      "Brand identities and campaign visuals that stay coherent across every touchpoint.",
    deliverables: [
      "Brand key visual systems",
      "Campaign design toolkits",
      "Presentation and collateral design",
    ],
  },
  {
    slug: "print-production",
    title: "Print Production",
    description:
      "Premium print assets delivered with precision in layout, color, and finishing.",
    deliverables: [
      "Brochures and annual profile kits",
      "Poster and OOH adaptation",
      "Pre-press supervision and print QA",
    ],
  },
];

export type PortfolioCategory = "TVC" | "Corporate AV" | "Digital" | "Animation";
export type PortfolioFilter = "All" | PortfolioCategory;

export const portfolioFilters: PortfolioFilter[] = [
  "All",
  "TVC",
  "Corporate AV",
  "Digital",
  "Animation",
];

export type PortfolioItem = {
  slug: string;
  title: string;
  client: string;
  category: PortfolioCategory;
  tags: PortfolioCategory[];
  summary: string;
  year: string;
  thumbnail: string;
  videoPlaceholder: string;
  outcome?: string;
  brief?: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "brb-ht-cable-tvc",
    title: "BRB HT Cable TVC",
    client: "BRB Cable Industries",
    category: "TVC",
    tags: ["TVC", "Digital"],
    summary:
      "A high-voltage product story translated into a cinematic TVC and digital cut-downs focused on trust and durability.",
    brief: "Establish BRB HT Cable as the gold standard for industrial and residential high-tension electrical infrastructure through cinematic storytelling.",
    outcome: "Reached 12M+ households via national broadcast; 35% lift in dealer-led inquiries within Q1.",
    year: "2025",
    thumbnail: "/reel-placeholder.svg",
    videoPlaceholder: "Video placeholder - BRB HT Cable TVC",
  },
  {
    slug: "brb-frls-cable-tvc",
    title: "BRB FRLS Cable TVC",
    client: "BRB Cable Industries",
    category: "TVC",
    tags: ["TVC", "Digital"],
    summary:
      "Safety-led storytelling built for broad awareness, with channel-specific edits for social and video platforms.",
    brief: "Communicate the fire-retardant low-smoke properties of BRB cables to safety-conscious homeowners and architects.",
    outcome: "Broadcast on 8 major channels; digital variants achieved 4.2M views with 60% completion rate.",
    year: "2024",
    thumbnail: "/reel-placeholder.svg",
    videoPlaceholder: "Video placeholder - BRB FRLS Cable TVC",
  },
  {
    slug: "ali-salt-tvc",
    title: "Ali Salt TVC",
    client: "Ali Salt",
    category: "TVC",
    tags: ["TVC", "Animation"],
    summary:
      "A household-focused concept blending live action and motion overlays to improve memorability across audience segments.",
    brief: "Refresh the brand image of Ali Salt, emphasizing purity and health benefits through a modern visual lens.",
    outcome: "Brand recall scores increased by 22% in post-campaign audience surveys.",
    year: "2024",
    thumbnail: "/reel-placeholder.svg",
    videoPlaceholder: "Video placeholder - Ali Salt TVC",
  },
  {
    slug: "lovely-shopping-center-tvc",
    title: "Lovely Shopping Center TVC",
    client: "Lovely Shopping Center",
    category: "Digital",
    tags: ["Digital", "TVC"],
    summary:
      "A retail campaign designed for TV and mobile-first viewing, pushing seasonal footfall and promotional conversions.",
    brief: "Drive seasonal retail traffic and strengthen top-of-mind recall for Lovely Shopping Center through a cross-channel creative rollout.",
    outcome: "Delivered TV and social campaign assets that increased in-store campaign-week footfall and improved promotional awareness.",
    year: "2023",
    thumbnail: "/reel-placeholder.svg",
    videoPlaceholder: "Video placeholder - Lovely Shopping Center TVC",
  },
  {
    slug: "superstar-bulb-tvc",
    title: "Superstar Bulb TVC",
    client: "Superstar Group",
    category: "Animation",
    tags: ["Animation", "TVC"],
    summary:
      "Energy-efficiency messaging paired with stylized product animation to increase visual retention.",
    brief: "Position Superstar LED bulbs as the smartest choice for energy savings and longevity in the Bangladeshi market.",
    outcome: "Successfully drove a 15% increase in seasonal sales volume through integrated TV and POS support.",
    year: "2023",
    thumbnail: "/reel-placeholder.svg",
    videoPlaceholder: "Video placeholder - Superstar Bulb TVC",
  },
  {
    slug: "jibon-mineral-water-tvc",
    title: "Jibon Mineral Water TVC",
    client: "Jibon",
    category: "TVC",
    tags: ["TVC", "Digital"],
    summary:
      "Lifestyle-forward storytelling and campaign assets engineered for TV, reels, and YouTube pre-roll performance.",
    brief: "Associate Jibon Mineral Water with active, healthy lifestyles through vibrant, fast-paced production.",
    outcome: "Digital-first distribution reached 8M+ unique users; high engagement across social-native formats.",
    year: "2022",
    thumbnail: "/reel-placeholder.svg",
    videoPlaceholder: "Video placeholder - Jibon Mineral Water TVC",
  },
  {
    slug: "kollany-rice-bran-oil-tvc",
    title: "Kollany Rice Bran Oil TVC",
    client: "Kollany Foods",
    category: "TVC",
    tags: ["TVC", "Digital"],
    summary:
      "Health-positioned creative concept with a clear product benefit narrative and campaign extension kits.",
    brief: "Reposition Kollany Rice Bran Oil as a healthy everyday choice through a trust-led mass-market story.",
    outcome: "Unified TV and digital messaging supported stronger campaign recall and improved purchase intent in post-campaign feedback.",
    year: "2022",
    thumbnail: "/reel-placeholder.svg",
    videoPlaceholder: "Video placeholder - Kollany Rice Bran Oil TVC",
  },
  {
    slug: "corporate-av-brb-cable",
    title: "Corporate AV of BRB Cable Ind. Ltd.",
    client: "BRB Cable Industries",
    category: "Corporate AV",
    tags: ["Corporate AV", "Digital"],
    summary:
      "A corporate AV designed to present manufacturing strength, quality control, and export capability to stakeholders.",
    brief: "Produce a high-fidelity corporate film showcasing BRB's state-of-the-art manufacturing facilities for international B2B partners.",
    outcome: "Adopted as the primary pitch asset for international trade expos; translated into 3 languages.",
    year: "2025",
    thumbnail: "/reel-placeholder.svg",
    videoPlaceholder: "Video placeholder - Corporate AV of BRB Cable Ind. Ltd.",
  },
];

export const processSteps = [
  {
    title: "Think",
    detail:
      "Research-first strategy, audience mapping, and campaign architecture aligned with business outcomes.",
  },
  {
    title: "Create",
    detail:
      "Concept development, production, design, and media asset pipelines executed with Swiss-level precision.",
  },
  {
    title: "Influence",
    detail:
      "Launch, optimize, and scale across TV and digital channels to drive awareness, preference, and leads.",
  },
] as const;

export const clientLogos = [
  "BRB",
  "Ali Salt",
  "Lovely",
  "Superstar",
  "Jibon",
  "Kollany",
  "Nexus Trade",
  "Delta Build",
] as const;

export const testimonials = [
  {
    quote:
      "Adrich translates ideas into campaign systems. Their production quality and media execution are equally strong.",
    name: "Rahman Kabir",
    role: "Head of Marketing, BRB Cable Industries",
  },
  {
    quote:
      "From TVC craft to digital optimization, the team brought strategic clarity and measurable campaign lift.",
    name: "Nabila Chowdhury",
    role: "Brand Manager, Ali Salt",
  },
  {
    quote:
      "What stands out is discipline. Every deliverable felt editorially precise and commercially effective.",
    name: "Mahin Ahmed",
    role: "Director, Lovely Shopping Center",
  },
] as const;

export const timeline = [
  {
    year: "1997",
    title: "Adrich founded in Dhaka",
    detail: "Launched as a creative and production-focused advertising partner.",
  },
  {
    year: "2006",
    title: "Scaled national TVC operations",
    detail: "Expanded production capacity for FMCG and industrial sectors.",
  },
  {
    year: "2015",
    title: "Digital campaign division established",
    detail: "Integrated social, video, and search channels into campaign offerings.",
  },
  {
    year: "Today",
    title: "Unified full-service agency model",
    detail: "Combining strategy, production, design, media, and performance marketing.",
  },
] as const;

export const values = [
  {
    title: "Creativity",
    detail: "Original ideas designed to move people and brands forward.",
  },
  {
    title: "Strategy",
    detail: "Decision-making rooted in audience insights and campaign intelligence.",
  },
  {
    title: "Execution",
    detail: "Disciplined delivery from concept development to launch-day operations.",
  },
  {
    title: "Impact",
    detail: "Work measured by outcomes, not by outputs alone.",
  },
] as const;

export const teamMembers = [
  {
    name: "Farhan Islam",
    role: "Managing Director",
    bio: "Leads growth strategy and long-term client partnerships.",
  },
  {
    name: "Sadia Hossain",
    role: "Executive Creative Director",
    bio: "Drives creative systems for TVC, digital, and cross-media campaigns.",
  },
  {
    name: "Shihab Uddin",
    role: "Head of Production",
    bio: "Oversees film, motion, and post-production pipelines.",
  },
  {
    name: "Nusrat Jahan",
    role: "Performance Media Lead",
    bio: "Leads paid ads strategy across Meta, Google, and LinkedIn.",
  },
] as const;

export const newsItems = [
  {
    slug: "brb-ht-cable-tvc-launch",
    date: "March 2026",
    title: "BRB HT Cable TVC campaign rollout completed",
    summary:
      "Adrich delivered broadcast and digital campaign variants with audience-targeted cuts for high-frequency reach.",
  },
  {
    slug: "corporate-av-brb-release",
    date: "January 2026",
    title: "Corporate AV for BRB Cable Ind. Ltd. premiered",
    summary:
      "The AV package highlights manufacturing capability, quality process, and export readiness for global stakeholders.",
  },
  {
    slug: "superstar-motion-refresh",
    date: "November 2025",
    title: "Superstar Bulb campaign expanded with motion-led assets",
    summary:
      "Animated explainers and social cut-downs boosted completion rate on paid video placements.",
  },
  {
    slug: "kollany-oil-awareness-wave",
    date: "August 2025",
    title: "Kollany Rice Bran Oil awareness wave launched",
    summary:
      "A unified TV and digital narrative was deployed with conversion-friendly creative testing.",
  },
] as const;

export const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/adrich" },
  { label: "Instagram", href: "https://instagram.com/adrich" },
  { label: "LinkedIn", href: "https://linkedin.com/company/adrich" },
  { label: "YouTube", href: "https://youtube.com/@adrich" },
] as const;
