---
sidebar_position: 3
---

# El CLI `hf`

El cliente de línea de comandos del Hub se llama **`hf`**. Antes se llamaba `huggingface-cli`; el nombre antiguo sigue funcionando pero está en desuso, así que todo lo nuevo debería usar `hf`.

## Instalación

Instalador independiente (recomendado, no necesita Python previo):

```bash
# macOS y Linux
curl -LsSf https://hf.co/cli/install.sh | bash
```

```powershell
# Windows
powershell -ExecutionPolicy ByPass -c "irm https://hf.co/cli/install.ps1 | iex"
```

O como parte de la librería de Python:

```bash
pip install -U huggingface_hub
```

Comprobar y actualizar:

```bash
hf --help
hf update
```

## Autenticación

```bash
hf auth login                      # interactivo, pide el token
hf auth login --token $HF_TOKEN    # no interactivo, para CI
hf auth whoami                     # quién soy
hf auth logout
```

El token se guarda en `~/.cache/huggingface/token`. En scripts y contenedores es mejor la variable de entorno `HF_TOKEN`, que todas las librerías leen automáticamente.

## Descargar

```bash
hf download gpt2 config.json                        # un fichero
hf download Qwen/Qwen2.5-7B-Instruct                # el repo entero
hf download HuggingFaceH4/ultrachat_200k --repo-type dataset
hf download bigcode/the-stack --repo-type dataset --revision v1.1
hf download Qwen/Qwen2.5-7B-Instruct --local-dir ./modelo   # fuera de la caché
```

Filtrar lo que se baja evita descargar duplicados en varios formatos:

```bash
hf download stabilityai/stable-diffusion-xl-base-1.0 \
  --include "*.safetensors" --exclude "*.fp16.*"
```

## Experimento: ver qué vas a descargar antes de descargarlo

**Contexto:** muchos repos contienen los mismos pesos en varios formatos. Bajarlo todo puede multiplicar por tres el tamaño y el tiempo, algo que en una [GPU alquilada por horas](/notes/tools/gpu-cloud/vast-ai/precios) se paga.

```bash
hf download Qwen/Qwen2.5-7B-Instruct --dry-run
```

**Resultado:**
```
Fetching 12 files to /home/falken/.cache/huggingface/hub/models--Qwen--Qwen2.5-7B-Instruct

  [to download]  model-00001-of-00004.safetensors      3.95 GB
  [to download]  model-00002-of-00004.safetensors      3.86 GB
  [to download]  model-00003-of-00004.safetensors      3.86 GB
  [to download]  model-00004-of-00004.safetensors      3.55 GB
  [to download]  tokenizer.json                        11.4 MB
  [to download]  vocab.json                            2.78 MB
  [to download]  merges.txt                            1.67 MB
  [cached]       config.json                            663 B
  [cached]       generation_config.json                 242 B

Total: 15.24 GB (15.23 GB to download, 0.01 GB cached)
```

**Qué aprender:** `--dry-run` distingue lo que ya está en caché de lo que va a viajar por la red. En una instancia recién creada te dice exactamente cuántos GB de disco necesitas — la causa número uno de entrenamientos que mueren a media noche es un `--disk` demasiado justo.

## Subir

```bash
hf upload mi-modelo ./salida .                        # carpeta entera
hf upload mi-modelo ./salida/adapter.safetensors      # un fichero
hf upload mi-dataset ./data /train --repo-type=dataset
hf upload mi-modelo ./salida . --commit-message="Epoch 34/50"
```

Muy útil durante un entrenamiento largo: subir los logs cada N minutos, para poder mirarlos aunque la instancia muera.

```bash
hf upload mi-modelo logs/ --every=10
```

## Experimento: la caché se come el disco

**Contexto:** `hf` cachea todo en `~/.cache/huggingface`. Tras unas semanas de pruebas, esa carpeta suele ser la más grande del sistema y nadie se acuerda de ella.

```bash
hf cache ls
```

**Resultado:**
```
ID                                       SIZE     LAST_ACCESSED LAST_MODIFIED REFS
---------------------------------------- -------- ------------- ------------- ----
model/black-forest-labs/FLUX.1-dev          23.8G 1 month ago   1 month ago   main
model/meta-llama/Llama-3.1-8B-Instruct      16.1G 3 weeks ago   3 weeks ago   main
model/Qwen/Qwen2.5-7B-Instruct              15.2G 2 days ago    2 days ago    main
model/mistralai/Mistral-7B-Instruct-v0.3    14.5G 2 months ago  2 months ago  main
dataset/HuggingFaceH4/ultrachat_200k         1.6G 3 weeks ago   3 weeks ago   main
model/sentence-transformers/all-MiniLM-L6   90.9M 4 hours ago   2 months ago  main

Found 6 repo(s) for a total of 8 revision(s) and 71.3G on disk.
```

**Qué aprender:** 71 GB acumulados casi sin darse cuenta, y cuatro de esos repos no se tocan desde hace más de tres semanas. Se limpia encadenando los dos comandos —`--quiet` imprime solo los IDs, que se le pasan a `rm`:

```bash
hf cache rm $(hf cache ls --filter "accessed>1mo" --quiet) -y
hf cache prune -y    # revisiones huérfanas
```

En una instancia alquilada conviene además apuntar `HF_HOME` al volumen persistente:

```bash
export HF_HOME=/workspace/hf_cache
```

Así los pesos sobreviven a un reinicio del contenedor y no hay que volver a descargarlos.

## Variables de entorno útiles

| Variable | Para qué |
| -------- | -------- |
| `HF_TOKEN` | Token de autenticación |
| `HF_HOME` | Dónde vive la caché (por defecto `~/.cache/huggingface`) |
| `HF_HUB_ENABLE_HF_TRANSFER` | Descargas aceleradas (requiere `pip install hf_transfer`) |
| `HF_HUB_OFFLINE` | Modo offline: solo usa lo que ya está en caché |

## Referencias

- [CLI `hf` — Documentación oficial](https://huggingface.co/docs/huggingface_hub/guides/cli)
- [Referencia completa de comandos](https://huggingface.co/docs/huggingface_hub/package_reference/cli)
- [Gestión de la caché](https://huggingface.co/docs/huggingface_hub/guides/manage-cache)
- [El Hub](/notes/tools/huggingface/hub)
- [Gestionar instancias en Vast.ai](/notes/tools/gpu-cloud/vast-ai/instancias) — Dónde este CLI se vuelve imprescindible
