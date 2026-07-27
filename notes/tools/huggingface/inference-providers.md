---
sidebar_position: 6
---

# Inference Providers

Ejecutar un modelo abierto no siempre significa alojarlo. **Inference Providers** es un router: un único token de Hugging Face y una API compatible con OpenAI que enruta hacia más de quince proveedores de inferencia (Groq, Together, Cerebras, Fireworks, Novita, Replicate, fal, Scaleway, Z.ai...).

La ventaja es que el mismo código sirve para cualquier modelo abierto sin atarte a un proveedor, y sin recargo sobre la tarifa del proveedor. Hay un nivel gratuito para empezar.

## La forma más rápida: cliente de OpenAI

Solo cambia la `base_url`:

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.environ["HF_TOKEN"],
)

completion = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    messages=[{"role": "user", "content": "¿Qué es un embedding?"}],
)
print(completion.choices[0].message.content)
```

O con `curl`:

```bash
curl https://router.huggingface.co/v1/chat/completions \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "openai/gpt-oss-120b",
    "messages": [{"role": "user", "content": "¿Qué es un embedding?"}]
  }'
```

## Políticas de selección de proveedor

Un mismo modelo suele estar servido por varios proveedores a precios y velocidades distintas. El sufijo del identificador decide cuál se usa:

| Sufijo | Qué elige |
| ------ | --------- |
| `:fastest` | Mayor throughput en tokens/s (**por defecto**) |
| `:cheapest` | Menor precio por token de salida |
| `:preferred` | Tu orden de preferencia configurado en la cuenta |
| `:groq`, `:together`, ... | Un proveedor concreto |

```python
model="openai/gpt-oss-120b:cheapest"
```

## Experimento: el mismo modelo cuesta y corre distinto según el proveedor

**Contexto:** la promesa del router es que no hace falta comparar proveedores a mano. Merece la pena ver cuánta diferencia hay realmente entre `:fastest` y `:cheapest`.

```python
import os, time
from openai import OpenAI

client = OpenAI(base_url="https://router.huggingface.co/v1", api_key=os.environ["HF_TOKEN"])
pregunta = [{"role": "user", "content": "Explica en 100 palabras qué es RAG."}]

for politica in ("openai/gpt-oss-120b:fastest", "openai/gpt-oss-120b:cheapest"):
    t0 = time.perf_counter()
    r = client.chat.completions.create(model=politica, messages=pregunta, max_tokens=200)
    dt = time.perf_counter() - t0
    tokens = r.usage.completion_tokens
    print(f"{politica:<34} {tokens:>4} tok  {dt:>5.2f}s  {tokens / dt:>6.1f} tok/s")
```

**Resultado:**
```
openai/gpt-oss-120b:fastest         148 tok   0.63s   234.9 tok/s
openai/gpt-oss-120b:cheapest        152 tok   3.41s    44.6 tok/s
```

**Qué aprender:** cinco veces más rápido con `:fastest`. Para un chat interactivo esa diferencia es la que separa "instantáneo" de "se nota la espera"; para un trabajo por lotes de 100.000 documentos, `:cheapest` es lo sensato porque nadie está mirando la pantalla. La misma llamada, un sufijo distinto.

## Experimento: listar qué modelos están servidos ahora mismo

**Contexto:** no todos los modelos del Hub tienen proveedor activo. Antes de escribir código conviene saber cuáles responden.

```bash
hf models ls --warm --limit 8
```

**Resultado:**
```
ID                                        PROVIDERS                         CONTEXT
openai/gpt-oss-120b                       groq, cerebras, together, fire...   131072
deepseek-ai/DeepSeek-R1                   novita, together, fireworks          65536
Qwen/Qwen2.5-72B-Instruct                 together, novita, hyperbolic        131072
meta-llama/Llama-3.3-70B-Instruct         groq, together, cerebras, novita    131072
mistralai/Mistral-Small-24B-Instruct      together, novita                     32768
black-forest-labs/FLUX.1-dev              fal-ai, replicate, nscale                -
Qwen/Qwen2.5-VL-72B-Instruct              novita, hyperbolic                  131072
openai/whisper-large-v3                   fal-ai, hf-inference                     -
```

**Qué aprender:** `--warm` filtra por modelos con al menos un proveedor activo, que es la diferencia entre un modelo que puedes llamar hoy y uno que tendrías que desplegar tú. Añade `--json` para consumirlo desde un script.

## Más allá del chat

El endpoint OpenAI-compatible cubre solo chat. Para el resto de tareas se usa `InferenceClient`, que además elige proveedor automáticamente:

```python
from huggingface_hub import InferenceClient

client = InferenceClient()

# Texto a imagen
imagen = client.text_to_image(
    prompt="Un cuaderno de laboratorio abierto sobre una mesa de madera, luz cálida",
    model="black-forest-labs/FLUX.1-dev",
)
imagen.save("cuaderno.png")

# Embeddings
vector = client.feature_extraction("El gato duerme", model="intfloat/multilingual-e5-large")

# Voz a texto
texto = client.automatic_speech_recognition("audio.mp3", model="openai/whisper-large-v3")
```

## Cuándo usar esto y cuándo no

| Situación | Mejor opción |
| --------- | ------------ |
| Prototipar con modelos abiertos grandes | **Inference Providers** |
| Volumen bajo o irregular | **Inference Providers** |
| Privacidad total, datos que no salen | [Ollama en local](/notes/tools/llm-runtimes/ollama/intro) |
| Volumen alto y sostenido | [GPU alquilada](/notes/tools/gpu-cloud/intro) con vLLM |
| Modelo propio tras un fine-tuning | GPU alquilada o endpoint dedicado |

## Referencias

- [Inference Providers — Documentación](https://huggingface.co/docs/inference-providers)
- [Precios y facturación](https://huggingface.co/docs/inference-providers/pricing)
- [Inference Playground](https://huggingface.co/playground)
- [Spaces](/notes/tools/huggingface/spaces) — Siguiente paso
- [Alquilar GPUs por horas](/notes/tools/gpu-cloud/intro) — La alternativa cuando el volumen crece
