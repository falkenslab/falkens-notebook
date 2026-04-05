---
sidebar_position: 1
---

# AnythingLLM

Aplicación todo-en-uno orientada a privacidad, lista para usar sin configuración. Disponible como aplicación de escritorio y como servidor autoalojado.

## Características principales

- Soporta todos los proveedores principales: Ollama, LM Studio, OpenAI, Anthropic, Azure, Gemini, Groq...
- Procesamiento de documentos: PDF, DOCX, CSV, XLSX, PPTX, HTML, código fuente, audio (Whisper)
- Agentes integrados con herramientas (búsqueda web, ejecución de código, navegación)
- Soporte multiusuario con roles y permisos
- Motor LLM embebido + embeddings por CPU + LanceDB integrados en la versión de escritorio (sin dependencias externas)

## Instalación

**Versión de escritorio** (recomendada para empezar):

Descarga el instalador desde [anythingllm.com](https://anythingllm.com/download) para macOS, Windows o Linux.

**Versión Docker** (para servidores o equipos):

```bash
docker pull mintplexlabs/anythingllm
docker run -d -p 3001:3001 \
  -v ${PWD}/anythingllm:/app/server/storage \
  mintplexlabs/anythingllm
```

Abre `http://localhost:3001`.

Ver el experimento: [RAG sobre documentos propios con AnythingLLM](/experiments/anythingllm-rag-documentos)

## Referencias

- [AnythingLLM — Sitio oficial](https://anythingllm.com)
- [AnythingLLM — Documentación](https://docs.anythingllm.com)
- [AnythingLLM — GitHub](https://github.com/Mintplex-Labs/anything-llm)
