---
sidebar_position: 2
---

# Modelos

## Catálogo de modelos

El catálogo completo está en [ollama.com/library](https://ollama.com/library). Algunos modelos destacados:

| Modelo             | Tamaño   | Para qué es bueno          |
| ------------------ | -------- | -------------------------- |
| `llama3.2`         | 3B / 1B  | Uso general, poco hardware |
| `llama3.3`         | 70B      | Uso general, alta calidad  |
| `qwen2.5-coder`    | 7B / 14B | Programación               |
| `deepseek-r1`      | 7B / 70B | Razonamiento, matemáticas  |
| `mistral`          | 7B       | Uso general, rápido        |
| `phi4`             | 14B      | Razonamiento, eficiente    |
| `gemma3`           | 4B / 27B | Uso general, multimodal    |
| `nomic-embed-text` | —        | Embeddings para RAG        |

## Descargar un modelo

```bash
ollama pull llama3.2
```

Los modelos se descargan en `~/.ollama/models/` (Linux/macOS) o `%USERPROFILE%\.ollama\models\` (Windows).

## Especificar variantes (tags)

Muchos modelos tienen variantes por tamaño o quantización:

```bash
ollama pull llama3.3:70b
ollama pull qwen2.5-coder:14b
ollama pull deepseek-r1:7b
```

Si no se especifica tag, Ollama descarga la variante por defecto (habitualmente la más equilibrada).

## Ver modelos descargados

```bash
ollama list
```

## Eliminar un modelo

```bash
ollama rm llama3.2
```

## Ver información de un modelo

```bash
ollama show llama3.2
```

Devuelve la arquitectura, tamaño, quantización, licencia y parámetros de configuración del modelo.

## Referencias

- [Catálogo de modelos](https://ollama.com/library)
- [Repositorio en GitHub](https://github.com/ollama/ollama)
