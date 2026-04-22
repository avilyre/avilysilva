**Load this when:** You need a full system map, domain boundaries, and runtime data flow before implementing features.

## System Overview

This project is a personal portfolio and technical blog built with Astro.
It combines static content delivery with one SSR API endpoint for AI-generated post summaries.

## Architecture by Domain

### 1. Routing Domain (`src/pages`)

- Static routes:
  - `index.astro` (home)
  - `about.astro` (profile/career)
  - `blog/index.astro` (post listing)
- Dynamic content route:
  - `blog/[...slug].astro` (individual post pages via Content Collections)
- SSR API route:
  - `api/summarize.ts`
- Machine-readable routes:
  - `rss.xml.ts`
  - `robots.txt.ts`

### 2. Shared UI Domain (`src/components`)

- Layout composition:
  - `layouts/wrapper.astro`: document shell, global styles, navbar/footer
  - `layouts/metadata.astro`: SEO, canonical, Open Graph, Twitter tags
  - `layouts/header.astro`, `navbar.astro`, `footer.astro`
- Image abstraction:
  - `great-image/index.astro`
  - `great-image/utility/fetch-great-image.ts`

### 3. Feature Domain (`src/features`)

- `features/blog`:
  - Listing and item components
  - Sharing UI
  - AI summary trigger
  - Reading-time utility
- `features/about`:
  - Biography section
  - Career timeline
  - Soft skills section
  - Reusable cards

### 4. Content Domain (`src/content`)

- Markdown posts in `src/content/posts`.
- Schema and loader in `src/content.config.ts`.
- Astro Content Collections provide compile-time validation + typed data.

### 5. Infrastructure Domain (`src/lib`)

- `redis.ts`: Upstash Redis client bootstrap.
- `marked-with-highlight.ts`: Markdown -> HTML parser with `highlight.js`.
- `plaiceholder.ts`: placeholder generation from fetched image buffer.

### 6. Utility Domain (`src/utility`)

- `generate-hash.ts`: deterministic content hash for cache keys.
- `date-time-format.ts`: localized date formatter.
- `wait-for-animation.ts`: animation completion promise helper.

### 7. Configuration Domain (root)

- `astro.config.ts`: integrations, adapter, runtime, site URL.
- `tsconfig.json`: strict config + import aliases.
- `eslint.config.js`, `.prettierrc.mjs`: code quality policy.
- `.husky/pre-commit`: quality gate workflow.

## Runtime Flows

### Static Navigation Flow

1. Route resolves to Astro page.
2. Page is wrapped by `PageWrapper`.
3. `Metadata` computes canonical and social metadata.
4. Layout renders navbar/content/footer.

### Blog Post Render Flow

1. `getStaticPaths()` reads all collection entries.
2. Astro generates one page per post slug.
3. `render(post)` transforms Markdown for output.
4. Post UI renders hero image, metadata, share controls, and content.

### AI Summary Flow

1. User clicks `SummaryAIButton`.
2. Custom element script posts raw article content to `/api/summarize`.
3. API hashes input and checks Redis.
4. If cache hit, returns cached summary HTML.
5. If miss, Gemini generates Markdown summary.
6. Markdown is parsed to HTML, saved in Redis, then returned.
7. Client injects summary HTML in the summary container.

## Integration Boundaries

- Google Gemini: only used in `src/pages/api/summarize.ts`.
- Upstash Redis: only used through `src/lib/redis.ts` and summarize API.
- Image placeholders: wrapped by `src/lib/plaiceholder.ts` and used via `GreatImage`.

Keep third-party dependencies behind these wrappers/routes when possible.

## Key Couplings and Risks

- Blog page client script and API response format are tightly coupled (`data.summary` HTML).
- Long cache TTL can preserve old summary output quality.
- Blog listing and RSS draft handling are not aligned today.
- Remote image placeholder generation depends on network availability for external image URLs.
