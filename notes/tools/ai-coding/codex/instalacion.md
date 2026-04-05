---
sidebar_position: 1
---

# Instalación

**[Codex CLI](https://github.com/openai/codex)** es la herramienta de línea de comandos de OpenAI para interactuar con modelos de IA directamente desde la terminal. Al igual que Claude Code, actúa como un agente: lee ficheros, escribe código, ejecuta comandos y mantiene el contexto del proyecto durante toda la sesión.

## Requisitos e instalación

Requiere Node.js 22 o superior. Se instala como paquete global:

```bash
npm install -g @openai/codex
```

Lanza Codex desde el directorio de tu proyecto:

```bash
cd mi-proyecto
codex
```

En el primer arranque te pedirá tu clave de API de OpenAI, que puedes definir también como variable de entorno:

```bash
export OPENAI_API_KEY="sk-..."
```

## Cómo funciona

Codex abre una sesión interactiva en la terminal. Puedes pedirle tareas en lenguaje natural y él actuará sobre el código:

```
> refactoriza la función parseConfig para que acepte YAML además de JSON
```

Codex leerá los ficheros relevantes, propondrá los cambios y los aplicará según el modo de aprobación configurado.

## Modos de aprobación

Codex ofrece tres niveles de autonomía, que se controlan con el flag `--approval-mode`:

| Modo | Comportamiento |
|---|---|
| `suggest` (por defecto) | Propone cambios; tú los aceptas uno a uno |
| `auto-edit` | Edita ficheros automáticamente, pero pide confirmación para ejecutar comandos |
| `full-auto` | Opera sin interrupciones (solo para entornos aislados) |

```bash
codex --approval-mode auto-edit
```


## Referencias

- [Codex CLI — Repositorio oficial](https://github.com/openai/codex)
- [Documentación de Codex CLI](https://github.com/openai/codex#readme)
