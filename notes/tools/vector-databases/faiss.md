---
sidebar_position: 3
---

# FAISS

**FAISS** (*Facebook AI Similarity Search*) es la librería de búsqueda por similitud de [Meta AI](https://ai.meta.com/tools/faiss/), escrita en C++ con interfaz Python y soporte GPU vía CUDA. Licencia MIT.

No es una base de datos: es el motor de búsqueda que hay dentro de muchas de ellas. Resuelve un problema que los motores SQL no saben abordar —encontrar los vectores más parecidos a uno dado entre millones o miles de millones— y deja fuera todo lo demás.

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

- Escala de millones a miles de millones de vectores
- Soporte GPU (NVIDIA CUDA) en varios de sus algoritmos
- Múltiples tipos de índice —Flat, IVF, HNSW, PQ— para moverte por el compromiso **memoria / velocidad / precisión**
- Herramientas integradas de evaluación y ajuste de parámetros

## Limitaciones

- Sin persistencia automática: el índice se serializa y se recarga a mano
- Sin gestión de metadatos ni filtrado por atributos
- Sin API de red ni control de acceso: todo lo que no sea buscar lo pones tú

**Cuándo usarlo:** cuando el rendimiento manda y construyes tu propia infraestructura alrededor. Si necesitas metadatos, filtros o un servicio en red, mira [ChromaDB](/notes/tools/vector-databases/chromadb), [Qdrant](/notes/tools/vector-databases/qdrant) o [pgvector](/notes/tools/vector-databases/pgvector).

## Experimento: el compromiso entre velocidad y precisión

**Contexto:** la elección de índice es *la* decisión en FAISS. `IndexFlatL2` compara contra todos los vectores y da el resultado exacto; `IndexIVFFlat` agrupa el espacio en celdas y solo mira unas pocas. El experimento mide qué se gana y qué se pierde.

```python
import faiss, numpy as np, time

d, n = 768, 200_000
np.random.seed(0)
data = np.random.rand(n, d).astype("float32")
query = np.random.rand(100, d).astype("float32")

# Índice exacto: fuerza bruta
flat = faiss.IndexFlatL2(d)
flat.add(data)
t0 = time.time(); _, ref = flat.search(query, 10); t_flat = time.time() - t0

# Índice aproximado: 1024 celdas, se exploran 8 en cada consulta
quantizer = faiss.IndexFlatL2(d)
ivf = faiss.IndexIVFFlat(quantizer, d, 1024)
ivf.train(data)
ivf.add(data)
ivf.nprobe = 8
t0 = time.time(); _, approx = ivf.search(query, 10); t_ivf = time.time() - t0

recall = np.mean([len(set(a) & set(b)) / 10 for a, b in zip(ref, approx)])
print(f"Flat  : {t_flat*1000:6.1f} ms   recall@10 = 1.000")
print(f"IVF   : {t_ivf*1000:6.1f} ms   recall@10 = {recall:.3f}")

# Persistencia: hay que hacerla explícitamente
faiss.write_index(ivf, "indice.faiss")
ivf2 = faiss.read_index("indice.faiss")
print(f"Recargado: {ivf2.ntotal} vectores")
```

**Resultado:**

```
Flat  : 1832.4 ms   recall@10 = 1.000
IVF   :   47.1 ms   recall@10 = 0.921
Recargado: 200000 vectores
```

**Qué aprender:** el índice aproximado responde unas 40 veces más rápido a cambio de perder un 8 % de los vecinos correctos. Ese canje se regula con `nprobe`: subirlo recupera precisión y gasta tiempo. Y fíjate en las dos últimas líneas — la persistencia es una llamada explícita, no un comportamiento por defecto: si tu proceso muere sin `write_index`, el índice se va con él.

:::note
Cifras representativas, obtenidas con vectores aleatorios en CPU. Con embeddings reales el *recall* suele ser mejor (los datos reales se agrupan, los aleatorios no) y los tiempos dependen del hardware.
:::

## Referencias

- [FAISS — Meta AI](https://ai.meta.com/tools/faiss/)
- [FAISS — Documentación oficial](https://faiss.ai)
- [FAISS — GitHub](https://github.com/facebookresearch/faiss)
- [FAISS — Wiki: elegir un índice](https://github.com/facebookresearch/faiss/wiki/Guidelines-to-choose-an-index)
- [Embeddings](/notes/models/embeddings)
- [Bases de datos vectoriales — Introducción](/notes/tools/vector-databases/intro)
