---
sidebar_position: 2
---

# Uso y características

Hermes se lanza en dos modos: el TUI completo (recomendado) o la CLI clásica.

```bash
hermes --tui     # interfaz de terminal con edición multilínea y autocompletado
hermes           # CLI clásica
```

## Comandos de la CLI

```bash
hermes                # conversación interactiva
hermes model          # elegir proveedor y modelo
hermes tools          # activar o desactivar herramientas
hermes config set     # fijar un valor de configuración
hermes config get     # leer un valor de configuración
hermes gateway        # arrancar el gateway de mensajería
hermes setup          # asistente completo
hermes update         # actualizar
hermes doctor         # diagnóstico
hermes portal info    # estado de la suscripción de Nous Portal
```

Dentro de la sesión, los comandos slash: `/help`, `/tools`, `/model`, `/save`, `/new`, `/reset`.

## Memoria persistente

Es la característica que define a Hermes y la que no tiene ningún agente de programación de esta sección. Mantiene **dos almacenes curados** que se inyectan en el prompt de sistema en cada sesión:

| Almacén | Contenido | Límite por defecto |
|---|---|---|
| `MEMORY.md` | Notas del agente: convenciones, hechos del entorno, cosas aprendidas | 2200 caracteres (~800 tokens) |
| `USER.md` | Perfil de usuario: preferencias, estilo de comunicación | 1375 caracteres (~500 tokens) |

Los límites son deliberadamente pequeños: cuando se llenan, el agente debe consolidar o reemplazar entradas en lugar de acumular. Cada 10 turnos recibe un recordatorio para valorar si algo merece guardarse (`nudge_interval`), y antes de perder contexto —compactación, `/new`, `/reset`, salida— dispone de un turno para volcar lo importante (`flush_min_turns`).

La diferencia práctica: los agentes de programación empiezan cada sesión en blanco y dependen de que tú mantengas un `CLAUDE.md` o `AGENTS.md` a mano. Hermes escribe el suyo solo.

## Skills autogeneradas

Las *skills* son procedimientos reutilizables que el agente carga cuando los necesita. Trae más de 40 integradas y **crea las suyas propias** tras completar tareas complejas: cada 15 iteraciones de herramientas recibe un aviso para valorar si el procedimiento merece guardarse.

- Se guardan en `~/.hermes/skills/`.
- Pueden compartirse con otras herramientas mediante `external_dirs` (directorios externos de solo lectura).
- Son compatibles con el estándar abierto [agentskills.io](https://agentskills.io), el mismo que usan las [skills de Claude Code](/notes/tools/ai-coding/claude-code/skills).

## Aislamiento con git worktree

La función más relevante si vas a usarlo sobre código: Hermes puede crear un **git worktree aislado por sesión**, de modo que varios agentes trabajen sobre el mismo repositorio sin pisarse.

```bash
hermes -w        # crear worktree para esta sesión
```

Por defecto la rama parte del *tip remoto recién descargado*, no del `HEAD` local, para no arrancar sobre una copia desactualizada. Con `worktree_sync: false` se ramifica desde el `HEAD` local, útil sin conexión.

## Subagentes y paralelismo

La herramienta `delegate_task` lanza agentes hijo con contexto aislado. Por defecto 3 en paralelo y un árbol plano (`max_spawn_depth: 1`); subir la profundidad a 2 permite que los trabajadores lancen a su vez sus propios subagentes, siempre que el intermedio tenga `role="orchestrator"`.

:::warning
`max_concurrent_children` no tiene techo, y el coste en API crece linealmente con el número de hijos. La propia documentación avisa de que valores por encima de 10 multiplican la factura.
:::

## Gateway de mensajería

Un único proceso atiende Telegram, Discord, Slack, WhatsApp, Signal, Email y CLI, con transcripción de notas de voz y continuidad de conversación entre plataformas.

```bash
hermes gateway
```

Es lo que permite el patrón que vende el proyecto: el agente corre en un VPS y tú le escribes desde el móvil mientras trabaja.

## Automatizaciones programadas

Planificador cron integrado, con entrega del resultado a cualquier plataforma conectada y definición en lenguaje natural: informes diarios, copias nocturnas, auditorías semanales.

## Backends de ejecución

Seis entornos donde ejecutar las herramientas, configurables en `terminal.backend`: `local`, `docker`, `ssh`, `singularity`, `modal` y `daytona`. Los dos últimos ofrecen persistencia *serverless*: el entorno hiberna cuando está ocioso y despierta bajo demanda.

El backend `ssh` tiene una propiedad interesante para trabajar con código: los comandos se ejecutan en un servidor remoto mientras el propio código del agente permanece local, lo que lo aísla de sí mismo.

## Experimento: memoria que sobrevive a la sesión

**Contexto:** la promesa de Hermes es que no repites contexto. Vale la pena comprobar el ciclo completo: enseñarle algo, cerrar la sesión y verificar que lo recuerda en la siguiente.

```bash
hermes --tui
```

```
> en este proyecto las notas van en notes/ y los experimentos en experiments/,
  y nunca uso --- como separador horizontal
```

**Resultado:**

```
Entendido. Lo anoto para próximas sesiones.

  ⚒ save_memory
    + notes/ = documentación de referencia; experiments/ = posts con código
    + convención: no usar --- como separador horizontal, usar encabezados

  MEMORY.md  318 / 2200 chars

> /reset
Sesión reiniciada.

> ¿dónde creo una nota sobre embeddings?
En notes/, siguiendo la estructura por temas del proyecto. Recuerda que en
este cuaderno no se usa --- como separador: encadena encabezados en su lugar.
```

**Qué aprender:** el agente decidió por su cuenta qué guardar y lo recuperó tras un `/reset`, sin que existiera ningún fichero de reglas en el repositorio. Es el mismo resultado que da un `CLAUDE.md` bien escrito, con la diferencia de que aquí lo mantiene el agente y no tú — con el matiz de que también decide él qué es importante, que no siempre coincide con lo que tú dirías.

## Referencias

- [Hermes Agent — Documentación](https://hermes-agent.nousresearch.com/docs/)
- [Hermes Agent — Repositorio en GitHub](https://github.com/NousResearch/hermes-agent)
- [agentskills.io — Estándar abierto de skills](https://agentskills.io)
- [Skills en Claude Code](/notes/tools/ai-coding/claude-code/skills)
- [Configuración de Hermes](/notes/tools/ai-coding/hermes/configuracion)
