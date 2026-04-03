---
sidebar_position: 1
---

# Panorama de modelos

El ecosistema de modelos de IA crece a un ritmo acelerado. Esta sección recoge los modelos más relevantes organizados por tipo y proveedor, con información práctica sobre cuándo usar cada uno.

## Cómo se clasifican los modelos

### Por acceso

| Tipo                  | Descripción                                                                                   | Ejemplos                       |
| --------------------- | --------------------------------------------------------------------------------------------- | ------------------------------ |
| **Comerciales (API)** | Se usan a través de una API de pago. No se puede ver ni modificar el modelo.                  | GPT-4o, Claude 3.5, Gemini 1.5 |
| **Open weights**      | Los pesos se publican y se pueden descargar, pero la licencia puede restringir uso comercial. | Llama 3, Gemma, Phi-4          |
| **Open source**       | Código y pesos disponibles con licencia permisiva.                                            | Mistral, Qwen, DeepSeek        |

### Por tamaño y capacidad

| Categoría       | Parámetros aproximados    | Perfil                                                                  |
| --------------- | ------------------------- | ----------------------------------------------------------------------- |
| **Frontier**    | >100B (o MoE equivalente) | Máxima capacidad, alto coste, uso en API                                |
| **LLM mediano** | 30B–70B                   | Buen equilibrio calidad/coste, ejecutable en local con hardware potente |
| **SLM**         | 1B–14B                    | Ligeros, rápidos, ideales para uso local o en dispositivos              |

### Por modalidad

- **Solo texto**: entrada y salida en texto. La mayoría de LLMs de primera generación.
- **Multimodal**: procesan texto + imágenes (y en algunos casos audio o vídeo). GPT-4o, Claude 3, Gemini, LLaVA.
- **Embeddings**: transforman texto en vectores numéricos para búsqueda semántica y RAG.
- **Código**: especializados en generar y entender código. Qwen2.5-Coder, DeepSeek-Coder, CodeLlama.
- **Razonamiento**: optimizados para tareas lógicas y matemáticas con técnicas como chain-of-thought. o1, DeepSeek-R1.

## Cómo elegir un modelo

Algunas preguntas que orientan la decisión:

1. **¿Los datos pueden salir de tu infraestructura?** Si no, necesitas un modelo ejecutable en local (open weights + Ollama).
2. **¿Qué tarea vas a hacer?** Código → Qwen2.5-Coder o GPT-4o. Razonamiento → o1 o DeepSeek-R1. Texto general → Claude o GPT-4o.
3. **¿Cuál es el presupuesto?** Los modelos de API cobran por token. Los modelos en local tienen coste cero por token pero requieren hardware.
4. **¿Necesitas velocidad o calidad?** Modelos pequeños responden más rápido; los grandes razonan mejor.
5. **¿Hay requisitos de contexto?** Documentos muy largos requieren ventanas de contexto grandes (≥128K tokens).

## Benchmarks de referencia

Los benchmarks más usados para comparar modelos:

| Benchmark               | Qué mide                                       |
| ----------------------- | ---------------------------------------------- |
| **MMLU**                | Conocimiento general (57 materias)             |
| **HumanEval / MBPP**    | Generación de código                           |
| **GSM8K / MATH**        | Razonamiento matemático                        |
| **GPQA**                | Preguntas de nivel experto (ciencia, medicina) |
| **MT-Bench**            | Calidad en conversaciones multiturn            |
| **LMSYS Chatbot Arena** | Preferencia humana (votación ciega)            |

:::caution
Los benchmarks pueden estar "contaminados" si el modelo se entrenó con datos que incluyen los tests. Úsalos como orientación, no como verdad absoluta. La mejor evaluación es probar el modelo en tu caso de uso real.
:::

## Secciones de esta guía

- [Modelos comerciales](./frontier) — GPT, Claude, Gemini y otros modelos accesibles por API
- [Modelos open source](./open-source) — Llama, Mistral, Qwen, Phi, Gemma y más
- [Modelos de embeddings](./embeddings) — Modelos para búsqueda semántica y RAG
