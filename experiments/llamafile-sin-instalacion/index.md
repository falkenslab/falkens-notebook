---
date: 2026-04-05
slug: llamafile-sin-instalacion
title: Ejecutar un LLM sin instalar nada con llamafile
tags: [llamafile, LLM, local]
---

Descargar y ejecutar un modelo de lenguaje completo en cualquier máquina con un solo fichero ejecutable, sin npm, pip ni Docker.

<!-- truncate -->

## Experimento: ejecutar un LLM sin instalar nada

**Contexto:** llamafile es la forma más rápida de probar un modelo en cualquier máquina, sin configuración.

```bash
wget https://huggingface.co/Mozilla/Llama-3.2-1B-Instruct-llamafile/resolve/main/Llama-3.2-1B-Instruct.Q6_K.llamafile
chmod +x Llama-3.2-1B-Instruct.Q6_K.llamafile
./Llama-3.2-1B-Instruct.Q6_K.llamafile --cli -p "¿Qué es un transformer?"
```

**Resultado:**
```
Un transformer es una arquitectura de red neuronal basada en el mecanismo de atención,
introducida en el paper "Attention Is All You Need" (2017). Es la base de la mayoría
de los modelos de lenguaje modernos como GPT, BERT y LLaMA.
```

**Qué aprender:** sin `npm install`, sin `pip install`, sin Docker. Descarga, permiso, ejecuta. El flag `--cli` activa el modo de línea de comandos en lugar de abrir el navegador.

## Referencias

- [llamafile — GitHub (Mozilla)](https://github.com/mozilla-oai/llamafile)
- [Modelos llamafile en HuggingFace](https://huggingface.co/Mozilla)
- [Notas: llamafile](/docs/tools/llm-runtimes/llamafile/overview)
