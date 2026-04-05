---
sidebar_position: 3
---

# Skills y comandos

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

Ver el experimento: [Crear una skill de commit en Claude Code](/experiments/claude-code-skill-commit)

## Referencias

- [Referencia de comandos y atajos](https://docs.anthropic.com/es/docs/claude-code/cli-usage)
- [Hooks y settings.json](https://docs.anthropic.com/es/docs/claude-code/hooks)
