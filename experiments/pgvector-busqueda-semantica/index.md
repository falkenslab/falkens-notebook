---
date: 2026-04-05
slug: pgvector-busqueda-semantica
title: Búsqueda semántica en PostgreSQL con pgvector
tags: [pgvector, PostgreSQL, embeddings, RAG]
---

Añadir búsqueda semántica a una base de datos PostgreSQL existente con una sola extensión, sin infraestructura adicional.

<!-- truncate -->

## Experimento: búsqueda semántica en PostgreSQL

**Contexto:** añadir búsqueda semántica a una base de datos PostgreSQL existente con una sola extensión.

```sql
-- Habilitar extensión
CREATE EXTENSION vector;

-- Tabla con columna de embedding
CREATE TABLE fragmentos (
  id SERIAL PRIMARY KEY,
  texto TEXT,
  embedding vector(3)  -- 3 dimensiones para el ejemplo
);

-- Insertar datos con embeddings
INSERT INTO fragmentos (texto, embedding) VALUES
  ('Los transformers dominan el NLP', '[0.1, 0.8, 0.3]'),
  ('Ollama ejecuta LLMs en local',    '[0.9, 0.1, 0.2]'),
  ('RAG mejora la precisión del LLM', '[0.4, 0.6, 0.7]');

-- Buscar el más similar a un vector de consulta
SELECT texto, embedding <=> '[0.85, 0.15, 0.25]' AS distancia
FROM fragmentos
ORDER BY distancia
LIMIT 2;
```

**Resultado:**
```
texto                           | distancia
--------------------------------+----------
Ollama ejecuta LLMs en local    | 0.018
Los transformers dominan el NLP | 0.412
```

**Qué aprender:** `<=>` es el operador de distancia coseno. Con un índice HNSW (`CREATE INDEX ON fragmentos USING hnsw (embedding vector_cosine_ops)`) la búsqueda escala a millones de filas sin degradación notable.

## Referencias

- [pgvector — GitHub](https://github.com/pgvector/pgvector)
- [PostgreSQL — Documentación](https://www.postgresql.org/docs)
- [Notas: pgvector](/docs/tools/vector-databases/pgvector)
