---
sidebar_position: 3
---

# Configuración

Toda la configuración de opencode vive en ficheros `opencode.json` (también acepta JSONC, con comentarios). Empieza siempre por el `$schema`: da autocompletado y validación en el editor.

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5"
}
```

## Dónde va y cómo se combina

Los ficheros **se fusionan, no se reemplazan**. De menor a mayor prioridad:

| Origen | Ruta |
|---|---|
| Global | `~/.config/opencode/opencode.json` |
| Personalizado | ruta indicada en `OPENCODE_CONFIG` |
| Proyecto | `opencode.json` en la raíz del repositorio |
| Directorios `.opencode` | `.opencode/` del proyecto |
| En línea | contenido de `OPENCODE_CONFIG_CONTENT` |

Lo habitual es dejar en el global el modelo, el tema y las claves personales, y versionar en el proyecto solo lo que afecta al equipo (permisos, agentes, instrucciones, MCP).

## Claves principales

### Modelo

```json
{
  "model": "anthropic/claude-sonnet-4-5",
  "small_model": "anthropic/claude-haiku-4-5"
}
```

`small_model` es el modelo barato que opencode usa para tareas auxiliares (títulos de sesión, resúmenes, compactación de contexto). Configurarlo bien es la optimización de coste más rentable.

### Permisos y herramientas

```json
{
  "permission": {
    "edit": "ask",
    "bash": {
      "*": "ask",
      "git status *": "allow",
      "npm test": "allow",
      "rm *": "deny"
    },
    "webfetch": "allow"
  },
  "tools": {
    "write": false
  }
}
```

Cada permiso admite `allow`, `ask` o `deny`, y `bash` acepta patrones glob. Es el mecanismo para conseguir un agente autónomo pero acotado, sin recurrir a un "salta todos los permisos" global.

### Agentes

```json
{
  "default_agent": "plan",
  "subagent_depth": 2,
  "agent": {
    "code-reviewer": {
      "description": "Revisa el código buscando problemas de seguridad y mantenibilidad",
      "mode": "subagent",
      "model": "anthropic/claude-sonnet-4-5",
      "temperature": 0.1,
      "prompt": "Eres un revisor de código. Céntrate en seguridad, bugs y mantenibilidad.",
      "permission": { "edit": "deny", "bash": "deny" }
    }
  }
}
```

La alternativa en markdown es un fichero en `~/.config/opencode/agents/` (global) o `.opencode/agents/` (proyecto):

```markdown
---
description: Revisa el código buscando problemas de seguridad y mantenibilidad
mode: subagent
temperature: 0.1
permission:
  edit: deny
  bash: deny
---
Eres un revisor de código. Céntrate en seguridad, bugs, rendimiento y mantenibilidad.
```

`opencode agent create` genera este fichero de forma guiada.

### Servidores MCP

```json
{
  "mcp": {
    "jira": {
      "type": "remote",
      "url": "https://jira.example.com/mcp",
      "enabled": true
    }
  }
}
```

Desde la CLI: `opencode mcp add`, `opencode mcp list`, `opencode mcp auth` (para servidores con OAuth) y `opencode mcp debug` cuando algo no conecta.

### Instrucciones, formateadores y otros

```json
{
  "instructions": ["docs/guidelines.md", "packages/*/AGENTS.md"],
  "formatter": { "prettier": { "disabled": true } },
  "lsp": true,
  "snapshot": true,
  "share": "manual",
  "autoupdate": false,
  "shell": "pwsh"
}
```

- `formatter` — opencode formatea automáticamente lo que edita si detecta el formateador del proyecto; aquí se desactiva o se personaliza.
- `lsp` — usa los servidores de lenguaje para diagnósticos y navegación de símbolos.
- `snapshot` — habilita los puntos de restauración de `/undo`.
- `share` — `manual`, `auto` o `disabled`.
- `shell` — útil en Windows para forzar PowerShell.

### Variables y sustitución

```json
{
  "model": "{env:OPENCODE_MODEL}",
  "instructions": ["{file:./instrucciones-equipo.md}"]
}
```

`{env:NOMBRE}` inserta una variable de entorno y `{file:ruta}` el contenido de un fichero. Sirve para versionar la configuración sin meter secretos ni rutas locales en el repositorio.

## Configuración del TUI

La apariencia va en un fichero aparte, `~/.config/opencode/tui.json`:

```json
{
  "$schema": "https://opencode.ai/tui.json",
  "theme": "tokyonight",
  "scroll_speed": 3,
  "keybinds": { "command_list": "ctrl+p" },
  "attention": { "enabled": true, "notifications": true, "sound": true }
}
```

`attention` avisa (notificación de escritorio y sonido) cuando el agente termina o necesita una confirmación: se agradece en tareas largas.

## Experimento: agente autónomo pero acotado en un repo

**Contexto:** queremos que opencode itere solo sobre los tests sin pedir permiso a cada paso, pero sin poder tocar el historial de git ni borrar ficheros.

`opencode.json` en la raíz del proyecto:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "default_agent": "build",
  "permission": {
    "edit": "allow",
    "bash": {
      "*": "ask",
      "npm test*": "allow",
      "npm run build": "allow",
      "git status *": "allow",
      "git diff *": "allow",
      "git push *": "deny",
      "rm *": "deny"
    }
  },
  "instructions": ["CONTRIBUTING.md"]
}
```

```bash
opencode run "los tests de utils/date fallan tras el cambio de zona horaria, arréglalos"
```

**Resultado:**

```
@ src/utils/date.ts
@ src/utils/date.test.ts

$ npm test -- src/utils/date.test.ts        (allow: npm test*)
  ✗ formatDate() respeta la zona horaria del usuario
    Expected: "2026-07-27 10:00"  Received: "2026-07-27 08:00"

~ src/utils/date.ts  (edit: allow)
  - return new Date(ts).toISOString().slice(0, 16).replace("T", " ")
  + return formatInTimeZone(new Date(ts), tz, "yyyy-MM-dd HH:mm")

$ npm test -- src/utils/date.test.ts
  ✓ 4 passed

Permission required: git commit -m "fix(date): usar la zona horaria del usuario"
  [a] allow once  [s] always  [d] deny
```

**Qué aprender:** con `permission` por patrón, el agente encadena editar → probar → editar sin interrupciones, y solo se detiene en lo que realmente puede hacer daño. Es más seguro y más cómodo que un interruptor global de tipo "sin permisos".

## Referencias

- [opencode — Configuración](https://opencode.ai/docs/config/)
- [opencode — Agentes](https://opencode.ai/docs/agents/)
- [opencode — Permisos](https://opencode.ai/docs/permissions/)
- [opencode — MCP](https://opencode.ai/docs/mcp-servers/)
- [Esquema JSON de configuración](https://opencode.ai/config.json)
