---
date: 2026-04-05
slug: claude-code-primera-sesion
title: Primera sesión con Claude Code
tags: [Claude-Code, agente]
---

Instalar Claude Code y ver cómo analiza un proyecto real en la primera sesión, sin que tengas que explicar nada.

<!-- truncate -->

## Experimento: primera sesión con Claude Code

**Contexto:** comprobar que la instalación funciona y ver cómo Claude Code interactúa con un proyecto real.

```bash
npm install -g @anthropic-ai/claude-code
cd mi-proyecto
claude
```

```
> dime qué hace este proyecto en una frase
```

**Resultado:**
```
Leyendo package.json, README.md y src/index.ts...

Es una API REST en Node.js con Express que gestiona un catálogo de productos
con operaciones CRUD y autenticación JWT.
```

**Qué aprender:** Claude Code lee los ficheros del proyecto antes de responder, lo que le da contexto real sin que tengas que explicarlo tú.

## Referencias

- [Claude Code — Sitio oficial](https://claude.ai/code)
- [Documentación de Claude Code](https://docs.anthropic.com/es/docs/claude-code/overview)
- [Notas: Claude Code — Instalación](/docs/tools/ai-coding/claude-code/instalacion)
