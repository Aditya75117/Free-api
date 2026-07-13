import type { EndpointExample, Feature } from "@/types/api";

export const POPULAR_ENDPOINTS: EndpointExample[] = [
  {
    keyword: "users",
    label: "Users",
    description: "Generate mock user profiles with names, emails, and avatars for auth and admin UIs.",
    icon: "users",
  },
  {
    keyword: "posts",
    label: "Posts",
    description: "Blog-style posts with titles, bodies, and metadata for feeds and CMS prototypes.",
    icon: "file-text",
  },
  {
    keyword: "products",
    label: "Products",
    description: "E-commerce product listings with prices, categories, and descriptions.",
    icon: "shopping-bag",
  },
  {
    keyword: "books",
    label: "Books",
    description: "Book records with authors, ISBNs, and genres for library and bookstore apps.",
    icon: "book-open",
  },
  {
    keyword: "movies",
    label: "Movies",
    description: "Movie data with ratings, genres, and release years for streaming UIs.",
    icon: "film",
  },
  {
    keyword: "comments",
    label: "Comments",
    description: "Threaded comments with authors and timestamps for discussion features.",
    icon: "message-square",
  },
  {
    keyword: "recipes",
    label: "Recipes",
    description: "Recipe records with ingredients, instructions, and cook times for food apps.",
    icon: "chef-hat",
  },
  {
    keyword: "photos",
    label: "Photos",
    description: "Photo metadata with titles, URLs, and albums for gallery and media UIs.",
    icon: "image",
  },
  {
    keyword: "todos",
    label: "Todos",
    description: "Todo items with titles, completion status, and due dates for task managers.",
    icon: "check-square",
  },
  {
    keyword: "albums",
    label: "Albums",
    description: "Photo album records with titles and cover images for media libraries.",
    icon: "images",
  },
  {
    keyword: "companies",
    label: "Companies",
    description: "Company profiles with names, industries, and descriptions for CRM dashboards.",
    icon: "building-2",
  },
  {
    keyword: "vehicles",
    label: "Vehicles",
    description: "Vehicle records with make, model, year, and VIN for automotive apps.",
    icon: "car",
  },
  {
    keyword: "addresses",
    label: "Addresses",
    description: "Address records with streets, cities, and zip codes for location forms.",
    icon: "map-pin",
  },
];

export const AI_ENDPOINTS: EndpointExample[] = [
  {
    keyword: "dogs",
    label: "Dogs",
    description: "AI-generated dog records with breeds, ages, and descriptions.",
    icon: "dog",
    aiPowered: true,
  },
  {
    keyword: "planets",
    label: "Planets",
    description: "AI-generated planet data with atmospheres, distances, and traits.",
    icon: "globe",
    aiPowered: true,
  },
  {
    keyword: "invoices",
    label: "Invoices",
    description: "AI-generated invoice records for billing and finance prototypes.",
    icon: "receipt",
    aiPowered: true,
  },
];

export const FEATURES: Feature[] = [
  {
    title: "Instant Mock APIs",
    description:
      "Generate REST endpoints on the fly with a single keyword — no setup, no signup, and no local server required.",
    icon: "zap",
  },
  {
    title: "Customizable Parameters",
    description:
      "Tune count, pagination, sorting, search, and seed with query parameters for realistic API responses.",
    icon: "sliders-horizontal",
  },
  {
    title: "Live JSON Preview",
    description:
      "Inspect formatted responses in a Monaco-powered editor before copying URLs or downloading JSON.",
    icon: "code-2",
  },
  {
    title: "AI-Powered Keywords",
    description:
      "Try any custom English keyword — AI generates domain-specific mock data via OpenRouter on demand.",
    icon: "sparkles",
  },
  {
    title: "Developer-First",
    description:
      "Copy URLs, download JSON, and grab cURL, fetch, and Axios snippets — built for fast frontend prototyping.",
    icon: "terminal",
  },
  {
    title: "Response Field Filtering",
    description:
      "Filter which fields appear in the JSON preview and API response — copy only the props your components need.",
    icon: "sliders-horizontal",
  },
  {
    title: "API Groups",
    description:
      "Create and manage groups of related endpoints. Save configs, use templates, and export or import as JSON.",
    icon: "folder",
  },
];
