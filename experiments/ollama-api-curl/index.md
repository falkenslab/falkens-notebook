---
date: 2026-04-05
slug: ollama-api-curl
title: Llamada a la API de Ollama con curl
tags: [Ollama, API]
---

Verificar que el servidor Ollama está activo y responde correctamente antes de integrarlo en una aplicación.

<!-- truncate -->

## Experimento: llamada a la API con curl

**Contexto:** verificar que el servidor Ollama está activo y responde correctamente antes de integrarlo en una aplicación.

```bash
curl http://localhost:11434/api/generate \
  -d '{"model": "llama3.2", "prompt": "Di hola en tres idiomas", "stream": false}'
```

**Resultado:**
```json
{
  "model": "llama3.2",
  "response": "Hola (español) · Hello (inglés) · Bonjour (francés)",
  "done": true
}
```

**Qué aprender:** con `"stream": false` la respuesta llega completa en un solo JSON, lo que simplifica el parsing en scripts.

## Referencias

- [Documentación de la API](https://github.com/ollama/ollama/blob/main/docs/api.md)
- [Compatibilidad con la API de OpenAI](https://github.com/ollama/ollama/blob/main/docs/openai.md)
- [Notas: API REST de Ollama](/docs/tools/llm-runtimes/ollama/api)
