---
sidebar_position: 2
---

# CLAUDE.md y directorio .claude

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

Ver el experimento: [Generar CLAUDE.md con /init](/experiments/claude-code-init)

## Referencias

- [Configuración de CLAUDE.md](https://docs.anthropic.com/es/docs/claude-code/memory)
- [Hooks y settings.json](https://docs.anthropic.com/es/docs/claude-code/hooks)
