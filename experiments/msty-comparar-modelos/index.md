---
date: 2026-04-05
slug: msty-comparar-modelos
title: Comparar modelos en paralelo con Msty
tags: [Msty, comparativa, LLM]
---

Enviar el mismo prompt a varios modelos simultáneamente y ver las respuestas lado a lado antes de elegir cuál usar.

<!-- truncate -->

## Experimento: comparar modelos con Parallel Multiverse Chats

**Contexto:** antes de decidir qué modelo usar para una tarea, Msty permite compararlos en paralelo con el mismo prompt.

```
Prompt enviado a llama3.2 (local) y gpt-4o (cloud) simultáneamente:

"Explica la diferencia entre RAG y fine-tuning en dos frases."
```

**Resultado (llama3.2):**
```
RAG recupera información externa en tiempo real para enriquecer el contexto del modelo.
Fine-tuning ajusta los pesos del modelo con datos específicos para cambiar su comportamiento de forma permanente.
```

**Resultado (gpt-4o):**
```
RAG (Retrieval-Augmented Generation) combina el modelo con una búsqueda dinámica en documentos externos,
sin modificar el modelo. El fine-tuning reentrana el modelo con datos propios, incorporando el conocimiento
directamente en sus pesos.
```

**Qué aprender:** las respuestas son similares en contenido pero distintas en estilo. Para comparaciones rápidas, Msty evita tener que alternar entre herramientas o cuentas.

## Referencias

- [Msty — Sitio oficial](https://msty.ai)
- [Notas: Msty](/docs/tools/llm-runtimes/msty/overview)
