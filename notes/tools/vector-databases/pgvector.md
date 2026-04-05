---
sidebar_position: 7
---

# pgvector

Extensión de PostgreSQL que añade tipos de datos vectoriales e índices HNSW e IVFFlat. Permite hacer búsqueda semántica directamente en una base de datos PostgreSQL existente, sin infraestructura adicional.

```sql
CREATE EXTENSION vector;

CREATE TABLE documentos (
  id SERIAL PRIMARY KEY,
  contenido TEXT,
  embedding vector(768)
);

-- Búsqueda de los 5 más similares
SELECT contenido
FROM documentos
ORDER BY embedding <=> '[0.1, 0.2, ...]'
LIMIT 5;
```

## Puntos fuertes

- Cero infraestructura adicional si ya usas PostgreSQL
- Índices HNSW e IVFFlat nativos
- Operadores de distancia: `<=>` (coseno), `<->` (euclidiana), `<#>` (producto interno)
- Compatible con todas las herramientas del ecosistema PostgreSQL (backups, réplicas, RLS...)

**Cuándo usarlo:** si ya tienes PostgreSQL y esperas menos de 20–30M vectores. Elimina la necesidad de mantener un sistema adicional.

Ver el experimento: [Búsqueda semántica en PostgreSQL con pgvector](/experiments/pgvector-busqueda-semantica)

## Referencias

- [pgvector — GitHub](https://github.com/pgvector/pgvector)
- [PostgreSQL — Documentación](https://www.postgresql.org/docs)
