---
sidebar_position: 1
---

# Qué es Hugging Face

[Hugging Face](https://huggingface.co) es la infraestructura común del open source en IA. Cuando alguien publica un modelo abierto —Meta con Llama, Mistral, Qwen, DeepSeek, OpenAI con gpt-oss— lo publica ahí. Cuando [Ollama](/notes/tools/llm-runtimes/ollama/intro) descarga un GGUF, lo descarga de ahí.

Es a la vez un **repositorio** (como GitHub, pero para pesos y datos), un **conjunto de librerías** y una **plataforma de ejecución**.

## Las piezas

| Pieza | Qué es | Nota |
| ----- | ------ | ---- |
| **Hub** | Repositorios Git con LFS para modelos, datasets y Spaces | [Ver nota](/notes/tools/huggingface/hub) |
| **`hf` (CLI)** | Cliente de línea de comandos del Hub | [Ver nota](/notes/tools/huggingface/cli) |
| **`transformers`** | Cargar y ejecutar modelos con una API común | [Ver nota](/notes/tools/huggingface/transformers) |
| **`datasets`** | Cargar datasets enormes sin llenar el disco | [Ver nota](/notes/tools/huggingface/datasets) |
| **Inference Providers** | Una API OpenAI-compatible sobre 15+ proveedores | [Ver nota](/notes/tools/huggingface/inference-providers) |
| **Spaces** | Desplegar demos (Gradio, Streamlit, Docker) | [Ver nota](/notes/tools/huggingface/spaces) |

Alrededor hay más librerías: `peft` (fine-tuning eficiente con LoRA), `accelerate` (entrenamiento multi-GPU), `diffusers` (imagen y vídeo), `sentence-transformers` ([embeddings](/notes/models/embeddings)), `trl` (RLHF y DPO), `safetensors` (formato de pesos seguro).

## Experimento: cuántos modelos hay realmente

**Contexto:** el tamaño del catálogo explica por qué el Hub es el punto de partida de casi cualquier proyecto de IA: casi nunca hay que entrenar desde cero.

```python
from huggingface_hub import HfApi

api = HfApi()

for tarea in ["text-generation", "text-to-image", "automatic-speech-recognition",
              "feature-extraction", "image-text-to-text"]:
    modelos = api.list_models(filter=tarea, limit=None)
    total = sum(1 for _ in modelos)
    print(f"{tarea:<32} {total:>8,}")
```

**Resultado:**
```
text-generation                   271,436
text-to-image                      94,812
automatic-speech-recognition       31,205
feature-extraction                 27,940
image-text-to-text                 18,673
```

**Qué aprender:** hay más de un cuarto de millón de modelos solo de generación de texto. El problema real no es encontrar un modelo, es **filtrar**: por licencia, por tamaño, por si alguien lo ha evaluado. De ahí que el Hub dé descargas, likes y tendencias — son la señal social que sustituye a una evaluación propia cuando no tienes tiempo de hacerla.

## Experimento: de cero a una respuesta en cuatro líneas

**Contexto:** el argumento de venta de `transformers` es que la misma API sirve para cualquier modelo y tarea. Conviene comprobar cuánto código hace falta de verdad.

```python
from transformers import pipeline

clasificador = pipeline("sentiment-analysis", model="pysentimiento/robertuito-sentiment-analysis")
print(clasificador("Este cuaderno explica las cosas sin marear con teoría"))
```

**Resultado:**
```
Device set to use cuda:0
[{'label': 'POS', 'score': 0.9931}]
```

**Qué aprender:** `pipeline` descarga el modelo, elige el tokenizador correcto, detecta la GPU y aplica el post-proceso de la tarea. Es el camino corto; cuando necesites control (cuantización, batching, generación en streaming) hay que bajar a `AutoModel`, como se ve en [la nota de transformers](/notes/tools/huggingface/transformers).

## Cuenta, tokens y licencias

- Leer modelos públicos **no requiere cuenta**. Descargar modelos "gated" (Llama, Gemma) sí: hay que aceptar la licencia en la web y usar un token.
- Los tokens se crean en [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens). Usa tokens **fine-grained** con los permisos mínimos.
- **Ojo con las licencias**: "abierto" no siempre significa "uso comercial libre". Llama tiene su propia licencia con límites, Apache-2.0 y MIT son permisivas, y algunos modelos son solo para investigación.

## Referencias

- [Hugging Face — Sitio oficial](https://huggingface.co)
- [Documentación del Hub](https://huggingface.co/docs/hub)
- [El Hub](/notes/tools/huggingface/hub) — Siguiente paso
- [Ollama](/notes/tools/llm-runtimes/ollama/intro) — Ejecutar en local los modelos del Hub
- [Vast.ai](/notes/tools/gpu-cloud/vast-ai/intro) — Alquilar la GPU cuando el modelo no cabe en local
