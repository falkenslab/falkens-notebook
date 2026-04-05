---
date: 2026-04-05
slug: ollama-prompt-puntual
title: Prompt puntual con Ollama desde la terminal
tags: [Ollama, LLM, CLI]
---

La forma más rápida de probar un modelo con Ollama sin abrir sesión interactiva, útil para scripts y automatizaciones.

<!-- truncate -->

## Experimento: prompt puntual desde la terminal

**Contexto:** la forma más rápida de probar un modelo sin abrir sesión interactiva.

```bash
ollama run llama3.2 "¿Qué es la cuantización en LLMs? Responde en dos frases."
```

**Resultado:**
```
La cuantización en LLMs es el proceso de reducir la precisión numérica de los pesos del modelo
(por ejemplo, de 32 bits a 4 bits) para disminuir el tamaño en memoria y acelerar la inferencia.
El coste es una pequeña pérdida de calidad en las respuestas, generalmente aceptable en modelos Q4.
```

**Qué aprender:** los modelos cuantizados a Q4 permiten ejecutar 7B parámetros con solo 4–5 GB de RAM, haciéndolos viables en hardware doméstico.

## Referencias

- [Repositorio en GitHub](https://github.com/ollama/ollama)
- [Notas: Uso básico de Ollama](/docs/tools/llm-runtimes/ollama/uso-basico)
