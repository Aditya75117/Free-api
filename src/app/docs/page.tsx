import type { Metadata } from "next";
import Link from "next/link";

import { CodeBlock } from "@/components/code-block";
import { DocsToc } from "@/components/docs/docs-toc";
import { PageHeader } from "@/components/layout/page-header";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { API_BASE_URL } from "@/constants/api";
import { DOC_TOC_ITEMS } from "@/constants/docs-sections";
import { FAQ_ITEMS } from "@/constants/faq";
import { AI_ENDPOINTS, POPULAR_ENDPOINTS } from "@/constants/endpoints";
import { DOCS_REACT_SNIPPET } from "@/constants/page-content";
import { PAGE_METADATA } from "@/constants/page-metadata";
import { QUERY_PARAM_DOCS } from "@/constants/query-params";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata(PAGE_METADATA.docs);

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
      <FaqJsonLd faqs={FAQ_ITEMS} />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <PageHeader
          title="Mock API Documentation"
          description="Learn how to use ApiGenerator endpoints, query parameters, and code snippets in your projects."
          className="mb-8"
        />

        <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[240px_minmax(0,720px)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <DocsToc items={[...DOC_TOC_ITEMS]} />
          </aside>

          <div className="min-w-0 space-y-8">
            <section id="getting-started" className="scroll-mt-24">
              <Card>
                <CardHeader>
                  <CardTitle as="h2">Getting started in 30 seconds</CardTitle>
                  <CardDescription>
                    No signup, no setup — just hit an endpoint and get JSON back.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    ApiGenerator is a mock REST API generator. Pick any keyword as a path segment,
                    send a GET request, and receive realistic JSON arrays instantly. Use the{" "}
                    <Link href="/" className="text-primary hover:underline">
                      home page generator
                    </Link>
                    , browse{" "}
                    <Link href="/examples" className="text-primary hover:underline">
                      examples
                    </Link>
                    , or open the{" "}
                    <Link href="/playground" className="text-primary hover:underline">
                      playground
                    </Link>{" "}
                    for full control over query parameters.
                  </p>
                  <CodeBlock code={`${API_BASE_URL}/users?count=5`} />
                </CardContent>
              </Card>
            </section>

            <section id="base-url" className="scroll-mt-24">
              <Card>
                <CardHeader>
                  <CardTitle as="h2">Base URL</CardTitle>
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
                  <CardTitle as="h2">Endpoints</CardTitle>
                  <CardDescription>
                    Use any keyword as a path segment. The API returns an array of mock objects.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CodeBlock code="GET /:keyword" />
                  <CodeBlock code="GET /:keyword/:id" />
                  <p className="text-sm text-muted-foreground">
                    List endpoints return an array in <code>data</code>. Detail endpoints return a
                    single object in <code>data</code> for the matching <code>id</code>.
                  </p>
                  <Separator />
                  <div>
                    <h3 className="mb-2 text-base font-medium">Popular endpoints</h3>
                    <div className="space-y-2">
                      {POPULAR_ENDPOINTS.map((endpoint) => (
                        <div
                          key={endpoint.keyword}
                          className="flex items-center justify-between rounded-md bg-muted/30 px-3 py-2 text-sm"
                        >
                          <Link
                            href={`/examples/${endpoint.keyword}`}
                            className="text-primary hover:underline"
                          >
                            <code>/{endpoint.keyword}</code>
                          </Link>
                          <span className="text-muted-foreground">{endpoint.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-base font-medium">AI-powered endpoints</h3>
                    <div className="space-y-2">
                      {AI_ENDPOINTS.map((endpoint) => (
                        <div
                          key={endpoint.keyword}
                          className="flex items-center justify-between rounded-md bg-muted/30 px-3 py-2 text-sm"
                        >
                          <Link
                            href={`/examples/${endpoint.keyword}`}
                            className="text-primary hover:underline"
                          >
                            <code>/{endpoint.keyword}</code>
                          </Link>
                          <span className="text-muted-foreground">{endpoint.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="list-detail" className="scroll-mt-24">
              <Card>
                <CardHeader>
                  <CardTitle as="h2">List → Detail chaining</CardTitle>
                  <CardDescription>
                    Fetch a list, copy an item&apos;s <code>id</code>, then request that single
                    record — the same pattern real frontends use for master/detail screens.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    Every list item includes a stable <code>id</code>. Use{" "}
                    <code>GET /:keyword/:id</code> to retrieve the matching record. IDs are
                    deterministic when you use the same <code>seed</code> (or omit it — the server
                    applies a default seed of <code>default</code>).
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">1. List items</p>
                    <CodeBlock code={`${API_BASE_URL}/recipes?count=10&seed=demo`} />
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">2. Fetch one item by id</p>
                    <CodeBlock
                      code={`${API_BASE_URL}/recipes/{id-from-list}?seed=demo`}
                    />
                  </div>
                  <p>
                    If the <code>id</code> does not exist for that keyword and seed, the API returns{" "}
                    <code>404</code>. In the{" "}
                    <Link href="/playground" className="text-primary hover:underline">
                      Playground
                    </Link>
                    , use the optional <strong className="text-foreground">Item ID</strong> field to
                    paste an id from your list response, or click <strong className="text-foreground">Use</strong> on
                    an id chip below the JSON preview.
                  </p>
                  <p className="text-xs">
                    Not supported in v1: cross-resource nesting (e.g.{" "}
                    <code>/posts/:id/comments</code>) or different field schemas for list vs detail.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section id="query-parameters" className="scroll-mt-24">
              <Card>
                <CardHeader>
                  <CardTitle as="h2">Query Parameters</CardTitle>
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
                  <CardTitle as="h2">Response Fields</CardTitle>
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
                  <CardTitle as="h2">Code Snippets</CardTitle>
                  <CardDescription>Copy-ready examples for common HTTP clients.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {CODE_SNIPPETS.map((snippet) => (
                    <div key={snippet.title}>
                      <h3 className="mb-2 text-base font-medium">{snippet.title}</h3>
                      <CodeBlock code={snippet.code} />
                    </div>
                  ))}
                  <div>
                    <h3 className="mb-2 text-base font-medium">{DOCS_REACT_SNIPPET.title}</h3>
                    <CodeBlock code={DOCS_REACT_SNIPPET.code} />
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="faq" className="scroll-mt-24" aria-labelledby="faq-heading">
              <Card>
                <CardHeader>
                  <CardTitle as="h2" id="faq-heading">FAQ</CardTitle>
                  <CardDescription>Common questions about mock APIs and ApiGenerator.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {FAQ_ITEMS.map((item) => (
                    <div key={item.question}>
                      <h3 className="text-base font-medium">{item.question}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
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
