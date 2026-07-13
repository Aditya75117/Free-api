import type { SavedEndpoint } from "@/types/api-groups";

export type GroupTemplate = {
  name: string;
  description: string;
  endpoints: Omit<SavedEndpoint, "id">[];
};

export const GROUP_TEMPLATES: GroupTemplate[] = [
  {
    name: "E-commerce",
    description: "Users, products, and comments for an online store.",
    endpoints: [
      { keyword: "users", label: "Customers", queryParameters: [{ key: "count", value: "5" }] },
      { keyword: "products", label: "Products", queryParameters: [{ key: "count", value: "10" }] },
      { keyword: "comments", label: "Reviews", queryParameters: [{ key: "count", value: "20" }] },
    ],
  },
  {
    name: "Blog",
    description: "Users, posts, and comments for a blogging platform.",
    endpoints: [
      { keyword: "users", label: "Authors", queryParameters: [{ key: "count", value: "5" }] },
      { keyword: "posts", label: "Articles", queryParameters: [{ key: "count", value: "10" }] },
      { keyword: "comments", label: "Comments", queryParameters: [{ key: "count", value: "15" }] },
    ],
  },
  {
    name: "CRM",
    description: "Users, companies, and todos for customer management.",
    endpoints: [
      { keyword: "users", label: "Contacts", queryParameters: [{ key: "count", value: "10" }] },
      { keyword: "companies", label: "Companies", queryParameters: [{ key: "count", value: "5" }] },
      { keyword: "todos", label: "Tasks", queryParameters: [{ key: "count", value: "10" }] },
    ],
  },
];
