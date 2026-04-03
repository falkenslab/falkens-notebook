---
sidebar_position: 4
---

# Modelos de embeddings

Los modelos de embeddings transforman texto (o imágenes) en vectores numéricos que capturan su significado semántico. Son el componente central de sistemas RAG, búsqueda semántica y recomendaciones.

A diferencia de los LLMs, los modelos de embeddings no generan texto: su única función es producir una representación numérica compacta y comparable de cualquier entrada.

---

## Cómo funcionan

Dado un texto, el modelo produce un vector de N dimensiones (típicamente entre 768 y 3072). Textos con significado similar tienen vectores cercanos en el espacio vectorial, lo que permite medir similitud con el **coseno** o la **distancia euclidiana**.

```
"El gato duerme en el sofá"  →  [0.12, -0.45, 0.83, ...]
"Un felino descansa en el mueble"  →  [0.11, -0.43, 0.81, ...]  ← muy similar
"La bolsa subió un 2% hoy"  →  [-0.67, 0.21, -0.34, ...]  ← muy diferente
```

---

## Modelos comerciales (API)

### OpenAI — text-embedding-3

La familia más usada en producción. Disponible en dos variantes:

| Modelo | Dimensiones | Contexto | Coste |
|---|---|---|---|
| `text-embedding-3-small` | 1536 | 8191 tokens | Muy bajo |
| `text-embedding-3-large` | 3072 | 8191 tokens | Bajo |

`text-embedding-3-small` es la opción por defecto para la mayoría de casos RAG por su equilibrio entre calidad y coste.

```python
from openai import OpenAI

client = OpenAI()
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="texto a vectorizar"
)
vector = response.data[0].embedding
```

### Cohere — Embed v3

Modelo de embeddings multilingüe de alta calidad. Especialmente bueno para búsqueda en múltiples idiomas.

- **Modelo**: `embed-multilingual-v3.0`
- **Dimensiones**: 1024
- **Ventaja**: soporte nativo para más de 100 idiomas, incluyendo español

### Voyage AI

Modelos de embeddings especializados por dominio: `voyage-code-2` para código, `voyage-law-2` para documentos legales, `voyage-finance-2` para finanzas.

---

## Modelos open source (ejecutables en local)

### nomic-embed-text

El más popular para uso local con Ollama. Buen rendimiento general con tamaño reducido.

```bash
ollama pull nomic-embed-text
```

```python
import ollama

result = ollama.embeddings(
    model="nomic-embed-text",
    prompt="texto a vectorizar"
)
vector = result["embedding"]  # 768 dimensiones
```

### mxbai-embed-large

Mejor calidad que nomic-embed-text, a costa de ser algo más lento.

```bash
ollama pull mxbai-embed-large
```

### BGE (BAAI General Embedding)

Familia de modelos del Beijing Academy of AI. Muy usados en aplicaciones RAG de producción.

| Modelo | Dimensiones | Perfil |
|---|---|---|
| `bge-small-en-v1.5` | 384 | Muy rápido, bajo consumo |
| `bge-base-en-v1.5` | 768 | Equilibrado |
| `bge-large-en-v1.5` | 1024 | Máxima calidad |
| `bge-m3` | 1024 | Multilingüe, recomendado para español |

```bash
ollama pull bge-m3
```

### all-MiniLM-L6-v2

Modelo ligero y rápido de la librería `sentence-transformers`. Muy usado en prototipos y aplicaciones con recursos limitados.

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")
vector = model.encode("texto a vectorizar")
```

---

## Cómo elegir un modelo de embeddings

| Criterio | Recomendación |
|---|---|
| Producción en la nube, idioma inglés | `text-embedding-3-small` (OpenAI) |
| Producción multilingüe (con español) | `embed-multilingual-v3.0` (Cohere) o `bge-m3` |
| Local, uso general | `nomic-embed-text` o `mxbai-embed-large` |
| Local, máximo rendimiento multilingüe | `bge-m3` |
| Prototipo rápido | `all-MiniLM-L6-v2` |
| Dominio especializado (código, legal...) | Voyage AI domain-specific |

:::tip
El modelo de embeddings debe mantenerse constante durante toda la vida del índice vectorial. Si cambias de modelo, tienes que re-vectorizar todos los documentos, ya que los vectores de distintos modelos no son comparables entre sí.
:::

---

## Embeddings en un pipeline RAG

```
Documentos
    ↓
Chunking (dividir en fragmentos)
    ↓
Modelo de embeddings → Vectores
    ↓
Base de datos vectorial (FAISS, Qdrant, pgvector...)
    ↓
[en tiempo de consulta]
Pregunta del usuario → Embedding de la pregunta
    ↓
Búsqueda por similitud → Top-K fragmentos relevantes
    ↓  [opcional: reranking]
LLM + contexto recuperado → Respuesta final
```

Ver también: [Conceptos: Embeddings](../basics/glossary#embeddings), [Conceptos: RAG](../basics/glossary#rag), [Herramientas: Bases de datos vectoriales](../tools/vector-databases).
