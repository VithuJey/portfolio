# Architecture

This portfolio uses a **feature-based** layout on top of Astro’s file-based routing.

## Folder roles

| Path                     | Purpose                                      |
| ------------------------ | -------------------------------------------- |
| `src/pages/`             | Routes only — thin wrappers                  |
| `src/features/`          | Page-specific UI (`home`, `certificate`)     |
| `src/components/layout/` | Global shell (header, rails, theme)          |
| `src/components/ui/`     | Small reusable UI primitives                 |
| `src/components/seo/`    | SEO `<head>` metadata                        |
| `src/layouts/`           | HTML document wrapper                        |
| `src/content/`           | Content collection entries (certificates)    |
| `src/data/`              | JSON content (`portfolio.json`, `site.json`) |
| `src/lib/`               | Validated data loaders and helpers           |
| `src/schemas/`           | Zod schemas for JSON validation              |
| `src/styles/tokens/`     | Design tokens (CSS variables)                |

## Data flow

1. `portfolio.json` and `site.json` are validated at import via `src/lib/portfolio.ts` and `src/lib/site.ts`.
2. Home section visibility is driven by `portfolio.nav.links[].visible` and `features/home/home.config.ts` (`navLabel` mapping).
3. Insights remain in `portfolio.json` (external links + thumbnails), not markdown articles.
4. Certificates use the content collection (`src/content/certs/`) and `pages/cert/[...id].astro`.

## Adding a home section

1. Create `src/features/home/sections/MySection.astro`.
2. Add an entry to `src/features/home/home.config.ts` with matching `navLabel`.
3. Import and render it in `src/features/home/HomePage.astro`.
4. Add a nav link in `portfolio.json` if it should appear in the header.
