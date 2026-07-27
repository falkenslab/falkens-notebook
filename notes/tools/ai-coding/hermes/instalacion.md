---
sidebar_position: 1
---

# Instalación

**[Hermes Agent](https://hermes-agent.nousresearch.com/)** es el agente open source (licencia MIT) de [Nous Research](https://nousresearch.com). Vive en esta sección porque ejecuta comandos, edita ficheros y trabaja sobre repositorios, pero conviene situarlo bien desde el principio.

:::info Qué es y qué no es
Hermes **no es un agente de programación** en el sentido de [Claude Code](/notes/tools/ai-coding/claude-code/instalacion), [Codex CLI](/notes/tools/ai-coding/codex/instalacion) u [opencode](/notes/tools/ai-coding/opencode/instalacion). Es un **agente personal persistente**: memoria de largo plazo entre sesiones, creación automática de *skills* reutilizables, planificador cron propio y conectores a Telegram, Discord, Slack, WhatsApp y Signal. Programar es una de las cosas que sabe hacer, no su razón de ser. La [comparativa](/notes/tools/ai-coding/hermes/comparativa) desarrolla dónde se solapa realmente con los agentes de código y dónde no.
:::

:::warning Cuidado con los dominios
Existen varios sitios clon —`hermes-agent.org`, `hermes-agent.ai`, `hermesagent.agency`— con contenido reescrito para posicionamiento, y **alguno publica un comando de instalación distinto del oficial**. Instalar un agente es darle acceso a tu terminal: descarga solo desde el [repositorio oficial](https://github.com/NousResearch/hermes-agent) o desde `hermes-agent.nousresearch.com`.
:::

## Instalación

**Linux, macOS, WSL2 y Termux:**

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
```

**Windows nativo (PowerShell), sin WSL:**

```powershell
iex (irm https://hermes-agent.nousresearch.com/install.ps1)
```

El instalador de Windows no requiere permisos de administrador: despliega `uv`, Python 3.11, Node.js, ripgrep, ffmpeg y un **Git Bash portable (MinGit)** aislado en `%LOCALAPPDATA%\hermes\git`, que no interfiere con un Git de sistema ya instalado. Si detecta uno, lo reutiliza.

Tras instalar:

```bash
source ~/.bashrc     # o ~/.zshrc
hermes               # primera conversación
```

## Dónde vive

| Plataforma | Directorio |
|---|---|
| Linux, macOS, WSL2 | `~/.hermes/` |
| Windows nativo | `%LOCALAPPDATA%\hermes` |

Ahí se guardan la configuración (`config.yaml`), las claves (`.env`), la memoria, las skills y el historial. Todo local: el proyecto declara cero telemetría.

## Configuración inicial

```bash
hermes setup            # asistente completo
hermes setup --portal   # login OAuth con Nous Portal
hermes doctor           # diagnóstico si algo falla
```

`hermes setup` te pregunta proveedor, modelo y herramientas. La variante `--portal` usa **Nous Portal**, la suscripción de Nous Research que cubre con una sola credencial el modelo (300+ disponibles) más búsqueda web, generación de imágenes, TTS y navegador en la nube. No es obligatoria: Hermes funciona con OpenRouter, OpenAI, Anthropic, un endpoint propio o [modelos locales](/notes/tools/ai-coding/hermes/modelos).

:::warning Requisito de contexto
Hermes necesita un modelo con **al menos 64.000 tokens de contexto**. Entre el prompt de sistema, las definiciones de más de 40 herramientas y el historial, por debajo de esa cifra el agente no llega a arrancar en condiciones. Es la restricción que descarta a la mayoría de modelos locales pequeños.
:::

## Experimento: instalación y verificación en frío

**Contexto:** Hermes arrastra bastantes dependencias y un requisito de contexto poco habitual. Antes de darle acceso a nada conviene comprobar qué proveedor ha quedado activo y si el modelo cumple ese mínimo.

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
source ~/.bashrc
hermes doctor
```

**Resultado:**

```
Hermes Agent ☤  v1.4.2

  ✓ Python 3.11.9        (~/.hermes/venv)
  ✓ Node.js 22.14.0
  ✓ ripgrep 14.1.1
  ✓ ffmpeg 7.1
  ✓ config.yaml          ~/.hermes/config.yaml
  ✓ provider             openrouter
  ✓ model                anthropic/claude-sonnet-4-5
  ✓ context window       200000 tokens  (mínimo requerido: 64000)
  ✓ terminal backend     local  (cwd: ".")
  ! gateway              no configurado — ejecuta `hermes gateway` para Telegram/Discord
  ✓ memory               MEMORY.md (0 chars) · USER.md (0 chars)
  ✓ skills               0 locales, 40 integradas

Sin problemas críticos.
```

**Qué aprender:** `hermes doctor` es la comprobación que evita el 90 % de los problemas iniciales, porque valida explícitamente la ventana de contexto contra el mínimo de 64k. El aviso del gateway no es un error: los conectores de mensajería son opcionales y están desactivados hasta que los configuras.

:::note
Las salidas de los experimentos de esta sección son **representativas**: reflejan fielmente el formato y el comportamiento documentado, pero no proceden de una ejecución en vivo. Los números concretos (versiones, tiempos) variarán en tu máquina.
:::

## Referencias

- [Hermes Agent — Sitio oficial](https://hermes-agent.nousresearch.com/)
- [Hermes Agent — Documentación](https://hermes-agent.nousresearch.com/docs/)
- [Hermes Agent — Repositorio en GitHub](https://github.com/NousResearch/hermes-agent)
- [Nous Research](https://nousresearch.com)
- [Nous Portal](https://portal.nousresearch.com)
- [Instalación de opencode](/notes/tools/ai-coding/opencode/instalacion)
