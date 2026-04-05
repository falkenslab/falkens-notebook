---
sidebar_position: 3
---

# Uso básico

## Chat interactivo en la terminal

```bash
ollama run llama3.2
```

Abre una sesión de chat. Para salir, escribe `/bye` o pulsa `Ctrl+D`.

Comandos especiales dentro de la sesión:

| Comando        | Descripción                                |
| -------------- | ------------------------------------------ |
| `/help`        | Lista de comandos disponibles              |
| `/show info`   | Información del modelo en uso              |
| `/set verbose` | Muestra estadísticas de tokens y velocidad |
| `/clear`       | Limpia el historial de la conversación     |
| `/bye`         | Sale de la sesión                          |

## Prompt puntual (sin sesión interactiva)

```bash
ollama run llama3.2 "Explica qué es un transformer en dos frases"
```

Útil para scripts y automatizaciones.

## Entrada desde stdin

```bash
cat codigo.py | ollama run qwen2.5-coder "Revisa este código y señala posibles bugs"
```

Ver el experimento: [Prompt puntual con Ollama desde la terminal](/experiments/ollama-prompt-puntual)

## Referencias

- [Repositorio en GitHub](https://github.com/ollama/ollama)
- [Documentación de la API](https://github.com/ollama/ollama/blob/main/docs/api.md)
