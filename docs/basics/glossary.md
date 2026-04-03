# Definiciones

Definiciones de conceptos relacionados con la inteligencia artificial (IA).

---

## A

### Agente IA

Programa que usa IA para conseguir una meta. Observa información, decide qué hacer y lo ejecuta de forma automática, a veces usando herramientas como un buscador, un calendario o una API.

- Qué puede hacer: dividir una tarea en pasos, pedir más datos, usar una herramienta, recordar cosas simples.
- Riesgos: equivocarse o repetir pasos. Se reduce poniendo límites, revisando los resultados y trabajando en un entorno seguro.

Ver también: [RAG](#rag), [LLM](#large-language-model-llm), [Prompt](#prompt), [Tool calling](#tool-calling).

### Alucinación

Respuesta generada por un modelo que parece correcta pero es falsa o inventada. El modelo no "sabe" que se está equivocando; simplemente predice texto plausible aunque no sea verdad.

- Causas habituales: información ausente en el entrenamiento, pregunta ambigua, temperatura alta.
- Cómo reducirla: usar [RAG](#rag) para anclar las respuestas en documentos reales, pedir al modelo que cite sus fuentes o que diga "no sé" cuando no tiene datos.

---

## B

### Base de datos vectorial

Es como una biblioteca donde los textos o imágenes se guardan como "huellas digitales" numéricas. Permite buscar por parecido, no solo por palabras exactas.

- Para qué sirve: encontrar documentos relacionados, responder preguntas y hacer recomendaciones.
- Ejemplos: FAISS, Milvus, Qdrant, Weaviate, Pinecone, pgvector.

Ver también: [Embeddings](#embeddings), [RAG](#rag), [Vector](#vector).

---

## C

### Chain of Thought (CoT)

Técnica de prompting que pide al modelo que razone paso a paso antes de dar una respuesta final. Mejora notablemente los resultados en tareas de lógica, matemáticas o planificación.

```
Prompt: Resuelve esto paso a paso: si tengo 12 manzanas y doy 1/3...
```

- Variante *zero-shot CoT*: añadir "Piensa paso a paso" al final del prompt sin dar ejemplos.
- Variante *few-shot CoT*: incluir 2–3 ejemplos con razonamiento completo.

Ver también: [Few-shot](#few-shot), [Zero-shot](#zero-shot), [Prompt Engineering](./prompt-engineering).

### Chunking

División de un documento largo en fragmentos (chunks) más pequeños antes de almacenarlos en una base de datos vectorial. El tamaño y la superposición entre chunks afectan directamente a la calidad de un sistema RAG.

- Estrategias: por número de tokens, por párrafo, por sección semántica.
- Parámetros habituales: tamaño de 256–1024 tokens, solapamiento de 10–20%.

Ver también: [RAG](#rag), [Embeddings](#embeddings).

---

## D

### Destilación (distillation)

Técnica para crear un modelo más pequeño (alumno) que imita el comportamiento de uno más grande (profesor). El modelo alumno es más rápido y barato de ejecutar, con una pérdida controlada de calidad.

- Ejemplo: muchos modelos SLM se obtienen destilando modelos frontier más grandes.

Ver también: [SLM](#slm-small-language-model), [Fine-tuning](#fine-tuning).

---

## E

### Embeddings

La "huella digital" en números de un texto, imagen o audio. Con esa huella podemos medir qué tan parecidos son dos elementos.

- Usos: buscar por significado, agrupar por temas, recomendar contenidos.

Ver también: [Vector](#vector), [Base de datos vectorial](#base-de-datos-vectorial).

### Entrenamiento (training)

Es "enseñar" a un modelo con muchos ejemplos hasta que acierte cada vez más. Requiere buenos datos y tiempo de cómputo.

- Variantes: afinar un modelo ya hecho con tus datos; mejorar con correcciones humanas.
- Buenas prácticas: separar datos para probar, parar a tiempo y vigilar resultados.

Ver también: [Fine-tuning](#fine-tuning), [RLHF](#rlhf).

---

## F

### Few-shot

Poner 1–3 ejemplos dentro del mensaje para que el modelo copie el estilo o el formato, sin tener que re‑entrenarlo.

Ver también: [Zero-shot](#zero-shot), [Prompt Engineering](./prompt-engineering).

### Fine-tuning

Ajustar un modelo con tus propios datos para que se especialice en tu caso. Suele ser más preciso que solo dar ejemplos, pero también más costoso.

Ver también: [Entrenamiento](#entrenamiento-training), [Destilación](#destilación-distillation).

---

## I

### IA Generativa

Rama de la IA centrada en generar contenido nuevo: texto, imágenes, audio, vídeo o código. Los modelos generativos aprenden patrones de grandes volúmenes de datos y los usan para crear salidas originales.

- Ejemplos de modelos: GPT-4, Claude, Gemini (texto); DALL-E, Stable Diffusion (imágenes).

Ver también: [LLM](#large-language-model-llm), [Multimodal](#multimodal).

### IA Multimodal

Modelo de IA capaz de procesar y combinar distintos tipos de datos: texto, imágenes, audio o vídeo en una sola sesión.

- Ejemplo: enviar una foto de un error en pantalla y pedir que lo explique y lo corrija.

Ver también: [LLM](#large-language-model-llm).

### Inferencia

Momento en el que el modelo ya entrenado responde o hace una predicción.

- Lo que importa: que responda rápido, bien y de forma económica.

### Inteligencia Artificial (IA)

Tecnología que busca que las máquinas hagan tareas que requieren "inteligencia": ver, entender lenguaje, decidir, aprender o crear contenido.

---

## L

### LangChain

Framework para crear aplicaciones con modelos de lenguaje (LLM) de forma modular. Proporciona componentes reutilizables (cadenas, agentes, herramientas, memoria) para orquestar prompts, llamadas a modelos, recuperación en bases de datos vectoriales y flujos de decisión.

Permite:
- Componer pipelines de NLP/IA generativa con pasos encadenados.
- Integrar múltiples proveedores de LLM y de almacenamiento vectorial.
- Construir agentes con herramientas (búsqueda, código, APIs) y memoria conversacional.

### Langflow

Entorno visual (low‑code/no‑code) para diseñar, probar y desplegar flujos con LLMs y agentes a partir de bloques. Está inspirado en la filosofía de LangChain y permite arrastrar y conectar nodos para construir aplicaciones de IA sin escribir mucho código.

Características clave:
- Nodos: LLMs, prompts, herramientas, memoria, RAG, evaluadores, etc.
- Integraciones: múltiples proveedores de LLM y bases de datos vectoriales.
- Iteración rápida: ejecución parcial de flujos, inspección de entradas/salidas y métricas.
- Portabilidad: exportación/importación de flujos (JSON) y opciones para generar código.
- Despliegue: ejecución local o en servidor para exponer endpoints.

Casos típicos: chatbots con recuperación (RAG), asistentes con herramientas, pipelines de clasificación/extracción y prototipado rápido de experiencias con LLM.

### Large Language Model (LLM)

Es un modelo de IA muy grande que sabe trabajar con texto: leer, resumir, escribir y contestar preguntas.

- Ventajas: sirve para muchas tareas con el mismo modelo.
- Límites: puede inventar datos o no saber lo más reciente si no se le da.

Ver también: [SLM](#slm-small-language-model), [Transformer](#transformer), [Ventana de contexto](#ventana-de-contexto).

---

## M

### MCP (Model Context Protocol)

Protocolo abierto creado por Anthropic para conectar modelos de IA con herramientas y fuentes de datos externas de forma estandarizada. Funciona como un "USB para la IA": cualquier herramienta que implemente el protocolo puede conectarse a cualquier modelo compatible.

- Componentes: un **servidor MCP** expone herramientas o datos; el **cliente** (el modelo o la app) los consume.
- Usos habituales: conectar un LLM con bases de datos, APIs, sistemas de ficheros, calendarios, etc.
- Ventaja: evita integraciones ad hoc; una herramienta implementada una vez funciona con todos los clientes MCP.

### Memoria (en agentes)

Capacidad de un agente para recordar información entre turnos de conversación o entre sesiones.

| Tipo | Descripción |
|---|---|
| **En contexto** | Información incluida directamente en el prompt actual |
| **Corto plazo** | Historial de la conversación activa |
| **Largo plazo** | Base de datos externa consultada según relevancia |
| **Semántica** | Hechos y conocimiento almacenados como embeddings |

Ver también: [Agente IA](#agente-ia), [RAG](#rag), [Ventana de contexto](#ventana-de-contexto).

### Modelo de lenguaje

Programa que aprende a predecir la siguiente palabra de un texto. Con esa habilidad puede escribir textos completos y responder preguntas.

Ver también [LLM](#large-language-model-llm).

### Multimodal

Ver [IA Multimodal](#ia-multimodal).

---

## P

### Parámetros

"Perillas internas" del modelo que se ajustan al aprender. A más perillas, más capacidad, pero también más coste de cómputo.

> Ejemplo: Llama 3 8B ≈ 8 mil millones de parámetros.

### Prompt

El mensaje que enviamos al modelo con instrucciones, contexto y ejemplos.

- Consejos: sé claro, indica pasos, muestra ejemplos y el formato deseado.

Ver también: [Prompt Engineering](./prompt-engineering), [Few-shot](#few-shot), [Chain of Thought](#chain-of-thought-cot).

### Prompt Engineering

El arte de diseñar instrucciones efectivas para obtener los mejores resultados de un modelo de lenguaje.

Ver la guía completa: [Prompt Engineering](./prompt-engineering).

---

## Q

### Quantización (quantization)

Técnica que reduce la precisión numérica de los pesos de un modelo (por ejemplo, de 32 bits a 4 bits) para que ocupe menos memoria y se ejecute más rápido, con una pérdida mínima de calidad.

- Formatos comunes: GGUF, GPTQ, AWQ.
- Uso principal: ejecutar modelos grandes en hardware doméstico (RAM limitada, sin GPU dedicada).
- Ejemplo: un modelo de 7B parámetros en FP16 necesita ~14 GB de RAM; en Q4 baja a ~4 GB.

Ver también: [Ollama](#ollama), [SLM](#slm-small-language-model).

---

## R

### RAG

RAG son las siglas de **Retrieval-Augmented Generation** (Generación Aumentada por Recuperación).

Es la manera de hacer que el modelo consulte documentos u otra información antes de responder.

1. Buscar trozos de texto relacionados.
2. Añadirlos a la pregunta.
3. Responder usando ese contexto.

Ventaja: respuestas más actualizadas y con menos [alucinaciones](#alucinación).

Ver también: [Chunking](#chunking), [Embeddings](#embeddings), [Reranking](#reranking).

### Reranking

Paso adicional en un pipeline RAG que reordena los fragmentos recuperados según su relevancia real antes de pasarlos al modelo. Mejora la calidad de la respuesta filtrando resultados poco relevantes que la búsqueda vectorial inicial pudo incluir.

- Modelos de reranking típicos: Cohere Rerank, BGE Reranker, cross-encoders.

Ver también: [RAG](#rag), [Base de datos vectorial](#base-de-datos-vectorial).

### RLHF

**Reinforcement Learning from Human Feedback** (aprendizaje por refuerzo con retroalimentación humana). Técnica usada para alinear el comportamiento de un LLM con las preferencias humanas: evaluadores humanos puntúan respuestas del modelo, y esas puntuaciones se usan para ajustarlo.

- Objetivo: que el modelo sea más útil, seguro y honesto.
- Base de modelos como GPT-4, Claude o Llama-chat.

Ver también: [Entrenamiento](#entrenamiento-training), [Fine-tuning](#fine-tuning).

---

## S

### SLM (Small Language Model)

Modelo de lenguaje de tamaño reducido (generalmente menos de 10B parámetros) optimizado para ejecutarse en hardware limitado, como un portátil o un dispositivo móvil, sin perder demasiada capacidad.

- Ejemplos: Phi-3, Gemma 2B, Qwen2.5-1.5B, Llama 3.2 1B.
- Ventajas: bajo coste, privacidad (se ejecuta en local), latencia baja.
- Desventajas: menor capacidad de razonamiento complejo que un LLM grande.

Ver también: [LLM](#large-language-model-llm), [Quantización](#quantización-quantization), [Ollama](#ollama).

---

## T

### Temperatura

Controla lo creativo que es el modelo.

- **Baja** (0–0.3): respuestas más seguras y deterministas.
- **Alta** (0.7–1.0): respuestas más creativas y aleatorias.

### Token

Pedacitos en los que el modelo divide el texto (parecido a sílabas/palabras). Los límites y costes se miden con tokens.

### Tool calling

Capacidad de un modelo para decidir cuándo invocar una herramienta externa (función, API, búsqueda web...) y hacerlo de forma estructurada. El modelo genera una llamada con nombre y parámetros; la aplicación la ejecuta y devuelve el resultado al modelo.

- Ejemplo: el modelo detecta que necesita el tiempo actual y llama a `get_weather(ciudad="Madrid")`.
- Nombres alternativos: *function calling*, *herramienta*, *tool use*.

Ver también: [Agente IA](#agente-ia), [MCP](#mcp-model-context-protocol).

### Top‑p (nucleus)

Es un parámetro que permite muestrear entre las palabras más probables que, juntas, suman un porcentaje (por ejemplo, 90%).

Por ejemplo, si se establece `top-p=0.9`, el modelo considerará solo las palabras que, en conjunto, tienen una probabilidad del 90% de ser la siguiente palabra.

### Top‑k

Es un parámetro que limita la búsqueda a las k palabras más probables (por ejemplo, `top-k=20`).

### Transformer

Arquitectura de red neuronal introducida en 2017 ("Attention is All You Need") que es la base de prácticamente todos los LLMs modernos. Su mecanismo de **atención** (*attention*) permite al modelo relacionar cualquier parte del texto con cualquier otra, independientemente de la distancia.

- Componentes clave: capas de atención multi-cabeza, codificador, decodificador.
- Por qué importa: antes del Transformer, los modelos de lenguaje procesaban el texto de forma secuencial; el Transformer lo procesa en paralelo, lo que permite escalar a miles de millones de parámetros.

---

## V

### Vector

Lista de números que representa algo, como la "huella digital" de un texto.

Ver también: [Embeddings](#embeddings), [Base de datos vectorial](#base-de-datos-vectorial).

### Ventana de contexto

Cantidad de texto que el modelo puede "tener a la vista" de una vez (entrada + respuesta). Si es grande, puede leer más, pero consume más recursos.

> Ejemplo: Claude 3.5 tiene una ventana de contexto de 200 000 tokens, equivalente a unas 500 páginas de texto.

---

## Z

### Zero-shot

Pedirle al modelo que realice una tarea sin darle ningún ejemplo previo, confiando solo en su conocimiento general.

```
Clasifica este texto como positivo, negativo o neutro: "El producto llegó tarde pero funcionó bien."
```

Contrasta con [Few-shot](#few-shot), donde se incluyen ejemplos en el propio prompt.

---

## O

### Ollama

Herramienta de código abierto que permite descargar y ejecutar modelos de lenguaje en local, en tu propio ordenador, sin depender de servicios en la nube.

- Modelos disponibles: Llama 3, Mistral, Qwen, Phi, DeepSeek, Gemma y muchos más.
- API compatible con OpenAI: las aplicaciones que usan la API de OpenAI pueden apuntar a Ollama sin modificar el código.
- Uso típico: privacidad, desarrollo offline, pruebas con [SLMs](#slm-small-language-model).

```bash
ollama pull llama3.2
ollama run llama3.2
```

Ver también: [SLM](#slm-small-language-model), [Quantización](#quantización-quantization).
