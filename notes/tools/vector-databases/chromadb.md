---
sidebar_position: 2
---

# ChromaDB

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

## Puntos fuertes

- Embedded (sin servidor) o en modo cliente-servidor
- Búsqueda híbrida: vectorial + BM25 (texto completo) + filtros de metadatos
- SDKs en Python, JavaScript/TypeScript, Rust, Java, PHP
- Integrado por defecto en Open WebUI

**Cuándo usarlo:** prototipado rápido, proyectos con < 10M vectores, equipos pequeños.

Ver el experimento: [Búsqueda semántica con ChromaDB](/experiments/chromadb-busqueda-semantica)

## Referencias

- [ChromaDB — Documentación](https://docs.trychroma.com)
- [ChromaDB — GitHub](https://github.com/chroma-core/chroma)
