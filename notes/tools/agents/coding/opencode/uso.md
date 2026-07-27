---
sidebar_position: 2
---

# Uso y características

opencode abre una sesión interactiva en la terminal (TUI). Escribes en lenguaje natural lo que quieres y el agente lee ficheros, propone cambios, los aplica y ejecuta comandos según los permisos configurados.

```
> añade validación al formulario de login para que el email sea obligatorio
```

## Agentes: Build y Plan

La característica más visible de opencode es que trabaja con **agentes** conmutables con la tecla `Tab`:

| Agente | Tipo | Para qué sirve |
|---|---|---|
| `build` | primario (por defecto) | Acceso completo a herramientas: editar, escribir, ejecutar |
| `plan` | primario | Analiza y propone; editar y `bash` quedan en modo `ask` |
| `general` | subagente | Investigación multipaso con acceso completo |
| `explore` | subagente | Exploración rápida del repositorio, solo lectura |
| `scout` | subagente | Documentación externa y dependencias, solo lectura |

El flujo habitual es empezar en `plan` para acordar el enfoque y pasar a `build` con `Tab` cuando el plan convence. Los subagentes se invocan solos o manualmente escribiendo `@explore`, `@scout`... en el prompt.

Hay además tres agentes internos ocultos que se encargan de compactar el contexto, generar títulos de sesión y resumir.

## Referencias a ficheros e imágenes

- `@` abre un buscador difuso de ficheros para adjuntar contexto concreto: `revisa @src/auth/login.ts`.
- Las imágenes se adjuntan arrastrándolas al TUI, útil para pasar un mockup o una captura de un error.

## Comandos del TUI

Comandos integrados: `/init`, `/connect`, `/models`, `/undo`, `/redo`, `/share`, `/help`.

`/undo` y `/redo` son especialmente prácticos: opencode toma *snapshots* del árbol de trabajo, así que puedes revertir lo que ha hecho el agente sin depender de git.

### Comandos personalizados

Se definen como ficheros markdown en `.opencode/commands/` (proyecto) o `~/.config/opencode/commands/` (global). El nombre del fichero es el nombre del comando: `test.md` habilita `/test`.

```markdown
---
description: Ejecuta los tests con cobertura
agent: build
---
Ejecuta la suite completa de tests con informe de cobertura y muestra los fallos.
```

Dentro de la plantilla puedes usar:

- `$ARGUMENTS`, `$1`, `$2`... para los argumentos que pasa el usuario.
- `` !`comando` `` para inyectar la salida de un comando de shell en el prompt.
- `@ruta/fichero` para adjuntar ficheros.

También pueden declararse en `opencode.json` con la clave `command`.

## AGENTS.md: las reglas del proyecto

`AGENTS.md` es el fichero de instrucciones persistentes, el equivalente a [`CLAUDE.md`](/notes/tools/agents/coding/claude-code/claude-md) o al [`AGENTS.md` de Codex](/notes/tools/agents/coding/codex/agents-md):

- **Proyecto:** `AGENTS.md` en la raíz del repositorio.
- **Global:** `~/.config/opencode/AGENTS.md`, para reglas personales en todas las sesiones.
- **Precedencia:** proyecto → global → *fallback* de compatibilidad con `CLAUDE.md`.

Para trocear las reglas en varios ficheros, la clave `instructions` de `opencode.json` acepta rutas, globs y URLs remotas:

```json
{
  "instructions": ["docs/guidelines.md", "packages/*/AGENTS.md"]
}
```

## Modo headless, servidor y web

opencode separa motor y cliente, algo que lo diferencia del resto de agentes de terminal:

```bash
opencode run "corrige el lint de src/"        # no interactivo, para scripts y CI
opencode serve --port 4096                    # API HTTP sin TUI
opencode attach http://servidor:4096          # conectar el TUI a un motor remoto
opencode web                                  # interfaz de navegador
opencode acp                                  # servidor Agent Client Protocol (stdin/stdout)
```

Esto permite dejar el agente corriendo en un servidor con GPU y atacar desde el portátil, o integrarlo en un editor mediante ACP.

## Sesiones, coste y compartición

```bash
opencode session list --max-count 20
opencode stats                  # tokens y coste por periodo
opencode export > sesion.json   # exportar sesión (con opción de sanitizado)
opencode github install         # workflow de GitHub Actions
opencode pr 123                 # descarga la rama de la PR y lanza el agente
```

El comando `/share` genera un enlace público con la conversación —muy cómodo para revisiones, pero conviene desactivarlo (`"share": "disabled"`) en repos privados.

## Experimento: plan primero, build después

**Contexto:** el error más común al usar un agente es dejarle editar antes de haber acordado el enfoque. El modo `plan` de opencode fuerza ese paso sin necesidad de configurar nada.

```bash
cd falkens-notebook
opencode
```

```
# pulsar Tab hasta ver [plan] en la barra de estado
> quiero añadir una sección de "notas relacionadas" al final de cada nota. ¿Cómo lo harías?
```

**Resultado:**

```
[plan] anthropic/claude-sonnet-4-5

@ docusaurus.config.ts
@ sidebars.ts
@ src/css/custom.css

Propuesta (sin aplicar cambios):

1. Crear src/components/RelatedNotes/index.tsx que reciba una lista de rutas
   y renderice enlaces con <Link> de @docusaurus/Link.
2. Registrarlo como componente MDX global en docusaurus.config.ts para no
   tener que importarlo en cada .md.
3. Añadir estilos en src/css/custom.css reutilizando las variables --ifm-*.

Riesgo: los enlaces internos deben incluir el baseUrl /falkens-notebook;
usar <Link> en lugar de <a> lo resuelve automáticamente.

Pulsa Tab para cambiar a build y aplicar el plan.
```

**Qué aprender:** en `plan` las herramientas de escritura están en `ask`, así que el agente se limita a leer y proponer; el cambio de modo es una tecla, no una reconfiguración.

## Referencias

- [opencode — Agentes](https://opencode.ai/docs/agents/)
- [opencode — Comandos personalizados](https://opencode.ai/docs/commands/)
- [opencode — AGENTS.md](https://opencode.ai/docs/rules/)
- [opencode — CLI](https://opencode.ai/docs/cli/)
- [CLAUDE.md en Claude Code](/notes/tools/agents/coding/claude-code/claude-md)
- [AGENTS.md en Codex CLI](/notes/tools/agents/coding/codex/agents-md)
