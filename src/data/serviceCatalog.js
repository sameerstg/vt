const authorPool = [
  { img: "/images/team/fl-s-1.png", name: "Wanda Runo" },
  { img: "/images/team/fl-s-2.png", name: "Ali Tufan" },
  { img: "/images/team/fl-s-3.png", name: "Brooklyn Simmons" },
  { img: "/images/team/fl-s-4.png", name: "Cameron Williamson" },
  { img: "/images/team/fl-s-1.png", name: "Leslie Alexander" },
  { img: "/images/team/fl-s-2.png", name: "Guy Hawkins" },
];

const primaryImages = [
  "/images/listings/g-1.jpg",
  "/images/listings/g-2.jpg",
  "/images/listings/g-3.jpg",
  "/images/listings/g-4.jpg",
  "/images/listings/g-10.jpg",
  "/images/listings/g-17.jpg",
];

const secondaryImages = [
  "/images/listings/g-17.jpg",
  "/images/listings/g-18.jpg",
  "/images/listings/g-19.jpg",
  "/images/listings/g-20.jpg",
  "/images/listings/g-21.jpg",
  "/images/listings/g-22.jpg",
];

const gallerySets = [
  [
    "/images/listings/g-2.jpg",
    "/images/listings/g-1.jpg",
    "/images/listings/g-3.jpg",
  ],
  [
    "/images/listings/g-4.jpg",
    "/images/listings/g-10.jpg",
    "/images/listings/g-1.jpg",
  ],
  [
    "/images/listings/g-3.jpg",
    "/images/listings/g-2.jpg",
    "/images/listings/g-4.jpg",
  ],
];

const serviceBlueprints = [
  {
    rating: 4.98,
    review: 124,
    priceOffset: 0,
    deliveryTime: "1d",
    location: "united-states",
    sort: "best-seller",
    tool: "figma",
    language: "english",
    serviceMode: "virtual",
  },
  {
    rating: 4.94,
    review: 108,
    priceOffset: 35,
    deliveryTime: "2d",
    location: "united-kingdom",
    sort: "recommended",
    tool: "adobe-photoshop",
    language: "english",
    serviceMode: "virtual",
  },
  {
    rating: 4.91,
    review: 96,
    priceOffset: 70,
    deliveryTime: "3d",
    location: "canada",
    sort: "new-arrivals",
    tool: "sketch",
    language: "spanish",
    serviceMode: "virtual",
  },
  {
    rating: 4.88,
    review: 87,
    priceOffset: 95,
    deliveryTime: "4d",
    location: "germany",
    sort: "best-seller",
    tool: "adobe-xd",
    language: "italian",
    serviceMode: "physical",
  },
  {
    rating: 4.93,
    review: 101,
    priceOffset: 120,
    deliveryTime: "5d",
    location: "turkey",
    sort: "recommended",
    tool: "balsamiq",
    language: "turkish",
    serviceMode: "virtual",
  },
  {
    rating: 4.97,
    review: 132,
    priceOffset: 150,
    deliveryTime: "7d",
    location: "united-states",
    sort: "new-arrivals",
    tool: "figma",
    language: "english",
    serviceMode: "physical",
  },
];

const rawCategoryDefinitions = [
  {
    title: "Development & IT",
    slug: "development-it",
    icon: "flaticon-developer",
    description:
      "Launch faster with frontend, backend, and mobile specialists ready to ship polished digital products.",
    heroImage: "/images/blog/blog-20.jpg",
    sections: [
      {
        title: "Web Development",
        items: [
          {
            title: "Frontend Development",
            slug: "frontend-development",
            description:
              "Modern interfaces built for performance, clarity, and conversion.",
            basePrice: 120,
            services: [
              "I will build responsive Next.js landing pages",
              "I will convert Figma designs into React interfaces",
              "I will create reusable dashboard components",
              "I will optimize website speed and Core Web Vitals",
              "I will fix frontend bugs in React applications",
              "I will build ecommerce storefronts with modern UI",
            ],
          },
          {
            title: "Backend Development",
            slug: "backend-development",
            description:
              "Secure APIs, clean data models, and reliable server-side workflows.",
            basePrice: 140,
            services: [
              "I will build secure Node.js APIs",
              "I will design scalable database architecture",
              "I will integrate third-party APIs and webhooks",
              "I will create authentication and role systems",
              "I will optimize backend performance and queries",
              "I will build admin panels with server integrations",
            ],
          },
        ],
      },
      {
        title: "Product Development",
        items: [
          {
            title: "Mobile App Development",
            slug: "mobile-app-development",
            description:
              "Cross-platform apps with smooth onboarding, stable integrations, and release-ready builds.",
            basePrice: 180,
            services: [
              "I will build cross-platform mobile apps in React Native",
              "I will create user-friendly onboarding flows for apps",
              "I will integrate push notifications and in-app messaging",
              "I will connect mobile apps to Firebase backends",
              "I will fix bugs and polish existing mobile apps",
              "I will publish and prepare apps for app stores",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Design & Creative",
    slug: "design-creative",
    icon: "flaticon-web-design-1",
    description:
      "Strong visuals, sharper product experiences, and creative assets tailored for growth-stage brands.",
    heroImage: "/images/listings/g-3.jpg",
    sections: [
      {
        title: "Brand Design",
        items: [
          {
            title: "Brand Identity Design",
            slug: "brand-identity-design",
            description:
              "Distinct branding systems for startups, agencies, and product-led businesses.",
            basePrice: 110,
            services: [
              "I will design memorable logo concepts and brand marks",
              "I will create brand style guides for growing businesses",
              "I will build premium social media brand kits",
              "I will design business cards and stationery sets",
              "I will refresh outdated brand identities with modern visuals",
              "I will create cohesive startup branding systems",
            ],
          },
        ],
      },
      {
        title: "Product Design",
        items: [
          {
            title: "UI/UX Design",
            slug: "ui-ux-design",
            description:
              "Product interfaces designed to feel intuitive from first click to final conversion.",
            basePrice: 130,
            services: [
              "I will design clean web app dashboards in Figma",
              "I will create mobile app wireframes and flows",
              "I will redesign landing pages for better conversion",
              "I will build clickable prototypes for product teams",
              "I will improve user journeys with UX audits",
              "I will design SaaS interfaces with reusable systems",
            ],
          },
          {
            title: "Illustration",
            slug: "illustration",
            description:
              "Custom illustration work for editorial, marketing, and digital product storytelling.",
            basePrice: 95,
            services: [
              "I will create custom editorial illustrations",
              "I will draw character illustrations for brands",
              "I will design product mockup scenes and graphics",
              "I will create vector artwork for websites and apps",
              "I will illustrate marketing visuals for campaigns",
              "I will craft playful hero images for landing pages",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    icon: "flaticon-digital-marketing",
    description:
      "Performance-focused marketing support across organic growth, social channels, and paid acquisition.",
    heroImage: "/images/listings/g-1.jpg",
    sections: [
      {
        title: "Organic Growth",
        items: [
          {
            title: "SEO",
            slug: "seo",
            description:
              "Technical and content SEO work designed to improve rankings and qualified traffic.",
            basePrice: 125,
            services: [
              "I will perform complete on-page SEO optimization",
              "I will run keyword research for service businesses",
              "I will create SEO content briefs that rank",
              "I will optimize technical SEO and site structure",
              "I will build local SEO strategies for maps visibility",
              "I will audit and improve existing SEO performance",
            ],
          },
          {
            title: "Social Media Marketing",
            slug: "social-media-marketing",
            description:
              "Content planning and channel management for brands that need reliable monthly execution.",
            basePrice: 90,
            services: [
              "I will manage monthly Instagram and Facebook content",
              "I will create social media calendars for your brand",
              "I will design engagement campaigns for launches",
              "I will grow your LinkedIn presence with strategic posts",
              "I will build community management workflows",
              "I will create content plans for reels and short videos",
            ],
          },
        ],
      },
      {
        title: "Performance Marketing",
        items: [
          {
            title: "Paid Ads",
            slug: "paid-ads",
            description:
              "Campaign setup, testing, and optimization for Meta and Google acquisition funnels.",
            basePrice: 150,
            services: [
              "I will launch high-converting Meta ad campaigns",
              "I will manage Google Ads for lead generation",
              "I will build retargeting funnels for ecommerce brands",
              "I will write ad copy and creative testing plans",
              "I will optimize ad budgets and reduce acquisition cost",
              "I will audit underperforming paid campaigns",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Writing & Translation",
    slug: "writing-translation",
    icon: "flaticon-translator",
    description:
      "Clear messaging, stronger content structure, and polished copy tailored to each stage of your funnel.",
    heroImage: "/images/listings/g-17.jpg",
    sections: [
      {
        title: "Business Writing",
        items: [
          {
            title: "Website Content",
            slug: "website-content",
            description:
              "Messaging and page copy that explains your offer cleanly and drives action.",
            basePrice: 85,
            services: [
              "I will write conversion-focused website copy",
              "I will craft service pages that explain your offer clearly",
              "I will rewrite homepages for better messaging",
              "I will create SEO-friendly landing page content",
              "I will write About Us pages with strong brand voice",
              "I will produce website content for startups and agencies",
            ],
          },
          {
            title: "Blog Writing",
            slug: "blog-writing",
            description:
              "Structured long-form articles built around search intent and subject-matter clarity.",
            basePrice: 70,
            services: [
              "I will write SEO blog posts for SaaS brands",
              "I will create long-form articles with research",
              "I will write educational guides for your niche",
              "I will turn rough notes into polished blog content",
              "I will plan blog clusters around target keywords",
              "I will refresh existing blog posts for better ranking",
            ],
          },
        ],
      },
      {
        title: "Localization",
        items: [
          {
            title: "Translation",
            slug: "translation",
            description:
              "Natural translations and localized messaging for websites, campaigns, and business documents.",
            basePrice: 60,
            services: [
              "I will translate English content into Urdu professionally",
              "I will localize website copy for global audiences",
              "I will translate blog articles with natural tone",
              "I will adapt product descriptions for new markets",
              "I will proofread and refine translated documents",
              "I will translate marketing assets with brand consistency",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Video & Animation",
    slug: "video-animation",
    icon: "flaticon-video-file",
    description:
      "Edit, animate, and repurpose footage into polished assets built for launches, ads, and social growth.",
    heroImage: "/images/listings/g-4.jpg",
    sections: [
      {
        title: "Editing",
        items: [
          {
            title: "Video Editing",
            slug: "video-editing",
            description:
              "Professional edits for YouTube, product launches, podcasts, and campaign content.",
            basePrice: 100,
            services: [
              "I will edit polished YouTube videos with clean pacing",
              "I will create promo video cuts for product launches",
              "I will add captions and branding to business videos",
              "I will edit podcast video episodes for social platforms",
              "I will color-correct and improve raw footage",
              "I will turn long videos into platform-ready cuts",
            ],
          },
          {
            title: "Motion Graphics",
            slug: "motion-graphics",
            description:
              "Animated sequences and branded motion assets that add clarity and energy to your message.",
            basePrice: 135,
            services: [
              "I will create animated logo intros and outros",
              "I will design motion graphics for ads and reels",
              "I will produce animated titles and lower thirds",
              "I will animate UI showcases for app demos",
              "I will build branded explainer motion scenes",
              "I will create looping animations for websites",
            ],
          },
        ],
      },
      {
        title: "Content Repurposing",
        items: [
          {
            title: "Short Form Content",
            slug: "short-form-content",
            description:
              "Fast-cut content packages optimized for retention across TikTok, Reels, and Shorts.",
            basePrice: 80,
            services: [
              "I will edit viral-style TikTok and Reels videos",
              "I will repurpose podcasts into short clips",
              "I will add captions, hooks, and punchy transitions",
              "I will create short-form content packages for brands",
              "I will edit UGC ads for paid social campaigns",
              "I will deliver YouTube Shorts with strong retention",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Music & Audio",
    slug: "music-audio",
    icon: "flaticon-microphone",
    description:
      "Voice, music, and post-production services for creators, brands, and teams shipping audio-first content.",
    heroImage: "/images/listings/g-2.jpg",
    sections: [
      {
        title: "Voice Work",
        items: [
          {
            title: "Voice Over",
            slug: "voice-over",
            description:
              "Clear voice recordings for ads, explainers, IVR systems, and branded campaigns.",
            basePrice: 75,
            services: [
              "I will record a clear male voice over for ads",
              "I will deliver professional female narration for videos",
              "I will record explainer voice overs with clean audio",
              "I will produce warm brand voice overs for promos",
              "I will record IVR and phone system voice prompts",
              "I will deliver energetic voice overs for social content",
            ],
          },
          {
            title: "Podcast Editing",
            slug: "podcast-editing",
            description:
              "Episode cleanup, pacing, mastering, and social repurposing for recurring podcast workflows.",
            basePrice: 95,
            services: [
              "I will edit podcast episodes with noise cleanup",
              "I will mix interview podcasts for broadcast quality",
              "I will create podcast intros, outros, and transitions",
              "I will remove filler words and tighten conversations",
              "I will prepare podcast clips for social media",
              "I will master podcast audio for Spotify and Apple",
            ],
          },
        ],
      },
      {
        title: "Production",
        items: [
          {
            title: "Music Production",
            slug: "music-production",
            description:
              "Original music, arrangements, and finishing work for commercial and creator projects.",
            basePrice: 160,
            services: [
              "I will produce custom background music for videos",
              "I will compose cinematic music for trailers",
              "I will create catchy jingles for brand campaigns",
              "I will arrange and polish songs for release",
              "I will mix and master tracks for streaming platforms",
              "I will create loop packs and instrumentals for creators",
            ],
          },
        ],
      },
    ],
  },
];

const buildServiceCard = ({
  categoryIndex,
  categoryTitle,
  subcategoryIndex,
  serviceIndex,
  subcategoryTitle,
  title,
  basePrice,
  serviceSlug,
}) => {
  const blueprint = serviceBlueprints[serviceIndex % serviceBlueprints.length];
  const visualSeed = categoryIndex + subcategoryIndex + serviceIndex;
  const author = authorPool[visualSeed % authorPool.length];

  return {
    id: `${serviceSlug}-${serviceIndex + 1}`,
    img: primaryImages[visualSeed % primaryImages.length],
    img2: secondaryImages[visualSeed % secondaryImages.length],
    category: subcategoryTitle,
    parentCategory: categoryTitle,
    title,
    rating: blueprint.rating,
    review: blueprint.review + categoryIndex * 7 + subcategoryIndex * 5,
    author,
    price: basePrice + blueprint.priceOffset,
    tag: subcategoryTitle,
    deliveryTime: blueprint.deliveryTime,
    level:
      serviceIndex % 3 === 0
        ? "top-rated"
        : serviceIndex % 2 === 0
          ? "lavel-2"
          : "lavel-1",
    location: blueprint.location,
    sort: blueprint.sort,
    tool: blueprint.tool,
    language: blueprint.language,
    serviceMode: blueprint.serviceMode,
    ...(serviceIndex % 2 === 1
      ? { gallery: gallerySets[visualSeed % gallerySets.length] }
      : {}),
  };
};

const buildCategory = (category, categoryIndex) => {
  const subcategories = [];

  const sections = category.sections.map((section) => {
    const items = section.items.map((item) => {
      const subcategoryIndex = subcategories.length;
      const subcategory = {
        title: item.title,
        slug: item.slug,
        description: item.description,
        services: item.services.map((serviceTitle, serviceIndex) =>
          buildServiceCard({
            categoryIndex,
            categoryTitle: category.title,
            subcategoryIndex,
            serviceIndex,
            subcategoryTitle: item.title,
            title: serviceTitle,
            basePrice: item.basePrice,
            serviceSlug: item.slug,
          }),
        ),
      };

      subcategories.push(subcategory);

      return {
        title: subcategory.title,
        slug: subcategory.slug,
        description: subcategory.description,
      };
    });

    return {
      title: section.title,
      items,
    };
  });

  return {
    title: category.title,
    slug: category.slug,
    icon: category.icon,
    description: category.description,
    heroImage: category.heroImage,
    sections,
    subcategories,
  };
};

export const serviceCategories = rawCategoryDefinitions.map((category, index) =>
  buildCategory(category, index),
);

export const serviceOverview = {
  title: "All Categories",
  description:
    "Browse functional service categories and jump straight into subcategory-specific gig listings built from the same service page layout.",
  heroImage: "/images/blog/blog-20.jpg",
};

export const getServiceCategoryBySlug = (slug) =>
  serviceCategories.find((category) => category.slug === slug);

export const getServiceSubcategoryBySlug = (category, slug) =>
  category?.subcategories.find((subcategory) => subcategory.slug === slug);

export const getServiceBrowseHrefByTitle = (
  title,
  { preferSubcategory = true } = {},
) => {
  const normalizedTitle = title?.trim().toLowerCase();

  if (!normalizedTitle) return "/services";

  for (const category of serviceCategories) {
    if (category.title.trim().toLowerCase() === normalizedTitle) {
      if (preferSubcategory && category.subcategories[0]) {
        return `/services/${category.slug}/${category.subcategories[0].slug}`;
      }

      return `/services/${category.slug}`;
    }

    const matchedSubcategory = category.subcategories.find(
      (subcategory) => subcategory.title.trim().toLowerCase() === normalizedTitle,
    );

    if (matchedSubcategory) {
      return `/services/${category.slug}/${matchedSubcategory.slug}`;
    }
  }

  return "/services";
};

export const getCategoryServices = (category) =>
  category
    ? category.subcategories.flatMap((subcategory) => subcategory.services)
    : [];

export const getAllServices = () =>
  serviceCategories.flatMap((category) => getCategoryServices(category));

export const getFeaturedServices = (limit = 6) =>
  serviceCategories
    .flatMap((category) => category.subcategories[0]?.services.slice(0, 1) || [])
    .slice(0, limit);

const normalizeCatalogText = (value = "") =>
  value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const getMatchScore = (candidate, query) => {
  if (!candidate || !query) return 0;
  if (candidate === query) return 120;
  if (candidate.startsWith(query)) return 95;
  if (candidate.includes(query)) return 80;

  const queryParts = query.split(" ").filter(Boolean);
  if (queryParts.length && queryParts.every((part) => candidate.includes(part))) {
    return 65;
  }

  return 0;
};

export const findServiceBrowseMatch = (
  query,
  { preferredCategorySlug } = {},
) => {
  const normalizedQuery = normalizeCatalogText(query);

  if (!normalizedQuery) return null;

  const categoriesToSearch = preferredCategorySlug
    ? serviceCategories.filter((category) => category.slug === preferredCategorySlug)
    : serviceCategories;

  let bestMatch = null;

  for (const category of categoriesToSearch) {
    const categoryScore = getMatchScore(
      normalizeCatalogText(category.title),
      normalizedQuery,
    );

    if (categoryScore > (bestMatch?.score || 0)) {
      bestMatch = {
        href: `/services/${category.slug}`,
        score: categoryScore,
        type: "category",
      };
    }

    for (const subcategory of category.subcategories) {
      const subcategoryScore = getMatchScore(
        normalizeCatalogText(subcategory.title),
        normalizedQuery,
      );

      if (subcategoryScore > (bestMatch?.score || 0)) {
        bestMatch = {
          href: `/services/${category.slug}/${subcategory.slug}`,
          score: subcategoryScore,
          type: "subcategory",
        };
      }

      for (const service of subcategory.services) {
        const serviceScore = getMatchScore(
          normalizeCatalogText(service.title),
          normalizedQuery,
        );

        if (serviceScore > (bestMatch?.score || 0)) {
          bestMatch = {
            href: `/services/${category.slug}/${subcategory.slug}`,
            score: serviceScore,
            type: "service",
          };
        }
      }
    }
  }

  return bestMatch;
};

export const getAllServiceCategoryParams = () =>
  serviceCategories.map((category) => ({
    category: category.slug,
  }));

export const getAllServiceSubcategoryParams = () =>
  serviceCategories.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      category: category.slug,
      subcategory: subcategory.slug,
    })),
  );
