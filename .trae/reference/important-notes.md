**Load this when:** You need critical constraints, deployment notes, environment setup, or high-impact caveats before changing code.

## Runtime and Deployment Constraints

- Astro adapter: `@astrojs/vercel`.
- Runtime mode: Node.js (`astro.config.ts` exports `{ runtime: "nodejs" }`).
- Site URL: `https://avilysilva.com`.
- Most pages are statically generated; API route is server-rendered only.

## Mandatory Environment Variables

Required for `/api/summarize`:

- `GEMINI_API_KEY`
- `REDIS_URL`
- `REDIS_TOKEN`

If `GEMINI_API_KEY` is missing, the module throws during load.

## API SSR Constraint

`src/pages/api/summarize.ts` must keep:

```ts
export const prerender = false;
```

Removing this breaks runtime API behavior in production.

## Caching Behavior

- Redis key prefix: `summary:with-astro:`.
- Cache key body: SHA-256 hash of input content.
- Current TTL: 5 years (`60 * 60 * 24 * 365 * 5`).

This is very long-lived; updates to summary prompt quality will not affect cached entries until expiration or manual invalidation.

## Content Lifecycle Notes

- Source of truth for posts: `src/content/posts/*.md`.
- Collection schema enforces frontmatter shape via `src/content.config.ts`.
- Blog list currently sorts posts by date but does not filter drafts.
- RSS route filters drafts (`!post.data.isDraft`), so listing and RSS behavior can diverge.

## Build and Commit Pipeline Notes

Pre-commit hook runs:

1. `pnpm run format`
2. `pnpm run lint`
3. `pnpm run build`

Commits are blocked on `production` and `development` branches.

Plan code changes expecting build-level checks on every commit.

## External Service and Network Notes

- AI summaries use Google Gemini (`@google/genai`), model currently `gemini-2.5-flash`.
- Summary cache uses Upstash Redis.
- Remote image blur generation fetches URLs at runtime/build (`plaiceholder` wrapper).

`src/features/about/sections/biography.astro` uses a remote GitHub avatar URL; remote fetch failures can impact image placeholder generation.

## Localization and Date Handling Notes

- Locale target: `pt-BR`.
- `date-time-format.ts` normalizes timezone before formatting with `America/Sao_Paulo`.
- Post page publication date uses `toLocaleDateString("pt-BR")`.

Preserve locale consistency in new UI or content features.

## Quality and Safety Notes

- There is no automated test suite in this repository.
- Validation and guard clauses in API/client scripts are important and should be kept.
- `summary-content-ai` injects server-returned HTML into `innerHTML`; keep Markdown transformation path controlled and trusted.
