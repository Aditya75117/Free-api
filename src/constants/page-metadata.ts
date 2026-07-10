export type PageMeta = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
};

export const PAGE_METADATA = {
  home: {
    title: "Mock REST API Generator — Free Fake JSON Data",
    description:
      "Generate mock REST APIs from any keyword in seconds. Free, no signup. Preview JSON, customize query params, and copy endpoints for frontend prototyping.",
    path: "/",
    keywords: ["mock rest api generator", "fake api for testing", "json mock api", "free mock api"],
  },
  docs: {
    title: "Mock API Documentation — Params & Code Examples",
    description:
      "Complete mock API docs: endpoints, query parameters, pagination, field filtering, and copy-paste snippets for fetch, cURL, and Axios.",
    path: "/docs",
    keywords: ["mock api documentation", "rest api query parameters", "pagination", "field filtering"],
  },
  playground: {
    title: "Free API Playground — Test Mock Endpoints Online",
    description:
      "Interactive API testing playground. Try mock REST endpoints with live params, field filtering, list/detail pairing, and saved API groups.",
    path: "/playground",
    keywords: ["api testing playground", "mock api tester", "try rest api online"],
  },
  examples: {
    title: "Mock API Examples — Users, Products & More",
    description:
      "Browse 16+ mock API examples: users, products, posts, todos, recipes, and AI-powered endpoints. Try any pattern in the playground.",
    path: "/examples",
    keywords: ["mock api examples", "fake users api", "json placeholder alternative"],
  },
  about: {
    title: "About ApiGenerator — Open Source Mock API Tool",
    description:
      "ApiGenerator is a free, open-source mock REST API generator. Prototype frontends without waiting on backend endpoints.",
    path: "/about",
    keywords: ["open source mock api", "developer prototyping tool", "api generator"],
  },
  groups: {
    title: "My API Groups",
    description: "Organize and manage saved mock API endpoint configurations.",
    path: "/groups",
    noIndex: true,
  },
  compareJsonplaceholder: {
    title: "JSONPlaceholder Alternative — Custom Mock APIs",
    description:
      "Replace JSONPlaceholder with custom mock REST endpoints. Any keyword, query params, field filtering, and AI schemas — free and instant.",
    path: "/compare/jsonplaceholder",
    keywords: ["jsonplaceholder alternative", "mock api", "fake json api"],
  },
  compareMockoon: {
    title: "Mockoon Alternative — Cloud Mock APIs, No Install",
    description:
      "Use ApiGenerator as a zero-setup Mockoon alternative. Generate mock REST APIs in the browser — no desktop app or local server required.",
    path: "/compare/mockoon",
    keywords: ["mockoon alternative", "online mock api", "browser mock api"],
  },
  useCaseReact: {
    title: "Mock API for React — Fetch Fake Data in Seconds",
    description:
      "Learn how to use mock REST APIs in React with fetch, useEffect, React Query, or SWR.",
    path: "/use-cases/react-mock-api",
    keywords: ["mock api for react", "react fake api", "fetch mock data react"],
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
