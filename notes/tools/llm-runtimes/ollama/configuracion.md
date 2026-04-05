---
sidebar_position: 5
---

# Configuración

## Variables de entorno

| Variable                   | Descripción                                                       | Valor por defecto  |
| -------------------------- | ----------------------------------------------------------------- | ------------------ |
| `OLLAMA_MODELS`            | Directorio donde se guardan los modelos                           | `~/.ollama/models` |
| `OLLAMA_HOST`              | Dirección y puerto en que escucha la API                          | `127.0.0.1:11434`  |
| `OLLAMA_ORIGINS`           | Orígenes CORS permitidos                                          | `localhost`        |
| `OLLAMA_NUM_PARALLEL`      | Peticiones simultáneas al modelo                                  | `1`                |
| `OLLAMA_MAX_LOADED_MODELS` | Modelos cargados en memoria a la vez                              | `1`                |
| `OLLAMA_KEEP_ALIVE`        | Tiempo que el modelo permanece en memoria tras la última petición | `5m`               |
| `OLLAMA_FLASH_ATTENTION`   | Activa Flash Attention (más rápido con GPU compatible)            | `0`                |

## Exponer la API en red local

Por defecto, Ollama solo escucha en `localhost`. Para acceder desde otros dispositivos de la red:

```bash
OLLAMA_HOST=0.0.0.0:11434 ollama serve
```

En Linux con systemd, edita el servicio:

```bash
sudo systemctl edit ollama
```

```ini
[Service]
Environment="OLLAMA_HOST=0.0.0.0:11434"
```

```bash
sudo systemctl daemon-reload && sudo systemctl restart ollama
```

## Modelfile: personalizar un modelo

Un **Modelfile** es el equivalente a un Dockerfile pero para modelos. Permite crear variantes personalizadas de cualquier modelo con un system prompt fijo, parámetros distintos o incluso pesos propios.

Ejemplo de `Modelfile`:

```dockerfile
FROM llama3.2

SYSTEM """
Eres un asistente técnico especializado en Python y FastAPI.
Responde siempre en español.
Sé conciso: da la respuesta directa antes de cualquier explicación.
Si no sabes algo, dilo claramente.
"""

PARAMETER temperature 0.3
PARAMETER top_p 0.9
PARAMETER num_ctx 8192
```

Crear el modelo personalizado:

```bash
ollama create mi-asistente-python -f Modelfile
ollama run mi-asistente-python
```

Parámetros disponibles en un Modelfile:

| Parámetro     | Descripción                                |
| ------------- | ------------------------------------------ |
| `temperature` | Creatividad de las respuestas (0–1)        |
| `top_p`       | Nucleus sampling                           |
| `top_k`       | Limita el vocabulario de selección         |
| `num_ctx`     | Tamaño de la ventana de contexto en tokens |
| `num_predict` | Máximo de tokens a generar                 |
| `stop`        | Secuencias que detienen la generación      |

Ver el experimento: [Crear un asistente personalizado con Modelfile](/experiments/ollama-modelfile)

## Referencias

- [Referencia de Modelfile](https://github.com/ollama/ollama/blob/main/docs/modelfile.md)
- [Variables de entorno de Ollama](https://github.com/ollama/ollama/blob/main/docs/faq.md)
