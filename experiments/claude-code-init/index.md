---
date: 2026-04-05
slug: claude-code-init
title: Generar CLAUDE.md con /init
tags: [Claude-Code]
---

Usar `/init` para que Claude Code analice el proyecto automáticamente y genere un fichero de contexto listo para usar.

<!-- truncate -->

Este **built-in slash command** de Claude Code nos ahorra tiempo analizando el proyecto automáticamente y produciendo un fichero de contexto útil desde el primer momento.

1. Ejecutamos `claude` en nuestro proyecto existente y ejecutamos el comando `/init`:

![alt text](image.png)

2. Claude analizará nuestro proyecto para generar el fichero `CLAUDE.md`:

![alt text](image-1.png)

3. Tras la ejecución de `/init`, Claude Code tendrá mayor contexto para trabajar en el proyecto: 

![alt text](image-2.png)

> 🤓 Podemos editar el fichero `CLAUDE.md` generado para añadir restricciones o convenciones específicas de tu proyecto.

## Referencias

- [Configuración de CLAUDE.md](https://docs.anthropic.com/es/docs/claude-code/memory)
- [Notas: CLAUDE.md y directorio .claude](/notes/tools/ai-coding/claude-code/claude-md)
