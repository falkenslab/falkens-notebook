---
title: Crear una skill de commit en Claude Code
tags: [Claude-Code, skills]
---

Automatizar el flujo de **commit** creando una **skill reutilizable en Claude Code**.


Cuando estamos trabajando en un proyecto que está versionado con **Git**, muchas veces introducimos cambios que corresponden a funcionalidades diferentes.

El problema es que al guardar todos esos cambios tenemos que irlos agrupando en **commits**, para que el versionado quede más consistente y esos cambios bien identificados.

La idea es **crear una skill** que automatice esta tarea de agrupar y guardar los cambios (hacer múltiples "commits"), etiquetándolos y describiéndolos de forma correcta para poder identificarlos con posterioridad.

Además, haremos que nos muestre los **commits** que ha identificado y nos **pida confirmación** antes de llevarlos a cabo.

1. Creamos el directorio `.claude/commands`:

```bash
mkdir -p .claude/commands
```

2. Creamos el fichero `commit.md` del comando (skill command o slash command) en el directorio anterior:

> Explicamos en lenguaje natural cada uno de los pasos que debe seguir para ejecutar este comando: 1) recopilar información del repositorio Git, 2) agrupar los cambios en commits lógicos, 3) redactar los mensajes de los commits, 4) mostrar el plan, 5) pedir confirmación y 6) ejecutarlo si se confirma, y finalmente le indicamos unas reglas o restricciones que debe cumplir.

~~~markdown
Analiza todos los cambios pendientes en el repositorio git actual y crea un conjunto de commits bien estructurados.

## Pasos

1. **Recopilar contexto**
   - Ejecuta `git status` para ver el estado del árbol de trabajo.
   - Ejecuta `git diff HEAD` para ver todos los cambios (staged y unstaged) en detalle.
   - Ejecuta `git log --oneline -10` para entender el estilo de commits existente en el proyecto.

2. **Agrupar cambios en commits lógicos**
   - Analiza el diff y agrupa los cambios relacionados (por ejemplo: una nueva funcionalidad + sus tests, un bug fix, un refactor, una actualización de documentación).
   - NO agrupes cambios no relacionados en un mismo commit.
   - Determina el orden correcto de los commits (primero las dependencias).

3. **Redactar mensajes de commit en inglés**
   Para cada grupo de cambios, escribe:
   - Un **título** corto (modo imperativo, máximo 72 caracteres, sin punto final). Ejemplo: `Add user authentication via OAuth2`
   - Una **descripción** (opcional pero recomendada en cambios no triviales): explica el *por qué*, no solo el *qué*. Ajusta el texto a 72 caracteres por línea.

4. **Presentar el plan**
   Muestra al usuario una lista numerada clara de los commits planificados, incluyendo:
   - Los archivos que se incluirán en ese commit
   - El título del commit
   - La descripción (si la hay)

   Luego pregunta: **"¿Procedo con estos N commits? (yes / edit / cancel)"**

5. **Esperar confirmación**
   - Si el usuario dice **yes**: ejecuta los commits en orden usando `git add <files>` + `git commit -m`.
   - Si el usuario dice **edit**: permite al usuario indicar cambios y vuelve al paso 4.
   - Si el usuario dice **cancel**: cancela sin hacer cambios.

6. **Ejecutar (solo tras confirmación)**
   Para cada commit:
   - Añade únicamente los archivos correspondientes: `git add -- <file1> <file2> ...`
   - Haz el commit usando un heredoc para preservar el formato:
     ```
     git commit -m "$(cat <<'EOF'
     <title>

     <description>
     EOF
     )"
     ```
   - Informa del éxito o de cualquier error antes de continuar con el siguiente commit.

## Reglas

- Nunca omitas el paso de confirmación.
- Nunca uses `git add -A` ni `git add .` - añade siempre archivos específicos por commit.
- Nunca hagas amend de commits existentes.
- Nunca hagas force-push.
- Los mensajes de commit deben estar en inglés independientemente del idioma de la conversación.
- Si el árbol de trabajo está limpio, indícalo y detente.
- Si hay archivos no rastreados que parecen relevantes (nuevo código, config, tests), inclúyelos en el análisis y pregunta al usuario si deben incluirse.
~~~

3. Finalmente, utilizamos el comando en nuestro proyecto desde Claude Code:

```bash
> /commit
```

## Referencias

- [Notas: Skills y comandos](/notes/tools/agents/coding/claude-code/skills)
