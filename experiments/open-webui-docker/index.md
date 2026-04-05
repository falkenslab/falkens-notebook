---
date: 2026-04-05
slug: open-webui-docker
title: Levantar Open WebUI con Ollama en un comando
tags: [Open-WebUI, Ollama, Docker]
---

Tener un ChatGPT local completo con Ollama integrado usando un solo comando Docker.

<!-- truncate -->

## Experimento: levantar Open WebUI con Ollama en un comando

**Contexto:** la imagen `ollama` de Open WebUI incluye Ollama, por lo que no hace falta tenerlo instalado previamente.

```bash
docker run -d -p 8080:8080 \
  -v ollama:/root/.ollama \
  -v open-webui:/app/backend/data \
  ghcr.io/open-webui/open-webui:ollama
```

**Resultado:**
```
Unable to find image 'ghcr.io/open-webui/open-webui:ollama' locally
ollama: Pulling from open-webui/open-webui
...
Status: Downloaded newer image for ghcr.io/open-webui/open-webui:ollama
a3f1c2d8e9b0...
```

Abre `http://localhost:8080`, crea una cuenta de administrador y ya puedes descargar modelos desde la interfaz.

**Qué aprender:** con un solo comando tienes un ChatGPT local completo. El volumen `ollama` persiste los modelos entre reinicios del contenedor.

## Referencias

- [Open WebUI — Documentación](https://docs.openwebui.com)
- [Open WebUI — GitHub](https://github.com/open-webui/open-webui)
- [Notas: Open WebUI](/docs/tools/llm-runtimes/open-webui/overview)
