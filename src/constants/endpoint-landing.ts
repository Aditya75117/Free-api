import type { EndpointExample } from "@/types/api";

import { AI_ENDPOINTS, POPULAR_ENDPOINTS } from "./endpoints";

export type EndpointFaq = {
  question: string;
  answer: string;
};

export type EndpointLandingContent = EndpointExample & {
  metaTitle: string;
  metaDescription: string;
  intro: string;
  useCases: string[];
  body: string;
  faqs: EndpointFaq[];
  relatedKeywords: string[];
};

type LandingContentBase = Omit<EndpointLandingContent, keyof EndpointExample>;

const LANDING_CONTENT: Record<string, LandingContentBase> = {
  users: {
    metaTitle: "Mock Users API — Fake User Profiles",
    metaDescription:
      "Generate fake user profiles with names, emails, and avatars. Free mock users REST API for frontend prototyping, auth UI testing, and admin dashboards with ApiGenerator.",
    intro: "Build login screens, profile pages, and admin dashboards without waiting on a user service.",
    useCases: ["Auth UI prototypes", "Admin tables", "Avatar components"],
    body: "The mock users endpoint returns an array of realistic user objects with fields like id, firstName, lastName, email, and avatar URL. Use query parameters to control count, paginate results, filter fields, and sort — perfect for infinite scroll demos or data table testing. Pair with the posts and comments endpoints to simulate full social applications. List and detail requests share stable IDs when you use the same seed parameter, so you can prototype master-detail navigation flows without a real database.",
    faqs: [
      { question: "What fields does the mock users API return?", answer: "Typical fields include id, firstName, lastName, email, and avatar URL. Use the fields query parameter to request only the props your component needs." },
      { question: "Can I paginate user results?", answer: "Yes. Use count, page, and limit parameters to simulate paginated user lists for tables and infinite scroll UIs." },
      { question: "Is the mock users API free?", answer: "Yes. ApiGenerator mock endpoints are free with no signup required." },
    ],
    relatedKeywords: ["posts", "comments", "companies"],
  },
  posts: {
    metaTitle: "Mock Posts API — Fake Blog & Feed Data",
    metaDescription:
      "Generate blog-style posts with titles, bodies, and metadata. Fake posts REST API for content feeds, CMS prototypes, and news layouts with ApiGenerator.",
    intro: "Prototype blogs, news feeds, and content management UIs with realistic post data.",
    useCases: ["Blog layouts", "Feed components", "CMS previews"],
    body: "Each post includes a title, body excerpt, author reference, and timestamps. Combine with the comments endpoint to build threaded discussion UIs. Pagination and field filtering let you tune responses for list views versus detail pages. Use search and sort parameters to test filtering UI patterns before your CMS backend exists.",
    faqs: [
      { question: "Can I use mock posts with comments?", answer: "Yes. Generate posts first, then fetch comments to build discussion threads and activity feeds." },
      { question: "How many posts can I request?", answer: "Use count up to 100 per request, with page and limit for pagination." },
      { question: "Does the posts API support field filtering?", answer: "Yes. Pass fields=title,body to return only the columns your card component displays." },
    ],
    relatedKeywords: ["comments", "users", "books"],
  },
  products: {
    metaTitle: "Mock Products API — Fake E-Commerce Data",
    metaDescription:
      "Generate e-commerce product listings with prices and descriptions. Fake products REST API for storefront, catalog, and cart prototypes with ApiGenerator.",
    intro: "Build product grids, cart flows, and catalog pages with realistic commerce data.",
    useCases: ["E-commerce UIs", "Product cards", "Price filters"],
    body: "Product records include name, description, price, category, and image placeholders. Use the count and search parameters to simulate catalog browsing. Filter fields to return only what your product card component needs. Sort by price or name to test table headers and filter controls in your storefront prototype.",
    faqs: [
      { question: "What e-commerce fields are included?", answer: "Products typically include name, description, price, category, and image URL fields suitable for product cards and catalog grids." },
      { question: "Can I search products by name?", answer: "Yes. Use the search query parameter to filter product results by string match." },
      { question: "Is this good for cart UI prototypes?", answer: "Yes. Fetch products for grid views and use detail endpoints with stable IDs for product detail pages." },
    ],
    relatedKeywords: ["companies", "invoices", "photos"],
  },
  books: {
    metaTitle: "Mock Books API — Fake Library & Catalog Data",
    metaDescription:
      "Generate book records with authors, ISBNs, and genres. Fake books REST API for library apps, reading lists, and bookstore prototypes with ApiGenerator.",
    intro: "Create library catalogs, reading lists, and bookstore layouts with structured book data.",
    useCases: ["Library apps", "Reading lists", "Genre filters"],
    body: "Book objects include title, author, ISBN, genre, and publication year. Ideal for testing search, sort, and filter UI patterns without seeding a database. Use pagination to populate carousel and grid layouts, and field filtering to slim responses for list cards versus detail modals.",
    faqs: [
      { question: "What book metadata is generated?", answer: "Records include title, author, ISBN, genre, and publication year — enough for library and bookstore UI patterns." },
      { question: "Can I sort books by title or year?", answer: "Yes. Use sort and order query parameters to test sorted list views." },
      { question: "How do I link books to authors?", answer: "Use the users endpoint alongside books to prototype author profile pages linked from book detail views." },
    ],
    relatedKeywords: ["posts", "users", "movies"],
  },
  movies: {
    metaTitle: "Mock Movies API — Fake Streaming & Media Data",
    metaDescription:
      "Generate movie data with ratings, genres, and release years. Fake movies REST API for streaming catalogs, watchlists, and media app prototypes with ApiGenerator.",
    intro: "Prototype streaming catalogs, watchlists, and rating displays with rich movie metadata.",
    useCases: ["Streaming UIs", "Watchlists", "Rating badges"],
    body: "Movie records feature title, genre, rating, release year, and synopsis fields. Paginate through results to test carousel and grid layouts at scale. Combine with the photos endpoint for poster thumbnails and the comments endpoint for review sections in your media app prototype.",
    faqs: [
      { question: "What movie fields are available?", answer: "Typical fields include title, genre, rating, release year, and synopsis for streaming and catalog UIs." },
      { question: "Can I build a watchlist UI with this?", answer: "Yes. Fetch movies with pagination and use stable IDs for detail pages and watchlist state in your frontend." },
      { question: "Does the movies API support filtering?", answer: "Use search, sort, and fields parameters to customize which movies appear and which fields are returned." },
    ],
    relatedKeywords: ["photos", "comments", "books"],
  },
  comments: {
    metaTitle: "Mock Comments API — Fake Discussion Data",
    metaDescription:
      "Generate threaded comments with authors and timestamps. Fake comments REST API for discussion threads, activity feeds, and social features with ApiGenerator.",
    intro: "Build comment threads, reply UIs, and activity feeds with realistic social data.",
    useCases: ["Comment threads", "Activity feeds", "Moderation UIs"],
    body: "Comment objects include author name, body text, post reference, and created-at timestamps. Pair with the posts endpoint to build full discussion features in your prototype. Use field filtering for compact list rows and fetch individual comments by ID for moderation detail panels.",
    faqs: [
      { question: "Can comments link to posts?", answer: "Comment records include post references so you can build threaded discussion UIs alongside the posts endpoint." },
      { question: "How do I test comment moderation UIs?", answer: "Fetch a list of comments, then use the detail endpoint with a specific ID for moderation detail views." },
      { question: "Are timestamps included?", answer: "Yes. Comments include created-at timestamps for sorting and activity feed displays." },
    ],
    relatedKeywords: ["posts", "users", "todos"],
  },
  recipes: {
    metaTitle: "Mock Recipes API — Fake Food & Cooking Data",
    metaDescription:
      "Generate recipe records with ingredients, instructions, and cook times. Free mock recipes REST API for food apps, meal planners, and cooking UIs with ApiGenerator.",
    intro: "Build recipe cards, meal planners, and cooking apps with structured food data.",
    useCases: ["Recipe apps", "Meal planners", "Cooking tutorials"],
    body: "Recipe records include title, ingredients, instructions, prep time, and cook time fields. Use pagination for recipe browse pages and field filtering for compact card layouts. The recipes endpoint uses a fast local generator — no AI latency — so responses are instant for hackathons and demos.",
    faqs: [
      { question: "What recipe fields are generated?", answer: "Recipes include title, ingredients, instructions, and timing fields suitable for recipe card and detail page UIs." },
      { question: "Can I use recipes for list and detail pages?", answer: "Yes. Fetch a list with GET /recipes, then GET /recipes/:id with the same seed for stable detail views." },
      { question: "Is the recipes endpoint AI-powered?", answer: "No. Recipes use a curated local generator for fast, consistent responses." },
    ],
    relatedKeywords: ["photos", "todos", "products"],
  },
  photos: {
    metaTitle: "Mock Photos API — Fake Image Gallery Data",
    metaDescription:
      "Generate photo metadata with titles, URLs, and album references. Free mock photos REST API for gallery grids, media libraries, and portfolio UIs with ApiGenerator.",
    intro: "Prototype photo galleries, media libraries, and portfolio grids with realistic image metadata.",
    useCases: ["Photo galleries", "Media libraries", "Portfolio grids"],
    body: "Photo records include title, URL, thumbnail, and album reference fields. Pair with the albums endpoint to build nested gallery UIs. Use count and pagination for masonry grids and field filtering to return only id, title, and thumbnail for performant list views.",
    faqs: [
      { question: "Does the photos API return actual image files?", answer: "Photos return metadata with placeholder image URLs suitable for img src attributes in prototypes." },
      { question: "Can I group photos by album?", answer: "Yes. Use the albums endpoint alongside photos to prototype album browse and detail flows." },
      { question: "How many photos per request?", answer: "Request up to 100 photos per call with count, or paginate with page and limit." },
    ],
    relatedKeywords: ["albums", "movies", "users"],
  },
  todos: {
    metaTitle: "Mock Todos API — Fake Task Manager Data",
    metaDescription:
      "Generate todo items with titles, completion status, and due dates. Free mock todos REST API for task managers, kanban boards, and productivity UIs with ApiGenerator.",
    intro: "Build task lists, kanban boards, and productivity dashboards with realistic todo data.",
    useCases: ["Task managers", "Kanban boards", "Checklist UIs"],
    body: "Todo records include title, completed status, priority, and due date fields. Perfect for testing checkbox lists, drag-and-drop boards, and filter tabs (all / active / completed). Use search to simulate task lookup and sort by due date for calendar views.",
    faqs: [
      { question: "Can I filter completed vs active todos?", answer: "Use the search parameter or filter client-side by the completed field to prototype active and done tabs." },
      { question: "What fields do todo items include?", answer: "Typical fields include id, title, completed, priority, and dueDate for standard task manager UIs." },
      { question: "Is this good for kanban prototypes?", answer: "Yes. Fetch todos and map them to columns by priority or status in your frontend." },
    ],
    relatedKeywords: ["users", "posts", "companies"],
  },
  albums: {
    metaTitle: "Mock Albums API — Fake Photo Album Data",
    metaDescription:
      "Generate photo album records with titles and cover images. Free mock albums REST API for media libraries and gallery apps with ApiGenerator.",
    intro: "Create album browse pages and nested photo galleries with structured album data.",
    useCases: ["Album browse", "Gallery apps", "Media libraries"],
    body: "Album records include title, description, cover image URL, and photo count fields. Combine with the photos endpoint to build album detail pages that list child photos. Pagination supports large album libraries and field filtering keeps card responses lightweight.",
    faqs: [
      { question: "How do albums relate to photos?", answer: "Albums provide parent records; fetch photos separately and link by album reference in your UI." },
      { question: "What album fields are available?", answer: "Albums include title, description, cover URL, and photo count for standard gallery browse patterns." },
      { question: "Can I paginate album lists?", answer: "Yes. Use page, limit, and count parameters for paginated album grids." },
    ],
    relatedKeywords: ["photos", "movies", "books"],
  },
  companies: {
    metaTitle: "Mock Companies API — Fake CRM & Business Data",
    metaDescription:
      "Generate company profiles with names, industries, and descriptions. Free mock companies REST API for CRM dashboards, B2B apps, and directory UIs with ApiGenerator.",
    intro: "Build company directories, CRM tables, and B2B dashboards with realistic business data.",
    useCases: ["CRM dashboards", "Company directories", "B2B tables"],
    body: "Company records include name, industry, description, employee count, and website fields. Use search and sort for directory filtering UI and field filtering for compact table rows. Pair with users and addresses endpoints to prototype contact management flows.",
    faqs: [
      { question: "What company fields are generated?", answer: "Companies include name, industry, description, employee count, and website — suitable for CRM and directory UIs." },
      { question: "Can I search companies by industry?", answer: "Use the search parameter to filter companies by name or industry string match." },
      { question: "Is this useful for B2B SaaS prototypes?", answer: "Yes. Companies pair well with users and addresses for full CRM-style data models." },
    ],
    relatedKeywords: ["users", "addresses", "products"],
  },
  vehicles: {
    metaTitle: "Mock Vehicles API — Fake Automotive Data",
    metaDescription:
      "Generate vehicle records with make, model, year, and VIN. Free mock vehicles REST API for automotive apps, fleet dashboards, and inventory UIs with ApiGenerator.",
    intro: "Prototype vehicle listings, fleet dashboards, and automotive inventory with structured car data.",
    useCases: ["Vehicle listings", "Fleet dashboards", "Inventory tables"],
    body: "Vehicle records include make, model, year, color, VIN, and price fields. Ideal for testing sortable inventory tables, filter sidebars, and vehicle detail pages. Aliases like cars and car also resolve to this generator on the API.",
    faqs: [
      { question: "Can I use /cars instead of /vehicles?", answer: "Yes. The API accepts cars, car, vehicles, and vehicle as keyword aliases." },
      { question: "What vehicle fields are included?", answer: "Records include make, model, year, color, VIN, and price for standard automotive listing UIs." },
      { question: "Can I sort vehicles by price or year?", answer: "Yes. Use sort=price or sort=year with order=asc or order=desc." },
    ],
    relatedKeywords: ["products", "companies", "addresses"],
  },
  addresses: {
    metaTitle: "Mock Addresses API — Fake Location & Shipping Data",
    metaDescription:
      "Generate address records with streets, cities, states, and zip codes. Free mock addresses REST API for checkout forms, maps, and location UIs with ApiGenerator.",
    intro: "Build checkout forms, address books, and location pickers with realistic address data.",
    useCases: ["Checkout forms", "Address books", "Location pickers"],
    body: "Address records include street, city, state, zip code, and country fields. Perfect for testing multi-step checkout flows, address autocomplete UI, and shipping form validation. Combine with users and companies for complete contact profiles.",
    faqs: [
      { question: "What address fields are generated?", answer: "Addresses include street, city, state, zipCode, and country for standard form and map UIs." },
      { question: "Can I use addresses in e-commerce checkout prototypes?", answer: "Yes. Pair with products and users for full checkout and account address book flows." },
      { question: "How many addresses per request?", answer: "Request up to 100 addresses with count or paginate with page and limit." },
    ],
    relatedKeywords: ["users", "companies", "vehicles"],
  },
  dogs: {
    metaTitle: "Mock Dogs API (AI) — Custom Pet Data",
    metaDescription:
      "AI-generated dog records with breeds, ages, and descriptions. Custom mock dogs REST API powered by OpenRouter via ApiGenerator.",
    intro: "Try any custom keyword — AI generates domain-specific mock data on demand.",
    useCases: ["Custom schemas", "AI demos", "Unique test data"],
    body: "AI-powered endpoints create tailored record shapes for keywords not in the built-in library. Generate once to discover available fields, then filter the response to match your component props. The dogs endpoint demonstrates how ApiGenerator handles niche domains that static mock APIs like JSONPlaceholder cannot cover.",
    faqs: [
      { question: "How does AI-generated mock data work?", answer: "ApiGenerator sends your keyword to OpenRouter, which returns a realistic JSON schema and sample records." },
      { question: "Are AI endpoint fields consistent?", answer: "Fields are generated per request. Use field filtering after the first call to lock in the shape for your components." },
      { question: "Do AI endpoints cost money?", answer: "ApiGenerator is free for users. AI generation is handled server-side." },
    ],
    relatedKeywords: ["planets", "invoices", "recipes"],
  },
  planets: {
    metaTitle: "Mock Planets API (AI) — Custom Space Data",
    metaDescription:
      "AI-generated planet data with atmospheres, distances, and traits. Custom mock planets REST API powered by OpenRouter via ApiGenerator.",
    intro: "Explore AI-generated science and space data for dashboards and educational apps.",
    useCases: ["Science apps", "Data viz", "Custom schemas"],
    body: "Planet records are generated dynamically with fields like name, atmosphere, distance, and notable traits. Ideal for testing how your UI handles unfamiliar JSON shapes from APIs you have not integrated yet. Use this endpoint to demo AI-powered mock data in pitches and tutorials.",
    faqs: [
      { question: "What makes planets different from built-in endpoints?", answer: "Planets uses AI generation, so field names and shapes are created dynamically rather than from a fixed schema." },
      { question: "Can I use planets for data visualization demos?", answer: "Yes. Rich metadata fields work well for charts, tables, and science dashboard prototypes." },
      { question: "How do I discover available fields?", answer: "Make one request, inspect the JSON response, then use the fields parameter to filter." },
    ],
    relatedKeywords: ["dogs", "invoices", "books"],
  },
  invoices: {
    metaTitle: "Mock Invoices API (AI) — Fake Billing Data",
    metaDescription:
      "AI-generated invoice records for billing and finance prototypes. Custom mock invoices REST API powered by OpenRouter via ApiGenerator.",
    intro: "Prototype billing dashboards, invoice lists, and finance workflows with realistic records.",
    useCases: ["Billing UIs", "Finance dashboards", "Invoice tables"],
    body: "Invoice objects include line items, amounts, dates, and customer references. Use field filtering to show summary rows in tables and full detail in modals. Pair with companies and products endpoints to build end-to-end billing and e-commerce admin prototypes.",
    faqs: [
      { question: "What invoice fields does AI generate?", answer: "Typical fields include invoice number, line items, amounts, dates, and customer references for billing UIs." },
      { question: "Can I build an invoice table with this?", answer: "Yes. Fetch a list for table rows and use detail endpoints for invoice preview modals." },
      { question: "Should I use invoices for production billing?", answer: "No. This is mock data for UI prototyping only, not real financial records." },
    ],
    relatedKeywords: ["companies", "products", "users"],
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

export function getRelatedEndpoints(keywords: string[]): EndpointExample[] {
  return ALL_ENDPOINTS.filter((e) => keywords.includes(e.keyword));
}
