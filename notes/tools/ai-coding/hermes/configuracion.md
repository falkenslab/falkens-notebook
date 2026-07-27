---
sidebar_position: 3
---

# Configuración

Hermes se configura en **YAML**, no en JSON, y reparte la configuración en dos ficheros dentro de `~/.hermes/`:

| Fichero | Contenido |
|---|---|
| `config.yaml` | Toda la configuración del agente |
| `.env` | Claves de API y secretos |

El repositorio incluye un [`cli-config.yaml.example`](https://github.com/NousResearch/hermes-agent/blob/main/cli-config.yaml.example) exhaustivamente comentado que sirve de referencia. Las variables de entorno de `.env` tienen precedencia sobre `config.yaml`.

También puedes tocar valores sueltos sin abrir el editor:

```bash
hermes config set model.default anthropic/claude-sonnet-4-5
hermes config get model.default
```

## Modelo

```yaml
model:
  default: "anthropic/claude-opus-4.6"
  provider: "auto"        # auto | openrouter | nous | anthropic | custom | ...
  context_length: 200000
```

`provider: auto` deduce el proveedor a partir de las credenciales disponibles. El detalle completo, incluidos endpoints locales, está en [modelos remotos y locales](/notes/tools/ai-coding/hermes/modelos).

## Terminal: dónde se ejecutan los comandos

La clave `terminal` decide en qué entorno corre todo lo que el agente ejecuta. Es la más importante desde el punto de vista de seguridad.

```yaml
terminal:
  backend: "local"     # local | docker | ssh | singularity | modal | daytona
  cwd: "."
  timeout: 180
  home_mode: "auto"    # auto | real | profile
  docker_mount_cwd_to_workspace: false
  lifetime_seconds: 300
```

Ejecución remota por SSH, manteniendo el código del agente en local:

```yaml
terminal:
  backend: "ssh"
  cwd: "/home/miusuario/proyecto"
  ssh_host: "mi-servidor.example.com"
  ssh_user: "miusuario"
  ssh_port: 22
  ssh_key: "~/.ssh/id_rsa"
```

:::note
`docker_mount_cwd_to_workspace` viene **desactivado por defecto y a propósito**: activarlo monta tu directorio de trabajo dentro del contenedor, lo que anula buena parte del aislamiento que aporta Docker. La configuración por defecto es la segura.
:::

## Memoria

```yaml
memory:
  memory_enabled: true
  user_profile_enabled: true
  memory_char_limit: 2200     # ~800 tokens
  user_char_limit: 1375       # ~500 tokens
  nudge_interval: 10          # recordatorio cada N turnos (0 = desactivado)
  flush_min_turns: 6          # turnos mínimos para volcar memoria al salir
```

## Skills

```yaml
skills:
  creation_nudge_interval: 15
  external_dirs:
    - ~/.agents/skills
    - /home/shared/team-skills
```

Los directorios externos son de **solo lectura**: las skills nuevas siempre se escriben en `~/.hermes/skills/`, y las locales ganan si hay colisión de nombres.

## Comportamiento del agente

```yaml
agent:
  max_turns: 500          # iteraciones máximas de herramientas por conversación
  # gateway_timeout: 1800
```

:::tip
El valor por defecto de `max_turns` es 500, muy alto. La propia documentación recomienda **20-30 para tareas concretas** y 50-100 para exploración abierta. Bajarlo es la primera medida para que un agente que se atasca no queme presupuesto dando vueltas.
:::

## Delegación en subagentes

```yaml
delegation:
  max_iterations: 50
  # max_concurrent_children: 3
  # max_spawn_depth: 1
  # subagent_auto_approve: false
  # model: "google/gemini-3-flash-preview"
```

`subagent_auto_approve` merece atención: cuando un subagente topa con una confirmación de comando peligroso, no puede preguntarte (el TUI padre es quien controla stdin, y bloquear provocaría un interbloqueo). Por defecto **deniega**; ponerlo a `true` hace que apruebe automáticamente. Solo tiene sentido en pipelines de cron o batch, y queda registrado en el log.

## Aislamiento por worktree

```yaml
worktree: true          # crear siempre un worktree en repos git
worktree_sync: true     # ramificar desde el tip remoto (false = HEAD local)
```

## Otras claves útiles

```yaml
compression: {}            # compactación automática al acercarse al límite de contexto
prompt_caching: {}         # TTL de caché de prompt (Claude vía Anthropic u OpenRouter)
session_reset:
  mode: none               # none | idle | daily | both
platform_toolsets: {}      # herramientas disponibles por plataforma
display:
  compact: false           # banner compacto en lugar del ASCII completo
```

`session_reset` controla cuándo se limpian las sesiones de mensajería. Por defecto `none`: el contexto vive hasta que hagas `/reset` o entre la compactación. Conviene saber que un contexto largo encarece cada mensaje.

## Servidores MCP

Hermes se conecta a servidores [MCP](https://modelcontextprotocol.io) para sumar herramientas externas, igual que opencode o Claude Code. Se declaran en la sección correspondiente de `config.yaml`.

## Experimento: acotar el agente antes de soltarlo

**Contexto:** la configuración por defecto es permisiva (500 iteraciones, ejecución local directa). Para trabajar sobre un repositorio real interesa lo contrario: contenerlo en Docker, limitar las vueltas y aislar cada sesión en su propio worktree.

`~/.hermes/config.yaml`:

```yaml
model:
  default: "anthropic/claude-sonnet-4-5"
  provider: "openrouter"

terminal:
  backend: "docker"
  timeout: 120
  docker_mount_cwd_to_workspace: false

agent:
  max_turns: 30

delegation:
  max_iterations: 20
  subagent_auto_approve: false

worktree: true
worktree_sync: true

memory:
  memory_enabled: true
  nudge_interval: 10
```

```bash
hermes doctor
```

**Resultado:**

```
Hermes Agent ☤  v1.4.2

  ✓ provider             openrouter
  ✓ model                anthropic/claude-sonnet-4-5
  ✓ context window       200000 tokens
  ✓ terminal backend     docker  (imagen: hermes-sandbox:latest)
    └ cwd montado        no  (aislamiento completo)
  ✓ max_turns            30       (por defecto: 500)
  ✓ worktree             activado, ramificando desde el tip remoto
  ✓ memory               habilitada, nudge cada 10 turnos

Sin problemas críticos.
```

**Qué aprender:** cuatro claves cambian por completo el perfil de riesgo del agente. La combinación `backend: docker` sin montar el `cwd` más `worktree: true` significa que el agente no puede tocar tu árbol de trabajo ni tu sistema de ficheros directamente, y `max_turns: 30` pone un techo duro al gasto.

:::note
Salidas representativas, no ejecutadas en vivo: reproducen el formato y comportamiento documentados.
:::

## Referencias

- [Hermes Agent — Documentación](https://hermes-agent.nousresearch.com/docs/)
- [`cli-config.yaml.example` en el repositorio](https://github.com/NousResearch/hermes-agent/blob/main/cli-config.yaml.example)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Modelos remotos y locales en Hermes](/notes/tools/ai-coding/hermes/modelos)
- [Configuración de opencode](/notes/tools/ai-coding/opencode/configuracion)
