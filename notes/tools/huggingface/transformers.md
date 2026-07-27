---
sidebar_position: 4
---

# transformers

`transformers` es la librería que unifica el acceso a miles de modelos bajo una misma API. Da igual si por dentro es un Llama, un Qwen o un BERT: se carga igual.

```bash
pip install transformers torch
```

## Los dos niveles de la API

**`pipeline`** — el camino corto. Elige tokenizador, dispositivo y post-proceso por ti.

```python
from transformers import pipeline

generador = pipeline("text-generation", model="Qwen/Qwen2.5-1.5B-Instruct")
print(generador("La capital de Francia es", max_new_tokens=20)[0]["generated_text"])
```

**`AutoModel` + `AutoTokenizer`** — control completo: cuantización, dispositivo, batching, streaming.

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

tok = AutoTokenizer.from_pretrained("Qwen/Qwen2.5-1.5B-Instruct")
modelo = AutoModelForCausalLM.from_pretrained(
    "Qwen/Qwen2.5-1.5B-Instruct",
    dtype="auto",
    device_map="auto",
)
```

## Experimento: la plantilla de chat no es opcional

**Contexto:** un error clásico es pasarle al modelo el texto del usuario tal cual. Los modelos *instruct* se entrenaron con un formato concreto de turnos, y saltárselo degrada la respuesta sin que salte ningún error.

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

nombre = "Qwen/Qwen2.5-1.5B-Instruct"
tok = AutoTokenizer.from_pretrained(nombre)
modelo = AutoModelForCausalLM.from_pretrained(nombre, dtype="auto", device_map="auto")

pregunta = "Explica en una frase qué es un embedding."

# MAL: texto crudo, sin plantilla
crudo = tok(pregunta, return_tensors="pt").to(modelo.device)
salida_mal = modelo.generate(**crudo, max_new_tokens=60, do_sample=False)
print("SIN plantilla:")
print(tok.decode(salida_mal[0][crudo.input_ids.shape[-1]:], skip_special_tokens=True))

# BIEN: aplicando la plantilla de chat del modelo
mensajes = [{"role": "user", "content": pregunta}]
texto = tok.apply_chat_template(mensajes, tokenize=False, add_generation_prompt=True)
entrada = tok(texto, return_tensors="pt").to(modelo.device)
salida_bien = modelo.generate(**entrada, max_new_tokens=60, do_sample=False)
print("\nCON plantilla:")
print(tok.decode(salida_bien[0][entrada.input_ids.shape[-1]:], skip_special_tokens=True))
```

**Resultado:**
```
SIN plantilla:
 ¿Qué es un modelo de lenguaje? Explica en una frase qué es el fine-tuning.
Explica en una frase qué es un token. Explica en una frase qué es

CON plantilla:
Un embedding es una representación numérica de un texto en forma de vector, donde
la distancia entre vectores refleja la similitud semántica entre los textos que
representan.
```

**Qué aprender:** sin plantilla el modelo sigue en modo "completar texto" y continúa la lista de preguntas en vez de responder. `apply_chat_template` inserta los tokens especiales (`<|im_start|>`, `<|im_end|>` en Qwen) que activan el comportamiento de asistente. Es la diferencia entre un modelo "que no funciona" y uno mal invocado.

## Experimento: cuantizar para que quepa

**Contexto:** un modelo 7B en bf16 necesita ~15 GB solo de pesos. Cuantizar a 4 bits lo baja a ~4 GB y lo hace ejecutable en una GPU de consumo, a costa de algo de calidad.

```python
import torch
from transformers import AutoModelForCausalLM, BitsAndBytesConfig

nombre = "Qwen/Qwen2.5-7B-Instruct"

config_4bit = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True,
)

modelo = AutoModelForCausalLM.from_pretrained(nombre, quantization_config=config_4bit, device_map="auto")

memoria = modelo.get_memory_footprint() / 1e9
print(f"Memoria ocupada por los pesos: {memoria:.2f} GB")
print(f"VRAM reservada por torch:      {torch.cuda.memory_reserved() / 1e9:.2f} GB")
```

**Resultado:**
```
Memoria ocupada por los pesos: 4.61 GB
VRAM reservada por torch:      5.18 GB
```

**Qué aprender:** de 15,2 GB a 4,6 GB: el mismo modelo que no cabía en una RTX 3060 de 12 GB ahora deja 7 GB libres para el contexto y el batch. La cuantización NF4 con doble cuantización pierde muy poca calidad en tareas de chat; se nota más en razonamiento matemático y generación de código largo. Si tienes VRAM de sobra, no cuantices: es más lento por token que bf16.

## Experimento: generación en streaming

**Contexto:** esperar 20 segundos a que aparezca un párrafo entero se percibe como que la aplicación está colgada. El streaming cambia por completo la sensación de latencia sin cambiar el tiempo total.

```python
from threading import Thread
from transformers import AutoModelForCausalLM, AutoTokenizer, TextIteratorStreamer

nombre = "Qwen/Qwen2.5-1.5B-Instruct"
tok = AutoTokenizer.from_pretrained(nombre)
modelo = AutoModelForCausalLM.from_pretrained(nombre, dtype="auto", device_map="auto")

mensajes = [{"role": "user", "content": "Enumera tres usos de los embeddings."}]
texto = tok.apply_chat_template(mensajes, tokenize=False, add_generation_prompt=True)
entrada = tok(texto, return_tensors="pt").to(modelo.device)

streamer = TextIteratorStreamer(tok, skip_prompt=True, skip_special_tokens=True)
Thread(target=modelo.generate, kwargs=dict(**entrada, max_new_tokens=120, streamer=streamer)).start()

for fragmento in streamer:
    print(fragmento, end="", flush=True)
```

**Resultado:**
```
1. Búsqueda semántica: encontrar documentos por significado y no por
   coincidencia exacta de palabras.
2. Sistemas RAG: recuperar los fragmentos relevantes de una base de
   conocimiento antes de generar la respuesta.
3. Clasificación y agrupamiento: detectar duplicados, agrupar tickets
   de soporte o recomendar contenido similar.
```

**Qué aprender:** `TextIteratorStreamer` requiere lanzar `generate` en otro hilo, porque es una llamada bloqueante. El primer token aparece en ~200 ms mientras la respuesta completa tarda 4 s: el tiempo total es el mismo, pero la percepción de velocidad cambia radicalmente.

## Tareas soportadas por `pipeline`

| Tarea | Para qué |
| ----- | -------- |
| `text-generation` | LLMs conversacionales |
| `feature-extraction` | [Embeddings](/notes/models/embeddings) |
| `sentiment-analysis` | Clasificación de texto |
| `zero-shot-classification` | Clasificar con etiquetas arbitrarias sin entrenar |
| `automatic-speech-recognition` | Voz a texto (Whisper) |
| `image-text-to-text` | Modelos multimodales (visión + lenguaje) |
| `summarization`, `translation`, `ner` | Tareas clásicas de NLP |

## Referencias

- [transformers — Documentación](https://huggingface.co/docs/transformers)
- [Plantillas de chat](https://huggingface.co/docs/transformers/chat_templating)
- [Cuantización](https://huggingface.co/docs/transformers/quantization/overview)
- [datasets](/notes/tools/huggingface/datasets) — Siguiente paso
- [Embeddings](/notes/models/embeddings) — Concepto relacionado
