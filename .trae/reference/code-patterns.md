**Load this when:** You need coding conventions, folder rules, or implementation patterns before editing the project.

## Project Style Baseline

- Stack: Astro 5, TypeScript, TailwindCSS 4, Markdown Content Collections.
- Language: UI and content are primarily in Brazilian Portuguese (`pt-BR`).
- Formatting: Prettier + ESLint; semicolons and double quotes are enforced.
- File naming: kebab-case across Astro and TypeScript files.

## Domain-Oriented Folder Structure

- `src/pages`: route entrypoints (`.astro`, `.ts` for API and feeds).
- `src/features`: domain modules grouped by feature (`about`, `blog`).
- `src/components`: shared UI building blocks (`layouts`, `great-image`).
- `src/lib`: external integration helpers and shared infrastructure wrappers.
- `src/utility`: framework-agnostic helpers.
- `src/constants`: static app metadata and lists.
- `src/content/posts`: Markdown blog posts.
- `src/styles`: design tokens, globals, content rendering styles, animations.

## Imports and Aliases

Use aliases from `tsconfig.json`:

- `@src/*`
- `@layouts/*`
- `@components/*`

Prefer alias imports over deep relative imports for app code.

## Astro Page Pattern

Typical page composition:

1. Import `PageWrapper` from `src/components/layouts/wrapper.astro`.
2. Pull static metadata from `PAGE_INFO` when available.
3. Render feature sections/components.
4. Keep route-level data loading in frontmatter.

Example routes in this style:

- `src/pages/about.astro`
- `src/pages/blog/index.astro`

## Dynamic Content Route Pattern

Dynamic blog page `src/pages/blog/[...slug].astro` uses:

1. `getStaticPaths()` + `getCollection("posts")`.
2. `render(post)` from `astro:content`.
3. Domain components (`BackToPrev`, `ShareBar`, `SummaryAIButton`).
4. Local client script for custom element behavior.

Keep rendering and content hydration logic close to this page when extending post behavior.

## API Route Pattern

`src/pages/api/summarize.ts` defines:

- `export const prerender = false` (must stay SSR).
- Input validation (`content` required).
- Deterministic cache key with SHA-256 hash.
- Cache-first read in Redis.
- External AI call fallback.
- Consistent JSON responses and status codes.

When adding APIs, follow the same order: validate -> cache -> external call -> transform -> cache -> respond.

## Content Collection Pattern

`src/content.config.ts` defines collection schema with `zod`:

- `title: string`
- `cover: string`
- `summary: string`
- `date: coerce.date()`
- `isDraft: boolean` with default `false`

All posts must keep this frontmatter contract.

## Styling Pattern

- TailwindCSS v4 is configured via CSS `@theme` in `src/styles/brand.css`.
- Global app styles are in `src/styles/globals.css`.
- Blog rendered Markdown styles are in `src/styles/content.css`.
- Reusable animation tokens and keyframes are in `src/styles/animations.css`.

Prefer tokenized colors (`text-primary`, `bg-tertiary`) over raw color classes.

## Client-Side Interaction Pattern

Interactive behavior is minimal and colocated:

- Navbar active link state uses a small inline script in `navbar.astro`.
- Blog summary uses a custom element (`summary-content-ai`) in `[...slug].astro`.

When adding client logic:

1. Target explicit element IDs/classes.
2. Fail fast when elements are missing.
3. Use CSS classes for state transitions instead of manual inline styles.

## Utility Pattern

- Keep pure helpers in `src/utility`.
- Keep integration wrappers in `src/lib`.
- Avoid mixing framework APIs into generic helpers unless strictly necessary.

Current examples:

- `generate-hash.ts`: deterministic SHA-256.
- `date-time-format.ts`: locale + timezone safe date formatting.
- `wait-for-animation.ts`: resolves animation completion promises.

