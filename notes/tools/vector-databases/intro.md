---
sidebar_position: 1
---

# Bases de datos vectoriales

Las bases de datos vectoriales almacenan y permiten buscar vectores (embeddings) por similitud semántica. Son el componente de almacenamiento central en sistemas [RAG](/docs/glossary#rag), búsqueda semántica y recomendaciones.

A diferencia de una base de datos relacional (que busca coincidencias exactas), una base de datos vectorial busca los vectores más *cercanos* al vector de consulta según una métrica de distancia (coseno, euclidiana...).

## Comparativa

| Base de datos | Tipo | Escala | Búsqueda híbrida | Destacado |
|---|---|---|---|---|
| **ChromaDB** | Open source | Millones | Sí | Prototipado rápido |
| **FAISS** | Librería | Miles de millones | No | Velocidad máxima |
| **Qdrant** | Open source | Cientos de millones | Sí | Producción autoalojada |
| **Weaviate** | Open source / Cloud | Cientos de millones | Sí | Vectorización automática |
| **Milvus** | Open source | Miles de millones | Sí | Escala distribuida |
| **pgvector** | Extensión PostgreSQL | Decenas de millones | Parcial | Integración PostgreSQL |
| **Pinecone** | SaaS gestionado | Miles de millones | Sí | Zero-ops, cloud |

:::tip
La elección de la base de datos vectorial representa solo el 5–10% de la calidad de un sistema RAG. La estrategia de chunking, el modelo de embeddings y el pipeline de recuperación tienen mucho más impacto.
:::

## Referencias

- [Conceptos: RAG](/docs/glossary#rag)
- [Conceptos: Embeddings](/docs/glossary#embeddings)
- [Modelos de embeddings](/docs/models/embeddings)
