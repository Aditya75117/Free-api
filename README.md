# ApiGenerator Frontend

Next.js 16 frontend for [ApiGenerator](https://free-api-mu.vercel.app) — a free mock REST API generator.

## Setup

```bash
pnpm install
cp .env.example .env.local   # if present
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://free-api-mu.vercel.app` | Canonical URL for metadata, sitemap, JSON-LD |
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:3001` (dev) | Mock API backend base URL |

## Page Structure

| Route | Purpose |
|-------|---------|
| `/` | Home + inline API generator |
| `/playground` | Full API testing UI |
| `/examples` | Endpoint grid hub |
| `/examples/:slug` | SEO landing pages (16 endpoints) |
| `/docs` | API documentation |
| `/compare/jsonplaceholder` | JSONPlaceholder alternative |
| `/compare/mockoon` | Mockoon alternative |
| `/use-cases/react-mock-api` | React integration guide |
| `/about` | About page |
| `/groups` | Saved API groups (noindex) |
| `/privacy`, `/terms` | Legal pages |

## SEO Conventions

- **Metadata:** `src/constants/page-metadata.ts` — single source for titles, descriptions, keywords
- **Content:** `src/constants/page-content.ts` — long-form copy for compare/use-case pages
- **Endpoint landings:** `src/constants/endpoint-landing.ts` — per-slug SEO content + FAQs
- **Sitemap:** `src/app/sitemap.ts` — auto-generated from routes
- **Structured data:** `src/components/seo/json-ld.tsx` (site-wide) + `page-breadcrumb-json-ld.tsx` (sub-pages)

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
