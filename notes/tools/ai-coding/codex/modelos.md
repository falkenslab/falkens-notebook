---
sidebar_position: 3
---

# Modelos y proveedores

Una de las características más destacadas de Codex es su flexibilidad para usar **cualquier proveedor de modelos** compatible con la API de OpenAI, no solo los modelos de OpenAI.

## Configuración del modelo

El modelo por defecto es `gpt-5.3-codex`, pero puedes cambiarlo con el flag `--model`:

```bash
codex --model gpt-5.4
```

O fijarlo de forma permanente en el fichero de configuración `~/.codex/config.json`:

```json
{
  "model": "gpt-5.3-codex",
  "provider": "openai"
}
```

## Usar modelos de otros proveedores

Codex permite apuntar a cualquier proveedor que exponga una API compatible con OpenAI. Se configura con las variables `OPENAI_BASE_URL` y `OPENAI_API_KEY`:

```bash
export OPENAI_BASE_URL="https://api.proveedor.com/v1"
export OPENAI_API_KEY="tu-api-key"
codex --model nombre-del-modelo
```

O en `~/.codex/config.json`:

```json
{
  "provider": "openai",
  "model": "nombre-del-modelo",
  "baseURL": "https://api.proveedor.com/v1"
}
```

## Usar Ollama (modelos en local)

[Ollama](/docs/tools/llm-runtimes/ollama/instalacion) permite ejecutar modelos de lenguaje completamente en local, sin enviar datos a ningún servidor externo. Como Ollama expone una API compatible con OpenAI, se integra directamente con Codex.

**1. Instala y arranca Ollama con el modelo que quieras usar:**

```bash
ollama pull qwen2.5-coder:7b
ollama serve
```

**2. Configura Codex para apuntar a Ollama:**

```bash
export OPENAI_BASE_URL="http://localhost:11434/v1"
export OPENAI_API_KEY="ollama"   # cualquier valor no vacío
codex --model qwen2.5-coder:7b
```

O de forma permanente en `~/.codex/config.json`:

```json
{
  "provider": "ollama",
  "model": "qwen2.5-coder:7b",
  "baseURL": "http://localhost:11434/v1"
}
```

:::tip
Para tareas de código, los modelos más recomendados con Ollama son `qwen2.5-coder`, `deepseek-coder-v2` y `codellama`. Elige el tamaño (7b, 14b, 32b...) según la RAM disponible en tu máquina.
:::

:::note
El rendimiento con modelos locales depende del hardware. En equipos sin GPU dedicada, los modelos grandes pueden ser lentos. Empieza con variantes de 7B para uso diario.
:::

Ver el experimento: [Codex CLI con Ollama en local](/experiments/codex-ollama-local)

## Referencias

- [Codex CLI — Repositorio oficial](https://github.com/openai/codex)
- [Ollama — Sitio oficial](https://ollama.com)
- [Modelos disponibles en Ollama](https://ollama.com/library)
- [OpenAI API — Referencia](https://platform.openai.com/docs/api-reference)
