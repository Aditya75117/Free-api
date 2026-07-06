import type { EndpointExample } from "@/types/api";

import { AI_ENDPOINTS, POPULAR_ENDPOINTS } from "./endpoints";

export type EndpointLandingContent = EndpointExample & {
  metaTitle: string;
  metaDescription: string;
  intro: string;
  useCases: string[];
  body: string;
};

const LANDING_CONTENT: Record<string, Omit<EndpointLandingContent, keyof EndpointExample>> = {
  users: {
    metaTitle: "Mock Users API",
    metaDescription:
      "Generate fake user profiles with names, emails, and avatars. Free mock users REST API for frontend prototyping and testing with ApiGenerator.",
    intro: "Build login screens, profile pages, and admin dashboards without waiting on a user service.",
    useCases: ["Auth UI prototypes", "Admin tables", "Avatar components"],
    body: "The mock users endpoint returns an array of realistic user objects with fields like id, firstName, lastName, email, and avatar URL. Use query parameters to control count, paginate results, filter fields, and sort — perfect for infinite scroll demos or data table testing.",
  },
  posts: {
    metaTitle: "Mock Posts API",
    metaDescription:
      "Generate blog-style posts with titles, bodies, and metadata. Fake posts REST API for content feeds and CMS prototypes with ApiGenerator.",
    intro: "Prototype blogs, news feeds, and content management UIs with realistic post data.",
    useCases: ["Blog layouts", "Feed components", "CMS previews"],
    body: "Each post includes a title, body excerpt, author reference, and timestamps. Combine with the comments endpoint to build threaded discussion UIs. Pagination and field filtering let you tune responses for list views versus detail pages.",
  },
  products: {
    metaTitle: "Mock Products API",
    metaDescription:
      "Generate e-commerce product listings with prices and descriptions. Fake products REST API for storefront and catalog prototypes with ApiGenerator.",
    intro: "Build product grids, cart flows, and catalog pages with realistic commerce data.",
    useCases: ["E-commerce UIs", "Product cards", "Price filters"],
    body: "Product records include name, description, price, category, and image placeholders. Use the count and search parameters to simulate catalog browsing. Filter fields to return only what your product card component needs.",
  },
  books: {
    metaTitle: "Mock Books API",
    metaDescription:
      "Generate book records with authors, ISBNs, and genres. Fake books REST API for library and bookstore app prototypes with ApiGenerator.",
    intro: "Create library catalogs, reading lists, and bookstore layouts with structured book data.",
    useCases: ["Library apps", "Reading lists", "Genre filters"],
    body: "Book objects include title, author, ISBN, genre, and publication year. Ideal for testing search, sort, and filter UI patterns without seeding a database.",
  },
  movies: {
    metaTitle: "Mock Movies API",
    metaDescription:
      "Generate movie data with ratings, genres, and release years. Fake movies REST API for streaming and media app prototypes with ApiGenerator.",
    intro: "Prototype streaming catalogs, watchlists, and rating displays with rich movie metadata.",
    useCases: ["Streaming UIs", "Watchlists", "Rating badges"],
    body: "Movie records feature title, genre, rating, release year, and synopsis fields. Paginate through results to test carousel and grid layouts at scale.",
  },
  comments: {
    metaTitle: "Mock Comments API",
    metaDescription:
      "Generate threaded comments with authors and timestamps. Fake comments REST API for discussion and social features with ApiGenerator.",
    intro: "Build comment threads, reply UIs, and activity feeds with realistic social data.",
    useCases: ["Comment threads", "Activity feeds", "Moderation UIs"],
    body: "Comment objects include author name, body text, post reference, and created-at timestamps. Pair with the posts endpoint to build full discussion features in your prototype.",
  },
  dogs: {
    metaTitle: "Mock Dogs API (AI)",
    metaDescription:
      "AI-generated dog records with breeds, ages, and descriptions. Custom mock dogs REST API powered by OpenRouter via ApiGenerator.",
    intro: "Try any custom keyword — AI generates domain-specific mock data on demand.",
    useCases: ["Custom schemas", "AI demos", "Unique test data"],
    body: "AI-powered endpoints create tailored record shapes for keywords not in the built-in library. Generate once to discover available fields, then filter the response to match your component props.",
  },
  planets: {
    metaTitle: "Mock Planets API (AI)",
    metaDescription:
      "AI-generated planet data with atmospheres, distances, and traits. Custom mock planets REST API powered by OpenRouter via ApiGenerator.",
    intro: "Explore AI-generated science and space data for dashboards and educational apps.",
    useCases: ["Science apps", "Data viz", "Custom schemas"],
    body: "Planet records are generated dynamically with fields like name, atmosphere, distance, and notable traits. Ideal for testing how your UI handles unfamiliar JSON shapes.",
  },
  invoices: {
    metaTitle: "Mock Invoices API (AI)",
    metaDescription:
      "AI-generated invoice records for billing and finance prototypes. Custom mock invoices REST API powered by OpenRouter via ApiGenerator.",
    intro: "Prototype billing dashboards, invoice lists, and finance workflows with realistic records.",
    useCases: ["Billing UIs", "Finance dashboards", "Invoice tables"],
    body: "Invoice objects include line items, amounts, dates, and customer references. Use field filtering to show summary rows in tables and full detail in modals.",
  },
};

export const ALL_ENDPOINTS = [...POPULAR_ENDPOINTS, ...AI_ENDPOINTS];

export function getEndpointLanding(slug: string): EndpointLandingContent | undefined {
  const endpoint = ALL_ENDPOINTS.find((e) => e.keyword === slug);
  const content = LANDING_CONTENT[slug];
  if (!endpoint || !content) return undefined;
  return { ...endpoint, ...content };
}

export function getAllEndpointSlugs(): string[] {
  return ALL_ENDPOINTS.map((e) => e.keyword);
}
