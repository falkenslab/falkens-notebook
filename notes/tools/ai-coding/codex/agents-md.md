---
sidebar_position: 2
---

# AGENTS.md

El equivalente al `CLAUDE.md` de Claude Code es el fichero `AGENTS.md`. Codex lo busca automáticamente en la raíz del proyecto y en los directorios padre.

Aquí puedes definir el contexto del proyecto, los comandos habituales y las instrucciones que el agente debe seguir siempre:

```markdown
# AGENTS.md

## Comandos

​```bash
npm test          # ejecutar tests
npm run lint      # linting
npm run build     # build de producción
​```

## Convenciones

- Usa `async/await`, nunca callbacks
- Los tests van en `__tests__/` junto al fichero que prueban
- No modifiques ficheros en `src/generated/`
```

Puedes tener `AGENTS.md` en subdirectorios; Codex los combina todos.

Ver el experimento: [Definir restricciones de proyecto con AGENTS.md](/experiments/codex-agents-md)

## Referencias

- [Codex CLI — Repositorio oficial](https://github.com/openai/codex)
- [Comparativa con CLAUDE.md](/notes/tools/ai-coding/claude-code/claude-md)
