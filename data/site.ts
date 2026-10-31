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
  /** YouTube video ID for the film (the part after "watch?v=" in its link). */
  youtubeId?: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "united-knitwear-corporate-film",
    title: "United Knitwear",
    client: "United Knitwear Pvt. Ltd.",
    category: "Corporate AV",
    tags: ["Corporate AV"],
    summary:
      "A corporate film for United Knitwear that walks through the company's work, from the production floor to packing and dispatch.",
    year: "2019",
    youtubeId: "-H_0kJBRNT0",
  },
  {
    slug: "adrich-agency-film",
    title: "This Is Adrich",
    client: "Adrich",
    category: "Corporate AV",
    tags: ["Corporate AV", "TVC"],
    summary: "Our own film: a short introduction to Adrich and the kind of work we make for our clients.",
    year: "2019",
    youtubeId: "pOFKyhthyX4",
  },
  {
    slug: "lovely-shopping-center-tvc",
    title: "Lovely Shopping Center",
    client: "Lovely Shopping Center, Kushtia",
    category: "TVC",
    tags: ["TVC"],
    summary: "A TV commercial for Lovely Shopping Center, one of Kushtia's shopping destinations.",
    year: "2016",
    youtubeId: "aFxgG1nCt8g",
  },
  {
    slug: "corporate-av-brb-cable",
    title: "Inside BRB Cable",
    client: "BRB Cable Industries",
    category: "Corporate AV",
    tags: ["Corporate AV"],
    summary:
      "A corporate film about BRB Cable Industries, showing how its cables are made and tested, for partners and stakeholders.",
    year: "2015",
    youtubeId: "Q50WUE1C6iI",
  },
  {
    slug: "kollany-rice-bran-oil-tvc",
    title: "Kollany Rice Bran Oil",
    client: "Kollany Foods",
    category: "TVC",
    tags: ["TVC"],
    summary: "A one-minute TV commercial presenting Kollany Rice Bran Oil as an everyday healthy choice for the family kitchen.",
    year: "2015",
    youtubeId: "JxDpsNLSRE0",
  },
];


/** YouTube embed and watch links for a project's film. */
export function youtubeUrls(id: string) {
  return {
    thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    embed: `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`,
    watch: `https://www.youtube.com/watch?v=${id}`,
  };
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


export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61575491642072" },
  { label: "Instagram", href: "https://instagram.com/adrich" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/adrich/" },
  { label: "YouTube", href: "https://youtube.com/@adrich" },
] as const;
