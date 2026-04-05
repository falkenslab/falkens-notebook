---
sidebar_position: 4
---

# Flujo de trabajo

## Flujo típico con Claude Code

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
