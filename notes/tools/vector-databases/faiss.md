---
sidebar_position: 3
---

# FAISS

Librería de búsqueda de similitud de alta performance desarrollada por Meta, usada en producción a escala de miles de millones de vectores. No es una base de datos completa: no tiene persistencia nativa, APIs web ni gestión de metadatos.

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

## Puntos fuertes

- Velocidad extrema (8x más rápido que alternativas anteriores)
- Soporte GPU (NVIDIA CUDA)
- Múltiples métodos de indexación: Flat, IVF, HNSW, PQ...

## Limitaciones

- Sin persistencia nativa (hay que serializar/deserializar el índice manualmente)
- Sin gestión de metadatos
- Requiere código propio para todo lo que no sea la búsqueda en sí

**Cuándo usarlo:** cuando el rendimiento es la única prioridad y construyes tu propia infraestructura alrededor.

## Referencias

- [FAISS — Meta AI](https://faiss.ai)
- [FAISS — GitHub](https://github.com/facebookresearch/faiss)
