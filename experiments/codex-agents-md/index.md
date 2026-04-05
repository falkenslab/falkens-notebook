---
date: 2026-04-05
slug: codex-agents-md
title: Definir restricciones de proyecto con AGENTS.md
tags: [Codex, agente]
---

`AGENTS.md` es un archivo de configuración para Codex CLI, donde le dices al agente cómo debe trabajar sobre tu proyecto. En este experimento vamos a evitar que Codex toque los ficheros que son generados o ignore convenciones del proyecto definiendo restricciones.

<!-- truncate -->

Sin `AGENTS.md`, Codex puede tocar ficheros generados o ignorar convenciones del proyecto, así que creamos este archivo en la raíz de nuestro proyecto:

```markdown
# AGENTS.md

## Comandos
```bash
npm test
npm run build
```

## Restricciones
- No modifiques ficheros en src/generated/ ni en dist/
- Usa siempre async/await, nunca .then()
- Los tests van en __tests__/ junto al fichero que prueban
```

## Referencias

- [Codex CLI — Repositorio oficial](https://github.com/openai/codex)
- [Notas: AGENTS.md](/notes/tools/ai-coding/codex/agents-md)
