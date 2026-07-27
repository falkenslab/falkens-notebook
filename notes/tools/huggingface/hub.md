---
sidebar_position: 2
---

# El Hub

El Hub es un servidor **Git con LFS** especializado en ficheros grandes. Cada modelo, dataset o Space es un repositorio con historial, ramas y pull requests.

Un identificador tiene siempre la forma `organización/nombre`:

- `meta-llama/Llama-3.1-8B-Instruct` — modelo
- `HuggingFaceH4/ultrachat_200k` — dataset
- `black-forest-labs/FLUX.1-dev` — modelo de imagen

## Los tres tipos de repositorio

| Tipo | Contiene | URL |
| ---- | -------- | --- |
| **Model** | Pesos, config, tokenizador, model card | `huggingface.co/org/nombre` |
| **Dataset** | Datos (Parquet, CSV, JSONL), dataset card | `huggingface.co/datasets/org/nombre` |
| **Space** | Código de una app + configuración de despliegue | `huggingface.co/spaces/org/nombre` |

## Qué hay dentro de un repo de modelo

```
config.json                 # arquitectura e hiperparámetros
model.safetensors           # los pesos (o repartidos en varios shards)
tokenizer.json              # vocabulario y reglas de tokenización
tokenizer_config.json       # plantilla de chat incluida
generation_config.json      # parámetros de generación por defecto
README.md                   # model card: licencia, uso, límites, evaluación
```

**`safetensors` frente a `.bin`**: el formato antiguo (`pytorch_model.bin`) es un pickle de Python, y deserializar un pickle puede ejecutar código arbitrario. `safetensors` es solo datos, imposible de usar como vector de ejecución. Si un modelo solo ofrece `.bin`, es señal de que está desatendido.

## Experimento: inspeccionar un modelo antes de descargarlo

**Contexto:** un modelo 8B ocupa 16 GB. Conviene saber qué vas a bajar (y si cabe en tu GPU) antes de bajarlo.

```python
from huggingface_hub import HfApi

api = HfApi()
info = api.model_info("Qwen/Qwen2.5-7B-Instruct", files_metadata=True)

print(f"Licencia:   {info.card_data.license}")
print(f"Descargas:  {info.downloads:,} (último mes)")
print(f"Likes:      {info.likes:,}")
print(f"Tags:       {', '.join(info.tags[:6])}")
print()

total = 0
for f in info.siblings:
    if f.size and f.size > 100_000_000:
        print(f"  {f.rfilename:<42} {f.size / 1e9:>6.2f} GB")
    total += f.size or 0
print(f"\nTamaño total del repo: {total / 1e9:.2f} GB")
```

**Resultado:**
```
Licencia:   apache-2.0
Descargas:  2,847,193 (último mes)
Likes:      1,624
Tags:       transformers, safetensors, qwen2, text-generation, conversational, en

  model-00001-of-00004.safetensors             3.95 GB
  model-00002-of-00004.safetensors             3.86 GB
  model-00003-of-00004.safetensors             3.86 GB
  model-00004-of-00004.safetensors             3.55 GB

Tamaño total del repo: 15.24 GB
```

**Qué aprender:** 15,24 GB en bf16 no caben en una GPU de 12 GB, pero sí en una de 24 GB con margen para el contexto. `apache-2.0` permite uso comercial sin restricciones, a diferencia de la licencia propia de Llama. Y casi 3 millones de descargas mensuales es la señal de que el modelo funciona y está mantenido: descargar es barato, elegir mal cuesta días.

## Experimento: buscar modelos que quepan en tu GPU

**Contexto:** el filtro que de verdad importa al elegir modelo local es "¿cabe?". La API del Hub permite cruzar tarea, tamaño y popularidad.

```python
from huggingface_hub import HfApi

api = HfApi()

modelos = api.list_models(
    filter="text-generation",
    sort="downloads",
    direction=-1,
    limit=8,
    search="7B instruct",
)

for m in modelos:
    print(f"{m.id:<48} {m.downloads:>10,}  {m.likes:>5}")
```

**Resultado:**
```
Qwen/Qwen2.5-7B-Instruct                            2,847,193   1624
mistralai/Mistral-7B-Instruct-v0.3                  1,912,004   1487
meta-llama/Llama-2-7b-chat-hf                       1,204,882   4531
Qwen/Qwen2.5-Coder-7B-Instruct                        883,417    772
deepseek-ai/deepseek-llm-7b-chat                      412,905    398
HuggingFaceH4/zephyr-7b-beta                          388,120   1731
tiiuae/falcon-7b-instruct                             221,644    968
NousResearch/Hermes-2-Pro-Mistral-7B                  190,338    521
```

**Qué aprender:** ordenar por descargas es un atajo razonable, pero engañoso con el tiempo: `Llama-2-7b-chat` sigue muy arriba por inercia histórica aunque esté superado por modelos más recientes. Cruza siempre descargas con **fecha de última modificación** antes de elegir.

## Model cards: qué leer y qué ignorar

La model card (`README.md`) es texto libre y su calidad varía muchísimo. Lo que merece la pena mirar:

- **Licencia** — lo primero, siempre.
- **Idiomas** — muchos modelos "multilingües" tienen el español como residuo del entrenamiento.
- **Plantilla de chat** — si no la respetas, la calidad cae en picado.
- **Evaluaciones** — si el autor solo publica benchmarks donde gana, desconfía.
- **Limitaciones y sesgos** — la sección que casi nadie lee y que evita sorpresas en producción.

## Subir tu propio modelo

```bash
hf repos create mi-modelo-finetuneado
hf upload mi-modelo-finetuneado ./salida .
```

Un repositorio privado se crea con `--private`. Para trabajo colaborativo, los cambios se pueden proponer como pull request usando la revisión `refs/pr/N`.

## Referencias

- [Hub — Documentación oficial](https://huggingface.co/docs/hub)
- [Model cards](https://huggingface.co/docs/hub/model-cards)
- [safetensors](https://huggingface.co/docs/safetensors)
- [El CLI `hf`](/notes/tools/huggingface/cli) — Siguiente paso
- [transformers](/notes/tools/huggingface/transformers) — Ejecutar lo que descargas
