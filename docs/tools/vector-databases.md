---
sidebar_position: 2
---

# Bases de datos vectoriales

Las bases de datos vectoriales almacenan y permiten buscar vectores (embeddings) por similitud semántica. Son el componente de almacenamiento central en sistemas [RAG](../basics/glossary#rag), búsqueda semántica y recomendaciones.

A diferencia de una base de datos relacional (que busca coincidencias exactas), una base de datos vectorial busca los vectores más *cercanos* al vector de consulta según una métrica de distancia (coseno, euclidiana...).

## ChromaDB

La opción más sencilla para prototipos y proyectos pequeños. Cero configuración, API intuitiva, rendimiento suficiente para millones de embeddings en un servidor modesto.

```bash
pip install chromadb
```

```python
import chromadb

client = chromadb.Client()
collection = client.create_collection("docs")

collection.add(
    documents=["El gato duerme", "La bolsa subió un 2%"],
    ids=["doc1", "doc2"]
)

results = collection.query(query_texts=["animales domésticos"], n_results=1)
```

**Puntos fuertes:**
- Embedded (sin servidor) o en modo cliente-servidor
- Búsqueda híbrida: vectorial + BM25 (texto completo) + filtros de metadatos
- SDKs en Python, JavaScript/TypeScript, Rust, Java, PHP
- Integrado por defecto en Open WebUI

**Cuándo usarlo:** prototipado rápido, proyectos con < 10M vectores, equipos pequeños.

## FAISS (Meta)

Librería de búsqueda de similitud de alta performance, usada por Meta en producción a escala de miles de millones de vectores. No es una base de datos completa: no tiene persistencia nativa, APIs web ni gestión de metadatos.

```bash
pip install faiss-cpu   # o faiss-gpu para GPU NVIDIA
```

```python
import faiss
import numpy as np

d = 768  # dimensión de los embeddings
index = faiss.IndexFlatL2(d)

vectors = np.random.rand(1000, d).astype("float32")
index.add(vectors)

query = np.random.rand(1, d).astype("float32")
distances, indices = index.search(query, k=5)
```

**Puntos fuertes:** velocidad extrema (8x más rápido que alternativas anteriores), soporte GPU, múltiples métodos de indexación (Flat, IVF, HNSW, PQ...).

**Limitaciones:** sin persistencia nativa, sin metadatos ricos, requiere código propio para todo lo que no sea la búsqueda en sí.

**Cuándo usarlo:** cuando el rendimiento es la única prioridad y construyes tu propia infraestructura.

## Qdrant

Base de datos vectorial open source de alto rendimiento, escrita en Rust. Referencia para despliegues en producción autoalojados. Recibió 50M$ de inversión en marzo de 2026.

```bash
docker run -p 6333:6333 qdrant/qdrant
```

```python
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

client = QdrantClient("localhost", port=6333)

client.create_collection(
    collection_name="docs",
    vectors_config=VectorParams(size=768, distance=Distance.COSINE)
)

client.upsert(
    collection_name="docs",
    points=[PointStruct(id=1, vector=[...], payload={"texto": "El gato duerme"})]
)

results = client.search(collection_name="docs", query_vector=[...], limit=5)
```

**Puntos fuertes:**
- Motor de almacenamiento propio de baja latencia
- Indexación HNSW acelerada por GPU
- Quantización 1.5-bit, 2-bit y 4-bit para reducir uso de memoria
- Búsqueda híbrida (vectorial + texto completo)
- Multitenancy, SSO, RBAC, soporte Terraform (edición enterprise)
- Filtrado por metadatos sin degradación de velocidad

**Cuándo usarlo:** producción autoalojada con requisitos de rendimiento y seguridad.

## Weaviate

Base de datos vectorial que almacena tanto objetos como sus vectores de forma nativa. Destaca por la búsqueda híbrida y las integraciones directas con modelos de embeddings.

**Puntos fuertes:**
- Vectorización automática en la importación (integración con OpenAI, Cohere, HuggingFace)
- Búsqueda híbrida: vectorial + BM25
- Agentes IA para consultar y enriquecer datos
- Disponible self-hosted o como servicio gestionado (Weaviate Cloud)
- Filtrado avanzado con datos estructurados

**Cuándo usarlo:** cuando necesitas búsqueda híbrida potente o vectorización automática sin código adicional.

## Milvus

Sistema distribuido de búsqueda vectorial diseñado para escala masiva. La versión 2.6 añade funciones de usuario (UDF), sharding dinámico y una capa de Vector Lake. La versión 3.0 (prevista para finales de 2026) incorporará soporte nativo para datos multimodales (ColBERT, vídeo, geo) y tipos de datos unificados.

**Cuándo usarlo:** grandes volúmenes de datos (>100M vectores) en infraestructura distribuida.

## pgvector

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

**Cuándo usarlo:** si ya tienes PostgreSQL y esperas menos de 20–30M vectores. Elimina la necesidad de mantener un sistema adicional.

## Pinecone

Base de datos vectorial como servicio gestionado (serverless). Escala automáticamente, incluyendo a cero cuando no hay tráfico. Latencia sub-100ms en datasets de miles de millones de vectores sin necesidad de gestión de infraestructura.

**Cuándo usarlo:** organizaciones que priorizan cero operaciones sobre el coste; proyectos cloud-native.

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

- [ChromaDB — Documentación](https://docs.trychroma.com)
- [FAISS — Meta AI](https://faiss.ai)
- [Qdrant — Documentación](https://qdrant.tech/documentation)
- [Weaviate — Documentación](https://weaviate.io/developers/weaviate)
- [Milvus — Documentación](https://milvus.io/docs)
- [pgvector — GitHub](https://github.com/pgvector/pgvector)
- [Pinecone — Documentación](https://docs.pinecone.io)
- [Conceptos: RAG](../basics/glossary#rag)
- [Conceptos: Embeddings](../basics/glossary#embeddings)
- [Modelos de embeddings](../models/embeddings)
