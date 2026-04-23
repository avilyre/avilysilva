# Architecture

This file describes the current runtime structure and data flow of the site.

## System Overview

- Platform: Astro static-first site with one server-rendered API endpoint.
- Primary domains:
  - Home/About presentation pages.
  - Blog content listing and article rendering.
  - AI summary generation for article bodies with Redis-backed caching.

## Route Map

- `/` -> landing page (`src/pages/index.astro`).
- `/about` -> profile and career sections (`src/pages/about.astro` + `src/features/about/*`).
- `/blog` -> blog list (`src/pages/blog/index.astro` + `content-list` component).
- `/blog/[...slug]` -> article page and interactive AI summary UI.
- `/api/summarize` -> POST API for AI summarization and cache interaction.
- `/rss.xml` -> RSS feed generated from content collection.
- `/robots.txt` -> dynamic robots response.

## Layered Boundaries

- **Pages layer (`src/pages`)**
  - Defines route entrypoints and route-level data fetching (`getCollection`, `getStaticPaths`).
  - Composes shared layout and feature components.
- **Feature layer (`src/features`)**
  - Encapsulates domain-specific UI blocks for `about` and `blog`.
  - Holds small feature-level helpers (`readingTime`).
- **Shared component layer (`src/components`)**
  - Layout shell (`wrapper`, `metadata`, `navbar`, `footer`, `header`).
  - Shared media primitive (`great-image`).
- **Integration layer (`src/lib`)**
  - Third-party wrappers: Redis, markdown/highlight parser, image placeholder generation.
- **Configuration/content layer**
  - Content schema (`src/content.config.ts`).
  - Static constants in `src/constants`.

## Data Flow: Blog Rendering

1. Markdown files in `src/content/posts` are validated by collection schema.
2. Blog list route fetches collection and sorts by publish date.
3. Slug route resolves static paths from post IDs.
4. Post markdown is rendered through Astro `render(post)` into component content.
5. Shared wrappers add metadata, navigation, and footer around route content.

## Data Flow: AI Summary

1. User clicks summary button in blog post client script.
2. Browser sends POST request to `/api/summarize` with full post body.
3. API validates payload and computes deterministic hash (`SHA-256`).
4. API checks Redis for key `summary:with-astro:<hash>`.
5. On cache miss, Gemini is called and response text is transformed to HTML.
6. HTML is cached in Redis with long TTL and returned to client.
7. Client injects summary HTML into the summary container.

## External Integrations

- Google GenAI (`@google/genai`) for summarization.
- Upstash Redis (`@upstash/redis`) for summary cache.
- Highlight.js via `marked-highlight` for markdown/code rendering.
- Plaiceholder for remote image blur placeholders.
- Astro integrations: sitemap generation + Vercel adapter.

## Build And Runtime Characteristics

- Blog pages and main routes are generated from content collection.
- API route is runtime-executed (not prerendered).
- RSS and robots endpoints are generated through Astro route handlers.

## Key Risks And Hotspots

- Summary caching format mismatch risk (cache hit parse behavior vs stored value).
- Client-side summary interaction is DOM-dependent; markup and script are tightly coupled.
- Metadata correctness depends on consistent `site` and env URL configuration.

## Extension Guidelines

- New feature domains should follow `src/features/<domain>/{components,sections,utility}`.
- Shared logic with external dependencies should be wrapped in `src/lib`.
- Route handlers should stay thin and delegate reusable behavior to utilities/libs.
- Content model changes must be synchronized between `content.config.ts`, pages, and RSS.
