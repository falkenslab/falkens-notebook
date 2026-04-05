---
date: 2026-04-05
slug: weaviate-busqueda-hibrida
title: Búsqueda híbrida con Weaviate
tags: [Weaviate, embeddings, RAG]
---

Combinar búsqueda vectorial y BM25 en Weaviate para obtener resultados más relevantes que con un solo método.

<!-- truncate -->

## Experimento: búsqueda híbrida con Weaviate

**Contexto:** combinar búsqueda vectorial y BM25 para obtener resultados más relevantes que con un solo método.

```python
import weaviate

client = weaviate.connect_to_local()

collection = client.collections.get("Documento")

# Búsqueda híbrida: vectorial + BM25
results = collection.query.hybrid(
    query="modelos de lenguaje en local",
    alpha=0.5,   # 0 = solo BM25, 1 = solo vectorial
    limit=3
)

for obj in results.objects:
    print(obj.properties["contenido"])

client.close()
```

**Resultado:**
```
Ollama permite ejecutar LLMs en local sin coste por token.
La cuantización reduce el tamaño del modelo con pérdida mínima de calidad.
LM Studio incluye un servidor local compatible con la API de OpenAI.
```

**Qué aprender:** el parámetro `alpha` controla el balance entre búsqueda semántica y textual. `alpha=0.5` suele dar mejores resultados que cualquiera de los dos métodos por separado.

## Referencias

- [Weaviate — Documentación](https://weaviate.io/developers/weaviate)
- [Weaviate — GitHub](https://github.com/weaviate/weaviate)
- [Notas: Weaviate](/notes/tools/vector-databases/weaviate)
