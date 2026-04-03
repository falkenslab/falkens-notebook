# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Dr. Falken's Notebook** is a Docusaurus v3 static documentation site about AI concepts, experiments, and resources. It is published to GitHub Pages at `https://falkenslab.github.io/falkens-notebook`. The site's primary language is **Spanish**.

## Commands

```bash
npm start        # Start local dev server with hot reload
npm run build    # Build static site for production
npm run serve    # Serve the built site locally
npm run typecheck  # TypeScript type checking
npm run clear    # Clear Docusaurus cache (useful when build behaves unexpectedly)
```

## Architecture

- **`docusaurus.config.ts`** — Main config: site metadata, plugins, navbar/footer, theme, search
- **`sidebars.ts`** — Sidebar is auto-generated from the `/docs` filesystem structure
- **`docs/`** — Documentation content organized by topic (basic-concepts, models, tools, use-cases)
- **`blog/`** — Blog posts with date-prefixed filenames (`YYYY-MM-DD-title.md`), plus `authors.yml` and `tags.yml`
- **`src/components/`** — Custom React components (homepage features)
- **`src/pages/`** — Custom pages (`index.tsx` is the homepage)
- **`src/css/`** — Global custom CSS
- **`static/`** — Static assets served as-is
- **`i18n/es/`** — Spanish translations for Docusaurus UI strings

## Deployment

CI/CD via `.github/workflows/deploy.yml`: push to `main` triggers `npm ci && npm run build`, then publishes `./build` to the `gh-pages` branch using `peaceiris/actions-gh-pages`.

## Content conventions

When writing or editing blog posts and documentation pages:

- **Never use `---` horizontal rule separators** to divide sections. Use Markdown headings (`##`, `###`) instead.
- **Always add a `## Referencias` section at the end** of every article (blog post or doc page) with relevant links — external (official docs, repos, papers) and internal (related glossary entries, other pages in this site) — to give credibility and aid navigation.

## Key Config Details

- **Base URL:** `/falkens-notebook` (GitHub Pages subdirectory — important for all internal links and assets)
- **Search:** `@easyops-cn/docusaurus-search-local` with Spanish language indexing
- **Broken links:** Configured to throw on broken internal links (`onBrokenLinks: 'throw'`)
- **Code highlighting:** Dracula (dark) and GitHub (light) Prism themes