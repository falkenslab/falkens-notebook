---
sidebar_position: 5
---

# Ventajas, desventajas y comparativa

Hermes aparece en esta sección junto a Claude Code, Codex CLI y OpenCode, pero **no compite con ellos**. Conviene entender dónde se solapan de verdad antes de elegir.

## El solape real

Lo que Hermes comparte con un agente de programación:

- Ejecuta comandos de terminal y manipula ficheros.
- Trabaja sobre repositorios git, con aislamiento por worktree por sesión.
- Se conecta a servidores MCP.
- Usa el estándar abierto de skills [agentskills.io](https://agentskills.io).

Lo que no comparte, y define su categoría:

- Su unidad de trabajo no es "una tarea en un repositorio", sino **una relación continuada**: memoria persistente, perfil de usuario, skills que acumula con el tiempo.
- Vive en un servidor, no en tu portátil, y le hablas desde Telegram o Discord.
- Trae planificador cron: hace cosas cuando tú no estás delante.

## Ventajas

- **Memoria real entre sesiones.** No hay que mantener a mano un `CLAUDE.md` o un `AGENTS.md`: el agente cura sus propias notas y su perfil de ti.
- **Skills que se autogeneran y mejoran.** Resuelve un problema complejo una vez y guarda el procedimiento.
- **Independiente de tu máquina.** Corre en un VPS de 5 $ o en un clúster con GPU, y le escribes desde el móvil.
- **Automatización desatendida.** Cron integrado con entrega a cualquier plataforma conectada.
- **Aislamiento serio.** Seis backends de ejecución, incluidos Docker, SSH y entornos serverless; por defecto no monta tu directorio de trabajo en el contenedor.
- **Sin bloqueo de proveedor.** Más de 50 proveedores, endpoints propios, modelos locales y proveedores de respaldo encadenables.
- **Autoalojado y sin telemetría.** MIT, todos los datos en `~/.hermes/`.

## Desventajas

- **No está afinado para programar.** No tiene modo plan, ni revisión de diffs, ni el flujo editar-probar-corregir pulido de un agente de código. Para refactorizar, los otros tres son mejores herramienta.
- **Requisito de 64k de contexto.** Deja fuera a la mayoría de modelos locales pequeños, justo el escenario en el que un agente autoalojado resulta más atractivo.
- **Superficie de configuración enorme.** El `cli-config.yaml.example` tiene más de 1.400 líneas. La flexibilidad se paga en tiempo de lectura.
- **Valores por defecto generosos.** `max_turns: 500` y ejecución local directa: conviene acotarlo antes de darle trabajo real.
- **Más superficie de riesgo.** Un agente con memoria, cron, acceso a mensajería y ejecución de comandos es mucho más que un asistente de código. Merece un sandbox, no confianza.
- **Proyecto joven y muy activo.** Publicado en 2026 y con cambios frecuentes.
- **Ruido alrededor del proyecto.** Varios dominios clon con contenido reescrito, y al menos uno publica un comando de instalación distinto del oficial. Verifica siempre la fuente.

## Comparativa

| | **Hermes Agent** | **OpenCode** | **Claude Code** | **Codex CLI** |
|---|---|---|---|---|
| Categoría | Agente personal | Agente de programación | Agente de programación | Agente de programación |
| Licencia | Open source (MIT) | Open source (MIT) | Propietaria | Open source |
| Fabricante | Nous Research | Anomaly | Anthropic | OpenAI |
| Modelos | 50+ proveedores + locales | Cualquier proveedor + locales | Claude | OpenAI y compatibles |
| Contexto mínimo | 64.000 tokens | Sin mínimo declarado | Sin mínimo declarado | Sin mínimo declarado |
| Configuración | YAML (`~/.hermes/config.yaml`) | JSON (`opencode.json`) | Ajustes y `CLAUDE.md` | JSON (`~/.codex/config.json`) |
| Memoria persistente | Sí, autogestionada | No (fichero manual) | No (fichero manual) | No (fichero manual) |
| Skills autogeneradas | Sí | No | Skills manuales | No |
| Cron integrado | Sí | No | No | No |
| Mensajería | Telegram, Discord, Slack, WhatsApp, Signal | No | No | No |
| Backends de ejecución | 6 (local, Docker, SSH, Singularity, Modal, Daytona) | Local | Local | Local |
| Modo plan | No | Sí (`Tab`) | Sí | Modos de aprobación |
| Subagentes | Sí (`delegate_task`) | Sí | Sí | Limitado |
| MCP | Sí | Sí | Sí | Sí |

## Cuándo usar cada uno

- **Hermes** — cuando quieres un agente que *persista*: que recuerde tus proyectos, ejecute tareas programadas y esté disponible desde el móvil. Tareas de operación, informes, automatización doméstica o de infraestructura.
- **OpenCode** — cuando el trabajo es código y necesitas elegir el modelo, incluido uno local. Ver [su comparativa](/notes/tools/ai-coding/opencode/comparativa).
- **Claude Code** — cuando quieres el mejor resultado en código con la mínima configuración.
- **Codex CLI** — cuando tu equipo vive en el ecosistema de OpenAI.

La combinación razonable no es elegir uno: es usar un agente de programación en el editor y Hermes en el servidor, para lo que ocurre cuando cierras el portátil.

## Experimento: la misma petición a dos agentes distintos

**Contexto:** una tarea que ninguna de las dos herramientas rechaza, para ver que la diferencia no está en la capacidad sino en el encaje.

```bash
# Agente de programación
opencode run "revisa notes/ y dime qué notas no terminan en '## Referencias'"

# Agente personal
hermes
> revisa notes/ y dime qué notas no terminan en "## Referencias".
  Y avísame por Telegram cada lunes si aparece alguna nueva.
```

**Resultado:**

```
# OpenCode
$ grep -rL "## Referencias" notes --include=*.md
notes/intro.md
notes/tools/vector-databases/intro.md
2 ficheros sin sección de referencias.
Done in 22s

# Hermes
  ⚒ terminal: grep -rL "## Referencias" notes --include=*.md
    notes/intro.md
    notes/tools/vector-databases/intro.md

  ⚒ create_cron_job
    nombre:   auditoria-referencias
    horario:  lunes 09:00
    entrega:  telegram
    ✓ programado

  ⚒ save_skill
    + auditar-referencias-cuaderno.md  (procedimiento guardado)

2 notas sin referencias. Te aviso los lunes si aparecen nuevas.
```

**Qué aprender:** la primera mitad de la tarea la resuelven igual —un `grep`—. La segunda mitad, "avísame cada lunes", OpenCode ni siquiera la contempla, porque no es lo suyo. Y Hermes, además de programar el cron, guardó el procedimiento como skill para reutilizarlo. Ahí está la frontera entre las dos categorías.

:::note
Salidas representativas, no ejecutadas en vivo.
:::

## Referencias

- [Hermes Agent — Sitio oficial](https://hermes-agent.nousresearch.com/)
- [Hermes Agent — Repositorio en GitHub](https://github.com/NousResearch/hermes-agent)
- [Nous Research](https://nousresearch.com)
- [Ventajas, desventajas y comparativa de OpenCode](/notes/tools/ai-coding/opencode/comparativa)
- [Claude Code — Documentación](https://docs.anthropic.com/es/docs/claude-code/overview)
- [Codex CLI — Repositorio oficial](https://github.com/openai/codex)
