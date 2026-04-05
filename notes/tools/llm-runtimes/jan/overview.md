---
sidebar_position: 1
---

# Jan

Alternativa open source a ChatGPT que funciona 100% offline. Interfaz limpia con hub de modelos integrado (GGUF desde HuggingFace) y soporte para proveedores cloud (OpenAI, Anthropic, Groq...).

## Características principales

- API local compatible con OpenAI en `localhost:1337`
- Integración con MCP (Model Context Protocol) para capacidades agénticas
- Motor basado en llama.cpp (CPU) y TensorRT-LLM (GPU NVIDIA)
- **Jan Server**: versión para equipos con autenticación OAuth/OIDC, observabilidad OpenTelemetry y orquestación de herramientas

## API local

Jan expone un servidor compatible con la API de OpenAI en `localhost:1337`:

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:1337/v1",
    api_key="jan",  # cualquier valor no vacío
)

response = client.chat.completions.create(
    model="llama3.2",
    messages=[{"role": "user", "content": "¿Qué es MCP?"}]
)
print(response.choices[0].message.content)
```

## Referencias

- [Jan.ai — Sitio oficial](https://jan.ai)
- [Jan.ai — Documentación](https://www.jan.ai/docs)
- [Jan — GitHub](https://github.com/janhq/jan)
