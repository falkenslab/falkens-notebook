---
sidebar_position: 2
---

# Instalación

## macOS

Descarga el instalador desde la web oficial o usa Homebrew:

```bash
brew install ollama
```

El servicio arranca automáticamente como demonio al instalar.

## Linux

Script de instalación oficial (una línea):

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Esto instala Ollama como servicio systemd. Para verificar que está corriendo:

```bash
systemctl status ollama
```

## Windows

Tienes tres opciones:

* **Instalador gráfico** — descarga el `.exe` desde [ollama.com/download](https://ollama.com/download) y ejecútalo.

* **winget** (incluido en Windows 10/11):

```powershell
winget install Ollama.Ollama
```

* **Chocolatey**:

```powershell
choco install ollama
```

En todos los casos, Ollama se instala como una aplicación de bandeja del sistema y arranca automáticamente con Windows.

## Docker

Si prefieres no instalar nada en el sistema host:

```bash
# Solo CPU
docker run -d -v ollama:/root/.ollama -p 11434:11434 ollama/ollama

# Con GPU NVIDIA
docker run -d --gpus=all -v ollama:/root/.ollama -p 11434:11434 ollama/ollama
```

## Requisitos de hardware

Ollama ejecuta los modelos principalmente en RAM (o VRAM si tienes GPU). La regla general es:

| Tamaño del modelo  | RAM mínima recomendada |
| ------------------ | ---------------------- |
| 1B–3B parámetros   | 4 GB                   |
| 7B–8B parámetros   | 8 GB                   |
| 13B–14B parámetros | 16 GB                  |
| 32B parámetros     | 32 GB                  |
| 70B parámetros     | 64 GB                  |

Con GPU NVIDIA o AMD, Ollama carga el modelo en VRAM automáticamente, lo que mejora mucho la velocidad de respuesta.

## Referencias

- [Ollama — Sitio oficial](https://ollama.com)
- [Descarga para Windows](https://ollama.com/download)
- [Repositorio en GitHub](https://github.com/ollama/ollama)
