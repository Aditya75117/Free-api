export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/playground", label: "Playground" },
  { href: "/groups", label: "My Groups" },
  { href: "/examples", label: "Examples" },
  { href: "/docs", label: "Docs" },
  { href: "/compare/jsonplaceholder", label: "Compare" },
  { href: "/about", label: "About" },
] as const;

export const FOOTER_COMPARE_LINKS = [
  { href: "/compare/jsonplaceholder", label: "JSONPlaceholder Alternative" },
  { href: "/compare/mockoon", label: "Mockoon Alternative" },
] as const;

export const FOOTER_USE_CASE_LINKS = [
  { href: "/use-cases/react-mock-api", label: "Mock API for React" },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
] as const;
