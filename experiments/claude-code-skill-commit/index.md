---
date: 2026-04-05
slug: claude-code-skill-commit
title: Crear una skill de commit en Claude Code
tags: [Claude-Code, skills]
---

Automatizar el flujo de commit con Conventional Commits creando una skill reutilizable en Claude Code.

<!-- truncate -->

## Experimento: crear una skill de commit

**Contexto:** automatizar el flujo de commit con Conventional Commits para no tener que recordar el formato cada vez.

```bash
mkdir -p .claude/commands
cat > .claude/commands/commit.md << 'EOF'
Revisa los cambios en staging con `git diff --cached`.
Redacta un mensaje de commit siguiendo Conventional Commits (feat/fix/docs/refactor...).
Muéstrame el mensaje propuesto y espera confirmación antes de hacer el commit.
EOF
```

```
/commit
```

**Resultado:**
```
Cambios en staging:
  M src/auth/login.ts — añadida validación de email

Mensaje propuesto:
  feat(auth): añadir validación de formato de email en login

¿Confirmas el commit? (s/n)
```

**Qué aprender:** las skills convierten instrucciones largas y repetitivas en un comando de una palabra, manteniendo consistencia entre sesiones y miembros del equipo.

## Referencias

- [Referencia de comandos y atajos](https://docs.anthropic.com/es/docs/claude-code/cli-usage)
- [Notas: Skills y comandos](/docs/tools/ai-coding/claude-code/skills)
