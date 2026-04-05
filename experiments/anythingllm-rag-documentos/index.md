---
date: 2026-04-05
slug: anythingllm-rag-documentos
title: RAG sobre documentos propios con AnythingLLM
tags: [AnythingLLM, RAG, Ollama]
---

Queremos hacer preguntas a un modelo sobre documentos privados sin enviarlos a servicios externos, y para ello usaremos [AnythingLLM](https://anythingllm.com/) con Ollama como LLM runtime local.

<!-- truncate -->


1. [Instalamos Ollama](/notes/tools/llm-runtimes/ollama/instalacion) y [descargamos el modelo](/notes/tools/llm-runtimes/ollama/modelos#descargar-un-modelo) que queramos usar para analizar los documentos.

2. Instalamos [AnythingLLM](https://anythingllm.com/desktop) y lo ejecutamos.

![alt text](image.png)

Si pulsamos "Comenzar", nos sugiere un modelo adecuado a nuestros recursos hardware, pero lo que queremos es usar Ollama como proveedor de modelos.

![alt text](image-1.png)

3. Seleccionamos "Configuración manual" y localizamos "Ollama":

![alt text](image-2.png)

4. Elegimos un modelo de entre los que tenemos disponibles en Ollama y terminamos el proceso de configuración inicial:

![alt text](image-3.png)

5. Creamos un espacio de trabajo (workspace) al que adjuntar documentos y preguntarle a nuestro modelo local:

![alt text](image-4.png)

6. Subimos un PDF al espacio de trabajo y lo pineamos:

![alt text](image-5.png)

7. Y finalmente podemos hacerle preguntas sobre el contenido adjunto al espacio de trabajo:

![alt text](image-6.png)


## Referencias

- [AnythingLLM — Sitio oficial](https://anythingllm.com)
- [AnythingLLM — Documentación](https://docs.anythingllm.com)
- [Notas: AnythingLLM](/notes/tools/llm-runtimes/anythingllm/overview)
