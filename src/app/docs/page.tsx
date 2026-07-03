import type { Metadata } from "next";
import Link from "next/link";

import { CodeBlock } from "@/components/code-block";
import { DocsToc } from "@/components/docs/docs-toc";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { API_BASE_URL } from "@/constants/api";
import { DOC_TOC_ITEMS } from "@/constants/docs-sections";
import { AI_ENDPOINTS, POPULAR_ENDPOINTS } from "@/constants/endpoints";
import { QUERY_PARAM_DOCS } from "@/constants/query-params";

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
    <div className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <PageHeader
          title="Documentation"
          description="Learn how to use Free API endpoints in your projects."
          className="mb-10"
        />

        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[240px_minmax(0,720px)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <DocsToc items={[...DOC_TOC_ITEMS]} />
          </aside>

          <div className="min-w-0 space-y-8">
            <section id="base-url" className="scroll-mt-24">
              <Card>
                <CardHeader>
                  <CardTitle>Base URL</CardTitle>
                  <CardDescription>All requests are made against this base URL.</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={API_BASE_URL} />
                </CardContent>
              </Card>
            </section>

            <section id="endpoints" className="scroll-mt-24">
              <Card>
                <CardHeader>
                  <CardTitle>Endpoints</CardTitle>
                  <CardDescription>
                    Use any keyword as a path segment. The API returns an array of mock objects.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CodeBlock code="GET /:keyword" />
                  <Separator />
                  <div>
                    <h3 className="mb-2 text-sm font-medium">Popular endpoints</h3>
                    <div className="space-y-2">
                      {POPULAR_ENDPOINTS.map((endpoint) => (
                        <div
                          key={endpoint.keyword}
                          className="flex items-center justify-between rounded-md bg-muted/30 px-3 py-2 text-sm"
                        >
                          <code>/{endpoint.keyword}</code>
                          <span className="text-muted-foreground">{endpoint.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-medium">AI-powered endpoints</h3>
                    <div className="space-y-2">
                      {AI_ENDPOINTS.map((endpoint) => (
                        <div
                          key={endpoint.keyword}
                          className="flex items-center justify-between rounded-md bg-muted/30 px-3 py-2 text-sm"
                        >
                          <code>/{endpoint.keyword}</code>
                          <span className="text-muted-foreground">{endpoint.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="query-parameters" className="scroll-mt-24">
              <Card>
                <CardHeader>
                  <CardTitle>Query Parameters</CardTitle>
                  <CardDescription>
                    Optional parameters to customize responses.{" "}
                    <Link href="/playground" className="text-primary hover:underline">
                      Try them in the Playground
                    </Link>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="hidden gap-4 rounded-md bg-muted/50 px-3 py-2 font-medium sm:grid sm:grid-cols-[120px_80px_1fr]">
                    <span>Parameter</span>
                    <span>Type</span>
                    <span>Description</span>
                  </div>
                  {QUERY_PARAM_DOCS.map((param, index) => (
                    <div
                      key={param.name}
                      className={`space-y-1 rounded-md px-3 py-2 text-muted-foreground sm:grid sm:grid-cols-[120px_80px_1fr] sm:gap-4 sm:space-y-0 ${
                        index % 2 === 0 ? "bg-muted/20" : ""
                      }`}
                    >
                      <code className="text-foreground">{param.name}</code>
                      <span>{param.type}</span>
                      <span>
                        {param.description}
                        {param.default && (
                          <span className="mt-0.5 block text-xs">
                            Default: <code>{param.default}</code>
                            {param.limits && <> · {param.limits}</>}
                          </span>
                        )}
                        {!param.default && param.limits && (
                          <span className="mt-0.5 block text-xs">{param.limits}</span>
                        )}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            <section id="response-fields" className="scroll-mt-24">
              <Card>
                <CardHeader>
                  <CardTitle>Response Fields</CardTitle>
                  <CardDescription>
                    Limit which fields appear in each item using the{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">fields</code> query
                    parameter or the field picker in the Playground.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    For local keywords (e.g. <code>users</code>, <code>posts</code>), available
                    fields are known upfront. For AI keywords, generate once to discover fields,
                    then filter the preview instantly without re-generating.
                  </p>
                  <CodeBlock
                    code={`${API_BASE_URL}/users?count=5&fields=id,firstName,email`}
                  />
                  <p>
                    In the{" "}
                    <Link href="/playground" className="text-primary hover:underline">
                      Playground
                    </Link>
                    , use the Response Fields dropdown after generating to toggle fields — the JSON
                    preview updates immediately without another request.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section id="code-snippets" className="scroll-mt-24">
              <Card>
                <CardHeader>
                  <CardTitle>Code Snippets</CardTitle>
                  <CardDescription>Copy-ready examples for common HTTP clients.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {CODE_SNIPPETS.map((snippet) => (
                    <div key={snippet.title}>
                      <p className="mb-2 text-sm font-medium">{snippet.title}</p>
                      <CodeBlock code={snippet.code} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
