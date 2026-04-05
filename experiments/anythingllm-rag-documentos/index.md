---
date: 2026-04-05
slug: anythingllm-rag-documentos
title: RAG sobre documentos propios con AnythingLLM
tags: [AnythingLLM, RAG, Ollama]
---

Hacer preguntas sobre documentos privados sin enviarlos a servicios externos, usando AnythingLLM con Ollama como backend local.

<!-- truncate -->

## Experimento: crear un workspace con RAG sobre documentos propios

**Contexto:** AnythingLLM permite hacer preguntas sobre documentos privados sin enviarlos a servicios externos, usando Ollama como backend.

```
1. Instalar AnythingLLM (escritorio)
2. En Settings → LLM: seleccionar Ollama, modelo llama3.2
3. Crear un nuevo Workspace: "Proyecto"
4. Subir un PDF o documento de texto
5. Hacer una pregunta sobre el contenido
```

```
>>> ¿Cuál es el presupuesto total del proyecto según el documento?
Según el documento adjunto, el presupuesto total del proyecto asciende a 45.000 €,
distribuidos en tres fases: análisis (10.000 €), desarrollo (25.000 €) y despliegue (10.000 €).
```

**Qué aprender:** AnythingLLM vectoriza los documentos automáticamente al subirlos y los usa como contexto en cada pregunta. Todo ocurre en local con Ollama, sin enviar datos a ningún servidor externo.

## Referencias

- [AnythingLLM — Sitio oficial](https://anythingllm.com)
- [AnythingLLM — Documentación](https://docs.anythingllm.com)
- [Notas: AnythingLLM](/docs/tools/llm-runtimes/anythingllm/overview)
