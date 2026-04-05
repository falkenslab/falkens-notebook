---
date: 2026-04-05
slug: chromadb-busqueda-semantica
title: Búsqueda semántica con ChromaDB
tags: [ChromaDB, embeddings, RAG]
---

Indexar textos en ChromaDB con embeddings automáticos y recuperar los más relevantes para una consulta, sin escribir una línea de código de vectorización.

<!-- truncate -->

## Experimento: búsqueda semántica con ChromaDB

**Contexto:** indexar 5 textos en ChromaDB con embeddings automáticos y recuperar el más relevante para una consulta.

```bash
pip install chromadb
```

```python
import chromadb

client = chromadb.Client()
collection = client.create_collection("fragmentos")

# Indexar documentos (ChromaDB genera embeddings automáticamente)
collection.add(
    documents=[
        "Los transformers son la arquitectura dominante en NLP.",
        "Ollama permite ejecutar LLMs en local sin coste por token.",
        "La cuantización reduce el tamaño del modelo con pérdida mínima de calidad.",
        "RAG combina recuperación de documentos con generación de texto.",
        "El fine-tuning adapta un modelo a un dominio específico.",
    ],
    ids=["doc1", "doc2", "doc3", "doc4", "doc5"]
)

# Consulta semántica
resultados = collection.query(
    query_texts=["¿Cómo ejecuto un modelo de IA en mi ordenador?"],
    n_results=2
)

for doc, dist in zip(resultados["documents"][0], resultados["distances"][0]):
    print(f"[{dist:.3f}] {doc}")
```

**Resultado:**

```
[0.312] Ollama permite ejecutar LLMs en local sin coste por token.
[0.489] La cuantización reduce el tamaño del modelo con pérdida mínima de calidad.
```

**Qué aprender:** ChromaDB genera los embeddings internamente y devuelve distancias (menor = más similar). Sin escribir una sola línea de código de vectorización, ya tienes búsqueda semántica funcional. Para proyectos pequeños y prototipos es más que suficiente.

## Referencias

- [ChromaDB — Documentación](https://docs.trychroma.com)
- [ChromaDB — GitHub](https://github.com/chroma-core/chroma)
- [Notas: ChromaDB](/docs/tools/vector-databases/chromadb)
