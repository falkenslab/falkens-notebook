---
sidebar_position: 4
---

# Modelos: remotos y locales

Aquí está la diferencia real de opencode frente a Claude Code o Codex CLI: el agente es **agnóstico de proveedor** por diseño. La lógica del agente (herramientas, permisos, subagentes, contexto) es la misma tanto si detrás hay Claude Sonnet, GPT, Gemini o un `qwen2.5-coder` corriendo en tu máquina.

## Modelos remotos

### Conectar un proveedor

```bash
opencode auth login     # o /connect dentro del TUI
opencode auth list
opencode models         # todos los modelos disponibles
opencode models anthropic --refresh
```

Las credenciales se guardan en `~/.local/share/opencode/auth.json`. **opencode Zen** es el catálogo curado del proyecto: modelos ya validados con el agente y una única clave, pensado para no tener que abrir cuenta en cada proveedor.

### Elegir modelo

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "small_model": "anthropic/claude-haiku-4-5"
}
```

El identificador es siempre `proveedor/modelo`. Cada agente puede además llevar el suyo, así que es habitual usar un modelo potente en `build` y uno barato en subagentes de exploración.

### Ajustar el proveedor

```json
{
  "provider": {
    "anthropic": {
      "options": {
        "baseURL": "https://api.anthropic.com/v1",
        "timeout": 600000
      },
      "blacklist": ["claude-opus-4-20250514"]
    }
  },
  "enabled_providers": ["anthropic", "openai"],
  "disabled_providers": ["gemini"]
}
```

`baseURL` permite pasar por un proxy corporativo o un gateway. `blacklist` / `whitelist` limpian el selector de modelos, que con varios proveedores conectados se vuelve inmanejable.

## Modelos locales

Cualquier servidor con API compatible con OpenAI se declara como proveedor usando el paquete `@ai-sdk/openai-compatible`. No hace falta ninguna clave real.

### Ollama

[Ollama](/notes/tools/llm-runtimes/ollama/instalacion) expone una API compatible con OpenAI en `http://localhost:11434/v1`:

```bash
ollama pull qwen2.5-coder:14b
ollama serve
```

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama (local)",
      "options": {
        "baseURL": "http://localhost:11434/v1"
      },
      "models": {
        "qwen2.5-coder:14b": {
          "name": "Qwen2.5 Coder 14B (local)",
          "limit": { "context": 32768, "output": 8192 }
        }
      }
    }
  },
  "model": "ollama/qwen2.5-coder:14b"
}
```

### LM Studio

[LM Studio](/notes/tools/llm-runtimes/lmstudio/overview) sirve en `http://127.0.0.1:1234/v1` cuando arrancas su servidor local:

```json
{
  "provider": {
    "lmstudio": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "LM Studio (local)",
      "options": { "baseURL": "http://127.0.0.1:1234/v1" },
      "models": {
        "qwen2.5-coder-14b-instruct": { "name": "Qwen2.5 Coder 14B (local)" }
      }
    }
  }
}
```

### llama.cpp

```json
{
  "provider": {
    "llama.cpp": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "llama-server (local)",
      "options": { "baseURL": "http://127.0.0.1:8080/v1" },
      "models": {
        "qwen3-coder:a3b": {
          "name": "Qwen3-Coder a3b-30b (local)",
          "limit": { "context": 128000, "output": 65536 }
        }
      }
    }
  }
}
```

:::tip
Declara siempre `limit.context`: sin ese dato opencode no sabe cuándo compactar la conversación y el modelo local empieza a truncar en silencio a mitad de tarea.
:::

:::warning
Un agente de código no solo genera texto: encadena llamadas a herramientas (`read`, `edit`, `bash`) en formato estructurado. Los modelos pequeños fallan justamente ahí. Por debajo de 14B con *tool calling* decente la experiencia es frustrante: el agente lee ficheros pero no consigue aplicar ediciones. `qwen2.5-coder:14b/32b` y `devstral` son los que mejor aguantan hoy.
:::

## Experimento: opencode con Ollama, sin salir de la máquina

**Contexto:** en un proyecto con código que no puede salir de la red interna, la pregunta no es si opencode *puede* usar un modelo local, sino si el bucle de agente (leer → editar → verificar) sigue funcionando sin API remota.

```bash
ollama pull qwen2.5-coder:14b
```

`~/.config/opencode/opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama (local)",
      "options": { "baseURL": "http://localhost:11434/v1" },
      "models": {
        "qwen2.5-coder:14b": {
          "name": "Qwen2.5 Coder 14B (local)",
          "limit": { "context": 32768, "output": 8192 }
        }
      }
    }
  },
  "model": "ollama/qwen2.5-coder:14b",
  "small_model": "ollama/qwen2.5-coder:14b",
  "share": "disabled"
}
```

```bash
opencode run "añade una función slugify() en src/utils/text.ts con su test"
```

**Resultado:**

```
[build] ollama/qwen2.5-coder:14b

@ src/utils/text.ts
+ src/utils/text.ts
+ export function slugify(input: string): string {
+   return input
+     .normalize("NFD")
+     .replace(/\p{Diacritic}/gu, "")
+     .toLowerCase()
+     .trim()
+     .replace(/[^a-z0-9]+/g, "-")
+     .replace(/^-|-$/g, "");
+ }

+ src/utils/text.test.ts
+ test("slugify elimina acentos y espacios", () => {
+   expect(slugify("Cuaderno del Dr. Falken")).toBe("cuaderno-del-dr-falken");
+ });

$ npm test -- src/utils/text.test.ts
  ✓ 1 passed  (2.1s)

Done in 3m 42s · 0 tokens billed (local)
```

**Qué aprender:** el ciclo completo funciona en local y sin coste por token, pero el reloj lo dice todo: casi cuatro minutos para una función trivial que un modelo remoto resuelve en segundos. El modelo local compensa cuando la restricción es la privacidad o el coste, no cuando lo es la velocidad. Consulta también los [casos de uso de Ollama](/notes/tools/llm-runtimes/ollama/casos-de-uso).

:::note
Las salidas de este experimento son **representativas**, no ejecutadas en vivo: los tiempos y el número de iteraciones dependen mucho del hardware. Está pendiente publicarlo con mediciones reales sobre `qwen2.5-coder` en 7B, 14B y 32B, y con una línea base remota para comparar tiempo y coste. Seguimiento en la [issue #9 del cuaderno](https://github.com/falkenslab/falkens-notebook/issues/9).
:::

## Referencias

- [opencode — Proveedores](https://opencode.ai/docs/providers/)
- [opencode — Modelos](https://opencode.ai/docs/models/)
- [opencode Zen](https://opencode.ai/docs/zen/)
- [Ollama — Sitio oficial](https://ollama.com)
- [Modelos disponibles en Ollama](https://ollama.com/library)
- [Instalación de Ollama](/notes/tools/llm-runtimes/ollama/instalacion)
- [LM Studio](/notes/tools/llm-runtimes/lmstudio/overview)
- [Modelos y proveedores en Codex CLI](/notes/tools/agents/coding/codex/modelos)
- [Issue #9 — Ejecutar en real los experimentos de opencode](https://github.com/falkenslab/falkens-notebook/issues/9)
