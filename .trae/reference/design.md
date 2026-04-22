**Load this when:** You need design tokens, UI composition rules, typography, or motion guidance before changing visuals.

## Visual Identity

- Style direction: dark, high-contrast, minimalist portfolio/blog.
- Tone: technical, clean, content-first.
- Accent usage: restrained highlights over slate-based surfaces.

## Token System

Defined in `src/styles/brand.css` using Tailwind v4 `@theme`.

Core tokens:

- `--color-background`: page background
- `--color-surface`: card/surface base
- `--color-foreground`: secondary text
- `--color-accent`: primary emphasis text
- `--color-code`: code block surface
- `--color-ocean`: link/highlight accent

Semantic mappings:

- `--color-primary`, `--color-secondary`, `--color-tertiary`, `--color-highlight`

Use semantic tokens first; avoid hardcoded one-off colors in components.

## Typography

- Family: `Poppins` via `@font-face` in `src/styles/fonts.css`.
- Weights in use: 400, 500, 600.
- Body baseline: `text-base` (smaller on narrow screens by utility classes).
- Hierarchy:
  - `h1`: bold, large display for page titles.
  - `h2/h3`: section and content hierarchy.
  - Body text: `text-secondary` with relaxed line-height.

## Layout System

- Global container max width: `800px` (`PageWrapper` body classes).
- Horizontal padding: `px-6` on small screens, `lg:px-0` on desktop.
- Vertical rhythm uses flex gaps, usually in 8-16 spacing scale.
- Background atmosphere: blurred radial shape in wrapper.

## Shared Layout Components

- `wrapper.astro`: root shell + global structure.
- `navbar.astro`: lightweight top nav with active state highlighting.
- `footer.astro`: social links and final navigation anchor.
- `header.astro`: reusable title/description block.

Keep route pages composing these components rather than duplicating layout code.

## Motion and Effects

Animations in `src/styles/animations.css`:

- `enter-down`: reveal content with upward blur-to-sharp motion.
- `exit-down`: hide content with downward blur/fade.
- `ai-neon-anim`: decorative glow for AI summary button/elements.

Motion usage principles in this codebase:

1. Use animation classes as state markers.
2. Synchronize UI transitions with `waitForAnimation`.
3. Reserve animated glow for AI affordance, not all controls.

## Content Rendering Design

Blog content style rules live in `src/styles/content.css`:

- Rich typography for headings/paragraphs/lists.
- Styled inline `code` and block `pre`.
- Language-specific syntax token coloring via `hljs` classes.
- Consistent spacing around headings, paragraphs, lists, and code blocks.

When changing blog readability, prefer editing `content.css` centrally.

## Responsive Behavior

- Mobile-first classes across all components.
- About page sections shift from stacked to multi-column at `sm` breakpoints.
- Typography and controls increase sizing at `lg`.
- Navbar links use horizontal overflow handling on smaller viewports.

## Accessibility and Interaction Notes

- Controls include descriptive `title` and labels in interactive elements.
- Active nav state is visually emphasized with contrast background shape.
- Summary flow includes disabled state to prevent duplicate requests.

When adding interactions, keep clear focus/hover/disabled affordances aligned with existing token usage.
