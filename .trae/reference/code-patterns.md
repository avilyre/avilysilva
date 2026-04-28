# Code Patterns

This file documents implementation conventions used in this repository.

## Stack And Baseline

- Framework: Astro 5 with TypeScript strict config (`astro/tsconfigs/strict`).
- Styling: Tailwind CSS v4 (`@tailwindcss/vite`) plus local CSS files.
- Content source: Astro Content Collections (`src/content.config.ts`) with Markdown posts.
- Runtime integration: Vercel adapter in Node runtime mode.
- Linting/formatting: ESLint + Prettier with Astro plugins.

## Folder And Domain Conventions

- `src/pages`: route entry points only (page assembly, route-specific wiring).
- `src/features/<domain>`: domain UI and logic grouped by feature (`about`, `blog`).
- `src/components/layouts`: shared shell/layout primitives (`wrapper`, `metadata`, etc.).
- `src/components/great-image`: reusable image abstraction with blur placeholder support.
- `src/constants`: static content and metadata used by pages/features.
- `src/lib`: third-party wrappers/integrations (`redis`, markdown highlighter, plaiceholder).
- `src/utility`: generic helper functions (hashing, date formatting, animation waiters).
- `src/styles`: global/theme/content styling layers.
- `src/content/posts`: Markdown posts loaded through collection schema.

## Import And Typing Patterns

- Prefer alias imports with `@src/*` for cross-domain references.
- Use explicit local `type Props` in Astro components and destructure from `Astro.props`.
- Keep constants immutable with `as const` when shape should remain literal.
- Define shared object shapes with exported TS `type` (example: `Company`).

## Astro Component Patterns

- Frontmatter handles data preparation; template handles display only.
- Reusable sections/components receive typed props rather than fetching global state.
- Named slots are used for optional extension points (example: header icon slot).
- Shared page shell is centralized in `PageWrapper` (`wrapper.astro`) for consistency.

## Content And Blog Patterns

- Posts are discovered via `glob()` loader from `src/content/posts/**/*.md`.
- Collection schema enforces fields: `title`, `cover`, `summary`, `date`, `isDraft`.
- Blog listing sorts by descending date in the feature component.
- Slug page uses `getStaticPaths()` over collection items and renders markdown via `render()`.
- Reading time is computed from post body text using a utility function.

## API And Async Patterns

- API routes use `APIRoute` typing and explicit HTTP status/JSON responses.
- Summarization endpoint validates input early and returns `400` for invalid payloads.
- External service calls are wrapped in `try/catch` with structured error responses.
- Cache keys are deterministic (`SHA-256` hash of content) before remote AI invocation.
- Markdown returned from AI is transformed to highlighted HTML before responding.

## Image And Media Patterns

- `GreatImage` encapsulates placeholder + final image rendering concerns.
- `fetchGreatImage()` toggles between remote blur generation and direct source usage.
- `plaiceholder` integration returns `{ placeholder, image }` for flexible UI composition.

## Styling Patterns

- Global style entrypoint imports `tailwindcss` and local theme files.
- Theme tokens are declared in `brand.css` using `@theme` custom properties.
- Reusable visual effects use semantic utility classes (`ai-neon-effect`, animation tokens).
- Content typography/highlight styles are isolated in `content.css`.
- Responsive behavior primarily uses Tailwind utility breakpoints (`sm`, `lg`, `md`).

## Client-Side Script Patterns

- Small interactive behaviors stay local in Astro `<script>` blocks.
- Custom elements are used for encapsulated interactions (`summary-content-ai`).
- DOM element lookups are validated before use; handlers exit early if missing.
- Animation sequencing uses promise-based helper (`waitForAnimation`).

## Quick Authoring Checklist

- Place new logic in the right domain folder before coding.
- Add/update TS types for props and shared constants.
- Reuse existing layout and helper abstractions instead of duplicating behavior.
- Keep route files focused on composition; move reusable blocks into features/components.
- Ensure markdown/content-facing UI still respects `content.css` conventions.
