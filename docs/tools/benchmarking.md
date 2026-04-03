---
sidebar_position: 3
---

# Benchmarking de modelos

El benchmarking de LLMs evalúa su rendimiento desde dos ángulos complementarios: **calidad** (qué tan buenas son las respuestas) y **rendimiento** (qué tan rápido y eficiente es el modelo en tu hardware).

## Métricas clave

### Calidad

| Métrica | Qué mide |
|---|---|
| **Precisión en benchmark** | Porcentaje de aciertos en tests estandarizados (MMLU, HumanEval, GPQA...) |
| **MT-Bench** | Calidad en conversaciones de múltiples turnos |
| **Preferencia humana (Elo)** | Votación ciega entre pares de modelos |

### Rendimiento

| Métrica | Descripción | Relevante para |
|---|---|---|
| **TPS** (tokens/segundo) | Velocidad de generación | Throughput, uso batch |
| **TTFT** (Time To First Token) | Latencia hasta el primer token generado | Aplicaciones interactivas |
| **ITL** (Inter-Token Latency) | Tiempo entre tokens sucesivos | Fluidez de la respuesta |
| **Uso de RAM / VRAM** | Memoria consumida por el modelo cargado | Planificación de hardware |

En aplicaciones interactivas (chatbots, asistentes de código) el **TTFT** es la métrica más perceptible por el usuario. En procesos batch, importa más el **TPS**.

## Leaderboards de referencia

### Open LLM Leaderboard (HuggingFace)

El ranking más usado para modelos open source. Evalúa los modelos con el harness de Eleuther AI sobre benchmarks estándar: MMLU, ARC, HellaSwag, TruthfulQA, GSM8K, MATH...

Los resultados se actualizan continuamente conforme se envían nuevos modelos.

- Web: [huggingface.co/spaces/open-llm-leaderboard](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard)

### Chatbot Arena (LMSYS)

Plataforma de evaluación por preferencia humana. Más de 5,4 millones de votos recopilados mediante batallas ciegas entre pares de modelos. Usa el sistema Elo para calcular rankings.

Categorías disponibles: uso general, codificación, prompts difíciles, flujos agénticos (tool calling, navegación web, ejecución de código).

- Web: [chat.lmsys.org](https://chat.lmsys.org)

### BenchLM.ai

Agrega resultados de más de 179 modelos en más de 75 benchmarks, incluyendo SWE-bench y LiveCodeBench (código), GPQA Diamond y MMLU-Pro (conocimiento y razonamiento).

### LiveBench

Benchmark con preguntas actualizadas continuamente para evitar la contaminación de datos de entrenamiento.

## Herramientas para medir rendimiento en local

### ollama ps

Muestra los modelos actualmente cargados en memoria y su uso de procesador/VRAM:

```bash
ollama ps
```

```
NAME               ID           SIZE    PROCESSOR    CONTEXT    UNTIL
llama3.2:latest    abc123       5.2 GB  100% GPU     4096       4 minutes from now
```

Útil para verificar que el modelo está usando la GPU y para diagnosticar consumo de memoria.

### llama-bench (llama.cpp)

Herramienta de benchmarking incluida con llama.cpp. Mide la velocidad de procesamiento de prompts (pp) y de generación de texto (tg) de forma reproducible.

```bash
./llama-bench -m modelo.gguf -p 512 -n 128
```

Salida típica:

```
model               |    pp 512 |    tg 128 |
llama-7b Q4_K_M     |  1234 t/s |    45 t/s |
```

### LM Studio

La interfaz de LM Studio incluye estadísticas de rendimiento en tiempo real durante la generación: tokens/segundo, uso de memoria y tiempo de carga del modelo.

## Datos de rendimiento orientativos

Los siguientes valores son aproximaciones para tener un punto de referencia. Los resultados varían según quantización, longitud del contexto y sistema operativo.

### CPU (sin GPU)

| Hardware | Modelo | Quantización | TPS aprox. |
|---|---|---|---|
| Intel Core i7 (8 núcleos) | 7B | Q4_K_M | 5–12 |
| Apple M1 (CPU) | 7B | Q4_K_M | 15–20 |
| Apple M2/M3 | 7B | Q5_K_M | 30–50 |
| Apple M4 Pro | 14B | Q4_K_M | 25–35 |

### GPU

| Hardware | Modelo | TPS aprox. |
|---|---|---|
| RTX 3080 (10 GB) | 7B Q4 | 60–90 |
| RTX 4090 (24 GB) | 7B Q5 | >100 |
| RTX 4090 | 70B Q4 | 15–25 |
| H100 | 70B FP16 | >60 |

Con modelos en local, la regla general es: si el modelo cabe en VRAM, la GPU será mucho más rápida que la CPU. Si no cabe, parte del modelo se carga en RAM y la velocidad cae drásticamente.

## Benchmarks por tarea

Algunos benchmarks especializados para evaluar capacidades concretas:

| Benchmark | Tarea |
|---|---|
| **HumanEval / MBPP** | Generación de código Python |
| **SWE-bench** | Resolución de issues reales de GitHub |
| **MATH / GSM8K** | Razonamiento matemático |
| **GPQA Diamond** | Preguntas de nivel experto (física, biología, química) |
| **MMLU** | Conocimiento general (57 materias) |
| **TruthfulQA** | Veracidad y resistencia a alucinaciones |
| **MT-Bench** | Conversaciones multi-turno |
| **AgentBench** | Tareas agénticas (búsqueda, código, herramientas) |

:::caution
Un modelo puede puntuar alto en benchmarks y comportarse de forma mediocre en tu caso de uso real. Los benchmarks son útiles para comparar, pero la evaluación definitiva es siempre sobre datos y tareas propias.
:::

## Referencias

- [Open LLM Leaderboard](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard)
- [Chatbot Arena (LMSYS)](https://chat.lmsys.org)
- [BenchLM.ai](https://benchlm.ai)
- [LiveBench](https://livebench.ai)
- [llama.cpp — llama-bench](https://github.com/ggml-org/llama.cpp/blob/master/examples/llama-bench/README.md)
- [Artificial Analysis — Metodología de benchmarks](https://artificialanalysis.ai/methodology)
- [Conceptos: LLM](../basics/glossary#large-language-model-llm)
- [Modelos: panorama](../models/overview)
