# Definiciones

Definiciones de conceptos relacionados con la inteligencia artificial (IA).

---

## A

### Agente IA

Programa que usa IA para conseguir una meta. Observa información, decide qué hacer y lo ejecuta de forma automática, a veces usando herramientas como un buscador, un calendario o una API.

- Qué puede hacer: dividir una tarea en pasos, pedir más datos, usar una herramienta, recordar cosas simples.
- Riesgos: equivocarse o repetir pasos. Se reduce poniendo límites, revisando los resultados y trabajando en un entorno seguro.

Ver también: [RAG](#rag), [LLM](#large-language-model-llm), [Prompt](#prompt).

---

## B

### Base de datos vectorial

Es como una biblioteca donde los textos o imágenes se guardan como “huellas digitales” numéricas. Permite buscar por parecido, no solo por palabras exactas.

- Para qué sirve: encontrar documentos relacionados, responder preguntas y hacer recomendaciones.
- Ejemplos: FAISS, Milvus, Qdrant, Weaviate, Pinecone, pgvector.

Ver también: [Embeddings](#embeddings), [RAG](#rag), [Vector](#vector).

--- 

## E

### Embeddings

La “huella digital” en números de un texto, imagen o audio. Con esa huella podemos medir qué tan parecidos son dos elementos.

- Usos: buscar por significado, agrupar por temas, recomendar contenidos.

### Entrenamiento (training)

Es “enseñar” a un modelo con muchos ejemplos hasta que acierte cada vez más. Requiere buenos datos y tiempo de cómputo.

- Variantes: afinar un modelo ya hecho con tus datos; mejorar con correcciones humanas.
- Buenas prácticas: separar datos para probar, parar a tiempo y vigilar resultados.

---

## F

### Few‑shot

Poner 1–3 ejemplos dentro del mensaje para que el modelo copie el estilo o el formato, sin tener que re‑entrenarlo.

### Fine‑tuning

Ajustar un modelo con tus propios datos para que se especialice en tu caso. Suele ser más preciso que solo dar ejemplos, pero también más costoso.

---

## I

### Inferencia

Momento en el que el modelo ya entrenado responde o hace una predicción.

- Lo que importa: que responda rápido, bien y de forma económica.

### Inteligencia Artificial (IA)

Tecnología que busca que las máquinas hagan tareas que requieren “inteligencia”: ver, entender lenguaje, decidir, aprender o crear contenido.

--- 

## L

### LangChain

Framework para crear aplicaciones con modelos de lenguaje (LLM) de forma modular. Proporciona componentes reutilizables (cadenas, agentes, herramientas, memoria) para orquestar prompts, llamadas a modelos, recuperación en bases de datos vectoriales y flujos de decisión.

Permite:
- Componer pipelines de NLP/IA generativa con pasos encadenados.
- Integrar múltiples proveedores de LLM y de almacenamiento vectorial.
- Construir agentes con herramientas (búsqueda, código, APIs) y memoria conversacional.

Se usa como base en muchos proyectos no‑code/low‑code y entornos visuales.

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


--- 

## M

### Modelo de lenguaje

Programa que aprende a predecir la siguiente palabra de un texto. Con esa habilidad puede escribir textos completos y responder preguntas.

Ver también [LLM](#large-language-model-llm).

---

## P

### Parámetros

“Perillas internas” del modelo que se ajustan al aprender. A más perillas, más capacidad, pero también más coste de cómputo.

> Ejemplo: Llama 3 8B ≈ 8 mil millones de parámetros.

### Prompt

El mensaje que enviamos al modelo con instrucciones, contexto y ejemplos.

- Consejos: sé claro, indica pasos, muestra ejemplos y el formato deseado.

---

## R

### RAG

RAG son las siglas de **Retrieval-Augmented Generation** (Generación Aumentada por Recuperación).

Es la manera de hacer que el modelo consulte documentos u otra información antes de responder.

1) Buscar trozos de texto relacionados. 
2) Añadirlos a la pregunta. 
3) Responder usando ese contexto.

Ventaja: respuestas más actualizadas y con menos “inventos”.

---

## T

### Temperatura

Controla lo creativo que es el modelo. 

- **Baja** (0–0.3): respuestas más seguras y deterministas. 
- **Alta** (0.7–1.0): respuestas más creativas y aleatorias.

### Top‑p (nucleus)

Es un parámetro que permite muestrear entre las palabras más probables que, juntas, suman un porcentaje (por ejemplo, 90%).

Por ejemplo, si se establece `top-p=0.9`, el modelo considerará solo las palabras que, en conjunto, tienen una probabilidad del 90% de ser la siguiente palabra.

### Top‑k

Es un parámetro que limita la búsqueda a las k palabras más probables (por ejemplo, `top-k=20`).

### Token

Pedacitos en los que el modelo divide el texto (parecido a sílabas/palabras). Los límites y costes se miden con tokens.

---

## V

### Vector

Lista de números que representa algo, como la “huella digital” de un texto.

### Ventana de contexto

Cantidad de texto que el modelo puede “tener a la vista” de una vez (entrada + respuesta). Si es grande, puede leer más, pero consume más recursos.
