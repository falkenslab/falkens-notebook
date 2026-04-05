---
date: 2026-04-05
slug: ollama-embeddings-locales
title: Embeddings locales con nomic-embed-text
tags: [Ollama, embeddings, RAG]
---

Generar embeddings sin enviar datos a ningún servicio externo usando Ollama y nomic-embed-text, útil para RAG privado.

<!-- truncate -->

## Experimento: embeddings locales con nomic-embed-text

**Contexto:** generar embeddings sin enviar datos a ningún servicio externo, útil para RAG privado.

```python
import ollama

textos = [
    "Ollama permite ejecutar LLMs en local.",
    "Los embeddings son representaciones vectoriales del texto.",
]

for texto in textos:
    result = ollama.embeddings(model="nomic-embed-text", prompt=texto)
    print(f"Dimensiones: {len(result['embedding'])}")
```

**Resultado:**
```
Dimensiones: 768
Dimensiones: 768
```

**Qué aprender:** `nomic-embed-text` genera vectores de 768 dimensiones, compatibles con la mayoría de bases de datos vectoriales como ChromaDB o Qdrant.

## Referencias

- [Librería Python de Ollama](https://github.com/ollama/ollama-python)
- [Catálogo de modelos](https://ollama.com/library)
- [Notas: Casos de uso de Ollama](/docs/tools/llm-runtimes/ollama/casos-de-uso)
