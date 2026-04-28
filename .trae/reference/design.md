# Design Reference

This file captures visual system rules and UI behavior conventions.

## Visual Identity

- Theme style: dark interface with high-contrast text.
- Brand font: `Poppins` (weights 400/500/600), loaded via `fonts.css`.
- Core tone: minimal, content-first, rounded surfaces, soft blur/glow accents.

## Design Tokens (`src/styles/brand.css`)

- `--color-background: #020617`
- `--color-accent: #f8fafc`
- `--color-foreground: #94a3b8`
- `--color-surface: #1e293b`
- `--color-code: #1e293b`
- Semantic aliases:
  - `--color-primary` -> accent
  - `--color-secondary` -> foreground
  - `--color-tertiary` -> surface

## Typography Rules

- Body baseline: `font-sans`, antialiased, base size from global styles.
- Page titles commonly use semibold with responsive scaling (`text-3xl`/`text-4xl`/`text-8xl` where appropriate).
- Supporting text uses `text-secondary` and relaxed line height.
- Blog/article text uses `content.css` typographic rules (paragraph spacing, heading rhythm, list spacing).

## Layout And Spacing

- Global page shell max width: `800px` with horizontal padding on small screens.
- Vertical rhythm is enforced with consistent `gap-*` utility classes in page sections.
- Rounded corners are used for cards/images/content blocks (`rounded-md`, `rounded-xl`, `rounded-2xl`).
- Header/footer/nav remain lightweight and centered around content readability.

## Component-Level Styling Patterns

- Navigation:
  - Active link uses pseudo-element background highlight.
  - Inactive links rely on subtle color transition on hover.
- Buttons:
  - Shared disabled treatment through global `button:disabled`.
  - Summary button styling changes for retry/error state.
- Images:
  - `GreatImage` composes blur placeholder + final optimized image.
  - Grayscale/rounded treatments are applied via passed class sets.

## Motion And Effects

- Motion tokens in `animations.css`:
  - `enter-down` (reveal)
  - `exit-down` (dismiss)
- AI summary block effect:
  - `ai-neon-effect` pseudo-element with animated radial gradients.
  - Hover state increases glow intensity.
- Scripted animation sequencing relies on waiting for named `animationend`.

## Markdown Content Styling

- Scope: all post content under `.content` container.
- Code blocks:
  - Styled with translucent code surface and rounded edges.
  - Language-specific color mapping for JSX, console, and CSS.
- Inline code:
  - Secondary text color with code-surface background and compact padding.
- Text elements:
  - Headings (`h2`) use strong weight and controlled spacing.
  - Paragraph and list spacing follows strict adjacent-element rhythm.

## Responsiveness

- Breakpoint strategy primarily uses Tailwind defaults (`sm`, `md`, `lg`).
- Type and layout scale up at `lg` for improved readability.
- Blog meta panels and section grouping shift from stacked to row layouts on larger screens.

## Accessibility And UX Notes

- Contrast is maintained through tokenized foreground/background pairs.
- Focus/interaction affordances are mainly color and opacity transitions.
- Skeleton/loading states are used during async summary generation.
- Link and text-balance utilities support scanning and readability in long-form content.
