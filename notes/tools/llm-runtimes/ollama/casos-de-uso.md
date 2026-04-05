---
sidebar_position: 6
---

# Casos de uso

## Asistente de código offline

```bash
ollama run qwen2.5-coder:14b
```

## Embeddings para RAG local

```bash
ollama pull nomic-embed-text
```

```python
import ollama

result = ollama.embeddings(model="nomic-embed-text", prompt="texto a vectorizar")
vector = result["embedding"]
```

## Integración con herramientas de agentes

Ollama es compatible con herramientas como **LangChain**, **LlamaIndex**, **Open WebUI** o **Codex CLI**, que pueden apuntar a `http://localhost:11434` como proveedor de modelos.

## Consejos

- Empieza con modelos de 7B si tienes 8–16 GB de RAM; son suficientemente capaces para la mayoría de tareas.
- Usa `OLLAMA_KEEP_ALIVE=0` si quieres que el modelo se descargue de memoria inmediatamente tras cada petición y así liberar RAM.
- Para velocidades de generación aceptables sin GPU, un procesador moderno con 8 núcleos genera entre 5 y 15 tokens/segundo con un modelo de 7B.
- Los modelos cuantizados a Q4 son el mejor equilibrio entre tamaño, velocidad y calidad para uso en local.

Ver el experimento: [Embeddings locales con nomic-embed-text](/experiments/ollama-embeddings-locales)

## Referencias

- [Ollama — Sitio oficial](https://ollama.com)
- [Catálogo de modelos](https://ollama.com/library)
- [Repositorio en GitHub](https://github.com/ollama/ollama)
- [Documentación de la API](https://github.com/ollama/ollama/blob/main/docs/api.md)
- [Referencia de Modelfile](https://github.com/ollama/ollama/blob/main/docs/modelfile.md)
- [Librería Python de Ollama](https://github.com/ollama/ollama-python)
- [pyllama — Experimento: usar Ollama desde Python](https://github.com/falkenslab/pyllama)
