<div align="center">
  <img alt="Logo" src="public/icons/logo.svg" width="100" />
</div>

<h1 align="center">
  <a href="https://vithushan.me" target="_blank">vithushan.me</a>
</h1>

<p align="center">
  My personal portfolio — built with <a href="https://astro.build" target="_blank">Astro 6</a>.
</p>

## About this repo

A mostly static personal site: home page sections driven by validated JSON, certificates via content collections, dark/light theme, and CI tooling. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for how folders fit together.

## Tech stack

- [Astro 6](https://docs.astro.build/) (static output)
- TypeScript + `@astrojs/check`
- Zod validation (`astro/zod`) for JSON data
- ESLint + Prettier
- `@astrojs/sitemap`
- Netlify (hosting)

## Project structure

```
/
├── public/                      # Static assets (icons, social card, resume PDF, robots.txt, manifest)
├── scripts/smoke-test.mjs       # Post-build checks (run via `npm test`)
├── netlify.toml                 # Netlify build + headers config
├── src/
│   ├── components/
│   │   ├── layout/              # SiteHeader, SocialRail, EmailRail, theme
│   │   ├── seo/                 # SeoHead
│   │   └── ui/                  # SectionHeading, etc.
│   ├── features/
│   │   ├── home/
│   │   │   ├── sections/        # Hero, About, Experience, …
│   │   │   ├── HomePage.astro
│   │   │   └── home.config.ts   # Section ↔ nav visibility mapping
│   │   └── certificate/
│   │       └── CertificateView.astro
│   ├── assets/images/           # Optimized images (resolved via src/lib/images.ts)
│   ├── content/certs/           # Certificate markdown entries
│   ├── content.config.ts
│   ├── data/
│   │   ├── portfolio.json       # Main copy, nav, jobs, insights, …
│   │   └── site.json            # SEO & site metadata
│   ├── layouts/SiteLayout.astro
│   ├── lib/                     # portfolio, site, nav helpers
│   ├── pages/                   # Thin route files only
│   ├── schemas/                 # Zod schemas
│   └── styles/
│       ├── tokens/theme.css
│       └── global.css
├── docs/ARCHITECTURE.md
└── package.json
```

## Content

| Source               | Used for                                                                                       |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| `portfolio.json`     | Hero, about, experience, education, projects, **insights** (JSON links), contact, nav, socials |
| `site.json`          | Default title, SEO meta                                                                        |
| `content/certs/*.md` | Certificate pages at `/cert/<id>/`                                                             |

**Insights** stay in JSON (external Medium/YouTube links), not markdown posts.

## Commands

| Command                | Action                               |
| ---------------------- | ------------------------------------ |
| `npm install`          | Install dependencies                 |
| `npm run dev`          | Dev server (`http://localhost:4321`) |
| `npm run build`        | Production build → `dist/`           |
| `npm run preview`      | Preview production build             |
| `npm run check`        | Astro + TypeScript checks            |
| `npm run lint`         | ESLint                               |
| `npm run lint:fix`     | ESLint with auto-fix                 |
| `npm run format`       | Prettier write                       |
| `npm run format:check` | Prettier check (CI-friendly)         |
| `npm test`             | Smoke-test `dist/` (run after build) |

**Node.js:** `>=22.12.0` (see `.nvmrc`).

## CI and dependency updates

GitHub Actions runs `check` → `lint` → `format:check` → `build` → `test` on push/PR. Dependabot opens weekly dependency PRs.

## Path aliases

Imports use `@/` → `src/` (e.g. `@/lib/portfolio`, `@/features/home/HomePage.astro`).

## Deployment

The site is deployed on [Netlify](https://www.netlify.com/) (free tier). `netlify.toml` sets the build command (`npm run build`), publish directory (`dist`), Node 22 and security/cache headers. To deploy: connect the GitHub repo in Netlify, keep the defaults from `netlify.toml`, and set the custom domain to `vithushan.me`. Every push to the production branch redeploys; pull requests get deploy previews.

## Images

Put images in `src/assets/images/` and reference them in JSON/content as `/images/<file>`; `src/lib/images.ts` resolves them so Astro serves optimized WebP with sizing. The social card (`public/images/og-card.png`, 1200×630) and icons stay in `public/`.

## License

Source code is released under the [MIT License](LICENSE). The written content, photos, certificates and resume are © Vithushan Jeyasothy, all rights reserved.
