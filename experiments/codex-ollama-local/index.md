---
date: 2026-04-05
slug: codex-ollama-local
title: Codex CLI con Ollama en local
tags: [Codex, Ollama, agente, local]
---

Usar Codex CLI sin enviar código a servidores externos, conectándolo a Ollama para inferencia completamente local.

<!-- truncate -->

## Experimento: Codex con Ollama en local

**Contexto:** usar Codex sin enviar código a servidores externos, útil para proyectos privados o con restricciones de privacidad.

```bash
ollama pull qwen2.5-coder:7b

export OPENAI_BASE_URL="http://localhost:11434/v1"
export OPENAI_API_KEY="ollama"
codex --model qwen2.5-coder:7b "explica qué hace la función main en src/index.ts"
```

**Resultado:**
```
Leyendo src/index.ts...

La función `main` inicializa el servidor Express, registra los middlewares de
autenticación y logging, monta las rutas desde src/routes/, y arranca el servidor
en el puerto definido en la variable de entorno PORT (por defecto 3000).
```

**Qué aprender:** con `qwen2.5-coder:7b` y 8 GB de RAM obtienes un agente de código completamente local. La velocidad es menor que con la API de OpenAI, pero suficiente para tareas de análisis y edición de ficheros.

## Referencias

- [Codex CLI — Repositorio oficial](https://github.com/openai/codex)
- [Ollama — Sitio oficial](https://ollama.com)
- [Notas: Codex CLI — Modelos](/notes/tools/ai-coding/codex/modelos)
