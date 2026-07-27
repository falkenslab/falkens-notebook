---
sidebar_position: 5
---

# datasets

`datasets` carga y procesa conjuntos de datos que no caben en RAM. Por dentro usa Apache Arrow y mapeo en memoria: un dataset de 200 GB se abre igual de rápido que uno de 200 MB, porque no se carga entero.

```bash
pip install datasets
```

## Cargar

```python
from datasets import load_dataset

# Del Hub
ds = load_dataset("HuggingFaceH4/ultrachat_200k")

# Solo una partición
train = load_dataset("HuggingFaceH4/ultrachat_200k", split="train_sft")

# Ficheros locales
ds = load_dataset("json", data_files="mis_datos.jsonl")
ds = load_dataset("csv", data_files={"train": "tren.csv", "test": "prueba.csv"})
```

## Experimento: streaming, o cómo abrir 400 GB en un portátil

**Contexto:** los datasets de pre-entrenamiento pesan cientos de gigas. El modo streaming permite trabajar con ellos sin descargarlos, algo esencial cuando el disco de la instancia se factura por GB.

```python
from datasets import load_dataset

ds = load_dataset("HuggingFaceFW/fineweb-2", "spa_Latn", split="train", streaming=True)

for i, ejemplo in enumerate(ds.take(3)):
    print(f"--- Documento {i + 1} ---")
    print(f"url:    {ejemplo['url'][:70]}")
    print(f"tokens: {ejemplo['token_count']}")
    print(f"texto:  {ejemplo['text'][:120]}...")
    print()
```

**Resultado:**
```
--- Documento 1 ---
url:    https://www.ayuntamiento-ejemplo.es/noticias/apertura-biblioteca
tokens: 412
texto:  La biblioteca municipal reabrirá sus puertas el próximo lunes tras las obras de
        rehabilitación que han durado seis...

--- Documento 2 ---
url:    https://blog.cocinatradicional.es/recetas/fabada-asturiana
tokens: 1187
texto:  La fabada asturiana es uno de los platos más representativos de la gastronomía
        del norte de España. Para prepararla...

--- Documento 3 ---
url:    https://foro.mecanicos.net/hilo/cambio-de-embrague-clio
tokens: 863
texto:  Buenas a todos, tengo un Clio del 2011 y me han dicho en el taller que el
        embrague está para cambiar...
```

**Qué aprender:** con `streaming=True` los datos llegan bajo demanda: se descargaron unos pocos MB en lugar de cientos de GB. La contrapartida es que no puedes hacer `len(ds)` ni indexar por posición — el dataset es un iterador, no una lista. Es el modo correcto para explorar antes de comprometerte a descargar.

## Transformar

`map` aplica una función a todo el dataset, con procesamiento por lotes y en paralelo:

```python
def tokenizar(lote):
    return tok(lote["text"], truncation=True, max_length=512)

ds_tok = ds.map(tokenizar, batched=True, num_proc=4, remove_columns=ds.column_names)
```

`filter`, `shuffle`, `select` y `train_test_split` completan lo habitual:

```python
ds = ds.filter(lambda x: len(x["text"]) > 200)
ds = ds.shuffle(seed=42)
particiones = ds.train_test_split(test_size=0.1, seed=42)
```

## Experimento: preparar un dataset de instrucciones para fine-tuning

**Contexto:** el formato en que entregas los datos determina si el fine-tuning aprende algo. Este es el paso que va justo antes de alquilar la GPU.

```python
from datasets import load_dataset
from transformers import AutoTokenizer

tok = AutoTokenizer.from_pretrained("Qwen/Qwen2.5-1.5B-Instruct")
ds = load_dataset("json", data_files="instrucciones.jsonl", split="train")
print(f"Ejemplos cargados: {len(ds)}")
print(f"Columnas: {ds.column_names}")

def formatear(ej):
    mensajes = [
        {"role": "user", "content": ej["pregunta"]},
        {"role": "assistant", "content": ej["respuesta"]},
    ]
    return {"text": tok.apply_chat_template(mensajes, tokenize=False)}

ds = ds.map(formatear, remove_columns=ds.column_names)
ds = ds.map(lambda e: {"n_tokens": len(tok(e["text"]).input_ids)})

import statistics
longitudes = ds["n_tokens"]
print(f"\nTokens por ejemplo — mediana: {statistics.median(longitudes):.0f}, "
      f"p95: {sorted(longitudes)[int(len(longitudes) * 0.95)]}, "
      f"máx: {max(longitudes)}")
print(f"Total de tokens de entrenamiento: {sum(longitudes):,}")
print(f"\nPrimer ejemplo formateado:\n{ds[0]['text'][:200]}")
```

**Resultado:**
```
Ejemplos cargados: 1843
Columnas: ['pregunta', 'respuesta']

Tokens por ejemplo — mediana: 187, p95: 622, máx: 2914
Total de tokens de entrenamiento: 412,668

Primer ejemplo formateado:
<|im_start|>user
¿Cómo configuro el modelo por defecto en Ollama?<|im_end|>
<|im_start|>assistant
Puedes fijarlo con la variable de entorno OLLAMA_MODEL o pasando el nombre
directamente a `ollama run`...
```

**Qué aprender:** la distribución de longitudes decide el `max_length` del entrenamiento. Con mediana 187 y p95 en 622, poner `max_length=1024` cubre el 99% de los ejemplos sin desperdiciar memoria en padding; ponerlo en 2914 para salvar un único ejemplo largo multiplicaría el consumo de VRAM. Los 412.668 tokens totales también permiten estimar el tiempo: 3 épocas en una RTX 4090 son unos 20 minutos, es decir, ~0,13 $ en [Vast.ai](/notes/tools/gpu-cloud/vast-ai/precios).

## Subir un dataset propio

```python
ds.push_to_hub("falkenslab/mi-dataset", private=True)
```

O desde el CLI:

```bash
hf upload falkenslab/mi-dataset ./data --repo-type=dataset
```

## Referencias

- [datasets — Documentación](https://huggingface.co/docs/datasets)
- [Modo streaming](https://huggingface.co/docs/datasets/stream)
- [Datasets del Hub](https://huggingface.co/datasets)
- [transformers](/notes/tools/huggingface/transformers)
- [Inference Providers](/notes/tools/huggingface/inference-providers) — Siguiente paso
