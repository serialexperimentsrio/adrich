export const companyProfile = {
  name: "Adrich",
  tagline: "Think. Create. Influence.",
  industry: "Advertising Services",
  founded: "1997",
  headquarters: "Dhaka, Bangladesh",
  address: "House #32,34, Road #6, Block F, Banashree, Dhaka 1219, Bangladesh",
  email: "ahsan@adrich.com.bd",
  phone: "+880 1711-638437",
};

/** Addresses that receive contact-form and proposal-request emails. */
export const inquiryRecipients = [companyProfile.email, "rio@adrich.com.bd"];

export const founderProfile = {
  name: "Ahsan Habib",
  title: "Founder & Creative Director",
  photo: "/founder.jpg",
  linkedin: "https://www.linkedin.com/in/ahsandb/",
  bio:
    "We started our journey in Dhaka, back in 1997, when TV, radio, and print were the primary ways to connect with audiences. Over the years, as the media evolved, so did we. Today, Adrich helps brands navigate the digital landscape with clear strategy, creative content, and impactful campaigns.",
};

export const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
] as const;

export const yearsInBusiness = new Date().getFullYear() - Number(companyProfile.founded);

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
      "Television commercials from the first idea to the final master: script, casting, shoot, edit and colour.",
    deliverables: [
      "Creative direction and scripts",
      "Production planning and casting",
      "Shoot, edit, colour and final mastering",
    ],
  },
  {
    slug: "corporate-av-production",
    title: "Corporate AV Production",
    description:
      "Films that show what a company actually does: its people, its facilities and the way it works.",
    deliverables: [
      "Storyboards and interview planning",
      "On-site filming and sound",
      "Motion titles and subtitled versions",
    ],
  },
  {
    slug: "social-media-content-production",
    title: "Social Media Content Production",
    description:
      "Regular content and social advertising for Facebook, Instagram, YouTube and LinkedIn.",
    deliverables: [
      "Monthly content calendars",
      "Short-form video and static posts",
      "Captions and posting kits",
    ],
  },
  {
    slug: "digital-campaign-strategy",
    title: "Digital Campaign Strategy",
    description:
      "Planning which channels to use, what to say on each, and how to tell whether it worked, including content strategy and SEO basics.",
    deliverables: [
      "Audience and channel planning",
      "Messaging and funnel mapping",
      "Campaign reporting",
    ],
  },
  {
    slug: "paid-ads-management",
    title: "Paid Ads Management (Meta, Google, LinkedIn)",
    description: "Setting up, running and adjusting paid campaigns across the main ad platforms.",
    deliverables: [
      "Campaign setup and tracking",
      "Creative and audience testing",
      "Budget management and weekly updates",
    ],
  },
  {
    slug: "branding-and-graphic-design",
    title: "Branding",
    description: "Identities and campaign visuals that hold together wherever the brand shows up.",
    deliverables: [
      "Key visuals and identity systems",
      "Campaign design toolkits",
      "Presentations and collateral",
    ],
  },
  {
    slug: "print-production",
    title: "Print Production",
    description: "Brochures, posters and outdoor, with careful attention to layout, colour and finish.",
    deliverables: [
      "Brochures and company profiles",
      "Posters and outdoor adaptations",
      "Pre-press checks and print supervision",
    ],
  },
];

export type PortfolioCategory = "TVC" | "Corporate AV" | "Digital" | "Animation";
export type PortfolioFilter = "All" | PortfolioCategory;

export const portfolioFilters: PortfolioFilter[] = ["All", "TVC", "Corporate AV", "Digital", "Animation"];

const categoryServiceSlug: Record<PortfolioCategory, string> = {
  TVC: "tvc-production",
  "Corporate AV": "corporate-av-production",
  Digital: "social-media-content-production",
  Animation: "tvc-production",
};

/** Title of the service that best matches a portfolio category (used to preselect the proposal form). */
export function serviceForCategory(category: PortfolioCategory) {
  return services.find((service) => service.slug === categoryServiceSlug[category])?.title;
}

export type PortfolioItem = {
  slug: string;
  title: string;
  client: string;
  category: PortfolioCategory;
  tags: PortfolioCategory[];
  summary: string;
  year: string;
  /** LinkedIn post embed URL for the film. */
  embedSrc?: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "brb-ht-cable-tvc",
    title: "BRB HT Cable",
    client: "BRB Cable Industries",
    category: "TVC",
    tags: ["TVC", "Digital"],
    summary:
      "A TV commercial for BRB's high-tension cables, built around strength and reliability, with shorter cuts for social and digital.",
    year: "2025",
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7377644752827056128?collapsed=1",
  },
  {
    slug: "brb-frls-cable-tvc",
    title: "BRB FRLS Cable",
    client: "BRB Cable Industries",
    category: "TVC",
    tags: ["TVC", "Digital"],
    summary:
      "A safety-led commercial for BRB's fire-retardant, low-smoke cables, with versions edited for social and video platforms.",
    year: "2024",
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7377644528461205504?collapsed=1",
  },
  {
    slug: "ali-salt-tvc",
    title: "Ali Salt",
    client: "Ali Salt",
    category: "TVC",
    tags: ["TVC", "Animation"],
    summary:
      "A household story for Ali Salt that mixes live action with motion graphics.",
    year: "2024",
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7377644350828302336?collapsed=1",
  },
  {
    slug: "lovely-shopping-center-tvc",
    title: "Lovely Shopping Center",
    client: "Lovely Shopping Center",
    category: "Digital",
    tags: ["Digital", "TVC"],
    summary:
      "A seasonal retail campaign made for TV and for watching on a phone.",
    year: "2023",
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7377644112621047808?collapsed=1",
  },
  {
    slug: "superstar-bulb-tvc",
    title: "Superstar Bulb",
    client: "Superstar Group",
    category: "Animation",
    tags: ["Animation", "TVC"],
    summary:
      "An energy-saving message for Superstar's LED bulbs, told through stylised product animation.",
    year: "2023",
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7377643602048372736?collapsed=1",
  },
  {
    slug: "jibon-mineral-water-tvc",
    title: "Jibon Mineral Water",
    client: "Jibon",
    category: "TVC",
    tags: ["TVC", "Digital"],
    summary:
      "A bright, fast-paced lifestyle commercial for Jibon, with cuts for TV, reels and YouTube.",
    year: "2022",
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7377643384116789248?collapsed=1",
  },
  {
    slug: "kollany-rice-bran-oil-tvc",
    title: "Kollany Rice Bran Oil",
    client: "Kollany Foods",
    category: "TVC",
    tags: ["TVC", "Digital"],
    summary:
      "A commercial presenting Kollany Rice Bran Oil as an everyday healthy choice, with matching digital assets.",
    year: "2022",
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7377643186871177216?collapsed=1",
  },
  {
    slug: "corporate-av-brb-cable",
    title: "BRB Cable — Corporate Film",
    client: "BRB Cable Industries",
    category: "Corporate AV",
    tags: ["Corporate AV", "Digital"],
    summary:
      "A corporate film about BRB's manufacturing, quality control and export work, made for partners and stakeholders.",
    year: "2025",
    embedSrc: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7377642799296528384?collapsed=1",
  },
];

/** Public LinkedIn post URL for a project's embed, for a "watch on LinkedIn" link. */
export function linkedinPostUrl(embedSrc?: string) {
  const urn = embedSrc?.match(/urn:li:[A-Za-z]+:\d+/)?.[0];
  return urn ? `https://www.linkedin.com/feed/update/${urn}/` : undefined;
}

export const processSteps = [
  {
    title: "Think",
    detail: "We start by understanding the brand, the audience and what the campaign has to achieve.",
  },
  {
    title: "Create",
    detail: "Then we write, design and shoot: scripts, films, visuals and everything the media plan needs.",
  },
  {
    title: "Influence",
    detail: "Finally we put the work in front of people on TV and online, and keep adjusting it while it runs.",
  },
] as const;

export const clientLogos = [
  { name: "BRB Cable Industries", src: "/logos/BRB.jpeg" },
  { name: "City Group", src: "/logos/city%20group.png" },
  { name: "Kiam", src: "/logos/kiam.png" },
  { name: "Kollany Rice Bran Oil", src: "/logos/Kollany%20Rice%20Bran%20Oil.jpeg" },
  { name: "SSG", src: "/logos/ssg.png" },
  { name: "Sunlite", src: "/logos/sunlite.png" },
] as const;

/** The agency's story, told from the founder's own account. */
export const eras = [
  {
    label: "1997",
    title: "Dhaka, the beginning",
    detail: "Adrich starts out when TV, radio and print are the main ways to reach an audience.",
  },
  {
    label: "Since",
    title: "The media changed. So did we.",
    detail: "As audiences moved to new screens, the work moved with them.",
  },
  {
    label: "Today",
    title: "Strategy, content, campaigns",
    detail: "We help brands find their way through digital with clear thinking and well-made work.",
  },
] as const;

export const newsItems = [
  {
    slug: "brb-ht-cable-tvc-launch",
    date: "March 2026",
    title: "BRB HT Cable commercial is on air",
    summary: "Our TVC for BRB HT Cable is out, alongside shorter cuts for social and digital.",
    href: "/work/brb-ht-cable-tvc",
  },
  {
    slug: "corporate-av-brb-release",
    date: "January 2026",
    title: "BRB Cable corporate film released",
    summary: "A look inside BRB's manufacturing and quality process, made for partners and stakeholders.",
    href: "/work/corporate-av-brb-cable",
  },
  {
    slug: "superstar-motion-refresh",
    date: "November 2025",
    title: "New animated work for Superstar Bulb",
    summary: "Animated explainers and social cut-downs extending the Superstar Bulb campaign.",
    href: "/work/superstar-bulb-tvc",
  },
  {
    slug: "kollany-oil-awareness-wave",
    date: "August 2025",
    title: "Kollany Rice Bran Oil campaign launched",
    summary: "One story told across TV and digital for Kollany Rice Bran Oil.",
    href: "/work/kollany-rice-bran-oil-tvc",
  },
] as const;

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61575491642072" },
  { label: "Instagram", href: "https://instagram.com/adrich" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/adrich/" },
  { label: "YouTube", href: "https://youtube.com/@adrich" },
] as const;
