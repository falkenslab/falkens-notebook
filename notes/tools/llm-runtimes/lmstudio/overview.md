---
sidebar_position: 1
---

# LM Studio

Aplicación de escritorio (macOS, Windows, Linux) para descargar y ejecutar modelos GGUF con una interfaz cuidada. Incluye explorador de modelos (más de 1000 disponibles), chat, y servidor local compatible con la API de OpenAI.

## Características destacadas

- Chat con documentos locales (RAG integrado — LocalDocs)
- Servidor local con API compatible con OpenAI (`localhost:1234`)
- SDKs para Python y JavaScript
- **LM Link** (2026): conexión cifrada a instancias remotas de LM Studio
- Exportación de conversaciones a PDF, Markdown o texto plano

## Rendimiento orientativo

| Hardware      | Modelo (Q5_K_M) | Tokens/s |
| ------------- | --------------- | -------- |
| M1 MacBook    | 7B              | ~15–20   |
| M2/M3 MacBook | 7B              | ~30–50   |
| RTX 4090      | 7B              | >100     |

## API local compatible con OpenAI

Una vez arrancado el servidor en LM Studio (`localhost:1234`), cualquier aplicación que use la API de OpenAI puede apuntar a él sin cambios:

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:1234/v1",
    api_key="lm-studio",  # cualquier valor no vacío
)

response = client.chat.completions.create(
    model="llama3.2",
    messages=[{"role": "user", "content": "¿Qué es RAG?"}]
)
print(response.choices[0].message.content)
```

Ver el experimento: [LM Studio como backend de la API de OpenAI](/experiments/lmstudio-api-openai)

## Referencias

- [LM Studio — Sitio oficial](https://lmstudio.ai)
- [LM Studio — Documentación](https://lmstudio.ai/docs)
