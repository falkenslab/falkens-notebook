---
sidebar_position: 4
---

# Qdrant

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

## Puntos fuertes

- Motor de almacenamiento propio de baja latencia
- Indexación HNSW acelerada por GPU
- Quantización 1.5-bit, 2-bit y 4-bit para reducir uso de memoria
- Búsqueda híbrida (vectorial + texto completo)
- Filtrado por metadatos sin degradación de velocidad
- Multitenancy, SSO, RBAC, soporte Terraform (edición enterprise)

**Cuándo usarlo:** producción autoalojada con requisitos de rendimiento y seguridad.

## Referencias

- [Qdrant — Documentación](https://qdrant.tech/documentation)
- [Qdrant — GitHub](https://github.com/qdrant/qdrant)
