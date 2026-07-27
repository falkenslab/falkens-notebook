---
sidebar_position: 7
---

# Spaces

Un **Space** es una aplicación web desplegada desde un repositorio del Hub. Es la forma más rápida de convertir un script en algo que otra persona pueda usar sin instalar nada.

| SDK | Para qué |
| --- | -------- |
| **Gradio** | Demos de modelos. El más usado, y el que menos código pide |
| **Streamlit** | Cuadros de mando y apps de datos |
| **Docker** | Cualquier cosa: FastAPI, Next.js, lo que sea |
| **Static** | HTML/JS puro |

El hardware gratuito es CPU (2 vCPU, 16 GB de RAM) y se duerme tras un rato sin uso. Las GPU son de pago por hora, y para demos que solo se usan a ratos suele salir mejor llamar a [Inference Providers](/notes/tools/huggingface/inference-providers) desde un Space de CPU que pagar una GPU encendida.

## Estructura mínima de un Space

```
app.py             # la aplicación
requirements.txt   # dependencias
README.md          # con la configuración en el frontmatter YAML
```

El `README.md` lleva la configuración del despliegue en su frontmatter:

```yaml
title: Clasificador de sentimiento
emoji: 🔬
colorFrom: indigo
colorTo: purple
sdk: gradio
sdk_version: 5.9.1
app_file: app.py
pinned: false
```

## Experimento: publicar una demo funcional en cinco minutos

**Contexto:** el valor de un Space es enseñar un resultado sin pedirle a nadie que clone un repo. Este es el ciclo completo, de fichero local a URL pública.

```python
# app.py
import gradio as gr
from transformers import pipeline

clasificador = pipeline("sentiment-analysis", model="pysentimiento/robertuito-sentiment-analysis")

ETIQUETAS = {"POS": "Positivo", "NEG": "Negativo", "NEU": "Neutro"}

def analizar(texto):
    if not texto.strip():
        return {}
    resultados = clasificador(texto, top_k=None)
    return {ETIQUETAS.get(r["label"], r["label"]): r["score"] for r in resultados}

demo = gr.Interface(
    fn=analizar,
    inputs=gr.Textbox(lines=3, placeholder="Escribe algo en español..."),
    outputs=gr.Label(num_top_classes=3),
    title="Análisis de sentimiento en español",
    examples=[
        "El servicio fue rapidísimo y el trato excelente",
        "Llevo tres semanas esperando una respuesta",
        "El paquete llegó el martes",
    ],
)

demo.launch()
```

```bash
# requirements.txt
echo -e "gradio\ntransformers\ntorch" > requirements.txt

# Crear el Space y subirlo
hf repos create demo-sentimiento --repo-type space --sdk gradio
hf upload demo-sentimiento . . --repo-type space
```

**Resultado:**
```
Successfully created space: https://huggingface.co/spaces/falkenslab/demo-sentimiento

Uploading files... 3 files
  app.py              1.1 kB
  requirements.txt      31 B
  README.md            284 B
Done.

# El Space construye y arranca solo. Estado tras ~90 s:
Building  -> Running
URL: https://falkenslab-demo-sentimiento.hf.space
```

**Qué aprender:** no hay Dockerfile, ni servidor, ni certificado TLS que configurar. El commit dispara el build, igual que en Vercel o Netlify. La primera petición tras un rato dormido tarda unos segundos en despertar el contenedor: es el precio del hardware gratuito, y se nota si compartes el enlace en una charla.

## Experimento: Space de CPU que llama a una GPU remota

**Contexto:** una demo con un modelo grande en GPU cuesta dinero encendida 24/7. Delegar la inferencia deja el Space en el hardware gratuito y el gasto proporcional al uso real.

```python
# app.py
import os
import gradio as gr
from openai import OpenAI

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.environ["HF_TOKEN"],   # se define como Secret del Space
)

def responder(mensaje, historial):
    mensajes = [{"role": "system", "content": "Responde en español, de forma breve y concreta."}]
    for usuario, asistente in historial:
        mensajes += [{"role": "user", "content": usuario},
                     {"role": "assistant", "content": asistente}]
    mensajes.append({"role": "user", "content": mensaje})

    flujo = client.chat.completions.create(
        model="openai/gpt-oss-120b:fastest",
        messages=mensajes,
        stream=True,
    )
    parcial = ""
    for trozo in flujo:
        if trozo.choices[0].delta.content:
            parcial += trozo.choices[0].delta.content
            yield parcial

gr.ChatInterface(responder, title="Chat con gpt-oss-120b").launch()
```

**Resultado:**
```
Hardware:  CPU basic (gratis)
Modelo:    openai/gpt-oss-120b (120B parámetros)
Coste:     0 $/h de Space + consumo por token del router
Latencia:  primer token en ~0.4 s
```

**Qué aprender:** un Space gratuito de CPU sirviendo un modelo de 120.000 millones de parámetros. La clave es que el Space no ejecuta el modelo, solo es la interfaz. El token va en **Secrets** (ajustes del Space), nunca en el código: cualquiera puede leer los ficheros de un Space público.

## Detalles que ahorran disgustos

- **Secrets vs. variables** — los Secrets no se muestran ni en los logs; las variables sí. Los tokens van siempre en Secrets.
- **Duerme a los 48 h de inactividad** en el nivel gratuito. Un Space que enlazas en un CV conviene fijarlo (`pinned`).
- **`sdk_version` importa** — Gradio rompe compatibilidad entre mayores. Fija la versión en el README.
- **El disco no es persistente** salvo que contrates almacenamiento: lo que escribas en disco desaparece al reiniciar.
- **Con `spaces.GPU` (ZeroGPU)** una cuenta PRO puede pedir GPU solo durante la función, sin pagarla encendida.

## Referencias

- [Spaces — Documentación](https://huggingface.co/docs/hub/spaces)
- [Gradio — Documentación](https://www.gradio.app/docs)
- [Configuración de Spaces](https://huggingface.co/docs/hub/spaces-config-reference)
- [Inference Providers](/notes/tools/huggingface/inference-providers)
- [Qué es Hugging Face](/notes/tools/huggingface/intro)
