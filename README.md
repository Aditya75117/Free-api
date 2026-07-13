# ApiGenerator Frontend

Next.js 16 frontend for [ApiGenerator](https://free-api-req.vercel.app) — a free mock REST API generator.

## Setup

```bash
pnpm install
cp .env.example .env.local   # if present
pnpm dev
```

Open [http://localhost:4001](http://localhost:4001) (or the port configured in your project).

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://free-api-req.vercel.app` | Canonical URL for metadata, sitemap, JSON-LD |
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:4000` (dev) | Mock API backend base URL |

Set `NEXT_PUBLIC_SITE_URL=https://free-api-req.vercel.app` in Vercel production so canonicals and the sitemap use the live host.

## Page Structure

| Route | Purpose |
|-------|---------|
| `/` | Home + inline API generator |
| `/playground` | Full API testing UI |
| `/examples` | Endpoint grid hub |
| `/examples/:slug` | SEO landing pages (16 endpoints) |
| `/docs` | API documentation |
| `/free-api` | SEO hub — free API / free mock API |
| `/api-placeholder` | SEO hub — API placeholder |
| `/fake-json-api` | SEO hub — fake JSON API |
| `/use-cases/react-mock-api` | React integration guide |
| `/use-cases/vue-mock-api` | Vue integration guide |
| `/use-cases/testing-with-mock-api` | Testing with mock APIs |
| `/about` | About page |
| `/groups` | Saved API groups (noindex) |
| `/privacy`, `/terms` | Legal pages |

## SEO Conventions

- **Metadata:** `src/constants/page-metadata.ts` — single source for titles, descriptions, keywords
- **Content:** `src/constants/page-content.ts` — long-form copy for use-case pages
- **SEO hubs:** `src/constants/seo-hubs.ts` — free-api / api-placeholder / fake-json-api copy
- **Endpoint landings:** `src/constants/endpoint-landing.ts` — per-slug SEO content + FAQs
- **Sitemap:** `src/app/sitemap.ts` — auto-generated from routes
- **Structured data:** `src/components/seo/json-ld.tsx` (site-wide) + `faq-json-ld.tsx` / `page-breadcrumb-json-ld.tsx` on relevant pages
- **Open Graph image:** `public/og.png`

## Google Search Console (post-deploy)

1. Add a URL-prefix property for `https://free-api-req.vercel.app`
2. Submit `https://free-api-req.vercel.app/sitemap.xml`
3. Request indexing for `/`, `/free-api`, `/fake-json-api`, and `/api-placeholder`
4. Prefer this host only — ignore or remove any old `free-api-mu.vercel.app` property
5. Expect weeks to months for ranking movement; long-tail queries usually move first

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm start` | Run production server |
| `pnpm lint` | ESLint |

## Related

- [Backend README](../free-api-backend/README.md)
- [Project README](../README.md)
