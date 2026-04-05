---
sidebar_position: 4
---

# API REST

Ollama expone una API compatible con la API de OpenAI en `http://localhost:11434`. Esto significa que cualquier aplicación que use la API de OpenAI puede apuntar a Ollama sin apenas cambios.

## Endpoint `/api/generate`

```bash
curl http://localhost:11434/api/generate \
  -d '{
    "model": "llama3.2",
    "prompt": "¿Qué es la cuantización en LLMs?",
    "stream": false
  }'
```

## Endpoint `/api/chat` (compatible OpenAI)

```bash
curl http://localhost:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3.2",
    "messages": [
      {"role": "user", "content": "¿Qué es RAG?"}
    ]
  }'
```

## Desde Python

Con la librería oficial:

```bash
pip install ollama
```

```python
import ollama

response = ollama.chat(
    model="llama3.2",
    messages=[{"role": "user", "content": "¿Qué es un embedding?"}]
)
print(response["message"]["content"])
```

Con la librería de OpenAI apuntando a Ollama:

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama",  # cualquier valor no vacío
)

response = client.chat.completions.create(
    model="llama3.2",
    messages=[{"role": "user", "content": "¿Qué es un embedding?"}]
)
print(response.choices[0].message.content)
```

Ver el experimento: [Llamada a la API de Ollama con curl](/experiments/ollama-api-curl)

## Referencias

- [Documentación de la API](https://github.com/ollama/ollama/blob/main/docs/api.md)
- [Librería Python de Ollama](https://github.com/ollama/ollama-python)
- [Compatibilidad con la API de OpenAI](https://github.com/ollama/ollama/blob/main/docs/openai.md)
