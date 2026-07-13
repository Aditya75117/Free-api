import { API_BASE_URL } from "@/constants/api";

export type SeoHubContent = {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
  codeTitle: string;
  code: string;
  faqs: { question: string; answer: string }[];
};

export const FREE_API_HUB: SeoHubContent = {
  title: "Free API — Instant Mock REST Endpoints",
  intro:
    "Looking for a free API you can call from the browser without signup keys or rate-limited sandboxes? ApiGenerator is a free mock REST API that returns realistic JSON from any keyword path — ideal for frontend prototyping, tutorials, and demos.",
  sections: [
    {
      heading: "What a free API should give you",
      body: `A useful free API for developers is more than a static JSON file. You need HTTP endpoints that behave like a real backend: list responses, pagination, sorting, and field filtering. ApiGenerator exposes those patterns over a public base URL so you can wire fetch or Axios into React, Vue, or vanilla JS without standing up Express or Firebase.

Because every keyword becomes a route, you are not limited to a fixed set of resources. Start with /users or /products, then try domain-specific paths when your UI needs custom shapes. Built-in generators stay fast and free; AI-backed keywords fill gaps when you need a one-off schema.`,
    },
    {
      heading: "How to call the free mock API",
      body: `Point your client at the ApiGenerator base URL, append a keyword, and add query parameters like count, page, limit, fields, sort, and seed. Responses include a data array plus pagination metadata so tables, infinite scroll, and detail views are easy to prototype.

Copy a ready-made URL from the examples hub, tune it in the playground, then paste it into your app. No API key, no CORS gymnastics for browser prototypes against the public backend, and no local mock server to maintain.`,
    },
    {
      heading: "When to use ApiGenerator",
      body: `Use this free API when you need fake but realistic REST data for UI work, classroom demos, or early product spikes. Prefer a real backend or contract tests when you need authentication, persistence, or production traffic. For day-to-day frontend velocity, a free mock API removes the waiting game.`,
    },
  ],
  codeTitle: "Fetch from the free API",
  code: `const res = await fetch("${API_BASE_URL}/users?count=10&fields=id,firstName,email");
const json = await res.json();
console.log(json.data);`,
  faqs: [
    {
      question: "Is ApiGenerator really a free API?",
      answer:
        "Yes. Built-in mock endpoints are free with no signup. Use them for prototyping and testing; do not rely on them as a production data store.",
    },
    {
      question: "Do I need an API key?",
      answer:
        "No API key is required for standard keyword endpoints. Open the playground or docs and start fetching immediately.",
    },
    {
      question: "What formats does the free API return?",
      answer:
        "Responses are JSON over HTTP. You can filter fields, paginate lists, and seed data for stable list/detail flows.",
    },
  ],
};

export const API_PLACEHOLDER_HUB: SeoHubContent = {
  title: "API Placeholder — Fake JSON for Prototyping",
  intro:
    "An API placeholder gives your UI something to fetch while the real backend is unfinished. ApiGenerator turns any English keyword into a placeholder REST endpoint with realistic fake JSON — so forms, tables, and detail pages can ship against stable shapes early.",
  sections: [
    {
      heading: "Why placeholder APIs matter",
      body: `Hard-coding fixtures in the frontend works until you need pagination, search, or multiple screens sharing the same IDs. An API placeholder keeps those concerns in HTTP where they belong. Designers and frontend engineers can agree on fields without waiting for database migrations.

ApiGenerator’s placeholder responses include common fields for users, products, posts, todos, and more. Custom keywords use AI to invent plausible schemas so niche screens still have something to bind to.`,
    },
    {
      heading: "Building with placeholder endpoints",
      body: `Pick a keyword that matches your domain — /orders, /invoices, /recipes — then refine with query parameters. Use fields to return only the props your components need, and seed when list and detail views must stay in sync.

The playground lets you preview placeholder JSON before you commit URLs to your codebase. Export snippets for fetch, Axios, or cURL from the docs when you document the temporary contract for your team.`,
    },
    {
      heading: "Placeholder vs production APIs",
      body: `Treat ApiGenerator as a development placeholder, not a source of truth. Swap the base URL when your real API is ready — ideally keeping path and query conventions similar so the migration is a one-line change.`,
    },
  ],
  codeTitle: "API placeholder request",
  code: `// Placeholder products for an e-commerce prototype
const url = "${API_BASE_URL}/products?count=12&page=1&fields=id,name,price,category";
const { data } = await fetch(url).then((r) => r.json());`,
  faqs: [
    {
      question: "What is an API placeholder?",
      answer:
        "An API placeholder is a temporary HTTP endpoint that returns fake but realistic JSON so frontends can develop against a REST-like contract before the real backend exists.",
    },
    {
      question: "Can I invent my own placeholder routes?",
      answer:
        "Yes. Any keyword path works. Curated generators cover popular resources; AI fills in custom keywords with domain-specific shapes.",
    },
    {
      question: "Will placeholder data persist?",
      answer:
        "No. Mock data is generated per request (optionally seeded). Do not store user content or secrets in placeholder responses.",
    },
  ],
};

export const FAKE_JSON_API_HUB: SeoHubContent = {
  title: "Fake JSON API — Realistic Mock Data Instantly",
  intro:
    "A fake JSON API returns HTTP JSON that looks real enough to drive UI states — loading, empty, success, and error paths — without a database. ApiGenerator is a free fake JSON API and mock REST generator you can call from any frontend stack.",
  sections: [
    {
      heading: "Fake JSON that behaves like REST",
      body: `Static JSON dumps fall short when you need count, pagination, sorting, or partial field selection. ApiGenerator’s fake JSON API wraps generators behind REST-style paths so your fetch layer matches production patterns.

That means fewer rewrites when you swap in the real service. Keep using response.data, page metadata, and field filters during the mock phase, then update only the host.`,
    },
    {
      heading: "Examples you can try now",
      body: `Popular fake endpoints include users, posts, products, comments, todos, albums, and recipes. AI-powered keywords expand the catalog for demos — dogs, planets, invoices, and more. Browse the examples hub for landing pages with snippets, or open the playground to tweak query strings live.`,
    },
    {
      heading: "Fake JSON for tests and demos",
      body: `Seeded responses help unit tests and Storybook stories stay deterministic. Demo days benefit from rich fake datasets without scrubbing production PII. Pair the fake JSON API with your preferred test runner or E2E tool and keep network stubs simple.`,
    },
  ],
  codeTitle: "Fake JSON API example",
  code: `async function loadTodos() {
  const res = await fetch("${API_BASE_URL}/todos?count=20&seed=demo");
  const json = await res.json();
  return json.data; // fake but realistic todo objects
}`,
  faqs: [
    {
      question: "What is a fake JSON API?",
      answer:
        "A fake JSON API serves mock data as JSON over HTTP so apps can develop and test without a live backend. ApiGenerator generates that data from keywords and query parameters.",
    },
    {
      question: "Is the fake JSON random every time?",
      answer:
        "You can pass a seed query parameter for stable output across requests, which is useful for list/detail navigation and automated tests.",
    },
    {
      question: "Can I filter fields in the fake response?",
      answer:
        "Yes. Use the fields parameter to return only the properties your UI needs, keeping payloads small during prototyping.",
    },
  ],
};
