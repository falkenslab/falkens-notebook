---
date: 2025-08-28
slug: ejecutar-modelo-local
title: Ejecutar un modelo en local
tags: [Ollama, LLM, primeros-pasos]
---

En este experimento vamos a ejecutar un modelo en local, para poder hablar con un LLM en nuestra máquina.

<!-- truncate -->

Para poder ejecutar un modelo (LLM), necesitamos un motor de ejecución (runtime), y para en este experimento usaremos **Ollama**.

## 1. Instalamos Ollama

Sigue estas [instrucciones para instalar Ollama](/docs/tools/llm-runtimes/ollama/instalacion) en tu sistema.

## 2. Descargamos un modelo

Se descarga el modelo del repositorio de modelos de Ollama:

```bash
$ ollama pull llama3.2
```

## 3. Lo ejecutamos

Chateamos con el modelo:

```bash
$ ollama run llama3.2
>>> ¿Qué es un modelo de lenguaje en una frase?
Un modelo de lenguaje es un sistema informático que utiliza algoritmos y técnicas de procesamiento del lenguaje natural para entender, 
generar y interactuar con texto. Estos modelos están diseñados para aprender patrones y estructuras del lenguaje a partir de grandes 
conjuntos de datos y luego utilizar esta información para realizar tareas específicas como la traducción automática, la pregunta respuesta 
o la generación de contenido.

>>> /bye
```

En cuestión de minutos tenemos un LLM corriendo en local, sin cuenta, sin API key, sin coste por token.