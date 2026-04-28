# Important Notes

This file captures high-impact constraints and operational caveats.

## Environment Requirements

- Required versions: Node.js 22+, pnpm package manager.
- Required env vars from `.env.example`:
  - `GEMINI_API_KEY`
  - `REDIS_URL`
  - `REDIS_TOKEN`
- Missing `GEMINI_API_KEY` throws during module initialization of `src/pages/api/summarize.ts`.

## Runtime And Deployment

- Astro config uses Vercel adapter with `runtime: "nodejs"`.
- `site` is fixed to `https://avilysilva.com`; canonical/OG URLs depend on it.
- API route `src/pages/api/summarize.ts` sets `export const prerender = false`.

## API Summarization Caveats

- Endpoint expects JSON body with `content`; empty content returns `400`.
- Gemini model in use: `gemini-2.5-flash`.
- Prompt requests Brazilian Portuguese markdown output and list constraints.
- Cache strategy targets long-term reuse (`5 years` TTL).
- Current cache flow stores HTML (`summaryHtml`) but reads/parses as markdown on hit; this can cause double-processing inconsistencies.

## Caching And Redis Notes

- Redis client is initialized from environment via `@upstash/redis`.
- Cache key format: `summary:with-astro:<sha256>`.
- Any future cache schema changes must version key prefixes to avoid stale format collisions.

## Content And Publishing

- Posts are markdown files in `src/content/posts`.
- Content collection supports `isDraft` with default `false`.
- RSS route filters draft posts (`!post.data.isDraft`).
- Blog route static paths currently map all posts; if draft hiding is needed in pages, filter at `getStaticPaths()`.

## Styling And UX Constraints

- Theme tokens are centralized in `src/styles/brand.css`; avoid hardcoding repeated color values.
- Global typography and UI baseline live in `src/styles/globals.css`.
- Rich markdown display styles and code highlighting colors live in `src/styles/content.css`.
- Animation names (`enter-down`, `exit-down`) are coupled with `waitForAnimation()` usage in blog summary UI.

## SEO And Metadata Notes

- Metadata wrapper computes canonical URL via `new URL(Astro.url.pathname, Astro.site)`.
- Open Graph image defaults to `/images/opengraph.png`.
- `robots.txt` is generated at runtime and depends on `import.meta.env.SITE` for sitemap URL.

## Editing Safety Notes

- Prefer small, domain-scoped edits; most behavior is split by page/feature/component boundaries.
- When changing summary client script, validate all queried elements remain in template to avoid runtime no-op.
- Keep markdown rendering pipeline aligned between cache miss and cache hit behavior.
- Update reference docs in `.trae/reference/` whenever architecture or conventions change materially.
