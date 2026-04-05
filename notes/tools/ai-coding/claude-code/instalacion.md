---
sidebar_position: 1
---

# Instalación

**[Claude Code](https://claude.ai/code)** es la CLI oficial de Anthropic para trabajar con Claude directamente desde la terminal. No es un simple autocompletado de código: es un agente que lee y modifica ficheros, ejecuta comandos, navega por el repositorio y mantiene el contexto de toda la conversación mientras trabajas.

## Requisitos e instalación

Requiere Node.js 18 o superior. Se instala como paquete global:

```bash
npm install -g @anthropic-ai/claude-code
```

Una vez instalado, lanza Claude Code desde el directorio de tu proyecto:

```bash
cd mi-proyecto
claude
```

En el primer arranque te pedirá autenticarte con tu cuenta de Anthropic.

## Cómo funciona

Claude Code abre una sesión interactiva en la terminal. Puedes escribirle en lenguaje natural lo que quieres hacer y él tomará las acciones necesarias: leer ficheros, editarlos, ejecutar tests, buscar en el código, hacer commits...

```
> añade validación al formulario de login para que el email sea obligatorio
```

Claude localizará el fichero relevante, leerá su contenido, propondrá el cambio y lo aplicará si le das permiso.

Por defecto, las operaciones que modifican ficheros o ejecutan comandos piden confirmación. Puedes ajustar el nivel de autonomía con el flag `--dangerously-skip-permissions` (solo para entornos controlados).

Ver el experimento: [Primera sesión con Claude Code](/experiments/claude-code-primera-sesion)

## Referencias

- [Claude Code — Sitio oficial](https://claude.ai/code)
- [Documentación de Claude Code](https://docs.anthropic.com/es/docs/claude-code/overview)
- [Referencia de comandos y atajos](https://docs.anthropic.com/es/docs/claude-code/cli-usage)
