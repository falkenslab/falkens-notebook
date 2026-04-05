---
date: 2026-04-05
slug: claude-code-init
title: Generar CLAUDE.md con /init
tags: [Claude-Code]
---

Usar `/init` para que Claude Code analice el proyecto automáticamente y genere un fichero de contexto listo para usar.

<!-- truncate -->

## Experimento: generar CLAUDE.md con /init

**Contexto:** `/init` ahorra tiempo analizando el proyecto automáticamente y produciendo un fichero de contexto útil desde el primer momento.

```
/init
```

**Resultado:**
```
Analizando estructura del proyecto...
Leyendo package.json, tsconfig.json, src/...

Creado CLAUDE.md con:
- Comandos del proyecto (npm start, npm run build, npm test)
- Descripción de la arquitectura detectada
- Convenciones de código observadas
```

**Qué aprender:** tras `/init`, Claude Code tiene suficiente contexto para trabajar en el proyecto sin que expliques nada más. Edita el `CLAUDE.md` generado para añadir restricciones o convenciones específicas.

## Referencias

- [Configuración de CLAUDE.md](https://docs.anthropic.com/es/docs/claude-code/memory)
- [Notas: CLAUDE.md y directorio .claude](/docs/tools/ai-coding/claude-code/claude-md)
