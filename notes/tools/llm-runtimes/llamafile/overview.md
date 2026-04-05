---
sidebar_position: 1
---

# llamafile

Proyecto de Mozilla que empaqueta un modelo completo en un único ejecutable portable que corre en cualquier sistema operativo (Linux, macOS, Windows, BSD, OpenBSD) sin instalación previa ni dependencias externas.

## Cómo funciona

Un fichero `.llamafile` es un ejecutable que contiene tanto el runtime de inferencia (basado en llama.cpp) como los pesos del modelo. Se descarga, se da permiso de ejecución y se lanza directamente.

```bash
wget https://huggingface.co/.../qwen3.5-0.8b.llamafile
chmod +x qwen3.5-0.8b.llamafile
./qwen3.5-0.8b.llamafile
```

Al ejecutarlo abre automáticamente una interfaz web de chat en `http://localhost:8080` y expone una API compatible con OpenAI.

## Características de la versión 0.10.0 (marzo 2026)

- Soporte GPU: Metal en macOS, CUDA en NVIDIA
- Reconocimiento de voz con Whisper integrado
- Modelos multimodales (texto + imagen)
- Tool calling

## Casos de uso ideales

- **Distribución de demos**: un solo fichero que cualquiera puede ejecutar sin instalar nada.
- **Entornos sin conexión**: funciona en máquinas sin acceso a internet ni gestores de paquetes.
- **Herramientas CLI**: se puede invocar como un comando más en scripts.

Ver el experimento: [Ejecutar un LLM sin instalar nada con llamafile](/experiments/llamafile-sin-instalacion)

## Referencias

- [llamafile — GitHub (Mozilla)](https://github.com/mozilla-oai/llamafile)
- [Modelos llamafile en HuggingFace](https://huggingface.co/Mozilla)
