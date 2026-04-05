# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Dr. Falken's Notebook** es un sitio de documentación estático con Docusaurus v3 sobre IA aplicada. Publicado en GitHub Pages en `https://falkenslab.github.io/falkens-notebook`. El idioma principal es **español**.

La filosofía del cuaderno es **práctica**: experimentos y ejemplos primero, teoría la mínima indispensable. La teoría va al glosario o a las notas (docs), nunca como cuerpo principal de un experimento.

El sitio tiene dos secciones de contenido:

- **Experimentos** (`experiments/`, ruta `/experiments`) — artículos/posts con experimentos concretos: código ejecutable, resultado real o representativo e interpretación breve. Son el corazón del cuaderno.
- **Notas** (`notes/`, ruta `/docs`) — documentación de referencia organizada por tema: conceptos, modelos, herramientas, casos de uso. Aquí va la teoría, el glosario y el contexto que da soporte a los experimentos.

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
- **`notes/`** — Notas: documentación de referencia organizada por tema (basic-concepts, models, tools, use-cases)
- **`experiments/`** — Experimentos: posts con date-prefixed filenames (`YYYY-MM-DD-title.md`), más `authors.yml` y `tags.yml`. La ruta pública es `/experiments`.
- **`src/components/`** — Custom React components (homepage features)
- **`src/pages/`** — Custom pages (`index.tsx` is the homepage)
- **`src/css/`** — Global custom CSS
- **`static/`** — Static assets served as-is
- **`i18n/es/`** — Spanish translations for Docusaurus UI strings

## Deployment

CI/CD via `.github/workflows/deploy.yml`: push to `main` triggers `npm ci && npm run build`, then publishes `./build` to the `gh-pages` branch using `peaceiris/actions-gh-pages`.

## Content conventions

### Experimentos (blog/)

Los experimentos son el formato principal del cuaderno. Cada experimento debe:

- **Centrarse en un caso práctico concreto**, no en explicar teoría.
- **Incluir código ejecutable** (o representativo si no puede ejecutarse en el momento de escritura) con resultado real y fiel.
- **Mantener la teoría al mínimo**: solo lo necesario para entender el experimento. Si hay más que explicar, enlazar a las notas o al glosario.
- **Terminar siempre con `## Referencias`** con enlaces externos (docs oficiales, repos, papers) e internos (notas relacionadas, glosario).

Formato obligatorio del bloque de experimento:

```
## Experimento: [nombre descriptivo]

**Contexto:** una línea de por qué este experimento es relevante

```bash / python / json
# código ejecutable
```

**Resultado:**
```
output real o representativo (realista y fiel)
```

**Qué aprender:** 1-2 líneas de interpretación
```

Un experimento puede tener varios bloques `## Experimento:` si explora variantes del mismo tema.

### Notas (docs/)

Las notas son documentación de referencia. Pueden ser:

- Conceptos y definiciones (glosario incluido)
- Guías de herramientas o modelos
- Contexto teórico que da soporte a los experimentos

Las notas también deben incluir al menos un `## Experimento:` cuando sea posible, para que no sean puramente teóricas. Y siempre deben terminar con `## Referencias`.

### Normas generales

- **Nunca usar `---`** como separador horizontal. Usar encabezados (`##`, `###`).
- **Siempre añadir `## Referencias`** al final de cada página.
- El output de un experimento puede ser representativo (no ejecutado en vivo) pero debe ser realista y preciso.

## Key Config Details

- **Base URL:** `/falkens-notebook` (GitHub Pages subdirectory — important for all internal links and assets)
- **Blog route:** `/experiments` (configured via `routeBasePath` in `docusaurus.config.ts`)
- **Search:** `@easyops-cn/docusaurus-search-local` with Spanish language indexing
- **Broken links:** Configured to throw on broken internal links (`onBrokenLinks: 'throw'`)
- **Code highlighting:** Dracula (dark) and GitHub (light) Prism themes
