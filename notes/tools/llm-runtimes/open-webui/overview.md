---
sidebar_position: 1
---

# Open WebUI

La interfaz web más popular para Ollama (más de 65 000 estrellas en GitHub). Ofrece una experiencia similar a ChatGPT pero completamente en local.

## Características principales

- Historial de conversaciones, cambio de modelo en tiempo real
- Subida de documentos para Q&A (RAG integrado con 9 backends vectoriales: ChromaDB, Qdrant, pgvector, Pinecone, Milvus, Elasticsearch...)
- Generación de imágenes, acceso multiusuario con roles y permisos
- Constructor de modelos personalizados sobre modelos base de Ollama

## Instalación con Docker

```bash
docker run -d -p 8080:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  ghcr.io/open-webui/open-webui:latest
```

Abre `http://localhost:8080` en el navegador. Detecta automáticamente Ollama en `localhost:11434`.

Para instalarlo con Ollama integrado en el mismo contenedor:

```bash
docker run -d -p 8080:8080 \
  -v ollama:/root/.ollama \
  -v open-webui:/app/backend/data \
  ghcr.io/open-webui/open-webui:ollama
```

Ver el experimento: [Levantar Open WebUI con Ollama en un comando](/experiments/open-webui-docker)

## Referencias

- [Open WebUI — Documentación](https://docs.openwebui.com)
- [Open WebUI — GitHub](https://github.com/open-webui/open-webui)
- [Ollama](/docs/tools/llm-runtimes/ollama/instalacion)
