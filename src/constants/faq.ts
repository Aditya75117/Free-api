export const FAQ_ITEMS = [
  {
    question: "What is a mock API?",
    answer:
      "A mock API (also called a fake JSON API or API placeholder) returns realistic JSON over HTTP so you can build and test frontends without a real backend. ApiGenerator creates free mock REST endpoints from any keyword instantly.",
  },
  {
    question: "Is ApiGenerator a free API?",
    answer:
      "Yes. ApiGenerator is a free mock API with no signup. Use it as a free fake REST API for prototypes, tutorials, and tests — including query parameters and field filtering on built-in endpoints.",
  },
  {
    question: "How do I use query parameters?",
    answer:
      "Append query parameters to any endpoint URL — for example, ?count=10&page=1&limit=5 controls how many records are returned and paginates results. See the documentation for the full list.",
  },
  {
    question: "What can I customize on each endpoint?",
    answer:
      "Use query parameters for count, pagination, sorting, and field filtering. For custom domains, AI-powered endpoints generate tailored JSON schemas from any English keyword.",
  },
  {
    question: "Can I save endpoint configurations?",
    answer:
      "Yes. Use API Groups in the Playground to save related endpoints, apply templates, and export or import your configurations as JSON.",
  },
] as const;
