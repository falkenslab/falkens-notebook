---
slug: claude-code
title: Introducción a Claude Code
authors: fvarrui
tags: [Claude, CLI, Agente]
---

**[Claude Code](https://claude.ai/code)** es la CLI oficial de Anthropic para trabajar con Claude directamente desde la terminal. No es un simple autocompletado de código: es un agente que lee y modifica ficheros, ejecuta comandos, navega por el repositorio y mantiene el contexto de toda la conversación mientras trabajas.

<!-- truncate -->

## Instalación

Requiere Node.js 18 o superior. Se instala como paquete global:

```bash
npm install -g @anthropic-ai/claude-code
```

Una vez instalado, lanza Claude Code desde el directorio de tu proyecto:

```bash
cd mi-proyecto
claude
```

En el primer arranque te pedirá autenticarte con tu cuenta de Anthropic.

## Cómo funciona

Claude Code abre una sesión interactiva en la terminal. Puedes escribirle en lenguaje natural lo que quieres hacer y él tomará las acciones necesarias: leer ficheros, editarlos, ejecutar tests, buscar en el código, hacer commits...

```
> añade validación al formulario de login para que el email sea obligatorio
```

Claude localizará el fichero relevante, leerá su contenido, propondrá el cambio y lo aplicará si le das permiso.

Por defecto, las operaciones que modifican ficheros o ejecutan comandos piden confirmación. Puedes ajustar el nivel de autonomía con el flag `--dangerously-skip-permissions` (solo para entornos controlados).

## El comando /init

Cuando entras en un proyecto nuevo, lo primero que conviene hacer es ejecutar:

```
/init
```

Este comando analiza la estructura del repositorio — ficheros de configuración, scripts del `package.json`, arquitectura general — y genera automáticamente un fichero `CLAUDE.md` en la raíz del proyecto.

## El fichero CLAUDE.md

`CLAUDE.md` es el fichero de contexto del proyecto. Claude Code lo carga automáticamente al inicio de cada sesión, por lo que todo lo que escribas ahí estará siempre disponible sin que tengas que repetirlo.

Es el lugar donde documentas:

- **Comandos frecuentes**: cómo arrancar el proyecto, cómo ejecutar los tests, cómo hacer el build.
- **Arquitectura**: qué hace cada parte del código, decisiones de diseño importantes, convenciones del equipo.
- **Restricciones**: qué no debe tocar Claude, qué patrones deben seguirse.

Un ejemplo mínimo:

```markdown
# CLAUDE.md

## Comandos

​```bash
npm start        # servidor de desarrollo
npm run build    # build de producción
npm test         # tests
​```

## Arquitectura

- `src/api/` — endpoints REST, cada fichero es un recurso
- `src/services/` — lógica de negocio, sin dependencias de Express
- Las validaciones van siempre en el servicio, nunca en el controlador
```

Puedes tener varios `CLAUDE.md` anidados en subdirectorios; Claude los carga todos según el directorio de trabajo.

## El directorio .claude

Al trabajar con Claude Code, se crea un directorio `.claude/` en la raíz del proyecto (y también uno global en `~/.claude/`). Contiene la configuración local de la sesión:

```
.claude/
├── settings.json       # configuración del proyecto (permisos, hooks, etc.)
└── commands/           # skills (comandos personalizados) del proyecto
```

El fichero `settings.json` permite, entre otras cosas, configurar qué herramientas puede usar Claude sin pedir confirmación, o definir hooks que se ejecutan antes o después de ciertas acciones.

:::tip
Añade `.claude/` a tu `.gitignore` si no quieres compartir la configuración local, o inclúyelo si quieres que todo el equipo comparta los mismos comandos personalizados.
:::

## Skills: comandos personalizados

Las **skills** (también llamadas *slash commands* personalizados) son comandos reutilizables que puedes invocar con `/nombre-del-comando`. Permiten encapsular flujos de trabajo repetitivos en una sola instrucción.

### Dónde se definen

Puedes definir skills en dos lugares:

| Ubicación | Alcance |
|---|---|
| `~/.claude/commands/` | Global, disponible en todos los proyectos |
| `.claude/commands/` | Local, solo para este proyecto |

### Cómo se crean

Cada skill es un fichero Markdown con la instrucción que Claude debe seguir al invocarla. El nombre del fichero determina el comando:

```
.claude/commands/
└── commit.md       →  /commit
└── review.md       →  /review
└── traducir.md     →  /traducir
```

Por ejemplo, `.claude/commands/commit.md`:

```markdown
Revisa los cambios en staging con `git diff --cached`.
Redacta un mensaje de commit siguiendo Conventional Commits.
Muéstrame el mensaje propuesto y espera confirmación antes de hacer el commit.
```

A partir de ese momento, escribir `/commit` en Claude Code ejecutará exactamente esa instrucción.

### Skills con argumentos

Puedes usar `$ARGUMENTS` para que el comando acepte texto libre:

```markdown
Traduce el siguiente texto al inglés técnico, manteniendo los bloques de código sin traducir:

$ARGUMENTS
```

Y se invoca así:

```
/traducir Esta función inicializa el cliente de base de datos
```

## Comandos integrados más útiles

Además de los que tú definas, Claude Code incluye varios comandos de serie:

| Comando | Descripción |
|---|---|
| `/init` | Genera el fichero `CLAUDE.md` analizando el proyecto |
| `/clear` | Limpia el contexto de la conversación actual |
| `/compact` | Resume la conversación para liberar espacio de contexto |
| `/memory` | Abre el sistema de memoria persistente |
| `/help` | Muestra todos los comandos disponibles |
| `/cost` | Muestra el coste de tokens de la sesión actual |

## Flujo de trabajo típico

```
1. cd mi-proyecto
2. claude
3. /init                          ← genera CLAUDE.md
4. (edita CLAUDE.md si hace falta)
5. > explícame cómo funciona la autenticación
6. > añade tests para el módulo de usuarios
7. > haz commit de los cambios
```

Claude mantiene el contexto durante toda la sesión, así que puede relacionar lo que le pides con lo que ya ha leído o modificado antes.

## Consejos para empezar

- **Sé específico**: cuanto más contexto des, mejor. En lugar de "arregla el bug", di "la función `calcularTotal()` en `src/carrito.ts` devuelve NaN cuando el array está vacío".
- **Usa CLAUDE.md desde el principio**: ahorra tiempo explicando el proyecto en cada sesión.
- **Define skills para lo repetitivo**: si siempre haces lo mismo antes de un commit o al revisar una PR, conviértelo en un comando.
- **Revisa antes de confirmar**: Claude muestra los cambios antes de aplicarlos; léelos.

## Referencias

- [Claude Code — Sitio oficial](https://claude.ai/code)
- [Documentación de Claude Code](https://docs.anthropic.com/es/docs/claude-code/overview)
- [Referencia de comandos y atajos](https://docs.anthropic.com/es/docs/claude-code/cli-usage)
- [Configuración de CLAUDE.md](https://docs.anthropic.com/es/docs/claude-code/memory)
- [Hooks y settings.json](https://docs.anthropic.com/es/docs/claude-code/hooks)
- [Repositorio en GitHub](https://github.com/anthropics/claude-code)
