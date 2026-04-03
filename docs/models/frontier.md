---
sidebar_position: 2
---

# Modelos comerciales (frontier)

Los modelos frontier son los de mayor capacidad disponibles en cada momento. Se acceden a través de una API y sus pesos no son públicos. Son la opción natural cuando se necesita la máxima calidad o cuando la tarea es compleja.

## OpenAI

### GPT-5.4

El modelo flagship actual de OpenAI. Ofrece razonamiento avanzado en código, matemáticas, ciencia y percepción visual, con un 33% menos de errores respecto a generaciones anteriores.

- **Ventana de contexto**: 1M tokens
- **Puntos fuertes**: razonamiento, código, análisis de imágenes, control de ordenador nativo
- **Multimodal**: sí (texto, imágenes)
- **API**: `gpt-5.4`, `gpt-5.4-pro`, `gpt-5.4-thinking` (variante de razonamiento), `gpt-5.4-nano` (variante ligera)

### o3 / o4-mini

Familia de modelos especializados en razonamiento. Antes de responder, el modelo dedica tiempo adicional a "pensar" internamente, lo que mejora notablemente los resultados en matemáticas, lógica y ciencia.

- **Cuándo usarlos**: problemas de lógica compleja, matemáticas avanzadas, código difícil de depurar
- **API**: `o3`, `o4-mini`

## Anthropic

### Claude Opus 4.6

El modelo más capaz de Anthropic. Modelo de razonamiento híbrido optimizado para agentes de IA, uso de ordenador (computer use), razonamiento en contextos largos y planificación.

- **Ventana de contexto**: 1M tokens
- **Salida máxima**: 128K tokens
- **Puntos fuertes**: agentes de IA, código, razonamiento en documentos largos, tareas de diseño y conocimiento
- **Multimodal**: sí — hasta 600 imágenes o páginas de PDF por prompt
- **API**: `claude-opus-4-6`

### Claude Sonnet 4.6

La variante equilibrada de la familia Claude 4.6. Misma ventana de contexto que Opus con menor latencia.

- **Ventana de contexto**: 1M tokens
- **Salida máxima**: 64K tokens
- **Multimodal**: sí
- **API**: `claude-sonnet-4-6`

:::tip
La ventana de contexto de 1M tokens de Claude permite analizar codebases completos, contratos extensos o conversaciones muy largas en una sola llamada.
:::

## Google

### Gemini 3.1 Pro

El modelo flagship más reciente de Google (febrero 2026). Mejora sustancial de razonamiento respecto a la generación 2.x, líder en varios benchmarks públicos.

- **Ventana de contexto**: 1M tokens
- **Salida máxima**: 64K tokens
- **Multimodal**: sí — texto, audio, imágenes, vídeo, repositorios de código
  - Hasta 900 imágenes por prompt
  - Hasta 8,4 horas de audio
  - Hasta 1 hora de vídeo
  - PDFs de hasta 900 páginas
- **API**: `gemini-3.1-pro`

### Gemini 2.5 Pro / Flash

Generación anterior, aún disponible y en uso en producción por su estabilidad.

- **Gemini 2.5 Pro**: buen equilibrio entre capacidad, contexto y velocidad
- **Gemini 2.5 Flash**: optimizado para velocidad en tareas de resumen, extracción de datos y análisis de documentos

## xAI — Grok

Familia de modelos de xAI integrada con la plataforma X (Twitter). Su ventaja diferencial es el acceso nativo a datos en tiempo real: procesa ~500M de posts diarios de X y realiza búsquedas web de forma nativa.

### Grok 4.20

El modelo más avanzado de xAI (marzo 2026). Usa una arquitectura multi-agente (cuatro agentes colaborando) para descomponer tareas complejas.

- **Ventana de contexto**: hasta 2M tokens (la mayor disponible entre los modelos frontier)
- **Precisión de recuperación**: >95% a lo largo de toda la ventana de contexto
- **Puntos fuertes**: datos en tiempo real, contexto ultra-largo, codificación, razonamiento
- **Multimodal**: sí — texto, imágenes, generación de vídeo
- **API**: `grok-4.20`, `grok-4.20-reasoning`

### Grok 4.1

Variante disponible para todos los usuarios. Ventana de contexto de 256K tokens con menor latencia.

:::tip
Grok es el único modelo frontier con acceso nativo a X/Twitter en tiempo real, lo que lo hace especialmente útil para análisis de tendencias o tareas que requieren información muy reciente.
:::

## Meta (a través de API de terceros)

Los modelos Llama de Meta son open weights pero se ofrecen también a través de APIs de proveedores como Together AI, Groq o AWS Bedrock.

- **Llama 4 Maverick**: multimodal, arquitectura MoE, calidad comparable a modelos frontier
- **Proveedores**: Groq (muy rápido), Together AI, AWS Bedrock, Azure

## Resumen comparativo

| Modelo                 | Empresa   | Contexto | Multimodal | Mejor para                                 |
| ---------------------- | --------- | -------- | ---------- | ------------------------------------------ |
| GPT-5.4                | OpenAI    | 1M       | Sí         | Razonamiento, código, uso general          |
| o3 / o4-mini           | OpenAI    | 200K     | No         | Lógica compleja, matemáticas               |
| Claude Opus 4.6        | Anthropic | 1M       | Sí         | Agentes, documentos largos, código         |
| Claude Sonnet 4.6      | Anthropic | 1M       | Sí         | Equilibrio velocidad/calidad               |
| Gemini 3.1 Pro         | Google    | 1M       | Sí         | Vídeo, audio, multimodal avanzado          |
| Gemini 2.5 Flash       | Google    | 1M       | Sí         | Velocidad, extracción de datos             |
| Grok 4.20              | xAI       | 2M       | Sí         | Contexto ultra-largo, datos en tiempo real |
| Grok 4.1               | xAI       | 256K     | Sí         | Velocidad, integración con X               |
| Llama 4 Maverick (API) | Meta      | 128K     | Sí         | Alternativa open weights vía API           |

## Cómo acceder

Cada proveedor tiene su propia API y consola:

- **OpenAI**: [platform.openai.com](https://platform.openai.com)
- **Anthropic**: [console.anthropic.com](https://console.anthropic.com)
- **Google**: [aistudio.google.com](https://aistudio.google.com) o Google Cloud Vertex AI
- **xAI (Grok)**: [x.ai/api](https://x.ai/api)
- **Groq** (Llama rápido): [console.groq.com](https://console.groq.com)

## Referencias

- [OpenAI — Modelos](https://platform.openai.com/docs/models)
- [Anthropic — Modelos Claude](https://docs.anthropic.com/es/docs/about-claude/models/overview)
- [Google — Gemini en AI Studio](https://aistudio.google.com)
- [xAI — Modelos Grok](https://docs.x.ai/developers/models)
- [Chatbot Arena — Leaderboard](https://chat.lmsys.org)
- [Panorama de modelos](./overview)
- [Modelos open source](./open-source)
