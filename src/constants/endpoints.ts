import type { EndpointExample, Feature } from "@/types/api";

export const POPULAR_ENDPOINTS: EndpointExample[] = [
  {
    keyword: "users",
    label: "Users",
    description: "Generate mock user profiles with names, emails, and avatars.",
    icon: "users",
  },
  {
    keyword: "posts",
    label: "Posts",
    description: "Blog-style posts with titles, bodies, and metadata.",
    icon: "file-text",
  },
  {
    keyword: "products",
    label: "Products",
    description: "E-commerce product listings with prices and descriptions.",
    icon: "shopping-bag",
  },
  {
    keyword: "books",
    label: "Books",
    description: "Book records with authors, ISBNs, and genres.",
    icon: "book-open",
  },
  {
    keyword: "movies",
    label: "Movies",
    description: "Movie data with ratings, genres, and release years.",
    icon: "film",
  },
  {
    keyword: "comments",
    label: "Comments",
    description: "Threaded comments with authors and timestamps.",
    icon: "message-square",
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
      "Generate REST endpoints on the fly with a single keyword — no setup required.",
    icon: "zap",
  },
  {
    title: "Customizable Parameters",
    description:
      "Tune count, pagination, and more with query parameters for realistic responses.",
    icon: "sliders-horizontal",
  },
  {
    title: "Live JSON Preview",
    description:
      "Inspect formatted responses in a Monaco-powered editor before copying to your project.",
    icon: "code-2",
  },
  {
    title: "AI-Powered Keywords",
    description:
      "Try any custom keyword — AI-generated mock data via OpenRouter.",
    icon: "sparkles",
  },
  {
    title: "Developer-First",
    description:
      "Copy URLs, download JSON, and grab code snippets — built for fast prototyping.",
    icon: "terminal",
  },
  {
    title: "Response Field Filtering",
    description:
      "Filter which fields appear in the JSON preview — copy and download only what you need.",
    icon: "sliders-horizontal",
  },
  {
    title: "API Groups",
    description:
      "Create and manage groups of related endpoints. Save configs, use templates, and export/import as JSON.",
    icon: "folder",
  },
];
