---
sidebar_position: 5
---

# Ventajas, desventajas y comparativa

OpenCode compite en el mismo terreno que [Claude Code](/notes/tools/agents/coding/claude-code/instalacion) y [Codex CLI](/notes/tools/agents/coding/codex/instalacion): un agente que vive en la terminal, lee el repositorio, edita ficheros y ejecuta comandos. Lo que cambia es de quién depende y cuánto puedes tocar.

## Ventajas

- **Open source (MIT) y verificable.** Puedes leer qué prompt envía, qué herramientas expone y cómo gestiona los permisos. Para entornos con requisitos de auditoría, esa diferencia no es ideológica sino contractual.
- **Agnóstico de proveedor.** Cambiar de Claude a GPT, a Gemini o a un modelo local es una línea en `opencode.json`. No hay proveedor "de primera clase" y otros degradados.
- **Modelos locales de primera.** Ollama, LM Studio o llama.cpp se declaran como cualquier otro proveedor. Ni truco ni variable de entorno prestada.
- **Arquitectura cliente/servidor.** `opencode serve` y `opencode attach` permiten ejecutar el motor en una máquina y el TUI en otra. Ningún competidor de terminal lo ofrece de serie.
- **Permisos granulares por patrón.** `"git status *": "allow"`, `"rm *": "deny"`. Se consigue autonomía real sin el clásico "salta todos los permisos".
- **Sin ecosistema Node obligatorio.** El instalador oficial deja un binario autocontenido.
- **Múltiples frontends.** TUI, escritorio (beta), web, ACP para editores y GitHub Actions.

## Desventajas

- **Calidad = calidad del modelo que le pongas.** Claude Code está afinado contra los modelos de Anthropic y Codex contra los de OpenAI; el prompt del sistema, la gestión de contexto y las herramientas están cocinados juntos. OpenCode tiene que ser genérico, y con el mismo modelo la diferencia se nota en tareas largas.
- **Coste por API, sin suscripción plana.** Con Claude Code o Codex puedes trabajar dentro de una suscripción; aquí pagas tokens (salvo OpenCode Zen o modelos locales), y un agente consume muchos.
- **Ritmo de cambio alto.** Es un proyecto joven y muy activo: nombres de comandos y claves de configuración se mueven entre versiones. Fija la versión si automatizas en CI.
- **Ecosistema más pequeño.** Menos plugins, menos plantillas de agentes y menos material escrito que alrededor de Claude Code.
- **Windows algo menos pulido.** Funciona (Scoop, Chocolatey, npm) pero conviene fijar `"shell": "pwsh"` y esperar más fricción que en macOS o Linux.
- **La configuración es amplia.** La flexibilidad tiene precio: hay bastantes claves que entender antes de sacarle partido, frente al "instalar y usar" de los otros dos.

## Comparativa

| | **OpenCode** | **Claude Code** | **Codex CLI** |
|---|---|---|---|
| Licencia | Open source (MIT) | Propietaria | Open source |
| Fabricante | Anomaly | Anthropic | OpenAI |
| Modelos | Cualquier proveedor + locales | Claude (Anthropic) | OpenAI y APIs compatibles |
| Modelos locales | Soporte de primera (Ollama, LM Studio, llama.cpp) | No | Vía `OPENAI_BASE_URL` |
| Instalación | Binario, npm, brew, scoop, choco, docker | npm | npm |
| Fichero de reglas | `AGENTS.md` (lee `CLAUDE.md`) | `CLAUDE.md` | `AGENTS.md` |
| Modos de trabajo | Agentes `build` / `plan` (Tab) | Modo plan y permisos | `suggest` / `auto-edit` / `full-auto` |
| Subagentes | `general`, `explore`, `scout` + propios | Sí | Limitado |
| Permisos | Por herramienta y patrón glob | Por herramienta y regla | Por modo de aprobación |
| MCP | Sí | Sí | Sí |
| Cliente/servidor | Sí (`serve`, `attach`, `web`, ACP) | No | No |
| Modo no interactivo | `opencode run` | `claude -p` | `codex exec` |
| Coste | API o Zen (o gratis en local) | Suscripción o API | Suscripción o API |

## Cuándo usar cada uno

- **OpenCode** — cuando el código no puede salir de tu red, cuando quieres elegir modelo por tarea, cuando necesitas ejecutar el motor en un servidor con GPU, o cuando la licencia abierta es un requisito.
- **Claude Code** — cuando quieres el mejor resultado posible con la menor configuración y ya pagas una suscripción de Anthropic.
- **Codex CLI** — cuando tu equipo vive en el ecosistema de OpenAI.

No son excluyentes: comparten el concepto de fichero de reglas en la raíz del repositorio, así que un `AGENTS.md` bien escrito sirve para los tres con retoques mínimos.

## Experimento: el mismo repo con dos agentes distintos

**Contexto:** la comparativa de tabla vale poco sin verla. Aquí se lanza la misma tarea en el mismo repositorio con OpenCode (modelo remoto) y con Claude Code, en modo no interactivo, para comparar salida y coste.

```bash
cd falkens-notebook

opencode run "lista los ficheros de notes/ que no terminan con una sección '## Referencias'"

claude -p "lista los ficheros de notes/ que no terminan con una sección '## Referencias'"
```

**Resultado:**

```
# OpenCode  (anthropic/claude-sonnet-4-5)
$ grep -rL "## Referencias" notes --include=*.md
notes/intro.md
notes/tools/vector-databases/intro.md

2 ficheros sin sección de referencias.
Done in 22s · 14.2k in / 380 out · $0.06

# Claude Code
Buscando en notes/...
  notes/intro.md
  notes/tools/vector-databases/intro.md

Ambos son páginas índice; el resto de notas cumplen la convención.
```

**Qué aprender:** con un buen modelo detrás, el resultado es equivalente —los dos resuelven la tarea con una sola llamada a `grep`. La elección no se decide por capacidad bruta, sino por dónde vive el modelo, quién paga los tokens y cuánto necesitas configurar.

## Referencias

- [OpenCode — Sitio oficial](https://opencode.ai)
- [OpenCode — Repositorio en GitHub](https://github.com/anomalyco/opencode)
- [Claude Code — Documentación](https://docs.anthropic.com/es/docs/claude-code/overview)
- [Codex CLI — Repositorio oficial](https://github.com/openai/codex)
- [Instalación de OpenCode](/notes/tools/agents/coding/opencode/instalacion)
- [Modelos remotos y locales en OpenCode](/notes/tools/agents/coding/opencode/modelos)
