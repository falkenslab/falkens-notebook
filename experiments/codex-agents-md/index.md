---
date: 2026-04-05
slug: codex-agents-md
title: Definir restricciones de proyecto con AGENTS.md
tags: [Codex, agente]
---

Evitar que Codex toque ficheros generados o ignore convenciones del proyecto definiendo restricciones persistentes en AGENTS.md.

<!-- truncate -->

## Experimento: definir restricciones con AGENTS.md

**Contexto:** sin `AGENTS.md`, Codex puede tocar ficheros generados o ignorar convenciones del proyecto. Definirlo evita errores difíciles de detectar.

```bash
cat > AGENTS.md << 'EOF'
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
EOF
```

```
> añade tests para el módulo de autenticación
```

**Resultado:**
```
Creando __tests__/auth.test.ts junto a src/auth.ts...
Usando async/await según las convenciones del proyecto.
No se han tocado ficheros en src/generated/.
```

**Qué aprender:** `AGENTS.md` es la forma de imponer restricciones y convenciones al agente de forma persistente, sin repetirlas en cada sesión.

## Referencias

- [Codex CLI — Repositorio oficial](https://github.com/openai/codex)
- [Notas: AGENTS.md](/docs/tools/ai-coding/codex/agents-md)
