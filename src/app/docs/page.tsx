import type { Metadata } from "next";

import { CopyButton } from "@/components/copy-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { API_BASE_URL } from "@/constants/api";
import { POPULAR_ENDPOINTS } from "@/constants/endpoints";

export const metadata: Metadata = {
  title: "Documentation",
  description: "API usage documentation for Free API mock REST endpoints.",
};

const CODE_SNIPPETS = [
  {
    title: "cURL",
    code: `curl "${API_BASE_URL}/users?count=10"`,
  },
  {
    title: "JavaScript (fetch)",
    code: `const res = await fetch("${API_BASE_URL}/users?count=10");\nconst data = await res.json();`,
  },
  {
    title: "Axios",
    code: `import axios from "axios";\n\nconst { data } = await axios.get("${API_BASE_URL}/users", {\n  params: { count: 10 },\n});`,
  },
];

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
        <p className="mt-2 text-muted-foreground">
          Learn how to use Free API endpoints in your projects.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Base URL</CardTitle>
            <CardDescription>All requests are made against this base URL.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <code className="flex-1 rounded-lg bg-muted px-3 py-2 text-sm">{API_BASE_URL}</code>
            <CopyButton value={API_BASE_URL} label="Copy" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Endpoints</CardTitle>
            <CardDescription>
              Use any keyword as a path segment. The API returns an array of mock objects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <code className="block rounded-lg bg-muted px-3 py-2 text-sm">
              GET /:keyword
            </code>
            <Separator className="my-4" />
            <div className="space-y-2">
              {POPULAR_ENDPOINTS.map((endpoint) => (
                <div key={endpoint.keyword} className="flex items-center justify-between text-sm">
                  <code>/{endpoint.keyword}</code>
                  <span className="text-muted-foreground">{endpoint.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Query Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="grid grid-cols-3 gap-4 font-medium">
              <span>Parameter</span>
              <span>Type</span>
              <span>Description</span>
            </div>
            <Separator />
            <div className="grid grid-cols-3 gap-4 text-muted-foreground">
              <code>count</code>
              <span>number</span>
              <span>Number of items to return (default: 10)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Code Snippets</CardTitle>
            <CardDescription>Copy-ready examples for common HTTP clients.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {CODE_SNIPPETS.map((snippet) => (
              <div key={snippet.title}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">{snippet.title}</span>
                  <CopyButton value={snippet.code} label="Copy" />
                </div>
                <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs leading-relaxed">
                  {snippet.code}
                </pre>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
