---
date: 2026-04-05
slug: lmstudio-api-openai
title: LM Studio como backend de la API de OpenAI
tags: [LM-Studio, OpenAI, API, local]
---

Reutilizar código escrito para la API de OpenAI apuntando a un modelo local en LM Studio, sin coste por token.

<!-- truncate -->

## Experimento: usar LM Studio como backend de la API de OpenAI

**Contexto:** LM Studio permite reutilizar código escrito para la API de OpenAI apuntando a un modelo local sin coste por token.

```python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")

response = client.chat.completions.create(
    model="llama3.2",
    messages=[{"role": "user", "content": "Explica qué es la cuantización en una frase."}]
)
print(response.choices[0].message.content)
```

**Resultado:**
```
La cuantización reduce la precisión numérica de los pesos de un modelo (por ejemplo,
de 32 bits a 4 bits) para disminuir su tamaño en memoria y acelerar la inferencia,
con una pequeña pérdida de calidad.
```

**Qué aprender:** con LM Studio arrancado en modo servidor, el mismo código que usas con la API de OpenAI funciona en local sin modificaciones, solo cambiando `base_url`.

## Referencias

- [LM Studio — Sitio oficial](https://lmstudio.ai)
- [Notas: LM Studio](/docs/tools/llm-runtimes/lmstudio/overview)
