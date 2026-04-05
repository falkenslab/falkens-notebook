---
date: 2026-04-05
slug: ollama-modelfile
title: Crear un asistente personalizado con Modelfile
tags: [Ollama, Modelfile]
---

Fijar un system prompt y ajustar parámetros en Ollama para crear un asistente especializado sin repetirlos en cada sesión.

<!-- truncate -->

## Experimento: crear un asistente personalizado con Modelfile

**Contexto:** fijar un system prompt y ajustar parámetros evita tener que repetirlos en cada sesión.

```bash
cat > Modelfile <<'EOF'
FROM llama3.2
SYSTEM "Eres un asistente técnico especializado en Python. Responde siempre en español y sé conciso."
PARAMETER temperature 0.3
PARAMETER num_ctx 4096
EOF

ollama create asistente-python -f Modelfile
ollama run asistente-python "¿Cuál es la diferencia entre list y tuple?"
```

**Resultado:**
```
Lista (list): mutable, puedes añadir, eliminar o modificar elementos.
Tupla (tuple): inmutable, no se puede modificar tras su creación.
Usa tuple cuando los datos no deben cambiar; es ligeramente más rápida y consume menos memoria.
```

**Qué aprender:** con `temperature 0.3` las respuestas son más deterministas y directas, ideal para asistentes técnicos.

## Referencias

- [Referencia de Modelfile](https://github.com/ollama/ollama/blob/main/docs/modelfile.md)
- [Notas: Configuración de Ollama](/docs/tools/llm-runtimes/ollama/configuracion)
