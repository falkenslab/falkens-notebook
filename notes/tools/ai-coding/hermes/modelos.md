---
sidebar_position: 4
---

# Modelos: remotos y locales

Hermes soporta más de 50 proveedores y se cambia de uno a otro con `hermes model`, sin tocar código. La restricción real no es de compatibilidad sino de tamaño: **el modelo necesita al menos 64.000 tokens de contexto** para que el agente funcione.

## Modelos remotos

```bash
hermes model      # asistente: añadir proveedor, OAuth, introducir claves
```

Dentro de una sesión, `/model` cambia entre los que ya tengas configurados.

### Proveedores principales

Nous Portal (300+ modelos con una suscripción), OpenRouter, Anthropic, OpenAI, GitHub Copilot, Google Vertex AI, AWS Bedrock, xAI, DeepSeek, Fireworks, Hugging Face, NVIDIA NIM, y modelos regionales como Kimi/Moonshot, Qwen, MiniMax o GLM.

```yaml
model:
  default: "anthropic/claude-opus-4.6"
  provider: "openrouter"
```

Las claves van en `~/.hermes/.env`:

```bash
OPENROUTER_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=...
```

### Proveedores de respaldo

Una característica poco común: encadenar alternativas para cuando el principal falla o te limita por cuota.

```yaml
fallback_providers:
  - provider: openrouter
    model: anthropic/claude-sonnet-4
  - provider: anthropic
    model: claude-sonnet-4
```

Se activan una vez por sesión ante un error o un *rate limit*, **sin perder el historial de la conversación**.

## Modelos locales

Todos los servidores locales se declaran con `provider: custom` y su `base_url`.

### Ollama

```yaml
model:
  default: qwen2.5-coder:32b
  provider: custom
  base_url: http://localhost:11434/v1
  context_length: 64000
```

:::warning Ollama no usa todo el contexto por defecto
Este es el error que arruina la mayoría de intentos con [Ollama](/notes/tools/llm-runtimes/ollama/instalacion): sirve el modelo con una ventana recortada, muy por debajo del mínimo de 64k que Hermes necesita. Hay que forzarla explícitamente.
:::

```bash
OLLAMA_CONTEXT_LENGTH=64000 ollama serve
```

O de forma permanente con un [Modelfile](/notes/tools/llm-runtimes/ollama/modelos):

```bash
printf 'FROM qwen2.5-coder:32b\nPARAMETER num_ctx 64000\n' > Modelfile
ollama create qwen2.5-coder-64k -f Modelfile
```

### vLLM

```bash
vllm serve meta-llama/Llama-3.1-70B-Instruct \
  --port 8000 \
  --max-model-len 65536 \
  --enable-auto-tool-choice \
  --tool-call-parser hermes
```

```yaml
model:
  default: meta-llama/Llama-3.1-70B-Instruct
  provider: custom
  base_url: http://localhost:8000/v1
```

Sin `--enable-auto-tool-choice` el servidor ignora las herramientas y el agente queda reducido a un chat.

### llama.cpp

```bash
./build/bin/llama-server \
  --jinja -fa \
  -c 64000 \
  -ngl 99 \
  -m models/qwen2.5-coder-32b-instruct-Q4_K_M.gguf \
  --port 8080 --host 0.0.0.0
```

```yaml
model:
  default: qwen2.5-coder:32b
  provider: custom
  base_url: http://localhost:8080/v1
  context_length: 64000
```

**Sin `--jinja`, llama-server ignora por completo el parámetro `tools`.** Es el equivalente exacto del problema anterior.

### LM Studio

```yaml
model:
  default: qwen2.5-coder:32b
  provider: lmstudio
  base_url: http://localhost:1234/v1
```

Arranca el servidor desde la pestaña *Developer* de [LM Studio](/notes/tools/llm-runtimes/lmstudio/overview) y sube el contexto a 64.000 o más en los ajustes.

### Varios endpoints con nombre

```yaml
custom_providers:
  - name: local
    base_url: http://localhost:8080/v1
  - name: trabajo
    base_url: https://gpu-server.internal.corp/v1
    key_env: CORP_API_KEY
    api_mode: chat_completions

model:
  provider: custom:local
  default: qwen2.5-coder:32b
```

Cambio en caliente: `/model custom:local:qwen2.5-coder` o `/model custom:trabajo:llama3`.

## Detección de la ventana de contexto

Hermes resuelve el tamaño de contexto por una cadena de prioridades: `model.context_length` explícito → ajustes por modelo del proveedor → caché de ejecuciones previas → respuesta de `/v1/models` del servidor → APIs del proveedor → registro comunitario models.dev → 128K por familia como último recurso.

:::tip
Cuando algo no cuadre, fija `context_length` a mano y deja de depender de la autodetección. Y no confundas `context_length` (ventana total) con `model.max_tokens` (tope de salida por respuesta).
:::

## Experimento: por qué falla un modelo local pequeño

**Contexto:** la tentación con Hermes es reutilizar un modelo de 7B que ya tienes descargado. El experimento muestra que el fallo no es de calidad, sino aritmético.

```bash
ollama pull qwen2.5-coder:7b
ollama serve                       # sin OLLAMA_CONTEXT_LENGTH
```

```yaml
model:
  default: qwen2.5-coder:7b
  provider: custom
  base_url: http://localhost:11434/v1
```

```bash
hermes doctor
```

**Resultado:**

```
Hermes Agent ☤  v1.4.2

  ✓ provider             custom  (http://localhost:11434/v1)
  ✓ model                qwen2.5-coder:7b
  ✗ context window       4096 tokens  (mínimo requerido: 64000)
      El prompt de sistema y las definiciones de herramientas ya ocupan
      ~28000 tokens. El agente no puede arrancar.

      Arregla el servidor, no la configuración:
        OLLAMA_CONTEXT_LENGTH=64000 ollama serve

1 problema crítico.
```

Tras relanzar Ollama con la ventana correcta y un modelo de 32B:

```
  ✓ model                qwen2.5-coder:32b
  ✓ context window       64000 tokens
  ✓ tool calling         verificado (llamada de prueba OK)
```

**Qué aprender:** el cuello de botella de Hermes en local no es la capacidad de razonamiento sino la ventana de contexto, porque el agente gasta ~28k tokens antes de leer tu primera frase. Y el arreglo va en el servidor de inferencia, no en el fichero de configuración del agente: es el mismo patrón que `--jinja` en llama.cpp o `--enable-auto-tool-choice` en vLLM.

:::note
Salidas representativas, no ejecutadas en vivo. La cifra exacta de tokens del prompt de sistema depende de las herramientas que tengas activas.
:::

## Referencias

- [Hermes Agent — Proveedores](https://hermes-agent.nousresearch.com/docs/integrations/providers)
- [Hermes Agent — Documentación](https://hermes-agent.nousresearch.com/docs/)
- [Nous Portal](https://portal.nousresearch.com)
- [Instalación de Ollama](/notes/tools/llm-runtimes/ollama/instalacion)
- [Modelfiles en Ollama](/notes/tools/llm-runtimes/ollama/modelos)
- [LM Studio](/notes/tools/llm-runtimes/lmstudio/overview)
- [Modelos remotos y locales en OpenCode](/notes/tools/ai-coding/opencode/modelos)
