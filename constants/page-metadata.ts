export type PageMeta = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
};

export const PAGE_METADATA = {
  home: {
    title: "Free Mock REST API — Fake JSON API Generator",
    description:
      "Free mock REST API and fake JSON API generator. Enter any keyword for realistic API placeholder data — query params, field filtering, no signup.",
    path: "/",
    keywords: [
      "free mock api",
      "fake json api",
      "api placeholder",
      "free fake rest api",
      "mock rest api generator",
    ],
  },
  docs: {
    title: "Mock API Documentation — Params & Code Examples",
    description:
      "Docs for our free mock API: endpoints, query parameters, pagination, field filtering, and snippets for fetch, cURL, and Axios.",
    path: "/docs",
    keywords: [
      "mock api documentation",
      "free mock api docs",
      "rest api query parameters",
      "fake json api examples",
    ],
  },
  playground: {
    title: "Free API Playground — Test Mock Endpoints Online",
    description:
      "Interactive free API playground for fake JSON and mock REST endpoints. Live params, field filtering, list/detail pairing, and saved API groups.",
    path: "/playground",
    keywords: [
      "free api playground",
      "mock api tester",
      "fake json api online",
      "try rest api online",
    ],
  },
  examples: {
    title: "Mock API Examples — Users, Products & More",
    description:
      "Browse 16+ free mock API examples: users, products, posts, todos, recipes, and AI-powered fake JSON endpoints.",
    path: "/examples",
    keywords: ["mock api examples", "fake users api", "free mock api", "fake json api"],
  },
  about: {
    title: "About ApiGenerator — Open Source Mock API Tool",
    description:
      "ApiGenerator is a free, open-source mock REST API and fake JSON API generator for frontend prototyping.",
    path: "/about",
    keywords: ["open source mock api", "free mock api", "api generator"],
  },
  groups: {
    title: "My API Groups",
    description: "Organize and manage saved mock API endpoint configurations.",
    path: "/groups",
    noIndex: true,
  },
  freeApi: {
    title: "Free API — Instant Mock REST Endpoints",
    description:
      "Use ApiGenerator as a free API for frontend prototyping. Get realistic fake JSON from any keyword — no signup, no backend.",
    path: "/free-api",
    keywords: ["free api", "free mock api", "free fake rest api", "free json api"],
  },
  apiPlaceholder: {
    title: "API Placeholder — Fake JSON for Prototyping",
    description:
      "API placeholder endpoints that return realistic fake JSON. Use any keyword as a mock REST route for UI development and testing.",
    path: "/api-placeholder",
    keywords: ["api placeholder", "json placeholder api", "fake api placeholder", "placeholder rest api"],
  },
  fakeJsonApi: {
    title: "Fake JSON API — Realistic Mock Data Instantly",
    description:
      "Free fake JSON API for developers. Generate mock REST responses with query params, pagination, and field filtering — no install.",
    path: "/fake-json-api",
    keywords: ["fake json api", "fake rest api", "mock json api", "free fake json api"],
  },
  useCaseReact: {
    title: "Mock API for React — Fetch Fake Data in Seconds",
    description:
      "Learn how to use a free mock REST API in React with fetch, useEffect, React Query, or SWR.",
    path: "/use-cases/react-mock-api",
    keywords: ["mock api for react", "react fake api", "fetch mock data react"],
  },
  useCaseVue: {
    title: "Mock API for Vue — Fetch Fake JSON in Minutes",
    description:
      "Wire a free fake JSON API into Vue with fetch or VueUse. Instant mock REST data for components and prototypes.",
    path: "/use-cases/vue-mock-api",
    keywords: ["mock api for vue", "vue fake api", "fetch mock data vue"],
  },
  useCaseTesting: {
    title: "Mock API for Testing — Stable Fake JSON",
    description:
      "Use a free mock REST API in unit and integration tests. Seeded fake JSON for deterministic frontend and E2E flows.",
    path: "/use-cases/testing-with-mock-api",
    keywords: ["mock api for testing", "fake api testing", "seeded mock json"],
  },
  privacy: {
    title: "Privacy Policy",
    description: "How ApiGenerator handles data, localStorage, and analytics.",
    path: "/privacy",
  },
  terms: {
    title: "Terms of Use",
    description: "Terms for using the free ApiGenerator mock API service.",
    path: "/terms",
  },
} as const satisfies Record<string, PageMeta>;
