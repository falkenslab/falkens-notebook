---
sidebar_position: 4
---

# Referencia y comparativa

## Comandos útiles

```bash
codex                              # inicia sesión interactiva
codex "descripción de la tarea"    # ejecuta una tarea directamente
codex --model gpt-4o               # usa un modelo concreto
codex --approval-mode full-auto    # sin confirmaciones
codex --quiet                      # menos salida por pantalla
codex --help                       # muestra todas las opciones
```

## Flujo de trabajo típico

```
1. cd mi-proyecto
2. codex
3. > explícame la arquitectura de este proyecto
4. > añade tests para el módulo de autenticación
5. > refactoriza el controlador de usuarios siguiendo el patrón repository
6. > haz commit de los cambios con un mensaje descriptivo
```

## Codex vs Claude Code

Ambas herramientas son agentes de terminal con capacidades similares. Las diferencias principales:

| | Codex CLI | Claude Code |
|---|---|---|
| **Proveedor** | OpenAI | Anthropic |
| **Modelos por defecto** | gpt-5.3-codex, gpt-5.4 | Claude Sonnet/Opus |
| **Modelos alternativos** | Cualquier API compatible (incluido Ollama) | Compatible con otros proveedores vía configuración |
| **Fichero de contexto** | `AGENTS.md` | `CLAUDE.md` |
| **Comandos personalizados** | No tiene equivalente nativo | Skills (`/nombre`) |
| **Licencia** | Apache 2.0 (open source) | Propietaria |

## Referencias

- [Codex CLI — Repositorio oficial](https://github.com/openai/codex)
- [Documentación de Codex CLI](https://github.com/openai/codex#readme)
- [Ollama — Sitio oficial](https://ollama.com)
- [Modelos disponibles en Ollama](https://ollama.com/library)
- [OpenAI API — Referencia](https://platform.openai.com/docs/api-reference)
