---
sidebar_position: 1
---

# Instalación

**[OpenCode](https://opencode.ai)** es un agente de programación de terminal **open source (licencia MIT)**, mantenido por Anomaly. Hace lo mismo que [Claude Code](/notes/tools/ai-coding/claude-code/instalacion) o [Codex CLI](/notes/tools/ai-coding/codex/instalacion) —lee ficheros, edita código, ejecuta comandos, mantiene el contexto del proyecto— con una diferencia de diseño importante: **no está atado a ningún proveedor de modelos**. El mismo binario habla con Anthropic, OpenAI, Google, OpenRouter o con un modelo que corre en tu portátil bajo [Ollama](/notes/tools/llm-runtimes/ollama/instalacion).

Además del TUI de terminal, existe una aplicación de escritorio (beta) para macOS, Windows y Linux, y un modo servidor que separa el motor del cliente.

## Requisitos

No necesita Node.js: el instalador oficial descarga un binario autocontenido. Si prefieres instalarlo vía npm, necesitarás Node.js 18 o superior.

## Instalación

**Script universal (macOS, Linux, WSL):**

```bash
curl -fsSL https://opencode.ai/install | bash
```

**Gestores de paquetes:**

```bash
npm install -g opencode-ai            # npm (también bun, pnpm, yarn)
brew install anomalyco/tap/opencode   # macOS / Linux
sudo pacman -S opencode               # Arch Linux
choco install opencode                # Windows (Chocolatey)
scoop install opencode                # Windows (Scoop)
```

**Docker:**

```bash
docker run -it --rm ghcr.io/anomalyco/opencode
```

**Actualizar y desinstalar:**

```bash
opencode upgrade            # a la última versión
opencode upgrade v0.1.48    # a una versión concreta
opencode uninstall --keep-config
```

## Primer arranque

Lanza `opencode` desde el directorio del proyecto:

```bash
cd mi-proyecto
opencode
```

En la primera sesión hay dos pasos:

**1. Conectar un proveedor.** Dentro del TUI, el comando `/connect` abre el selector de proveedores; desde fuera, el equivalente es `opencode auth login`. Las credenciales se guardan en `~/.local/share/opencode/auth.json`, fuera del repositorio.

```bash
opencode auth login
opencode auth list
```

Si no quieres elegir proveedor todavía, **OpenCode Zen** es el catálogo curado del propio proyecto: modelos ya probados con el agente, con una sola clave.

**2. Inicializar el proyecto.** El comando `/init` recorre el repositorio y genera un fichero `AGENTS.md` con las convenciones, comandos de build y arquitectura detectadas. Es el equivalente a `CLAUDE.md` en Claude Code o `AGENTS.md` en Codex —de hecho, OpenCode lee `CLAUDE.md` como *fallback* de compatibilidad.

## Experimento: instalar y ejecutar una tarea sin abrir el TUI

**Contexto:** antes de usar el TUI conviene comprobar que el binario, las credenciales y el modelo funcionan. El subcomando `run` ejecuta un prompt en modo no interactivo y devuelve el resultado por stdout, lo que además lo hace usable en scripts y CI.

```bash
curl -fsSL https://opencode.ai/install | bash
opencode --version
opencode auth login          # seleccionar proveedor y pegar la API key
opencode run "Explica en dos frases qué hace el fichero package.json de este proyecto"
```

**Resultado:**

```
opencode 0.15.3

┌ Add credential
│
◆ Select provider
│ ● opencode Zen (recommended)
│ ○ Anthropic
│ ○ OpenAI
│ ○ Google
│ ○ OpenRouter
└
✓ Credential saved to ~/.local/share/opencode/auth.json

@ package.json

Declara el paquete `falkens-notebook` como un sitio Docusaurus v3, con los scripts
`start`, `build`, `serve` y `typecheck` para desarrollo y publicación.
Sus dependencias principales son @docusaurus/core, @docusaurus/preset-classic y
@easyops-cn/docusaurus-search-local para la búsqueda local.
```

**Qué aprender:** `opencode run` es la puerta de entrada más barata para validar la instalación, y el mismo comando sirve luego para automatizar tareas del agente en pipelines sin TUI.

## Referencias

- [OpenCode — Sitio oficial](https://opencode.ai)
- [OpenCode — Documentación](https://opencode.ai/docs/)
- [OpenCode — Repositorio en GitHub](https://github.com/anomalyco/opencode)
- [Instalación de Claude Code](/notes/tools/ai-coding/claude-code/instalacion)
- [Instalación de Codex CLI](/notes/tools/ai-coding/codex/instalacion)
