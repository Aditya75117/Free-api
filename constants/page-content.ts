import { API_BASE_URL } from "@/constants/api";

export const HOME_HERO = {
  badge: "Free mock API & fake JSON for developers",
  title: "Generate mock REST APIs in seconds",
  subtitle:
    "ApiGenerator is a free mock REST API and fake JSON API generator — enter any keyword, get realistic API placeholder data instantly. Query parameters, field filtering, and AI-powered custom schemas included. No backend, no signup.",
  ctaPrimary: "Try it now",
  ctaSecondary: "Open Playground",
} as const;

export const HOME_GENERATOR = {
  title: "Try the API Generator",
  description:
    "Enter any keyword, add query parameters, and preview realistic JSON instantly. Copy the endpoint URL or download the response for your frontend project.",
} as const;

export const EXAMPLES_HUB_INTRO = `ApiGenerator provides ready-made mock REST API endpoints for the most common frontend prototyping scenarios. Browse popular endpoints with curated local generators — users, products, posts, todos, recipes, and more — or try AI-powered endpoints that create custom data shapes for any English keyword.

Each example page includes code snippets, use cases, and a direct link to the playground. Pick an endpoint, customize query parameters like count, page, and fields, then copy the URL into your React, Vue, or vanilla JavaScript project.`;

export const PLAYGROUND_INTRO = {
  paragraph1:
    "The ApiGenerator playground is a free API testing environment for mock REST endpoints. Enter any keyword, tune query parameters, filter response fields, and preview JSON in real time — without Postman or a local mock server.",
  paragraph2:
    "Save endpoint configurations to API Groups, pair list and detail requests with stable IDs, and export your setup as JSON. Perfect for frontend developers prototyping dashboards, e-commerce UIs, and data tables before the real backend is ready.",
} as const;

export const ABOUT_CONTENT = {
  motivation: `Building frontend applications often means waiting on backend endpoints or configuring complex mock servers. ApiGenerator removes that friction — enter a keyword like users, products, or recipes, and receive realistic JSON over HTTP within milliseconds.

The project is open source and built for developers who need fast, reliable test data during prototyping, automated testing, tutorials, and hackathons. The goal is simple: ship UI faster without blocking on backend work.`,
  openSource:
    "ApiGenerator is free to use with no account required. The frontend is a Next.js application and the backend is an Express API — both designed to be simple, fast, and developer-friendly.",
} as const;

export const PRIVACY_CONTENT = {
  title: "Privacy Policy",
  lastUpdated: "July 2026",
  sections: [
    {
      heading: "Overview",
      body: "ApiGenerator is a free mock REST API tool. We do not require user accounts and do not collect personal information beyond standard anonymous analytics.",
    },
    {
      heading: "Data stored locally",
      body: "API Groups and saved endpoint configurations are stored in your browser's localStorage on your device. This data never leaves your browser unless you export it yourself.",
    },
    {
      heading: "Analytics",
      body: "We use Vercel Analytics to collect anonymous usage metrics such as page views. No personally identifiable information is collected through analytics.",
    },
    {
      heading: "API requests",
      body: "When you generate mock data, your keyword and query parameters are sent to our API backend to produce JSON responses. We do not log or store request content beyond what is needed to serve the response.",
    },
    {
      heading: "Contact",
      body: "For privacy questions, open an issue on the project's GitHub repository.",
    },
  ],
} as const;

export const TERMS_CONTENT = {
  title: "Terms of Use",
  lastUpdated: "July 2026",
  sections: [
    {
      heading: "Service description",
      body: "ApiGenerator provides free mock REST API endpoints for development and testing purposes. The service is provided as-is without warranties of any kind.",
    },
    {
      heading: "Acceptable use",
      body: "Do not use ApiGenerator for production workloads, to store sensitive data, or to abuse rate limits. Mock data is generated for testing only and should not be treated as real or persistent.",
    },
    {
      heading: "Availability",
      body: "We aim to keep the service available but do not guarantee uptime. Features may change without notice as the project evolves.",
    },
    {
      heading: "AI-generated content",
      body: "Custom keywords use AI to generate mock data shapes. AI responses may vary between requests and should only be used for prototyping.",
    },
    {
      heading: "Limitation of liability",
      body: "ApiGenerator and its contributors are not liable for any damages arising from use of the service.",
    },
  ],
} as const;

export const REACT_USE_CASE = {
  title: "Mock API for React — Fetch Fake Data in Seconds",
  intro: `Frontend React developers often need fake API data before the backend is ready. ApiGenerator gives you instant mock REST endpoints — just fetch JSON from any keyword URL and wire it into your components with useEffect, React Query, or SWR.`,
  fetchExample: `import { useEffect, useState } from "react";

const API_URL = "${API_BASE_URL}/users?count=10";

export function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => setUsers(json.data ?? []));
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.firstName} {user.lastName}</li>
      ))}
    </ul>
  );
}`,
  queryExample: `import { useQuery } from "@tanstack/react-query";

function useMockUsers() {
  return useQuery({
    queryKey: ["mock-users"],
    queryFn: async () => {
      const res = await fetch("${API_BASE_URL}/users?count=20&fields=id,firstName,email");
      const json = await res.json();
      return json.data;
    },
  });
}`,
  faqs: [
    {
      question: "How do I mock an API in React without a backend?",
      answer:
        "Point your fetch or axios calls to an ApiGenerator endpoint like /users or /products. The API returns realistic JSON arrays you can use directly in state or with data-fetching libraries.",
    },
    {
      question: "Can I use React Query with ApiGenerator?",
      answer:
        "Yes. ApiGenerator endpoints are standard REST URLs. Use them as queryFn targets in React Query, SWR, or any HTTP client.",
    },
    {
      question: "Does mock data stay consistent between requests?",
      answer:
        "Use the seed query parameter to get deterministic data across list and detail requests, which is useful for testing navigation flows.",
    },
  ],
} as const;

export const VUE_USE_CASE = {
  title: "Mock API for Vue — Fetch Fake JSON in Minutes",
  intro: `Vue developers often need fake API data before the backend is ready. ApiGenerator gives you instant mock REST endpoints — fetch JSON from any keyword URL and wire it into setup(), composables, or VueUse.`,
  fetchExample: `import { onMounted, ref } from "vue";

const API_URL = "${API_BASE_URL}/products?count=12";

export function useProducts() {
  const products = ref([]);

  onMounted(async () => {
    const res = await fetch(API_URL);
    const json = await res.json();
    products.value = json.data ?? [];
  });

  return { products };
}`,
  composableExample: `import { useFetch } from "@vueuse/core";

export function useMockUsers() {
  return useFetch("${API_BASE_URL}/users?count=10&fields=id,firstName,email").json();
}`,
  faqs: [
    {
      question: "How do I use a mock API in Vue 3?",
      answer:
        "Fetch ApiGenerator endpoints inside onMounted or a composable. Responses return JSON with a data array you can assign to refs.",
    },
    {
      question: "Does this work with Nuxt?",
      answer:
        "Yes. Call the same REST URLs from useFetch, $fetch, or server routes during prototyping.",
    },
    {
      question: "Can I keep list and detail data in sync?",
      answer:
        "Pass the same seed query parameter on list and detail requests so IDs and fields stay stable while you build navigation.",
    },
  ],
} as const;

export const TESTING_USE_CASE = {
  title: "Mock API for Testing — Stable Fake JSON",
  intro: `Automated tests need predictable HTTP JSON without flaky fixtures. ApiGenerator is a free mock REST API you can hit from unit, integration, and E2E suites — use seed for deterministic fake data across runs.`,
  fetchExample: `// Vitest / Jest style helper
export async function fetchMockUsers(seed = "tests") {
  const res = await fetch("${API_BASE_URL}/users?count=5&seed=" + seed);
  const json = await res.json();
  return json.data;
}

test("loads users from mock API", async () => {
  const users = await fetchMockUsers();
  expect(users).toHaveLength(5);
  expect(users[0]).toHaveProperty("email");
});`,
  e2eExample: `// Playwright example
await page.route("**/users*", async (route) => {
  const res = await fetch("${API_BASE_URL}/users?count=3&seed=e2e");
  const body = await res.text();
  await route.fulfill({ status: 200, contentType: "application/json", body });
});`,
  faqs: [
    {
      question: "Why use a live mock API in tests?",
      answer:
        "It exercises real HTTP parsing and loading states without maintaining large fixture files. Seed keeps payloads stable between runs.",
    },
    {
      question: "Should E2E tests call the public API directly?",
      answer:
        "You can, or proxy through page.route / MSW. Either way, ApiGenerator provides consistent fake JSON shapes for UI assertions.",
    },
    {
      question: "Is mock data safe for CI?",
      answer:
        "Yes for prototyping tests. Do not send secrets or PII to the mock API, and prefer seeded built-in endpoints for speed.",
    },
  ],
} as const;

export const DOCS_REACT_SNIPPET = {
  title: "React (useEffect)",
  code: `import { useEffect, useState } from "react";

export function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("${API_BASE_URL}/products?count=12")
      .then((res) => res.json())
      .then((json) => setProducts(json.data ?? []));
  }, []);

  return products.map((p) => <div key={p.id}>{p.name}</div>);
}`,
} as const;
