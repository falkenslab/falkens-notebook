---
sidebar_position: 1
---

# Interfaces y entornos para LLMs

Más allá de la API, existe un ecosistema rico de herramientas con interfaz gráfica o de línea de comandos para trabajar con modelos de lenguaje en local o conectados a proveedores en la nube.

## Ollama

La forma más sencilla de ejecutar modelos en local. Gestiona la descarga, cuantización y ejecución de modelos a través de una CLI y una API REST compatible con OpenAI.

```bash
ollama pull llama3.2
ollama run llama3.2
```

Ver la [guía completa de Ollama](../../blog/ollama).

## Open WebUI

La interfaz web más popular para Ollama (más de 65 000 estrellas en GitHub). Ofrece una experiencia similar a ChatGPT pero completamente en local.

**Características principales:**

- Historial de conversaciones, cambio de modelo en tiempo real
- Subida de documentos para Q&A (RAG integrado con 9 backends vectoriales: ChromaDB, Qdrant, pgvector, Pinecone, Milvus, Elasticsearch...)
- Generación de imágenes, acceso multiusuario con roles y permisos
- Constructor de modelos personalizados sobre modelos base de Ollama

**Instalación con Docker:**

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

## LM Studio

Aplicación de escritorio (macOS, Windows, Linux) para descargar y ejecutar modelos GGUF con una interfaz cuidada. Incluye explorador de modelos (más de 1000 disponibles), chat, y servidor local compatible con la API de OpenAI.

**Características destacadas:**

- Chat con documentos locales (RAG integrado — LocalDocs)
- Servidor local con API compatible con OpenAI (`localhost:1234`)
- SDKs para Python y JavaScript
- **LM Link** (2026): conexión cifrada a instancias remotas de LM Studio
- Exportación de conversaciones a PDF, Markdown o texto plano

**Rendimiento orientativo:**

| Hardware | Modelo (Q5_K_M) | Tokens/s |
|---|---|---|
| M1 MacBook | 7B | ~15–20 |
| M2/M3 MacBook | 7B | ~30–50 |
| RTX 4090 | 7B | >100 |

## Jan

Alternativa open source a ChatGPT que funciona 100% offline. Interfaz limpia con hub de modelos integrado (GGUF desde HuggingFace) y soporte para proveedores cloud (OpenAI, Anthropic, Groq...).

- API local compatible con OpenAI en `localhost:1337`
- Integración con MCP (Model Context Protocol) para capacidades agénticas
- Motor basado en llama.cpp (CPU) y TensorRT-LLM (GPU NVIDIA)
- **Jan Server**: versión para equipos con autenticación OAuth/OIDC, observabilidad OpenTelemetry y orquestación de herramientas

## Msty

Aplicación de escritorio todo-en-uno (Windows, Mac, Linux) orientada a productividad.

**Lo que lo diferencia:**

- **Knowledge Stack**: conecta con PDFs, transcripciones de YouTube, bóvedas de Obsidian
- **Parallel Multiverse Chats**: compara respuestas de varios modelos en paralelo lado a lado
- Soporta modelos locales (Llama, Mistral, DeepSeek...) y APIs cloud (GPT-4, Claude, Gemini)
- Plan gratuito permanente para uso en escritorio

## llamafile (Mozilla)

Empaqueta un modelo completo en un único ejecutable portable que corre en cualquier sistema operativo sin instalación previa. Especialmente útil para distribuir demostraciones o herramientas que no requieren dependencias externas.

```bash
# Descargar y ejecutar directamente (ejemplo con Qwen3.5 0.8B)
wget https://huggingface.co/.../qwen3.5-0.8b.llamafile
chmod +x qwen3.5-0.8b.llamafile
./qwen3.5-0.8b.llamafile
```

La versión 0.10.0 (marzo 2026) incluye soporte para GPU (Metal en macOS, CUDA en NVIDIA), reconocimiento de voz con Whisper, modelos multimodales y tool calling.

## AnythingLLM

Aplicación todo-en-uno orientada a privacidad con valores por defecto listos para usar sin configuración.

- Soporta todos los proveedores principales: Ollama, LM Studio, OpenAI, Anthropic, Azure, Gemini, Groq...
- Procesamiento de documentos: PDF, DOCX, CSV, XLSX, PPTX, HTML, código fuente, audio (Whisper)
- Agentes integrados, soporte multiusuario
- Motor LLM embebido + embeddings por CPU + LanceDB integrados en la versión de escritorio

## Chatbot Arena (LMSYS)

Plataforma de evaluación colaborativa de modelos. Los usuarios comparan respuestas de dos modelos en ciego (sin saber cuál es cuál) y votan la mejor. Con más de 5,4 millones de votos recopilados, es la referencia más representativa de preferencia humana real.

Categorías especializadas: codificación, prompts difíciles, flujos agénticos (tool calling, navegación web, ejecución de código).

- Web: [chat.lmsys.org](https://chat.lmsys.org)

## Comparativa rápida

| Herramienta | Tipo | Modelos locales | Cloud APIs | RAG integrado | Mejor para |
|---|---|---|---|---|---|
| **Ollama** | CLI + API | Sí | No | No | Desarrolladores, scripting |
| **Open WebUI** | Web | Sí (vía Ollama) | Sí | Sí | Uso diario, equipos |
| **LM Studio** | Desktop | Sí | No | Sí | Explorar modelos, API local |
| **Jan** | Desktop | Sí | Sí | No | Uso offline, privacidad |
| **Msty** | Desktop | Sí | Sí | Sí | Comparar modelos, productividad |
| **llamafile** | Ejecutable | Sí | No | No | Demos portables, sin instalación |
| **AnythingLLM** | Desktop/Web | Sí | Sí | Sí | Equipos, documentos corporativos |

## Referencias

- [Open WebUI — Documentación](https://docs.openwebui.com)
- [Open WebUI — GitHub](https://github.com/open-webui/open-webui)
- [LM Studio — Sitio oficial](https://lmstudio.ai)
- [Jan.ai — Documentación](https://www.jan.ai/docs)
- [Msty — Sitio oficial](https://msty.ai)
- [llamafile — GitHub (Mozilla)](https://github.com/mozilla-oai/llamafile)
- [AnythingLLM — Documentación](https://docs.anythingllm.com)
- [Chatbot Arena — Leaderboard](https://chat.lmsys.org)
- [Guía de Ollama](../../blog/ollama)
