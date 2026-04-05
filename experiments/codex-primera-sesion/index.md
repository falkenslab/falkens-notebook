---
date: 2026-04-05
slug: codex-primera-sesion
title: Primera sesión con Codex CLI
tags: [Codex, agente]
---

Instalar Codex CLI y comprobar cómo analiza la arquitectura de un proyecto real en la primera sesión.

<!-- truncate -->

## Experimento: primera sesión con Codex

**Contexto:** comprobar que la instalación funciona y ver cómo Codex analiza un proyecto real.

```bash
npm install -g @openai/codex
cd mi-proyecto
codex
```

```
> explícame la arquitectura de este proyecto en tres puntos
```

**Resultado:**
```
Leyendo package.json, src/index.ts, src/routes/...

1. API REST con Express — los endpoints están en src/routes/, uno por recurso.
2. Capa de servicios en src/services/ — lógica de negocio desacoplada del framework.
3. Autenticación con JWT — middleware en src/middleware/auth.ts aplicado a rutas protegidas.
```

**Qué aprender:** al igual que Claude Code, Codex lee el proyecto antes de responder. El modo `suggest` es el más seguro para empezar: propone cada cambio antes de aplicarlo.

## Referencias

- [Codex CLI — Repositorio oficial](https://github.com/openai/codex)
- [Notas: Codex CLI — Instalación](/docs/tools/ai-coding/codex/instalacion)
