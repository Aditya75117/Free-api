export const FAQ_ITEMS = [
  {
    question: "What is a mock API?",
    answer:
      "A mock API returns fake but realistic JSON data over HTTP, so you can build and test frontends without a real backend. ApiGenerator creates mock REST endpoints from any keyword instantly.",
  },
  {
    question: "How do I use query parameters?",
    answer:
      "Append query parameters to any endpoint URL — for example, ?count=10&page=1&limit=5 controls how many records are returned and paginates results. See the documentation for the full list.",
  },
  {
    question: "Is ApiGenerator free to use?",
    answer:
      "Yes. ApiGenerator is free and open source. Enter any keyword, generate JSON responses, and use them in prototypes, tests, and tutorials with no signup required.",
  },
  {
    question: "How is ApiGenerator different from JSONPlaceholder?",
    answer:
      "JSONPlaceholder offers fixed endpoints with static data. ApiGenerator lets you create endpoints from any keyword, customize responses with query parameters, filter fields, and use AI for custom data shapes.",
  },
  {
    question: "Can I save endpoint configurations?",
    answer:
      "Yes. Use API Groups in the Playground to save related endpoints, apply templates, and export or import your configurations as JSON.",
  },
] as const;
