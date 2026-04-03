---
sidebar_position: 3
---

# Modelos open source y open weights

Los modelos open source (o *open weights*) son aquellos cuyos pesos se publican para descarga libre. Permiten ejecutarlos en local, modificarlos, hacer fine-tuning y desplegarlos sin coste por token.

:::note Tendencias en 2026
- La arquitectura **MoE** (Mixture of Experts) se ha convertido en el estándar para modelos grandes: activan solo una fracción de los parámetros por inferencia, reduciendo el coste computacional.
- Las **capacidades multimodales** (texto + imagen + audio) son ya habituales, incluso en modelos medianos.
- Los **modelos de razonamiento** (con "pensamiento" interno antes de responder) están proliferando como variantes especializadas.
- El open source ha alcanzado o superado a los modelos comerciales en muchas tareas.
:::

## Meta — Llama

La familia **Llama** es la más influyente del ecosistema open source. Muchos modelos de la comunidad parten de Llama como base.

### Llama 4

La generación más reciente (2025), con arquitectura multimodal nativa y MoE.

| Variante             | Arquitectura               | Contexto    | Perfil                                           |
| -------------------- | -------------------------- | ----------- | ------------------------------------------------ |
| **Llama 4 Scout**    | 17B activos / 16 expertos  | 10M tokens  | Contexto ultra-largo, eficiente                  |
| **Llama 4 Maverick** | 17B activos / 128 expertos | 128K tokens | Máxima calidad, supera GPT-4o y Gemini 2.0 Flash |

Llama 4 Scout es especialmente notable por su ventana de contexto de **10 millones de tokens**, la mayor disponible en cualquier modelo open weights.

### Llama 3.x

Aún ampliamente usados por su ecosistema maduro y disponibilidad en Ollama.

| Variante          | Parámetros | RAM (Q4) | Perfil                        |
| ----------------- | ---------- | -------- | ----------------------------- |
| Llama 3.2 1B / 3B | 1B – 3B    | ~1–2 GB  | Edge, dispositivos móviles    |
| Llama 3.1 8B      | 8B         | ~5 GB    | Uso general en local          |
| Llama 3.3 70B     | 70B        | ~40 GB   | Calidad comparable a frontier |
| Llama 3.1 405B    | 405B       | >200 GB  | Máxima calidad, servidores    |

- **Licencia**: Meta Llama License (uso comercial permitido con restricciones a partir de cierto volumen)
- **En Ollama**: `ollama pull llama3.2` / `ollama pull llama3.3:70b`

## Mistral AI

Empresa francesa especializada en modelos eficientes y de alta calidad.

### Mistral Small 4 *(marzo 2026)*

Modelo unificado que combina razonamiento (Magistral), visión (Pixtral) y capacidades de agente de código (Devstral) en un único modelo configurable. Esfuerzo de razonamiento ajustable según la tarea.

### Mistral Large 3

Modelo denso de 41B parámetros activos (675B total MoE). Multimodal e instruction-tuned.

### Pixtral 12B

Modelo de visión: 12B de lenguaje + 400M de encoder visual. Contexto de 128K tokens. Genera ~40 tokens/s en una RTX 4090 con Q5.

```bash
ollama pull mistral
ollama pull mistral-small
```

### Mixtral 8x7B

Arquitectura MoE clásica: 8 expertos de 7B, solo 2 activos por inferencia. Ofrece calidad de ~40B con coste de ~14B.

- **Licencia**: Apache 2.0
- **En Ollama**: `ollama pull mixtral`

## Alibaba — Qwen

La familia **Qwen** es una de las más completas del ecosistema, con variantes de texto, código, visión y audio. Excelente soporte multilingüe, incluyendo español.

### Qwen3 / Qwen3.5 *(2025–2026)*

La generación más reciente, con variantes densas y MoE.

| Variante          | Arquitectura | Contexto | Perfil                                |
| ----------------- | ------------ | -------- | ------------------------------------- |
| Qwen3 0.6B – 32B  | Denso        | 128K     | Gama completa para cualquier hardware |
| Qwen3 235B-A22B   | MoE          | 128K     | Máxima calidad                        |
| Qwen3.5 35B-A3B   | MoE          | 128K     | Eficiente, alta calidad               |
| Qwen3.5 397B-A17B | MoE          | 128K     | Tope de gama open source              |

Qwen3 incluye variantes de **razonamiento** (*thinking*) que activan cadena de pensamiento interna antes de responder.

### Qwen2.5 / Qwen2.5-Coder

Todavía muy usados y bien soportados en Ollama.

| Variante               | Parámetros | Perfil                                    |
| ---------------------- | ---------- | ----------------------------------------- |
| Qwen2.5 7B – 72B       | 7B–72B     | Uso general, muy multilingüe              |
| Qwen2.5-Coder 7B – 32B | 7B–32B     | Programación, uno de los mejores en local |
| Qwen2.5-VL 3B – 72B    | 3B–72B     | Multimodal (texto + imagen)               |

- **Licencia**: Apache 2.0
- **En Ollama**: `ollama pull qwen3` / `ollama pull qwen2.5-coder:14b`

## Microsoft — Phi

La familia **Phi** apuesta por modelos pequeños entrenados con datos de alta calidad (libros de texto, código curado). Rendimiento sorprendente para su tamaño.

### Phi-4 y variantes *(2025–2026)*

| Variante                 | Parámetros | Capacidades                                   |
| ------------------------ | ---------- | --------------------------------------------- |
| **Phi-4**                | 14B        | Razonamiento, matemáticas                     |
| **Phi-4-mini**           | ~4B        | Ligero, multilingüe, function calling         |
| **Phi-4-multimodal**     | ~14B       | Texto + imagen + audio, 20+ idiomas           |
| **Phi-4-reasoning**      | 15B        | Razonamiento avanzado con pensamiento interno |
| **Phi-4-reasoning-plus** | 15B        | Variante extendida de razonamiento            |
| **Phi-4-mini-reasoning** | ~4B        | Razonamiento en hardware limitado             |

Phi-4-reasoning supera a modelos mucho mayores en benchmarks de matemáticas y lógica gracias al entrenamiento con datos sintéticos de razonamiento.

- **Licencia**: MIT
- **En Ollama**: `ollama pull phi4` / `ollama pull phi4-mini`

## Google — Gemma

**Gemma** es la familia open weights de Google basada en la misma tecnología que Gemini.

### Gemma 3

Disponible en 5 tamaños con soporte para más de 140 idiomas.

| Variante     | Parámetros | Contexto | Multimodal |
| ------------ | ---------- | -------- | ---------- |
| Gemma 3 270M | 270M       | 32K      | No         |
| Gemma 3 1B   | 1B         | 32K      | No         |
| Gemma 3 4B   | 4B         | 128K     | Sí         |
| Gemma 3 12B  | 12B        | 128K     | Sí         |
| Gemma 3 27B  | 27B        | 128K     | Sí         |

- **Licencia**: Gemma Terms of Use (uso comercial permitido)
- **En Ollama**: `ollama pull gemma3` / `ollama pull gemma3:27b`

## DeepSeek

Empresa china que ha publicado modelos de alto rendimiento, especialmente en razonamiento y código. Sus lanzamientos han causado un gran impacto en la industria.

### DeepSeek-R1

Modelo de razonamiento que compite directamente con o1 de OpenAI en benchmarks de matemáticas y lógica. Disponible en múltiples tamaños.

```bash
ollama pull deepseek-r1        # 7B por defecto
ollama pull deepseek-r1:14b
ollama pull deepseek-r1:70b
```

### DeepSeek-V3 / V3.2

Modelo de uso general de alta calidad con arquitectura MoE (671B parámetros totales, ~37B activos). DeepSeek-V3.2 integra razonamiento directamente en el *tool use*, permitiendo que el modelo "piense" mientras decide qué herramienta usar.

- **Licencia**: MIT
- **En Ollama**: `ollama pull deepseek-r1` / `ollama pull deepseek-v3`

## Cohere — Command A

**Command A** es la apuesta de Cohere por el open source empresarial, especialmente orientado a RAG y agentes.

| Variante         | Parámetros | Contexto | Perfil                                |
| ---------------- | ---------- | -------- | ------------------------------------- |
| Command A        | 111B       | 256K     | Razonamiento híbrido, agentic         |
| Command A Vision | 111B       | 256K     | Primera variante con visión de Cohere |
| Command R+       | ~104B      | 128K     | RAG de alta calidad                   |
| Command R7B      | 7B         | 128K     | Ligero, eficiente para RAG            |

- **Punto fuerte**: RAG y uso de herramientas, especialmente en contextos empresariales
- **Licencia**: CC-BY-NC (no comercial en versiones open weights)

## InternLM

Familia de modelos del **Shanghai AI Lab**, muy activa en investigación y con licencia Apache 2.0.

- **InternLM3-8B**: Modelo compacto con excelente rendimiento en razonamiento
- Especializado en aplicaciones científicas y técnicas

## Resumen comparativo

| Modelo               | Empresa    | Tamaños         | Licencia     | Destacado                                 |
| -------------------- | ---------- | --------------- | ------------ | ----------------------------------------- |
| **Llama 4 Maverick** | Meta       | MoE 17B activos | Meta License | Supera GPT-4o, multimodal                 |
| **Llama 4 Scout**    | Meta       | MoE 17B activos | Meta License | Contexto 10M tokens                       |
| **Mistral Small 4**  | Mistral AI | —               | Open weights | Unificado: razonamiento + visión + código |
| **Qwen3 / Qwen3.5**  | Alibaba    | 0.6B–397B       | Apache 2.0   | Multilingüe, razonamiento, MoE            |
| **Qwen2.5-Coder**    | Alibaba    | 1.5B–32B        | Apache 2.0   | Mejor código en local                     |
| **Phi-4-reasoning**  | Microsoft  | 15B             | MIT          | Razonamiento avanzado, eficiente          |
| **Phi-4-multimodal** | Microsoft  | ~14B            | MIT          | Texto + imagen + audio                    |
| **Gemma 3**          | Google     | 270M–27B        | Gemma ToU    | Multimodal, 140+ idiomas                  |
| **DeepSeek-R1**      | DeepSeek   | 1.5B–671B       | MIT          | Razonamiento nivel o1                     |
| **DeepSeek-V3.2**    | DeepSeek   | 671B (MoE)      | MIT          | Tool use con razonamiento                 |
| **Command A**        | Cohere     | 111B            | CC-BY-NC     | RAG empresarial, agentes                  |

## Cómo ejecutar en local

La forma más sencilla es con [Ollama](../../blog/ollama):

```bash
# Instalar y ejecutar un modelo
ollama pull qwen2.5-coder:7b
ollama run qwen2.5-coder:7b
```

Los modelos más descargados en Ollama (por popularidad):

1. `llama3.1` — 112M descargas
2. `deepseek-r1` — 81M descargas
3. `llama3.2` — 63M descargas
4. `gemma3` — 34M descargas
5. `mistral` — 27M descargas
6. `qwen2.5` — 26M descargas
7. `qwen3` — 25M descargas

Ver también: [Modelos comerciales](./frontier), [Modelos de embeddings](./embeddings).
